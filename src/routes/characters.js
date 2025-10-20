const express = require('express');
const router = express.Router();
const { getCharacters } = require('../controllers/charactersController');

// GET /api/characters
router.get('/', getCharacters);

module.exports = router;
