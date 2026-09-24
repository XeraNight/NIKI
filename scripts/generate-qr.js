const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://niki-vsetko-najlepsie.vercel.app/';
const outputDir = path.join(__dirname, '..', 'public');

async function generate() {
  console.log('Generating print-ready QR codes for:', TARGET_URL);

  // 1. High-Contrast Classic Print SVG (Best for InDesign / Canva / Print shops)
  const svgContent = await QRCode.toString(TARGET_URL, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
    errorCorrectionLevel: 'H', // Highest error correction (30% recoverable)
  });
  fs.writeFileSync(path.join(outputDir, 'qr-code-print.svg'), svgContent);
  console.log('✓ Created: public/qr-code-print.svg (Vector SVG for printing)');

  // 2. High-Res PNG (2048 x 2048 px, 300 DPI ready)
  await QRCode.toFile(path.join(outputDir, 'qr-code-print.png'), TARGET_URL, {
    width: 2048,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
    errorCorrectionLevel: 'H',
  });
  console.log('✓ Created: public/qr-code-print.png (Ultra High-Res PNG 2048x2048)');

  // 3. Luxury Gold & Dark Edition (Matching the magazine cover palette)
  const goldSvg = await QRCode.toString(TARGET_URL, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#d4af37',
      light: '#070709',
    },
    errorCorrectionLevel: 'H',
  });
  fs.writeFileSync(path.join(outputDir, 'qr-code-gold.svg'), goldSvg);
  console.log('✓ Created: public/qr-code-gold.svg (Gold foil edition)');

  // 4. Transparent PNG (For placing on any custom magazine background)
  await QRCode.toFile(path.join(outputDir, 'qr-code-transparent.png'), TARGET_URL, {
    width: 2048,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#00000000', // Transparent
    },
    errorCorrectionLevel: 'H',
  });
  console.log('✓ Created: public/qr-code-transparent.png (Transparent background)');
}

generate().catch(console.error);
