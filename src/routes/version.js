const express = require('express');
const router = express.Router();
const { checkVersion } = require('../controllers/versionController');

// GET /api/version/check
router.get('/check', checkVersion);

module.exports = router;
