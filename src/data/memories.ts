import { MemoryItem } from '@/types';
import { ImageData } from '@/components/SphereImageGrid';

export const SITE_CONFIG = {
  partnerName: 'Niki',
  authorName: 'Jakub',
  yearsTogether: '3 roky',
  startYear: '2023',
  currentYear: '2026',
  anniversarySubtitle: 'Od prvého neistého kroku až po 18. narodeniny',
  magazineIssue: 'VOL. 18 // SPECIAL BIRTHDAY EDITION',
  magazineDate: 'SEPTEMBER 2026',
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

export const SPHERE_GALLERY_ITEMS: ImageData[] = [
  {
    "id": "sph-01",
    "src": "/media/photos/photo_01.jpg",
    "alt": "Tanečná spomienka #1",
    "title": "Spomienka #1",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-02",
    "src": "/media/photos/photo_02.jpg",
    "alt": "Tanečná spomienka #2",
    "title": "Spomienka #2",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-03",
    "src": "/media/photos/video_01_poster.jpg",
    "videoUrl": "/media/videos/video_01.mp4",
    "videoLoopUrl": "/media/videos/video_01.mp4",
    "alt": "Tanečné video #1",
    "title": "Tanečný moment #1",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-04",
    "src": "/media/photos/photo_03.jpg",
    "alt": "Tanečná spomienka #3",
    "title": "Spomienka #3",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-05",
    "src": "/media/photos/photo_04.jpg",
    "alt": "Tanečná spomienka #4",
    "title": "Spomienka #4",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-06",
    "src": "/media/photos/video_02_poster.jpg",
    "videoUrl": "/media/videos/video_02.mp4",
    "videoLoopUrl": "/media/videos/video_02_loop.mp4",
    "alt": "Tanečné video #2",
    "title": "Tanečný moment #2",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-07",
    "src": "/media/photos/photo_05.jpg",
    "alt": "Tanečná spomienka #5",
    "title": "Spomienka #5",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-08",
    "src": "/media/photos/photo_06.jpg",
    "alt": "Tanečná spomienka #6",
    "title": "Spomienka #6",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-09",
    "src": "/media/photos/video_03_poster.jpg",
    "videoUrl": "/media/videos/video_03.mp4",
    "videoLoopUrl": "/media/videos/video_03_loop.mp4",
    "alt": "Tanečné video #3",
    "title": "Tanečný moment #3",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-10",
    "src": "/media/photos/photo_07.jpg",
    "alt": "Tanečná spomienka #7",
    "title": "Spomienka #7",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-11",
    "src": "/media/photos/photo_08.jpg",
    "alt": "Tanečná spomienka #8",
    "title": "Spomienka #8",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-12",
    "src": "/media/photos/video_04_poster.jpg",
    "videoUrl": "/media/videos/video_04.mp4",
    "videoLoopUrl": "/media/videos/video_04_loop.mp4",
    "alt": "Tanečné video #4",
    "title": "Tanečný moment #4",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-13",
    "src": "/media/photos/photo_09.jpg",
    "alt": "Tanečná spomienka #9",
    "title": "Spomienka #9",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-14",
    "src": "/media/photos/photo_10.jpg",
    "alt": "Tanečná spomienka #10",
    "title": "Spomienka #10",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-15",
    "src": "/media/photos/video_05_poster.jpg",
    "videoUrl": "/media/videos/video_05.mp4",
    "videoLoopUrl": "/media/videos/video_05_loop.mp4",
    "alt": "Tanečné video #5",
    "title": "Tanečný moment #5",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-16",
    "src": "/media/photos/photo_11.jpg",
    "alt": "Tanečná spomienka #11",
    "title": "Spomienka #11",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-17",
    "src": "/media/photos/photo_12.jpg",
    "alt": "Tanečná spomienka #12",
    "title": "Spomienka #12",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-18",
    "src": "/media/photos/video_06_poster.jpg",
    "videoUrl": "/media/videos/video_06.mp4",
    "videoLoopUrl": "/media/videos/video_06_loop.mp4",
    "alt": "Tanečné video #6",
    "title": "Tanečný moment #6",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-19",
    "src": "/media/photos/photo_13.jpg",
    "alt": "Tanečná spomienka #13",
    "title": "Spomienka #13",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-20",
    "src": "/media/photos/photo_14.jpg",
    "alt": "Tanečná spomienka #14",
    "title": "Spomienka #14",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-21",
    "src": "/media/photos/video_07_poster.jpg",
    "videoUrl": "/media/videos/video_07.mp4",
    "videoLoopUrl": "/media/videos/video_07_loop.mp4",
    "alt": "Tanečné video #7",
    "title": "Tanečný moment #7",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-22",
    "src": "/media/photos/photo_15.jpg",
    "alt": "Tanečná spomienka #15",
    "title": "Spomienka #15",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-23",
    "src": "/media/photos/photo_16.jpg",
    "alt": "Tanečná spomienka #16",
    "title": "Spomienka #16",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-24",
    "src": "/media/photos/video_08_poster.jpg",
    "videoUrl": "/media/videos/video_08.mp4",
    "videoLoopUrl": "/media/videos/video_08_loop.mp4",
    "alt": "Tanečné video #8",
    "title": "Tanečný moment #8",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-25",
    "src": "/media/photos/photo_17.jpg",
    "alt": "Tanečná spomienka #17",
    "title": "Spomienka #17",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-26",
    "src": "/media/photos/photo_18.jpg",
    "alt": "Tanečná spomienka #18",
    "title": "Spomienka #18",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-27",
    "src": "/media/photos/video_09_poster.jpg",
    "videoUrl": "/media/videos/video_09.mp4",
    "videoLoopUrl": "/media/videos/video_09_loop.mp4",
    "alt": "Tanečné video #9",
    "title": "Tanečný moment #9",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-28",
    "src": "/media/photos/photo_19.jpg",
    "alt": "Tanečná spomienka #19",
    "title": "Spomienka #19",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-29",
    "src": "/media/photos/photo_20.jpg",
    "alt": "Tanečná spomienka #20",
    "title": "Spomienka #20",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-30",
    "src": "/media/photos/video_10_poster.jpg",
    "videoUrl": "/media/videos/video_10.mp4",
    "videoLoopUrl": "/media/videos/video_10_loop.mp4",
    "alt": "Tanečné video #10",
    "title": "Tanečný moment #10",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-31",
    "src": "/media/photos/photo_21.jpg",
    "alt": "Tanečná spomienka #21",
    "title": "Spomienka #21",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-32",
    "src": "/media/photos/photo_22.jpg",
    "alt": "Tanečná spomienka #22",
    "title": "Spomienka #22",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-33",
    "src": "/media/photos/video_11_poster.jpg",
    "videoUrl": "/media/videos/video_11.mp4",
    "videoLoopUrl": "/media/videos/video_11_loop.mp4",
    "alt": "Tanečné video #11",
    "title": "Tanečný moment #11",
    "description": "Záber z našich tréningov a vystúpení.",
    "category": "Video",
    "date": "2023 – 2026",
    "isVideo": true
  },
  {
    "id": "sph-34",
    "src": "/media/photos/photo_23.jpg",
    "alt": "Tanečná spomienka #23",
    "title": "Spomienka #23",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-35",
    "src": "/media/photos/photo_24.jpg",
    "alt": "Tanečná spomienka #24",
    "title": "Spomienka #24",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  },
  {
    "id": "sph-36",
    "src": "/media/photos/photo_25.jpg",
    "alt": "Tanečná spomienka #25",
    "title": "Spomienka #25",
    "description": "3 roky spoločného tanca, zážitkov a nezabudnuteľných momentov.",
    "category": "Fotka",
    "date": "2023 – 2026",
    "isVideo": false
  }
];


export const CAROUSEL_MEMORIES: MemoryItem[] = SPHERE_GALLERY_ITEMS.map((item, idx) => ({
  id: item.id,
  title: item.title || item.alt,
  subtitle: item.isVideo ? 'Tanečné video' : 'Spomienka z archívu',
  date: item.date || '2023 – 2026',
  year: '2026',
  category: item.category || (item.isVideo ? 'Video' : 'Fotka'),
  imageUrl: item.src,
  videoUrl: item.videoUrl,
  isVideo: item.isVideo,
  caption: item.description || '',
  story: 'Nezabudnuteľný moment z našich spoločných troch rokov tanca.',
  location: 'Tanečný parket',
  tag: item.isVideo ? 'Video' : 'Spomienka',
}));
