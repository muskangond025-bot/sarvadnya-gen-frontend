const sharp = require('sharp');

async function extractRim() {
  const cX = 1052;
  const cY = 555;
  const r = 68; // The entire steel rim with lug nuts and cooling slots

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
    .toFile('public/images/generators/test_rim.png');

  console.log('Saved test_rim.png');
}

extractRim().catch(console.error);

