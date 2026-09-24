import { MemoryItem, VideoItem, TimelineMilestone, PolaroidItem } from '@/types';

/**
 * =========================================================================
 * KONFIGURÁCIA A ÚDAJE PRE NIKINU 18-TKU
 * =========================================================================
 * 
 * Všetky fotky môžeš nahrať do priečinka /public/memories/
 * a potom sem napísať len cestu, napr: '/memories/nasa-fotka.jpg'
 * Alebo použiť priamy link na fotku/video z cloudu.
 */

export const SITE_CONFIG = {
  partnerName: 'Niki',
  authorName: 'Jakub',
  yearsTogether: '3 roky',
  startYear: '2023',
  currentYear: '2026',
  anniversarySubtitle: 'Od prvého neistého kroku až po 18. narodeniny',
  magazineIssue: 'VOL. 18 // SPECIAL BIRTHDAY EDITION',
  magazineDate: 'SEPTEMBER 2026',
  // Tvoja pesnička: daj súbor do /public/music.mp3 alebo nechaj túto jemnú inštrumentálnu melódiu
  musicTrack: {
    title: 'Our Dance Anthem',
    artist: 'Niki & Jakub',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  },
  birthdayLetter: {
    greeting: 'Milá Niki,',
    title: 'Krásnych 18. narodenín!',
    paragraphs: [
      'Ani neviem, ako tie tri roky ubehli. Pamätám si náš úplne prvý tréning, keď sme ešte len hľadali rytmus, počítali si doby pod nosom a ani jeden z nás netušil, koľko toho spolu pretancujeme.',
      'Dnes máš 18 rokov a stojíš tu ako neuveriteľne talentovaná, cieľavedomá a výnimočná tanečná partnerka, na ktorú sa môžem na parkete aj mimo neho kedykoľvek spoľahnúť.',
      'Ďakujem ti za každú jednu prepotenú hodinu na sále, za každé skoré ranné vstávanie na súťaže, za záchvaty smiechu v šatniach, keď nám už dochádzali sily, aj za chvíle, keď sme jeden druhého podržali, keď niečo nevyšlo.',
      'Prajem ti do dospelosti ten najkrajší parket, aký si len vieš predstaviť. Nech v živote nikdy nestratíš svoju iskru, úsmev a vášeň pre tanec. Som nesmierne hrdý na to, kam sme to spolu dotiahli.',
    ],
    closing: 'Tvoj tanečný partner,',
    signature: 'Jakub',
    pS: 'P.S.: Tento webový archív a časopis v tvojich rukách sú len začiatok. Dnes to poriadne oslávime! 🥂💃',
  },
};

// Fotky pre nekonečný obojsmerný slider (Infinite Carousel)
export const CAROUSEL_MEMORIES: MemoryItem[] = [
  {
    id: 'car-1',
    title: 'Prvé spoločné kroky',
    subtitle: 'Kde to celé začalo',
    date: 'Október 2023',
    year: '2023',
    category: 'Tréning',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop',
    caption: 'Ešte sme nevedeli, čo nás čaká, ale rytmus sme našli okamžite.',
    story: 'Prvý tréning v starej sále. Hodiny opakovania základného kroku a prvé pokusy o synchronizáciu.',
    location: 'Tanečná sála',
    tag: 'Chapter 01',
  },
  {
    id: 'car-2',
    title: 'Finálové kolo',
    subtitle: 'Adrenalín a svetlá reflektorov',
    date: 'Máj 2024',
    year: '2024',
    category: 'Súťaž',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    caption: 'Ten moment, keď vyhlásia naše štartovné číslo do finále.',
    story: 'Srdce bilo na 180, tréma opadla hneď v prvej sekunde po zaznení hudby.',
    location: 'Bratislava Grand Prix',
    tag: 'Gold Moment',
  },
  {
    id: 'car-3',
    title: 'Backstage & Chaos',
    subtitle: 'Nefiltrovaná radosť',
    date: 'November 2024',
    year: '2024',
    category: 'Backstage',
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1200&auto=format&fit=crop',
    caption: 'Lak na vlasy, flitre všade a nekonečný smiech pred vstupom na plochu.',
    story: 'Tie najlepšie momenty sa často dejú mimo parketu, keď sa smejeme nad tým, ako nám nič nevychádza.',
    location: 'Šatňa č. 4',
    tag: 'Real Life',
  },
  {
    id: 'car-4',
    title: 'Perfektná synchronicita',
    subtitle: 'Keď tanec vyzerá bez námahy',
    date: 'Marec 2025',
    year: '2025',
    category: 'Tréning',
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1200&auto=format&fit=crop',
    caption: 'Stovky hodín driny pretavené do jedinej ladnej sekundy.',
    story: 'Tréningová sobota od 8:00 ráno. Nohy boleli, ale ten pocit, keď nová choreografia zapadla, bol na nezaplatenie.',
    location: 'Hlavné štúdio',
    tag: 'Evolution',
  },
  {
    id: 'car-5',
    title: 'Pódiové umiestnenie',
    subtitle: 'Spoločná hrdosť',
    date: 'Jún 2025',
    year: '2025',
    category: 'Súťaž',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    caption: 'Dôkaz, že keď si veríme, dokážeme čokoľvek.',
    story: 'Pohár v rukách a pocit, že všetka tá drina mala zmysel.',
    location: 'Národný pohár',
    tag: 'Victory',
  },
  {
    id: 'car-6',
    title: '18 Rokov — Nová Kapitola',
    subtitle: 'Tvoj veľký míľnik',
    date: 'September 2026',
    year: '2026',
    category: 'Míľnik',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    caption: 'Krásnych 18 rokov. Nech je tvoja ďalšia jazda ešte veľkolepejšia!',
    story: 'Vstup do dospelosti na parkete aj v živote. Držím ti chrbát v každom ďalšom tanci.',
    location: 'Dnes & Navždy',
    tag: 'Sweet 18',
  },
];

// Polaroidy – interaktívny deck na presúvanie
export const POLAROIDS: PolaroidItem[] = [
  {
    id: 'pol-1',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    caption: 'Prvý tréning 2023 💃🕺',
    date: '12. 10. 2023',
    rotation: -4,
    tapeColor: '#e0c097',
  },
  {
    id: 'pol-2',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop',
    caption: 'Keď sme zabudli celú väzbu 😂',
    date: '18. 02. 2024',
    rotation: 5,
    tapeColor: '#c9b195',
  },
  {
    id: 'pol-3',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    caption: 'Naše prvé spoločné zlato! 🏆',
    date: '24. 05. 2024',
    rotation: -2,
    tapeColor: '#d4af37',
  },
  {
    id: 'pol-4',
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800&auto=format&fit=crop',
    caption: 'Pauza na pizzu o 22:00 🍕',
    date: '14. 11. 2024',
    rotation: 6,
    tapeColor: '#e0c097',
  },
  {
    id: 'pol-5',
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=800&auto=format&fit=crop',
    caption: 'Generálka pred veľkou šou ✨',
    date: '04. 04. 2025',
    rotation: -5,
    tapeColor: '#e0c097',
  },
  {
    id: 'pol-6',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
    caption: 'Niki 18th Birthday Edition! 🎂',
    date: 'Dnes',
    rotation: 3,
    tapeColor: '#d4af37',
  },
];

// Časová os – 3 roky spoločného tanca
export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2023',
    season: 'Jeseň 2023',
    title: 'Začiatok nášho partnerstva',
    tagline: 'Dva odlišné štýly, jeden spoločný cieľ',
    description: 'Postavili sme sa k sebe prvýkrát. Chvíľu trvalo zladiť kroky, ale hneď bolo jasné, že energia medzi nami funguje. Začala éra nekonečných drilov základov.',
    badge: 'Rok 1',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1000&auto=format&fit=crop',
    quote: '„Najťažšie nie je naučiť sa kroky, ale naučiť sa dýchať naraz.“',
    achievements: ['Prvá spoločná choreografia', 'Zladenie tempa a držania tela', 'Prvý spoločný interný seminár'],
  },
  {
    year: '2024',
    season: 'Jar & Jeseň 2024',
    title: 'Prvé súťaže & Prvé medaily',
    tagline: 'Od trémy v šatni k potlesku v sále',
    description: 'Náš súťažný debut. Vystúpiť pred porotu v nových šatách a fraku. Pamätáš na ten adrenalín, keď sme čakali na vyhlásenie výsledkov? Tento rok nás zocelil ako tím.',
    badge: 'Rok 2',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    quote: '„Keď hrá hudba, existuje len parket a náš rytmus.“',
    achievements: ['Debut na celoštátnej súťaži', 'Prvé finálové umiestnenie', 'Prekonaná tréma a nečakané pády premenené na smiech'],
  },
  {
    year: '2025',
    season: 'Celý rok 2025',
    title: 'Majstrovstvo & Istota',
    tagline: 'Rozumieme si bez jediného slova',
    description: 'Už to nie je len o počítaní 1-2-3. Je to o výraze, sebavedomí a radosti. Už presne vieme, čo ten druhý urobí skôr, než pohne nohou.',
    badge: 'Rok 3',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop',
    quote: '„Tanec je rozhovor bez slov — a my dvaja máme najlepší dialóg.“',
    achievements: ['Nová úroveň choreografií', 'Najlepšie hodnotenia poroty za výraz', 'Zohranosť na 100%'],
  },
  {
    year: '2026',
    season: 'September 2026',
    title: 'Niki má 18!',
    tagline: 'Veľký míľnik a oslava nášho príbehu',
    description: '3 roky spoločného potu, sĺz radosti a desiatok pódií. Dnes oslavuješ dospelosť a tento archív je dôkazom všetkého, čo sme spoločne dokázali.',
    badge: '18th Milestone',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop',
    quote: '„Všetko najlepšie k 18. narodeninám mojej najlepšej tanečnej partnerke!“',
    achievements: ['3 roky partnerstva', 'Nespočetné spomienky', 'Vstup do novej životnej etapy'],
  },
];

// Videá – Tanečné klipy a reels (9:16 aj 16:9)
export const DANCE_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Naše najlepšie sólo vystúpenie',
    date: 'Máj 2025',
    category: 'Súťaž',
    duration: '0:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1000&auto=format&fit=crop',
    // Môžeš nahradiť lokálnym súborom napr. '/memories/dance1.mp4' alebo YouTube odkazom
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-couple-dancing-sensual-bachata-in-a-studio-41126-large.mp4',
    description: 'Záber z finále, kde všetko sadlo na stotinu sekundy presne.',
    isVertical: true,
  },
  {
    id: 'vid-2',
    title: 'Tréningový blooper & smiech',
    date: 'November 2024',
    category: 'Backstage',
    duration: '0:28',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-couple-doing-ballroom-dance-in-a-studio-41123-large.mp4',
    description: 'Keď otočka nedopadla podľa plánu a skončili sme obaja na zemi v kŕči od smiechu.',
    isVertical: true,
  },
  {
    id: 'vid-3',
    title: 'Rýchly reel: 3 Roky za 30 sekúnd',
    date: 'September 2026',
    category: 'Spomienka',
    duration: '0:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-couple-practicing-a-choreography-in-a-dance-studio-41125-large.mp4',
    description: 'Rýchly zostrih nášho vývoja od prvého tréningu až po dnes.',
    isVertical: false,
  },
];
