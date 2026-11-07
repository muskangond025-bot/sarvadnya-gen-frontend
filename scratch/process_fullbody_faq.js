const sharp = require('sharp');
const fs = require('fs');

async function processFullBodyFaq() {
  const src = 'C:/Users/User/.gemini/antigravity/brain/249d94d5-5c33-4537-a5df-d64231d4a3ed/tech_consultant_question_mark_1794037837693.jpg';
  fs.copyFileSync(src, 'public/images/faq/tech_consultant_question_mark.jpg');
  console.log('Copied raw jpg to public/images/faq/tech_consultant_question_mark.jpg');

  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  console.log('Image dimensions:', w, h);

  const outData = Buffer.alloc(w * h * 4);
  const visited = new Uint8Array(w * h);
  const queue = [];

  for (let i = 0; i < w * h; i++) {
    outData[i * 4] = data[i * 3];
    outData[i * 4 + 1] = data[i * 3 + 1];
    outData[i * 4 + 2] = data[i * 3 + 2];
    outData[i * 4 + 3] = 255;
  }

  // Top-left background color
  const bgR = data[0], bgG = data[1], bgB = data[2];
  console.log('Background RGB:', bgR, bgG, bgB);

  function isBg(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const dR = r - bgR, dG = g - bgG, dB = b - bgB;
    return (Math.sqrt(dR * dR + dG * dG + dB * dB) < 22);
  }

  // Seed with all 4 boundaries
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
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const pos = cy * w + cx;

    if (isBg(cx, cy)) {
      outData[pos * 4 + 3] = 0;

      const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nPos = ny * w + nx;
          if (!visited[nPos]) {
            visited[nPos] = 1;
            if (isBg(nx, ny)) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }
  }

  // Find tight bounding box of subject
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (outData[(y * w + x) * 4 + 3] > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Tight subject bounding box:', { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1 });

  const trimmed = await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    })
    .png()
    .toBuffer();

  await sharp(trimmed).toFile('public/images/faq/tech_consultant_question_mark.png');
  console.log('Saved public/images/faq/tech_consultant_question_mark.png');
}

processFullBodyFaq().catch(console.error);

