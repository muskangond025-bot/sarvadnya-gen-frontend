"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface PhysicsShape {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  radius: number;
  kind: "circle" | "square" | "capsule" | "triangle" | "pentagon";
  color: string;
  alpha: number;
}

const SHAPE_PALETTE = [
  "#E58F73",
  "#EDC67B",
  "#96ACCE",
  "#9BC5A0",
  "#C7B6E0",
  "#E6A3B2",
  "#8BC4BC",
  "#FF7A45",
];

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  sides: number,
  radius: number,
  cornerRadius: number
) {
  const pts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < sides; i++) {
    const theta = (i * 2 * Math.PI) / sides - Math.PI / 2;
    pts.push({ x: Math.cos(theta) * radius, y: Math.sin(theta) * radius });
  }
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const pPrev = pts[(i - 1 + sides) % sides];
    const pCurr = pts[i];
    const pNext = pts[(i + 1) % sides];

    const v1x = pPrev.x - pCurr.x;
    const v1y = pPrev.y - pCurr.y;
    const v2x = pNext.x - pCurr.x;
    const v2y = pNext.y - pCurr.y;
    const len1 = Math.hypot(v1x, v1y) || 1;
    const len2 = Math.hypot(v2x, v2y) || 1;
    const offset = Math.min(cornerRadius, len1 * 0.35, len2 * 0.35);

    const startX = pCurr.x + (v1x / len1) * offset;
    const startY = pCurr.y + (v1y / len1) * offset;
    const endX = pCurr.x + (v2x / len2) * offset;
    const endY = pCurr.y + (v2y / len2) * offset;

    if (i === 0) {
      ctx.moveTo(startX, startY);
    } else {
      ctx.lineTo(startX, startY);
    }
    ctx.quadraticCurveTo(pCurr.x, pCurr.y, endX, endY);
  }
  ctx.closePath();
}

/**
 * Builds sculpted bold geometric THREE.Shape digits ("4" and "0")
 * for real-time beveled liquid-chrome 3D rendering.
 */
function createFourGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  // Bottom-right stem -> crossbar -> right overhang -> top diagonal -> left corner -> bottom foot
  shape.moveTo(0.14, -1.28);
  shape.lineTo(0.66, -1.28);
  shape.lineTo(0.66, -0.72);
  shape.lineTo(1.06, -0.72);
  shape.lineTo(1.06, -0.26);
  shape.lineTo(0.66, -0.26);
  shape.lineTo(0.66, 1.28);
  shape.lineTo(0.06, 1.28);
  shape.lineTo(-1.08, -0.26);
  shape.lineTo(-1.08, -0.72);
  shape.lineTo(0.14, -0.72);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(0.14, -0.26);
  hole.lineTo(-0.5, -0.26);
  hole.lineTo(0.14, 0.62);
  hole.closePath();
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelSegments: 22,
    steps: 1,
    bevelSize: 0.11,
    bevelThickness: 0.16,
    curveSegments: 32,
  });
  geo.center();
  return geo;
}

function createZeroGeometry(): THREE.ExtrudeGeometry {
  const rx = 0.96;
  const ry = 1.32;
  const shape = new THREE.Shape();
  shape.absellipse(0, 0, rx, ry, 0, Math.PI * 2, false, 0);

  const hole = new THREE.Path();
  hole.absellipse(0, 0, 0.41, 0.78, 0, Math.PI * 2, true, 0);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelSegments: 24,
    steps: 1,
    bevelSize: 0.11,
    bevelThickness: 0.16,
    curveSegments: 64,
  });
  geo.center();
  return geo;
}

/**
 * Generates an HDR-like studio softbox + dark horizon + subtle orange/cyan dispersion
 * reflection map matching Dabbit's liquid-chrome 404 specular response.
 */
function createChromeStudioTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");

  if (g) {
    // Upper studio softbox + horizon + dark floor base
    const baseGrad = g.createLinearGradient(0, 0, 0, h);
    baseGrad.addColorStop(0.0, "#FFFFFF");
    baseGrad.addColorStop(0.28, "#E8EDF4");
    baseGrad.addColorStop(0.45, "#CBD5E1");
    baseGrad.addColorStop(0.49, "#FFFFFF");
    baseGrad.addColorStop(0.51, "#14171D");
    baseGrad.addColorStop(0.68, "#282E3A");
    baseGrad.addColorStop(0.84, "#9AA4B2");
    baseGrad.addColorStop(1.0, "#191C22");
    g.fillStyle = baseGrad;
    g.fillRect(0, 0, w, h);

    // Overhead bright rectangular studio softboxes
    g.fillStyle = "#FFFFFF";
    g.fillRect(80, 32, 340, 120);
    g.fillRect(580, 42, 360, 105);

    // Chromatic dispersion accents (warm amber/orange & cool sky blue glints along horizon edge)
    const warmDisp = g.createLinearGradient(120, 218, 420, 255);
    warmDisp.addColorStop(0, "rgba(255, 110, 48, 0.92)");
    warmDisp.addColorStop(0.5, "rgba(255, 185, 110, 0.78)");
    warmDisp.addColorStop(1, "rgba(255, 255, 255, 0)");
    g.fillStyle = warmDisp;
    g.fillRect(90, 215, 360, 22);

    const coolDisp = g.createLinearGradient(520, 230, 880, 265);
    coolDisp.addColorStop(0, "rgba(56, 189, 248, 0.78)");
    coolDisp.addColorStop(0.6, "rgba(186, 230, 253, 0.65)");
    coolDisp.addColorStop(1, "rgba(255, 255, 255, 0)");
    g.fillStyle = coolDisp;
    g.fillRect(520, 232, 390, 18);

    // Crisp lower rim reflection stripe
    g.fillStyle = "rgba(255, 255, 255, 0.85)";
    g.fillRect(0, 412, w, 18);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chromeMountRef = useRef<HTMLDivElement>(null);
  const heroBoxRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<PhysicsShape[]>([]);
  const pointerNormalizedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRef = useRef<{
    shapeId: number | null;
    offsetX: number;
    offsetY: number;
    lastX: number;
    lastY: number;
    vx: number;
    vy: number;
  }>({
    shapeId: null,
    offsetX: 0,
    offsetY: 0,
    lastX: 0,
    lastY: 0,
    vx: 0,
    vy: 0,
  });

  const [isGrabbing, setIsGrabbing] = useState(false);

  // Smooth spring pupil tracking
  const pupilTargetX = useMotionValue(0);
  const pupilTargetY = useMotionValue(0);
  const pupilX = useSpring(pupilTargetX, { stiffness: 320, damping: 24 });
  const pupilY = useSpring(pupilTargetY, { stiffness: 320, damping: 24 });

  // 1. Real-Time 3D Liquid-Chrome "404" WebGL Sculpture + Traveling Specular Shine
  useEffect(() => {
    const mount = chromeMountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let rafId = 0;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 10.6);

    const studioTex = createChromeStudioTexture();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTarget = pmrem.fromEquirectangular(studioTex);
    scene.environment = envTarget.texture;

    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#EDF0F5"),
      metalness: 1.0,
      roughness: 0.045,
      envMapIntensity: 1.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      iridescence: 0.42,
      iridescenceIOR: 1.42,
      iridescenceThicknessRange: [120, 420],
    });

    const group = new THREE.Group();
    const geoLeftFour = createFourGeometry();
    const geoCenterZero = createZeroGeometry();
    const geoRightFour = createFourGeometry();

    const meshLeftFour = new THREE.Mesh(geoLeftFour, chromeMat);
    meshLeftFour.position.set(-2.32, 0, 0);
    meshLeftFour.rotation.set(0.05, 0.14, 0.02);

    const meshCenterZero = new THREE.Mesh(geoCenterZero, chromeMat);
    meshCenterZero.position.set(0, 0, 0.08);
    meshCenterZero.rotation.set(0.03, 0, 0);

    const meshRightFour = new THREE.Mesh(geoRightFour, chromeMat);
    meshRightFour.position.set(2.32, 0, 0);
    meshRightFour.rotation.set(-0.04, -0.16, -0.02);

    group.add(meshLeftFour, meshCenterZero, meshRightFour);
    scene.add(group);

    // Sweeping studio lights for live metallic shine
    const ambient = new THREE.AmbientLight("#FFFFFF", 0.75);
    const keyLight = new THREE.DirectionalLight("#FFF8F0", 2.4);
    keyLight.position.set(3, 4, 6);
    const orangeRim = new THREE.DirectionalLight("#FF7838", 1.15);
    orangeRim.position.set(-5, 2, 4);
    const coolRim = new THREE.DirectionalLight("#7DD3FC", 1.1);
    coolRim.position.set(5, -3, 3);
    scene.add(ambient, keyLight, orangeRim, coolRim);

    const updateSize = () => {
      const w = mount.clientWidth || 540;
      const h = mount.clientHeight || 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer?.setSize(w, h, false);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const startTime = performance.now();
    const animate = () => {
      const t = (performance.now() - startTime) * 0.001;
      const target = pointerNormalizedRef.current;

      // Subtle continuous breathing + pointer-reactive chrome tilt so reflections shimmer live
      const targetRotY = target.x * 0.22 + Math.sin(t * 0.85) * 0.06;
      const targetRotX = -target.y * 0.14 + Math.cos(t * 0.7) * 0.035;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.08;

      // Subtle traveling specular shine sweep
      keyLight.position.x = Math.sin(t * 1.15) * 5.2;
      keyLight.position.y = 3.2 + Math.cos(t * 0.9) * 1.6;
      orangeRim.position.x = -Math.cos(t * 0.8) * 5.5;

      // Delicate per-digit shimmer
      meshLeftFour.rotation.y = 0.14 + Math.sin(t * 1.1) * 0.03;
      meshCenterZero.rotation.y = Math.sin(t * 0.95 + 1.2) * 0.04;
      meshRightFour.rotation.y = -0.16 + Math.cos(t * 1.05) * 0.03;

      renderer?.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateSize);
      geoLeftFour.dispose();
      geoCenterZero.dispose();
      geoRightFour.dispose();
      chromeMat.dispose();
      studioTex.dispose();
      envTarget.dispose();
      pmrem.dispose();
      renderer?.dispose();
    };
  }, []);

  // 2. 60fps 2D Rigid-Body Interactive Shapes Physics Canvas
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();

    const kinds: PhysicsShape["kind"][] = [
      "circle",
      "square",
      "capsule",
      "triangle",
      "pentagon",
    ];

    const totalShapes = width < 640 ? 30 : 48;
    const created: PhysicsShape[] = [];
    for (let i = 0; i < totalShapes; i++) {
      const isCornerSeed = i < totalShapes * 0.45;
      const onLeftCorner = i % 2 === 0;
      const radius = 14 + (i % 5) * 3.5;

      const x = isCornerSeed
        ? onLeftCorner
          ? 24 + Math.random() * Math.max(80, width * 0.24)
          : width - 24 - Math.random() * Math.max(80, width * 0.24)
        : width * 0.5 + (Math.random() - 0.5) * Math.min(280, width * 0.36);

      const y = isCornerSeed
        ? height - 24 - Math.random() * 90
        : -30 - (i % 12) * 26;

      created.push({
        id: i,
        x,
        y,
        vx: isCornerSeed
          ? (Math.random() - 0.5) * 1.2
          : (Math.random() - 0.5) * 5.2,
        vy: isCornerSeed ? 0 : 1.5 + Math.random() * 2.5,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.06,
        radius,
        kind: kinds[i % kinds.length],
        color: SHAPE_PALETTE[i % SHAPE_PALETTE.length],
        alpha: 0.72 + (i % 3) * 0.08,
      });
    }
    shapesRef.current = created;

    const getColliderRect = () => {
      const heroEl = heroBoxRef.current;
      if (!heroEl) return null;
      const cRect = container.getBoundingClientRect();
      const hRect = heroEl.getBoundingClientRect();
      return {
        left: hRect.left - cRect.left + 8,
        right: hRect.right - cRect.left - 8,
        top: hRect.top - cRect.top + 8,
        bottom: hRect.bottom - cRect.top - 8,
      };
    };

    let rafId = 0;
    const gravity = 0.34;
    const bounce = 0.46;
    const floorFriction = 0.965;

    const step = () => {
      const shapes = shapesRef.current;
      const collider = getColliderRect();

      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        if (dragRef.current.shapeId === s.id) {
          continue;
        }

        s.vy += gravity;
        s.vx *= 0.995;
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.vAngle;

        if (s.x - s.radius < 0) {
          s.x = s.radius;
          s.vx = Math.abs(s.vx) * bounce;
          s.vAngle *= -0.7;
        } else if (s.x + s.radius > width) {
          s.x = width - s.radius;
          s.vx = -Math.abs(s.vx) * bounce;
          s.vAngle *= -0.7;
        }

        if (s.y + s.radius > height) {
          s.y = height - s.radius;
          if (Math.abs(s.vy) > 1.2) {
            s.vy = -s.vy * bounce;
          } else {
            s.vy = 0;
          }
          s.vx *= floorFriction;
          s.vAngle = s.vx * 0.03;
        }

        if (collider) {
          const closestX = Math.max(collider.left, Math.min(s.x, collider.right));
          const closestY = Math.max(collider.top, Math.min(s.y, collider.bottom));
          const dx = s.x - closestX;
          const dy = s.y - closestY;
          const dist = Math.hypot(dx, dy);

          if (dist < s.radius) {
            if (dist === 0) {
              const centerBox = (collider.left + collider.right) / 2;
              s.vx += s.x < centerBox ? -1.4 : 1.4;
              s.vy = Math.min(s.vy, -1);
            } else {
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = s.radius - dist;
              s.x += nx * overlap;
              s.y += ny * overlap;

              const dot = s.vx * nx + s.vy * ny;
              if (dot < 0) {
                s.vx -= (1 + bounce) * dot * nx;
                s.vy -= (1 + bounce) * dot * ny;
                s.vAngle += (Math.random() - 0.5) * 0.04;
              }
            }
          }
        }
      }

      for (let i = 0; i < shapes.length; i++) {
        const a = shapes[i];
        for (let j = i + 1; j < shapes.length; j++) {
          const b = shapes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const minDist = (a.radius + b.radius) * 0.92;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (minDist - dist) * 0.5;

            if (dragRef.current.shapeId !== a.id) {
              a.x -= nx * overlap;
              a.y -= ny * overlap;
            }
            if (dragRef.current.shapeId !== b.id) {
              b.x += nx * overlap;
              b.y += ny * overlap;
            }

            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;
            const velAlongNormal = rvx * nx + rvy * ny;
            if (velAlongNormal < 0) {
              const impulse = -(1 + 0.35) * velAlongNormal * 0.5;
              if (dragRef.current.shapeId !== a.id) {
                a.vx -= impulse * nx;
                a.vy -= impulse * ny;
              }
              if (dragRef.current.shapeId !== b.id) {
                b.vx += impulse * nx;
                b.vy += impulse * ny;
              }
            }
          }
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;

        if (s.kind === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.kind === "square") {
          const size = s.radius * 1.65;
          ctx.beginPath();
          ctx.roundRect(-size / 2, -size / 2, size, size, size * 0.28);
          ctx.fill();
        } else if (s.kind === "capsule") {
          const w = s.radius * 2.15;
          const h = s.radius * 1.15;
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
          ctx.fill();
        } else if (s.kind === "triangle") {
          drawPolygon(ctx, 3, s.radius * 1.18, s.radius * 0.35);
          ctx.fill();
        } else {
          drawPolygon(ctx, 5, s.radius * 1.05, s.radius * 0.3);
          ctx.fill();
        }

        ctx.restore();
      }

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const getLocalCoords = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;

    const { x, y } = getLocalCoords(e.clientX, e.clientY);
    const shapes = shapesRef.current;

    for (let i = shapes.length - 1; i >= 0; i--) {
      const s = shapes[i];
      if (Math.hypot(s.x - x, s.y - y) <= s.radius * 1.45) {
        dragRef.current = {
          shapeId: s.id,
          offsetX: s.x - x,
          offsetY: s.y - y,
          lastX: x,
          lastY: y,
          vx: 0,
          vy: 0,
        };
        s.vx = 0;
        s.vy = 0;
        setIsGrabbing(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        return;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      pointerNormalizedRef.current = { x: nx, y: ny };

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.25;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist = Math.min(7, Math.hypot(e.clientX - cx, e.clientY - cy) / 28);
      pupilTargetX.set(Math.cos(angle) * dist);
      pupilTargetY.set(Math.sin(angle) * dist);
    }

    if (dragRef.current.shapeId === null) return;
    const { x, y } = getLocalCoords(e.clientX, e.clientY);
    const shape = shapesRef.current.find(
      (s) => s.id === dragRef.current.shapeId
    );
    if (!shape) return;

    const vx = (x - dragRef.current.lastX) * 0.9;
    const vy = (y - dragRef.current.lastY) * 0.9;
    dragRef.current.vx = vx;
    dragRef.current.vy = vy;
    dragRef.current.lastX = x;
    dragRef.current.lastY = y;

    shape.x = x + dragRef.current.offsetX;
    shape.y = y + dragRef.current.offsetY;
  };

  const handlePointerUp = () => {
    if (dragRef.current.shapeId === null) return;
    const shape = shapesRef.current.find(
      (s) => s.id === dragRef.current.shapeId
    );
    if (shape) {
      shape.vx = Math.max(-22, Math.min(22, dragRef.current.vx * 1.35));
      shape.vy = Math.max(-22, Math.min(22, dragRef.current.vy * 1.35));
      shape.vAngle = shape.vx * 0.02;
    }
    dragRef.current.shapeId = null;
    setIsGrabbing(false);
  };

  return (
    <section
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full min-h-[calc(100vh-4.5rem)] bg-[#FAF9F8] text-[#111315] overflow-hidden select-none flex flex-col items-center justify-center pt-24 pb-14 px-4 ${
        isGrabbing ? "cursor-grabbing" : ""
      }`}
    >
      {/* 2D Throwable Rigid-Body Physics Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Centered Sculptural 3D Chrome 404 + Tracking Eye */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-3xl pointer-events-none">
        <div
          ref={heroBoxRef}
          className="relative flex items-center justify-center mb-4 sm:mb-6"
        >
          {/* Floating Eye Orb Centered Above 0 */}
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 z-30 size-9 sm:size-11 rounded-full bg-white border border-[#E5E0D8] shadow-[0_6px_18px_rgba(17,19,21,0.14)] flex items-center justify-center"
          >
            <motion.span
              style={{ x: pupilX, y: pupilY }}
              className="size-3 sm:size-3.5 rounded-full bg-[#111315] block"
            />
          </motion.div>

          {/* True 3D WebGL Liquid-Chrome 404 Sculpture */}
          <div
            ref={chromeMountRef}
            aria-label="404 Not Found"
            className="w-[320px] h-[135px] sm:w-[490px] sm:h-[195px] md:w-[580px] md:h-[230px] drop-shadow-[0_18px_28px_rgba(17,19,21,0.14)]"
          />
        </div>

        {/* Minimal Editorial Copy & Action Controls */}
        <div className="relative z-40 flex flex-col items-center pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111315] text-center"
          >
            Not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base text-[#625D55] text-center leading-relaxed mt-3 max-w-sm"
          >
            There&apos;s nothing at this address.
            <br />
            The shapes are still worth a throw.
          </motion.p>

          {/* Dual Action Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full bg-[#111315] hover:bg-[#FF5500] text-white text-sm font-semibold transition-colors shadow-xs"
            >
              Home page
            </Link>

            <Link
              href="/generators"
              className="px-5 py-2.5 rounded-full bg-white border border-[#E2DDD4] hover:border-[#FF5500] text-[#111315] hover:text-[#FF5500] text-sm font-semibold transition-colors shadow-2xs"
            >
              Generators
            </Link>
          </motion.div>

          {/* Working Helper Contact Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.36 }}
            className="text-xs sm:text-[13px] text-[#7A756D] text-center leading-relaxed mt-8 max-w-md"
          >
            The page may have moved, or the link had a typo. If you need help
            finding a generator,{" "}
            <Link
              href="/contact"
              className="inline-block underline underline-offset-2 text-[#111315] hover:text-[#FF5500] font-semibold transition-colors cursor-pointer"
            >
              contact support
            </Link>
            .
          </motion.p>
        </div>
      </div>
    </section>
  );
}
