// config/achievements.js
// Конфигурация всех достижений с локализацией

const ACHIEVEMENTS = {
  // ==================== BY STEPS ====================
  
  steps_10k: {
    id: 'steps_10k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 10000,
    display_order: 1,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761735097/10k_steps_ytazss.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761735097/10k_steps_ytazss.png',
    translations: {
      en: { title: 'First 10K', description: 'Walk your first 10,000 steps' },
      'zh-Hans': { title: '首个1万步', description: '完成你的第一个10,000步' },
      hi: { title: 'पहले 10K', description: 'अपने पहले 10,000 कदम चलें' },
      es: { title: 'Primeros 10K', description: 'Camina tus primeros 10,000 pasos' },
      ar: { title: 'أول 10 آلاف', description: 'امش أول 10,000 خطوة لك' },
      pt: { title: 'Primeiros 10K', description: 'Caminhe seus primeiros 10.000 passos' },
      ru: { title: 'Первые 10К', description: 'Пройди свои первые 10,000 шагов' },
      kk: { title: 'Алғашқы 10К', description: 'Алғашқы 10,000 қадамыңды жасап шық' },
      ja: { title: '最初の1万歩', description: '最初の10,000歩を歩こう' },
      fr: { title: 'Premiers 10K', description: 'Marchez vos premiers 10 000 pas' },
      de: { title: 'Erste 10K', description: 'Gehe deine ersten 10.000 Schritte' },
      ko: { title: '첫 만보', description: '첫 10,000보를 걸으세요' },
      vi: { title: '10K Đầu Tiên', description: 'Bước đi 10.000 bước đầu tiên' },
      tr: { title: 'İlk 10K', description: 'İlk 10.000 adımını at' },
      it: { title: 'Primi 10K', description: 'Cammina i tuoi primi 10.000 passi' },
      th: { title: '10K แรก', description: 'เดิน 10,000 ก้าวแรกของคุณ' },
      pl: { title: 'Pierwsze 10K', description: 'Przejdź swoje pierwsze 10 000 kroków' },
      id: { title: '10K Pertama', description: 'Berjalan 10.000 langkah pertama Anda' },
      nl: { title: 'Eerste 10K', description: 'Loop je eerste 10.000 stappen' },
      cs: { title: 'Prvních 10K', description: 'Ujděte svých prvních 10 000 kroků' },
      el: { title: 'Πρώτα 10K', description: 'Περπατήστε τα πρώτα σας 10.000 βήματα' },
      hu: { title: 'Első 10K', description: 'Tedd meg az első 10 000 lépésedet' },
      sv: { title: 'Första 10K', description: 'Gå dina första 10 000 steg' },
      da: { title: 'Første 10K', description: 'Gå dine første 10.000 skridt' },
      fi: { title: 'Ensimmäiset 10K', description: 'Kävele ensimmäiset 10 000 askelta' },
      no: { title: 'Første 10K', description: 'Gå dine første 10 000 skritt' }
    }
  },

  steps_50k: {
    id: 'steps_50k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 50000,
    display_order: 2,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/50k_steps_reekay.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/50k_steps_reekay.png',
    translations: {
      en: { title: '50K Walker', description: 'Reach 50,000 total steps' },
      'zh-Hans': { title: '5万步行者', description: '达到50,000步总数' },
      hi: { title: '50K वॉकर', description: 'कुल 50,000 कदम तक पहुंचें' },
      es: { title: 'Caminante 50K', description: 'Alcanza 50,000 pasos totales' },
      ar: { title: 'ماشي 50 ألف', description: 'اصل إلى 50,000 خطوة إجمالاً' },
      pt: { title: 'Caminhante 50K', description: 'Alcance 50.000 passos totais' },
      ru: { title: 'Ходок 50К', description: 'Достигни 50,000 шагов' },
      kk: { title: '50К жаяу жүрушісі', description: '50,000 қадамға жет' },
      ja: { title: '5万歩ウォーカー', description: '合計50,000歩に到達' },
      fr: { title: 'Marcheur 50K', description: 'Atteignez 50 000 pas au total' },
      de: { title: '50K Läufer', description: 'Erreiche 50.000 Schritte insgesamt' },
      ko: { title: '5만보 워커', description: '총 50,000보 달성' },
      vi: { title: 'Người Đi Bộ 50K', description: 'Đạt 50.000 bước' },
      tr: { title: '50K Yürüyücü', description: 'Toplam 50.000 adıma ulaş' },
      it: { title: 'Camminatore 50K', description: 'Raggiungi 50.000 passi totali' },
      th: { title: 'นักเดิน 50K', description: 'ถึง 50,000 ก้าวทั้งหมด' },
      pl: { title: 'Chodzący 50K', description: 'Osiągnij 50 000 kroków' },
      id: { title: 'Pejalan 50K', description: 'Capai total 50.000 langkah' },
      nl: { title: '50K Wandelaar', description: 'Bereik 50.000 stappen in totaal' },
      cs: { title: 'Chodec 50K', description: 'Dosáhněte celkem 50 000 kroků' },
      el: { title: 'Περιπατητής 50K', description: 'Φτάστε τα 50.000 βήματα συνολικά' },
      hu: { title: '50K Sétáló', description: 'Érj el összesen 50 000 lépést' },
      sv: { title: '50K Vandrare', description: 'Nå 50 000 steg totalt' },
      da: { title: '50K Gående', description: 'Nå 50.000 skridt i alt' },
      fi: { title: '50K Kävelijä', description: 'Saavuta 50 000 askelta yhteensä' },
      no: { title: '50K Gåer', description: 'Nå 50 000 skritt totalt' }
    }
  },

  steps_100k: {
    id: 'steps_100k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 100000,
    display_order: 3,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/100k_steps_lvws8z.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/100k_steps_lvws8z.png',
    translations: {
      en: { title: '100K Champion', description: 'Hit 100,000 steps milestone' },
      'zh-Hans': { title: '10万步冠军', description: '达到100,000步里程碑' },
      hi: { title: '100K चैंपियन', description: '100,000 कदमों का मील का पत्थर हासिल करें' },
      es: { title: 'Campeón 100K', description: 'Alcanza el hito de 100,000 pasos' },
      ar: { title: 'بطل 100 ألف', description: 'اصل إلى معلم 100,000 خطوة' },
      pt: { title: 'Campeão 100K', description: 'Atinja o marco de 100.000 passos' },
      ru: { title: 'Чемпион 100К', description: 'Достигни рубежа в 100,000 шагов' },
      kk: { title: '100К чемпионы', description: '100,000 қадам белесіне жет' },
      ja: { title: '10万歩チャンピオン', description: '100,000歩のマイルストーンに到達' },
      fr: { title: 'Champion 100K', description: 'Atteignez le cap des 100 000 pas' },
      de: { title: '100K Champion', description: 'Erreiche den Meilenstein von 100.000 Schritten' },
      ko: { title: '10만보 챔피언', description: '100,000보 이정표 달성' },
      vi: { title: 'Nhà Vô Địch 100K', description: 'Đạt mốc 100.000 bước' },
      tr: { title: '100K Şampiyonu', description: '100.000 adım kilometre taşına ulaş' },
      it: { title: 'Campione 100K', description: 'Raggiungi il traguardo di 100.000 passi' },
      th: { title: 'แชมป์ 100K', description: 'ถึงเป้าหมาย 100,000 ก้าว' },
      pl: { title: 'Mistrz 100K', description: 'Osiągnij kamień milowy 100 000 kroków' },
      id: { title: 'Juara 100K', description: 'Capai pencapaian 100.000 langkah' },
      nl: { title: '100K Kampioen', description: 'Bereik de mijlpaal van 100.000 stappen' },
      cs: { title: 'Šampion 100K', description: 'Dosáhněte milníku 100 000 kroků' },
      el: { title: 'Πρωταθλητής 100K', description: 'Φτάστε το ορόσημο των 100.000 βημάτων' },
      hu: { title: '100K Bajnok', description: 'Érj el a 100 000 lépés mérföldkövet' },
      sv: { title: '100K Mästare', description: 'Nå milstolpen 100 000 steg' },
      da: { title: '100K Mester', description: 'Nå milepælen på 100.000 skridt' },
      fi: { title: '100K Mestari', description: 'Saavuta 100 000 askeleen virstanpylväs' },
      no: { title: '100K Mester', description: 'Nå milepælen på 100 000 skritt' }
    }
  },

  steps_250k: {
    id: 'steps_250k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 250000,
    display_order: 4,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/250k_steps_jx1jkj.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/250k_steps_jx1jkj.png',
    translations: {
      en: { title: 'Quarter Million', description: 'Achieve 250,000 steps' },
      'zh-Hans': { title: '25万步', description: '达到250,000步' },
      hi: { title: 'क्वार्टर मिलियन', description: '250,000 कदम हासिल करें' },
      es: { title: 'Cuarto de Millón', description: 'Alcanza 250,000 pasos' },
      ar: { title: 'ربع مليون', description: 'حقق 250,000 خطوة' },
      pt: { title: 'Quarto de Milhão', description: 'Alcance 250.000 passos' },
      ru: { title: 'Четверть миллиона', description: 'Достигни 250,000 шагов' },
      kk: { title: 'Ширек миллион', description: '250,000 қадамға жет' },
      ja: { title: '25万歩', description: '250,000歩を達成' },
      fr: { title: 'Quart de Million', description: 'Atteignez 250 000 pas' },
      de: { title: 'Viertel Million', description: 'Erreiche 250.000 Schritte' },
      ko: { title: '25만보', description: '250,000보 달성' },
      vi: { title: 'Một Phần Tư Triệu', description: 'Đạt 250.000 bước' },
      tr: { title: 'Çeyrek Milyon', description: '250.000 adıma ulaş' },
      it: { title: 'Quarto di Milione', description: 'Raggiungi 250.000 passi' },
      th: { title: 'หนึ่งในสี่ล้าน', description: 'บรรลุ 250,000 ก้าว' },
      pl: { title: 'Ćwierć Miliona', description: 'Osiągnij 250 000 kroków' },
      id: { title: 'Seperempat Juta', description: 'Capai 250.000 langkah' },
      nl: { title: 'Kwart Miljoen', description: 'Bereik 250.000 stappen' },
      cs: { title: 'Čtvrt Milionu', description: 'Dosáhněte 250 000 kroků' },
      el: { title: 'Τέταρτο Εκατομμυρίου', description: 'Επιτύχετε 250.000 βήματα' },
      hu: { title: 'Negyed Millió', description: 'Érj el 250 000 lépést' },
      sv: { title: 'Kvarts Miljon', description: 'Uppnå 250 000 steg' },
      da: { title: 'Kvart Million', description: 'Nå 250.000 skridt' },
      fi: { title: 'Neljäsosa Miljoonasta', description: 'Saavuta 250 000 askelta' },
      no: { title: 'Kvart Million', description: 'Oppnå 250 000 skritt' }
    }
  },

  steps_500k: {
    id: 'steps_500k',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 500000,
    display_order: 5,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/500k_steps_gsqdbt.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733247/500k_steps_gsqdbt.png',
    translations: {
      en: { title: 'Half Million Hero', description: 'Conquer 500,000 steps' },
      'zh-Hans': { title: '50万步英雄', description: '征服500,000步' },
      hi: { title: 'आधा मिलियन हीरो', description: '500,000 कदमों को जीतें' },
      es: { title: 'Héroe Medio Millón', description: 'Conquista 500,000 pasos' },
      ar: { title: 'بطل نصف مليون', description: 'اغزو 500,000 خطوة' },
      pt: { title: 'Herói Meio Milhão', description: 'Conquiste 500.000 passos' },
      ru: { title: 'Герой полумиллиона', description: 'Покори 500,000 шагов' },
      kk: { title: 'Жарты миллион батыры', description: '500,000 қадамды бағындыр' },
      ja: { title: '50万歩ヒーロー', description: '500,000歩を征服' },
      fr: { title: 'Héros Demi-Million', description: 'Conquérez 500 000 pas' },
      de: { title: 'Halbe Million Held', description: 'Erobere 500.000 Schritte' },
      ko: { title: '50만보 영웅', description: '500,000보 정복' },
      vi: { title: 'Anh Hùng Nửa Triệu', description: 'Chinh phục 500.000 bước' },
      tr: { title: 'Yarım Milyon Kahramanı', description: '500.000 adımı fethet' },
      it: { title: 'Eroe Mezzo Milione', description: 'Conquista 500.000 passi' },
      th: { title: 'ฮีโร่ครึ่งล้าน', description: 'พิชิต 500,000 ก้าว' },
      pl: { title: 'Bohater Pół Miliona', description: 'Podbij 500 000 kroków' },
      id: { title: 'Pahlawan Setengah Juta', description: 'Taklukkan 500.000 langkah' },
      nl: { title: 'Half Miljoen Held', description: 'Verover 500.000 stappen' },
      cs: { title: 'Hrdina Půl Milionu', description: 'Dobijte 500 000 kroků' },
      el: { title: 'Ήρωας Μισού Εκατομμυρίου', description: 'Κατακτήστε 500.000 βήματα' },
      hu: { title: 'Fél Millió Hős', description: 'Hódítsd meg az 500 000 lépést' },
      sv: { title: 'Halv Miljon Hjälte', description: 'Erövra 500 000 steg' },
      da: { title: 'Halv Million Helt', description: 'Erobre 500.000 skridt' },
      fi: { title: 'Puolen Miljoonan Sankari', description: 'Valloita 500 000 askelta' },
      no: { title: 'Halv Million Helt', description: 'Erobre 500 000 skritt' }
    }
  },

  steps_1m: {
    id: 'steps_1m',
    category: 'by_steps',
    requirement_type: 'total_steps',
    requirement_value: 1000000,
    display_order: 6,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/1m_steps_rpucnu.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733246/1m_steps_rpucnu.png',
    translations: {
      en: { title: 'Million Steps Master', description: 'Complete 1,000,000 steps' },
      'zh-Hans': { title: '百万步大师', description: '完成1,000,000步' },
      hi: { title: 'मिलियन स्टेप्स मास्टर', description: '1,000,000 कदम पूरे करें' },
      es: { title: 'Maestro Millón de Pasos', description: 'Completa 1,000,000 de pasos' },
      ar: { title: 'سيد المليون خطوة', description: 'أكمل 1,000,000 خطوة' },
      pt: { title: 'Mestre Milhão de Passos', description: 'Complete 1.000.000 de passos' },
      ru: { title: 'Мастер миллиона', description: 'Пройди 1,000,000 шагов' },
      kk: { title: 'Миллион қадам шебері', description: '1,000,000 қадам жаса' },
      ja: { title: '100万歩マスター', description: '1,000,000歩を達成' },
      fr: { title: 'Maître Million de Pas', description: 'Complétez 1 000 000 de pas' },
      de: { title: 'Millionen Schritte Meister', description: 'Absolviere 1.000.000 Schritte' },
      ko: { title: '백만보 마스터', description: '1,000,000보 완료' },
      vi: { title: 'Bậc Thầy Triệu Bước', description: 'Hoàn thành 1.000.000 bước' },
      tr: { title: 'Milyon Adım Ustası', description: '1.000.000 adımı tamamla' },
      it: { title: 'Maestro Milione di Passi', description: 'Completa 1.000.000 di passi' },
      th: { title: 'อาจารย์ล้านก้าว', description: 'เดินครบ 1,000,000 ก้าว' },
      pl: { title: 'Mistrz Miliona Kroków', description: 'Ukończ 1 000 000 kroków' },
      id: { title: 'Master Sejuta Langkah', description: 'Selesaikan 1.000.000 langkah' },
      nl: { title: 'Miljoen Stappen Meester', description: 'Voltooi 1.000.000 stappen' },
      cs: { title: 'Mistr Milionu Kroků', description: 'Dokončete 1 000 000 kroků' },
      el: { title: 'Δάσκαλος Εκατομμυρίου Βημάτων', description: 'Ολοκληρώστε 1.000.000 βήματα' },
      hu: { title: 'Millió Lépés Mester', description: 'Teljesíts 1 000 000 lépést' },
      sv: { title: 'Miljon Steg Mästare', description: 'Slutför 1 000 000 steg' },
      da: { title: 'Million Skridt Mester', description: 'Fuldfør 1.000.000 skridt' },
      fi: { title: 'Miljoonan Askeleen Mestari', description: 'Suorita 1 000 000 askelta' },
      no: { title: 'Million Skritt Mester', description: 'Fullfør 1 000 000 skritt' }
    }
  },

  // ==================== BY STREAKS ====================

  streak_7: {
    id: 'streak_7',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 7,
    display_order: 7,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/7_days_renl5b.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/7_days_renl5b.png',
    translations: {
      en: { title: 'Week Warrior', description: 'Maintain a 7-day walking streak' },
      'zh-Hans': { title: '一周勇士', description: '保持7天连续步行' },
      hi: { title: 'सप्ताह योद्धा', description: '7 दिन की चलने की लकीर बनाए रखें' },
      es: { title: 'Guerrero Semanal', description: 'Mantén una racha de 7 días caminando' },
      ar: { title: 'محارب الأسبوع', description: 'حافظ على سلسلة مشي لمدة 7 أيام' },
      pt: { title: 'Guerreiro Semanal', description: 'Mantenha uma sequência de 7 dias caminhando' },
      ru: { title: 'Воин недели', description: 'Поддержи серию из 7 дней' },
      kk: { title: 'Апта жауынгері', description: '7 күндік серияны ұстап тұр' },
      ja: { title: '1週間ウォーリアー', description: '7日間のウォーキング連続記録を維持' },
      fr: { title: 'Guerrier Hebdomadaire', description: 'Maintenez une série de 7 jours de marche' },
      de: { title: 'Wochen-Krieger', description: 'Halte eine 7-Tage-Gehserie aufrecht' },
      ko: { title: '주간 전사', description: '7일 연속 걷기 기록 유지' },
      vi: { title: 'Chiến Binh Tuần', description: 'Duy trì chuỗi đi bộ 7 ngày' },
      tr: { title: 'Hafta Savaşçısı', description: '7 günlük yürüyüş serisini koru' },
      it: { title: 'Guerriero Settimanale', description: 'Mantieni una serie di 7 giorni di camminata' },
      th: { title: 'นักรบสัปดาห์', description: 'รักษาการเดินติดต่อกัน 7 วัน' },
      pl: { title: 'Wojownik Tygodnia', description: 'Utrzymuj passę 7 dni chodzenia' },
      id: { title: 'Pejuang Mingguan', description: 'Pertahankan streak berjalan 7 hari' },
      nl: { title: 'Week Strijder', description: 'Houd een 7-daagse loopstreak aan' },
      cs: { title: 'Týdenní Válečník', description: 'Udržujte 7denní sérii chůze' },
      el: { title: 'Πολεμιστής Εβδομάδας', description: 'Διατηρήστε σειρά περπατήματος 7 ημερών' },
      hu: { title: 'Heti Harcos', description: 'Tartsd fenn a 7 napos sétasorozatot' },
      sv: { title: 'Vecko Krigare', description: 'Behåll en 7-dagars gångsvit' },
      da: { title: 'Uge Kriger', description: 'Oprethold en 7-dages gangstribe' },
      fi: { title: 'Viikon Soturi', description: 'Ylläpidä 7 päivän kävelysarja' },
      no: { title: 'Uke Kriger', description: 'Oppretthold en 7-dagers gangstripe' }
    }
  },

  streak_14: {
    id: 'streak_14',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 14,
    display_order: 8,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/14_days_rwcywj.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733281/14_days_rwcywj.png',
    translations: {
      en: { title: 'Two Week Champion', description: 'Keep walking for 14 days straight' },
      'zh-Hans': { title: '两周冠军', description: '连续步行14天' },
      hi: { title: 'दो सप्ताह चैंपियन', description: 'लगातार 14 दिनों तक चलते रहें' },
      es: { title: 'Campeón Quincenal', description: 'Camina durante 14 días seguidos' },
      ar: { title: 'بطل أسبوعين', description: 'استمر في المشي لمدة 14 يوماً متتالياً' },
      pt: { title: 'Campeão Quinzenal', description: 'Continue caminhando por 14 dias seguidos' },
      ru: { title: 'Чемпион двух недель', description: 'Ходи 14 дней подряд' },
      kk: { title: 'Екі апта чемпионы', description: '14 күн қатарынан жүр' },
      ja: { title: '2週間チャンピオン', description: '14日間連続で歩き続ける' },
      fr: { title: 'Champion Deux Semaines', description: 'Marchez pendant 14 jours consécutifs' },
      de: { title: 'Zwei-Wochen-Champion', description: 'Gehe 14 Tage am Stück' },
      ko: { title: '2주 챔피언', description: '14일 연속 걷기' },
      vi: { title: 'Nhà Vô Địch Hai Tuần', description: 'Tiếp tục đi bộ 14 ngày liên tiếp' },
      tr: { title: 'İki Hafta Şampiyonu', description: '14 gün boyunca yürümeye devam et' },
      it: { title: 'Campione Due Settimane', description: 'Continua a camminare per 14 giorni di fila' },
      th: { title: 'แชมป์สองสัปดาห์', description: 'เดินต่อเนื่อง 14 วัน' },
      pl: { title: 'Mistrz Dwóch Tygodni', description: 'Chodź przez 14 dni z rzędu' },
      id: { title: 'Juara Dua Minggu', description: 'Terus berjalan selama 14 hari berturut-turut' },
      nl: { title: 'Twee Weken Kampioen', description: 'Blijf 14 dagen achter elkaar lopen' },
      cs: { title: 'Šampion Dvou Týdnů', description: 'Choďte 14 dní v řadě' },
      el: { title: 'Πρωταθλητής Δύο Εβδομάδων', description: 'Συνεχίστε να περπατάτε για 14 συνεχόμενες μέρες' },
      hu: { title: 'Két Hetes Bajnok', description: 'Sétálj 14 egymást követő napig' },
      sv: { title: 'Två Veckors Mästare', description: 'Fortsätt gå i 14 dagar i sträck' },
      da: { title: 'To Ugers Mester', description: 'Fortsæt med at gå i 14 dage i træk' },
      fi: { title: 'Kahden Viikon Mestari', description: 'Jatka kävelyä 14 päivää peräkkäin' },
      no: { title: 'To Ukers Mester', description: 'Fortsett å gå i 14 dager på rad' }
    }
  },

  streak_30: {
    id: 'streak_30',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 30,
    display_order: 9,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733282/30_days_stdsr3.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733282/30_days_stdsr3.png',
    translations: {
      en: { title: 'Monthly Master', description: 'Complete a 30-day streak' },
      'zh-Hans': { title: '月度大师', description: '完成30天连续挑战' },
      hi: { title: 'मासिक मास्टर', description: '30 दिनों की लकीर पूरी करें' },
      es: { title: 'Maestro Mensual', description: 'Completa una racha de 30 días' },
      ar: { title: 'سيد الشهر', description: 'أكمل سلسلة 30 يوماً' },
      pt: { title: 'Mestre Mensal', description: 'Complete uma sequência de 30 dias' },
      ru: { title: 'Мастер месяца', description: 'Заверши серию в 30 дней' },
      kk: { title: 'Ай шебері', description: '30 күндік серияны аяқта' },
      ja: { title: '月間マスター', description: '30日間の連続記録を達成' },
      fr: { title: 'Maître Mensuel', description: 'Complétez une série de 30 jours' },
      de: { title: 'Monats-Meister', description: 'Absolviere eine 30-Tage-Serie' },
      ko: { title: '월간 마스터', description: '30일 연속 기록 완료' },
      vi: { title: 'Bậc Thầy Tháng', description: 'Hoàn thành chuỗi 30 ngày' },
      tr: { title: 'Aylık Usta', description: '30 günlük seriyi tamamla' },
      it: { title: 'Maestro Mensile', description: 'Completa una serie di 30 giorni' },
      th: { title: 'อาจารย์รายเดือน', description: 'ทำสำเร็จ 30 วันติดต่อกัน' },
      pl: { title: 'Mistrz Miesiąca', description: 'Ukończ passę 30 dni' },
      id: { title: 'Master Bulanan', description: 'Selesaikan streak 30 hari' },
      nl: { title: 'Maandelijkse Meester', description: 'Voltooi een 30-daagse streak' },
      cs: { title: 'Měsíční Mistr', description: 'Dokončete 30denní sérii' },
      el: { title: 'Μηνιαίος Δάσκαλος', description: 'Ολοκληρώστε σειρά 30 ημερών' },
      hu: { title: 'Havi Mester', description: 'Teljesíts egy 30 napos sorozatot' },
      sv: { title: 'Månads Mästare', description: 'Slutför en 30-dagars svit' },
      da: { title: 'Månedlig Mester', description: 'Fuldfør en 30-dages stribe' },
      fi: { title: 'Kuukausittainen Mestari', description: 'Suorita 30 päivän sarja' },
      no: { title: 'Månedlig Mester', description: 'Fullfør en 30-dagers stripe' }
    }
  },

  streak_90: {
    id: 'streak_90',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 90,
    display_order: 10,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733283/90_days_zmeiqy.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733283/90_days_zmeiqy.png',
    translations: {
      en: { title: 'Quarter Year Hero', description: 'Achieve a 90-day streak' },
      'zh-Hans': { title: '季度英雄', description: '达成90天连续挑战' },
      hi: { title: 'तिमाही हीरो', description: '90 दिनों की लकीर हासिल करें' },
      es: { title: 'Héroe Trimestral', description: 'Logra una racha de 90 días' },
      ar: { title: 'بطل الربع سنوي', description: 'حقق سلسلة 90 يوماً' },
      pt: { title: 'Herói Trimestral', description: 'Alcance uma sequência de 90 dias' },
      ru: { title: 'Герой квартала', description: 'Достигни серии в 90 дней' },
      kk: { title: 'Тоқсан батыры', description: '90 күндік серияға жет' },
      ja: { title: '四半期ヒーロー', description: '90日間の連続記録を達成' },
      fr: { title: 'Héros Trimestriel', description: 'Atteignez une série de 90 jours' },
      de: { title: 'Quartals-Held', description: 'Erreiche eine 90-Tage-Serie' },
      ko: { title: '분기 영웅', description: '90일 연속 기록 달성' },
      vi: { title: 'Anh Hùng Quý', description: 'Đạt chuỗi 90 ngày' },
      tr: { title: 'Çeyrek Yıl Kahramanı', description: '90 günlük seriye ulaş' },
      it: { title: 'Eroe Trimestrale', description: 'Raggiungi una serie di 90 giorni' },
      th: { title: 'ฮีโร่ไตรมาส', description: 'บรรลุ 90 วันติดต่อกัน' },
      pl: { title: 'Bohater Kwartału', description: 'Osiągnij passę 90 dni' },
      id: { title: 'Pahlawan Kuartal', description: 'Capai streak 90 hari' },
      nl: { title: 'Kwartaal Held', description: 'Bereik een 90-daagse streak' },
      cs: { title: 'Hrdina Čtvrtletí', description: 'Dosáhněte 90denní série' },
      el: { title: 'Ήρωας Τριμήνου', description: 'Επιτύχετε σειρά 90 ημερών' },
      hu: { title: 'Negyedéves Hős', description: 'Érj el 90 napos sorozatot' },
      sv: { title: 'Kvartals Hjälte', description: 'Uppnå en 90-dagars svit' },
      da: { title: 'Kvartals Helt', description: 'Opnå en 90-dages stribe' },
      fi: { title: 'Vuosineljänneksen Sankari', description: 'Saavuta 90 päivän sarja' },
      no: { title: 'Kvartals Helt', description: 'Oppnå en 90-dagers stripe' }
    }
  },

  streak_180: {
    id: 'streak_180',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 180,
    display_order: 11,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733284/180_days_x3e5mj.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733284/180_days_x3e5mj.png',
    translations: {
      en: { title: 'Half Year Legend', description: 'Maintain 180 days in a row' },
      'zh-Hans': { title: '半年传奇', description: '保持连续180天' },
      hi: { title: 'आधा साल की किंवदंती', description: 'लगातार 180 दिन बनाए रखें' },
      es: { title: 'Leyenda Semestral', description: 'Mantén 180 días seguidos' },
      ar: { title: 'أسطورة نصف السنة', description: 'حافظ على 180 يوماً متتالياً' },
      pt: { title: 'Lenda Semestral', description: 'Mantenha 180 dias seguidos' },
      ru: { title: 'Легенда полугодия', description: 'Поддержи 180 дней подряд' },
      kk: { title: 'Жарты жыл аңызы', description: '180 күн қатарынан ұстап тұр' },
      ja: { title: '半年レジェンド', description: '180日連続を維持' },
      fr: { title: 'Légende Semestrielle', description: 'Maintenez 180 jours consécutifs' },
      de: { title: 'Halbjahres-Legende', description: 'Halte 180 Tage in Folge durch' },
      ko: { title: '반년 전설', description: '180일 연속 유지' },
      vi: { title: 'Huyền Thoại Nửa Năm', description: 'Duy trì 180 ngày liên tiếp' },
      tr: { title: 'Yarım Yıl Efsanesi', description: '180 gün üst üste devam et' },
      it: { title: 'Leggenda Semestrale', description: 'Mantieni 180 giorni di fila' },
      th: { title: 'ตำนานครึ่งปี', description: 'รักษา 180 วันติดต่อกัน' },
      pl: { title: 'Legenda Półroczna', description: 'Utrzymaj 180 dni z rzędu' },
      id: { title: 'Legenda Setengah Tahun', description: 'Pertahankan 180 hari berturut-turut' },
      nl: { title: 'Half Jaar Legende', description: 'Houd 180 dagen op rij vol' },
      cs: { title: 'Legenda Půl Roku', description: 'Udržujte 180 dní v řadě' },
      el: { title: 'Θρύλος Εξαμήνου', description: 'Διατηρήστε 180 συνεχόμενες μέρες' },
      hu: { title: 'Féléves Legenda', description: 'Tartsd fenn 180 egymást követő napot' },
      sv: { title: 'Halvårs Legend', description: 'Behåll 180 dagar i rad' },
      da: { title: 'Halvårs Legende', description: 'Oprethold 180 dage i træk' },
      fi: { title: 'Puolen Vuoden Legenda', description: 'Ylläpidä 180 päivää peräkkäin' },
      no: { title: 'Halvårs Legende', description: 'Oppretthold 180 dager på rad' }
    }
  },

  streak_365: {
    id: 'streak_365',
    category: 'by_streaks',
    requirement_type: 'longest_streak',
    requirement_value: 365,
    display_order: 12,
    icon_url_locked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733285/365_days_dj5qst.png',
    icon_url_unlocked: 'https://res.cloudinary.com/dvfelpkla/image/upload/v1761733285/365_days_dj5qst.png',
    translations: {
      en: { title: 'Year Long Warrior', description: 'Complete a full year streak' },
      'zh-Hans': { title: '全年勇士', description: '完成整整一年的连续挑战' },
      hi: { title: 'पूरे साल का योद्धा', description: 'पूरे एक साल की लकीर पूरी करें' },
      es: { title: 'Guerrero Anual', description: 'Completa una racha de un año completo' },
      ar: { title: 'محارب العام الكامل', description: 'أكمل سلسلة عام كامل' },
      pt: { title: 'Guerreiro do Ano Inteiro', description: 'Complete uma sequência de um ano inteiro' },
      ru: { title: 'Воин года', description: 'Заверши годовую серию' },
      kk: { title: 'Жылдық жауынгер', description: 'Толық жылдық серияны аяқта' },
      ja: { title: '年間ウォーリアー', description: '1年間の連続記録を達成' },
      fr: { title: 'Guerrier Annuel', description: 'Complétez une série d\'une année entière' },
      de: { title: 'Jahres-Krieger', description: 'Absolviere eine einjährige Serie' },
      ko: { title: '연간 전사', description: '1년 연속 기록 완료' },
      vi: { title: 'Chiến Binh Cả Năm', description: 'Hoàn thành chuỗi cả năm' },
      tr: { title: 'Tam Yıl Savaşçısı', description: 'Tam bir yıllık seriyi tamamla' },
      it: { title: 'Guerriero Annuale', description: 'Completa una serie di un anno intero' },
      th: { title: 'นักรบตลอดปี', description: 'ทำสำเร็จ 1 ปีเต็มติดต่อกัน' },
      pl: { title: 'Wojownik Całoroczny', description: 'Ukończ passę przez cały rok' },
      id: { title: 'Pejuang Setahun Penuh', description: 'Selesaikan streak satu tahun penuh' },
      nl: { title: 'Jaarlange Strijder', description: 'Voltooi een streak van een heel jaar' },
      cs: { title: 'Celoroční Válečník', description: 'Dokončete celoroční sérii' },
      el: { title: 'Πολεμιστής Ολόκληρου Έτους', description: 'Ολοκληρώστε σειρά ενός πλήρους έτους' },
      hu: { title: 'Egész Éves Harcos', description: 'Teljesíts egy egész éves sorozatot' },
      sv: { title: 'Helårs Krigare', description: 'Slutför en helårssvit' },
      da: { title: 'Helårs Kriger', description: 'Fuldfør en helårsstribe' },
      fi: { title: 'Koko Vuoden Soturi', description: 'Suorita koko vuoden sarja' },
      no: { title: 'Helårs Kriger', description: 'Fullfør en helårsstripe' }
    }
  }
};

// Вспомогательные функции для работы с достижениями

/**
 * Получить все достижения с переводами
 * @param {string} language - Код языка (en, ru, kk)
 * @returns {Array} Массив достижений с переводами
 */
function getAllAchievements(language = 'en') {
  return Object.values(ACHIEVEMENTS).map(achievement => ({
    id: achievement.id,
    category: achievement.category,
    requirement_type: achievement.requirement_type,
    requirement_value: achievement.requirement_value,
    display_order: achievement.display_order,
    icon_url_locked: achievement.icon_url_locked,
    icon_url_unlocked: achievement.icon_url_unlocked,
    title: achievement.translations[language]?.title || achievement.translations.en.title,
    description: achievement.translations[language]?.description || achievement.translations.en.description
  }));
}

/**
 * Получить достижение по ID с переводом
 * @param {string} id - ID достижения
 * @param {string} language - Код языка
 * @returns {Object|null} Достижение с переводом
 */
function getAchievementById(id, language = 'en') {
  const achievement = ACHIEVEMENTS[id];
  if (!achievement) return null;

  return {
    id: achievement.id,
    category: achievement.category,
    requirement_type: achievement.requirement_type,
    requirement_value: achievement.requirement_value,
    display_order: achievement.display_order,
    icon_url_locked: achievement.icon_url_locked,
    icon_url_unlocked: achievement.icon_url_unlocked,
    title: achievement.translations[language]?.title || achievement.translations.en.title,
    description: achievement.translations[language]?.description || achievement.translations.en.description
  };
}

/**
 * Получить достижения по категории
 * @param {string} category - Категория ('by_steps' или 'by_streaks')
 * @param {string} language - Код языка
 * @returns {Array} Массив достижений категории
 */
function getAchievementsByCategory(category, language = 'en') {
  return getAllAchievements(language)
    .filter(achievement => achievement.category === category)
    .sort((a, b) => a.display_order - b.display_order);
}

/**
 * Получить поддерживаемые языки
 * @returns {Array} Массив кодов языков
 */
function getSupportedLanguages() {
  return [
    'en',         // English
    'zh-Hans',    // Chinese Simplified
    'hi',         // Hindi
    'es',         // Spanish
    'ar',         // Arabic
    'pt',         // Portuguese
    'ru',         // Russian
    'kk',         // Kazakh
    'ja',         // Japanese
    'fr',         // French
    'de',         // German
    'ko',         // Korean
    'vi',         // Vietnamese
    'tr',         // Turkish
    'it',         // Italian
    'th',         // Thai
    'pl',         // Polish
    'id',         // Indonesian
    'nl',         // Dutch
    'cs',         // Czech
    'el',         // Greek
    'hu',         // Hungarian
    'sv',         // Swedish
    'da',         // Danish
    'fi',         // Finnish
    'no'          // Norwegian
  ];
}

module.exports = {
  ACHIEVEMENTS,
  getAllAchievements,
  getAchievementById,
  getAchievementsByCategory,
  getSupportedLanguages
};
