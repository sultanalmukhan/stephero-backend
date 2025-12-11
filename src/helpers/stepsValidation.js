const db = require('../db');

/**
 * 🛡️ Система защиты от накрутки шагов v2.0
 * 
 * Уровни защиты:
 * 1. Абсолютные лимиты (физически невозможные значения)
 * 2. Проверка скорости набора шагов (шаги/минуту)
 * 3. Анализ паттернов (резкие скачки)
 * 4. Детальное логирование для анализа
 */

// ⚙️ Конфигурация лимитов
const VALIDATION_CONFIG = {
  // Абсолютные лимиты
  MAX_STEPS_PER_DAY: 50000,        // Марафон ≈ 55,000 шагов
  MIN_STEPS_PER_DAY: 0,            // Минимум (0 валидно)
  
  // 🆕 Лимиты скорости (ключевое для детекции накрутки)
  MAX_STEPS_PER_MINUTE: 200,       // Максимум ~200 шагов/мин (очень быстрый бег)
  MAX_STEPS_PER_HOUR: 12000,       // ~200 * 60 = 12,000/час
  MIN_SYNC_INTERVAL_SECONDS: 30,   // Минимальный интервал между синхронизациями
  
  // Анализ паттернов
  SPIKE_MULTIPLIER: 5,             // x5 от среднего = подозрительно
  MIN_DAYS_FOR_AVERAGE: 3,         // Минимум дней для расчёта среднего
  DEFAULT_AVERAGE_STEPS: 8000,     // Среднее по умолчанию
  
  // Действия
  SOFT_CAP_THRESHOLD: 30000,       // После этого — логируем
  HARD_CAP_THRESHOLD: 50000,       // После этого — обрезаем
  
  // 🆕 Режим работы
  BLOCK_SUSPICIOUS: true,          // true = блокировать, false = только логировать
  DETAILED_LOGGING: true,          // Детальное логирование
  
  // Флаги подозрительности
  SUSPICIOUS_ROUND_NUMBERS: true,
  ROUND_NUMBER_THRESHOLD: 1000,
};

/**
 * 🔍 Основная функция валидации шагов
 */
async function validateSteps(userId, completedDays) {
  const result = {
    isValid: true,
    validatedDays: [],
    warnings: [],
    flags: [],
    totalStepsAdjusted: 0,
    syncAnalysis: null
  };

  // Получаем историю пользователя
  const userHistory = await getUserStepsHistory(userId);
  const averageSteps = calculateAverageSteps(userHistory);
  
  // Получаем информацию о последней синхронизации
  const lastSyncInfo = await getLastSyncInfo(userId);
  
  // Переменная для хранения скорректированных шагов сегодня
  let speedAdjustedTodaySteps = null;
  
  // Анализ синхронизации
  if (lastSyncInfo) {
    const syncAnalysis = analyzeSyncPattern(lastSyncInfo, completedDays);
    result.syncAnalysis = syncAnalysis;
    
    // Проверка скорости набора шагов
    if (syncAnalysis.stepsPerMinute > VALIDATION_CONFIG.MAX_STEPS_PER_MINUTE) {
      const flag = {
        type: 'UNREALISTIC_SPEED',
        details: {
          steps_per_minute: syncAnalysis.stepsPerMinute.toFixed(1),
          max_allowed: VALIDATION_CONFIG.MAX_STEPS_PER_MINUTE,
          steps_difference: syncAnalysis.stepsDifference,
          time_seconds: syncAnalysis.timeSinceLastSync,
          verdict: 'SUSPICIOUS - Speed exceeds human capability'
        }
      };
      result.flags.push({ date: 'sync_analysis', ...flag });
      
      // Если включена блокировка — откатываем к предыдущему значению
      if (VALIDATION_CONFIG.BLOCK_SUSPICIOUS) {
        speedAdjustedTodaySteps = lastSyncInfo.last_steps;
        console.log(`🛡️ BLOCKED: ${userId} | +${syncAnalysis.stepsDifference} steps in ${syncAnalysis.timeSinceLastSyncFormatted} (${syncAnalysis.stepsPerMinute.toFixed(0)} steps/min) → rejected`);
      }
    }
  }

  // Валидация каждого дня
  
  for (let i = 0; i < completedDays.length; i++) {
    const day = completedDays[i];
    const isToday = i === completedDays.length - 1;
    
    // 🔧 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Применяем корректировку по скорости к сегодняшнему дню
    let dayToValidate = { ...day };
    if (isToday && speedAdjustedTodaySteps !== null) {
      dayToValidate.steps = speedAdjustedTodaySteps;
    }
    
    const validation = validateSingleDay(dayToValidate, averageSteps, userHistory, isToday);
    
    // 🔧 Вычисляем финальные шаги с учётом обеих корректировок
    let finalSteps = validation.adjustedSteps;
    let wasAdjusted = validation.wasAdjusted;
    
    // Если была корректировка по скорости для сегодня
    if (isToday && speedAdjustedTodaySteps !== null) {
      finalSteps = Math.min(finalSteps, speedAdjustedTodaySteps);
      wasAdjusted = true;
      result.totalStepsAdjusted += (day.steps - finalSteps);
    } else if (validation.wasAdjusted) {
      result.totalStepsAdjusted += (day.steps - validation.adjustedSteps);
    }
    
    result.validatedDays.push({
      ...day,
      steps: finalSteps,
      original_steps: day.steps,
      was_adjusted: wasAdjusted
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
  }

  // Сохраняем скорректированные шаги
  await saveCurrentSyncInfo(userId, result.validatedDays);

  return result;
}

/**
 * Валидация одного дня
 */
function validateSingleDay(day, averageSteps, userHistory, isToday = false) {
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
    return result;
  }

  // 2. Проверка hard cap
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
  }

  // 3. Проверка soft cap
  if (steps > VALIDATION_CONFIG.SOFT_CAP_THRESHOLD && steps <= VALIDATION_CONFIG.HARD_CAP_THRESHOLD) {
    result.warnings.push(`High step count: ${steps}`);
  }

  // 4. Проверка спайка относительно среднего
  const spikeThreshold = averageSteps * VALIDATION_CONFIG.SPIKE_MULTIPLIER;
  if (steps > spikeThreshold && averageSteps > 0) {
    const multiplier = (steps / averageSteps).toFixed(1);
    result.flags.push({
      type: 'SUSPICIOUS_SPIKE',
      details: { steps, average: averageSteps, multiplier }
    });
  }

  // 5. Проверка круглых чисел
  if (VALIDATION_CONFIG.SUSPICIOUS_ROUND_NUMBERS) {
    if (steps > 0 && steps % VALIDATION_CONFIG.ROUND_NUMBER_THRESHOLD === 0 && steps >= 10000) {
      result.flags.push({
        type: 'SUSPICIOUS_ROUND_NUMBER',
        details: { steps }
      });
    }
  }

  // 6. Проверка дневного спайка
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
      }
    }
  }

  return result;
}

/**
 * Получение информации о последней синхронизации
 */
async function getLastSyncInfo(userId) {
  try {
    const result = await db.query(
      `SELECT last_sync_at, last_sync_steps 
       FROM user_progress 
       WHERE user_id = $1`,
      [userId]
    );
    
    if (result.rows.length === 0 || !result.rows[0].last_sync_at) {
      return null;
    }
    
    return {
      last_sync_at: result.rows[0].last_sync_at,
      last_steps: result.rows[0].last_sync_steps || 0
    };
  } catch (error) {
    return null;
  }
}

/**
 * Сохранение информации о текущей синхронизации
 */
async function saveCurrentSyncInfo(userId, completedDays) {
  try {
    const todaySteps = completedDays.length > 0 
      ? completedDays[completedDays.length - 1].steps 
      : 0;
    
    await db.query(
      `UPDATE user_progress 
       SET last_sync_at = NOW(), last_sync_steps = $1 
       WHERE user_id = $2`,
      [todaySteps, userId]
    );
  } catch (error) {
    // Игнорируем ошибки
  }
}

/**
 * 🆕 Анализ паттерна синхронизации
 */
function analyzeSyncPattern(lastSyncInfo, completedDays) {
  const now = new Date();
  const lastSync = new Date(lastSyncInfo.last_sync_at);
  const timeDiffMs = now - lastSync;
  const timeDiffSeconds = Math.floor(timeDiffMs / 1000);
  const timeDiffMinutes = timeDiffSeconds / 60;
  
  // Текущие шаги сегодня (последний элемент)
  const currentTodaySteps = completedDays.length > 0 
    ? completedDays[completedDays.length - 1].steps 
    : 0;
  
  // Разница в шагах
  const stepsDifference = Math.max(0, currentTodaySteps - lastSyncInfo.last_steps);
  
  // Шаги в минуту и в час
  const stepsPerMinute = timeDiffMinutes > 0 ? stepsDifference / timeDiffMinutes : 0;
  const stepsPerHour = stepsPerMinute * 60;
  
  // Форматирование времени
  let timeSinceLastSyncFormatted;
  if (timeDiffSeconds < 60) {
    timeSinceLastSyncFormatted = `${timeDiffSeconds} sec`;
  } else if (timeDiffSeconds < 3600) {
    timeSinceLastSyncFormatted = `${Math.floor(timeDiffSeconds / 60)} min ${timeDiffSeconds % 60} sec`;
  } else {
    const hours = Math.floor(timeDiffSeconds / 3600);
    const minutes = Math.floor((timeDiffSeconds % 3600) / 60);
    timeSinceLastSyncFormatted = `${hours}h ${minutes}m`;
  }
  
  return {
    timeSinceLastSync: timeDiffSeconds,
    timeSinceLastSyncFormatted,
    lastSteps: lastSyncInfo.last_steps,
    currentTodaySteps,
    stepsDifference,
    stepsPerMinute,
    stepsPerHour
  };
}

/**
 * Получение истории шагов пользователя
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
    return result.rows.reverse();
  } catch (error) {
    return [];
  }
}

/**
 * Расчёт среднего количества шагов
 */
function calculateAverageSteps(history) {
  if (history.length < VALIDATION_CONFIG.MIN_DAYS_FOR_AVERAGE) {
    return VALIDATION_CONFIG.DEFAULT_AVERAGE_STEPS;
  }
  const totalSteps = history.reduce((sum, day) => sum + day.steps, 0);
  return Math.round(totalSteps / history.length);
}

/**
 * Получение конфигурации
 */
function getValidationConfig() {
  return { ...VALIDATION_CONFIG };
}

/**
 * Обновление конфигурации
 */
function updateValidationConfig(updates) {
  Object.assign(VALIDATION_CONFIG, updates);
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
