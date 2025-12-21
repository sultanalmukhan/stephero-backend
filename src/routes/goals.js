const express = require('express');
const router = express.Router();
const { getAllGoals } = require('../config/goals');

/**
 * GET /api/goals?language=ru
 * Returns all available goal levels with their configuration
 */
router.get('/', (req, res) => {
  try {
    // Получаем язык из query параметра, по умолчанию 'en'
    const language = req.query.language || 'en';
    
    console.log('🌍 Goals requested with language:', language);
    
    // Передаем язык в getAllGoals
    const goals = getAllGoals(language);
    
    res.json({
      goals: goals
    });
    
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

module.exports = router;
