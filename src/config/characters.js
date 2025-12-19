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

// 📖 История Level 1 (базовая) - все 26 языков
const LEVEL_1_STORY = {
  en: 'After escaping the wolf raid, the young raccoon surveys the ruins of his home. He finds a trail of pawprints leading north—the wolves took survivors. He makes a promise: he will free them all.',
  'zh-Hans': '逃离狼群袭击后，年轻的浣熊审视着家园的废墟。他发现了一串向北延伸的爪印——狼群带走了幸存者。他许下承诺：他将解救所有人。',
  hi: 'भेड़िये के हमले से बचने के बाद, युवा रैकून अपने घर के खंडहरों का सर्वेक्षण करता है। उसे उत्तर की ओर जाने वाले पंजों के निशान मिलते हैं—भेड़ियों ने बचे लोगों को ले लिया। वह वादा करता है: वह सभी को मुक्त करेगा।',
  es: 'Tras escapar del ataque de los lobos, el joven mapache observa las ruinas de su hogar. Encuentra un rastro de huellas que conduce al norte—los lobos se llevaron a los sobrevivientes. Hace una promesa: los liberará a todos.',
  ar: 'بعد الهروب من غارة الذئاب، يفحص الراكون الصغير أنقاض منزله. يجد أثراً لآثار الأقدام المتجهة شمالاً—لقد أخذت الذئاب الناجين. يقطع وعداً: سيحررهم جميعاً.',
  pt: 'Após escapar do ataque dos lobos, o jovem guaxinim examina as ruínas de sua casa. Ele encontra um rastro de pegadas levando ao norte—os lobos levaram os sobreviventes. Ele faz uma promessa: libertará todos eles.',
  ru: 'Сбежав от волчьего набега, молодой енот осматривает руины своего дома. Он находит след отпечатков лап, ведущих на север—волки забрали выживших. Он даёт обещание: он освободит их всех.',
  kk: 'Қасқырлардың шабуылынан қашып құтылғаннан кейін, жас енот үйінің қирандыларын қарайды. Ол солтүстікке бағытталған аяқ іздерін табады—қасқырлар аман қалғандарды алып кетті. Ол уәде береді: барлығын босатамын.',
  ja: '狼の襲撃から逃れた後、若いアライグマは故郷の廃墟を見渡す。北へ続く足跡を発見する—狼たちが生存者を連れ去ったのだ。彼は誓う：すべての者を解放する。',
  fr: 'Après avoir échappé au raid des loups, le jeune raton laveur examine les ruines de sa maison. Il trouve une traînée d\'empreintes menant au nord—les loups ont emmené les survivants. Il fait une promesse : il les libérera tous.',
  de: 'Nach der Flucht vor dem Wolfsangriff begutachtet der junge Waschbär die Ruinen seines Zuhauses. Er findet eine Spur von Pfotenabdrücken nach Norden—die Wölfe haben die Überlebenden mitgenommen. Er gibt ein Versprechen: Er wird sie alle befreien.',
  ko: '늑대의 습격에서 탈출한 후, 젊은 너구리는 집의 폐허를 둘러본다. 북쪽으로 향하는 발자국 흔적을 발견한다—늑대들이 생존자들을 데려갔다. 그는 약속한다: 모두를 구출하겠다고.',
  vi: 'Sau khi thoát khỏi cuộc tấn công của bầy sói, chú gấu trúc non khảo sát đống đổ nát của ngôi nhà. Chú tìm thấy dấu chân hướng về phía bắc—bầy sói đã bắt những người sống sót. Chú hứa: sẽ giải thoát tất cả.',
  tr: 'Kurt baskınından kaçtıktan sonra, genç rakun evinin kalıntılarını inceler. Kuzeye giden pati izleri bulur—kurtlar hayatta kalanları götürmüş. Bir söz verir: hepsini kurtaracak.',
  it: 'Dopo essere sfuggito all\'attacco dei lupi, il giovane procione osserva le rovine della sua casa. Trova una scia di impronte che conducono a nord—i lupi hanno portato via i sopravvissuti. Fa una promessa: li libererà tutti.',
  th: 'หลังจากหนีจากการโจมตีของหมาป่า แรคคูนตัวน้อยสำรวจซากปรักหักพังของบ้าน เขาพบรอยอุ้งเท้าที่นำไปทางเหนือ—หมาป่าพาผู้รอดชีวิตไป เขาสัญญา: เขาจะปลดปล่อยพวกเขาทั้งหมด',
  pl: 'Po ucieczce przed najazdem wilków, młody szop ogląda ruiny swojego domu. Znajduje ślad łap prowadzący na północ—wilki zabrały ocalałych. Składa obietnicę: uwolni ich wszystkich.',
  id: 'Setelah melarikan diri dari serangan serigala, rakun muda memeriksa reruntuhan rumahnya. Ia menemukan jejak kaki menuju utara—serigala membawa para penyintas. Ia berjanji: ia akan membebaskan mereka semua.',
  nl: 'Na de ontsnapping aan de wolvenoverval, bekijkt de jonge wasbeer de ruïnes van zijn huis. Hij vindt een spoor van pootafdrukken naar het noorden—de wolven hebben overlevenden meegenomen. Hij doet een belofte: hij zal ze allemaal bevrijden.',
  cs: 'Po úniku před vlčím nájezdem mladý mýval prohlíží trosky svého domova. Najde stopu tlapek vedoucích na sever—vlci odvedli přeživší. Slibuje: všechny je osvobodí.',
  el: 'Αφού ξέφυγε από την επιδρομή των λύκων, ο νεαρός ρακούν εξετάζει τα ερείπια του σπιτιού του. Βρίσκει ένα μονοπάτι από πατημασιές που οδηγούν βόρεια—οι λύκοι πήραν επιζώντες. Δίνει υπόσχεση: θα τους ελευθερώσει όλους.',
  hu: 'Miután megszökött a farkastámadás elől, a fiatal mosómedve szemléli otthona romjait. Északi irányba vezető mancsnyomokat talál—a farkasok elvitték a túlélőket. Ígéretet tesz: mindnyájukat kiszabadítja.',
  sv: 'Efter att ha flytt från varganfallet undersöker den unga tvättbjörnen ruinerna av sitt hem. Han hittar ett spår av tassavtryck som leder norrut—vargarna tog med sig överlevande. Han ger ett löfte: han ska befria dem alla.',
  da: 'Efter at være undsluppet ulveangreb undersøger den unge vaskebjørn ruinerne af sit hjem. Han finder et spor af poter, der fører nordpå—ulvene tog overlevende med. Han lover: han vil befri dem alle.',
  fi: 'Paettuaan susihyökkäyksestä nuori pesukarhu tarkastelee kotinsa raunioita. Hän löytää tassunjälkien polun, joka johtaa pohjoiseen—sudet veivät selviytyneet. Hän antaa lupauksen: hän vapauttaa heidät kaikki.',
  no: 'Etter å ha rømt fra ulveangrepet, undersøker den unge vaskebjørnen ruinene av hjemmet sitt. Han finner et spor av poteavtrykk som leder nordover—ulvene tok med seg overlevende. Han gir et løfte: han skal befri dem alle.'
};

const LEVEL_2_STORY = {
  en: 'Featherhill is attacked, its residents hiding in the old grain mill. Our raccoon helps them escape through tunnels beneath the fields.\nThe villagers tell him: "You\'ll need these. The road ahead is long."',
  'zh-Hans': '羽丘遭到袭击，居民们躲在旧谷仓里。我们的浣熊帮助他们通过田地下的隧道逃脱。\n村民们告诉他："你会需要这些的。前方的路还很长。"',
  hi: 'फेदरहिल पर हमला होता है, इसके निवासी पुरानी अनाज की चक्की में छुपे हुए हैं। हमारा रैकून उन्हें खेतों के नीचे की सुरंगों से भागने में मदद करता है।\nगांव वाले उससे कहते हैं: "तुम्हें इनकी जरूरत होगी। आगे का रास्ता लंबा है।"',
  es: 'Featherhill es atacada, sus residentes se esconden en el viejo molino de grano. Nuestro mapache les ayuda a escapar por túneles bajo los campos.\nLos aldeanos le dicen: "Necesitarás esto. El camino por delante es largo."',
  ar: 'تتعرض فيذرهيل للهجوم، ويختبئ سكانها في طاحونة الحبوب القديمة. يساعدهم راكوننا على الهروب عبر الأنفاق تحت الحقول.\nيخبره القرويون: "ستحتاج إلى هذه. الطريق أمامك طويل."',
  pt: 'Featherhill é atacada, seus moradores se escondem no velho moinho de grãos. Nosso guaxinim os ajuda a escapar por túneis sob os campos.\nOs aldeões lhe dizem: "Você vai precisar disso. A estrada à frente é longa."',
  ru: 'На Перьевой холм нападают, жители прячутся на старой мельнице. Наш енот помогает им сбежать через туннели под полями.\nЖители говорят ему: "Они тебе понадобятся. Дорога впереди долгая."',
  kk: 'Қауырсын төбесіне шабуыл жасалады, тұрғындар ескі диірменде жасырынады. Біздің енот оларға егістіктер астындағы туннельдер арқылы қашуға көмектеседі.\nАуыл тұрғындары оған: "Бұлар саған керек болады. Алдағы жол ұзақ." - дейді.',
  ja: 'フェザーヒルが襲撃され、住民は古い穀物倉庫に隠れている。アライグマは畑の下のトンネルを通って彼らの脱出を助ける。\n村人たちは言う：「これが必要になるだろう。前途は長い。」',
  fr: 'Featherhill est attaqué, ses résidents se cachent dans le vieux moulin à grain. Notre raton laveur les aide à s\'échapper par des tunnels sous les champs.\nLes villageois lui disent : "Tu en auras besoin. La route est longue devant toi."',
  de: 'Featherhill wird angegriffen, seine Bewohner verstecken sich in der alten Getreidemühle. Unser Waschbär hilft ihnen, durch Tunnel unter den Feldern zu entkommen.\nDie Dorfbewohner sagen ihm: "Du wirst diese brauchen. Der Weg vor dir ist lang."',
  ko: '페더힐이 공격받고, 주민들은 오래된 곡물 방앗간에 숨어 있다. 우리 너구리는 들판 아래 터널을 통해 그들이 탈출하도록 돕는다.\n마을 사람들이 말한다: "이게 필요할 거야. 앞길이 멀어."',
  vi: 'Featherhill bị tấn công, cư dân ẩn náu trong xưởng xay thóc cũ. Chú gấu trúc giúp họ trốn thoát qua các đường hầm dưới cánh đồng.\nDân làng nói với chú: "Cậu sẽ cần những thứ này. Con đường phía trước còn dài."',
  tr: 'Featherhill\'e saldırı düzenlenir, sakinleri eski tahıl değirmeninde saklanır. Rakunumuz onların tarlalar altındaki tünellerden kaçmasına yardım eder.\nKöylüler ona der ki: "Bunlara ihtiyacın olacak. Önündeki yol uzun."',
  it: 'Featherhill viene attaccata, i suoi residenti si nascondono nel vecchio mulino. Il nostro procione li aiuta a fuggire attraverso i tunnel sotto i campi.\nI paesani gli dicono: "Ti serviranno. La strada davanti è lunga."',
  th: 'เฟเธอร์ฮิลล์ถูกโจมตี ผู้อยู่อาศัยซ่อนตัวในโรงสีเก่า แรคคูนของเราช่วยพวกเขาหนีผ่านอุโมงค์ใต้ทุ่งนา\nชาวบ้านบอกเขา: "คุณจะต้องใช้สิ่งเหล่านี้ ทางข้างหน้ายังยาวไกล"',
  pl: 'Featherhill jest atakowana, mieszkańcy ukrywają się w starym młynie zbożowym. Nasz szop pomaga im uciec tunelami pod polami.\nMieszkańcy mówią mu: "Będziesz ich potrzebował. Droga przed tobą jest długa."',
  id: 'Featherhill diserang, penduduknya bersembunyi di penggilingan gandum tua. Rakun kita membantu mereka melarikan diri melalui terowongan di bawah ladang.\nPara penduduk desa memberitahunya: "Kamu akan membutuhkan ini. Jalan di depan masih panjang."',
  nl: 'Featherhill wordt aangevallen, de bewoners verbergen zich in de oude graanmolen. Onze wasbeer helpt ze ontsnappen door tunnels onder de velden.\nDe dorpelingen zeggen tegen hem: "Je hebt deze nodig. De weg die voor je ligt is lang."',
  cs: 'Featherhill je napaden, obyvatelé se skrývají ve starém mlýně na zrní. Náš mýval jim pomáhá uniknout tunely pod poli.\nVesničané mu říkají: "Budeš je potřebovat. Cesta před tebou je dlouhá."',
  el: 'Το Featherhill δέχεται επίθεση, οι κάτοικοί του κρύβονται στον παλιό μύλο σιταριού. Ο ρακούν μας τους βοηθά να ξεφύγουν μέσω σηράγγων κάτω από τα χωράφια.\nΟι χωρικοί του λένε: "Θα τα χρειαστείς. Ο δρόμος μπροστά είναι μακρύς."',
  hu: 'Featherhillt megtámadják, lakói az öreg gabonafeldolgozóban bujkálnak. Mosómedvénk segít nekik megszökni az alagutakon keresztül a földek alatt.\nA falusiak mondják neki: "Ezekre szükséged lesz. A előtted álló út hosszú."',
  sv: 'Featherhill attackeras, invånarna gömmer sig i den gamla kvarnen. Vår tvättbjörn hjälper dem att fly genom tunnlar under fälten.\nByborna säger till honom: "Du kommer behöva dessa. Vägen framför dig är lång."',
  da: 'Featherhill angribes, dets beboere gemmer sig i den gamle kornmølle. Vores vaskebjørn hjælper dem med at flygte gennem tunneler under markerne.\nLandsbyboerne fortæller ham: "Du får brug for disse. Vejen forude er lang."',
  fi: 'Featherhillia hyökätään, asukkaat piiloutuvat vanhaan jyvämylliin. Pesukarhumme auttaa heitä pakenemaan peltojen alla olevien tunnelien läpi.\nKyläläiset sanovat hänelle: "Tulet tarvitsemaan näitä. Edessä oleva tie on pitkä."',
  no: 'Featherhill blir angrepet, innbyggerne gjemmer seg i den gamle kornmølla. Vaskebjørnen vår hjelper dem å rømme gjennom tunneler under åkrene.\nLandsbyboerne forteller ham: "Du kommer til å trenge disse. Veien foran deg er lang."'
};

const LEVEL_3_STORY = LEVEL_1_STORY;
const LEVEL_4_STORY = LEVEL_1_STORY;
const LEVEL_5_STORY = LEVEL_1_STORY;
const LEVEL_6_STORY = LEVEL_1_STORY;
const LEVEL_7_STORY = LEVEL_1_STORY;
const LEVEL_8_STORY = LEVEL_1_STORY;
const LEVEL_9_STORY = LEVEL_1_STORY;
const LEVEL_10_STORY = LEVEL_1_STORY;

// 📖 Объединенная константа со всеми историями
const CHARACTER_STORIES = {
  1: LEVEL_1_STORY,
  2: LEVEL_2_STORY,
  3: LEVEL_3_STORY,
  4: LEVEL_4_STORY,
  5: LEVEL_5_STORY,
  6: LEVEL_6_STORY,
  7: LEVEL_7_STORY,
  8: LEVEL_8_STORY,
  9: LEVEL_9_STORY,
  10: LEVEL_10_STORY
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
  const stories = CHARACTER_STORIES[actualLevel] || CHARACTER_STORIES[defaultLevel];
  
  return {
    image_url: CHARACTER_IMAGES_BLACK[actualLevel] || CHARACTER_IMAGES_BLACK[defaultLevel],
    animation_url: animationUrl,
    name: names[language] || names.en,
    story: stories[language] || stories.en,
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
    const stories = CHARACTER_STORIES[level];
    
    characters.push({
      level: level,
      name: names[language] || names.en,
      story: stories[language] || stories.en,
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
  CHARACTER_STORIES,
  LEVEL_XP_REQUIREMENTS,
  CLOUDINARY_CLOUD_NAME
};
