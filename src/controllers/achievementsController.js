const db = require('../db');
const { calculateLongestStreak } = require('../helpers/dailySteps');

// Вспомогательная функция: получить лучший день пользователя
async function getBestDaySteps(userId) {
  const result = await db.query(
    'SELECT MAX(steps) as best_day FROM daily_steps WHERE user_id = $1',
    [userId]
  );
  return result.rows[0]?.best_day || 0;
}

// Вспомогательная функция: проверка выполнения достижения
function isAchievementCompleted(achievement, userStats) {
  const { requirement_type, requirement_value } = achievement;
  
  switch (requirement_type) {
    case 'total_steps':
      return userStats.totalSteps >= requirement_value;
    
    case 'longest_streak':
      return userStats.longestStreak >= requirement_value;
    
    case 'best_day':
      // Для best_day достаточно чтобы был хоть один день
      return userStats.bestDaySteps > 0;
    
    default:
      return false;
  }
}

// Вспомогательная функция: вычислить прогресс
function calculateProgress(achievement, userStats) {
  const { requirement_type, requirement_value } = achievement;
  
  let current = 0;
  let required = parseInt(requirement_value);
  
  switch (requirement_type) {
    case 'total_steps':
      current = userStats.totalSteps;
      break;
    
    case 'longest_streak':
      current = userStats.longestStreak;
      break;
    
    case 'best_day':
      // Для best_day показываем текущий рекорд
      current = userStats.bestDaySteps;
      required = userStats.bestDaySteps; // required = current (всегда 100%)
      break;
  }
  
  const percentage = required > 0 ? Math.min(100, Math.floor((current / required) * 100)) : 0;
  
  return {
    current,
    required,
    percentage
  };
}

// Вспомогательная функция: форматировать requirement для UI
function formatRequirement(achievement) {
  const { requirement_type, requirement_value } = achievement;
  
  switch (requirement_type) {
    case 'total_steps':
      if (requirement_value >= 1000000) {
        return `${(requirement_value / 1000000).toFixed(1)}M steps`;
      } else if (requirement_value >= 1000) {
        return `${(requirement_value / 1000).toFixed(0)}K steps`;
      }
      return `${requirement_value} steps`;
    
    case 'longest_streak':
      return `${requirement_value} days`;
    
    case 'best_day':
      return 'Beat your personal record';
    
    default:
      return '';
  }
}

// Основной контроллер
async function getAchievements(req, res) {
  const { user_id } = req.query;

  // Валидация
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  try {
    // 1. Получить статистику пользователя
    const userProgressResult = await db.query(
      'SELECT total_steps FROM user_progress WHERE user_id = $1',
      [user_id]
    );

    if (userProgressResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalSteps = parseInt(userProgressResult.rows[0].total_steps) || 0;
    const longestStreak = await calculateLongestStreak(user_id);
    const bestDaySteps = await getBestDaySteps(user_id);

    const userStats = {
      totalSteps,
      longestStreak,
      bestDaySteps
    };

    console.log(`📊 Achievements для ${user_id}:`);
    console.log(`   Total steps: ${totalSteps}`);
    console.log(`   Longest streak: ${longestStreak}`);
    console.log(`   Best day: ${bestDaySteps}`);

    // 2. Получить все достижения из БД
    const achievementsResult = await db.query(
      'SELECT * FROM achievements ORDER BY category, display_order'
    );
    const allAchievements = achievementsResult.rows;

    // 3. Получить разблокированные достижения пользователя
    const unlockedResult = await db.query(
      'SELECT achievement_id, unlocked_at FROM user_achievements WHERE user_id = $1',
      [user_id]
    );
    
    const unlockedMap = {};
    unlockedResult.rows.forEach(row => {
      unlockedMap[row.achievement_id] = row.unlocked_at;
    });

    // 4. Обработать каждое достижение
    const processedAchievements = [];

    for (const achievement of allAchievements) {
      const isCompleted = isAchievementCompleted(achievement, userStats);
      const isUnlocked = !!unlockedMap[achievement.id];

      // Если выполнено, но не разблокировано - разблокировать сейчас
      if (isCompleted && !isUnlocked) {
        await db.query(
          'INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [user_id, achievement.id]
        );
        
        // Добавить в map с текущей датой
        unlockedMap[achievement.id] = new Date();
        console.log(`🎉 Разблокировано достижение: ${achievement.id}`);
      }

      // Вычислить прогресс
      const progress = calculateProgress(achievement, userStats);

      // Определить какую иконку использовать
      const iconUrl = (isCompleted || unlockedMap[achievement.id]) 
        ? achievement.icon_url_unlocked 
        : achievement.icon_url_locked;

      // Сформировать объект достижения
      processedAchievements.push({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        icon_url: iconUrl,
        requirement: formatRequirement(achievement),
        is_completed: isCompleted || !!unlockedMap[achievement.id],
        unlocked_at: unlockedMap[achievement.id] || null,
        progress
      });
    }

    // 5. Разделить по категориям
    const bySteps = processedAchievements.filter(a => {
      const ach = allAchievements.find(x => x.id === a.id);
      return ach.category === 'by_steps';
    });

    const byStreaks = processedAchievements.filter(a => {
      const ach = allAchievements.find(x => x.id === a.id);
      return ach.category === 'by_streaks';
    });

    // 6. Статистика
    const totalUnlocked = Object.keys(unlockedMap).length;
    const totalAvailable = allAchievements.length;
    const completionPercentage = totalAvailable > 0 
      ? Math.floor((totalUnlocked / totalAvailable) * 100) 
      : 0;

    console.log(`✅ Возвращаем: ${totalUnlocked}/${totalAvailable} достижений разблокировано`);

    // 7. Вернуть response
    res.json({
      by_steps: bySteps,
      by_streaks: byStreaks,
      summary: {
        total_unlocked: totalUnlocked,
        total_available: totalAvailable,
        completion_percentage: completionPercentage
      }
    });

  } catch (error) {
    console.error('❌ Error in getAchievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAchievements };
