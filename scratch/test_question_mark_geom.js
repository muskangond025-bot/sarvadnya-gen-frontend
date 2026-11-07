const THREE = require('three');

function createQuestionMarkShape() {
  const shape = new THREE.Shape();
  
  // Question Mark top hook:
  // We can trace a clean outline of a question mark
  // Let's create an elegant, modern curved question mark path
  // Coordinate space: Center is around (0, 0), height ~3 units.
  // Top arc starts from left inner, curves around top, down to central stem.

  // Outer contour:
  shape.moveTo(-0.15, 0.4);
  shape.bezierCurveTo(-0.7, 0.8, -0.6, 1.8, 0.0, 1.8);
  shape.bezierCurveTo(0.65, 1.8, 0.75, 1.2, 0.75, 0.8);
  shape.bezierCurveTo(0.75, 0.35, 0.4, 0.15, 0.18, -0.05);
  shape.bezierCurveTo(0.05, -0.2, 0.05, -0.35, 0.05, -0.5);
  shape.lineTo(-0.25, -0.5);
  shape.bezierCurveTo(-0.25, -0.2, -0.1, 0.0, 0.05, 0.15);
  shape.bezierCurveTo(0.25, 0.32, 0.42, 0.45, 0.42, 0.75);
  shape.bezierCurveTo(0.42, 1.0, 0.28, 1.45, 0.0, 1.45);
  shape.bezierCurveTo(-0.35, 1.45, -0.35, 0.9, -0.15, 0.4);
  shape.closePath();

  return shape;
}

const shape = createQuestionMarkShape();
const extrudeSettings = {
  depth: 0.35,
  bevelEnabled: true,
  bevelSegments: 8,
  steps: 1,
  bevelSize: 0.06,
  bevelThickness: 0.06,
  curveSegments: 32,
};

const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
geom.computeBoundingBox();
console.log('Question mark hook bounding box:', geom.boundingBox);

