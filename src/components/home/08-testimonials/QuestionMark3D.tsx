"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * QuestionMark3D Component
 * 
 * Hyper-Realistic 3D Extruded Question Mark Model in Clean Luxury White:
 * - Geometric Sculpted Glyph with Smooth Outer & Inner Curves + Beveled Edges
 * - Color: Clean Luxury Pearl White (#FFFFFF / #F8F9FA) with Automotive Clearcoat Finish
 * - Studio 3-Point Lighting with Specular Rim Highlights & Depth Contours
 * - Soft Ground Contact Drop Shadow
 * - Static 3D Studio Pose (DOES NOT ROTATE as requested by user)
 * - Subtle Interactive Mouse Parallax Tilt for Tactile 3D Depth
 */
export function QuestionMark3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.2);
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
    renderer.toneMappingExposure = 1.25;
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
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, "#22262c");
      grad.addColorStop(0.25, "#404652");
      grad.addColorStop(0.5, "#ffffff"); // Bright studio softbox reflection line
      grad.addColorStop(0.75, "#2d323b");
      grad.addColorStop(1, "#16181c");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Warm side accent reflection
      const warmGrad = ctx.createRadialGradient(380, 100, 5, 380, 100, 140);
      warmGrad.addColorStop(0, "rgba(255, 235, 210, 0.8)");
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
    // Key Light (Upper Front-Left - crisp highlights on beveled contours)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(-3.5, 4.5, 4.5);
    scene.add(keyLight);

    // Fill Light (Upper Front-Right - warm studio fill)
    const fillLight = new THREE.DirectionalLight(0xfff6ec, 2.2);
    fillLight.position.set(4, 3, 3);
    scene.add(fillLight);

    // Rim Light (Back Center - sharp edge silhouette highlight)
    const rimLight = new THREE.DirectionalLight(0xffffff, 4.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Under-bounce Light (Subtle warm floor bounce)
    const floorBounce = new THREE.PointLight(0xffeedd, 1.2, 8);
    floorBounce.position.set(0, -2, 1);
    scene.add(floorBounce);

    // Ambient Fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // 6. MASTER 3D QUESTION MARK HIERARCHY
    const qGroup = new THREE.Group();
    scene.add(qGroup);

    // 7. CLEAN GEOMETRIC QUESTION MARK SHAPE
    const hookShape = new THREE.Shape();
    // Starting at bottom-left of vertical stem:
    hookShape.moveTo(-0.16, -0.45);
    hookShape.lineTo(0.16, -0.45); // bottom flat of stem
    hookShape.lineTo(0.16, -0.15); // right edge of stem rising
    // Outer curve up to right lobe:
    hookShape.bezierCurveTo(0.24, 0.05, 0.54, 0.35, 0.54, 0.80);
    // Outer curve around top peak:
    hookShape.bezierCurveTo(0.54, 1.35, 0.24, 1.65, -0.10, 1.65);
    // Outer curve around top left:
    hookShape.bezierCurveTo(-0.55, 1.65, -0.75, 1.25, -0.75, 0.75);
    // Left lobe tip:
    hookShape.bezierCurveTo(-0.75, 0.55, -0.65, 0.45, -0.45, 0.45);
    hookShape.bezierCurveTo(-0.25, 0.45, -0.20, 0.60, -0.20, 0.75);
    // Inner curve back to center:
    hookShape.bezierCurveTo(-0.20, 1.10, -0.05, 1.25, 0.10, 1.25);
    hookShape.bezierCurveTo(0.20, 1.25, 0.28, 1.10, 0.28, 0.80);
    hookShape.bezierCurveTo(0.28, 0.50, 0.05, 0.25, -0.16, 0.0);
    hookShape.lineTo(-0.16, -0.45); // close stem
    hookShape.closePath();

    // 3D Extrusion with ultra-smooth bevels for luxury car-finish reflections
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      curveSegments: 64,
    };

    const hookGeom = new THREE.ExtrudeGeometry(hookShape, extrudeSettings);
    hookGeom.center();

    // Hyper-realistic Pure White Ceramic / Automotive Clearcoat Material
    const whiteMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFFFFF"),       // Clean Luxury White
      roughness: 0.14,                         // Smooth satin gloss
      metalness: 0.06,                         // Subtle metallic depth
      clearcoat: 1.0,                          // Wet automotive lacquer
      clearcoatRoughness: 0.04,
      reflectivity: 0.98,
      clearcoatNormalScale: new THREE.Vector2(1, 1),
    });

    const hookMesh = new THREE.Mesh(hookGeom, whiteMaterial);
    hookMesh.position.set(0, 0.38, 0);
    qGroup.add(hookMesh);

    // 8. QUESTION MARK CIRCULAR DOT (Extruded Cylinder with Bevel)
    const dotShape = new THREE.Shape();
    dotShape.absarc(0, 0, 0.18, 0, Math.PI * 2, false);
    const dotGeom = new THREE.ExtrudeGeometry(dotShape, extrudeSettings);
    dotGeom.center();

    const dotMesh = new THREE.Mesh(dotGeom, whiteMaterial);
    dotMesh.position.set(0, -1.05, 0);
    qGroup.add(dotMesh);

    // 9. GROUND CONTACT DROP SHADOW
    const shadowGeom = new THREE.PlaneGeometry(3.0, 1.5);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      sGrad.addColorStop(0, "rgba(0, 0, 0, 0.32)");
      sGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.14)");
      sGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.03)");
      sGrad.addColorStop(1, "transparent");
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMaterial);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.45, 0);
    scene.add(shadowMesh);

    // 10. FIXED 3D STUDIO POSE (NO ROTATION LOOP - User explicitly requested: "rotate nahi hona chahiye")
    // Tilted at a luxury 3/4 isometric perspective to clearly showcase full 3D extrusion, depth, and bevels
    const BASE_ROT_X = 0.10;
    const BASE_ROT_Y = -0.32;
    const BASE_ROT_Z = -0.02;

    qGroup.rotation.x = BASE_ROT_X;
    qGroup.rotation.y = BASE_ROT_Y;
    qGroup.rotation.z = BASE_ROT_Z;
    qGroup.position.y = 0.08;

    // Subtle interactive mouse parallax tilt
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * 0.16;
      targetTiltX = -ny * 0.12;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // RENDER LOOP (Static pose with gentle mouse tilt damping)
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth damping interpolation toward mouse target
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      qGroup.rotation.x = BASE_ROT_X + currentTiltX;
      qGroup.rotation.y = BASE_ROT_Y + currentTiltY;

      renderer.render(scene, camera);
    };

    animate();

    // 11. RESPONSIVE RESIZE OBSERVER
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
      container.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      hookGeom.dispose();
      dotGeom.dispose();
      whiteMaterial.dispose();
      shadowGeom.dispose();
      shadowMaterial.dispose();
      shadowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px] flex items-center justify-center select-none"
      aria-label="3D White Question Mark Model"
      role="img"
    />
  );
}

