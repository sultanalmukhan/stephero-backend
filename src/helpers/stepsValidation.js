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
  BLOCK_SUSPICIOUS: false,         // true = блокировать, false = только логировать
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
    syncAnalysis: null  // 🆕 Анализ синхронизации
  };

  // Получаем историю пользователя
  const userHistory = await getUserStepsHistory(userId);
  const averageSteps = calculateAverageSteps(userHistory);
  
  // 🆕 Получаем информацию о последней синхронизации
  const lastSyncInfo = await getLastSyncInfo(userId);
  
  console.log(`\n🛡️ ═══════════════════════════════════════════════════════════`);
  console.log(`🛡️ STEPS VALIDATION START`);
  console.log(`🛡️ ═══════════════════════════════════════════════════════════`);
  console.log(`   👤 User: ${userId}`);
  console.log(`   📊 Historical average: ${averageSteps} steps/day`);
  console.log(`   📅 Days to validate: ${completedDays.length}`);
  
  // 🆕 Анализ синхронизации
  if (lastSyncInfo) {
    const syncAnalysis = analyzeSyncPattern(lastSyncInfo, completedDays);
    result.syncAnalysis = syncAnalysis;
    
    console.log(`\n   ⏱️  ─── SYNC ANALYSIS ───`);
    console.log(`   │ Last sync: ${lastSyncInfo.last_sync_at}`);
    console.log(`   │ Time since last sync: ${syncAnalysis.timeSinceLastSync} seconds (${syncAnalysis.timeSinceLastSyncFormatted})`);
    console.log(`   │ Last recorded steps: ${lastSyncInfo.last_steps}`);
    console.log(`   │ Current steps (today): ${syncAnalysis.currentTodaySteps}`);
    console.log(`   │ Steps difference: +${syncAnalysis.stepsDifference}`);
    console.log(`   │ Steps per minute: ${syncAnalysis.stepsPerMinute.toFixed(1)}`);
    console.log(`   │ Steps per hour: ${syncAnalysis.stepsPerHour.toFixed(0)}`);
    console.log(`   └──────────────────────`);
    
    // 🆕 Проверка скорости набора шагов
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
      
      console.log(`\n   🚨 ═══ SUSPICIOUS ACTIVITY DETECTED ═══`);
      console.log(`   │ ❌ UNREALISTIC SPEED: ${syncAnalysis.stepsPerMinute.toFixed(1)} steps/min`);
      console.log(`   │ ❌ Max allowed: ${VALIDATION_CONFIG.MAX_STEPS_PER_MINUTE} steps/min`);
      console.log(`   │ ❌ This means: +${syncAnalysis.stepsDifference} steps in ${syncAnalysis.timeSinceLastSyncFormatted}`);
      console.log(`   │ ❌ Equivalent to: ${(syncAnalysis.stepsPerMinute * 60).toFixed(0)} steps/hour`);
      console.log(`   └══════════════════════════════════════`);
      
      // 🆕 Если включена блокировка — корректируем шаги
      if (VALIDATION_CONFIG.BLOCK_SUSPICIOUS) {
        const maxAllowedSteps = Math.floor(
          (syncAnalysis.timeSinceLastSync / 60) * VALIDATION_CONFIG.MAX_STEPS_PER_MINUTE
        );
        const adjustedTodaySteps = lastSyncInfo.last_steps + maxAllowedSteps;
        
        console.log(`   🔧 ADJUSTMENT: Capping today's steps to ${adjustedTodaySteps} (was ${syncAnalysis.currentTodaySteps})`);
        
        // Корректируем последний день (сегодня)
        const todayIndex = completedDays.length - 1;
        if (todayIndex >= 0) {
          result.totalStepsAdjusted += (completedDays[todayIndex].steps - adjustedTodaySteps);
        }
      }
    } else {
      console.log(`\n   ✅ Speed check PASSED: ${syncAnalysis.stepsPerMinute.toFixed(1)} steps/min (max: ${VALIDATION_CONFIG.MAX_STEPS_PER_MINUTE})`);
    }
  } else {
    console.log(`\n   ℹ️  First sync for this user - no previous data to compare`);
  }

  // Валидация каждого дня
  console.log(`\n   📅 ─── DAY-BY-DAY VALIDATION ───`);
  
  for (let i = 0; i < completedDays.length; i++) {
    const day = completedDays[i];
    const isToday = i === completedDays.length - 1;
    
    const validation = validateSingleDay(day, averageSteps, userHistory, isToday);
    
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

  // 🆕 Сохраняем информацию о текущей синхронизации
  await saveCurrentSyncInfo(userId, completedDays);

  // Логируем подозрительную активность
  if (result.flags.length > 0) {
    await logSuspiciousActivity(userId, result.flags, result.syncAnalysis);
  }

  console.log(`\n   📊 ─── VALIDATION SUMMARY ───`);
  console.log(`   │ Total warnings: ${result.warnings.length}`);
  console.log(`   │ Total flags: ${result.flags.length}`);
  console.log(`   │ Steps adjusted: ${result.totalStepsAdjusted}`);
  console.log(`   │ Block mode: ${VALIDATION_CONFIG.BLOCK_SUSPICIOUS ? 'ON' : 'OFF (logging only)'}`);
  console.log(`   └──────────────────────────`);
  console.log(`🛡️ ═══════════════════════════════════════════════════════════`);
  console.log(`🛡️ STEPS VALIDATION END`);
  console.log(`🛡️ ═══════════════════════════════════════════════════════════\n`);

  return result;
}

/**
 * 🔍 Валидация одного дня
 */
function validateSingleDay(day, averageSteps, userHistory, isToday = false) {
  const { date, steps } = day;
  const dayLabel = isToday ? `${date} (TODAY)` : date;
  
  const result = {
    adjustedSteps: steps,
    wasAdjusted: false,
    warnings: [],
    flags: []
  };

  console.log(`   │`);
  console.log(`   ├─ ${dayLabel}: ${steps} steps`);

  // 1. Проверка отрицательных значений
  if (steps < VALIDATION_CONFIG.MIN_STEPS_PER_DAY) {
    result.adjustedSteps = 0;
    result.wasAdjusted = true;
    result.flags.push({
      type: 'NEGATIVE_STEPS',
      details: { original: steps, adjusted: 0 }
    });
    console.log(`   │  └─ ❌ NEGATIVE → adjusted to 0`);
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
    console.log(`   │  └─ 🚫 HARD CAP EXCEEDED → adjusted to ${VALIDATION_CONFIG.HARD_CAP_THRESHOLD}`);
  }

  // 3. Проверка soft cap
  if (steps > VALIDATION_CONFIG.SOFT_CAP_THRESHOLD && steps <= VALIDATION_CONFIG.HARD_CAP_THRESHOLD) {
    result.warnings.push(`High step count: ${steps}`);
    console.log(`   │  └─ ⚠️  SOFT CAP WARNING (>${VALIDATION_CONFIG.SOFT_CAP_THRESHOLD})`);
  }

  // 4. Проверка спайка относительно среднего
  const spikeThreshold = averageSteps * VALIDATION_CONFIG.SPIKE_MULTIPLIER;
  if (steps > spikeThreshold && averageSteps > 0) {
    const multiplier = (steps / averageSteps).toFixed(1);
    result.flags.push({
      type: 'SUSPICIOUS_SPIKE',
      details: { steps, average: averageSteps, multiplier }
    });
    console.log(`   │  └─ 📈 SPIKE: x${multiplier} vs average (${averageSteps})`);
  }

  // 5. Проверка круглых чисел
  if (VALIDATION_CONFIG.SUSPICIOUS_ROUND_NUMBERS) {
    if (steps > 0 && steps % VALIDATION_CONFIG.ROUND_NUMBER_THRESHOLD === 0 && steps >= 10000) {
      result.flags.push({
        type: 'SUSPICIOUS_ROUND_NUMBER',
        details: { steps }
      });
      console.log(`   │  └─ 🎯 ROUND NUMBER: ${steps} (suspicious)`);
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
        console.log(`   │  └─ 📊 DAILY SPIKE: x${dailyMultiplier.toFixed(1)} vs yesterday (${previousDay.steps})`);
      }
    }
  }

  // Если всё ок
  if (result.flags.length === 0 && result.warnings.length === 0) {
    console.log(`   │  └─ ✅ OK`);
  }

  return result;
}

/**
 * 🆕 Получение информации о последней синхронизации
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
    // Колонки могут не существовать — это нормально для первого запуска
    console.log(`   ℹ️  Could not get last sync info (columns may not exist yet)`);
    return null;
  }
}

/**
 * 🆕 Сохранение информации о текущей синхронизации
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
    // Игнорируем если колонки не существуют
    console.log(`   ℹ️  Could not save sync info (columns may not exist yet)`);
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
    return result.rows.reverse();
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
 * 📝 Детальное логирование подозрительной активности
 */
async function logSuspiciousActivity(userId, flags, syncAnalysis) {
  const timestamp = new Date().toISOString();
  
  console.log(`\n🚨 ═══════════════════════════════════════════════════════════`);
  console.log(`🚨 SUSPICIOUS ACTIVITY REPORT`);
  console.log(`🚨 ═══════════════════════════════════════════════════════════`);
  console.log(`   Timestamp: ${timestamp}`);
  console.log(`   User ID: ${userId}`);
  console.log(`   Total flags: ${flags.length}`);
  
  if (syncAnalysis) {
    console.log(`\n   📊 Sync Analysis:`);
    console.log(`   │ Time since last sync: ${syncAnalysis.timeSinceLastSyncFormatted}`);
    console.log(`   │ Steps difference: +${syncAnalysis.stepsDifference}`);
    console.log(`   │ Speed: ${syncAnalysis.stepsPerMinute.toFixed(1)} steps/min`);
    console.log(`   │ Equivalent: ${syncAnalysis.stepsPerHour.toFixed(0)} steps/hour`);
  }
  
  console.log(`\n   🚩 Flags:`);
  flags.forEach((flag, index) => {
    console.log(`   │`);
    console.log(`   ├─ [${index + 1}] ${flag.type}`);
    console.log(`   │  Date: ${flag.date}`);
    console.log(`   │  Details: ${JSON.stringify(flag.details)}`);
  });
  
  console.log(`🚨 ═══════════════════════════════════════════════════════════\n`);

  // TODO: Сохранять в БД для анализа
  // await db.query(
  //   `INSERT INTO suspicious_activity (user_id, flags, sync_analysis, created_at) 
  //    VALUES ($1, $2, $3, NOW())`,
  //   [userId, JSON.stringify(flags), JSON.stringify(syncAnalysis)]
  // );
}

/**
 * 🔧 Получение конфигурации
 */
function getValidationConfig() {
  return { ...VALIDATION_CONFIG };
}

/**
 * 🔧 Обновление конфигурации
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
