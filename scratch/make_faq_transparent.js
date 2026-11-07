const sharp = require('sharp');

async function makeFaqTransparent() {
  const { data, info } = await sharp('public/images/faq/faq_consultant_3d.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height;
  const outData = Buffer.alloc(w * h * 4);

  // Background color is roughly [246, 243, 234]
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sIdx = (y * w + x) * 3;
      const tIdx = (y * w + x) * 4;

      const r = data[sIdx];
      const g = data[sIdx + 1];
      const b = data[sIdx + 2];

      // Difference from background [246, 243, 234]
      const dR = r - 246;
      const dG = g - 243;
      const dB = b - 234;
      const dist = Math.sqrt(dR * dR + dG * dG + dB * dB);

      outData[tIdx] = r;
      outData[tIdx + 1] = g;
      outData[tIdx + 2] = b;

      if (dist < 6) {
        outData[tIdx + 3] = 0; // Pure transparent background
      } else if (dist < 18) {
        outData[tIdx + 3] = Math.round(((dist - 6) / 12) * 255); // Smooth anti-aliased edge
      } else {
        outData[tIdx + 3] = 255;
      }
    }
  }

  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/faq/faq_consultant_3d.png');

  console.log('Saved public/images/faq/faq_consultant_3d.png');
}

makeFaqTransparent().catch(console.error);

