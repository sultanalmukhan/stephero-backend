// config/characters.js
// Конфигурация персонажей для разных уровней

const CLOUDINARY_CLOUD_NAME = 'dvfelpkla';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// URL картинок персонажей для каждого уровня
const CHARACTER_IMAGES = {
  1: `${CLOUDINARY_BASE}/home_1_huzth0.png`,
  2: `${CLOUDINARY_BASE}/home_2_oxfuh9.png`,
  3: `${CLOUDINARY_BASE}/home_3_ksufad.png`,
  4: `${CLOUDINARY_BASE}/home_4_qfz1ee.png`,
  5: `${CLOUDINARY_BASE}/home_5_g8ukuy.png`,
  6: `${CLOUDINARY_BASE}/home_6_dym98o.png`,
  7: `${CLOUDINARY_BASE}/home_7_m7glsf.png`,
  8: `${CLOUDINARY_BASE}/home_8_acngml.png`,
  9: `${CLOUDINARY_BASE}/home_9_joecf5.png`,
  10: `${CLOUDINARY_BASE}/home_10_oad4ii.png`,
};

// Имена персонажей для каждого уровня
const CHARACTER_NAMES = {
  1: 'Beginner Raccoon',
  2: 'Walking Raccoon',
  3: 'Running Raccoon',
  4: 'Speedy Raccoon',
  5: 'Flying Raccoon',
  6: 'Super Raccoon',
  7: 'Mega Raccoon',
  8: 'Ultra Raccoon',
  9: 'Legendary Raccoon',
  10: 'God Raccoon',
};

/**
 * Получить данные персонажа для заданного уровня
 * @param {number} level - Уровень пользователя
 * @returns {Object} Данные персонажа
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
