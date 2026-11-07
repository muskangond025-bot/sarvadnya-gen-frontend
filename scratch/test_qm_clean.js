const THREE = require('three');

function createSmoothQuestionMark() {
  const shape = new THREE.Shape();

  // Create a clean, elegant question mark glyph path
  // We'll construct the outer contour and inner contour cleanly
  // Top bulb center is roughly (0, 0.8)
  
  // Starting at bottom-left of the vertical stem:
  shape.moveTo(-0.16, -0.45);
  shape.lineTo(0.16, -0.45); // bottom flat of stem
  shape.lineTo(0.16, -0.15); // right edge of stem rising
  
  // Curves outward to the right lobe:
  shape.bezierCurveTo(0.25, 0.05, 0.55, 0.35, 0.55, 0.80);
  // Curves around top right to top peak:
  shape.bezierCurveTo(0.55, 1.35, 0.25, 1.65, -0.10, 1.65);
  // Curves around top left:
  shape.bezierCurveTo(-0.55, 1.65, -0.75, 1.25, -0.75, 0.75);
  // Left lobe tip:
  shape.bezierCurveTo(-0.75, 0.55, -0.65, 0.45, -0.45, 0.45);
  shape.bezierCurveTo(-0.25, 0.45, -0.20, 0.60, -0.20, 0.75);
  // Inner arc curving back to center:
  shape.bezierCurveTo(-0.20, 1.10, -0.05, 1.25, 0.10, 1.25);
  shape.bezierCurveTo(0.20, 1.25, 0.28, 1.10, 0.28, 0.80);
  shape.bezierCurveTo(0.28, 0.50, 0.05, 0.25, -0.16, 0.0);
  shape.lineTo(-0.16, -0.45); // back to stem
  shape.closePath();

  return shape;
}

const shape = createSmoothQuestionMark();
const extrudeSettings = {
  depth: 0.38,
  bevelEnabled: true,
  bevelSegments: 12,
  steps: 1,
  bevelSize: 0.06,
  bevelThickness: 0.06,
  curveSegments: 64,
};

const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
geom.center();
console.log('Question mark geom created successfully! Vertex count:', geom.attributes.position.count);

