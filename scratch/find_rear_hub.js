const sharp = require('sharp');

async function findRearHub() {
  const cX = 416;
  const cY = 560;
  const r = 104;

  const cropped = await sharp('public/images/generators/truck_3d_realistic.png')
    .extract({
      left: Math.round(cX - r),
      top: Math.round(cY - r),
      width: Math.round(r * 2),
      height: Math.round(r * 2),
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = cropped;
  let sumX = 0, sumY = 0, count = 0;
  for (let x = 40; x < info.width - 40; x++) {
    for (let y = 40; y < info.height - 40; y++) {
      const idx = (y * info.width + x) * info.channels;
      const rVal = data[idx], gVal = data[idx+1], bVal = data[idx+2], aVal = data[idx+3];
      if (aVal > 200 && rVal < 35 && gVal < 35 && bVal < 35) {
        sumX += x;
        sumY += y;
        count++;
      }
    }
  }

  const offsetInCropX = sumX / count;
  const offsetInCropY = sumY / count;
  console.log('Rear offset in crop:', { offsetInCropX, offsetInCropY, count });
  console.log('Rear true axle center:', {
    trueX: cX - (r - offsetInCropX),
    trueY: cY - (r - offsetInCropY),
  });
}

findRearHub().catch(console.error);

