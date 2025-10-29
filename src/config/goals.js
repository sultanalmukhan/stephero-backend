/**
 * 🎯 Unified Goals Configuration
 * Single source of truth for all goal levels
 */

const GOALS = [
  {
    level: 1,
    title: "Beginner",
    description: "Start your journey with a comfortable daily goal",
    steps: 5000,
    distance_km: 4.0,
    bonus_percent: 10,
    is_free: true,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761739960/goal_1_animation_hatwuj.mp4"
  },
  {
    level: 2,
    title: "Walker",
    description: "Challenge yourself with a moderate daily target",
    steps: 7500,
    distance_km: 6.0,
    bonus_percent: 20,
    is_free: false,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761740011/goal_2_animation_yixhkn.mp4"
  },
  {
    level: 3,
    title: "Athlete",
    description: "Push your limits with the recommended daily goal",
    steps: 10000,
    distance_km: 8.0,
    bonus_percent: 30,
    is_free: false,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761740013/goal_3_animation_jzmyok.mp4"
  },
  {
    level: 4,
    title: "Champion",
    description: "Master the ultimate daily challenge",
    steps: 12500,
    distance_km: 10.0,
    bonus_percent: 40,
    is_free: false,
    animation_url: "https://res.cloudinary.com/dvfelpkla/video/upload/v1761740013/goal_4_animation_zxrvob.mp4"
  }
];

/**
 * Legacy format for backward compatibility with existing code
 * Maps level number to { steps, bonus }
 */
const GOAL_CONFIG = GOALS.reduce((acc, goal) => {
  acc[goal.level] = {
    steps: goal.steps,
    bonus: goal.bonus_percent / 100  // Convert 10 -> 0.10
  };
  return acc;
}, {});

/**
 * Get goal by level number
 */
function getGoalByLevel(level) {
  return GOALS.find(g => g.level === level) || null;
}

/**
 * Get all goals
 */
function getAllGoals() {
  return GOALS;
}

module.exports = {
  GOALS,
  GOAL_CONFIG,
  getGoalByLevel,
  getAllGoals
};
