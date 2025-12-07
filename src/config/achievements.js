// config/achievements.js
// Конфигурация всех достижений с локализацией

const ACHIEVEMENTS = {
  // ==================== BY STEPS ====================
  
  steps_10k: {
    id: 'steps_10k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 10000,
    display_order: 1,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761735097/10k_steps_ytazss.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761735097/10k_steps_ytazss.png',
    translations: {
      en: { title: 'First 10K', description: 'Walk your first 10,000 steps' },
      ru: { title: 'Первые 10К', description: 'Пройди свои первые 10,000 шагов' },
      kk: { title: 'Алғашқы 10К', description: 'Алғашқы 10,000 қадамыңды жасап шық' }
    }
  },

  steps_50k: {
    id: 'steps_50k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 50000,
    display_order: 2,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/50k_steps_reekay.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/50k_steps_reekay.png',
    translations: {
      en: { title: '50K Walker', description: 'Reach 50,000 total steps' },
      ru: { title: 'Ходок 50К', description: 'Достигни 50,000 шагов' },
      kk: { title: '50К жаяу жүрушісі', description: '50,000 қадамға жет' }
    }
  },

  steps_100k: {
    id: 'steps_100k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 100000,
    display_order: 3,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/100k_steps_lvws8z.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/100k_steps_lvws8z.png',
    translations: {
      en: { title: '100K Champion', description: 'Hit 100,000 steps milestone' },
      ru: { title: 'Чемпион 100К', description: 'Достигни рубежа в 100,000 шагов' },
      kk: { title: '100К чемпионы', description: '100,000 қадам белесіне жет' }
    }
  },

  steps_250k: {
    id: 'steps_250k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 250000,
    display_order: 4,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/250k_steps_jx1jkj.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/250k_steps_jx1jkj.png',
    translations: {
      en: { title: 'Quarter Million', description: 'Achieve 250,000 steps' },
      ru: { title: 'Четверть миллиона', description: 'Достигни 250,000 шагов' },
      kk: { title: 'Ширек миллион', description: '250,000 қадамға жет' }
    }
  },

  steps_500k: {
    id: 'steps_500k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 500000,
    display_order: 5,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/500k_steps_gsqdbt.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/500k_steps_gsqdbt.png',
    translations: {
      en: { title: 'Half Million Hero', description: 'Conquer 500,000 steps' },
      ru: { title: 'Герой полумиллиона', description: 'Покори 500,000 шагов' },
      kk: { title: 'Жарты миллион батыры', description: '500,000 қадамды бағындыр' }
    }
  },

  steps_1m: {
    id: 'steps_1m',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 1000000,
    display_order: 6,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/1m_steps_rpucnu.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/1m_steps_rpucnu.png',
    translations: {
      en: { title: 'Million Steps Master', description: 'Complete 1,000,000 steps' },
      ru: { title: 'Мастер миллиона', description: 'Пройди 1,000,000 шагов' },
      kk: { title: 'Миллион қадам шебері', description: '1,000,000 қадам жаса' }
    }
  },

  // ==================== BY STREAKS ====================

  streak_7: {
    id: 'streak_7',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 7,
    display_order: 7,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/7_days_renl5b.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/7_days_renl5b.png',
    translations: {
      en: { title: 'Week Warrior', description: 'Maintain a 7-day walking streak' },
      ru: { title: 'Воин недели', description: 'Поддержи серию из 7 дней' },
      kk: { title: 'Апта жауынгері', description: '7 күндік серияны ұстап тұр' }
    }
  },

  streak_14: {
    id: 'streak_14',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 14,
    display_order: 8,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/14_days_rwcywj.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/14_days_rwcywj.png',
    translations: {
      en: { title: 'Two Week Champion', description: 'Keep walking for 14 days straight' },
      ru: { title: 'Чемпион двух недель', description: 'Ходи 14 дней подряд' },
      kk: { title: 'Екі апта чемпионы', description: '14 күн қатарынан жүр' }
    }
  },

  streak_30: {
    id: 'streak_30',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 30,
    display_order: 9,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733282/30_days_stdsr3.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733282/30_days_stdsr3.png',
    translations: {
      en: { title: 'Monthly Master', description: 'Complete a 30-day streak' },
      ru: { title: 'Мастер месяца', description: 'Заверши серию в 30 дней' },
      kk: { title: 'Ай шебері', description: '30 күндік серияны аяқта' }
    }
  },

  streak_90: {
    id: 'streak_90',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 90,
    display_order: 10,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733283/90_days_zmeiqy.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733283/90_days_zmeiqy.png',
    translations: {
      en: { title: 'Quarter Year Hero', description: 'Achieve a 90-day streak' },
      ru: { title: 'Герой квартала', description: 'Достигни серии в 90 дней' },
      kk: { title: 'Тоқсан батыры', description: '90 күндік серияға жет' }
    }
  },

  streak_180: {
    id: 'streak_180',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 180,
    display_order: 11,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733284/180_days_x3e5mj.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733284/180_days_x3e5mj.png',
    translations: {
      en: { title: 'Half Year Legend', description: 'Maintain 180 days in a row' },
      ru: { title: 'Легенда полугодия', description: 'Поддержи 180 дней подряд' },
      kk: { title: 'Жарты жыл аңызы', description: '180 күн қатарынан ұстап тұр' }
    }
  },

  streak_365: {
    id: 'streak_365',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 365,
    display_order: 12,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733285/365_days_dj5qst.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733285/365_days_dj5qst.png',
    translations: {
      en: { title: 'Year Long Warrior', description: 'Complete a full year streak' },
      ru: { title: 'Воин года', description: 'Заверши годовую серию' },
      kk: { title: 'Жылдық жауынгер', description: 'Толық жылдық серияны аяқта' }
    }
  }
};

// Вспомогательные функции для работы с достижениями

/**
 * Получить все достижения с переводами
 * @param {string} language - Код языка (en, ru, kk)
 * @returns {Array} Массив достижений с переводами
 */
function getAllAchievements(language = 'en') {
  return Object.values(ACHIEVEMENTS).map(achievement => ({
    id: achievement.id,
    category: achievement.category,
    requirement_type: achievement.requirement_type,
    requirement_value: achievement.requirement_value,
    display_order: achievement.display_order,
    icon_url_locked: achievement.icon_url_locked,
    icon_url_unlocked: achievement.icon_url_unlocked,
    title: achievement.translations[language]?.title || achievement.translations.en.title,
    description: achievement.translations[language]?.description || achievement.translations.en.description
  }));
}

/**
 * Получить достижение по ID с переводом
 * @param {string} id - ID достижения
 * @param {string} language - Код языка
 * @returns {Object|null} Достижение с переводом
 */
function getAchievementById(id, language = 'en') {
  const achievement = ACHIEVEMENTS[id];
  if (!achievement) return null;

  return {
    id: achievement.id,
    category: achievement.category,
    requirement_type: achievement.requirement_type,
    requirement_value: achievement.requirement_value,
    display_order: achievement.display_order,
    icon_url_locked: achievement.icon_url_locked,
    icon_url_unlocked: achievement.icon_url_unlocked,
    title: achievement.translations[language]?.title || achievement.translations.en.title,
    description: achievement.translations[language]?.description || achievement.translations.en.description
  };
}

/**
 * Получить достижения по категории
 * @param {string} category - Категория ('by_steps' или 'by_streaks')
 * @param {string} language - Код языка
 * @returns {Array} Массив достижений категории
 */
function getAchievementsByCategory(category, language = 'en') {
  return getAllAchievements(language)
    .filter(achievement => achievement.category === category)
    .sort((a, b) => a.display_order - b.display_order);
}

/**
 * Получить поддерживаемые языки
 * @returns {Array} Массив кодов языков
 */
function getSupportedLanguages() {
  return ['en', 'ru', 'kk'];
}

module.exports = {
  ACHIEVEMENTS,
  getAllAchievements,
  getAchievementById,
  getAchievementsByCategory,
  getSupportedLanguages
};
