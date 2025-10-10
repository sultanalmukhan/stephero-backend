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
 * Сохранить день в базу (для новых дней)
 */
async function saveDailyStep(userId, dayData) {
  const { 
    date, 
    steps, 
    goal_level, 
    is_goal_completed, 
    is_streak_completed,
    is_finalized 
  } = dayData;
  
  const stepsGoal = GOAL_CONFIG[goal_level].steps;
  
  try {
    const query = `
      INSERT INTO daily_steps 
        (user_id, date, steps, goal_level, steps_goal, is_goal_completed, is_streak_completed, is_finalized)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
      is_finalized
    ]);
    
    console.log(`✅ Сохранен день: ${date}, steps: ${steps}, finalized: ${is_finalized}`);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Ошибка при сохранении daily_step:', error);
    throw error;
  }
}

/**
 * Обновить существующий день (для обновления сегодняшнего дня или финализации)
 */
async function updateDailyStep(userId, date, updates) {
  const { 
    steps, 
    is_goal_completed, 
    is_streak_completed, 
    is_finalized 
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
 * ✅ ИСПРАВЛЕНО: Подсчет текущего streak (дней подряд)
 * - Определяет "сегодня" из данных БД (не финализированный день)
 * - Убраны timezone проблемы
 * - PostgreSQL Date объекты конвертируются в строки
 */
async function calculateCurrentStreak(userId) {
  try {
    console.log('\n🔍 === calculateCurrentStreak START ===');
    console.log('   User ID:', userId);
    
    const query = `
      SELECT date, steps, steps_goal, is_streak_completed, is_finalized
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
    
    // ✅ ИСПРАВЛЕНИЕ: Определяем "сегодня" из данных БД
    // Ищем первый не финализированный день (это сегодня)
    // Если все финализированы, берем самую свежую дату
    let todayStr;
    const firstDayDate = new Date(days[0].date);
    const firstDayStr = formatDateLocal(firstDayDate);
    
    if (!days[0].is_finalized) {
      // Первый день не финализирован = это сегодня
      todayStr = firstDayStr;
      console.log('   📅 Today (from non-finalized):', todayStr);
    } else {
      // Все дни финализированы, берем день после последнего
      const nextDay = new Date(firstDayDate);
      nextDay.setDate(nextDay.getDate() + 1);
      todayStr = formatDateLocal(nextDay);
      console.log('   📅 Today (calculated as day after last):', todayStr);
    }
    
    let streak = 0;
    let expectedDate = new Date(firstDayDate);
    expectedDate.setHours(0, 0, 0, 0);
    
    // Если первый день в БД не сегодня, начинаем со вчера
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
      
      // Для финализированных дней - смотрим на флаг
      // Для сегодняшнего дня (is_finalized = false) - пересчитываем
      let isStreakValid = false;
      
      if (day.is_finalized) {
        isStreakValid = day.is_streak_completed;
        console.log(`      Finalized: ${isStreakValid ? '✅' : '❌'} (from flag)`);
      } else {
        // Сегодняшний день - пересчитываем динамически
        const threshold = day.steps_goal * 0.5;
        isStreakValid = day.steps >= threshold;
        console.log(`      Today: ${day.steps} >= ${threshold}? ${isStreakValid ? '✅' : '❌'}`);
      }
      
      if (isStreakValid) {
        streak++;
        console.log(`      ✅ Streak continues! Count: ${streak}`);
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        console.log('      ❌ Day not completed, breaking streak');
        break;
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
 * ✅ ИСПРАВЛЕНО: Подсчет самого длинного streak за все время
 * - Убраны timezone проблемы
 * - Исправлен баг с undefined prevDateStr
 * - PostgreSQL Date объекты конвертируются в строки
 */
async function calculateLongestStreak(userId) {
  try {
    console.log('\n🔍 === calculateLongestStreak START ===');
    console.log('   User ID:', userId);
    
    const query = `
      SELECT date, is_streak_completed
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
        // Парсим предыдущую дату и добавляем 1 день
        const [year, month, dayNum] = prevDateStr.split('-').map(Number);
        const prevDateObj = new Date(year, month - 1, dayNum);
        prevDateObj.setDate(prevDateObj.getDate() + 1);
        const expectedDateStr = formatDateLocal(prevDateObj);
        
        // Проверяем последовательность дней
        if (currentDateStr !== expectedDateStr) {
          console.log(`   ⚠️  Gap detected: ${prevDateStr} -> ${currentDateStr}, resetting streak`);
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 0;
        }
      }
      
      if (day.is_streak_completed) {
        currentStreak++;
        console.log(`   ✅ ${currentDateStr}: streak continues (${currentStreak})`);
      } else {
        console.log(`   ❌ ${currentDateStr}: streak broken`);
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 0;
      }
      
      prevDateStr = currentDateStr;
    }
    
    maxStreak = Math.max(maxStreak, currentStreak);
    console.log(`\n   🏆 LONGEST STREAK: ${maxStreak}`);
    console.log('🔍 === calculateLongestStreak END ===\n');
    return maxStreak;
  } catch (error) {
    console.error('❌ Ошибка при подсчете longest_streak:', error);
    return 0;
  }
}

module.exports = {
  saveDailyStep,
  updateDailyStep,
  calculateCurrentStreak,
  calculateLongestStreak,
  GOAL_CONFIG
};
