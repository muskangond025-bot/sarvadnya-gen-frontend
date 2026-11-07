"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * LocationPin3D Component
 * 
 * Hyperrealistic, ultra-premium 3D Map Pointer / Location Pin:
 * - EXACT GEOMETRIC DESIGN matching the iconic standard map pin silhouette:
 *   - Perfectly round circular head
 *   - Clean, open concentric circular aperture hole (no clutter, no inner balls)
 *   - Razor-straight tangent flanks tapering down to a sharp V-point tip at the bottom
 * - Extruded with luxury rounded bevels along all outer and inner hole edges
 * - Color: Sarvadnya Industrial Energy Orange (#FF5500) with wet automotive clearcoat lacquer
 * - Studio 3-point HDR automotive lighting rig with razor-sharp specular rim highlights
 * - Continuous 360-degree autonomous rotation loop in place (60 FPS WebGL)
 * - Zero drag, zero manual rotate controls (pointer-events: none, totally uninterrupted)
 * - Synchronized ground contact shadow and subtle levitation
 */
export function LocationPin3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 7.5);
    camera.lookAt(0, 0.1, 0);

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. PROCEDURAL STUDIO ENVIRONMENT MAP (Luxury Automotive Clearcoat Reflections)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement("canvas");
    envCanvas.width = 512;
    envCanvas.height = 256;
    const ctx = envCanvas.getContext("2d");
    if (ctx) {
      // Soft studio gradient with bright overhead softbox reflector
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, "#1f2329");
      grad.addColorStop(0.25, "#3c424d");
      grad.addColorStop(0.5, "#ffffff"); // bright studio softbox reflection line
      grad.addColorStop(0.75, "#2a2e36");
      grad.addColorStop(1, "#121417");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Warm side studio lamp reflection
      const warmGrad = ctx.createRadialGradient(380, 110, 5, 380, 110, 150);
      warmGrad.addColorStop(0, "rgba(255, 120, 20, 0.9)");
      warmGrad.addColorStop(1, "transparent");
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, 512, 256);

      const envTexture = new THREE.CanvasTexture(envCanvas);
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
      scene.environment = envMap;
      envTexture.dispose();
      pmremGenerator.dispose();
    }

    // 5. STUDIO LIGHTING RIG
    // Key Light (Upper Front Left - crisp specular highlights)
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.4);
    keyLight.position.set(-3.5, 4.5, 4.5);
    scene.add(keyLight);

    // Fill Light (Upper Front Right - warm amber ambiance)
    const fillLight = new THREE.DirectionalLight(0xff9944, 2.0);
    fillLight.position.set(4, 3, 3);
    scene.add(fillLight);

    // Rim / Contour Light (Back Center - sharp glossy silhouette along bevels)
    const rimLight = new THREE.DirectionalLight(0xffffff, 4.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Bottom Ambient Ground Light (Subtle warm underglow onto asphalt)
    const groundLight = new THREE.PointLight(0xff5500, 2.0, 8);
    groundLight.position.set(0, -1.8, 1);
    scene.add(groundLight);

    // Soft Ambient Fill
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
    scene.add(ambientLight);

    // 6. MASTER PIN HIERARCHY
    const pinGroup = new THREE.Group();
    scene.add(pinGroup);

    // 7. EXACT REFERENCE MAP PIN GEOMETRY
    // Pure geometric construction matching the user's reference image:
    // Head circle of radius R centered at (0, Yc)
    // Clean concentric circular hole of radius rHole centered at (0, Yc)
    // Straight tangent lines from bottom tip (0, 0) to circle tangent points
    const shape = new THREE.Shape();
    const Yc = 2.0;          // Circle head center height
    const R = 1.0;           // Outer circle radius
    const rHole = 0.48;      // Proportional clean center hole cutout

    // Tangent angle alpha from tip to circle: sin(alpha) = R / Yc = 1.0 / 2.0 = 0.5 (30 degrees)
    const alpha = Math.asin(R / Yc); // Math.PI / 6
    const phiRight = -alpha;         // -30 deg
    const phiLeft = Math.PI + alpha; // 210 deg

    const xR = R * Math.cos(phiRight);
    const yR = Yc + R * Math.sin(phiRight);

    // 1. Start exactly at the bottom tip
    shape.moveTo(0, 0);

    // 2. Razor-straight tangent flank line up to the right side of the circle
    shape.lineTo(xR, yR);

    // 3. Perfect circular dome arc around the top to the left tangent point
    shape.absarc(0, Yc, R, phiRight, phiLeft, false);

    // 4. Razor-straight tangent flank line back down to the bottom tip
    shape.lineTo(0, 0);

    // 5. Clean, open concentric circular hole (passing completely through)
    const hole = new THREE.Path();
    hole.absarc(0, Yc, rHole, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    // 3D Extrusion with ultra-smooth bevels for luxury car-finish reflections
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
      curveSegments: 128,
    };

    const pinGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    pinGeometry.center(); // Center bounds perfectly at origin

    // Hyperrealistic Energy Orange Automotive Clearcoat Material
    const pinMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FF5500"),       // Sarvadnya Industrial Energy Orange
      emissive: new THREE.Color("#FF2400"),    // Warm inner power glow
      emissiveIntensity: 0.06,
      roughness: 0.12,                         // Ultra-smooth mirror-like finish
      metalness: 0.14,                         // Subtle metallic flake depth
      clearcoat: 1.0,                          // Wet automotive high-gloss clearcoat
      clearcoatRoughness: 0.04,
      reflectivity: 0.98,
    });

    const pinMesh = new THREE.Mesh(pinGeometry, pinMaterial);
    pinGroup.add(pinMesh);

    // 8. 3D ELECTRIC POWER SYMBOL IN CENTER HOLE (Envato 2CG6TSH Style)
    // Central 3D Lightning Bolt + Dual Curved Orbital Energy Arcs
    const electricGroup = new THREE.Group();
    electricGroup.position.set(0, 0.516, 0); // Position directly in center aperture
    pinGroup.add(electricGroup);

    // Central 3D Lightning Bolt
    const boltShape = new THREE.Shape();
    boltShape.moveTo(0.07, 0.30);
    boltShape.lineTo(-0.10, 0.04);
    boltShape.lineTo(-0.02, 0.04);
    boltShape.lineTo(-0.07, -0.30);
    boltShape.lineTo(0.10, -0.04);
    boltShape.lineTo(0.02, -0.04);
    boltShape.closePath();

    const boltGeom = new THREE.ExtrudeGeometry(boltShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 8,
    });
    boltGeom.center();

    // High-gloss Golden Amber / Bright Electric Yellow Material
    const electricMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFBA08"),
      emissive: new THREE.Color("#FF7700"),
      emissiveIntensity: 0.45,
      roughness: 0.12,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.98,
    });

    const boltMesh = new THREE.Mesh(boltGeom, electricMaterial);
    electricGroup.add(boltMesh);

    // Left Orbital Curved Energy Arc
    const leftArcShape = new THREE.Shape();
    leftArcShape.absarc(0, 0, 0.38, Math.PI * 0.42, Math.PI * 1.15, false);
    leftArcShape.absarc(0, 0, 0.33, Math.PI * 1.15, Math.PI * 0.42, true);
    leftArcShape.closePath();
    const leftArcGeom = new THREE.ExtrudeGeometry(leftArcShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 6,
    });
    leftArcGeom.center();
    const leftArcMesh = new THREE.Mesh(leftArcGeom, electricMaterial);
    leftArcMesh.position.set(-0.06, 0.05, 0);
    electricGroup.add(leftArcMesh);

    // Right Orbital Curved Energy Arc
    const rightArcShape = new THREE.Shape();
    rightArcShape.absarc(0, 0, 0.38, -Math.PI * 0.58, Math.PI * 0.15, false);
    rightArcShape.absarc(0, 0, 0.33, Math.PI * 0.15, -Math.PI * 0.58, true);
    rightArcShape.closePath();
    const rightArcGeom = new THREE.ExtrudeGeometry(rightArcShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 6,
    });
    rightArcGeom.center();
    const rightArcMesh = new THREE.Mesh(rightArcGeom, electricMaterial);
    rightArcMesh.position.set(0.06, -0.05, 0);
    electricGroup.add(rightArcMesh);

    // 9. GROUND CONTACT SHADOW DISK
    const shadowGeom = new THREE.PlaneGeometry(2.5, 1.2);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const sGrad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 58);
      sGrad.addColorStop(0, "rgba(0, 0, 0, 0.7)");
      sGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.35)");
      sGrad.addColorStop(0.75, "rgba(255, 85, 0, 0.08)");
      sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      shadowCtx.fillStyle = sGrad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMaterial);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.75, 0);
    scene.add(shadowMesh);

    // Initial position
    pinGroup.position.y = 0.12;

    // 9. CONTINUOUS 360-DEGREE ROTATION ANIMATION LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous 360° rotation loop in place (auto-spins smoothly without user interaction)
      pinGroup.rotation.y = elapsedTime * 1.2;

      // Subtle organic floating levitation on Y-axis
      const hoverY = Math.sin(elapsedTime * 2.2) * 0.07;
      pinGroup.position.y = 0.12 + hoverY;

      // Elegant 3D forward tilt angle (~7 degrees) showing off depth, extruded flanks, and bevels
      pinGroup.rotation.x = 0.12 + Math.sin(elapsedTime * 1.4) * 0.04;
      pinGroup.rotation.z = Math.cos(elapsedTime * 1.6) * 0.03;

      // Ground shadow synchronizes scale and opacity with levitation
      const shadowFactor = 1 - hoverY * 1.6;
      shadowMesh.scale.set(shadowFactor, shadowFactor, shadowFactor);
      shadowMaterial.opacity = 0.68 - hoverY * 0.9;

      renderer.render(scene, camera);
    };

    animate();

    // 10. RESPONSIVE RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pinGeometry.dispose();
      pinMaterial.dispose();
      boltGeom.dispose();
      leftArcGeom.dispose();
      rightArcGeom.dispose();
      electricMaterial.dispose();
      shadowGeom.dispose();
      shadowMaterial.dispose();
      shadowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
      aria-label="Sarvadnya 3D Location Map Pointer"
      role="img"
    />
  );
}
