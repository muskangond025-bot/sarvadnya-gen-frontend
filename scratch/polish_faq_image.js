const sharp = require('sharp');

async function polishFaqImage() {
  const { data, info } = await sharp('public/images/faq/tech_consultant_question_mark.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height;
  const outData = Buffer.from(data);

  // Clear faint floor shadows outside the subjects
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = outData[idx];
      const g = outData[idx + 1];
      const b = outData[idx + 2];

      // Faint cream floor shadow
      const isFloorShadow = (r > 218 && g > 212 && b > 200 && Math.abs(r - g) < 16 && Math.abs(g - b) < 20);
      if (isFloorShadow && (x < 170 || y > 760)) {
        outData[idx + 3] = 0;
      }
    }
  }

  // Find exact tight bounding box now
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (outData[(y * w + x) * 4 + 3] > 50) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Final tight bounds:', { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1 });

  const finalPng = await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    })
    .png()
    .toBuffer();

  await sharp(finalPng).toFile('public/images/faq/tech_consultant_question_mark.png');
  console.log('Saved pristine public/images/faq/tech_consultant_question_mark.png');
}

polishFaqImage().catch(console.error);

