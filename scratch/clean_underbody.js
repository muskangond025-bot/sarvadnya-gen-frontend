const sharp = require('sharp');

async function cleanUnderbodyWhitePixels() {
  const { data, info } = await sharp('public/images/generators/truck_3d_realistic.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height;
  let clearedCount = 0;

  for (let y = 570; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const a = data[idx + 3];
      if (a === 0) continue;

      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const isLight = (r > 70 || g > 70 || b > 70);

      // 1. Under rear overhang: x < 330, chassis ends at y = 585
      if (x < 330 && (y > 585 || isLight)) {
        data[idx + 3] = 0;
        clearedCount++;
        continue;
      }

      // 2. Between the wheels: x: 475 to 960, underbody ends at y = 600
      if (x >= 475 && x <= 960 && (y > 600 || isLight)) {
        data[idx + 3] = 0;
        clearedCount++;
        continue;
      }

      // 3. Front overhang: x > 1115, bumper ends at y = 585
      if (x > 1115 && (y > 585 || isLight)) {
        data[idx + 3] = 0;
        clearedCount++;
        continue;
      }

      // 4. Around tires: any light reflection/halo below y = 615
      if (y >= 615 && isLight) {
        data[idx + 3] = 0;
        clearedCount++;
        continue;
      }

      // 5. Anything below the bottom of the black tire rubber (y >= 638)
      if (y >= 638) {
        data[idx + 3] = 0;
        clearedCount++;
        continue;
      }
    }
  }

  console.log('Cleared light underbody pixels:', clearedCount);

  // Now trim the image to height 638 so the tires are the bottom-most pixel row
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: 0, top: 0, width: w, height: 638 })
    .png()
    .toFile('public/images/generators/truck_3d_realistic.png');

  console.log('Saved cleaned public/images/generators/truck_3d_realistic.png (1276 x 638)');
}

cleanUnderbodyWhitePixels().catch(console.error);

