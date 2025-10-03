const db = require('../db');

// Главная функция синхронизации
async function syncSteps(req, res) {
  try {
    const { user_id, steps_to_add, sync_from_date, sync_to_date } = req.body;

    // Проверка обязательных полей
    if (!user_id || !steps_to_add || !sync_from_date || !sync_to_date) {
      return res.status(400).json({ 
        error: 'Отсутствуют обязательные поля',
        required: ['user_id', 'steps_to_add', 'sync_from_date', 'sync_to_date']
      });
    }

    // Проверка что user существует, если нет - создать
    await ensureUserExists(user_id);

    // Проверка дублей
    const isDuplicate = await checkDuplicate(user_id, sync_to_date);
    if (isDuplicate) {
      return res.status(409).json({ 
        error: 'Этот период уже синхронизирован'
      });
    }

    // Валидация реалистичности шагов
    const isValid = validateSteps(steps_to_add, sync_from_date, sync_to_date);
    if (!isValid) {
      return res.status(400).json({ 
        error: 'Нереальное количество шагов для данного периода'
      });
    }

    // Начисление XP
    const result = await addXP(user_id, steps_to_add, sync_to_date);

    // Сохранение истории
    await saveSyncHistory(user_id, steps_to_add, sync_from_date, sync_to_date);

    // Успешный ответ
    res.json(result);

  } catch (error) {
    console.error('❌ Ошибка в syncSteps:', error);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      message: error.message 
    });
  }
}

// Проверка существования пользователя
async function ensureUserExists(userId) {
  const userCheck = await db.query(
    'SELECT id FROM users WHERE id = $1',
    [userId]
  );

  if (userCheck.rows.length === 0) {
    // Создать нового пользователя
    await db.query('INSERT INTO users (id) VALUES ($1)', [userId]);
    await db.query(
      'INSERT INTO user_progress (user_id) VALUES ($1)',
      [userId]
    );
    console.log('✅ Новый пользователь создан:', userId);
  }
}

// Проверка дублей
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

// Валидация реалистичности
function validateSteps(steps, fromDate, toDate) {
  const hours = (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60);
  const maxStepsPerHour = 10000; // ~2.7 шага в секунду
  const maxPossible = hours * maxStepsPerHour;

  return steps <= maxPossible;
}

// Начисление XP
async function addXP(userId, stepsToAdd, syncToDate) {
  const result = await db.query(`
    UPDATE user_progress 
    SET 
      total_steps = total_steps + $1,
      total_xp = total_xp + $1,
      current_level = FLOOR((total_xp + $1) / 10000),
      last_sync_date = $2,
      updated_at = NOW()
    WHERE user_id = $3
    RETURNING total_steps, total_xp, current_level
  `, [stepsToAdd, syncToDate, userId]);

  const user = result.rows[0];
  const xpToNext = (user.current_level + 1) * 10000 - user.total_xp;

  return {
    total_steps: parseInt(user.total_steps),
    current_xp: parseInt(user.total_xp),
    current_level: user.current_level,
    xp_to_next_level: xpToNext
  };
}

// Сохранение истории
async function saveSyncHistory(userId, stepsAdded, fromDate, toDate) {
  await db.query(`
    INSERT INTO sync_history (user_id, steps_added, sync_from_date, sync_to_date)
    VALUES ($1, $2, $3, $4)
  `, [userId, stepsAdded, fromDate, toDate]);
}

module.exports = { syncSteps };