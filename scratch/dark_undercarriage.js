const sharp = require('sharp');

async function addDarkUndercarriage() {
  const { data, info } = await sharp('public/images/generators/truck_3d_realistic.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height;
  const outData = Buffer.from(data);

  // Fill between wheels: x = 450 to 975, y = 560 to 635
  for (let y = 560; y < 638; y++) {
    for (let x = 440; x <= 980; x++) {
      const idx = (y * w + x) * 4;
      // If transparent or very low alpha, fill with dark undercarriage shadow
      if (outData[idx + 3] < 120) {
        // Distance from bottom
        const bottomDist = 638 - y;
        // Dark metallic chassis color with depth
        outData[idx] = 16;     // R
        outData[idx + 1] = 18; // G
        outData[idx + 2] = 22; // B
        outData[idx + 3] = 255; // 100% OPAQUE - ZERO WHITE BACKGROUND SHINING THROUGH!
      }
    }
  }

  // Fill under rear overhang: x = 80 to 330, y = 570 to 630
  for (let y = 570; y < 630; y++) {
    for (let x = 80; x <= 330; x++) {
      const idx = (y * w + x) * 4;
      if (outData[idx + 3] < 120) {
        outData[idx] = 14;
        outData[idx + 1] = 16;
        outData[idx + 2] = 20;
        outData[idx + 3] = 255;
      }
    }
  }

  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/generators/truck_3d_realistic.png');

  console.log('Successfully filled all underbody cavities with solid dark undercarriage chassis shadow!');
}

addDarkUndercarriage().catch(console.error);

