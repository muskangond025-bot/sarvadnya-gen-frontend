const sharp = require('sharp');

async function cleanFloodFillFaq() {
  const { data, info } = await sharp('public/images/faq/faq_consultant_3d.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height;
  const outData = Buffer.alloc(w * h * 4);
  const visited = new Uint8Array(w * h);
  const queue = [];

  // Copy RGB to RGBA with alpha = 255 initially
  for (let i = 0; i < w * h; i++) {
    outData[i * 4] = data[i * 3];
    outData[i * 4 + 1] = data[i * 3 + 1];
    outData[i * 4 + 2] = data[i * 3 + 2];
    outData[i * 4 + 3] = 255;
  }

  function isBgPixel(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background is near [246, 243, 234]
    const dR = r - 246;
    const dG = g - 243;
    const dB = b - 234;
    return (Math.sqrt(dR * dR + dG * dG + dB * dB) < 22);
  }

  // Seed borders
  for (let x = 0; x < w; x++) {
    queue.push(x, 0);
    queue.push(x, h - 1);
    visited[x] = 1;
    visited[(h - 1) * w + x] = 1;
  }
  for (let y = 0; y < h; y++) {
    queue.push(0, y);
    queue.push(w - 1, y);
    visited[y * w] = 1;
    visited[y * w + (w - 1)] = 1;
  }

  let head = 0;
  let cleared = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const pos = cy * w + cx;

    if (isBgPixel(cx, cy)) {
      outData[pos * 4 + 3] = 0; // Pure transparent
      cleared++;

      const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nPos = ny * w + nx;
          if (!visited[nPos]) {
            visited[nPos] = 1;
            if (isBgPixel(nx, ny)) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }
  }

  console.log('Cleared exterior background pixels via flood fill:', cleared);

  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/faq/faq_consultant_3d.png');

  console.log('Saved flood-filled public/images/faq/faq_consultant_3d.png');
}

cleanFloodFillFaq().catch(console.error);

