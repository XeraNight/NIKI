# 🎂 NIKI 18 — Ako pridať vaše fotky a dať web na Vercel (Do 10 minút)

Ahoj Jakub! Celý web je kompletne naprogramovaný, má editorial magazínový dizajn, pätkový font (Playfair Display) + moderný sans + ručne písané písmo na polaroidoch, obojsmerný nekonečný slider, 3-ročnú časovú os, moodboard polaroidov, video showcase, zapečatenú obálku s konfetami a hrajúcu hudbu.

Tu je jednoduchý návod, ako si web upravíš podľa seba a nasadíš na Vercel:

---

## 1. Kde a ako zmeniť fotky, texty a videá
Všetky texty, fotky a videá sú na **jednom jedinom mieste**:
👉 [src/data/memories.ts](file:///Users/jakub/Niki/src/data/memories.ts)

### A. Pridanie vlastných fotiek:
1. Skopíruj vaše fotky do priečinka: `public/memories/` (napr. `public/memories/trening1.jpg`, `public/memories/sutaz.jpg`).
2. V [src/data/memories.ts](file:///Users/jakub/Niki/src/data/memories.ts) zmeň `imageUrl`:
   ```ts
   imageUrl: '/memories/trening1.jpg',
   ```
   *(Fungujú aj priame internetové linky z Google Drive, Cloudu, Imgur alebo Unsplash)*.

### B. Pridanie vašej tanečnej hudby (Audio):
- Nahraj váš obľúbený song (MP3 súbor) do `public/music.mp3`.
- V [src/data/memories.ts](file:///Users/jakub/Niki/src/data/memories.ts) v sekcii `SITE_CONFIG.musicTrack`:
  ```ts
  musicTrack: {
    title: 'Názov Vašej Piesne',
    artist: 'Niki & Jakub',
    src: '/music.mp3',
  }
  ```

### C. Vlastné videá:
- Videá (vertikálne 9:16 reels z telefónu alebo 16:9) daj do `public/memories/` (napr. `video1.mp4`).
- V [src/data/memories.ts](file:///Users/jakub/Niki/src/data/memories.ts) v sekcii `DANCE_VIDEOS` nastav `videoUrl: '/memories/video1.mp4'`.

### D. Osobný list k 18-tke:
- V sekcii `SITE_CONFIG.birthdayLetter` si môžeš upraviť text listu, spomienky a podpis.

---

## 2. Ako dať stránku na Vercel (Zadarmo a za 2 minúty)

### Spôsob 1: Cez Vercel CLI priamo z terminálu (Najrýchlejšie)
1. V termináli v tomto priečinku spusti:
   ```bash
   npx vercel
   ```
2. Prihlás sa (alebo potvrď svoj Vercel účet).
3. Na všetky otázky stačí stlačiť **Enter** (defaultné nastavenia).
4. Do 60 sekúnd ti Vercel vypíše hotový verejný link (napr. `https://niki18.vercel.app`)!

### Spôsob 2: Cez GitHub + Vercel Dashboard
1. Vytvor si na GitHube nový repozitár (napr. `niki-18th-showcase`).
2. Nahraj kód:
   ```bash
   git init
   git add .
   git commit -m "Niki 18th Birthday Dance Showcase"
   git branch -M main
   git remote add origin https://github.com/TVOJE_MENO/niki-18th-showcase.git
   git push -u origin main
   ```
3. Na [vercel.com](https://vercel.com) klikni **Add New Project** -> Vyber svoj GitHub repozitár -> Klikni **Deploy**.

---

## 3. QR Kód do fyzického časopisu
Keď máš z Vercelu finálnu URL adresu (napr. `https://niki-18.vercel.app`):
1. Choď na bezplatný generátor QR kódov (napr. [qr-code-generator.com](https://www.qr-code-generator.com/) alebo [me-qr.com](https://me-qr.com/)).
2. Zadaj URL tvojej Vercel stránky.
3. Stiahni vygenerovaný QR kód vo vysokej kvalite (PNG/SVG) a vlož ho do grafiky svojho časopisu (napr. na zadnú stranu alebo s nápisom: *„Naskenuj pre exkluzívny digitálny archív a video zostrihy nášho 3-ročného partnerstva“*).

---

## 4. Spustenie a kontrola na počítači
Ak si chceš web teraz pozrieť:
Web ti už beží na: **[http://localhost:3000](http://localhost:3000)** (stačí otvoriť v prehliadači).
