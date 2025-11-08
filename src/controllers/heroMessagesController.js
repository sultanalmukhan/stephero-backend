// controllers/heroMessagesController.js
const heroMessages = require('../config/heroMessages');

/**
 * Get hero motivational message based on progress
 * GET /api/hero/messages?language=en&progress=45
 */
const getHeroMessages = async (req, res) => {
  try {
    const { language, progress } = req.query;

    // Validate required parameters
    if (!language) {
      return res.status(400).json({
        error: 'Missing required parameter: language'
      });
    }

    if (progress === undefined || progress === null) {
      return res.status(400).json({
        error: 'Missing required parameter: progress'
      });
    }

    // Parse progress as number
    const progressNum = parseFloat(progress);
    if (isNaN(progressNum)) {
      return res.status(400).json({
        error: 'Invalid progress value. Must be a number.'
      });
    }

    // Check if language is supported
    if (!heroMessages[language]) {
      return res.status(400).json({
        error: `Unsupported language: ${language}. Available languages: ${Object.keys(heroMessages).join(', ')}`
      });
    }

    // Determine current stage based on progress
    let currentStage;
    if (progressNum >= 100) {
      currentStage = 4;
    } else if (progressNum >= 68) {
      currentStage = 3;
    } else if (progressNum >= 34) {
      currentStage = 2;
    } else {
      currentStage = 1;
    }

    // Get messages for the current stage
    const stageKey = `stage_${currentStage}`;
    const messages = heroMessages[language][stageKey];

    // Return response
    res.json({
      current_stage: currentStage,
      messages: messages
    });

    console.log(`✅ Hero messages sent: language=${language}, progress=${progressNum}%, stage=${currentStage}`);  // ← ИСПРАВЛЕНО

  } catch (error) {
    console.error('❌ Error in getHeroMessages:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getHeroMessages
};
