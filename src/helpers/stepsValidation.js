const db = require('../db');

/**
 * 🛡️ Система защиты от накрутки шагов
 * 
 * Уровни защиты:
 * 1. Абсолютные лимиты (физически невозможные значения)
 * 2. Анализ паттернов (резкие скачки)
 * 3. Логирование подозрительной активности
 */

// ⚙️ Конфигурация лимитов
const VALIDATION_CONFIG = {
  // Абсолютные лимиты
  MAX_STEPS_PER_DAY: 50000,        // Марафон ≈ 55,000 шагов, даём запас
  MAX_STEPS_PER_HOUR: 15000,       // ~10 км бега в час
  MIN_STEPS_PER_DAY: 0,            // Минимум (0 валидно)
  
  // Анализ паттернов
  SPIKE_MULTIPLIER: 5,             // x5 от среднего = подозрительно
  MIN_DAYS_FOR_AVERAGE: 3,         // Минимум дней для расчёта среднего
  DEFAULT_AVERAGE_STEPS: 8000,     // Среднее по умолчанию если мало данных
  
  // Действия
  SOFT_CAP_THRESHOLD: 30000,       // После этого — логируем
  HARD_CAP_THRESHOLD: 50000,       // После этого — обрезаем
  
  // Флаги подозрительности
  SUSPICIOUS_ROUND_NUMBERS: true,  // Проверять круглые числа (10000, 20000, etc)
  ROUND_NUMBER_THRESHOLD: 1000,    // Числа кратные 1000
};

/**
 * 🔍 Основная функция валидации шагов
 * 
 * @param {string} userId - ID пользователя
 * @param {Array} completedDays - Массив дней с шагами
 * @returns {Object} - Результат валидации с отфильтрованными данными
 */
async function validateSteps(userId, completedDays) {
  const result = {
    isValid: true,
    validatedDays: [],
    warnings: [],
    flags: [],
    totalStepsAdjusted: 0
  };

  // Получаем историю пользователя для анализа паттернов
  const userHistory = await getUserStepsHistory(userId);
  const averageSteps = calculateAverageSteps(userHistory);

  console.log(`\n🛡️ === STEPS VALIDATION START ===`);
  console.log(`   User: ${userId}`);
  console.log(`   Historical average: ${averageSteps} steps/day`);
  console.log(`   Days to validate: ${completedDays.length}`);

  for (const day of completedDays) {
    const validation = validateSingleDay(day, averageSteps, userHistory);
    
    result.validatedDays.push({
      ...day,
      steps: validation.adjustedSteps,
      original_steps: day.steps,
      was_adjusted: validation.wasAdjusted
    });

    if (validation.warnings.length > 0) {
      result.warnings.push(...validation.warnings.map(w => ({
        date: day.date,
        message: w
      })));
    }

    if (validation.flags.length > 0) {
      result.flags.push(...validation.flags.map(f => ({
        date: day.date,
        type: f.type,
        details: f.details
      })));
    }

    if (validation.wasAdjusted) {
      result.totalStepsAdjusted += (day.steps - validation.adjustedSteps);
    }
  }

  // Если есть серьёзные флаги — логируем
  if (result.flags.length > 0) {
    await logSuspiciousActivity(userId, result.flags);
  }

  console.log(`   ✅ Validation complete`);
  console.log(`   Warnings: ${result.warnings.length}`);
  console.log(`   Flags: ${result.flags.length}`);
  console.log(`   Steps adjusted: ${result.totalStepsAdjusted}`);
  console.log(`🛡️ === STEPS VALIDATION END ===\n`);

  return result;
}

/**
 * 🔍 Валидация одного дня
 */
function validateSingleDay(day, averageSteps, userHistory) {
  const { date, steps } = day;
  const result = {
    adjustedSteps: steps,
    wasAdjusted: false,
    warnings: [],
    flags: []
  };

  // 1. Проверка отрицательных значений
  if (steps < VALIDATION_CONFIG.MIN_STEPS_PER_DAY) {
    result.adjustedSteps = 0;
    result.wasAdjusted = true;
    result.flags.push({
      type: 'NEGATIVE_STEPS',
      details: { original: steps, adjusted: 0 }
    });
    console.log(`   ❌ ${date}: Negative steps (${steps}) → 0`);
    return result;
  }

  // 2. Проверка hard cap (абсолютный максимум)
  if (steps > VALIDATION_CONFIG.HARD_CAP_THRESHOLD) {
    result.adjustedSteps = VALIDATION_CONFIG.HARD_CAP_THRESHOLD;
    result.wasAdjusted = true;
    result.flags.push({
      type: 'EXCEEDED_HARD_CAP',
      details: { 
        original: steps, 
        adjusted: VALIDATION_CONFIG.HARD_CAP_THRESHOLD,
        cap: VALIDATION_CONFIG.HARD_CAP_THRESHOLD
      }
    });
    console.log(`   🚫 ${date}: Hard cap exceeded (${steps}) → ${VALIDATION_CONFIG.HARD_CAP_THRESHOLD}`);
  }

  // 3. Проверка soft cap (логирование)
  if (steps > VALIDATION_CONFIG.SOFT_CAP_THRESHOLD && steps <= VALIDATION_CONFIG.HARD_CAP_THRESHOLD) {
    result.warnings.push(`High step count: ${steps} (soft cap: ${VALIDATION_CONFIG.SOFT_CAP_THRESHOLD})`);
    console.log(`   ⚠️  ${date}: Soft cap warning (${steps} steps)`);
  }

  // 4. Проверка резкого скачка относительно среднего
  const spikeThreshold = averageSteps * VALIDATION_CONFIG.SPIKE_MULTIPLIER;
  if (steps > spikeThreshold && averageSteps > 0) {
    result.flags.push({
      type: 'SUSPICIOUS_SPIKE',
      details: {
        steps: steps,
        average: averageSteps,
        multiplier: (steps / averageSteps).toFixed(1)
      }
    });
    console.log(`   📈 ${date}: Suspicious spike (${steps} vs avg ${averageSteps}, x${(steps / averageSteps).toFixed(1)})`);
  }

  // 5. Проверка подозрительно круглых чисел
  if (VALIDATION_CONFIG.SUSPICIOUS_ROUND_NUMBERS) {
    if (steps > 0 && steps % VALIDATION_CONFIG.ROUND_NUMBER_THRESHOLD === 0 && steps >= 10000) {
      result.flags.push({
        type: 'SUSPICIOUS_ROUND_NUMBER',
        details: { steps: steps }
      });
      console.log(`   🎯 ${date}: Suspiciously round number (${steps})`);
    }
  }

  // 6. Проверка резкого скачка относительно предыдущего дня
  if (userHistory.length > 0) {
    const previousDay = userHistory[userHistory.length - 1];
    if (previousDay && previousDay.steps > 0) {
      const dailyMultiplier = steps / previousDay.steps;
      if (dailyMultiplier > 10 && steps > 20000) {
        result.flags.push({
          type: 'DAILY_SPIKE',
          details: {
            today: steps,
            yesterday: previousDay.steps,
            multiplier: dailyMultiplier.toFixed(1)
          }
        });
        console.log(`   📊 ${date}: Daily spike (${previousDay.steps} → ${steps}, x${dailyMultiplier.toFixed(1)})`);
      }
    }
  }

  return result;
}

/**
 * 📊 Получение истории шагов пользователя
 */
async function getUserStepsHistory(userId, daysLimit = 30) {
  try {
    const result = await db.query(
      `SELECT date, steps 
       FROM daily_steps 
       WHERE user_id = $1 AND is_finalized = true
       ORDER BY date DESC 
       LIMIT $2`,
      [userId, daysLimit]
    );
    return result.rows.reverse(); // Хронологический порядок
  } catch (error) {
    console.error('Error fetching user history:', error);
    return [];
  }
}

/**
 * 📈 Расчёт среднего количества шагов
 */
function calculateAverageSteps(history) {
  if (history.length < VALIDATION_CONFIG.MIN_DAYS_FOR_AVERAGE) {
    return VALIDATION_CONFIG.DEFAULT_AVERAGE_STEPS;
  }

  const totalSteps = history.reduce((sum, day) => sum + day.steps, 0);
  return Math.round(totalSteps / history.length);
}

/**
 * 📝 Логирование подозрительной активности
 */
async function logSuspiciousActivity(userId, flags) {
  try {
    // Можно сохранять в отдельную таблицу suspicious_activity
    // Пока просто логируем в консоль
    console.log(`\n🚨 === SUSPICIOUS ACTIVITY LOGGED ===`);
    console.log(`   User: ${userId}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);
    console.log(`   Flags:`, JSON.stringify(flags, null, 2));
    console.log(`🚨 === END LOG ===\n`);

    // TODO: Можно добавить запись в БД
    // await db.query(
    //   `INSERT INTO suspicious_activity (user_id, flags, created_at) VALUES ($1, $2, NOW())`,
    //   [userId, JSON.stringify(flags)]
    // );

  } catch (error) {
    console.error('Error logging suspicious activity:', error);
  }
}

/**
 * 🔧 Получение конфигурации валидации (для отладки/админки)
 */
function getValidationConfig() {
  return { ...VALIDATION_CONFIG };
}

/**
 * 🔧 Обновление конфигурации (runtime, не персистентно)
 */
function updateValidationConfig(updates) {
  Object.assign(VALIDATION_CONFIG, updates);
  console.log('Validation config updated:', VALIDATION_CONFIG);
}

module.exports = {
  validateSteps,
  validateSingleDay,
  getUserStepsHistory,
  calculateAverageSteps,
  getValidationConfig,
  updateValidationConfig,
  VALIDATION_CONFIG
};
