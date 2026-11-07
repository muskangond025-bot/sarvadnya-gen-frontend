const sharp = require('sharp');

async function makePerfectWheel() {
  const cX = 1047;
  const cY = 560;
  const rRim = 68;

  // Extract the exact rim
  const rimCropped = await sharp('public/images/generators/truck_3d_realistic.png')
    .extract({
      left: Math.round(cX - rRim),
      top: Math.round(cY - rRim),
      width: Math.round(rRim * 2),
      height: Math.round(rRim * 2),
    })
    .toBuffer();

  const rimMask = Buffer.from(`
    <svg width="${rRim * 2}" height="${rRim * 2}">
      <circle cx="${rRim}" cy="${rRim}" r="${rRim - 1}" fill="white" />
    </svg>
  `);

  const cleanRim = await sharp(rimCropped)
    .composite([{ input: rimMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Now create a complete wheel (radius 94)
  // Outer tire ring has dark charcoal rubber (#1A1A1A to #242424) with radial tire tread marks
  const totalR = 95;
  const size = totalR * 2;

  // Generate SVG for tire tread & rubber sidewall
  const tireSvg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
          <stop offset="65%" stop-color="#141517" />
          <stop offset="85%" stop-color="#222428" />
          <stop offset="96%" stop-color="#18191B" />
          <stop offset="100%" stop-color="#0E0F10" />
        </radialGradient>
      </defs>
      <!-- Outer Rubber Tire Body -->
      <circle cx="${totalR}" cy="${totalR}" r="${totalR - 1}" fill="url(#tireGrad)" />
      
      <!-- Subtle Circular Tread Grooves -->
      <circle cx="${totalR}" cy="${totalR}" r="${totalR - 4}" fill="none" stroke="#2D3035" stroke-width="1.5" opacity="0.6" />
      <circle cx="${totalR}" cy="${totalR}" r="${totalR - 8}" fill="none" stroke="#121315" stroke-width="1.2" opacity="0.8" />
      <circle cx="${totalR}" cy="${totalR}" r="${rRim + 6}" fill="none" stroke="#25272B" stroke-width="1.2" opacity="0.7" />
      <circle cx="${totalR}" cy="${totalR}" r="${rRim + 2}" fill="none" stroke="#0D0E0F" stroke-width="2" />
    </svg>
  `;

  const tireBuffer = await sharp(Buffer.from(tireSvg)).png().toBuffer();

  // Composite the authentic Tata steel rim over the center of the tire
  const offset = totalR - rRim;
  const finalWheel = await sharp(tireBuffer)
    .composite([
      {
        input: cleanRim,
        top: offset,
        left: offset,
      },
    ])
    .png()
    .toFile('public/images/generators/truck_wheel_animated.png');

  console.log('Successfully created public/images/generators/truck_wheel_animated.png');
}

makePerfectWheel().catch(console.error);

