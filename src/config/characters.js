// config/characters.js
// Конфигурация персонажей для разных уровней

const CLOUDINARY_CLOUD_NAME = 'dvfelpkla';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// URL картинок персонажей для каждого уровня
const CHARACTER_IMAGES = {
  1: `${CLOUDINARY_BASE}/raccoon_hkagyw.png`,  // ⬅️ ВОТ ОН!
  2: `${CLOUDINARY_BASE}/raccoon_hkagyw.png`,
  3: `${CLOUDINARY_BASE}/raccoon_hkagyw.png`,
  4: `${CLOUDINARY_BASE}/raccoon_hkagyw.png`,
  5: `${CLOUDINARY_BASE}/raccoon_hkagyw.png`,
};

// Имена персонажей для каждого уровня
const CHARACTER_NAMES = {
  1: 'Beginner Raccoon',
  2: 'Walking Raccoon',
  3: 'Running Raccoon',
  4: 'Speedy Raccoon',
  5: 'Flying Raccoon',
};

/**
 * Получить данные персонажа для заданного уровня
 */
function getCharacterData(level) {
  const defaultLevel = 1;
  
  return {
    image_url: CHARACTER_IMAGES[level] || CHARACTER_IMAGES[defaultLevel],
    name: CHARACTER_NAMES[level] || CHARACTER_NAMES[defaultLevel],
    level: level
  };
}

module.exports = {
  getCharacterData,
  CHARACTER_IMAGES,
  CHARACTER_NAMES,
  CLOUDINARY_CLOUD_NAME
};
