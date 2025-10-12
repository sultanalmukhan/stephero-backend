const db = require('../db');

/**
 * Проверка версии приложения
 * GET /api/version/check?current_version=1.2.0&platform=ios
 */
async function checkVersion(req, res) {
  try {
    const { current_version, platform = 'ios' } = req.query;

    // Валидация
    if (!current_version) {
      return res.status(400).json({ 
        error: 'Отсутствует параметр current_version',
        example: '/api/version/check?current_version=1.0.0'
      });
    }

    // Получаем актуальную информацию о версиях из БД
    const result = await db.query(
      `SELECT 
        min_required_version,
        latest_version,
        force_update_enabled,
        update_title,
        update_message,
        app_store_url
       FROM app_version 
       WHERE platform = $1 AND is_active = true 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [platform]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Информация о версии не найдена для платформы: ' + platform
      });
    }

    const versionInfo = result.rows[0];
    const minRequired = versionInfo.min_required_version;
    const latest = versionInfo.latest_version;

    // Сравниваем версии
    const needsForceUpdate = compareVersions(current_version, minRequired) < 0;
    const hasUpdate = compareVersions(current_version, latest) < 0;

    console.log(`📱 Проверка версии: ${current_version}`);
    console.log(`   Min required: ${minRequired}, Latest: ${latest}`);
    console.log(`   Force update: ${needsForceUpdate}, Has update: ${hasUpdate}`);

    res.json({
      current_version: current_version,
      min_required_version: minRequired,
      latest_version: latest,
      
      // Флаги для iOS
      needs_force_update: needsForceUpdate,
      has_update: hasUpdate,
      force_update_enabled: versionInfo.force_update_enabled && needsForceUpdate,
      
      // Информация для UI
      update_title: versionInfo.update_title,
      update_message: versionInfo.update_message,
      app_store_url: versionInfo.app_store_url
    });

  } catch (error) {
    console.error('Ошибка в checkVersion:', error);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      message: error.message 
    });
  }
}

/**
 * Сравнение версий (semantic versioning)
 * @returns -1 если v1 < v2, 0 если равны, 1 если v1 > v2
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;
    
    if (num1 < num2) return -1;
    if (num1 > num2) return 1;
  }
  
  return 0;
}

module.exports = { checkVersion };
