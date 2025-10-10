const db = require('../db');

const GOAL_CONFIG = {
  1: { steps: 5000, bonus: 0.10 },
  2: { steps: 7500, bonus: 0.20 },
  3: { steps: 10000, bonus: 0.30 },
  4: { steps: 12500, bonus: 0.40 }
};

// ✅ HELPER: Парсинг даты в UTC для избежания timezone проблем
function parseUTCDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

// ✅ HELPER: Форматирование даты в yyyy-MM-dd
function formatUTCDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
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
      parseInt(steps),                    // ✅ Явное приведение к integer
      parseInt(goal_level),               // ✅ Явное приведение к integer
      parseInt(stepsGoal),                // ✅ Явное приведение к integer
      Boolean(is_goal_completed),         // ✅ Явное приведение к boolean
      Boolean(is_streak_completed),       // ✅ Явное приведение к boolean
      Boolean(is_finalized)               // ✅ Явное приведение к boolean
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
    // Обновляем только переданные поля
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
      setClauses.push(`is_finalized = ${paramIndex}`);
      values.push(is_finalized);
      paramIndex++;
    }

    // ✅ Убрали updated_at, так как колонки нет в БД
    // setClauses.push(`updated_at = NOW()`);

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
 * Подсчет текущего streak (дней подряд)
 * Учитывает сегодняшний день динамически
 * ✅ ИСПРАВЛЕНО: использует UTC для избежания timezone проблем
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
    
    // ✅ Используем UTC для текущей даты
    const now = new Date();
    let expectedDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
    // Если сегодня еще нет записи, начинаем со вчера
    const today = formatUTCDate(expectedDate);
    const firstDayStr = days[0].date;
    
    if (firstDayStr !== today) {
      expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
    }
    
    for (const day of days) {
      // ✅ Парсим дату в UTC
      const dayDate = parseUTCDate(day.date);
      const dayStr = formatUTCDate(dayDate);
      const expectedStr = formatUTCDate(expectedDate);
      
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
        expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
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
 * Подсчет самого длинного streak за все время
 * Учитывает только финализированные дни
 * ✅ ИСПРАВЛЕНО: использует UTC для избежания timezone проблем
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
    let prevDate = null;
    
    for (const day of days) {
      // ✅ Парсим дату в UTC
      const currentDate = parseUTCDate(day.date);
      
      if (prevDate) {
        const expectedDate = new Date(prevDate);
        expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);
        
        // Проверяем последовательность дней
        if (currentDate.getTime() !== expectedDate.getTime()) {
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
      
      prevDate = currentDate;
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
