const db = require('../db');
const { getCharacterData } = require('../config/characters');
const { 
  saveDailyStep,
  updateDailyStep,
  calculateCurrentStreak, 
  calculateLongestStreak,
  GOAL_CONFIG 
} = require('../helpers/dailySteps');

async function syncSteps(req, res) {
  try {
    const { 
      user_id, 
      current_goal_level,
      completed_days,
    } = req.body;

    // ✅ УЛУЧШЕННАЯ ВАЛИДАЦИЯ
    
    // 1. Проверка наличия обязательных полей
    if (!user_id || !current_goal_level || !completed_days) {
      return res.status(400).json({ 
        error: 'Отсутствуют обязательные поля',
        required: ['user_id', 'current_goal_level', 'completed_days']
      });
    }

    // 2. Валидация UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(user_id)) {
      return res.status(400).json({ 
        error: 'Неверный формат user_id. Ожидается UUID' 
      });
    }

    // 3. Валидация goal_level
    if (!GOAL_CONFIG[current_goal_level]) {
      return res.status(400).json({ 
        error: 'Неверный goal_level. Допустимые значения: 1, 2, 3, 4' 
      });
    }

    // 4. Валидация completed_days
    if (!Array.isArray(completed_days) || completed_days.length === 0) {
      return res.status(400).json({ 
        error: 'completed_days должен быть непустым массивом' 
      });
    }

    // 5. Валидация структуры каждого дня
    for (let i = 0; i < completed_days.length; i++) {
      const day = completed_days[i];
      
      if (!day.date || day.steps === undefined || !day.goal_level) {
        return res.status(400).json({ 
          error: `completed_days[${i}]: отсутствуют обязательные поля (date, steps, goal_level)` 
        });
      }

      // Валидация формата даты
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date)) {
        return res.status(400).json({ 
          error: `completed_days[${i}]: неверный формат даты "${day.date}". Ожидается: yyyy-MM-dd` 
        });
      }

      // Валидация типов
      if (typeof day.steps !== 'number' || day.steps < 0) {
        return res.status(400).json({ 
          error: `completed_days[${i}]: steps должен быть положительным числом` 
        });
      }

      if (!GOAL_CONFIG[day.goal_level]) {
        return res.status(400).json({ 
          error: `completed_days[${i}]: неверный goal_level "${day.goal_level}"` 
        });
      }
    }

    // Создать пользователя если не существует
    await ensureUserExists(user_id);

    // Получить состояние ДО изменений
    const previousProgress = await getCurrentProgress(user_id);
    const previousXP = previousProgress.current_xp;

    // Обновить goal_level если изменился
    await updateGoalLevel(user_id, current_goal_level);

    // Разделяем массив: последний = сегодня, остальные = previousDays
    const today = completed_days[completed_days.length - 1];
    const previousDays = completed_days.slice(0, -1);

    let totalXPGained = 0;
    let bonusXPEarned = 0;
    const bonusDetails = [];

    // 1. Обработка завершенных дней (все кроме последнего)
    for (const day of previousDays) {
      const result = await processPreviousDay(user_id, day);
      totalXPGained += result.xpGained;
      bonusXPEarned += result.bonusXP;
      
      if (result.bonusXP > 0 || !result.goalReached) {
        bonusDetails.push({
          date: day.date,
          steps: day.steps,
          goal: result.stepsGoal,
          bonus: result.bonusXP,
          goal_reached: result.goalReached
        });
      }
    }

    // 2. Обработка сегодняшнего дня
    const todayResult = await processTodayDay(user_id, today);
    totalXPGained += todayResult.xpGained;

    // 3. Финальный результат
    const result = await getFinalProgress(user_id);
    
    // 4. Добавляем информацию о сегодняшнем дне
    const todayGoal = GOAL_CONFIG[today.goal_level].steps;
    const todayPercentage = Math.floor((today.steps / todayGoal) * 100);
    const todayGoalReached = today.steps >= todayGoal;
    const isStreakCompletedToday = today.steps >= (todayGoal * 0.5);

    res.json({
      ...result,
      
      // Общее
      previous_xp: previousXP,
      xp_gained: totalXPGained,
      
      // Бонусы за вчерашние дни
      bonus_xp_earned: bonusXPEarned,
      bonus_details: bonusDetails,
      
      // Сегодняшний день
      today_steps: today.steps,
      today_goal: todayGoal,
      today_goal_percentage: todayPercentage,
      today_goal_reached: todayGoalReached,
      is_streak_completed_today: isStreakCompletedToday
    });

  } catch (error) {
    console.error('Ошибка в syncSteps:', error);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      message: error.message 
    });
  }
}

/**
 * Обработка завершенного дня (не сегодняшний)
 * - Начисляем XP (если день новый)
 * - Начисляем бонус (если цель выполнена)
 * - Финализируем день (is_finalized = true)
 */
async function processPreviousDay(userId, day) {
  const { date, steps, goal_level } = day;
  
  // Валидация goal_level
  if (!GOAL_CONFIG[goal_level]) {
    console.warn(`Неверный goal_level: ${goal_level} для дня ${date}`);
    return { xpGained: 0, bonusXP: 0, goalReached: false, stepsGoal: 0 };
  }

  const stepsGoal = GOAL_CONFIG[goal_level].steps;
  const bonusPercent = GOAL_CONFIG[goal_level].bonus;
  const isGoalCompleted = steps >= stepsGoal;
  const isStreakCompleted = steps >= (stepsGoal * 0.5);

  // Проверяем существует ли день в БД
  const existingDay = await db.query(
    'SELECT steps, is_finalized FROM daily_steps WHERE user_id = $1 AND date = $2',
    [userId, date]
  );

  let xpGained = 0;
  let bonusXP = 0;

  if (existingDay.rows.length === 0) {
    // День НЕ существует в БД → новый день
    console.log(`📅 Новый завершенный день: ${date}`);
    
    // Начисляем весь XP
    await db.query(
      'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $1 WHERE user_id = $2',
      [steps, userId]
    );
    xpGained = steps;

    // Начисляем бонус если цель выполнена
    if (isGoalCompleted) {
      bonusXP = Math.floor(steps * bonusPercent);
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1 WHERE user_id = $2',
        [bonusXP, userId]
      );
      console.log(`✅ Бонус начислен за ${date}: ${bonusXP} XP`);
    } else {
      console.log(`ℹ️ День ${date}: цель не выполнена, бонус не начислен`);
    }

    // Сохраняем день с is_finalized = true
    await saveDailyStep(userId, {
      date,
      steps,
      goal_level,
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: true
    });

  } else {
    const oldSteps = existingDay.rows[0].steps;
    const isFinalized = existingDay.rows[0].is_finalized;

    if (isFinalized) {
      // ✅ День уже финализирован → логируем изменения, но не обрабатываем
      if (oldSteps !== steps) {
        console.warn(`⚠️ Попытка изменить финализированный день ${date}: ${oldSteps} → ${steps} шагов`);
      } else {
        console.log(`ℹ️ День ${date} уже был обработан ранее (дубликат запроса)`);
      }
      return { xpGained: 0, bonusXP: 0, goalReached: isGoalCompleted, stepsGoal };
    }

    // День существует с is_finalized = false → был "сегодня" в прошлую синхронизацию
    console.log(`📅 Финализация дня: ${date} (было ${oldSteps} шагов, стало ${steps})`);
    
    // XP УЖЕ начислен когда день был "сегодня"
    xpGained = 0;

    // Начисляем ТОЛЬКО бонус (если цель выполнена)
    if (isGoalCompleted) {
      bonusXP = Math.floor(steps * bonusPercent);
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1 WHERE user_id = $2',
        [bonusXP, userId]
      );
      console.log(`✅ Бонус начислен за ${date}: ${bonusXP} XP`);
    } else {
      console.log(`ℹ️ День ${date}: цель не выполнена, бонус не начислен`);
    }

    // Обновляем день: is_finalized = true
    await updateDailyStep(userId, date, {
      steps,  // ✅ Обновляем steps на случай изменения
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: true
    });
  }

  return { xpGained, bonusXP, goalReached: isGoalCompleted, stepsGoal };
}

/**
 * Обработка сегодняшнего дня
 * - Начисляем XP (весь или разницу)
 * - Бонус НЕ начисляем (день не завершен)
 * - is_finalized = false
 */
async function processTodayDay(userId, day) {
  const { date, steps, goal_level } = day;
  
  if (!GOAL_CONFIG[goal_level]) {
    console.warn(`Неверный goal_level: ${goal_level} для дня ${date}`);
    return { xpGained: 0 };
  }

  const stepsGoal = GOAL_CONFIG[goal_level].steps;
  const isGoalCompleted = steps >= stepsGoal;
  const isStreakCompleted = steps >= (stepsGoal * 0.5);

  // Проверяем существует ли день в БД
  const existingDay = await db.query(
    'SELECT steps FROM daily_steps WHERE user_id = $1 AND date = $2',
    [userId, date]
  );

  let xpGained = 0;

  if (existingDay.rows.length === 0) {
    // Первый заход сегодня → начисляем весь XP
    console.log(`📅 Первый заход сегодня: ${date}, шагов: ${steps}`);
    
    await db.query(
      'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $1 WHERE user_id = $2',
      [steps, userId]
    );
    xpGained = steps;

    // Сохраняем с is_finalized = false
    await saveDailyStep(userId, {
      date,
      steps,
      goal_level,
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: false
    });

  } else {
    // Повторный заход сегодня → начисляем разницу
    const oldSteps = existingDay.rows[0].steps;
    const difference = steps - oldSteps;

    if (difference < 0) {
      // ✅ Логируем, но все равно обновляем запись (на случай корректировки HealthKit)
      console.warn(`⚠️ Шаги уменьшились для ${date}: ${oldSteps} → ${steps}`);
      
      // Обновляем запись без изменения XP
      await updateDailyStep(userId, date, {
        steps,
        is_goal_completed: isGoalCompleted,
        is_streak_completed: isStreakCompleted,
        is_finalized: false
      });
      
      return { xpGained: 0 };
    }

    console.log(`📅 Повторный заход сегодня: ${date}, было ${oldSteps}, стало ${steps}, разница ${difference}`);

    if (difference > 0) {
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $1 WHERE user_id = $2',
        [difference, userId]
      );
      xpGained = difference;
    }

    // Обновляем запись (is_finalized остается false)
    await updateDailyStep(userId, date, {
      steps,
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: false
    });
  }

  return { xpGained };
}

async function updateGoalLevel(userId, goalLevel) {
  if (goalLevel < 1 || goalLevel > 4) {
    throw new Error(`Неверный goal_level: ${goalLevel}. Допустимые значения: 1-4`);
  }

  await db.query(
    'UPDATE user_progress SET goal_level = $1 WHERE user_id = $2',
    [goalLevel, userId]
  );
}

async function getFinalProgress(userId) {
  const result = await db.query(
    'SELECT total_steps, total_xp, current_level FROM user_progress WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    const characterData = getCharacterData(1);
    return {
      total_steps: 0,
      current_xp: 0,
      current_level: 1,
      xp_to_next_level: 10000,
      character_image_url: characterData.image_url,
      character_animation_url: characterData.animation_url,
      current_streak: 0,
      longest_streak: 0
    };
  }

  const user = result.rows[0];
  const totalXP = parseInt(user.total_xp);
  
  // Вычисляем уровень и прогресс
  let level = 1;
  let accumulated = 0;
  
  while (accumulated + (level * 10000) <= totalXP) {
    accumulated += level * 10000;
    level++;
  }

  const currentXP = totalXP - accumulated;
  const xpToNext = level * 10000;

  const characterData = getCharacterData(level);

  // Подсчет streak (учитывает сегодняшний день)
  const currentStreak = await calculateCurrentStreak(userId);
  const longestStreak = await calculateLongestStreak(userId);

  return {
    total_steps: parseInt(user.total_steps),
    current_xp: currentXP,
    current_level: level,
    xp_to_next_level: xpToNext,
    character_image_url: characterData.image_url,
    character_animation_url: characterData.animation_url,
    current_streak: currentStreak,
    longest_streak: longestStreak
  };
}

async function getCurrentProgress(userId) {
  return await getFinalProgress(userId);
}

async function ensureUserExists(userId) {
  const userCheck = await db.query(
    'SELECT id FROM users WHERE id = $1',
    [userId]
  );

  if (userCheck.rows.length === 0) {
    await db.query('INSERT INTO users (id) VALUES ($1)', [userId]);
    await db.query(
      'INSERT INTO user_progress (user_id, goal_level) VALUES ($1, $2)',
      [userId, 3]
    );
    console.log('✅ Новый пользователь создан:', userId);
  }
}

module.exports = { syncSteps };
