const db = require('../db');
const { getCharacterData } = require('../config/characters');
const { 
  saveDailyStep,
  updateDailyStep,
  calculateCurrentStreak, 
  calculateLongestStreak,
  processFreezeSystem,  // ✅ ДОБАВИЛИ
  GOAL_CONFIG 
} = require('../helpers/dailySteps');

async function syncSteps(req, res) {
  try {
    const { 
      user_id, 
      current_goal_level,
      completed_days,
    } = req.body;

    // Валидация
    if (!user_id || !current_goal_level || !completed_days || completed_days.length === 0) {
      return res.status(400).json({ 
        error: 'Отсутствуют обязательные поля',
        required: ['user_id', 'current_goal_level', 'completed_days']
      });
    }

    // Создать пользователя если не существует
    await ensureUserExists(user_id);

    // 🧊 ДОБАВЛЕНО: Обработать систему Freeze ПЕРЕД обработкой дней
    const freezeResult = await processFreezeSystem(user_id);

    // Получить состояние ДО изменений
    const previousProgress = await getCurrentProgress(user_id);
    const previousXP = previousProgress.current_xp;

    // Обновить goal_level если изменился
    await updateGoalLevel(user_id, current_goal_level);

    // Разделяем массив: последний = сегодня, остальные = previousDays
    const today = completed_days[completed_days.length - 1];
    const previousDays = completed_days.slice(0, -1);

    console.log(`📊 Синхронизация для ${user_id}:`);
    console.log(`   Завершенных дней: ${previousDays.length}`);
    console.log(`   Сегодня: ${today.date} (${today.steps} шагов)`);

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

    // 🧊 ДОБАВЛЕНО: Вычислить дни до следующего Freeze
    const userProgressResult = await db.query(
      'SELECT last_freeze_earned_at FROM user_progress WHERE user_id = $1',
      [user_id]
    );
    
    let daysUntilNextFreeze = 14;
    if (userProgressResult.rows.length > 0 && userProgressResult.rows[0].last_freeze_earned_at) {
      const lastEarned = new Date(userProgressResult.rows[0].last_freeze_earned_at);
      const now = new Date();
      const daysSince = Math.floor((now - lastEarned) / (1000 * 60 * 60 * 24));
      daysUntilNextFreeze = Math.max(0, 14 - (daysSince % 14));
    }

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
      is_streak_completed_today: isStreakCompletedToday,

      // 🧊 ДОБАВЛЕНО: Freeze status
      freeze_status: {
        current_freeze_count: freezeResult.freezeCount,
        max_freeze_count: 4,
        days_until_next_freeze: daysUntilNextFreeze,
        freezes_earned_this_sync: freezeResult.freezesEarned,
        freezes_used_this_sync: freezeResult.freezesUsed,
        freeze_used_on_dates: freezeResult.freezeUsedDays
      }
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
 * ✅ ОБНОВЛЕНО: Обработка завершенного дня (не сегодняшний)
 * - Начисляем XP: 1 шаг = 0.1 XP
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
    
    const xpAmount = steps * 0.1;
    
    await db.query(
      'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $2 WHERE user_id = $3',
      [xpAmount, steps, userId]
    );
    xpGained = xpAmount;

    if (isGoalCompleted) {
      bonusXP = parseFloat((steps * bonusPercent * 0.1).toFixed(1));
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1 WHERE user_id = $2',
        [bonusXP, userId]
      );
      console.log(`✅ Бонус начислен за ${date}: ${bonusXP} XP`);
    } else {
      console.log(`ℹ️ День ${date}: цель не выполнена, бонус не начислен`);
    }

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
      console.log(`ℹ️ День ${date} уже был обработан ранее (дубликат)`);
      return { xpGained: 0, bonusXP: 0, goalReached: isGoalCompleted, stepsGoal };
    }

    console.log(`📅 Финализация дня: ${date} (было ${oldSteps} шагов, стало ${steps} шагов)`);
    
    const difference = steps - oldSteps;
    
    if (difference > 0) {
      const xpAmount = difference * 0.1;
      
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $2 WHERE user_id = $3',
        [xpAmount, difference, userId]
      );
      xpGained = xpAmount;
      console.log(`✅ Начислен XP за разницу: ${xpAmount} (${difference} шагов)`);
    } else if (difference < 0) {
      console.warn(`⚠️ Шаги уменьшились для ${date}: ${oldSteps} → ${steps}`);
    }

    if (isGoalCompleted) {
      bonusXP = parseFloat((steps * bonusPercent * 0.1).toFixed(1));
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1 WHERE user_id = $2',
        [bonusXP, userId]
      );
      console.log(`✅ Бонус начислен за ${date}: ${bonusXP} XP`);
    } else {
      console.log(`ℹ️ День ${date}: цель не выполнена, бонус не начислен`);
    }

    await updateDailyStep(userId, date, {
      steps,
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: true
    });
  }

  return { xpGained, bonusXP, goalReached: isGoalCompleted, stepsGoal };
}

/**
 * ✅ ОБНОВЛЕНО: Обработка сегодняшнего дня
 * - Начисляем XP: 1 шаг = 0.1 XP
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

  const existingDay = await db.query(
    'SELECT steps FROM daily_steps WHERE user_id = $1 AND date = $2',
    [userId, date]
  );

  let xpGained = 0;

  if (existingDay.rows.length === 0) {
    console.log(`📅 Первый заход сегодня: ${date}, шагов: ${steps}`);
    
    const xpAmount = steps * 0.1;
    
    await db.query(
      'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $2 WHERE user_id = $3',
      [xpAmount, steps, userId]
    );
    xpGained = xpAmount;

    await saveDailyStep(userId, {
      date,
      steps,
      goal_level,
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: false
    });

  } else {
    const oldSteps = existingDay.rows[0].steps;
    const difference = steps - oldSteps;

    if (difference < 0) {
      console.warn(`⚠️ Шаги уменьшились для ${date}: ${oldSteps} → ${steps}`);
      return { xpGained: 0 };
    }

    console.log(`📅 Повторный заход сегодня: ${date}, было ${oldSteps}, стало ${steps}, разница ${difference}`);

    if (difference > 0) {
      const xpAmount = difference * 0.1;
      
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $2 WHERE user_id = $3',
        [xpAmount, difference, userId]
      );
      xpGained = xpAmount;
    }

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
      xp_to_next_level: 1000,
      character_image_url: characterData.image_url,
      character_animation_url: characterData.animation_url,
      current_streak: 0,
      longest_streak: 0
    };
  }

  const user = result.rows[0];
  const totalXP = parseFloat(user.total_xp);
  
  let level = 1;
  let accumulated = 0;
  
  while (accumulated + (level * 1000) <= totalXP) {
    accumulated += level * 1000;
    level++;
  }

  const currentXP = parseFloat((totalXP - accumulated).toFixed(1));
  const xpToNext = level * 1000;

  const characterData = getCharacterData(level);

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
