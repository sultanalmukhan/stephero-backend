const express = require('express');
const cors = require('cors');
require('dotenv').config();

const syncRoutes = require('./routes/sync');
const versionRoutes = require('./routes/version');
const achievementsRoutes = require('./routes/achievements');
const charactersRoutes = require('./routes/characters'); // ✅ ДОБАВИЛИ

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Тестовые эндпоинты
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 StepHero API работает!',
    version: '1.0.0',
    endpoints: [
      'POST /api/sync',
      'GET /api/version/check', 
      'GET /api/achievements',
      'GET /api/characters'  // ✅ ДОБАВИЛИ
    ]
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// API роуты
app.use('/api', syncRoutes);
app.use('/api/version', versionRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/characters', charactersRoutes); // ✅ ДОБАВИЛИ

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
