// routes/heroMessages.js
const express = require('express');
const router = express.Router();
const { getHeroMessages } = require('../controllers/heroMessagesController');

/**
 * @route   GET /api/hero/messages
 * @desc    Get hero motivational messages based on progress
 * @query   language - Language code (en, ru, etc.)
 * @query   progress - Progress percentage (0-100+)
 * @access  Public
 */
router.get('/messages', getHeroMessages);

module.exports = router;
