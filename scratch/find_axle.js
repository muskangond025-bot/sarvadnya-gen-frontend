const sharp = require('sharp');

async function findAxleCenter() {
  const { data, info } = await sharp('public/images/generators/truck_3d_realistic.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  function findCenterInBox(minX, maxX, minY, maxY) {
    // The central hub cap is a dark circle surrounded by the circular rim
    let sumX = 0, sumY = 0, count = 0;
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const idx = (y * width + x) * channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
        // Dark metallic rim/tire pixels
        if (a > 200 && r < 40 && g < 40 && b < 40) {
          sumX += x;
          sumY += y;
          count++;
        }
      }
    }
    return { cX: Math.round(sumX / count), cY: Math.round(sumY / count), count };
  }

  // Front wheel box: X: 950 to 1190, Y: 460 to 670
  const front = findCenterInBox(950, 1190, 460, 670);
  // Rear wheel box: X: 300 to 540, Y: 460 to 670
  const rear = findCenterInBox(300, 540, 460, 670);

  console.log('Front axle estimate:', front);
  console.log('Rear axle estimate:', rear);

  // Tire top edge:
  let frontTireTop = 682;
  for (let y = 440; y < 560; y++) {
    const idx = (y * width + front.cX) * channels;
    if (data[idx + 3] > 100) {
      frontTireTop = y;
      break;
    }
  }

  console.log('Front tire top:', frontTireTop, 'radius approx:', (667 - frontTireTop) / 2);
}

findAxleCenter().catch(console.error);

