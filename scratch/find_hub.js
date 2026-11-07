const sharp = require('sharp');

async function findHubInCrop() {
  const { data, info } = await sharp('public/images/generators/truck_wheel.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // Let's find the center of the dark circular hub cap
  // The hub cap is around the middle of this 208x208 image
  let sumX = 0, sumY = 0, count = 0;
  for (let x = 40; x < width - 40; x++) {
    for (let y = 40; y < height - 40; y++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      // Dark center hub cap:
      if (a > 200 && r < 35 && g < 35 && b < 35) {
        sumX += x;
        sumY += y;
        count++;
      }
    }
  }

  console.log('Center inside 208x208 crop:', { cX: sumX / count, cY: sumY / count, count });
}

findHubInCrop().catch(console.error);

