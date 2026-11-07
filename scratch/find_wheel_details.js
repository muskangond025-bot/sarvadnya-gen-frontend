const sharp = require('sharp');

async function findWheelDetails() {
  const { data, info } = await sharp('public/images/generators/truck_3d_realistic.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Let's inspect the rear wheel around X: 350-480, Y: 460-680
  // And front wheel around X: 1000-1140, Y: 460-680
  function getPixel(x, y) {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  }

  // Find the exact bottom-most pixel of the tires (maxY)
  let rearTireBottom = 0;
  for (let x = 350; x < 480; x++) {
    for (let y = height - 1; y >= 450; y--) {
      if (getPixel(x, y)[3] > 60) {
        if (y > rearTireBottom) rearTireBottom = y;
        break;
      }
    }
  }

  let frontTireBottom = 0;
  for (let x = 1000; x < 1140; x++) {
    for (let y = height - 1; y >= 450; y--) {
      if (getPixel(x, y)[3] > 60) {
        if (y > frontTireBottom) frontTireBottom = y;
        break;
      }
    }
  }

  console.log({ rearTireBottom, frontTireBottom, totalHeight: height });
}

findWheelDetails().catch(console.error);

