const sharp = require('sharp');

async function cleanTruckBottom() {
  const meta = await sharp('public/images/generators/truck_3d_realistic.png').metadata();
  console.log('Original size:', meta.width, 'x', meta.height);

  // We want to extract up to Y = 668 so that the bottom-most pixel is the black rubber tire
  // And zero shadow underneath
  const trimmed = await sharp('public/images/generators/truck_3d_realistic.png')
    .extract({
      left: 0,
      top: 0,
      width: meta.width,
      height: 668,
    })
    .toBuffer();

  await sharp(trimmed)
    .png()
    .toFile('public/images/generators/truck_3d_realistic.png');

  console.log('Trimmed truck_3d_realistic.png to exact tire baseline height 668');
}

cleanTruckBottom().catch(console.error);

