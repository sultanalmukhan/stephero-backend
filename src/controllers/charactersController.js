const db = require('../db');
const { getCharactersList, LEVEL_XP_REQUIREMENTS } = require('../config/characters');

/**
 * GET /api/characters
 * Получить список всех персонажей с их статусом для пользователя
 */
async function getCharacters(req, res) {
  try {
    const { user_id, language = 'en' } = req.query;

    // Валидация user_id
    if (!user_id) {
      return res.status(400).json({ 
        error: 'Отсутствует обязательный параметр user_id' 
      });
    }

    // Валидация языка
    const supportedLanguages = [
      'en', 'zh-Hans', 'hi', 'es', 'ar', 'pt', 'ru', 'kk',
      'ja', 'fr', 'de', 'ko', 'vi', 'tr', 'it', 'th',
      'pl', 'id', 'nl', 'cs', 'el', 'hu', 'sv', 'da', 'fi', 'no'
    ];
    const lang = supportedLanguages.includes(language) ? language : 'en';

    // Получаем данные пользователя
    const userResult = await db.query(
      'SELECT total_xp, current_level FROM user_progress WHERE user_id = $1',
      [user_id]
    );

    let userLevel = 1;
    let userTotalXP = 0;

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      userTotalXP = parseFloat(user.total_xp) || 0;
      
      // Вычисляем уровень на основе total_xp
      for (let i = 10; i >= 1; i--) {
        if (userTotalXP >= LEVEL_XP_REQUIREMENTS[i]) {
          userLevel = i;
          break;
        }
      }
    } else {
      // Если пользователя нет, создаем его
      await db.query('INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING', [user_id]);
      await db.query(
        'INSERT INTO user_progress (user_id, goal_level) VALUES ($1, $2) ON CONFLICT (user_id) DO NOTHING',
        [user_id, 3]
      );
      console.log('✅ Новый пользователь создан при запросе персонажей:', user_id);
    }

    // Получаем список персонажей с переводами
    const characters = getCharactersList(userLevel, userTotalXP, lang);

    console.log(`🎮 Персонажи для пользователя ${user_id} (язык: ${lang}):`);
    console.log(`   Уровень: ${userLevel}`);
    console.log(`   Total XP: ${userTotalXP}`);
    console.log(`   Открыто персонажей: ${userLevel}/10`);

    res.json(characters);

  } catch (error) {
    console.error('❌ Ошибка в getCharacters:', error);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      message: error.message 
    });
  }
}

module.exports = { getCharacters };
