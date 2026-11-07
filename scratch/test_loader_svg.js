const sharp = require('sharp');

// Test the SVG paths for the 1 & 4 combined loader
const svgContent = `
<svg width="240" height="240" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFB800" />
      <stop offset="60%" stop-color="#FF5500" />
      <stop offset="100%" stop-color="#D93D00" />
    </linearGradient>
    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF8800" />
      <stop offset="100%" stop-color="#FF5500" />
    </linearGradient>
  </defs>

  <!-- Left Orbital Crescent Arc -->
  <path
    d="M 32 30 C 14 46, 14 74, 32 90 C 22 76, 22 44, 32 30 Z"
    fill="url(#arcGrad)"
    stroke="#FF7700"
    stroke-width="1.5"
  />

  <!-- Right Orbital Crescent Arc -->
  <path
    d="M 88 90 C 106 74, 106 46, 88 30 C 98 44, 98 76, 88 90 Z"
    fill="url(#arcGrad)"
    stroke="#FF7700"
    stroke-width="1.5"
  />

  <!-- Central Dynamic Lightning Bolt -->
  <path
    d="M 68 12 L 42 56 L 58 56 L 48 108 L 80 50 L 64 50 Z"
    fill="url(#boltGrad)"
    stroke="#FFAA00"
    stroke-width="1.5"
    stroke-linejoin="round"
  />
</svg>
`;

sharp(Buffer.from(svgContent))
  .png()
  .toFile('scratch/test_loader_monogram.png')
  .then(() => console.log('Saved scratch/test_loader_monogram.png'))
  .catch(console.error);

