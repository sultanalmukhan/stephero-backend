// config/characters.js
// Конфигурация персонажей для разных уровней
const CLOUDINARY_CLOUD_NAME = 'dvfelpkla';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_VIDEO_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

// URL картинок персонажей для каждого уровня
const CHARACTER_IMAGES = {
  1: `${CLOUDINARY_BASE}/home_1_ol52o7.png`,
  2: `${CLOUDINARY_BASE}/home_2_r2zd4t.png`,
  3: `${CLOUDINARY_BASE}/home_3_gwfzgv.png`,
  4: `${CLOUDINARY_BASE}/home_4_mi1alr.png`,
  5: `${CLOUDINARY_BASE}/home_5_cltq8l.png`,
  6: `${CLOUDINARY_BASE}/home_6_pktwtb.png`,
  7: `${CLOUDINARY_BASE}/home_7_lseqbj.png`,
  8: `${CLOUDINARY_BASE}/home_8_xxrx4n.png`,
  9: `${CLOUDINARY_BASE}/home_9_sub0yz.png`,
  10: `${CLOUDINARY_BASE}/home_10_r3he8f.png`,
};

// 🔒 URL картинок для закрытых персонажей
const LOCKED_CHARACTER_IMAGES = {
  1: `${CLOUDINARY_BASE}/v1760952983/locked_1_b8x52q.png`,
  2: `${CLOUDINARY_BASE}/v1760952983/locked_2_layji2.png`,
  3: `${CLOUDINARY_BASE}/v1760952983/locked_3_trlx6t.png`,
  4: `${CLOUDINARY_BASE}/v1760952983/locked_4_u5dg4p.png`,
  5: `${CLOUDINARY_BASE}/v1760952984/locked_5_nxytmr.png`,
  6: `${CLOUDINARY_BASE}/v1760952983/locked_6_ecdh4k.png`,
  7: `${CLOUDINARY_BASE}/v1760952984/locked_7_x4vdww.png`,
  8: `${CLOUDINARY_BASE}/v1760952984/locked_8_tkfkn8.png`,
  9: `${CLOUDINARY_BASE}/v1760952985/locked_9_dwd42e.png`,
  10: `${CLOUDINARY_BASE}/v1760952984/locked_10_ad8dby.png`,
};

// 🎞️ URL анимаций персонажей для каждого уровня
const CHARACTER_ANIMATIONS = {
  1: `${CLOUDINARY_VIDEO_BASE}/v1760456807/animation_1_mwgkqi.mp4`,
  2: `${CLOUDINARY_VIDEO_BASE}/v1760456810/animation_2_dg8cb4.mp4`,
  3: `${CLOUDINARY_VIDEO_BASE}/v1760456809/animation_3_gifsxx.mp4`,
  4: `${CLOUDINARY_VIDEO_BASE}/v1760456810/animation_4_gf6dko.mp4`,
  5: `${CLOUDINARY_VIDEO_BASE}/v1760456807/animation_5_rt18cq.mp4`,
  6: `${CLOUDINARY_VIDEO_BASE}/v1760456815/animation_6_mx5igh.mp4`,
  7: `${CLOUDINARY_VIDEO_BASE}/v1760456809/animation_7_lmxleq.mp4`,
  8: `${CLOUDINARY_VIDEO_BASE}/v1760456807/animation_8_pzvj6d.mp4`,
  9: `${CLOUDINARY_VIDEO_BASE}/v1760456807/animation_9_ogvri6.mp4`,
  10: `${CLOUDINARY_VIDEO_BASE}/v1760456809/animation_10_mxhqpk.mp4`,
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

// 📊 Требования XP для каждого уровня
const LEVEL_XP_REQUIREMENTS = {
  1: 0,
  2: 8400,
  3: 20400,
  4: 37200,
  5: 61200,
  6: 94800,
  7: 142800,
  8: 214800,
  9: 310800,
  10: 438000
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
    animation_url: CHARACTER_ANIMATIONS[level] || CHARACTER_ANIMATIONS[defaultLevel],
    name: CHARACTER_NAMES[level] || CHARACTER_NAMES[defaultLevel],
    level: level
  };
}

/**
 * Получить список всех персонажей с учетом прогресса пользователя
 * @param {number} userLevel - Текущий уровень пользователя
 * @param {number} userTotalXP - Общий XP пользователя
 * @returns {Array} Массив персонажей с их статусом
 */
function getCharactersList(userLevel, userTotalXP) {
  const characters = [];
  
  for (let level = 1; level <= 10; level++) {
    const isClosed = level > userLevel;
    const xpRequired = LEVEL_XP_REQUIREMENTS[level];
    
    // Вычисляем XP до разблокировки
    let xpToUnlock = 0;
    if (isClosed) {
      xpToUnlock = Math.max(0, xpRequired - userTotalXP);
    }
    
    characters.push({
      level: level,
      name: CHARACTER_NAMES[level],
      isClosed: isClosed,
      imageLink: isClosed ? LOCKED_CHARACTER_IMAGES[level] : CHARACTER_IMAGES[level],
      xpRequired: xpRequired,
      xpToUnlock: xpToUnlock
    });
  }
  
  return characters;
}

module.exports = {
  getCharacterData,
  getCharactersList,
  CHARACTER_IMAGES,
  CHARACTER_ANIMATIONS,
  CHARACTER_NAMES,
  LEVEL_XP_REQUIREMENTS,
  CLOUDINARY_CLOUD_NAME
};
