const express = require('express');
const router = express.Router();
const { syncSteps } = require('../controllers/syncController');

// POST /api/sync
router.post('/sync', syncSteps);

module.exports = router;
