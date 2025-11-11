const db = require('../db');
const { getCharacterData, LEVEL_XP_REQUIREMENTS } = require('../config/characters');
const { 
  saveDailyStep,
  updateDailyStep,
  calculateCurrentStreak, 
  calculateLongestStreak,
  processFreezeSystem,
  GOAL_CONFIG 
} = require('../helpers/dailySteps');

// 🔒 Level cap убран - все пользователи могут прогрессировать без ограничений
// Бонусы остаются только для premium (has_subscription = true)

async function syncSteps(req, res) {
  try {
    const { 
      user_id, 
      current_goal_level,
      completed_days,
      has_subscription = false  // 🔒 Бонусы только для premium
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

    // 🔒 Обновить статус подписки в БД
    await updateSubscriptionStatus(user_id, has_subscription);

    // 🧊 Обработать систему Freeze ПЕРЕД обработкой дней
    const freezeResult = await processFreezeSystem(user_id, has_subscription);

    // Получить состояние ДО изменений
    const previousProgress = await getCurrentProgress(user_id);
    const previousXP = previousProgress.current_xp;
    const previousCredits = previousProgress.total_credits || 0;

    // Обновить goal_level если изменился
    await updateGoalLevel(user_id, current_goal_level);

    // Разделяем массив: последний = сегодня, остальные = previousDays
    const today = completed_days[completed_days.length - 1];
    const previousDays = completed_days.slice(0, -1);

    console.log(`📊 Синхронизация для ${user_id}:`);
    console.log(`   Подписка: ${has_subscription ? '✅ Активна' : '❌ Нет'}`);
    console.log(`   Завершенных дней: ${previousDays.length}`);
    console.log(`   Сегодня: ${today.date} (${today.steps} шагов)`);

    let totalXPGained = 0;
    let bonusXPEarned = 0;
    let totalCreditsEarned = 0;
    const bonusDetails = [];

    // 1. Обработка завершенных дней (все кроме последнего)
    for (const day of previousDays) {
      const result = await processPreviousDay(
        user_id, 
        day, 
        previousProgress.current_level,
        has_subscription
      );
      
      totalXPGained += result.xpGained;
      bonusXPEarned += result.bonusXP;
      totalCreditsEarned += result.creditsEarned;
      
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

    // 🧊 Вычислить дни до следующего Freeze (7 дней для всех)
    const userProgressResult = await db.query(
      'SELECT last_freeze_earned_at FROM user_progress WHERE user_id = $1',
      [user_id]
    );
    
    let daysUntilNextFreeze = 7;  // Изменено с 14 на 7
    if (userProgressResult.rows.length > 0 && userProgressResult.rows[0].last_freeze_earned_at) {
      const lastEarned = new Date(userProgressResult.rows[0].last_freeze_earned_at);
      const now = new Date();
      const daysSince = Math.floor((now - lastEarned) / (1000 * 60 * 60 * 24));
      daysUntilNextFreeze = Math.max(0, 7 - (daysSince % 7));  // Изменено с 14 на 7
    }

    // 🔒 Динамический max freeze count
    const maxFreezeCount = has_subscription ? 4 : 2;

    res.json({
      ...result,
      
      // Общее
      previous_xp: previousXP,
      xp_gained: totalXPGained,
      
      // Бонусы за вчерашние дни
      bonus_xp_earned: bonusXPEarned,
      bonus_details: bonusDetails,
      
      // Credits
      previous_credits: previousCredits,
      credits_earned: totalCreditsEarned,
      
      // Сегодняшний день
      today_steps: today.steps,
      today_goal: todayGoal,
      today_goal_percentage: todayPercentage,
      today_goal_reached: todayGoalReached,
      is_streak_completed_today: isStreakCompletedToday,

      // 🧊 Freeze status
      freeze_status: {
        current_freeze_count: freezeResult.freezeCount,
        max_freeze_count: maxFreezeCount,  // Динамический (2 или 4)
        days_until_next_freeze: daysUntilNextFreeze,
        freezes_earned_this_sync: freezeResult.freezesEarned,
        freezes_used_this_sync: freezeResult.freezesUsed,
        freeze_used_on_dates: freezeResult.freezeUsedDays
      },

      // 🔒 Subscription status (без level cap)
      subscription_status: {
        has_subscription: has_subscription
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
 * 🔒 Обновление статуса подписки
 */
async function updateSubscriptionStatus(userId, hasSubscription) {
  await db.query(
    'UPDATE user_progress SET has_subscription = $1 WHERE user_id = $2',
    [hasSubscription, userId]
  );
  console.log(`🔒 Subscription status updated: ${hasSubscription}`);
}

/**
 * 🔒 Обработка завершенного дня (бонусы только для premium)
 */
async function processPreviousDay(userId, day, currentLevel, hasSubscription) {
  const { date, steps, goal_level } = day;
  
  if (!GOAL_CONFIG[goal_level]) {
    console.warn(`Неверный goal_level: ${goal_level} для дня ${date}`);
    return { xpGained: 0, bonusXP: 0, creditsEarned: 0, goalReached: false, stepsGoal: 0 };
  }

  const stepsGoal = GOAL_CONFIG[goal_level].steps;
  const bonusPercent = GOAL_CONFIG[goal_level].bonus;
  const isGoalCompleted = steps >= stepsGoal;
  const isStreakCompleted = steps >= (stepsGoal * 0.5);

  // ✅ Credits для всех, бонусы только для подписчиков
  let creditsEarned = 0;
  let canEarnBonus = hasSubscription;  // 🔒 Бонусы только для подписчиков
  
  if (isGoalCompleted) {  // ✅ Credits для ВСЕХ (если цель выполнена)
    creditsEarned = goal_level * 10;  // Простая формула: goal_level 1=10, 2=20, 3=30, 4=40
    console.log(`💰 Credits calculated: goal_level=${goal_level} → ${creditsEarned} credits`);
  }

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

    // Начисляем базовый XP всем пользователям без ограничений
    await db.query(
      'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $2, total_credits = total_credits + $3, total_credits_earned = total_credits_earned + $3 WHERE user_id = $4',
      [xpAmount, steps, creditsEarned, userId]
    );
    xpGained = xpAmount;

    // 🔒 Бонус только для подписчиков
    if (isGoalCompleted && canEarnBonus) {
      bonusXP = parseFloat((steps * bonusPercent * 0.1).toFixed(1));
      
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1 WHERE user_id = $2',
        [bonusXP, userId]
      );
      console.log(`✅ Бонус начислен за ${date}: ${bonusXP} XP`);
      
      if (creditsEarned > 0) {
        console.log(`💰 Credits начислены за ${date}: ${creditsEarned} credits`);
      }
    } else if (isGoalCompleted && !canEarnBonus) {
      console.log(`✅ День ${date}: цель выполнена, credits начислены (${creditsEarned}), бонус недоступен (нет подписки)`);
    } else {
      console.log(`ℹ️ День ${date}: цель не выполнена, бонус и credits не начислены`);
    }

    await saveDailyStep(userId, {
      date,
      steps,
      goal_level,
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: true,
      credits_earned: creditsEarned
    });

  } else {
    // День существует - финализация
    const oldSteps = existingDay.rows[0].steps;
    const isFinalized = existingDay.rows[0].is_finalized;

    if (isFinalized) {
      console.log(`ℹ️ День ${date} уже был обработан ранее (дубликат)`);
      return { xpGained: 0, bonusXP: 0, creditsEarned: 0, goalReached: isGoalCompleted, stepsGoal };
    }

    console.log(`📅 Финализация дня: ${date} (было ${oldSteps} шагов, стало ${steps} шагов)`);
    
    const difference = steps - oldSteps;
    
    if (difference > 0) {
      const xpAmount = difference * 0.1;

      // Начисляем базовый XP всем пользователям без ограничений
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1, total_steps = total_steps + $2, total_credits = total_credits + $3, total_credits_earned = total_credits_earned + $3 WHERE user_id = $4',
        [xpAmount, difference, creditsEarned, userId]
      );
      xpGained = xpAmount;
      console.log(`✅ Начислен XP за разницу: ${xpAmount} (${difference} шагов)`);
    } else if (difference < 0) {
      console.warn(`⚠️ Шаги уменьшились для ${date}: ${oldSteps} → ${steps}`);
    }

    // 🔒 Бонус только для подписчиков
    if (isGoalCompleted && canEarnBonus) {
      bonusXP = parseFloat((steps * bonusPercent * 0.1).toFixed(1));
      
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1 WHERE user_id = $2',
        [bonusXP, userId]
      );
      console.log(`✅ Бонус начислен за ${date}: ${bonusXP} XP`);
      
      if (creditsEarned > 0) {
        console.log(`💰 Credits начислены за ${date}: ${creditsEarned} credits`);
      }
    } else if (isGoalCompleted && !canEarnBonus) {
      console.log(`✅ День ${date}: цель выполнена, credits начислены (${creditsEarned}), бонус недоступен (нет подписки)`);
    } else {
      console.log(`ℹ️ День ${date}: цель не выполнена, бонус и credits не начислены`);
    }

    await updateDailyStep(userId, date, {
      steps,
      is_goal_completed: isGoalCompleted,
      is_streak_completed: isStreakCompleted,
      is_finalized: true,
      credits_earned: creditsEarned
    });
  }

  return { xpGained, bonusXP, creditsEarned, goalReached: isGoalCompleted, stepsGoal };
}

/**
 * Обработка сегодняшнего дня (без бонусов)
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

    // Начисляем базовый XP всем пользователям без ограничений
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

      // Начисляем базовый XP всем пользователям без ограничений
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

/**
 * 🔄 Расчет прогресса с новой таблицей уровней
 */
async function getFinalProgress(userId) {
  const result = await db.query(
    'SELECT total_steps, total_xp, current_level, total_credits FROM user_progress WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    const characterData = getCharacterData(1);
    return {
      total_steps: 0,
      current_xp: 0,
      current_level: 1,
      xp_to_next_level: LEVEL_XP_REQUIREMENTS[2], // 8400
      total_xp: 0,
      total_credits: 0,
      character_image_url: characterData.image_url,
      character_animation_url: characterData.animation_url,
      current_streak: 0,
      longest_streak: 0
    };
  }

  const user = result.rows[0];
  const totalXP = parseFloat(user.total_xp);
  
  // 🔄 Вычисляем правильный уровень на основе total_xp
  let level = 1;
  
  for (let i = 10; i >= 1; i--) {
    if (totalXP >= LEVEL_XP_REQUIREMENTS[i]) {
      level = i;
      break;
    }
  }

  // ✅ Обновляем current_level в БД если изменился
  if (level !== user.current_level) {
    await db.query(
      'UPDATE user_progress SET current_level = $1 WHERE user_id = $2',
      [level, userId]
    );
    console.log(`📊 Level updated in DB: ${user.current_level} → ${level}`);
  }

  const currentXP = parseFloat((totalXP - LEVEL_XP_REQUIREMENTS[level]).toFixed(1));
  const xpToNext = level < 10 ? LEVEL_XP_REQUIREMENTS[level + 1] - LEVEL_XP_REQUIREMENTS[level] : 0;

  const characterData = getCharacterData(level);

  const currentStreak = await calculateCurrentStreak(userId);
  const longestStreak = await calculateLongestStreak(userId);

  return {
    total_steps: parseInt(user.total_steps),
    current_xp: currentXP,
    current_level: level,
    xp_to_next_level: xpToNext,
    total_xp: totalXP,
    total_credits: parseInt(user.total_credits) || 0,
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
