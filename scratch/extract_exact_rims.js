const sharp = require('sharp');

async function extractExactRims() {
  // Front rim: center (1045, 557), radius 54
  const fRadius = 54;
  const frontRimCropped = await sharp('scratch/truck_3d_clean.png')
    .extract({
      left: Math.round(1045 - fRadius),
      top: Math.round(557 - fRadius),
      width: fRadius * 2,
      height: fRadius * 2,
    })
    .toBuffer();

  const fMask = Buffer.from(`
    <svg width="${fRadius * 2}" height="${fRadius * 2}">
      <circle cx="${fRadius}" cy="${fRadius}" r="${fRadius - 1}" fill="white" />
    </svg>
  `);

  await sharp(frontRimCropped)
    .composite([{ input: fMask, blend: 'dest-in' }])
    .png()
    .toFile('public/images/generators/truck_rim_front.png');

  // Rear rim: center (404, 567), radius 34
  const rRadius = 34;
  const rearRimCropped = await sharp('scratch/truck_3d_clean.png')
    .extract({
      left: Math.round(404 - rRadius),
      top: Math.round(567 - rRadius),
      width: rRadius * 2,
      height: rRadius * 2,
    })
    .toBuffer();

  const rMask = Buffer.from(`
    <svg width="${rRadius * 2}" height="${rRadius * 2}">
      <circle cx="${rRadius}" cy="${rRadius}" r="${rRadius - 1}" fill="white" />
    </svg>
  `);

  await sharp(rearRimCropped)
    .composite([{ input: rMask, blend: 'dest-in' }])
    .png()
    .toFile('public/images/generators/truck_rim_rear.png');

  console.log('Successfully created truck_rim_front.png and truck_rim_rear.png');
}

extractExactRims().catch(console.error);

