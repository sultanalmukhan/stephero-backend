// routes/heroMessages.js
const express = require('express');
const router = express.Router();
const { getHeroMessages } = require('../controllers/heroMessagesController');

// GET /api/hero/messages
router.get('/messages', getHeroMessages);

module.exports = router;
