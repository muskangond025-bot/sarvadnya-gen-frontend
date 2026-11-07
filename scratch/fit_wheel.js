const sharp = require('sharp');

async function exactCircle() {
  const { data, info } = await sharp('public/images/generators/truck_3d_realistic.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  function getAlpha(x, y) {
    return data[(y * width + x) * channels + 3];
  }

  // Let's test candidate centers (cX, cY) and radius R for front wheel
  // to find the circle that best fits the outer tire boundary:
  function fitWheelCircle(approxX, approxY) {
    let bestX = approxX, bestY = approxY, bestR = 100, maxScore = -1;

    for (let cX = approxX - 30; cX <= approxX + 30; cX += 2) {
      for (let cY = approxY - 30; cY <= approxY + 30; cY += 2) {
        for (let r = 85; r <= 115; r += 2) {
          // Check points on circle perimeter: should transition from tire to outside
          let score = 0;
          const samples = 36;
          for (let i = 0; i < samples; i++) {
            const angle = (i * 2 * Math.PI) / samples;
            // sample slightly inside
            const inX = Math.round(cX + (r - 8) * Math.cos(angle));
            const inY = Math.round(cY + (r - 8) * Math.sin(angle));
            // sample slightly outside
            const outX = Math.round(cX + (r + 8) * Math.cos(angle));
            const outY = Math.round(cY + (r + 8) * Math.sin(angle));

            if (inX >= 0 && inX < width && inY >= 0 && inY < height) {
              const inA = getAlpha(inX, inY);
              const inDark = data[(inY * width + inX) * channels] < 60;
              if (inA > 150 && inDark) score += 2;
            }
          }
          if (score > maxScore) {
            maxScore = score;
            bestX = cX;
            bestY = cY;
            bestR = r;
          }
        }
      }
    }
    return { bestX, bestY, bestR, maxScore };
  }

  console.log('Front wheel fit:', fitWheelCircle(1050, 555));
  console.log('Rear wheel fit:', fitWheelCircle(385, 555));
}

exactCircle().catch(console.error);

