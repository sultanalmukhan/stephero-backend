const db = require('../db');

const { GOAL_CONFIG } = require('../config/goals');

// 🔥 Константа для стрика - статичное число шагов
const STREAK_THRESHOLD = 7000;

/**
 * ✅ Helper для форматирования даты БЕЗ timezone проблем
 */
function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * ✅ Сохранить день в базу (для новых дней)
 */
async function saveDailyStep(userId, dayData) {
  const { 
    date, 
    steps, 
    goal_level, 
    is_goal_completed, 
    is_streak_completed,
    is_finalized,
    credits_earned = 0
  } = dayData;
  
  const stepsGoal = GOAL_CONFIG[goal_level].steps;
  
  try {
    const query = `
      INSERT INTO daily_steps 
        (user_id, date, steps, goal_level, steps_goal, is_goal_completed, is_streak_completed, is_finalized, credits_earned)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const result = await db.query(query, [
      userId,
      date,
      steps,
      goal_level,
      stepsGoal,
      is_goal_completed,
      is_streak_completed,
      is_finalized,
      credits_earned
    ]);
    
    return result.rows[0];
  } catch (error) {
    console.error('❌ Ошибка при сохранении daily_step:', error);
    throw error;
  }
}

/**
 * ✅ Обновить существующий день
 */
async function updateDailyStep(userId, date, updates) {
  const { 
    steps, 
    is_goal_completed, 
    is_streak_completed, 
    is_finalized,
    credits_earned
  } = updates;
  
  try {
    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    if (steps !== undefined) {
      setClauses.push(`steps = $${paramIndex}`);
      values.push(steps);
      paramIndex++;
    }

    if (is_goal_completed !== undefined) {
      setClauses.push(`is_goal_completed = $${paramIndex}`);
      values.push(is_goal_completed);
      paramIndex++;
    }

    if (is_streak_completed !== undefined) {
      setClauses.push(`is_streak_completed = $${paramIndex}`);
      values.push(is_streak_completed);
      paramIndex++;
    }

    if (is_finalized !== undefined) {
      setClauses.push(`is_finalized = $${paramIndex}`);
      values.push(is_finalized);
      paramIndex++;
    }

    if (credits_earned !== undefined) {
      setClauses.push(`credits_earned = $${paramIndex}`);
      values.push(credits_earned);
      paramIndex++;
    }

    setClauses.push(`updated_at = NOW()`);
    values.push(userId, date);

    const query = `
      UPDATE daily_steps 
      SET ${setClauses.join(', ')}
      WHERE user_id = $${paramIndex} AND date = $${paramIndex + 1}
      RETURNING *
    `;
    
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Ошибка при обновлении daily_step:', error);
    throw error;
  }
}

/**
 * ✅ Подсчет текущего streak с учетом Freeze
 */
async function calculateCurrentStreak(userId) {
  try {
    const query = `
      SELECT date, steps, steps_goal, is_streak_completed, is_finalized, is_freeze_used
      FROM daily_steps
      WHERE user_id = $1
      ORDER BY date DESC
      LIMIT 365
    `;
    
    const result = await db.query(query, [userId]);
    const days = result.rows;
    
    if (days.length === 0) {
      return 0;
    }
    
    let todayStr;
    const firstDayDate = new Date(days[0].date);
    const firstDayStr = formatDateLocal(firstDayDate);
    
    if (!days[0].is_finalized) {
      todayStr = firstDayStr;
    } else {
      const nextDay = new Date(firstDayDate);
      nextDay.setDate(nextDay.getDate() + 1);
      todayStr = formatDateLocal(nextDay);
    }
    
    let streak = 0;
    let expectedDate = new Date(firstDayDate);
    expectedDate.setHours(0, 0, 0, 0);
    
    if (firstDayStr !== todayStr) {
      expectedDate.setDate(expectedDate.getDate() - 1);
    }
    
    for (const day of days) {
      const dayDate = new Date(day.date);
      const dayStr = formatDateLocal(dayDate);
      const expectedStr = formatDateLocal(expectedDate);
      
      if (dayStr !== expectedStr) {
        break;
      }
      
      let isStreakValid = false;
      
      if (day.is_finalized) {
        isStreakValid = day.is_streak_completed || day.is_freeze_used;
      } else {
        isStreakValid = day.steps >= STREAK_THRESHOLD;
      }
      
      if (isStreakValid) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        if (!day.is_finalized) {
          expectedDate.setDate(expectedDate.getDate() - 1);
          continue;
        } else {
          break;
        }
      }
    }
    
    return streak;
  } catch (error) {
    console.error('❌ Ошибка при подсчете current_streak:', error);
    return 0;
  }
}

/**
 * ✅ Подсчет самого длинного streak с учетом Freeze
 */
async function calculateLongestStreak(userId) {
  try {
    const query = `
      SELECT date, is_streak_completed, is_freeze_used
      FROM daily_steps
      WHERE user_id = $1 AND is_finalized = true
      ORDER BY date ASC
    `;
    
    const result = await db.query(query, [userId]);
    const days = result.rows;
    
    if (days.length === 0) {
      return 0;
    }
    
    let maxStreak = 0;
    let currentStreak = 0;
    let prevDateStr = null;
    
    for (const day of days) {
      const dayDate = new Date(day.date);
      const currentDateStr = formatDateLocal(dayDate);
      
      if (prevDateStr) {
        const [year, month, dayNum] = prevDateStr.split('-').map(Number);
        const prevDateObj = new Date(year, month - 1, dayNum);
        prevDateObj.setDate(prevDateObj.getDate() + 1);
        const expectedDateStr = formatDateLocal(prevDateObj);
        
        if (currentDateStr !== expectedDateStr) {
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 0;
        }
      }
      
      const isStreakValid = day.is_streak_completed || day.is_freeze_used;
      
      if (isStreakValid) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 0;
      }
      
      prevDateStr = currentDateStr;
    }
    
    maxStreak = Math.max(maxStreak, currentStreak);
    
    // Сравниваем с текущим streak
    const activeStreak = await calculateCurrentStreak(userId);
    
    return Math.max(maxStreak, activeStreak);
    
  } catch (error) {
    console.error('❌ Ошибка при подсчете longest_streak:', error);
    return 0;
  }
}

/**
 * 🧊 Обработка системы Freeze для пользователя
 */
async function processFreezeSystem(userId, hasSubscription = false) {
  try {
    const FREEZE_PERIOD_DAYS = 7;
    const FREEZE_PER_PERIOD = hasSubscription ? 2 : 1;
    const MAX_FREEZE_COUNT = hasSubscription ? 4 : 2;

    // 1. Получить текущее состояние Freeze
    const userResult = await db.query(
      'SELECT freeze_count, last_freeze_earned_at FROM user_progress WHERE user_id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return { freezeCount: 0, freezeUsedDays: [], freezesEarned: 0, freezesUsed: 0 };
    }

    const user = userResult.rows[0];
    let freezeCount = user.freeze_count || 0;
    let lastFreezeEarnedAt = user.last_freeze_earned_at;

    // 2. Если первый sync - инициализировать
    if (!lastFreezeEarnedAt) {
      const firstDayResult = await db.query(
        'SELECT MIN(date) as first_date FROM daily_steps WHERE user_id = $1 AND is_finalized = true',
        [userId]
      );
      
      let initDate;
      if (firstDayResult.rows.length > 0 && firstDayResult.rows[0].first_date) {
        initDate = new Date(firstDayResult.rows[0].first_date);
      } else {
        initDate = new Date();
        initDate.setDate(initDate.getDate() - 30);
      }
      
      await db.query(
        'UPDATE user_progress SET last_freeze_earned_at = $1 WHERE user_id = $2',
        [initDate, userId]
      );
      
      lastFreezeEarnedAt = initDate;
    }

    // 3. Вычислить сколько периодов прошло
    const now = new Date();
    const lastEarned = new Date(lastFreezeEarnedAt);
    const daysSince = Math.floor((now - lastEarned) / (1000 * 60 * 60 * 24));
    const periods = Math.floor(daysSince / FREEZE_PERIOD_DAYS);

    if (periods === 0) {
      return { freezeCount, freezeUsedDays: [], freezesEarned: 0, freezesUsed: 0 };
    }

    // 4. Получить все дни с момента последнего начисления до вчера
    const startDate = formatDateLocal(lastEarned);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const endDate = formatDateLocal(yesterday);

    const daysResult = await db.query(
      `SELECT date, steps, steps_goal, is_streak_completed, is_finalized, is_freeze_used
       FROM daily_steps
       WHERE user_id = $1 AND date >= $2 AND date <= $3
       ORDER BY date ASC`,
      [userId, startDate, endDate]
    );

    const days = daysResult.rows;

    // 5. Симулировать начисление и использование Freeze
    let tempFreezeCount = freezeCount;
    let periodsProcessed = 0;
    let freezesEarned = 0;
    let freezesUsed = 0;
    const freezeUsedDays = [];

    for (const day of days) {
      const dayDate = new Date(day.date);
      const daysSinceStart = Math.floor((dayDate - lastEarned) / (1000 * 60 * 60 * 24));
      const periodForThisDay = Math.floor(daysSinceStart / FREEZE_PERIOD_DAYS);

      if (periodForThisDay > periodsProcessed && periodsProcessed < periods) {
        const freezesToAdd = Math.min(FREEZE_PER_PERIOD, MAX_FREEZE_COUNT - tempFreezeCount);
        if (freezesToAdd > 0) {
          tempFreezeCount += freezesToAdd;
          freezesEarned += freezesToAdd;
        }
        periodsProcessed = periodForThisDay;
      }

      const dayStr = formatDateLocal(dayDate);
      if (!day.is_streak_completed && day.is_finalized && !day.is_freeze_used) {
        if (tempFreezeCount > 0) {
          tempFreezeCount--;
          freezesUsed++;
          await db.query(
            'UPDATE daily_steps SET is_freeze_used = true WHERE user_id = $1 AND date = $2',
            [userId, day.date]
          );
          freezeUsedDays.push(dayStr);
        }
      }
    }

    // 6. Обновить last_freeze_earned_at и freeze_count
    const newLastFreezeEarnedAt = new Date(lastEarned);
    newLastFreezeEarnedAt.setDate(newLastFreezeEarnedAt.getDate() + (periods * FREEZE_PERIOD_DAYS));

    await db.query(
      `UPDATE user_progress 
       SET freeze_count = $1, 
           last_freeze_earned_at = $2
       WHERE user_id = $3`,
      [tempFreezeCount, newLastFreezeEarnedAt, userId]
    );

    return {
      freezeCount: tempFreezeCount,
      freezeUsedDays,
      freezesEarned,
      freezesUsed
    };

  } catch (error) {
    console.error('❌ Error in processFreezeSystem:', error);
    return { freezeCount: 0, freezeUsedDays: [], freezesEarned: 0, freezesUsed: 0 };
  }
}

module.exports = {
  saveDailyStep,
  updateDailyStep,
  calculateCurrentStreak,
  calculateLongestStreak,
  processFreezeSystem,
  GOAL_CONFIG,
  STREAK_THRESHOLD
};
