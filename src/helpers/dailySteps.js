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
 * 🧊 ИСПРАВЛЕННАЯ система Freeze
 * 
 * Правила:
 * - Free user: +1 freeze каждые 7 дней, максимум 2
 * - Premium user: +2 freeze каждые 7 дней, максимум 4
 * - При провале дня (< 7000 шагов) тратится 1 freeze
 */
async function processFreezeSystem(userId, hasSubscription = false) {
  try {
    const FREEZE_PERIOD_DAYS = 7;
    const FREEZE_PER_PERIOD = hasSubscription ? 2 : 1;
    const MAX_FREEZE_COUNT = hasSubscription ? 4 : 2;

    // 1. Получить текущее состояние пользователя
    const userResult = await db.query(
      `SELECT freeze_count, last_freeze_earned_at, total_freezes_earned, total_freezes_used, created_at 
       FROM user_progress WHERE user_id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return { freezeCount: 0, freezeUsedDays: [], freezesEarned: 0, freezesUsed: 0 };
    }

    const user = userResult.rows[0];
    let freezeCount = user.freeze_count || 0;
    let lastFreezeEarnedAt = user.last_freeze_earned_at || user.created_at;
    let totalFreezesEarned = user.total_freezes_earned || 0;
    let totalFreezesUsed = user.total_freezes_used || 0;

    // 2. Получить все НЕобработанные финализированные дни
    //    (провальные дни где ещё не применён freeze)
    const failedDaysResult = await db.query(
      `SELECT date, steps, is_streak_completed, is_freeze_used
       FROM daily_steps
       WHERE user_id = $1 
         AND is_finalized = true 
         AND is_streak_completed = false 
         AND is_freeze_used = false
       ORDER BY date ASC`,
      [userId]
    );

    const failedDays = failedDaysResult.rows;
    const freezeUsedDays = [];
    let freezesEarnedThisSync = 0;
    let freezesUsedThisSync = 0;

    // 3. Обрабатываем каждый провальный день последовательно
    for (const day of failedDays) {
      const dayDate = new Date(day.date);
      
      // 3.1 Проверяем, нужно ли начислить freeze ДО этого дня
      const lastEarnedDate = new Date(lastFreezeEarnedAt);
      const daysSinceLastEarned = Math.floor((dayDate - lastEarnedDate) / (1000 * 60 * 60 * 24));
      
      // Начисляем freeze за каждый прошедший период (7 дней)
      while (daysSinceLastEarned >= FREEZE_PERIOD_DAYS) {
        const nextEarnDate = new Date(lastEarnedDate);
        nextEarnDate.setDate(nextEarnDate.getDate() + FREEZE_PERIOD_DAYS);
        
        // Проверяем что дата начисления <= дата провального дня
        if (nextEarnDate <= dayDate) {
          const freezesToAdd = Math.min(FREEZE_PER_PERIOD, MAX_FREEZE_COUNT - freezeCount);
          
          if (freezesToAdd > 0) {
            freezeCount += freezesToAdd;
            totalFreezesEarned += freezesToAdd;
            freezesEarnedThisSync += freezesToAdd;
            console.log(`🧊 +${freezesToAdd} freeze earned (total: ${freezeCount}/${MAX_FREEZE_COUNT})`);
          }
          
          lastFreezeEarnedAt = nextEarnDate;
          lastEarnedDate.setTime(nextEarnDate.getTime());
        } else {
          break;
        }
        
        // Пересчитываем дни
        const newDaysSince = Math.floor((dayDate - lastEarnedDate) / (1000 * 60 * 60 * 24));
        if (newDaysSince < FREEZE_PERIOD_DAYS) break;
      }

      // 3.2 Пробуем использовать freeze на этот провальный день
      if (freezeCount > 0) {
        freezeCount--;
        totalFreezesUsed++;
        freezesUsedThisSync++;
        
        const dayStr = formatDateLocal(dayDate);
        freezeUsedDays.push(dayStr);
        
        // Обновляем день в БД
        await db.query(
          'UPDATE daily_steps SET is_freeze_used = true WHERE user_id = $1 AND date = $2',
          [userId, day.date]
        );
        
        console.log(`🧊 Freeze used on ${dayStr} (remaining: ${freezeCount})`);
      } else {
        // Нет freeze — стрик сломан на этом дне
        const dayStr = formatDateLocal(dayDate);
        console.log(`❌ No freeze available for ${dayStr} — streak broken`);
      }
    }

    // 4. Проверяем начисление freeze до СЕГОДНЯ (для будущих провалов)
    const today = new Date();
    const lastEarnedDate = new Date(lastFreezeEarnedAt);
    const daysSinceLastEarned = Math.floor((today - lastEarnedDate) / (1000 * 60 * 60 * 24));
    const periodsToAdd = Math.floor(daysSinceLastEarned / FREEZE_PERIOD_DAYS);
    
    if (periodsToAdd > 0) {
      for (let i = 0; i < periodsToAdd; i++) {
        const freezesToAdd = Math.min(FREEZE_PER_PERIOD, MAX_FREEZE_COUNT - freezeCount);
        
        if (freezesToAdd > 0) {
          freezeCount += freezesToAdd;
          totalFreezesEarned += freezesToAdd;
          freezesEarnedThisSync += freezesToAdd;
          console.log(`🧊 +${freezesToAdd} freeze earned (total: ${freezeCount}/${MAX_FREEZE_COUNT})`);
        }
      }
      
      // Обновляем дату последнего начисления
      lastFreezeEarnedAt = new Date(lastEarnedDate);
      lastFreezeEarnedAt.setDate(lastFreezeEarnedAt.getDate() + (periodsToAdd * FREEZE_PERIOD_DAYS));
    }

    // 5. Сохраняем всё в БД
    await db.query(
      `UPDATE user_progress 
       SET freeze_count = $1, 
           last_freeze_earned_at = $2,
           total_freezes_earned = $3,
           total_freezes_used = $4
       WHERE user_id = $5`,
      [freezeCount, lastFreezeEarnedAt, totalFreezesEarned, totalFreezesUsed, userId]
    );

    return {
      freezeCount,
      freezeUsedDays,
      freezesEarned: freezesEarnedThisSync,
      freezesUsed: freezesUsedThisSync
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
