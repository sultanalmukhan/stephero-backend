const db = require('../db');
const { getCharacterData } = require('../config/characters');

const GOAL_CONFIG = {
  1: { steps: 5000, bonus: 0.10 },
  2: { steps: 7500, bonus: 0.20 },
  3: { steps: 10000, bonus: 0.30 },
  4: { steps: 12500, bonus: 0.40 }
};

async function syncSteps(req, res) {
  try {
    const { 
      user_id, 
      steps_to_add, 
      current_goal_level,
      bonus_process_days,
      sync_from_date, 
      sync_to_date 
    } = req.body;

    if (!user_id || steps_to_add === undefined || steps_to_add === null || 
        !sync_from_date || !sync_to_date || !current_goal_level) {
      return res.status(400).json({ 
        error: 'Отсутствуют обязательные поля',
        required: ['user_id', 'steps_to_add', 'current_goal_level', 'sync_from_date', 'sync_to_date']
      });
    }

    await ensureUserExists(user_id);

    // Получить состояние ДО изменений
    const previousProgress = await getCurrentProgress(user_id);
    const previousXP = previousProgress.current_xp;

    // Обновить goal_level если изменился
    await updateGoalLevel(user_id, current_goal_level);

    let bonusXPEarned = 0;
    let totalXPGained = 0;

    if (steps_to_add === 0 && (!bonus_process_days || bonus_process_days.length === 0)) {
      const progress = await getCurrentProgress(user_id);
      return res.json({
        ...progress,
        previous_xp: previousXP,
        bonus_xp_earned: 0,
        xp_gained: 0
      });
    }

    // Обработка базовых шагов
    if (steps_to_add > 0) {
      const isDuplicate = await checkDuplicate(user_id, sync_to_date);
      if (isDuplicate) {
        return res.status(409).json({ 
          error: 'Этот период уже синхронизирован'
        });
      }

      const isValid = validateSteps(steps_to_add, sync_from_date, sync_to_date);
      if (!isValid) {
        return res.status(400).json({ 
          error: 'Нереальное количество шагов для данного периода'
        });
      }

      await addXP(user_id, steps_to_add, sync_to_date);
      totalXPGained += steps_to_add;
    }

    // Обработка бонусов за завершенные дни
    if (bonus_process_days && bonus_process_days.length > 0) {
      bonusXPEarned = await processBonusDays(user_id, bonus_process_days, current_goal_level);
      totalXPGained += bonusXPEarned;
    }

    // Сохранение истории
    await saveSyncHistory(user_id, steps_to_add, sync_from_date, sync_to_date);

    // Финальный результат
    const result = await getFinalProgress(user_id);
    result.previous_xp = previousXP;
    result.bonus_xp_earned = bonusXPEarned;
    result.xp_gained = totalXPGained;

    res.json(result);

  } catch (error) {
    console.error('Ошибка в syncSteps:', error);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      message: error.message 
    });
  }
}

async function processBonusDays(userId, bonusDays, goalLevel) {
  const goalConfig = GOAL_CONFIG[goalLevel];
  if (!goalConfig) {
    throw new Error(`Неверный goal_level: ${goalLevel}`);
  }

  let totalBonusXP = 0;

  for (const day of bonusDays) {
    const { date, steps } = day;

    if (steps >= goalConfig.steps) {
      const bonusXP = Math.floor(steps * goalConfig.bonus);
      
      await db.query(
        'UPDATE user_progress SET total_xp = total_xp + $1 WHERE user_id = $2',
        [bonusXP, userId]
      );

      totalBonusXP += bonusXP;
    }
  }

  return totalBonusXP;
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
      xp_to_next_level: 10000,
      character_image_url: characterData.image_url
    };
  }

  const user = result.rows[0];
  const totalXP = parseInt(user.total_xp);
  
  // Вычисляем уровень и прогресс
  let level = 1;
  let accumulated = 0;
  
  while (accumulated + (level * 10000) <= totalXP) {
    accumulated += level * 10000;
    level++;
  }

  const currentXP = totalXP - accumulated;
  const xpToNext = level * 10000;

  const characterData = getCharacterData(level);

  return {
    total_steps: parseInt(user.total_steps),
    current_xp: currentXP,
    current_level: level,
    xp_to_next_level: xpToNext,
    character_image_url: characterData.image_url
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
    console.log('Новый пользователь создан:', userId);
  }
}

async function checkDuplicate(userId, syncToDate) {
  const result = await db.query(
    'SELECT last_sync_date FROM user_progress WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length === 0) return false;

  const lastSync = result.rows[0].last_sync_date;
  if (!lastSync) return false;

  return new Date(syncToDate) <= new Date(lastSync);
}

function validateSteps(steps, fromDate, toDate) {
  const hours = (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60);
  const maxStepsPerHour = 10000;
  const maxPossible = hours * maxStepsPerHour;

  return steps <= maxPossible;
}

async function addXP(userId, stepsToAdd, syncToDate) {
  await db.query(`
    UPDATE user_progress 
    SET 
      total_steps = total_steps + $1,
      total_xp = total_xp + $1,
      last_sync_date = $2,
      updated_at = NOW()
    WHERE user_id = $3
  `, [stepsToAdd, syncToDate, userId]);
}

async function saveSyncHistory(userId, stepsAdded, fromDate, toDate) {
  await db.query(`
    INSERT INTO sync_history (user_id, steps_added, sync_from_date, sync_to_date)
    VALUES ($1, $2, $3, $4)
  `, [userId, stepsAdded, fromDate, toDate]);
}

module.exports = { syncSteps };
