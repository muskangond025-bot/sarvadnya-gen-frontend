const sharp = require('sharp');

async function testExtractWheel() {
  const cX = 1071;
  const cY = 560;
  const r = 104;

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
    .toFile('public/images/generators/truck_wheel.png');

  console.log('Saved isolated wheel disc: public/images/generators/truck_wheel.png');
}

testExtractWheel().catch(console.error);

