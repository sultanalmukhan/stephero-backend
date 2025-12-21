/**
 * 🎯 Unified Goals Configuration
 * Single source of truth for all goal levels
 */
const GOALS = [
  {
    level: 1,
    title: {
      en: "Easy",
      kk: "Оңай",
      ru: "Легко"
    },
    description: "Start your journey with a comfortable daily goal",
    steps: 7000,
    distance_km: 5.3,
    bonus_percent: 0,
    credits: 10,
    is_free: true,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761739960/goal_1_animation_hatwuj.mp4"
  },
  {
    level: 2,
    title: {
      en: "Steady",
      kk: "Тұрақты",
      ru: "Стабильно"
    },
    description: "Challenge yourself with a moderate daily target",
    steps: 8500,
    distance_km: 6.4,
    bonus_percent: 20,
    credits: 20,
    is_free: false,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761740011/goal_2_animation_yixhkn.mp4"
  },
  {
    level: 3,
    title: {
      en: "Hard",
      kk: "Қиын",
      ru: "Сложно"
    },
    description: "Push your limits with the recommended daily goal",
    steps: 10000,
    distance_km: 7.5,
    bonus_percent: 40,
    credits: 30,
    is_free: false,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761740013/goal_3_animation_jzmyok.mp4"
  },
  {
    level: 4,
    title: {
      en: "Hero",
      kk: "Қаһарман",
      ru: "Герой"
    },
    description: "Master the ultimate daily challenge",
    steps: 12000,
    distance_km: 9.0,
    bonus_percent: 60,
    credits: 40,
    is_free: false,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761740013/goal_4_animation_zxrvob.mp4"
  }
];

/**
 * Legacy format for backward compatibility with existing code
 * Maps level number to { steps, bonus, credits }
 */
const GOAL_CONFIG = GOALS.reduce((acc, goal) => {
  acc[goal.level] = {
    steps: goal.steps,
    bonus: goal.bonus_percent / 100,  // Convert 20 -> 0.20
    credits: goal.credits
  };
  return acc;
}, {});

/**
 * Get goal by level number with localized title
 * @param {number} level - Goal level (1-4)
 * @param {string} language - Language code (en, kk, ru)
 * @returns {Object|null} Goal object with localized title
 */
function getGoalByLevel(level, language = 'en') {
  const goal = GOALS.find(g => g.level === level);
  if (!goal) return null;
  
  // Determine language, default to 'en' if not supported
  const lang = ['en', 'kk', 'ru'].includes(language) ? language : 'en';
  
  return {
    ...goal,
    title: goal.title[lang]
  };
}

/**
 * Get all goals with localized titles
 * @param {string} language - Language code (en, kk, ru)
 * @returns {Array} Array of goals with localized titles
 */
function getAllGoals(language = 'en') {
  // Determine language, default to 'en' if not supported
  const lang = ['en', 'kk', 'ru'].includes(language) ? language : 'en';
  
  return GOALS.map(goal => ({
    ...goal,
    title: goal.title[lang]
  }));
}

module.exports = {
  GOALS,
  GOAL_CONFIG,
  getGoalByLevel,
  getAllGoals
};
