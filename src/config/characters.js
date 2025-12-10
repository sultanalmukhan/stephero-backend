// config/characters.js
// Конфигурация персонажей для разных уровней с локализацией

const CLOUDINARY_CLOUD_NAME = 'dvfelpkla';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_VIDEO_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

// 🎨 URL картинок персонажей (черный фон) для каждого уровня
const CHARACTER_IMAGES_BLACK = {
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

// 🎨 URL картинок персонажей (прозрачный фон) для каждого уровня
const CHARACTER_IMAGES_TRANSPARENT = {
  1: `${CLOUDINARY_BASE}/v1761053784/home_1_ol52o7.png`,
  2: `${CLOUDINARY_BASE}/v1761053784/home_2_r2zd4t.png`,
  3: `${CLOUDINARY_BASE}/v1761053784/home_3_gwfzgv.png`,
  4: `${CLOUDINARY_BASE}/v1761053785/home_4_mi1alr.png`,
  5: `${CLOUDINARY_BASE}/v1761053785/home_5_cltq8l.png`,
  6: `${CLOUDINARY_BASE}/v1761053785/home_6_pktwtb.png`,
  7: `${CLOUDINARY_BASE}/v1761053785/home_7_lseqbj.png`,
  8: `${CLOUDINARY_BASE}/v1761053786/home_8_xxrx4n.png`,
  9: `${CLOUDINARY_BASE}/v1761053786/home_9_sub0yz.png`,
  10: `${CLOUDINARY_BASE}/v1761053787/home_10_r3he8f.png`,
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

// 🦝 Имена персонажей с локализацией
const CHARACTER_NAMES = {
  1: {
    en: 'Beginner Raccoon', 'zh-Hans': '新手浣熊', hi: 'शुरुआती रैकून', es: 'Mapache Principiante',
    ar: 'راكون المبتدئ', pt: 'Guaxinim Iniciante', ru: 'Енот-новичок', kk: 'Бастауыш енот',
    ja: '初心者アライグマ', fr: 'Raton Laveur Débutant', de: 'Anfänger-Waschbär', ko: '초보 너구리',
    vi: 'Gấu Trúc Mới Bắt Đầu', tr: 'Başlangıç Rakunu', it: 'Procione Principiante', th: 'แรคคูนมือใหม่',
    pl: 'Początkujący Szop', id: 'Rakun Pemula', nl: 'Beginner Wasbeer', cs: 'Začátečník Mýval',
    el: 'Αρχάριος Ρακούν', hu: 'Kezdő Mosómedve', sv: 'Nybörjar Tvättbjörn', da: 'Begynder Vaskebjørn',
    fi: 'Aloittelija Pesukarhu', no: 'Nybegynner Vaskebjørn'
  },
  2: {
    en: 'Walking Raccoon', 'zh-Hans': '行走浣熊', hi: 'चलने वाला रैकून', es: 'Mapache Caminante',
    ar: 'راكون المشي', pt: 'Guaxinim Caminhante', ru: 'Шагающий енот', kk: 'Жүретін енот',
    ja: '歩くアライグマ', fr: 'Raton Laveur Marcheur', de: 'Gehender Waschbär', ko: '걷는 너구리',
    vi: 'Gấu Trúc Đi Bộ', tr: 'Yürüyen Rakun', it: 'Procione Camminatore', th: 'แรคคูนเดิน',
    pl: 'Chodzący Szop', id: 'Rakun Berjalan', nl: 'Lopende Wasbeer', cs: 'Chodící Mýval',
    el: 'Περπατητικός Ρακούν', hu: 'Sétáló Mosómedve', sv: 'Gående Tvättbjörn', da: 'Gående Vaskebjørn',
    fi: 'Kävelevä Pesukarhu', no: 'Gående Vaskebjørn'
  },
  3: {
    en: 'Running Raccoon', 'zh-Hans': '奔跑浣熊', hi: 'दौड़ने वाला रैकून', es: 'Mapache Corredor',
    ar: 'راكون العدو', pt: 'Guaxinim Corredor', ru: 'Бегущий енот', kk: 'Жүгіретін енот',
    ja: '走るアライグマ', fr: 'Raton Laveur Coureur', de: 'Rennender Waschbär', ko: '달리는 너구리',
    vi: 'Gấu Trúc Chạy', tr: 'Koşan Rakun', it: 'Procione Corridore', th: 'แรคคูนวิ่ง',
    pl: 'Biegający Szop', id: 'Rakun Berlari', nl: 'Rennende Wasbeer', cs: 'Běžící Mýval',
    el: 'Τρέχων Ρακούν', hu: 'Futó Mosómedve', sv: 'Springande Tvättbjörn', da: 'Løbende Vaskebjørn',
    fi: 'Juokseva Pesukarhu', no: 'Løpende Vaskebjørn'
  },
  4: {
    en: 'Speedy Raccoon', 'zh-Hans': '快速浣熊', hi: 'तेज़ रैकून', es: 'Mapache Veloz',
    ar: 'راكون سريع', pt: 'Guaxinim Veloz', ru: 'Быстрый енот', kk: 'Жылдам енот',
    ja: 'スピーディーアライグマ', fr: 'Raton Laveur Rapide', de: 'Schneller Waschbär', ko: '빠른 너구리',
    vi: 'Gấu Trúc Nhanh', tr: 'Hızlı Rakun', it: 'Procione Veloce', th: 'แรคคูนเร็ว',
    pl: 'Szybki Szop', id: 'Rakun Cepat', nl: 'Snelle Wasbeer', cs: 'Rychlý Mýval',
    el: 'Γρήγορος Ρακούν', hu: 'Gyors Mosómedve', sv: 'Snabb Tvättbjörn', da: 'Hurtig Vaskebjørn',
    fi: 'Nopea Pesukarhu', no: 'Rask Vaskebjørn'
  },
  5: {
    en: 'Flying Raccoon', 'zh-Hans': '飞翔浣熊', hi: 'उड़ने वाला रैकून', es: 'Mapache Volador',
    ar: 'راكون طائر', pt: 'Guaxinim Voador', ru: 'Летящий енот', kk: 'Ұшатын енот',
    ja: '飛ぶアライグマ', fr: 'Raton Laveur Volant', de: 'Fliegender Waschbär', ko: '나는 너구리',
    vi: 'Gấu Trúc Bay', tr: 'Uçan Rakun', it: 'Procione Volante', th: 'แรคคูนบิน',
    pl: 'Latający Szop', id: 'Rakun Terbang', nl: 'Vliegende Wasbeer', cs: 'Létající Mýval',
    el: 'Ιπτάμενος Ρακούν', hu: 'Repülő Mosómedve', sv: 'Flygande Tvättbjörn', da: 'Flyvende Vaskebjørn',
    fi: 'Lentävä Pesukarhu', no: 'Flyvende Vaskebjørn'
  },
  6: {
    en: 'Super Raccoon', 'zh-Hans': '超级浣熊', hi: 'सुपर रैकून', es: 'Súper Mapache',
    ar: 'راكون خارق', pt: 'Super Guaxinim', ru: 'Супер-енот', kk: 'Супер енот',
    ja: 'スーパーアライグマ', fr: 'Super Raton Laveur', de: 'Super-Waschbär', ko: '슈퍼 너구리',
    vi: 'Siêu Gấu Trúc', tr: 'Süper Rakun', it: 'Super Procione', th: 'ซูเปอร์แรคคูน',
    pl: 'Super Szop', id: 'Rakun Super', nl: 'Super Wasbeer', cs: 'Super Mýval',
    el: 'Σούπερ Ρακούν', hu: 'Szuper Mosómedve', sv: 'Super Tvättbjörn', da: 'Super Vaskebjørn',
    fi: 'Super Pesukarhu', no: 'Super Vaskebjørn'
  },
  7: {
    en: 'Mega Raccoon', 'zh-Hans': '巨型浣熊', hi: 'मेगा रैकून', es: 'Mega Mapache',
    ar: 'راكون ضخم', pt: 'Mega Guaxinim', ru: 'Мега-енот', kk: 'Мега енот',
    ja: 'メガアライグマ', fr: 'Méga Raton Laveur', de: 'Mega-Waschbär', ko: '메가 너구리',
    vi: 'Mega Gấu Trúc', tr: 'Mega Rakun', it: 'Mega Procione', th: 'เมก้าแรคคูน',
    pl: 'Mega Szop', id: 'Rakun Mega', nl: 'Mega Wasbeer', cs: 'Mega Mýval',
    el: 'Μέγα Ρακούν', hu: 'Mega Mosómedve', sv: 'Mega Tvättbjörn', da: 'Mega Vaskebjørn',
    fi: 'Mega Pesukarhu', no: 'Mega Vaskebjørn'
  },
  8: {
    en: 'Ultra Raccoon', 'zh-Hans': '终极浣熊', hi: 'अल्ट्रा रैकून', es: 'Ultra Mapache',
    ar: 'راكون فائق', pt: 'Ultra Guaxinim', ru: 'Ультра-енот', kk: 'Ультра енот',
    ja: 'ウルトラアライグマ', fr: 'Ultra Raton Laveur', de: 'Ultra-Waschbär', ko: '울트라 너구리',
    vi: 'Ultra Gấu Trúc', tr: 'Ultra Rakun', it: 'Ultra Procione', th: 'อัลตร้าแรคคูน',
    pl: 'Ultra Szop', id: 'Rakun Ultra', nl: 'Ultra Wasbeer', cs: 'Ultra Mýval',
    el: 'Υπερ Ρακούν', hu: 'Ultra Mosómedve', sv: 'Ultra Tvättbjörn', da: 'Ultra Vaskebjørn',
    fi: 'Ultra Pesukarhu', no: 'Ultra Vaskebjørn'
  },
  9: {
    en: 'Legendary Raccoon', 'zh-Hans': '传奇浣熊', hi: 'पौराणिक रैकून', es: 'Mapache Legendario',
    ar: 'راكون أسطوري', pt: 'Guaxinim Lendário', ru: 'Легендарный енот', kk: 'Аңызды енот',
    ja: 'レジェンダリーアライグマ', fr: 'Raton Laveur Légendaire', de: 'Legendärer Waschbär', ko: '전설의 너구리',
    vi: 'Gấu Trúc Huyền Thoại', tr: 'Efsanevi Rakun', it: 'Procione Leggendario', th: 'แรคคูนในตำนาน',
    pl: 'Legendarny Szop', id: 'Rakun Legendaris', nl: 'Legendarische Wasbeer', cs: 'Legendární Mýval',
    el: 'Θρυλικός Ρακούν', hu: 'Legendás Mosómedve', sv: 'Legendarisk Tvättbjörn', da: 'Legendarisk Vaskebjørn',
    fi: 'Legendaarinen Pesukarhu', no: 'Legendarisk Vaskebjørn'
  },
  10: {
    en: 'God Raccoon', 'zh-Hans': '神级浣熊', hi: 'देव रैकून', es: 'Mapache Dios',
    ar: 'راكون إله', pt: 'Guaxinim Deus', ru: 'Енот-бог', kk: 'Құдай енот',
    ja: '神アライグマ', fr: 'Raton Laveur Divin', de: 'Gott-Waschbär', ko: '신 너구리',
    vi: 'Gấu Trúc Thần Thánh', tr: 'Tanrı Rakun', it: 'Procione Divino', th: 'แรคคูนเทพเจ้า',
    pl: 'Boski Szop', id: 'Rakun Dewa', nl: 'God Wasbeer', cs: 'Bůh Mýval',
    el: 'Θεός Ρακούν', hu: 'Isten Mosómedve', sv: 'Gud Tvättbjörn', da: 'Gud Vaskebjørn',
    fi: 'Jumala Pesukarhu', no: 'Gud Vaskebjørn'
  }
};

// 📝 Описания персонажей с локализацией
const CHARACTER_DESCRIPTIONS = {
  1: {
    en: 'Just starting your fitness journey. Every step counts!', 'zh-Hans': '刚开始你的健身之旅。每一步都很重要！', hi: 'अपनी फिटनेस यात्रा शुरू करना। हर कदम मायने रखता है!', es: 'Comenzando tu viaje de fitness. ¡Cada paso cuenta!',
    ar: 'بداية رحلة اللياقة البدنية. كل خطوة مهمة!', pt: 'Iniciando sua jornada fitness. Cada passo conta!', ru: 'Начало твоего фитнес-путешествия. Каждый шаг важен!', kk: 'Фитнес саяхатыңның басы. Әр қадам маңызды!',
    ja: 'フィットネスの旅の始まり。すべてのステップが重要！', fr: 'Début de votre parcours fitness. Chaque pas compte!', de: 'Beginn deiner Fitness-Reise. Jeder Schritt zählt!', ko: '피트니스 여정의 시작. 모든 걸음이 중요해요!',
    vi: 'Bắt đầu hành trình thể dục. Mỗi bước đều quan trọng!', tr: 'Fitness yolculuğunun başlangıcı. Her adım önemli!', it: 'Inizio del tuo percorso fitness. Ogni passo conta!', th: 'เริ่มต้นเส้นทางฟิตเนส ทุกก้าวมีค่า!',
    pl: 'Początek twojej drogi fitness. Każdy krok się liczy!', id: 'Memulai perjalanan fitness. Setiap langkah berarti!', nl: 'Begin van je fitness reis. Elke stap telt!', cs: 'Začátek vaší fitness cesty. Každý krok se počítá!',
    el: 'Αρχή του ταξιδιού φυσικής κατάστασης. Κάθε βήμα μετράει!', hu: 'Fitness utazásod kezdete. Minden lépés számít!', sv: 'Början på din fitnessresa. Varje steg räknas!', da: 'Starten på din fitnessrejse. Hvert skridt tæller!',
    fi: 'Fitness-matkasi alku. Jokainen askel lasketaan!', no: 'Begynnelsen på din fitnessreise. Hvert skritt teller!'
  },
  2: {
    en: "You're getting the hang of it. Keep walking!", 'zh-Hans': '你开始上手了。继续走！', hi: 'आप इसे समझ रहे हैं। चलते रहो!', es: 'Le estás agarrando el ritmo. ¡Sigue caminando!',
    ar: 'أنت تتقن الأمر. استمر في المشي!', pt: 'Você está pegando o jeito. Continue caminhando!', ru: 'Ты начинаешь понимать. Продолжай идти!', kk: 'Сен түсіне бастадың. Жүре бер!',
    ja: 'コツを掴んできた。歩き続けよう！', fr: 'Vous commencez à comprendre. Continuez à marcher!', de: 'Du bekommst den Dreh raus. Weiter gehen!', ko: '감을 잡고 있어요. 계속 걸으세요!',
    vi: 'Bạn đang nắm được bí quyết. Tiếp tục đi bộ!', tr: 'İşi kavramaya başladın. Yürümeye devam et!', it: 'Stai prendendo la mano. Continua a camminare!', th: 'คุณเริ่มเข้าใจแล้ว เดินต่อไป!',
    pl: 'Zaczynasz to ogarniać. Chodź dalej!', id: 'Anda mulai memahaminya. Terus berjalan!', nl: 'Je begint het door te krijgen. Blijf lopen!', cs: 'Začínáte to chápat. Pokračujte v chůzi!',
    el: 'Αρχίζετε να το καταλαβαίνετε. Συνεχίστε να περπατάτε!', hu: 'Kezded megérteni. Sétálj tovább!', sv: 'Du börjar förstå. Fortsätt gå!', da: 'Du begynder at forstå det. Fortsæt med at gå!',
    fi: 'Alat ymmärtää asian. Jatka kävelyä!', no: 'Du begynner å forstå det. Fortsett å gå!'
  },
  3: {
    en: "Building momentum! You're becoming a regular walker.", 'zh-Hans': '积蓄动力！你正在成为一个常规步行者。', hi: 'गति बना रहे हैं! आप नियमित चलने वाले बन रहे हैं।', es: '¡Ganando impulso! Te estás convirtiendo en un caminante regular.',
    ar: 'بناء الزخم! أنت تصبح مشياً منتظماً.', pt: 'Ganhando impulso! Você está se tornando um caminhante regular.', ru: 'Набираешь темп! Ты становишься постоянным ходоком.', kk: 'Қарқын жинап жатырсың! Тұрақты жаяу жүрушіге айналасың.',
    ja: '勢いをつけている！定期的に歩く人になっている。', fr: 'Prendre de l\'élan! Vous devenez un marcheur régulier.', de: 'Schwung aufbauen! Du wirst ein regelmäßiger Geher.', ko: '탄력을 받고 있어요! 정기적인 워커가 되고 있어요.',
    vi: 'Đang tích lũy động lực! Bạn đang trở thành người đi bộ thường xuyên.', tr: 'Momentum kazanıyorsun! Düzenli bir yürüyücü oluyorsun.', it: 'Costruendo slancio! Stai diventando un camminatore abituale.', th: 'สร้างโมเมนตัม! คุณกำลังเป็นนักเดินประจำ',
    pl: 'Nabierasz rozpędu! Stajesz się regularnym spacerowiczem.', id: 'Membangun momentum! Anda menjadi pejalan reguler.', nl: 'Momentum opbouwen! Je wordt een vaste loper.', cs: 'Budování tempa! Stáváte se pravidelným chodcem.',
    el: 'Κτίζοντας ορμή! Γίνεστε τακτικός περιπατητής.', hu: 'Lendületet építesz! Rendszeres sétálóvá válsz.', sv: 'Bygger momentum! Du blir en regelbunden promenör.', da: 'Bygger momentum! Du bliver en fast gående.',
    fi: 'Rakentamassa vauhtia! Sinusta on tulossa säännöllinen kävelijä.', no: 'Bygger momentum! Du blir en vanlig gåer.'
  },
  4: {
    en: 'Speed is your ally now. Quick steps, quick progress!', 'zh-Hans': '速度现在是你的盟友。快步走，快速进步！', hi: 'गति अब आपका सहयोगी है। त्वरित कदम, त्वरित प्रगति!', es: 'La velocidad es tu aliada ahora. ¡Pasos rápidos, progreso rápido!',
    ar: 'السرعة حليفك الآن. خطوات سريعة، تقدم سريع!', pt: 'Velocidade é sua aliada agora. Passos rápidos, progresso rápido!', ru: 'Скорость теперь твой союзник. Быстрые шаги, быстрый прогресс!', kk: 'Жылдамдық енді серігің. Жылдам қадам, жылдам прогресс!',
    ja: 'スピードが味方に。速い歩み、速い進歩！', fr: 'La vitesse est votre alliée maintenant. Pas rapides, progrès rapides!', de: 'Geschwindigkeit ist jetzt dein Verbündeter. Schnelle Schritte, schneller Fortschritt!', ko: '이제 속도가 당신의 동맹이에요. 빠른 걸음, 빠른 진전!',
    vi: 'Tốc độ là đồng minh của bạn bây giờ. Bước nhanh, tiến bộ nhanh!', tr: 'Hız artık müttefikin. Hızlı adımlar, hızlı ilerleme!', it: 'La velocità è tua alleata ora. Passi veloci, progressi veloci!', th: 'ความเร็วเป็นพันธมิตรของคุณแล้ว ก้าวเร็ว ความก้าวหน้าเร็ว!',
    pl: 'Szybkość jest teraz twoim sprzymierzeńcem. Szybkie kroki, szybki postęp!', id: 'Kecepatan adalah sekutu Anda sekarang. Langkah cepat, kemajuan cepat!', nl: 'Snelheid is nu je bondgenoot. Snelle stappen, snelle vooruitgang!', cs: 'Rychlost je nyní váš spojenec. Rychlé kroky, rychlý pokrok!',
    el: 'Η ταχύτητα είναι σύμμαχός σας τώρα. Γρήγορα βήματα, γρήγορη πρόοδος!', hu: 'A sebesség most a szövetségesed. Gyors lépések, gyors előrehaladás!', sv: 'Hastighet är din allierade nu. Snabba steg, snabb framsteg!', da: 'Hastighed er din allierede nu. Hurtige skridt, hurtige fremskridt!',
    fi: 'Nopeus on nyt liittolaisesi. Nopeat askeleet, nopea edistyminen!', no: 'Hastighet er din allierte nå. Raske skritt, rask fremgang!'
  },
  5: {
    en: "You've reached new heights! Your dedication is inspiring.", 'zh-Hans': '你达到了新的高度！你的奉献令人鼓舞。', hi: 'आप नई ऊंचाइयों तक पहुंच गए! आपका समर्पण प्रेरणादायक है।', es: '¡Has alcanzado nuevas alturas! Tu dedicación es inspiradora.',
    ar: 'لقد وصلت إلى آفاق جديدة! تفانيك ملهم.', pt: 'Você alcançou novos patamares! Sua dedicação é inspiradora.', ru: 'Ты достиг новых высот! Твоя преданность вдохновляет.', kk: 'Жаңа биіктерге жеттің! Сенің берілгендігің шабыттандырады.',
    ja: '新たな高みに到達した！あなたの献身は感動的です。', fr: 'Vous avez atteint de nouveaux sommets! Votre dévouement est inspirant.', de: 'Du hast neue Höhen erreicht! Deine Hingabe ist inspirierend.', ko: '새로운 높이에 도달했어요! 당신의 헌신은 감동적이에요.',
    vi: 'Bạn đã đạt đến tầm cao mới! Sự tận tụy của bạn thật truyền cảm hứng.', tr: 'Yeni zirvelere ulaştın! Özveriniz ilham verici.', it: 'Hai raggiunto nuove vette! La tua dedizione è ispiratrice.', th: 'คุณไปถึงระดับใหม่แล้ว! ความทุ่มเทของคุณสร้างแรงบันดาลใจ',
    pl: 'Osiągnąłeś nowe wyżyny! Twoje zaangażowanie jest inspirujące.', id: 'Anda telah mencapai ketinggian baru! Dedikasi Anda menginspirasi.', nl: 'Je hebt nieuwe hoogten bereikt! Je toewijding is inspirerend.', cs: 'Dosáhli jste nových výšin! Vaše odhodlání je inspirativní.',
    el: 'Φτάσατε σε νέα ύψη! Η αφοσίωσή σας είναι εμπνευστική.', hu: 'Új magasságokat értél el! Az elkötelezettséged inspiráló.', sv: 'Du har nått nya höjder! Din hängivenhet är inspirerande.', da: 'Du har nået nye højder! Din dedikation er inspirerende.',
    fi: 'Olet saavuttanut uusia korkeuksia! Omistautumisesi on inspiroivaa.', no: 'Du har nådd nye høyder! Din dedikasjon er inspirerende.'
  },
  6: {
    en: "Super powers activated! You're unstoppable now.", 'zh-Hans': '超能力激活！你现在势不可挡。', hi: 'सुपर शक्तियां सक्रिय! अब आप अजेय हैं।', es: '¡Super poderes activados! Eres imparable ahora.',
    ar: 'تم تفعيل القوى الخارقة! أنت لا يمكن إيقافك الآن.', pt: 'Super poderes ativados! Você é imparável agora.', ru: 'Суперспособности активированы! Тебя теперь не остановить.', kk: 'Супер қуаттар белсендірілді! Енді сені тоқтату мүмкін емес.',
    ja: 'スーパーパワー発動！今や止められない。', fr: 'Super pouvoirs activés! Vous êtes inarrêtable maintenant.', de: 'Superkräfte aktiviert! Du bist jetzt unaufhaltsam.', ko: '슈퍼파워 활성화! 이제 당신을 막을 수 없어요.',
    vi: 'Siêu năng lực kích hoạt! Bạn không thể cản được bây giờ.', tr: 'Süper güçler aktif! Artık durdurulamazsın.', it: 'Super poteri attivati! Sei inarrestabile ora.', th: 'พลังพิเศษเปิดใช้งาน! ตอนนี้คุณหยุดไม่ได้แล้ว',
    pl: 'Supermoce aktywowane! Teraz jesteś nie do zatrzymania.', id: 'Kekuatan super diaktifkan! Anda tak terhentikan sekarang.', nl: 'Superkrachten geactiveerd! Je bent nu onstuitbaar.', cs: 'Super síly aktivovány! Nyní jste nezastavitelní.',
    el: 'Οι υπερδυνάμεις ενεργοποιήθηκαν! Είσαι ασταμάτητος τώρα.', hu: 'Szuperképességek aktiválva! Most már megállíthatatlan vagy.', sv: 'Superkrafter aktiverade! Du är ostoppbar nu.', da: 'Superkræfter aktiveret! Du er ustoppelig nu.',
    fi: 'Supervoimat aktivoitu! Olet pysäyttämätön nyt.', no: 'Superkrefter aktivert! Du er ustoppelig nå.'
  },
  7: {
    en: "Mega achievements unlocked! You're a walking champion.", 'zh-Hans': '巨大成就解锁！你是行走冠军。', hi: 'विशाल उपलब्धियां अनलॉक! आप चलने के चैंपियन हैं।', es: '¡Mega logros desbloqueados! Eres un campeón de la caminata.',
    ar: 'تم فتح الإنجازات الضخمة! أنت بطل المشي.', pt: 'Mega conquistas desbloqueadas! Você é um campeão da caminhada.', ru: 'Мега-достижения разблокированы! Ты чемпион ходьбы.', kk: 'Мега жетістіктер ашылды! Сен жүру чемпионысың.',
    ja: 'メガ達成アンロック！あなたは歩行チャンピオンです。', fr: 'Méga réalisations débloquées! Vous êtes un champion de la marche.', de: 'Mega-Erfolge freigeschaltet! Du bist ein Geh-Champion.', ko: '메가 업적 잠금 해제! 당신은 걷기 챔피언이에요.',
    vi: 'Thành tựu khổng lồ mở khóa! Bạn là nhà vô địch đi bộ.', tr: 'Mega başarılar açıldı! Yürüyüş şampiyonusun.', it: 'Mega traguardi sbloccati! Sei un campione di camminata.', th: 'ปลดล็อกความสำเร็จระดับเมก้า! คุณคือแชมป์การเดิน',
    pl: 'Mega osiągnięcia odblokowane! Jesteś mistrzem chodzenia.', id: 'Prestasi mega dibuka! Anda juara berjalan.', nl: 'Mega prestaties ontgrendeld! Je bent een wandelkampioen.', cs: 'Mega úspěchy odemčeny! Jste šampion v chůzi.',
    el: 'Μέγα επιτεύγματα ξεκλειδώθηκαν! Είσαι πρωταθλητής περπατήματος.', hu: 'Mega eredmények feloldva! Sétálóbajnok vagy.', sv: 'Mega prestationer upplåsta! Du är en gångmästare.', da: 'Mega præstationer låst op! Du er en gangemester.',
    fi: 'Mega-saavutukset avattu! Olet kävelymestari.', no: 'Mega prestasjoner låst opp! Du er en gangmester.'
  },
  8: {
    en: "Ultra performance! You're in the top tier of walkers.", 'zh-Hans': '终极表现！你在步行者的顶级行列。', hi: 'अल्ट्रा प्रदर्शन! आप चलने वालों के शीर्ष स्तर में हैं।', es: '¡Rendimiento ultra! Estás en el nivel superior de caminantes.',
    ar: 'أداء فائق! أنت في المستوى الأعلى من المشاة.', pt: 'Performance ultra! Você está no topo dos caminhantes.', ru: 'Ультра-производительность! Ты в топе ходоков.', kk: 'Ультра өнімділік! Жаяу жүрушілердің үздік қатарындасың.',
    ja: 'ウルトラパフォーマンス！あなたは歩行者のトップティアにいます。', fr: 'Performance ultra! Vous êtes au sommet des marcheurs.', de: 'Ultra-Leistung! Du bist in der Spitzenklasse der Geher.', ko: '울트라 성능! 당신은 워커들의 최상위권에 있어요.',
    vi: 'Hiệu suất siêu đẳng! Bạn ở tầng cao nhất của những người đi bộ.', tr: 'Ultra performans! Yürüyücülerin en üst seviyesindesin.', it: 'Performance ultra! Sei nel livello superiore dei camminatori.', th: 'ประสิทธิภาพระดับอัลตร้า! คุณอยู่ในระดับสูงสุดของนักเดิน',
    pl: 'Ultra wydajność! Jesteś w najwyższej lidze spacerowiczów.', id: 'Kinerja ultra! Anda di tingkat teratas pejalan.', nl: 'Ultra prestaties! Je behoort tot de top van de lopers.', cs: 'Ultra výkon! Jste v nejvyšší úrovni chodců.',
    el: 'Υπερ απόδοση! Είσαι στο κορυφαίο επίπεδο περιπατητών.', hu: 'Ultra teljesítmény! A sétálók legfelső szintjén vagy.', sv: 'Ultra prestation! Du är i den högsta nivån av promenörer.', da: 'Ultra præstation! Du er i top-tier af gående.',
    fi: 'Ultra suorituskyky! Olet kävelijöiden huipputasolla.', no: 'Ultra ytelse! Du er i toppsjiktet av gåere.'
  },
  9: {
    en: 'Legendary status achieved! Your consistency is remarkable.', 'zh-Hans': '传奇地位达成！你的坚持令人瞩目。', hi: 'पौराणिक स्थिति प्राप्त! आपकी निरंतरता उल्लेखनीय है।', es: '¡Estado legendario alcanzado! Tu consistencia es notable.',
    ar: 'تم تحقيق الوضع الأسطوري! ثباتك ملحوظ.', pt: 'Status lendário alcançado! Sua consistência é notável.', ru: 'Легендарный статус достигнут! Твоя последовательность замечательна.', kk: 'Аңызды мәртебеге жеттің! Тұрақтылығың ерекше.',
    ja: '伝説の地位達成！あなたの一貫性は素晴らしい。', fr: 'Statut légendaire atteint! Votre constance est remarquable.', de: 'Legendärer Status erreicht! Deine Beständigkeit ist bemerkenswert.', ko: '전설적 지위 달성! 당신의 일관성은 놀라워요.',
    vi: 'Đạt được vị thế huyền thoại! Sự kiên định của bạn đáng chú ý.', tr: 'Efsanevi statü kazanıldı! Tutarlılığın dikkat çekici.', it: 'Status leggendario raggiunto! La tua costanza è notevole.', th: 'บรรลุสถานะในตำนาน! ความสม่ำเสมอของคุณน่าทึ่ง',
    pl: 'Osiągnięto legendarny status! Twoja konsekwencja jest godna uwagi.', id: 'Status legendaris tercapai! Konsistensi Anda luar biasa.', nl: 'Legendarische status behaald! Je consistentie is opmerkelijk.', cs: 'Legendární status dosažen! Vaše konzistence je pozoruhodná.',
    el: 'Θρυλική κατάσταση επιτεύχθηκε! Η συνέπειά σας είναι αξιοσημείωτη.', hu: 'Legendás státusz elérve! A következetességed figyelemre méltó.', sv: 'Legendarisk status uppnådd! Din konsistens är anmärkningsvärd.', da: 'Legendarisk status opnået! Din konsistens er bemærkelsesværdig.',
    fi: 'Legendaarinen asema saavutettu! Johdonmukaisuutesi on huomattavaa.', no: 'Legendarisk status oppnådd! Din konsistens er bemerkelsesverdig.'
  },
  10: {
    en: "Ultimate mastery! You've become a true fitness deity.", 'zh-Hans': '终极精通！你已成为真正的健身之神。', hi: 'परम निपुणता! आप सच्चे फिटनेस देवता बन गए हैं।', es: '¡Maestría definitiva! Te has convertido en una verdadera deidad del fitness.',
    ar: 'الإتقان النهائي! لقد أصبحت إله اللياقة البدنية الحقيقي.', pt: 'Maestria suprema! Você se tornou uma verdadeira divindade do fitness.', ru: 'Абсолютное мастерство! Ты стал настоящим божеством фитнеса.', kk: 'Ұлы шеберлік! Шынайы фитнес құдайына айналдың.',
    ja: '究極の熟達！あなたは真のフィットネスの神になりました。', fr: 'Maîtrise ultime! Vous êtes devenu une vraie divinité du fitness.', de: 'Ultimative Meisterschaft! Du bist zu einer wahren Fitness-Gottheit geworden.', ko: '궁극의 숙달! 당신은 진정한 피트니스의 신이 되었어요.',
    vi: 'Tinh thông tối thượng! Bạn đã trở thành vị thần thể dục thực sự.', tr: 'Nihai ustalık! Gerçek bir fitness tanrısı oldun.', it: 'Padronanza definitiva! Sei diventato una vera divinità del fitness.', th: 'การเชี่ยวชาญขั้นสูงสุด! คุณกลายเป็นเทพเจ้าฟิตเนสที่แท้จริง',
    pl: 'Najwyższe mistrzostwo! Stałeś się prawdziwym bóstwem fitness.', id: 'Penguasaan tertinggi! Anda telah menjadi dewa fitness sejati.', nl: 'Ultieme meesterschap! Je bent een ware fitness-godheid geworden.', cs: 'Konečné mistrovství! Stali jste se skutečným božstvem fitness.',
    el: 'Απόλυτη κυριαρχία! Έχετε γίνει αληθινή θεότητα της φυσικής κατάστασης.', hu: 'Végső mesterség! Igazi fitness istenséggé váltál.', sv: 'Ultimat mästerskap! Du har blivit en sann fitness-guddom.', da: 'Ultimativt mesterskab! Du er blevet en sand fitness-guddom.',
    fi: 'Lopullinen taidokkuus! Sinusta on tullut todellinen fitness-jumala.', no: 'Ultimativt mesterskap! Du har blitt en sann fitness-guddom.'
  }
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
 * @param {string} language - Код языка (en, ru, kk, etc.)
 * @returns {Object} Данные персонажа
 */
function getCharacterData(level, progressPercent = 0, language = 'en') {
  const defaultLevel = 1;
  const actualLevel = level || defaultLevel;
  
  // Определяем mood на основе прогресса
  const mood = getMoodByProgress(progressPercent);
  
  // Получаем анимацию для этого уровня и mood
  const animations = CHARACTER_ANIMATIONS[actualLevel] || CHARACTER_ANIMATIONS[defaultLevel];
  const animationUrl = animations[mood] || animations.mood_1;
  
  // Получаем переводы
  const names = CHARACTER_NAMES[actualLevel] || CHARACTER_NAMES[defaultLevel];
  const descriptions = CHARACTER_DESCRIPTIONS[actualLevel] || CHARACTER_DESCRIPTIONS[defaultLevel];
  
  return {
    image_url: CHARACTER_IMAGES_BLACK[actualLevel] || CHARACTER_IMAGES_BLACK[defaultLevel],
    animation_url: animationUrl,
    name: names[language] || names.en,
    description: descriptions[language] || descriptions.en,
    level: actualLevel,
    current_mood: mood
  };
}

/**
 * Получить список всех персонажей с учетом прогресса пользователя
 * @param {number} userLevel - Текущий уровень пользователя
 * @param {number} userTotalXP - Общий XP пользователя
 * @param {string} language - Код языка
 * @returns {Array} Массив персонажей с их статусом
 */
function getCharactersList(userLevel, userTotalXP, language = 'en') {
  const characters = [];
  
  for (let level = 1; level <= 10; level++) {
    const isClosed = level > userLevel;
    const xpRequired = LEVEL_XP_REQUIREMENTS[level];
    
    // Вычисляем XP до разблокировки
    let xpToUnlock = 0;
    if (isClosed) {
      xpToUnlock = Math.max(0, xpRequired - userTotalXP);
    }
    
    // Получаем переводы
    const names = CHARACTER_NAMES[level];
    const descriptions = CHARACTER_DESCRIPTIONS[level];
    
    characters.push({
      level: level,
      name: names[language] || names.en,
      description: descriptions[language] || descriptions.en,
      isClosed: isClosed,
      imageLinkBlack: CHARACTER_IMAGES_BLACK[level],
      imageLinkTransparent: CHARACTER_IMAGES_TRANSPARENT[level],
      xpRequired: xpRequired,
      xpToUnlock: xpToUnlock
    });
  }
  
  return characters;
}

/**
 * Получить поддерживаемые языки
 * @returns {Array} Массив кодов языков
 */
function getSupportedLanguages() {
  return [
    'en', 'zh-Hans', 'hi', 'es', 'ar', 'pt', 'ru', 'kk',
    'ja', 'fr', 'de', 'ko', 'vi', 'tr', 'it', 'th',
    'pl', 'id', 'nl', 'cs', 'el', 'hu', 'sv', 'da', 'fi', 'no'
  ];
}

module.exports = {
  getCharacterData,
  getCharactersList,
  getMoodByProgress,
  getSupportedLanguages,
  CHARACTER_IMAGES_BLACK,
  CHARACTER_IMAGES_TRANSPARENT,
  CHARACTER_ANIMATIONS,
  CHARACTER_NAMES,
  CHARACTER_DESCRIPTIONS,
  LEVEL_XP_REQUIREMENTS,
  CLOUDINARY_CLOUD_NAME
};
