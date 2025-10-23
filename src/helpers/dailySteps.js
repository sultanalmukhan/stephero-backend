const db = require('../db');

const GOAL_CONFIG = {
  1: { steps: 5000, bonus: 0.10 },
  2: { steps: 7500, bonus: 0.20 },
  3: { steps: 10000, bonus: 0.30 },
  4: { steps: 12500, bonus: 0.40 }
};

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
 * ✅ ОБНОВЛЕНО: Сохранить день в базу (для новых дней)
 * Добавлена поддержка credits_earned
 */
async function saveDailyStep(userId, dayData) {
  const { 
    date, 
    steps, 
    goal_level, 
    is_goal_completed, 
    is_streak_completed,
    is_finalized,
    credits_earned = 0  // ✨ ДОБАВИЛИ
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
      credits_earned  // ✨ ДОБАВИЛИ
    ]);
    
    console.log(`✅ Сохранен день: ${date}, steps: ${steps}, finalized: ${is_finalized}, credits: ${credits_earned}`);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Ошибка при сохранении daily_step:', error);
    throw error;
  }
}

/**
 * ✅ ОБНОВЛЕНО: Обновить существующий день (для обновления сегодняшнего дня или финализации)
 * Добавлена поддержка credits_earned
 */
async function updateDailyStep(userId, date, updates) {
  const { 
    steps, 
    is_goal_completed, 
    is_streak_completed, 
    is_finalized,
    credits_earned  // ✨ ДОБАВИЛИ
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

    // ✨ ДОБАВИЛИ
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
    console.log(`✅ Обновлен день: ${date}, updates:`, updates);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Ошибка при обновлении daily_step:', error);
    throw error;
  }
}

/**
 * ✅ ИСПРАВЛЕНО: Подсчет текущего streak с учетом Freeze
 * 
 * ЛОГИКА:
 * - Если сегодняшний день (не финализирован) НЕ выполнен → пропускаем его, считаем со вчера
 * - Если сегодняшний день (не финализирован) выполнен → включаем его в streak
 * - Streak сбрасывается только когда финализированный день не выполнен (и нет freeze)
 * - День считается выполненным если is_streak_completed ИЛИ is_freeze_used
 * 
 * ПРИМЕРЫ:
 * День 1-10: выполнены → streak = 10
 * День 11 (сегодня): 1000/5000 шагов → показываем streak = 10 (не считаем сегодня)
 * День 12 (новый сегодня): проверяем день 11 финализирован и не выполнен → streak = 0
 */
async function calculateCurrentStreak(userId) {
  try {
    console.log('\n🔍 === calculateCurrentStreak START ===');
    console.log('   User ID:', userId);
    
    const query = `
      SELECT date, steps, steps_goal, is_streak_completed, is_finalized, is_freeze_used
      FROM daily_steps
      WHERE user_id = $1
      ORDER BY date DESC
      LIMIT 365
    `;
    
    const result = await db.query(query, [userId]);
    const days = result.rows;
    
    console.log('   📊 Days found:', days.length);
    
    if (days.length === 0) {
      console.log('   ❌ No days found, streak = 0');
      console.log('🔍 === calculateCurrentStreak END ===\n');
      return 0;
    }
    
    let todayStr;
    const firstDayDate = new Date(days[0].date);
    const firstDayStr = formatDateLocal(firstDayDate);
    
    if (!days[0].is_finalized) {
      todayStr = firstDayStr;
      console.log('   📅 Today (from non-finalized):', todayStr);
    } else {
      const nextDay = new Date(firstDayDate);
      nextDay.setDate(nextDay.getDate() + 1);
      todayStr = formatDateLocal(nextDay);
      console.log('   📅 Today (calculated as day after last):', todayStr);
    }
    
    let streak = 0;
    let expectedDate = new Date(firstDayDate);
    expectedDate.setHours(0, 0, 0, 0);
    
    if (firstDayStr !== todayStr) {
      expectedDate.setDate(expectedDate.getDate() - 1);
      console.log('   ⏮️  Starting from:', formatDateLocal(expectedDate));
    }
    
    for (const day of days) {
      const dayDate = new Date(day.date);
      const dayStr = formatDateLocal(dayDate);
      const expectedStr = formatDateLocal(expectedDate);
      
      console.log(`\n   📆 Checking: ${dayStr}`);
      console.log(`      Expected: ${expectedStr}`);
      
      if (dayStr !== expectedStr) {
        console.log('      ❌ Day gap detected, breaking streak');
        break;
      }
      
      let isStreakValid = false;
      
      if (day.is_finalized) {
        // ✅ ОБНОВЛЕНО: Учитываем is_freeze_used
        isStreakValid = day.is_streak_completed || day.is_freeze_used;
        const reason = day.is_freeze_used ? 'freeze used' : 'from flag';
        console.log(`      Finalized: ${isStreakValid ? '✅' : '❌'} (${reason})`);
      } else {
        const threshold = day.steps_goal * 0.5;
        isStreakValid = day.steps >= threshold;
        console.log(`      Today: ${day.steps} >= ${threshold}? ${isStreakValid ? '✅' : '❌'}`);
      }
      
      if (isStreakValid) {
        streak++;
        console.log(`      ✅ Streak continues! Count: ${streak}`);
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        // 🔧 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ:
        // Если это сегодняшний день (не финализирован) и не выполнен - пропускаем его
        if (!day.is_finalized) {
          console.log('      ⏭️  Today not completed yet, skipping to yesterday');
          expectedDate.setDate(expectedDate.getDate() - 1);
          continue;  // ✅ Продолжаем проверять со вчерашнего дня
        } else {
          // ❌ Финализированный день не выполнен - streak прерывается
          console.log('      ❌ Finalized day not completed, breaking streak');
          break;
        }
      }
    }
    
    console.log(`\n   🔥 FINAL STREAK: ${streak}`);
    console.log('🔍 === calculateCurrentStreak END ===\n');
    return streak;
  } catch (error) {
    console.error('❌ Ошибка при подсчете current_streak:', error);
    return 0;
  }
}

/**
 * ✅ ИСПРАВЛЕНО: Подсчет самого длинного streak с учетом Freeze
 * 
 * ЛОГИКА:
 * - Считает максимальный streak среди финализированных дней
 * - Сравнивает с текущим streak (может включать сегодня)
 * - Возвращает максимум из двух значений
 * - Гарантирует: longest_streak >= current_streak
 * - День считается выполненным если is_streak_completed ИЛИ is_freeze_used
 * 
 * ПРИМЕРЫ:
 * Финализированные дни: streak = 15
 * Текущий streak: 20 (включая сегодня)
 * → longest_streak = 20 ✅
 */
async function calculateLongestStreak(userId) {
  try {
    console.log('\n🔍 === calculateLongestStreak START ===');
    console.log('   User ID:', userId);
    
    const query = `
      SELECT date, is_streak_completed, is_freeze_used
      FROM daily_steps
      WHERE user_id = $1 AND is_finalized = true
      ORDER BY date ASC
    `;
    
    const result = await db.query(query, [userId]);
    const days = result.rows;
    
    console.log('   📊 Finalized days found:', days.length);
    
    if (days.length === 0) {
      console.log('   ❌ No finalized days, longest = 0');
      console.log('🔍 === calculateLongestStreak END ===\n');
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
          console.log(`   ⚠️  Gap detected: ${prevDateStr} -> ${currentDateStr}, resetting streak`);
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 0;
        }
      }
      
      // ✅ ОБНОВЛЕНО: Учитываем is_freeze_used
      const isStreakValid = day.is_streak_completed || day.is_freeze_used;
      
      if (isStreakValid) {
        currentStreak++;
        const reason = day.is_freeze_used ? '(freeze)' : '';
        console.log(`   ✅ ${currentDateStr}: streak continues (${currentStreak}) ${reason}`);
      } else {
        console.log(`   ❌ ${currentDateStr}: streak broken`);
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 0;
      }
      
      prevDateStr = currentDateStr;
    }
    
    maxStreak = Math.max(maxStreak, currentStreak);
    console.log(`   🏆 Max streak from finalized days: ${maxStreak}`);
    
    // 🔧 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ:
    // Сравниваем с текущим streak (может включать сегодня)
    const activeStreak = await calculateCurrentStreak(userId);
    console.log(`   🔥 Current active streak: ${activeStreak}`);
    
    const finalLongestStreak = Math.max(maxStreak, activeStreak);
    console.log(`\n   🏆 FINAL LONGEST STREAK: ${finalLongestStreak}`);
    console.log('🔍 === calculateLongestStreak END ===\n');
    
    return finalLongestStreak;
    
  } catch (error) {
    console.error('❌ Ошибка при подсчете longest_streak:', error);
    return 0;
  }
}

/**
 * 🧊 Обработка системы Freeze для пользователя
 * - Вычисляет периоды начисления (каждые 14 дней)
 * - Автоматически использует Freeze на провальные дни
 * - Обновляет freeze_count и last_freeze_earned_at
 */
async function processFreezeSystem(userId) {
  try {
    console.log('\n🧊 === processFreezeSystem START ===');
    console.log('   User ID:', userId);

    // 1. Получить текущее состояние Freeze
    const userResult = await db.query(
      'SELECT freeze_count, last_freeze_earned_at FROM user_progress WHERE user_id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      console.log('   ❌ User not found');
      return { freezeCount: 0, freezeUsedDays: [], freezesEarned: 0, freezesUsed: 0 };
    }

    const user = userResult.rows[0];
    let freezeCount = user.freeze_count || 0;
    let lastFreezeEarnedAt = user.last_freeze_earned_at;

    console.log('   Current freeze_count:', freezeCount);
    console.log('   Last freeze earned at:', lastFreezeEarnedAt);

    // 2. Если первый sync - инициализировать
    if (!lastFreezeEarnedAt) {
      console.log('   ⚙️  First sync - initializing freeze system');
      const now = new Date();
      await db.query(
        'UPDATE user_progress SET last_freeze_earned_at = $1 WHERE user_id = $2',
        [now, userId]
      );
      console.log('   ✅ Freeze system initialized');
      console.log('🧊 === processFreezeSystem END ===\n');
      return { freezeCount: 0, freezeUsedDays: [], freezesEarned: 0, freezesUsed: 0 };
    }

    // 3. Вычислить сколько периодов прошло
    const now = new Date();
    const lastEarned = new Date(lastFreezeEarnedAt);
    const daysSince = Math.floor((now - lastEarned) / (1000 * 60 * 60 * 24));
    const periods = Math.floor(daysSince / 14);

    console.log('   Days since last earned:', daysSince);
    console.log('   Periods to process:', periods);

    if (periods === 0) {
      console.log('   ℹ️  No new periods to process');
      console.log('🧊 === processFreezeSystem END ===\n');
      return { freezeCount, freezeUsedDays: [], freezesEarned: 0, freezesUsed: 0 };
    }

    // 4. Получить все дни с момента последнего начисления до вчера
    const startDate = formatDateLocal(lastEarned);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const endDate = formatDateLocal(yesterday);

    console.log('   Processing days from', startDate, 'to', endDate);

    const daysResult = await db.query(
      `SELECT date, steps, steps_goal, is_streak_completed, is_finalized, is_freeze_used
       FROM daily_steps
       WHERE user_id = $1 AND date >= $2 AND date <= $3
       ORDER BY date ASC`,
      [userId, startDate, endDate]
    );

    const days = daysResult.rows;
    console.log('   Days found:', days.length);

    // 5. Симулировать начисление и использование Freeze
    let tempFreezeCount = freezeCount;
    let periodsProcessed = 0;
    let freezesEarned = 0;
    let freezesUsed = 0;
    const freezeUsedDays = [];

    for (const day of days) {
      const dayDate = new Date(day.date);
      const daysSinceStart = Math.floor((dayDate - lastEarned) / (1000 * 60 * 60 * 24));
      const periodForThisDay = Math.floor(daysSinceStart / 14);

      // Проверить не пора ли начислить Freeze
      if (periodForThisDay > periodsProcessed && periodsProcessed < periods) {
        if (tempFreezeCount < 4) {
          tempFreezeCount++;
          freezesEarned++;
          console.log(`   🎁 Freeze earned on period ${periodForThisDay + 1} (count: ${tempFreezeCount})`);
        } else {
          console.log(`   ⚠️  Freeze limit reached (4), cannot earn more`);
        }
        periodsProcessed = periodForThisDay;
      }

      // Проверить нужно ли использовать Freeze
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
          console.log(`   ❄️  Freeze used on ${dayStr} (remaining: ${tempFreezeCount})`);
        } else {
          console.log(`   ❌ No Freeze available for ${dayStr}, streak broken`);
        }
      }
    }

    // 6. Обновить last_freeze_earned_at и freeze_count
    const newLastFreezeEarnedAt = new Date(lastEarned);
    newLastFreezeEarnedAt.setDate(newLastFreezeEarnedAt.getDate() + (periods * 14));

    await db.query(
      `UPDATE user_progress 
       SET freeze_count = $1, 
           last_freeze_earned_at = $2,
           total_freezes_earned = total_freezes_earned + $3,
           total_freezes_used = total_freezes_used + $4
       WHERE user_id = $5`,
      [tempFreezeCount, newLastFreezeEarnedAt, freezesEarned, freezesUsed, userId]
    );

    console.log('   ✅ Final freeze_count:', tempFreezeCount);
    console.log('   ✅ Freezes earned this sync:', freezesEarned);
    console.log('   ✅ Freezes used this sync:', freezesUsed);
    console.log('   ✅ New last_freeze_earned_at:', formatDateLocal(newLastFreezeEarnedAt));
    console.log('🧊 === processFreezeSystem END ===\n');

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
  GOAL_CONFIG
};
