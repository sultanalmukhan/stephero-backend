const express = require('express');
const router = express.Router();
const { getAllGoals } = require('../config/goals');

/**
 * GET /api/goals
 * Returns all available goal levels with their configuration
 */
router.get('/', (req, res) => {
  try {
    const goals = getAllGoals();
    
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
