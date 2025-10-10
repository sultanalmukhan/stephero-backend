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
    
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при сохранении daily_step:', error);
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
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при обновлении daily_step:', error);
    throw error;
  }
}

/**
 * ✅ ИСПРАВЛЕНО: Подсчет текущего streak (дней подряд)
 * Убраны timezone проблемы - работаем напрямую со строками дат
 */
async function calculateCurrentStreak(userId) {
  try {
    const query = `
      SELECT date, steps, steps_goal, is_streak_completed, is_finalized
      FROM daily_steps
      WHERE user_id = $1
      ORDER BY date DESC
      LIMIT 365
    `;
    
    const result = await db.query(query, [userId]);
    const days = result.rows;
    
    if (days.length === 0) return 0;
    
    let streak = 0;
    let expectedDate = new Date();
    expectedDate.setHours(0, 0, 0, 0);
    
    // ✅ Форматируем сегодняшнюю дату БЕЗ timezone проблем
    const today = formatDateLocal(expectedDate);
    const firstDayStr = days[0].date;  // Уже строка "yyyy-MM-dd" из БД
    
    // Если сегодня еще нет записи, начинаем со вчера
    if (firstDayStr !== today) {
      expectedDate.setDate(expectedDate.getDate() - 1);
    }
    
    for (const day of days) {
      // ✅ Работаем напрямую со строками дат из БД
      const dayStr = day.date;  // Уже "yyyy-MM-dd"
      const expectedStr = formatDateLocal(expectedDate);
      
      if (dayStr !== expectedStr) {
        break; // Пропуск дня - streak сломан
      }
      
      // Для финализированных дней - смотрим на флаг
      // Для сегодняшнего дня (is_finalized = false) - пересчитываем
      let isStreakValid = false;
      
      if (day.is_finalized) {
        isStreakValid = day.is_streak_completed;
      } else {
        // Сегодняшний день - пересчитываем динамически
        const threshold = day.steps_goal * 0.5;
        isStreakValid = day.steps >= threshold;
      }
      
      if (isStreakValid) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break; // День не выполнен - streak сломан
      }
    }
    
    return streak;
  } catch (error) {
    console.error('Ошибка при подсчете current_streak:', error);
    return 0;
  }
}

/**
 * ✅ ИСПРАВЛЕНО: Подсчет самого длинного streak за все время
 * Убраны timezone проблемы
 */
async function calculateLongestStreak(userId) {
  try {
    const query = `
      SELECT date, is_streak_completed
      FROM daily_steps
      WHERE user_id = $1 AND is_finalized = true
      ORDER BY date ASC
    `;
    
    const result = await db.query(query, [userId]);
    const days = result.rows;
    
    if (days.length === 0) return 0;
    
    let maxStreak = 0;
    let currentStreak = 0;
    let prevDateStr = null;
    
    for (const day of days) {
      // ✅ Работаем напрямую со строками дат
      const currentDateStr = day.date;  // Уже "yyyy-MM-dd"
      
      if (prevDateStr) {
        // Парсим предыдущую дату и добавляем 1 день
        const [year, month, dayNum] = prevDateStr.split('-').map(Number);
        const prevDate = new Date(year, month - 1, dayNum);
        prevDate.setDate(prevDate.getDate() + 1);
        const expectedDateStr = formatDateLocal(prevDate);
        
        // Проверяем последовательность дней
        if (currentDateStr !== expectedDateStr) {
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 0;
        }
      }
      
      if (day.is_streak_completed) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 0;
      }
      
      prevDateStr = currentDateStr;
    }
    
    maxStreak = Math.max(maxStreak, currentStreak);
    return maxStreak;
  } catch (error) {
    console.error('Ошибка при подсчете longest_streak:', error);
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
