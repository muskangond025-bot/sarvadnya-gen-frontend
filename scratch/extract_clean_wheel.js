const sharp = require('sharp');

async function extractCleanWheel() {
  const cX = 1062;
  const cY = 554;
  const r = 94; // Exactly the outer boundary of the tire

  const cropped = await sharp('public/images/generators/truck_3d_realistic.png')
    .extract({
      left: Math.round(cX - r),
      top: Math.round(cY - r),
      width: Math.round(r * 2),
      height: Math.round(r * 2),
    })
    .toBuffer();

  const circleSvg = Buffer.from(`
    <svg width="${r * 2}" height="${r * 2}">
      <circle cx="${r}" cy="${r}" r="${r}" fill="white" />
    </svg>
  `);

  await sharp(cropped)
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toFile('public/images/generators/test_clean_wheel.png');

  console.log('Saved test_clean_wheel.png');
}

extractCleanWheel().catch(console.error);

