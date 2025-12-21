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

// 🦝 Имена персонажей (только на английском)
const CHARACTER_NAMES = {
  1: 'Beginner',
  2: 'Walker',
  3: 'Explorer',
  4: 'Defender',
  5: 'Guardian',
  6: 'Wanderer',
  7: 'Pathfinder',
  8: 'Champion',
  9: 'Veteran',
  10: 'Hero'
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

// 📖 История Level 3 - Lantern Woods (все 26 языков)
const LEVEL_3_STORY = {
  en: 'Shimmering lights appear deep in Lantern Woods—wolf patrols using enchanted crystals stolen from the Owls.\nThe raccoon frees the tribe by sneaking through the forest at night.\nThe elders reward him with tools to navigate the darkness.',
  'zh-Hans': '灯笼森林深处出现闪烁的光芒——狼群巡逻队使用从猫头鹰那里偷来的魔法水晶。\n浣熊在夜间潜行穿过森林，解救了部落。\n长老们奖励他工具，帮助他在黑暗中导航。',
  hi: 'लालटेन वुड्स की गहराई में चमकती रोशनी दिखाई देती है—भेड़िये गश्त उल्लुओं से चुराए गए जादुई क्रिस्टल का उपयोग कर रहे हैं।\nरैकून रात में जंगल से चुपके से गुजरकर जनजाति को मुक्त करता है।\nबुजुर्ग उसे अंधेरे में नेविगेट करने के लिए उपकरण देते हैं।',
  es: 'Luces brillantes aparecen en lo profundo del Bosque de las Linternas—patrullas de lobos usando cristales encantados robados a los Búhos.\nEl mapache libera a la tribu escabulléndose por el bosque de noche.\nLos ancianos lo recompensan con herramientas para navegar en la oscuridad.',
  ar: 'تظهر أضواء متلألئة في عمق غابة الفوانيس—دوريات الذئاب تستخدم بلورات مسحورة مسروقة من البوم.\nيحرر الراكون القبيلة بالتسلل عبر الغابة ليلاً.\nيكافئه الشيوخ بأدوات للتنقل في الظلام.',
  pt: 'Luzes cintilantes aparecem nas profundezas da Floresta das Lanternas—patrulhas de lobos usando cristais encantados roubados das Corujas.\nO guaxinim liberta a tribo se esgueirando pela floresta à noite.\nOs anciãos o recompensam com ferramentas para navegar na escuridão.',
  ru: 'Мерцающие огни появляются в глубине Фонарного леса—волчьи патрули используют зачарованные кристаллы, украденные у Сов.\nЕнот освобождает племя, пробираясь через лес ночью.\nСтарейшины награждают его инструментами для навигации в темноте.',
  kk: 'Шам ормандарының тереңінде жарқыраған жарықтар пайда болады—қасқырлар үкілерден ұрланған сиқырлы кристалдарды пайдаланады.\nЕнот түнде орман арқылы жасырын жүріп, тайпаны босатады.\nАқсақалдар оны қараңғыда жол табуға арналған құралдармен марапаттайды.',
  ja: 'ランタンの森の奥で煌めく光が現れる—狼のパトロール隊がフクロウから盗んだ魔法の水晶を使っている。\nアライグマは夜の森を忍び抜け、部族を解放する。\n長老たちは彼に闇を進むための道具を授ける。',
  fr: 'Des lumières scintillantes apparaissent au fond de la Forêt des Lanternes—des patrouilles de loups utilisant des cristaux enchantés volés aux Hiboux.\nLe raton laveur libère la tribu en se faufilant dans la forêt la nuit.\nLes anciens le récompensent avec des outils pour naviguer dans l\'obscurité.',
  de: 'Schimmernde Lichter erscheinen tief im Laternenwald—Wolfspatrouillen nutzen verzauberte Kristalle, die von den Eulen gestohlen wurden.\nDer Waschbär befreit den Stamm, indem er nachts durch den Wald schleicht.\nDie Ältesten belohnen ihn mit Werkzeugen zur Navigation in der Dunkelheit.',
  ko: '랜턴 숲 깊은 곳에 반짝이는 불빛이 나타난다—늑대 순찰대가 올빼미들에게서 훔친 마법 수정을 사용하고 있다.\n너구리는 밤에 숲을 몰래 지나가며 부족을 해방시킨다.\n장로들은 그에게 어둠 속을 항해할 도구를 보상으로 준다.',
  vi: 'Ánh sáng lung linh xuất hiện sâu trong Rừng Đèn Lồng—đội tuần tra sói sử dụng pha lê phép thuật bị đánh cắp từ Cú.\nChú gấu trúc giải phóng bộ lạc bằng cách lẻn qua khu rừng vào ban đêm.\nCác trưởng lão thưởng cho chú những công cụ để dẫn đường trong bóng tối.',
  tr: 'Fener Ormanları\'nın derinliklerinde parıldayan ışıklar görünür—kurtlar Baykuşlardan çalınan büyülü kristaller kullanıyor.\nRakun geceleri ormandan gizlice geçerek kabilesini kurtarır.\nYaşlılar ona karanlıkta yol bulması için aletler verir.',
  it: 'Luci scintillanti appaiono nel profondo del Bosco delle Lanterne—pattuglie di lupi che usano cristalli incantati rubati ai Gufi.\nIl procione libera la tribù sgattaiolando nella foresta di notte.\nGli anziani lo ricompensano con strumenti per navigare nell\'oscurità.',
  th: 'แสงระยิบระยับปรากฏในส่วนลึกของป่าโคมไฟ—หมาป่าลาดตระเวนใช้คริสตัลมนต์ขลังที่ขโมยมาจากนกฮูก\nแรคคูนปลดปล่อยเผ่าพันธุ์ด้วยการแอบผ่านป่าในเวลากลางคืน\nผู้อาวุโสให้รางวัลเขาด้วยเครื่องมือในการนำทางในความมืด',
  pl: 'W głębi Lasu Latarni pojawiają się migoczące światła—wilcze patrole używają zaczarowanych kryształów skradzionych Sowom.\nSzop uwalnia plemię, przemykając przez las w nocy.\nStarszyzna nagradza go narzędziami do nawigacji w ciemności.',
  id: 'Cahaya berkilauan muncul jauh di dalam Hutan Lentera—patroli serigala menggunakan kristal terpesona yang dicuri dari Burung Hantu.\nRakun membebaskan suku dengan menyelinap melalui hutan di malam hari.\nTetua memberinya hadiah berupa alat untuk bernavigasi dalam kegelapan.',
  nl: 'Glinsterende lichten verschijnen diep in het Lantaarnbos—wolvenpatrouilles gebruiken betoverde kristallen gestolen van de Uilen.\nDe wasbeer bevrijdt de stam door \'s nachts door het bos te sluipen.\nDe oudsten belonen hem met gereedschap om in het donker te navigeren.',
  cs: 'V hlubinách Lampového lesa se objevují třpytivá světla—vlčí hlídky používají zakleté krystaly ukradené Sovám.\nMýval osvobodí kmen tím, že se v noci proplíží lesem.\nStarší ho odměňují nástroji pro navigaci ve tmě.',
  el: 'Αστραφτερά φώτα εμφανίζονται βαθιά στο Δάσος των Φαναριών—περίπολοι λύκων χρησιμοποιούν μαγεμένους κρυστάλλους κλεμμένους από τις Κουκουβάγιες.\nΟ ρακούν ελευθερώνει τη φυλή διαφεύγοντας μέσα από το δάσος τη νύχτα.\nΟι πρεσβύτεροι τον ανταμείβουν με εργαλεία για να πλοηγηθεί στο σκοτάδι.',
  hu: 'Csillogó fények jelennek meg a Lámpás-erdő mélyén—farkas járőrök elvarázsolt kristályokat használnak, amelyeket a Baglyoktól loptak.\nA mosómedve éjszaka besurran az erdőbe és kiszabadítja a törzsét.\nA vének eszközökkel jutalmazzák, hogy eligazodjon a sötétben.',
  sv: 'Glittrande ljus dyker upp djupt i Lyktskogsn—vargpatrulller använder förtrollade kristaller stulna från Uggorna.\nTvättbjörnen befriar stammen genom att smyga genom skogen på natten.\nDe äldste belönar honom med verktyg för att navigera i mörkret.',
  da: 'Skinnende lys dukker op dybt i Lanterne Skoven—ulvepatruljer bruger fortryllede krystaller stjålet fra Uglerne.\nVaskebjørnen befrier stammen ved at snige sig gennem skoven om natten.\nDe ældste belønner ham med værktøj til at navigere i mørket.',
  fi: 'Hohtavia valoja ilmestyy syvällä Lyhtymetässä—susien partiot käyttävät lumottuja kristalleja, jotka on varastettu Pöllöiltä.\nPesukarhu vapauttaa heimon hiipimällä metsän läpi yöllä.\nVanhimmat palkitsevat hänet työkaluilla pimeässä navigointiin.',
  no: 'Glitrende lys dukker opp dypt i Lykteskogen—ulvepatruller bruker fortryllede krystaller stjålet fra Uglene.\nVaskebjørnen frigjør stammen ved å snike seg gjennom skogen om natten.\nDe eldste belønner ham med verktøy for å navigere i mørket.'
};

// 📖 История Level 4 - Mossroot (все 26 языков)
const LEVEL_4_STORY = {
  en: 'Wolves build a blockade across Mossroot. The raccoon leads the villagers through hidden vine bridges and sabotages the blockade\'s ropes.\nIn gratitude, the Mossroot tailor gives him a guardian gift.',
  'zh-Hans': '狼群在苔根建立了封锁线。浣熊带领村民通过隐藏的藤桥，并破坏了封锁线的绳索。\n苔根的裁缝感激地送给他一件守护者礼物。',
  hi: 'भेड़िये मॉसरूट पर नाकाबंदी बनाते हैं। रैकून गांव वालों को छिपे हुए बेल के पुलों से ले जाता है और नाकाबंदी की रस्सियों को तोड़ देता है।\nकृतज्ञता में, मॉसरूट दर्जी उसे एक संरक्षक उपहार देता है।',
  es: 'Los lobos construyen un bloqueo en Mossroot. El mapache guía a los aldeanos por puentes de enredaderas ocultos y sabotea las cuerdas del bloqueo.\nEn gratitud, el sastre de Mossroot le da un regalo guardián.',
  ar: 'يبني الذئاب حاجزاً عبر موسروت. يقود الراكون القرويين عبر جسور كروم مخفية ويخرب حبال الحاجز.\nامتناناً، يعطيه خياط موسروت هدية وصي.',
  pt: 'Lobos constroem um bloqueio em Mossroot. O guaxinim guia os aldeões por pontes de vinhas escondidas e sabota as cordas do bloqueio.\nEm gratidão, o alfaiate de Mossroot lhe dá um presente guardião.',
  ru: 'Волки строят блокаду через Моховой корень. Енот проводит жителей через скрытые мосты из лиан и саботирует веревки блокады.\nВ благодарность портной Мохового корня дарит ему подарок хранителя.',
  kk: 'Қасқырлар Мүкті тамыр арқылы бөгет тұрғызады. Енот ауыл тұрғындарын жасырын жүзім көпірлері арқылы алып өтіп, бөгеттің арқандарын бұзады.\nРахметтілік ретінде, Мүкті тамырдың тігіншісі оған қорғаушы сыйлық береді.',
  ja: 'モスルートに狼たちが封鎖線を築く。アライグマは隠された蔦の橋を通って村人たちを導き、封鎖線のロープを破壊する。\n感謝の印として、モスルートの仕立て屋が守護者の贈り物を与える。',
  fr: 'Les loups construisent un blocus à travers Mossroot. Le raton laveur guide les villageois par des ponts de lianes cachés et sabote les cordes du blocus.\nEn guise de gratitude, le tailleur de Mossroot lui offre un cadeau de gardien.',
  de: 'Wölfe errichten eine Blockade über Mossroot. Der Waschbär führt die Dorfbewohner über versteckte Rankenbrücken und sabotiert die Seile der Blockade.\nAus Dankbarkeit gibt ihm der Schneider von Mossroot ein Wächtergeschenk.',
  ko: '늑대들이 모스루트를 가로질러 봉쇄선을 건설한다. 너구리는 마을 사람들을 숨겨진 덩굴 다리로 인도하고 봉쇄선의 밧줄을 파괴한다.\n감사의 표시로, 모스루트의 재단사가 그에게 수호자 선물을 준다.',
  vi: 'Bầy sói xây dựng hàng rào chắn qua Mossroot. Chú gấu trúc dẫn dân làng qua những cây cầu dây leo ẩn và phá hoại dây thừng của hàng rào.\nĐể tỏ lòng biết ơn, thợ may Mossroot tặng chú một món quà người bảo vệ.',
  tr: 'Kurtlar Mossroot\'a bir barikat kurar. Rakun köylüleri gizli asma köprülerden geçirir ve barikatın iplerini sabote eder.\nMinnettar olarak, Mossroot terzisi ona bir koruyucu hediye verir.',
  it: 'I lupi costruiscono un blocco attraverso Mossroot. Il procione guida i paesani attraverso ponti di vite nascosti e sabota le corde del blocco.\nIn segno di gratitudine, il sarto di Mossroot gli dona un regalo guardiano.',
  th: 'หมาป่าสร้างแนวกีดขวางผ่านมอสรูท แรคคูนนำชาวบ้านผ่านสะพานเถาวัลย์ที่ซ่อนอยู่และทำลายเชือกของแนวกีดขวาง\nด้วยความขอบคุณ ช่างตัดเสื้อมอสรูทมอบของขวัญผู้พิทักษ์ให้เขา',
  pl: 'Wilki budują blokadę przez Mossroot. Szop prowadzi mieszkańców przez ukryte mosty z pnączy i sabotuje liny blokady.\nW podziękowaniu krawiec z Mossroot daje mu dar strażnika.',
  id: 'Serigala membangun blokade melintasi Mossroot. Rakun memimpin penduduk desa melalui jembatan sulur tersembunyi dan mensabotase tali blokade.\nSebagai ucapan terima kasih, penjahit Mossroot memberinya hadiah penjaga.',
  nl: 'Wolven bouwen een blokkade over Mossroot. De wasbeer leidt de dorpelingen via verborgen wijnstokbruggen en saboteert de touwen van de blokkade.\nUit dankbaarheid geeft de kleermaker van Mossroot hem een beschermersgeschenk.',
  cs: 'Vlci postaví blokádu přes Mossroot. Mýval vede vesničany přes skryté mosty z liány a sabotuje provazy blokády.\nZ vděčnosti mu krejčí z Mossrootu dává dárek strážce.',
  el: 'Οι λύκοι χτίζουν έναν αποκλεισμό στο Mossroot. Ο ρακούν οδηγεί τους χωρικούς μέσω κρυφών γεφυρών από κληματαριές και σαμποτάρει τα σχοινιά του αποκλεισμού.\nΣε ένδειξη ευγνωμοσύνης, ο ράφτης του Mossroot του δίνει ένα δώρο φύλακα.',
  hu: 'Farkasok blokádot építenek Mossroot felé. A mosómedve rejtett indahidakon vezeti át a falubelieket és szabotálja a blokád köteleit.\nHálából a Mossroot szabója őrzőajándékot ad neki.',
  sv: 'Vargar bygger en blockad över Mossroot. Tvättbjörnen leder byborna genom dolda vinbroar och saboterar blockaden rep.\nI tacksamhet ger skräddaren i Mossroot honom en väktargåva.',
  da: 'Ulve bygger en blokade over Mossroot. Vaskebjørnen fører landsbyboerne gennem skjulte vinrankebroer og saboterer blokadens reb.\nI taknemmelighed giver skrædderen fra Mossroot ham en vogter gave.',
  fi: 'Sudet rakentavat saartorenkaan Mossrootin yli. Pesukarhu johdattaa kyläläiset piilossa olevien köynnössiltojen kautta ja sabotoi saartorenkaan köydet.\nKiitollisuutena Mossrootin räätäli antaa hänelle suojelijan lahjan.',
  no: 'Ulver bygger en blokade over Mossroot. Vaskebjørnen leder landsbyboerne gjennom skjulte vinstokk-broer og saboterer blokaden tau.\nI takknemlighet gir skredderen fra Mossroot ham en vokter gave.'
};

// 📖 История Level 5 - Silverbrook (все 26 языков)
const LEVEL_5_STORY = {
  en: 'Silverbrook is covered in a strange fog. Wolves patrol silently—too silently.\nThe raccoon discovers ancient runes and, with help from owl scholars, learns to dispel illusions.\nIt becomes clear: the wolves aren\'t acting alone.',
  'zh-Hans': '银溪被奇怪的雾气笼罩。狼群静静地巡逻——太安静了。\n浣熊发现了古老的符文，在猫头鹰学者的帮助下学会了驱散幻象。\n真相浮现：狼群并非独自行动。',
  hi: 'सिल्वरब्रुक एक अजीब कोहरे से ढका है। भेड़िये चुपचाप गश्त करते हैं—बहुत चुपचाप।\nरैकून प्राचीन रून्स की खोज करता है और उल्लू विद्वानों की मदद से भ्रम दूर करना सीखता है।\nयह स्पष्ट हो जाता है: भेड़िये अकेले कार्य नहीं कर रहे हैं।',
  es: 'Silverbrook está cubierto por una niebla extraña. Los lobos patrullan en silencio—demasiado silencio.\nEl mapache descubre runas antiguas y, con ayuda de eruditos búhos, aprende a disipar ilusiones.\nQueda claro: los lobos no actúan solos.',
  ar: 'سيلفربروك مغطى بضباب غريب. تدورية الذئاب بصمت—صمت شديد.\nيكتشف الراكون رونات قديمة، وبمساعدة علماء البوم، يتعلم كيفية تبديد الأوهام.\nيصبح واضحاً: الذئاب لا تتصرف بمفردها.',
  pt: 'Silverbrook está coberto por uma névoa estranha. Lobos patrulham silenciosamente—silenciosamente demais.\nO guaxinim descobre runas antigas e, com ajuda de estudiosos corujas, aprende a dissipar ilusões.\nFica claro: os lobos não estão agindo sozinhos.',
  ru: 'Серебряный ручей покрыт странным туманом. Волки патрулируют молча—слишком молча.\nЕнот обнаруживает древние руны и с помощью учёных-сов учится рассеивать иллюзии.\nСтановится ясно: волки действуют не одни.',
  kk: 'Күміс бұлақ таңғажайып тұманмен жабылған. Қасқырлар үнсіз күзет жүргізеді—тым үнсіз.\nЕнот ежелгі рундарды табады және үкі ғалымдарының көмегімен иллюзияларды жою әдісін үйренеді.\nАнық болады: қасқырлар жалғыз әрекет етпейді.',
  ja: 'シルバーブルックは奇妙な霧に覆われている。狼たちは静かに巡回している—あまりにも静かに。\nアライグマは古代のルーン文字を発見し、フクロウの学者の助けを借りて幻影を打ち消すことを学ぶ。\n明らかになる：狼たちは単独で行動していない。',
  fr: 'Silverbrook est couvert d\'un étrange brouillard. Les loups patrouillent silencieusement—trop silencieusement.\nLe raton laveur découvre d\'anciennes runes et, avec l\'aide d\'érudits hiboux, apprend à dissiper les illusions.\nCela devient clair : les loups n\'agissent pas seuls.',
  de: 'Silverbrook ist von einem seltsamen Nebel bedeckt. Wölfe patrouillieren lautlos—zu lautlos.\nDer Waschbär entdeckt alte Runen und lernt mit Hilfe von Eulengelehrten, Illusionen zu zerstreuen.\nEs wird klar: Die Wölfe handeln nicht allein.',
  ko: '실버브룩이 이상한 안개로 뒤덮여 있다. 늑대들이 조용히 순찰한다—너무 조용하게.\n너구리는 고대 룬 문자를 발견하고 올빼미 학자들의 도움으로 환상을 없애는 법을 배운다.\n분명해진다: 늑대들은 혼자 행동하는 것이 아니다.',
  vi: 'Silverbrook được bao phủ bởi một làn sương kỳ lạ. Bầy sói tuần tra trong im lặng—quá im lặng.\nChú gấu trúc phát hiện các ký tự rune cổ đại và với sự giúp đỡ của các học giả cú mèo, học cách xua tan ảo ảnh.\nRõ ràng là: bầy sói không hành động một mình.',
  tr: 'Silverbrook garip bir sisle kaplı. Kurtlar sessizce devriye geziyor—fazla sessiz.\nRakun eski runları keşfeder ve baykuş bilginlerinin yardımıyla yanılsamaları dağıtmayı öğrenir.\nBelli oluyor: kurtlar yalnız hareket etmiyor.',
  it: 'Silverbrook è coperta da una strana nebbia. I lupi pattugliano silenziosamente—troppo silenziosamente.\nIl procione scopre rune antiche e, con l\'aiuto di studiosi gufi, impara a dissipare le illusioni.\nDiventa chiaro: i lupi non agiscono da soli.',
  th: 'ซิลเวอร์บรูคถูกปกคลุมด้วยหมอกแปลก ๆ หมาป่าลาดตระเวนอย่างเงียบ ๆ—เงียบเกินไป\nแรคคูนค้นพบรูนโบราณและด้วยความช่วยเหลือจากนักวิชาการนกฮูก เรียนรู้ที่จะขจัดภาพลวงตา\nชัดเจนขึ้น: หมาป่าไม่ได้ทำคนเดียว',
  pl: 'Silverbrook jest pokryte dziwną mgłą. Wilki patrolują po cichu—zbyt cicho.\nSzop odkrywa starożytne runy i z pomocą sowych uczonych uczy się rozpraszać iluzje.\nStaje się jasne: wilki nie działają same.',
  id: 'Silverbrook tertutup kabut aneh. Serigala berpatroli dengan diam—terlalu diam.\nRakun menemukan rune kuno dan dengan bantuan cendekiawan burung hantu, belajar menghilangkan ilusi.\nMenjadi jelas: serigala tidak bertindak sendiri.',
  nl: 'Silverbrook is bedekt met een vreemde mist. Wolven patrouilleren stil—te stil.\nDe wasbeer ontdekt oude runen en leert, met hulp van uilen geleerden, om illusies te verdrijven.\nHet wordt duidelijk: de wolven handelen niet alleen.',
  cs: 'Silverbrook je pokryt podivnou mlhou. Vlci hlídkují tiše—příliš tiše.\nMýval objeví staré runy a s pomocí sovích učenců se naučí rozptylovat iluze.\nStává se jasným: vlci nejednají sami.',
  el: 'Το Silverbrook είναι καλυμμένο με μια παράξενη ομίχλη. Οι λύκοι περιπολούν αθόρυβα—πολύ αθόρυβα.\nΟ ρακούν ανακαλύπτει αρχαίους ρούνους και, με τη βοήθεια μελετητών κουκουβαγιών, μαθαίνει να διαλύει τις ψευδαισθήσεις.\nΓίνεται σαφές: οι λύκοι δεν ενεργούν μόνοι τους.',
  hu: 'Silverbrookot furcsa köd borítja. Farkasok csendben járőröznek—túl csendben.\nA mosómedve ősi rúnákat fedez fel, és bagolytudósok segítségével megtanulja eloszlatni az illúziókat.\nEgyértelművé válik: a farkasok nem egyedül cselekednek.',
  sv: 'Silverbrook är täckt av en konstig dimma. Vargar patrullerar tyst—för tyst.\nTvättbjörnen upptäcker forntida runor och lär sig, med hjälp av uggelärda, att skingra illusioner.\nDet blir tydligt: vargarna agerar inte ensamma.',
  da: 'Silverbrook er dækket af en mærkelig tåge. Ulve patruljerer stille—for stille.\nVaskebjørnen opdager gamle runer og lærer med hjælp fra ugle lærde at fordrive illusioner.\nDet bliver klart: ulvene handler ikke alene.',
  fi: 'Silverbrookin peittää outo sumu. Sudet partioivat hiljaa—liian hiljaa.\nPesukarhu löytää muinaisia riimuja ja oppii pöllöoppineiden avulla hälventämään illuusioita.\nKäy selväksi: sudet eivät toimi yksin.',
  no: 'Silverbrook er dekket av en merkelig tåke. Ulver patruljerer stille—for stille.\nVaskebjørnen oppdager eldgamle runer og lærer, med hjelp fra ugle lærde, å fjerne illusjoner.\nDet blir klart: ulvene handler ikke alene.'
};

// 📖 История Level 6 - Clifffall Fortress (все 26 языков)
const LEVEL_6_STORY = {
  en: 'Clifffall Fortress has become a wolf research lab.\nInside, the raccoon finds wolf commanders studying forbidden Eclipse artifacts.\nAfter defeating their influence, he absorbs ancient energy, transforming into Super Raccoon.\nHe realizes: the wolves are being manipulated by something bigger.',
  'zh-Hans': '悬崖堡垒已成为狼群的研究实验室。\n在里面，浣熊发现狼群指挥官正在研究被禁的日食神器。\n在击败他们的影响后，他吸收了古老的能量，变身为超级浣熊。\n他意识到：狼群被更大的力量操控着。',
  hi: 'क्लिफफॉल फोर्ट्रेस भेड़ियों की अनुसंधान प्रयोगशाला बन गई है।\nअंदर, रैकून भेड़िया कमांडरों को निषिद्ध ग्रहण कलाकृतियों का अध्ययन करते हुए पाता है।\nउनके प्रभाव को हराने के बाद, वह प्राचीन ऊर्जा को अवशोषित करता है और सुपर रैकून में बदल जाता है।\nउसे एहसास होता है: भेड़ियों को किसी बड़ी चीज़ द्वारा हेरफेर किया जा रहा है।',
  es: 'La Fortaleza de Clifffall se ha convertido en un laboratorio de investigación de lobos.\nDentro, el mapache encuentra comandantes lobos estudiando artefactos Eclipse prohibidos.\nDespués de derrotar su influencia, absorbe energía antigua, transformándose en Súper Mapache.\nSe da cuenta: los lobos están siendo manipulados por algo más grande.',
  ar: 'أصبحت قلعة كليففال مختبر أبحاث للذئاب.\nفي الداخل، يجد الراكون قادة الذئاب يدرسون قطع أثرية محظورة من الكسوف.\nبعد هزيمة تأثيرهم، يمتص طاقة قديمة، ويتحول إلى راكون خارق.\nيدرك: الذئاب يتم التلاعب بها من قبل شيء أكبر.',
  pt: 'A Fortaleza de Clifffall se tornou um laboratório de pesquisa de lobos.\nDentro, o guaxinim encontra comandantes lobos estudando artefatos Eclipse proibidos.\nDepois de derrotar sua influência, ele absorve energia antiga, transformando-se em Super Guaxinim.\nEle percebe: os lobos estão sendo manipulados por algo maior.',
  ru: 'Крепость Скалопада стала волчьей исследовательской лабораторией.\nВнутри енот находит волчьих командиров, изучающих запретные артефакты Затмения.\nПосле победы над их влиянием он поглощает древнюю энергию, превращаясь в Супер-енота.\nОн понимает: волками манипулирует нечто большее.',
  kk: 'Жартас қамалы қасқырлардың зерттеу зертханасына айналды.\nІште енот қасқыр қолбасшыларының тыйым салынған Тұтылу жәдігерлерін зерттеп жатқанын табады.\nОлардың әсерін жеңгеннен кейін, ол ежелгі энергияны сіңіреді және Супер Енотқа айналады.\nОл түсінеді: қасқырларды үлкен күш басқарып жатыр.',
  ja: 'クリフフォール要塞は狼の研究施設となった。\n内部でアライグマは、禁じられたエクリプスの遺物を研究する狼の指揮官たちを発見する。\n彼らの影響を打ち破った後、古代のエネルギーを吸収し、スーパーアライグマに変身する。\n彼は気づく：狼たちはより大きな何かに操られている。',
  fr: 'La Forteresse de Clifffall est devenue un laboratoire de recherche des loups.\nÀ l\'intérieur, le raton laveur trouve des commandants loups étudiant des artefacts Eclipse interdits.\nAprès avoir vaincu leur influence, il absorbe une énergie ancienne, se transformant en Super Raton Laveur.\nIl réalise : les loups sont manipulés par quelque chose de plus grand.',
  de: 'Die Klippenfestung ist zu einem Wolfsforschungslabor geworden.\nDrinnen findet der Waschbär Wolfskommandanten, die verbotene Eclipse-Artefakte studieren.\nNachdem er ihren Einfluss besiegt hat, absorbiert er alte Energie und verwandelt sich in Super-Waschbär.\nEr erkennt: Die Wölfe werden von etwas Größerem manipuliert.',
  ko: '클리프폴 요새가 늑대 연구소가 되었다.\n안에서 너구리는 금지된 이클립스 유물을 연구하는 늑대 사령관들을 발견한다.\n그들의 영향을 물리친 후, 그는 고대 에너지를 흡수하여 슈퍼 너구리로 변신한다.\n그는 깨닫는다: 늑대들은 더 큰 무언가에 의해 조종당하고 있다.',
  vi: 'Pháo đài Clifffall đã trở thành phòng thí nghiệm nghiên cứu của sói.\nBên trong, chú gấu trúc tìm thấy các chỉ huy sói đang nghiên cứu các hiện vật Nhật thực bị cấm.\nSau khi đánh bại ảnh hưởng của họ, chú hấp thụ năng lượng cổ đại, biến thành Siêu Gấu Trúc.\nChú nhận ra: bầy sói đang bị thao túng bởi thứ gì đó lớn hơn.',
  tr: 'Clifffall Kalesi kurt araştırma laboratuvarına dönüşmüş.\nİçeride, rakun yasak Tutulma eserlerini inceleyen kurt komutanlarını bulur.\nEtkilerini yendikten sonra, eski enerjiyi emer ve Süper Rakuna dönüşür.\nFarkına varır: kurtlar daha büyük bir şey tarafından manipüle ediliyor.',
  it: 'La Fortezza di Clifffall è diventata un laboratorio di ricerca dei lupi.\nAll\'interno, il procione trova comandanti lupi che studiano artefatti Eclipse proibiti.\nDopo aver sconfitto la loro influenza, assorbe energia antica, trasformandosi in Super Procione.\nCapisce: i lupi sono manipolati da qualcosa di più grande.',
  th: 'ป้อมคลิฟฟอลล์กลายเป็นห้องปฏิบัติการวิจัยของหมาป่า\nข้างใน แรคคูนพบผู้บัญชาการหมาป่ากำลังศึกษาสิ่งประดิษฐ์อีคลิปส์ต้องห้าม\nหลังจากเอาชนะอิทธิพลของพวกเขา เขาดูดซับพลังงานโบราณ เปลี่ยนร่างเป็นซูเปอร์แรคคูน\nเขาตระหนักได้: หมาป่าถูกควบคุมโดยสิ่งที่ใหญ่กว่า',
  pl: 'Twierdza Clifffall stała się laboratorium badawczym wilków.\nW środku szop znajduje wilczych dowódców badających zakazane artefakty Zaćmienia.\nPo pokonaniu ich wpływu pochłania starożytną energię, zamieniając się w Super Szopa.\nZdaje sobie sprawę: wilki są manipulowane przez coś większego.',
  id: 'Benteng Clifffall telah menjadi laboratorium penelitian serigala.\nDi dalam, rakun menemukan komandan serigala mempelajari artefak Eclipse terlarang.\nSetelah mengalahkan pengaruh mereka, ia menyerap energi kuno, berubah menjadi Rakun Super.\nIa menyadari: serigala dimanipulasi oleh sesuatu yang lebih besar.',
  nl: 'Clifffall Fortress is een wolvenonderzoekslaboratorium geworden.\nBinnen vindt de wasbeer wolvencommandanten die verboden Eclipse-artefacten bestuderen.\nNa hun invloed te hebben verslagen, absorbeert hij oude energie en transformeert in Super Wasbeer.\nHij beseft: de wolven worden gemanipuleerd door iets groters.',
  cs: 'Pevnost Clifffall se stala vlčím výzkumným laboratoří.\nVevnitř mýval najde vlčí velitele studující zakázané artefakty Zatmění.\nPo porážce jejich vlivu absorbuje starobylou energii a proměňuje se v Super Mývala.\nUvědomuje si: vlci jsou manipulováni něčím větším.',
  el: 'Το Φρούριο Clifffall έχει γίνει εργαστήριο έρευνας λύκων.\nΜέσα, ο ρακούν βρίσκει διοικητές λύκων που μελετούν απαγορευμένα αντικείμενα Έκλειψης.\nΑφού νικήσει την επιρροή τους, απορροφά αρχαία ενέργεια, μεταμορφούμενος σε Σούπερ Ρακούν.\nΣυνειδητοποιεί: οι λύκοι χειραγωγούνται από κάτι μεγαλύτερο.',
  hu: 'A Clifffall Erőd farkaskutatási laboratóriummá vált.\nBent a mosómedve farkasparancsnokokat talál, akik tiltott Eclipse műtárgyakat tanulmányoznak.\nMiután legyőzte befolyásukat, elnyeli az ősi energiát, Szuper Mosómedvévé változva.\nRádöbben: a farkasokat valami nagyobb manipulálja.',
  sv: 'Clifffall Fästning har blivit ett vargforskningslabb.\nInne hittar tvättbjörnen vargbefälhavare som studerar förbjudna Eclipse-artefakter.\nEfter att ha besegrat deras inflytande absorberar han forntida energi och förvandlas till Super Tvättbjörn.\nHan inser: vargarna manipuleras av något större.',
  da: 'Clifffall Fæstning er blevet et ulve forskningslaboratorium.\nInde finder vaskebjørnen ulve kommandanter, der studerer forbudte Eclipse artefakter.\nEfter at have besejret deres indflydelse absorberer han gammel energi og forvandler sig til Super Vaskebjørn.\nHan indser: ulvene bliver manipuleret af noget større.',
  fi: 'Clifffall Linnoituksesta on tullut susienlaboratorio.\nSisällä pesukarhu löytää susikomentajia tutkimassa kiellettyjä Pimennyksen esineitä.\nVoitettuaan heidän vaikutuksensa hän imee muinaista energiaa muuttuen Super Pesukarhuksi.\nHän tajuaa: susia manipuloi jokin suurempi.',
  no: 'Clifffall Festning har blitt et ulve forskningslaboratorium.\nInne finner vaskebjørnen ulve kommandanter som studerer forbudte Eclipse gjenstander.\nEtter å ha beseiret deres innflytelse absorberer han eldgammel energi og forvandler seg til Super Vaskebjørn.\nHan innser: ulvene blir manipulert av noe større.'
};

// 📖 История Level 7 - Underroot (все 26 языков)
const LEVEL_7_STORY = {
  en: 'Wolves try to collapse the Underroot tunnels to control underground routes.\nThe raccoon navigates the labyrinth, saving trapped families and learning forgotten burrow magic.\nHe receives a relic of old raccoon guardians.',
  'zh-Hans': '狼群试图摧毁地下根系隧道以控制地下通道。\n浣熊穿越迷宫，拯救被困的家庭，并学习被遗忘的洞穴魔法。\n他获得了古老浣熊守护者的遗物。',
  hi: 'भेड़िये भूमिगत मार्गों को नियंत्रित करने के लिए अंडररूट सुरंगों को ध्वस्त करने की कोशिश करते हैं।\nरैकून भूलभुलैया से गुजरता है, फंसे परिवारों को बचाता है और भूली हुई बिल जादू सीखता है।\nवह पुराने रैकून संरक्षकों का एक अवशेष प्राप्त करता है।',
  es: 'Los lobos intentan colapsar los túneles de Underroot para controlar las rutas subterráneas.\nEl mapache navega por el laberinto, salvando familias atrapadas y aprendiendo magia de madriguera olvidada.\nRecibe una reliquia de los antiguos guardianes mapaches.',
  ar: 'تحاول الذئاب انهيار أنفاق أندررووت للسيطرة على المسارات تحت الأرض.\nيبحر الراكون في المتاهة، منقذاً العائلات المحاصرة ومتعلماً سحر الجحور المنسي.\nيتلقى أثراً من حراس الراكون القدامى.',
  pt: 'Lobos tentam colapsar os túneis de Underroot para controlar rotas subterrâneas.\nO guaxinim navega pelo labirinto, salvando famílias presas e aprendendo magia de toca esquecida.\nEle recebe uma relíquia dos antigos guardiões guaxinins.',
  ru: 'Волки пытаются обрушить туннели Подкорня, чтобы контролировать подземные маршруты.\nЕнот проходит через лабиринт, спасая застрявшие семьи и изучая забытую норную магию.\nОн получает реликвию старых енотов-хранителей.',
  kk: 'Қасқырлар жер асты жолдарын бақылау үшін Жер асты туннельдерін құлатуға тырысады.\nЕнот лабиринт арқылы өтіп, ұстап қалған отбасыларды құтқарады және ұмытылған ін сиқырын үйренеді.\nОл ескі енот қорғаушыларының жәдігерін алады.',
  ja: 'アンダールートのトンネルを崩壊させ、地下ルートを支配しようとする狼たち。\nアライグマは迷宮を進み、閉じ込められた家族を救い、忘れられた穴の魔法を学ぶ。\n彼は古いアライグマの守護者の遺物を受け取る。',
  fr: 'Les loups tentent de faire s\'effondrer les tunnels d\'Underroot pour contrôler les routes souterraines.\nLe raton laveur navigue dans le labyrinthe, sauvant des familles piégées et apprenant une magie de terrier oubliée.\nIl reçoit une relique des anciens gardiens ratons laveurs.',
  de: 'Wölfe versuchen, die Underroot-Tunnel einzustürzen, um unterirdische Routen zu kontrollieren.\nDer Waschbär navigiert durch das Labyrinth, rettet eingeschlossene Familien und lernt vergessene Bauzauber.\nEr erhält ein Relikt der alten Waschbär-Wächter.',
  ko: '늑대들이 지하 경로를 통제하기 위해 언더루트 터널을 무너뜨리려 한다.\n너구리는 미로를 탐색하며 갇힌 가족들을 구하고 잊혀진 굴 마법을 배운다.\n그는 옛 너구리 수호자들의 유물을 받는다.',
  vi: 'Bầy sói cố gắng làm sụp đổ các đường hầm Underroot để kiểm soát các tuyến đường ngầm.\nChú gấu trúc điều hướng qua mê cung, cứu các gia đình bị mắc kẹt và học phép thuật hang động bị lãng quên.\nChú nhận được di vật của những người bảo vệ gấu trúc cổ đại.',
  tr: 'Kurtlar yeraltı yollarını kontrol etmek için Underroot tünellerini çökertmeye çalışır.\nRakun labirentte yol alır, mahsur kalan aileleri kurtarır ve unutulmuş in büyüsünü öğrenir.\nEski rakun koruyucularının bir kalıntısını alır.',
  it: 'I lupi cercano di far crollare i tunnel di Underroot per controllare le rotte sotterranee.\nIl procione naviga nel labirinto, salvando famiglie intrappolate e imparando magia di tana dimenticata.\nRiceve una reliquia degli antichi guardiani procioni.',
  th: 'หมาป่าพยายามทำให้อุโมงค์อันเดอร์รูทถล่มเพื่อควบคุมเส้นทางใต้ดิน\nแรคคูนนำทางผ่านเขาวงกต ช่วยเหลือครอบครัวที่ติดอยู่และเรียนรู้เวทมนตร์โพรงที่ถูกลืม\nเขาได้รับของมีค่าของผู้พิทักษ์แรคคูนโบราณ',
  pl: 'Wilki próbują zawalić tunele Underroot, by kontrolować podziemne trasy.\nSzop przemierza labirynt, ratując uwięzione rodziny i ucząc się zapomnianej magii nor.\nOtrzymuje relikt starych szopowych strażników.',
  id: 'Serigala mencoba meruntuhkan terowongan Underroot untuk mengendalikan rute bawah tanah.\nRakun menavigasi labirin, menyelamatkan keluarga yang terjebak dan mempelajari sihir liang yang terlupakan.\nIa menerima peninggalan penjaga rakun kuno.',
  nl: 'Wolven proberen de Underroot-tunnels in te storten om ondergrondse routes te controleren.\nDe wasbeer navigeert door het labyrint, redt ingesloten gezinnen en leert vergeten holtemagie.\nHij ontvangt een relikwie van oude wasbeer beschermers.',
  cs: 'Vlci se snaží zhroutit tunely Underroot, aby kontrolovali podzemní trasy.\nMýval se pohybuje labyrintem, zachraňuje uvězněné rodiny a učí se zapomenuté magii nor.\nObdrží relikvii starých mývalích strážců.',
  el: 'Οι λύκοι προσπαθούν να καταρρεύσουν τις σήραγγες Underroot για να ελέγξουν τις υπόγειες διαδρομές.\nΟ ρακούν πλοηγείται στον λαβύρινθο, σώζοντας παγιδευμένες οικογένειες και μαθαίνοντας ξεχασμένη μαγεία φωλιάς.\nΛαμβάνει ένα κειμήλιο των παλιών φυλάκων ρακούν.',
  hu: 'A farkasok megpróbálják összeomlasztani az Underroot alagutakat, hogy irányítsák a föld alatti útvonalakat.\nA mosómedve navigál a labirintusban, megmenti a csapdába esett családokat és megtanulja az elfeledett odúvarázslatot.\nKap egy ereklyét a régi mosómedve őrzőktől.',
  sv: 'Vargar försöker kollapsa Underroot-tunnlarna för att kontrollera underjordiska rutter.\nTvättbjörnen navigerar labyrinten, räddar fångade familjer och lär sig bortglömd grytmagi.\nHan får en relik från gamla tvättbjörns väktare.',
  da: 'Ulve forsøger at få Underroot tunnelerne til at kollapse for at kontrollere underjordiske ruter.\nVaskebjørnen navigerer labyrinten, redder fangede familier og lærer glemt hule magi.\nHan modtager en relik fra gamle vaskebjørn vogtere.',
  fi: 'Sudet yrittävät romahduttaa Underroot-tunnelit hallitakseen maanalaisia reittejä.\nPesukarhu navigoi labyrintissa pelastaen loukussa olevia perheitä ja oppien unohtuneen kolotaikuuden.\nHän saa jäännöksen vanhoilta pesukarhuvartioilta.',
  no: 'Ulver prøver å kollapse Underroot tunnelene for å kontrollere underjordiske ruter.\nVaskebjørnen navigerer labyrinten, redder fastlåste familier og lærer glemt hulemagi.\nHan mottar en relikvie fra gamle vaskebjørn voktere.'
};

// 📖 История Level 8 - Stonevale (все 26 языков)
const LEVEL_8_STORY = {
  en: 'Stonevale looks untouched—but completely empty.\nNo wolves. No villagers. Silence.\nHe discovers shadow trails leading away. A wolf prisoner confesses:\n"We aren\'t the enemy… not anymore. Something else took them."',
  'zh-Hans': '石谷看起来未被触及——但完全空荡荡。\n没有狼群。没有村民。沉默。\n他发现了向外延伸的阴影痕迹。一个狼囚犯坦白：\n"我们不是敌人……不再是了。是别的东西带走了他们。"',
  hi: 'स्टोनवेल अछूता दिखता है—लेकिन पूरी तरह से खाली।\nकोई भेड़िये नहीं। कोई गांव वाले नहीं। सन्नाटा।\nवह छाया के निशान खोजता है जो दूर जाते हैं। एक भेड़िया कैदी कबूल करता है:\n"हम दुश्मन नहीं हैं... अब नहीं। कुछ और उन्हें ले गया।"',
  es: 'Stonevale parece intacto—pero completamente vacío.\nNo hay lobos. No hay aldeanos. Silencio.\nDescubre rastros de sombras que se alejan. Un prisionero lobo confiesa:\n"No somos el enemigo... ya no. Algo más se los llevó."',
  ar: 'يبدو ستونفيل غير متأثر—لكنه فارغ تماماً.\nلا ذئاب. لا قرويين. صمت.\nيكتشف آثار ظل تبتعد. يعترف سجين ذئب:\n"نحن لسنا العدو... لم نعد كذلك. شيء آخر أخذهم."',
  pt: 'Stonevale parece intocado—mas completamente vazio.\nSem lobos. Sem aldeões. Silêncio.\nEle descobre rastros de sombra levando para longe. Um prisioneiro lobo confessa:\n"Não somos o inimigo... não mais. Algo mais os levou."',
  ru: 'Каменная долина выглядит нетронутой—но совершенно пустой.\nНи волков. Ни жителей. Тишина.\nОн обнаруживает теневые следы, ведущие прочь. Волк-пленник признается:\n"Мы не враги… больше нет. Что-то другое забрало их."',
  kk: 'Тас алқапы түспеген сияқты көрінеді—бірақ толықтай бос.\nҚасқырлар жоқ. Ауыл тұрғындары жоқ. Үнсіздік.\nОл көлеңке іздерін табады. Қасқыр тұтқыны мойындайды:\n"Біз жау емеспіз... енді емеспіз. Басқа нәрсе оларды алып кетті."',
  ja: 'ストーンヴェールは無傷に見える—しかし完全に空っぽだ。\n狼もいない。村人もいない。静寂。\n彼は遠ざかる影の跡を発見する。狼の囚人が告白する：\n"我々は敵ではない…もはや違う。何か別のものが彼らを連れ去った。"',
  fr: 'Stonevale semble intact—mais complètement vide.\nPas de loups. Pas de villageois. Silence.\nIl découvre des traces d\'ombre s\'éloignant. Un prisonnier loup avoue :\n"Nous ne sommes pas l\'ennemi... plus maintenant. Quelque chose d\'autre les a pris."',
  de: 'Stonevale sieht unberührt aus—aber völlig leer.\nKeine Wölfe. Keine Dorfbewohner. Stille.\nEr entdeckt Schattenspuren, die wegführen. Ein Wolfsgefangener gesteht:\n"Wir sind nicht der Feind... nicht mehr. Etwas anderes hat sie genommen."',
  ko: '스톤베일은 손대지 않은 것처럼 보인다—하지만 완전히 비어 있다.\n늑대도 없다. 마을 사람도 없다. 침묵.\n그는 멀어지는 그림자 흔적을 발견한다. 늑대 포로가 고백한다:\n"우리는 적이 아니야... 더 이상은. 다른 무언가가 그들을 데려갔어."',
  vi: 'Stonevale trông như nguyên vẹn—nhưng hoàn toàn trống rỗng.\nKhông có sói. Không có dân làng. Im lặng.\nChú phát hiện dấu vết bóng tối dẫn ra xa. Một tù binh sói thú nhận:\n"Chúng tôi không phải kẻ thù... không còn nữa. Thứ gì đó khác đã đưa họ đi."',
  tr: 'Stonevale dokunulmamış görünüyor—ama tamamen boş.\nKurt yok. Köylü yok. Sessizlik.\nUzaklaşan gölge izleri keşfeder. Bir kurt mahkum itiraf eder:\n"Biz düşman değiliz... artık değiliz. Başka bir şey onları aldı."',
  it: 'Stonevale sembra intatto—ma completamente vuoto.\nNessun lupo. Nessun paesano. Silenzio.\nScopre tracce d\'ombra che si allontanano. Un prigioniero lupo confessa:\n"Non siamo il nemico... non più. Qualcos\'altro li ha presi."',
  th: 'สโตนเวลดูไม่ได้รับการแตะต้อง—แต่ว่างเปล่าโดยสิ้นเชิง\nไม่มีหมาป่า ไม่มีชาวบ้าน ความเงียบ\nเขาค้นพบร่องรอยเงามืดที่นำออกไป นักโทษหมาป่าสารภาพ:\n"เราไม่ใช่ศัตรู... ไม่ใช่อีกต่อไป มีบางสิ่งพาพวกเขาไป"',
  pl: 'Stonevale wygląda nietknięte—ale całkowicie puste.\nBrak wilków. Brak mieszkańców. Cisza.\nOdkrywa ślady cienia prowadzące dalej. Wilczy więzień wyznaje:\n"Nie jesteśmy wrogiem... już nie. Coś innego ich zabrało."',
  id: 'Stonevale terlihat tidak tersentuh—tetapi benar-benar kosong.\nTidak ada serigala. Tidak ada penduduk desa. Keheningan.\nIa menemukan jejak bayangan yang menjauh. Seorang tahanan serigala mengaku:\n"Kami bukan musuh... tidak lagi. Sesuatu yang lain membawa mereka."',
  nl: 'Stonevale ziet er onaangetast uit—maar volledig leeg.\nGeen wolven. Geen dorpelingen. Stilte.\nHij ontdekt schaduwsporen die wegleiden. Een wolvengevangene bekent:\n"We zijn niet de vijand... niet meer. Iets anders heeft ze meegenomen."',
  cs: 'Stonevale vypadá nedotčeně—ale úplně prázdně.\nŽádní vlci. Žádní vesničané. Ticho.\nObjeví stopy stínů vedoucí pryč. Vlčí vězeň se přiznává:\n"Nejsme nepřátelé... už ne. Něco jiného je vzalo."',
  el: 'Το Stonevale φαίνεται ανέγγιχτο—αλλά εντελώς άδειο.\nΔεν υπάρχουν λύκοι. Δεν υπάρχουν χωρικοί. Σιωπή.\nΑνακαλύπτει ίχνη σκιάς που απομακρύνονται. Ένας αιχμάλωτος λύκος ομολογεί:\n"Δεν είμαστε ο εχθρός... όχι πια. Κάτι άλλο τους πήρε."',
  hu: 'Stonevale érintetlennek tűnik—de teljesen üres.\nNincsenek farkasok. Nincsenek falusiak. Csend.\nÁrnyéknyomokat fedez fel, amelyek távoznak. Egy farkasfogolyként bevall:\n"Nem vagyunk az ellenség... már nem. Valami más vitte el őket."',
  sv: 'Stonevale ser orörd ut—men helt tom.\nInga vargar. Inga bybor. Tystnad.\nHan upptäcker skuggspår som leder bort. En vargfånge bekänner:\n"Vi är inte fienden... inte längre. Något annat tog dem."',
  da: 'Stonevale ser uberørt ud—men fuldstændig tom.\nIngen ulve. Ingen landsbyboere. Stilhed.\nHan opdager skyggespor, der fører væk. En ulve fange tilstår:\n"Vi er ikke fjenden... ikke længere. Noget andet tog dem."',
  fi: 'Stonevale näyttää koskemattomalta—mutta täysin tyhjältä.\nEi susia. Ei kyläläisiä. Hiljaisuus.\nHän löytää varjojälkiä, jotka johtavat pois. Susivanki tunnustaa:\n"Emme ole vihollinen... emme enää. Joku muu vei heidät."',
  no: 'Stonevale ser urørt ut—men fullstendig tom.\nIngen ulver. Ingen landsbyboere. Stillhet.\nHan oppdager skyggespor som leder bort. En ulve fange bekjenner:\n"Vi er ikke fienden... ikke lenger. Noe annet tok dem."'
};

// 📖 История Level 9 - Skyward Observatory (все 26 языков)
const LEVEL_9_STORY = {
  en: 'At the Skyward Observatory, wolf scholars were studying the sky when the Eclipse energy struck.\nThe raccoon stabilizes the runes and activates the telescope, revealing a fragmented prophecy.\nHe understands his journey is tied to an ancient guardian power.',
  'zh-Hans': '在天穹观测站，狼学者们正在研究天空时，日食能量袭来。\n浣熊稳定符文并激活望远镜，揭示了一个破碎的预言。\n他明白自己的旅程与古老的守护者力量息息相关。',
  hi: 'स्काईवर्ड ऑब्जर्वेटरी में, भेड़िया विद्वान आकाश का अध्ययन कर रहे थे जब ग्रहण ऊर्जा ने हमला किया।\nरैकून रून्स को स्थिर करता है और दूरबीन को सक्रिय करता है, एक टुकड़ी भविष्यवाणी का खुलासा करता है।\nवह समझता है कि उसकी यात्रा एक प्राचीन संरक्षक शक्ति से जुड़ी है।',
  es: 'En el Observatorio Skyward, los eruditos lobos estaban estudiando el cielo cuando la energía del Eclipse los golpeó.\nEl mapache estabiliza las runas y activa el telescopio, revelando una profecía fragmentada.\nComprende que su viaje está vinculado a un antiguo poder guardián.',
  ar: 'في مرصد سكايوارد، كان علماء الذئاب يدرسون السماء عندما ضربت طاقة الكسوف.\nيستقر الراكون الرونات ويفعّل التلسكوب، كاشفاً عن نبوءة مجزأة.\nيفهم أن رحلته مرتبطة بقوة وصي قديمة.',
  pt: 'No Observatório Skyward, estudiosos lobos estavam estudando o céu quando a energia do Eclipse os atingiu.\nO guaxinim estabiliza as runas e ativa o telescópio, revelando uma profecia fragmentada.\nEle entende que sua jornada está ligada a um antigo poder guardião.',
  ru: 'В Небесной обсерватории волки-учёные изучали небо, когда ударила энергия Затмения.\nЕнот стабилизирует руны и активирует телескоп, раскрывая фрагментированное пророчество.\nОн понимает, что его путешествие связано с древней силой хранителя.',
  kk: 'Аспан обсерваториясында қасқыр ғалымдары аспанды зерттеп жатқанда Тұтылу энергиясы соққы берді.\nЕнот рундарды тұрақтандырады және телескопты іске қосып, бөлшектелген болжамды ашады.\nОл өз саяхатының көне қорғаушы күшімен байланысты екенін түсінеді.',
  ja: 'スカイワード天文台で、狼の学者たちが空を研究していた時にエクリプスのエネルギーが襲った。\nアライグマはルーン文字を安定させ望遠鏡を起動し、断片化された予言を明らかにする。\n彼は自分の旅が古代の守護者の力と結びついていることを理解する。',
  fr: 'À l\'Observatoire Skyward, des érudits loups étudiaient le ciel lorsque l\'énergie de l\'Éclipse a frappé.\nLe raton laveur stabilise les runes et active le télescope, révélant une prophétie fragmentée.\nIl comprend que son voyage est lié à un ancien pouvoir gardien.',
  de: 'Am Skyward-Observatorium studierten Wolfsgelehrte den Himmel, als die Eclipse-Energie zuschlug.\nDer Waschbär stabilisiert die Runen und aktiviert das Teleskop, enthüllt eine fragmentierte Prophezeiung.\nEr versteht, dass seine Reise mit einer alten Wächtermacht verbunden ist.',
  ko: '스카이워드 천문대에서 늑대 학자들이 하늘을 연구하던 중 이클립스 에너지가 강타했다.\n너구리는 룬 문자를 안정시키고 망원경을 작동시켜 파편화된 예언을 드러낸다.\n그는 자신의 여정이 고대 수호자의 힘과 연결되어 있음을 이해한다.',
  vi: 'Tại Đài quan sát Skyward, các học giả sói đang nghiên cứu bầu trời khi năng lượng Nhật thực tấn công.\nChú gấu trúc ổn định các ký tự rune và kích hoạt kính viễn vọng, tiết lộ một lời tiên tri phân mảnh.\nChú hiểu rằng hành trình của mình gắn liền với sức mạnh người bảo vệ cổ đại.',
  tr: 'Skyward Gözlemevi\'nde, kurt bilginleri gökyüzünü incelerken Tutulma enerjisi vurdu.\nRakun runları stabilize eder ve teleskopu etkinleştirir, parçalanmış bir kehaneti ortaya çıkarır.\nYolculuğunun eski bir koruyucu güçle bağlantılı olduğunu anlar.',
  it: 'All\'Osservatorio Skyward, studiosi lupi stavano studiando il cielo quando l\'energia dell\'Eclissi colpì.\nIl procione stabilizza le rune e attiva il telescopio, rivelando una profezia frammentata.\nCapisce che il suo viaggio è legato a un antico potere guardiano.',
  th: 'ที่หอดูดาวสกายวาร์ด นักวิชาการหมาป่ากำลังศึกษาท้องฟ้าเมื่อพลังงานอีคลิปส์โจมตี\nแรคคูนทำให้รูนมีเสถียรภาพและเปิดใช้กล้องโทรทรรศน์ เผยให้เห็นคำทำนายที่แยกส่วน\nเขาเข้าใจว่าการเดินทางของเขาเชื่อมโยงกับพลังผู้พิทักษ์โบราณ',
  pl: 'W Obserwatorium Skyward wilczy uczeni badali niebo, gdy uderzyła energia Zaćmienia.\nSzop stabilizuje runy i aktywuje teleskop, odkrywając fragmentaryczną przepowiednię.\nRozumie, że jego podróż jest związana z starożytną mocą strażnika.',
  id: 'Di Observatorium Skyward, para cendekiawan serigala sedang mempelajari langit ketika energi Eclipse menyerang.\nRakun menstabilkan rune dan mengaktifkan teleskop, mengungkapkan ramalan yang terfragmentasi.\nIa memahami perjalanannya terikat dengan kekuatan penjaga kuno.',
  nl: 'Bij het Skyward Observatorium bestudeerden wolvengeleerden de hemel toen de Eclipse-energie toesloeg.\nDe wasbeer stabiliseert de runen en activeert de telescoop, onthullend een gefragmenteerde profetie.\nHij begrijpt dat zijn reis verbonden is met een oude beschermende kracht.',
  cs: 'Na observatoři Skyward vlčí učenci studovali oblohu, když udeřila energie Zatmění.\nMýval stabilizuje runy a aktivuje teleskop, odhalující fragmentované proroctví.\nChápe, že jeho cesta je spojena se starověkou strážní mocí.',
  el: 'Στο Παρατηρητήριο Skyward, λύκοι μελετητές μελετούσαν τον ουρανό όταν χτύπησε η ενέργεια της Έκλειψης.\nΟ ρακούν σταθεροποιεί τους ρούνους και ενεργοποιεί το τηλεσκόπιο, αποκαλύπτοντας μια κατακερματισμένη προφητεία.\nΚαταλαβαίνει ότι το ταξίδι του συνδέεται με μια αρχαία δύναμη φύλακα.',
  hu: 'A Skyward Obszervatóriumban farkastudósok tanulmányozták az eget, amikor az Eclipse energia lecsapott.\nA mosómedve stabilizálja a rúnákat és aktiválja a távcsövet, feltárva egy töredékes próféciát.\nMegérti, hogy utazása egy ősi őrző erőhöz kapcsolódik.',
  sv: 'Vid Skyward Observatoriet studerade varglärdiga himlen när Eclipse-energin slog till.\nTvättbjörnen stabiliserar runorna och aktiverar teleskopet, avslöjande en fragmenterad profetia.\nHan förstår att hans resa är kopplad till en forntida väktarkraft.',
  da: 'Ved Skyward Observatoriet studerede ulve lærde himlen, da Eclipse energien ramte.\nVaskebjørnen stabiliserer runerne og aktiverer teleskopet, afslører en fragmenteret profeti.\nHan forstår, at hans rejse er forbundet med en gammel vogter kraft.',
  fi: 'Skyward-observatoriossa susioppineet tutkivat taivasta, kun Pimennyksen energia iski.\nPesukarhu vakauttaa riimut ja aktivoi kaukoputken paljastaen sirpaloituneen ennustuksen.\nHän ymmärtää, että hänen matkansa liittyy muinaiseen suojelusvoimaan.',
  no: 'Ved Skyward Observatoriet studerte ulve lærde himmelen da Eclipse energien slo til.\nVaskebjørnen stabiliserer runene og aktiverer teleskopet, avslører en fragmentert profeti.\nHan forstår at reisen hans er knyttet til en eldgammel vokter kraft.'
};

// 📖 История Level 10 - Embertrail (все 26 языков)
const LEVEL_10_STORY = {
  en: 'At Embertrail, both wolves and raccoons are attacked by crystalline shadow beasts born from the Eclipse.\nFor the first time, they fight side by side.\nA wolf captain says:\n"If the Eclipse wins, none of us survive."\nDeep in the Frostbite Mountains, the Eclipse awakens. The true war begins.',
  'zh-Hans': '在灰烬之径，狼群和浣熊都遭到由日食诞生的水晶暗影野兽的攻击。\n他们第一次并肩作战。\n一位狼队长说：\n"如果日食获胜，我们谁也活不了。"\n在冰霜山脉深处，日食苏醒了。真正的战争开始了。',
  hi: 'एम्बरट्रेल में, भेड़िये और रैकून दोनों ग्रहण से जन्मे क्रिस्टलीय छाया जानवरों द्वारा हमला किए जाते हैं।\nपहली बार, वे कंधे से कंधा मिलाकर लड़ते हैं।\nएक भेड़िया कप्तान कहता है:\n"अगर ग्रहण जीतता है, तो हम में से कोई भी नहीं बचेगा।"\nफ्रॉस्टबाइट पहाड़ों की गहराई में, ग्रहण जागता है। असली युद्ध शुरू होता है।',
  es: 'En Embertrail, tanto lobos como mapaches son atacados por bestias de sombra cristalina nacidas del Eclipse.\nPor primera vez, luchan codo a codo.\nUn capitán lobo dice:\n"Si el Eclipse gana, ninguno de nosotros sobrevive."\nEn lo profundo de las Montañas Frostbite, el Eclipse despierta. La verdadera guerra comienza.',
  ar: 'في إمبرترايل، يتعرض كل من الذئاب والراكون للهجوم من قبل وحوش الظل البلورية المولودة من الكسوف.\nللمرة الأولى، يقاتلون جنباً إلى جنب.\nيقول قائد ذئب:\n"إذا فاز الكسوف، لن ينجو أي منا."\nفي عمق جبال فروستبايت، يستيقظ الكسوف. تبدأ الحرب الحقيقية.',
  pt: 'Em Embertrail, tanto lobos quanto guaxinins são atacados por bestas de sombra cristalina nascidas do Eclipse.\nPela primeira vez, eles lutam lado a lado.\nUm capitão lobo diz:\n"Se o Eclipse vencer, nenhum de nós sobrevive."\nNas profundezas das Montanhas Frostbite, o Eclipse desperta. A verdadeira guerra começa.',
  ru: 'На Тлеющей тропе и волки, и еноты атакованы кристаллическими теневыми тварями, рождёнными Затмением.\nВпервые они сражаются бок о бок.\nВолчий капитан говорит:\n"Если Затмение победит, никто из нас не выживет."\nВ глубинах Морозных гор Затмение пробуждается. Настоящая война начинается.',
  kk: 'Жанғыр соқпақта қасқырлар да, еноттар да Тұтылудан туған кристалл көлеңке аңдарынан шабуылға ұшырайды.\nАлғаш рет олар қатар-қасында шайқасады.\nҚасқыр капитаны:\n"Егер Тұтылу жеңсе, біздің ешқайсымыз тірі қалмайды."\nАязды таулардың тереңінде Тұтылу оянады. Шынайы соғыс басталады.',
  ja: 'エンバートレイルで、狼とアライグマの両方がエクリプスから生まれた結晶の影獣に襲われる。\n初めて、彼らは肩を並べて戦う。\n狼の隊長が言う：\n"エクリプスが勝てば、誰も生き残れない。"\nフロストバイト山脈の奥深くで、エクリプスが目覚める。真の戦争が始まる。',
  fr: 'À Embertrail, les loups et les ratons laveurs sont tous deux attaqués par des bêtes d\'ombre cristallines nées de l\'Éclipse.\nPour la première fois, ils combattent côte à côte.\nUn capitaine loup dit :\n"Si l\'Éclipse gagne, aucun de nous ne survit."\nAu fond des Montagnes Frostbite, l\'Éclipse s\'éveille. La vraie guerre commence.',
  de: 'In Embertrail werden sowohl Wölfe als auch Waschbären von kristallinen Schattenwesen angegriffen, die aus der Eclipse geboren wurden.\nZum ersten Mal kämpfen sie Seite an Seite.\nEin Wolfshauptmann sagt:\n"Wenn die Eclipse gewinnt, überlebt keiner von uns."\nTief in den Frostbite-Bergen erwacht die Eclipse. Der wahre Krieg beginnt.',
  ko: '엠버트레일에서 늑대와 너구리 모두 이클립스에서 태어난 수정 그림자 야수에게 공격받는다.\n처음으로 그들은 나란히 싸운다.\n늑대 대장이 말한다:\n"이클립스가 이기면 우리 중 누구도 살아남지 못해."\n프로스트바이트 산맥 깊숙이 이클립스가 깨어난다. 진정한 전쟁이 시작된다.',
  vi: 'Tại Embertrail, cả sói và gấu trúc đều bị tấn công bởi những con thú bóng tối pha lê sinh ra từ Nhật thực.\nLần đầu tiên, chúng chiến đấu cạnh nhau.\nMột đại úy sói nói:\n"Nếu Nhật thực thắng, không ai trong chúng ta sống sót."\nSâu trong dãy núi Frostbite, Nhật thực thức tỉnh. Cuộc chiến thực sự bắt đầu.',
  tr: 'Embertrail\'de hem kurtlar hem de rakunlar, Tutulmadan doğan kristal gölge canavarları tarafından saldırıya uğrar.\nİlk kez yan yana savaşırlar.\nBir kurt kaptan der ki:\n"Eğer Tutulma kazanırsa, hiçbirimiz hayatta kalmaz."\nFrostbite Dağları\'nın derinliklerinde Tutulma uyanır. Gerçek savaş başlar.',
  it: 'A Embertrail, sia lupi che procioni sono attaccati da bestie d\'ombra cristallina nate dall\'Eclissi.\nPer la prima volta, combattono fianco a fianco.\nUn capitano lupo dice:\n"Se l\'Eclissi vince, nessuno di noi sopravvive."\nNel profondo delle Montagne Frostbite, l\'Eclissi si risveglia. La vera guerra inizia.',
  th: 'ที่เอมเบอร์เทรล ทั้งหมาป่าและแรคคูนถูกโจมตีโดยสัตว์ร้ายเงามืดคริสตัลที่เกิดจากอีคลิปส์\nเป็นครั้งแรกที่พวกเขาต่อสู้เคียงบ่าเคียงไหล่\nกัปตันหมาป่าพูดว่า:\n"ถ้าอีคลิปส์ชนะ เราไม่มีใครรอด"\nลึกเข้าไปในเทือกเขาฟรอสต์ไบต์ อีคลิปส์ตื่นขึ้น สงครามที่แท้จริงเริ่มต้นขึ้น',
  pl: 'W Embertrail zarówno wilki, jak i szopy są atakowane przez krystaliczne stwory cienia zrodzone z Zaćmienia.\nPo raz pierwszy walczą ramię w ramię.\nKapitan wilków mówi:\n"Jeśli Zaćmienie wygra, żaden z nas nie przeżyje."\nGłęboko w Górach Frostbite Zaćmienie się budzi. Prawdziwa wojna się zaczyna.',
  id: 'Di Embertrail, baik serigala maupun rakun diserang oleh binatang bayangan kristal yang lahir dari Eclipse.\nUntuk pertama kalinya, mereka bertempur berdampingan.\nSeorang kapten serigala berkata:\n"Jika Eclipse menang, tidak ada yang selamat."\nJauh di Pegunungan Frostbite, Eclipse terbangun. Perang sesungguhnya dimulai.',
  nl: 'Bij Embertrail worden zowel wolven als wasberen aangevallen door kristallijne schaduwbeesten geboren uit de Eclipse.\nVoor de eerste keer vechten ze zij aan zij.\nEen wolvenkapitein zegt:\n"Als de Eclipse wint, overleeft niemand van ons."\nDiep in de Frostbite Bergen ontwaakt de Eclipse. De echte oorlog begint.',
  cs: 'V Embertrailu jsou vlci i mývali napadeni krystalickými stínovými příšerami zrozenými ze Zatmění.\nPoprvé bojují bok po boku.\nVlčí kapitán říká:\n"Pokud Zatmění vyhraje, nikdo z nás nepřežije."\nHluboko v horách Frostbite se Zatmění probouzí. Pravá válka začíná.',
  el: 'Στο Embertrail, τόσο οι λύκοι όσο και οι ρακούν δέχονται επίθεση από κρυσταλλικά θηρία σκιάς που γεννήθηκαν από την Έκλειψη.\nΓια πρώτη φορά, μάχονται δίπλα-δίπλα.\nΈνας λύκος καπετάνιος λέει:\n"Αν κερδίσει η Έκλειψη, κανείς από εμάς δεν επιβιώνει."\nΒαθιά στα Βουνά Frostbite, η Έκλειψη ξυπνά. Ο αληθινός πόλεμος ξεκινά.',
  hu: 'Embertailnél mind a farkasokat, mind a mosómedvéket megtámadják a kristályos árnyékszörnyek, amelyek az Eclipse-ből születtek.\nElőször harcolnak egymás mellett.\nEgy farkaskapitány azt mondja:\n"Ha az Eclipse nyer, egyikünk sem marad életben."\nA Frostbite-hegység mélyén az Eclipse felébred. Az igazi háború kezdődik.',
  sv: 'Vid Embertrail attackeras både vargar och tvättbjörnar av kristallina skuggbestar födda från Eclipse.\nFör första gången slåss de sida vid sida.\nEn vargkapten säger:\n"Om Eclipse vinner överlever ingen av oss."\nDjupt i Frostbite-bergen vaknar Eclipse. Det verkliga kriget börjar.',
  da: 'Ved Embertrail angribes både ulve og vaskebjørne af krystallinske skyggedyr født fra Eclipse.\nFor første gang kæmper de side om side.\nEn ulve kaptajn siger:\n"Hvis Eclipse vinder, overlever ingen af os."\nDybt i Frostbite Bjergene vågner Eclipse. Den sande krig begynder.',
  fi: 'Embertrailissa sekä sudet että pesukarhu hyökkäävät kristallisten varjopetoeläinten, jotka syntyivät Pimennyksen myötä.\nEnsimmäistä kertaa he taistelevat vierekkäin.\nSusikapteeni sanoo:\n"Jos Pimennys voittaa, kukaan meistä ei selviä."\nSyvällä Frostbite-vuorissa Pimennys herää. Todellinen sota alkaa.',
  no: 'Ved Embertrail blir både ulver og vaskebjørner angrepet av krystallinske skyggbestene født fra Eclipse.\nFor første gang kjemper de side om side.\nEn ulve kaptein sier:\n"Hvis Eclipse vinner, overlever ingen av oss."\nDypt i Frostbite-fjellene våkner Eclipse. Den sanne krigen begynner.'
};

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
  
  const mood = getMoodByProgress(progressPercent);
  const animations = CHARACTER_ANIMATIONS[actualLevel] || CHARACTER_ANIMATIONS[defaultLevel];
  const animationUrl = animations[mood] || animations.mood_1;
  
  const stories = CHARACTER_STORIES[actualLevel] || CHARACTER_STORIES[defaultLevel];
  
  return {
    image_url: CHARACTER_IMAGES_BLACK[actualLevel] || CHARACTER_IMAGES_BLACK[defaultLevel],
    animation_url: animationUrl,
    name: CHARACTER_NAMES[actualLevel] || CHARACTER_NAMES[defaultLevel], // Теперь просто строка
    story: stories[language] || stories.en,
    level: actualLevel,
    current_mood: mood
  };
}

function getCharactersList(userLevel, userTotalXP, language = 'en') {
  const characters = [];
  
  for (let level = 1; level <= 10; level++) {
    const isClosed = level > userLevel;
    const xpRequired = LEVEL_XP_REQUIREMENTS[level];
    
    let xpToUnlock = 0;
    if (isClosed) {
      xpToUnlock = Math.max(0, xpRequired - userTotalXP);
    }
    
    const stories = CHARACTER_STORIES[level];
    
    characters.push({
      level: level,
      name: CHARACTER_NAMES[level], // Теперь просто строка
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
