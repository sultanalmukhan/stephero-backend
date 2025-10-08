const db = require('../db');

const GOAL_CONFIG = {
  1: { steps: 5000, bonus: 0.10 },
  2: { steps: 7500, bonus: 0.20 },
  3: { steps: 10000, bonus: 0.30 },
  4: { steps: 12500, bonus: 0.40 }
};

/**
 * Сохранить завершенный день в базу
 */
async function saveDailyStep(userId, completedDay) {
  const { date, steps, goal_level } = completedDay;
  
  // Получаем цель для этого уровня
  const stepsGoal = GOAL_CONFIG[goal_level].steps;
  
  // Вычисляем флаги
  const isGoalCompleted = steps >= stepsGoal;
  const isStreakCompleted = steps >= (stepsGoal * 0.5);
  
  try {
    // Сохраняем в БД (игнорируем если уже есть)
    const query = `
      INSERT INTO daily_steps 
        (user_id, date, steps, goal_level, steps_goal, is_goal_completed, is_streak_completed)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (user_id, date) DO NOTHING
      RETURNING *
    `;
    
    const result = await db.query(query, [
      userId,
      date,
      steps,
      goal_level,
      stepsGoal,
      isGoalCompleted,
      isStreakCompleted
    ]);
    
    return result.rows[0]; // null если уже существовал
  } catch (error) {
    console.error('Ошибка при сохранении daily_step:', error);
    throw error;
  }
}

/**
 * Подсчет текущего streak (дней подряд с начала)
 */
async function calculateCurrentStreak(userId) {
  try {
    const query = `
      SELECT date, is_streak_completed
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
    
    // Если сегодня еще нет записи, начинаем со вчера
    const today = expectedDate.toISOString().split('T')[0];
    const firstDayStr = new Date(days[0].date).toISOString().split('T')[0];
    
    if (firstDayStr !== today) {
      expectedDate.setDate(expectedDate.getDate() - 1);
    }
    
    for (const day of days) {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      const dayStr = dayDate.toISOString().split('T')[0];
      const expectedStr = expectedDate.toISOString().split('T')[0];
      
      if (dayStr !== expectedStr) {
        break; // Пропуск дня - streak сломан
      }
      
      if (day.is_streak_completed) {
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
 * Подсчет самого длинного streak за все время
 */
async function calculateLongestStreak(userId) {
  try {
    const query = `
      SELECT date, is_streak_completed
      FROM daily_steps
      WHERE user_id = $1
      ORDER BY date ASC
    `;
    
    const result = await db.query(query, [userId]);
    const days = result.rows;
    
    if (days.length === 0) return 0;
    
    let maxStreak = 0;
    let currentStreak = 0;
    let prevDate = null;
    
    for (const day of days) {
      const currentDate = new Date(day.date);
      currentDate.setHours(0, 0, 0, 0);
      
      if (prevDate) {
        const expectedDate = new Date(prevDate);
        expectedDate.setDate(expectedDate.getDate() + 1);
        
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
  calculateCurrentStreak,
  calculateLongestStreak,
  GOAL_CONFIG
};
