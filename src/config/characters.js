// config/characters.js
// Конфигурация персонажей для разных уровней
const CLOUDINARY_CLOUD_NAME = 'dvfelpkla';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_VIDEO_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

// 🎨 URL картинок персонажей для каждого уровня (обновлено)
const CHARACTER_IMAGES = {
  1: `${CLOUDINARY_BASE}/v1764695128/level_1_vmln0o.png`,
  2: `${CLOUDINARY_BASE}/v1764695128/level_2_fup8pn.png`,
  3: `${CLOUDINARY_BASE}/v1764695128/level_3_zhu9ey.png`,
  4: `${CLOUDINARY_BASE}/v1764695128/level_4_tncohf.png`,
  5: `${CLOUDINARY_BASE}/v1764695128/level_5_ya5l7x.png`,
  6: `${CLOUDINARY_BASE}/v1764695131/level_6_its02y.png`,
  7: `${CLOUDINARY_BASE}/v1764695130/level_7_qt3s3p.png`,
  8: `${CLOUDINARY_BASE}/v1764695132/level_8_aslmlf.png`,
  9: `${CLOUDINARY_BASE}/v1764695131/level_9_azzhcv.png`,
  10: `${CLOUDINARY_BASE}/v1764695130/level_10_tmdxn1.png`,
};

// 🎭 Анимации персонажей с 4 mood для каждого уровня
const CHARACTER_ANIMATIONS = {
  1: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689267/animation_1_mood_1_xuvgkf.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689261/animation_1_mood_2_rgmyve.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689262/animation_1_mood_3_srqct3.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689263/animation_1_mood_4_dokb0n.mp4`,
  },
  2: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689306/animation_2_mood_1_gqkken.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689304/animation_2_mood_2_f8fahf.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689304/animation_2_mood_3_xfevyq.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689303/animation_2_mood_4_gt1t95.mp4`,
  },
  3: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689327/animation_3_mood_1_ul7val.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689330/animation_3_mood_2_szdojv.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689327/animation_3_mood_3_ye6ou0.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689326/animation_3_mood_4_f3tcp5.mp4`,
  },
  4: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689441/animation_4_mood_1_uzwj9w.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689452/animation_4_mood_2_y8y4ga.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689440/animation_4_mood_3_c0yzs7.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689451/animation_4_mood_4_exroem.mp4`,
  },
  5: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689484/animation_5_mood_1_e2ushp.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689478/animation_5_mood_2_pnupig.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689481/animation_5_mood_3_erkuk3.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689482/animation_5_mood_4_zcrewy.mp4`,
  },
  6: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689499/animation_6_mood_1_ur9bkq.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689501/animation_6_mood_2_ogzoqc.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689508/animation_6_mood_3_huimsq.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689503/animation_6_mood_4_imqetx.mp4`,
  },
  7: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689544/animation_7_mood_1_gchiyw.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689542/animation_7_mood_2_kd6kvz.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689546/animation_7_mood_3_or5j3b.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689559/animation_7_mood_4_o2hcjd.mp4`,
  },
  8: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689600/animation_8_mood_1_ljqi0h.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689580/animation_8_mood_2_c0w445.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689583/animation_8_mood_3_tximpf.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689604/animation_8_mood_4_vboukf.mp4`,
  },
  9: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689625/animation_9_mood_1_jyljhu.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689637/animation_9_mood_2_chdqqm.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689631/animation_9_mood_3_fyi22h.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689632/animation_9_mood_4_l5twpx.mp4`,
  },
  10: {
    mood_1: `${CLOUDINARY_VIDEO_BASE}/v1764689668/animation_10_mood_1_s3px7u.mp4`,
    mood_2: `${CLOUDINARY_VIDEO_BASE}/v1764689673/animation_10_mood_2_pfei5r.mp4`,
    mood_3: `${CLOUDINARY_VIDEO_BASE}/v1764689670/animation_10_mood_3_sdfcth.mp4`,
    mood_4: `${CLOUDINARY_VIDEO_BASE}/v1764689664/animation_10_mood_4_x0za7v.mp4`,
  },
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

// 📝 Описания персонажей для каждого уровня
const CHARACTER_DESCRIPTIONS = {
  1: 'Just starting your fitness journey. Every step counts!',
  2: 'You\'re getting the hang of it. Keep walking!',
  3: 'Building momentum! You\'re becoming a regular walker.',
  4: 'Speed is your ally now. Quick steps, quick progress!',
  5: 'You\'ve reached new heights! Your dedication is inspiring.',
  6: 'Super powers activated! You\'re unstoppable now.',
  7: 'Mega achievements unlocked! You\'re a walking champion.',
  8: 'Ultra performance! You\'re in the top tier of walkers.',
  9: 'Legendary status achieved! Your consistency is remarkable.',
  10: 'Ultimate mastery! You\'ve become a true fitness deity.',
};

// 📊 Требования XP для каждого уровня
const LEVEL_XP_REQUIREMENTS = {
  1: 0,           // Старт
  2: 750,         // +1 день
  3: 3000,        // +3 дня (4 дня от старта)
  4: 7500,        // +6 дней (10 дней от старта)
  5: 15000,       // +10 дней (20 дней от старта)
  6: 27000,       // +16 дней (36 дней от старта)
  7: 45000,       // +24 дня (60 дней от старта)
  8: 69000,       // +32 дня (92 дня от старта)
  9: 99000,       // +40 дней (132 дня от старта)
  10: 135000      // +48 дней (180 дней от старта)
};

/**
 * 🎭 Определить mood на основе процента прогресса
 * @param {number} progressPercent - Процент выполнения цели (0-100+)
 * @returns {string} mood_1, mood_2, mood_3, или mood_4
 */
function getMoodByProgress(progressPercent) {
  if (progressPercent >= 100) {
    return 'mood_4';  // 100%+ → супер-счастливый
  } else if (progressPercent >= 66) {
    return 'mood_3';  // 66-99% → веселый
  } else if (progressPercent >= 33) {
    return 'mood_2';  // 33-65% → нейтральный
  } else {
    return 'mood_1';  // 0-32% → грустный
  }
}

/**
 * Получить данные персонажа для заданного уровня с учетом прогресса
 * @param {number} level - Уровень пользователя
 * @param {number} progressPercent - Процент выполнения дневной цели (0-100+)
 * @returns {Object} Данные персонажа
 */
function getCharacterData(level, progressPercent = 0) {
  const defaultLevel = 1;
  const actualLevel = level || defaultLevel;
  
  // Определяем mood на основе прогресса
  const mood = getMoodByProgress(progressPercent);
  
  // Получаем анимацию для этого уровня и mood
  const animations = CHARACTER_ANIMATIONS[actualLevel] || CHARACTER_ANIMATIONS[defaultLevel];
  const animationUrl = animations[mood] || animations.mood_1;
  
  return {
    image_url: CHARACTER_IMAGES[actualLevel] || CHARACTER_IMAGES[defaultLevel],
    animation_url: animationUrl,
    name: CHARACTER_NAMES[actualLevel] || CHARACTER_NAMES[defaultLevel],
    description: CHARACTER_DESCRIPTIONS[actualLevel] || CHARACTER_DESCRIPTIONS[defaultLevel],
    level: actualLevel,
    current_mood: mood  // Добавляем информацию о текущем mood
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
      description: CHARACTER_DESCRIPTIONS[level],
      isClosed: isClosed,
      imageLink: CHARACTER_IMAGES[level],  // 👈 Теперь всегда одна и та же картинка
      xpRequired: xpRequired,
      xpToUnlock: xpToUnlock
    });
  }
  
  return characters;
}

module.exports = {
  getCharacterData,
  getCharactersList,
  getMoodByProgress,
  CHARACTER_IMAGES,
  CHARACTER_ANIMATIONS,
  CHARACTER_NAMES,
  CHARACTER_DESCRIPTIONS,
  LEVEL_XP_REQUIREMENTS,
  CLOUDINARY_CLOUD_NAME
};
