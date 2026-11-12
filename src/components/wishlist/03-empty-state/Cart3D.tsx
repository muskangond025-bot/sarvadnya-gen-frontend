"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type TrackFn = <T extends { dispose: () => void }>(item: T) => T;

/**
 * Shared procedural studio lighting & softbox reflection map so the cart scene
 * and viewport high-jump ball share identical reflections and lighting.
 */
function applyStudioEnvironment(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  track: TrackFn
) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envCanvas = document.createElement("canvas");
  envCanvas.width = 512;
  envCanvas.height = 256;
  const envCtx = envCanvas.getContext("2d");
  if (envCtx) {
    const bgGrad = envCtx.createLinearGradient(0, 0, 0, 256);
    bgGrad.addColorStop(0, "#eef3f8");
    bgGrad.addColorStop(0.28, "#ffffff");
    bgGrad.addColorStop(0.48, "#c8d4e0");
    bgGrad.addColorStop(0.55, "#ffffff");
    bgGrad.addColorStop(0.75, "#7e8a98");
    bgGrad.addColorStop(1, "#e9e3da");
    envCtx.fillStyle = bgGrad;
    envCtx.fillRect(0, 0, 512, 256);

    const warmSpot = envCtx.createRadialGradient(390, 92, 8, 390, 92, 150);
    warmSpot.addColorStop(0, "rgba(255, 246, 234, 0.95)");
    warmSpot.addColorStop(1, "transparent");
    envCtx.fillStyle = warmSpot;
    envCtx.fillRect(0, 0, 512, 256);

    const skySpot = envCtx.createRadialGradient(130, 82, 6, 130, 82, 120);
    skySpot.addColorStop(0, "rgba(210, 238, 255, 0.9)");
    skySpot.addColorStop(1, "transparent");
    envCtx.fillStyle = skySpot;
    envCtx.fillRect(0, 0, 512, 256);

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;
    track(envMap);
    envTexture.dispose();
    pmremGenerator.dispose();
  }

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
  keyLight.position.set(-3.0, 5.2, 4.6);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xfff5ea, 1.85);
  fillLight.position.set(4.5, 2.6, 3.4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xeef6ff, 2.9);
  rimLight.position.set(0.4, 4.5, -5.0);
  scene.add(rimLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);
}

/**
 * Shared 3D glossy yellow sad ball factory matching the studio sphere reference.
 */
function createSadBall(ballRadius: number, track: TrackFn) {
  const sadBallBodyMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xffd21f,
      metalness: 0.02,
      roughness: 0.28,
      clearcoat: 0.55,
      clearcoatRoughness: 0.18,
      sheen: 0.25,
      sheenRoughness: 0.45,
      sheenColor: new THREE.Color(0xfff0a0),
      envMapIntensity: 1.15,
    })
  );

  const sadBallFeatureMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x0a396d,
      metalness: 0.72,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.9,
    })
  );

  const eyeSocketMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xd9a400,
      roughness: 0.55,
      metalness: 0.05,
    })
  );

  const ballRig = new THREE.Group();
  const ballRotGroup = new THREE.Group();
  ballRig.add(ballRotGroup);

  const ballSphereGeom = track(new THREE.SphereGeometry(ballRadius, 48, 36));
  const ballSphere = new THREE.Mesh(ballSphereGeom, sadBallBodyMat);
  ballRotGroup.add(ballSphere);

  const eyeGeom = track(new THREE.SphereGeometry(ballRadius * 0.159, 28, 24));
  const eyeSocketGeom = track(
    new THREE.TorusGeometry(ballRadius * 0.167, ballRadius * 0.032, 12, 28)
  );

  for (const eyeSide of [-1, 1]) {
    const eyeAngle = eyeSide * 0.34;
    const eyeElev = 0.17;
    const ex = Math.sin(eyeAngle) * Math.cos(eyeElev) * (ballRadius - ballRadius * 0.049);
    const ey = Math.sin(eyeElev) * (ballRadius - ballRadius * 0.049);
    const ez = Math.cos(eyeAngle) * Math.cos(eyeElev) * (ballRadius - ballRadius * 0.049);

    const socketRing = new THREE.Mesh(eyeSocketGeom, eyeSocketMat);
    socketRing.position.set(ex, ey, ez);
    socketRing.lookAt(ex * 2, ey * 2, ez * 2);
    ballRotGroup.add(socketRing);

    const eyeMesh = new THREE.Mesh(eyeGeom, sadBallFeatureMat);
    eyeMesh.position.set(ex, ey, ez);
    eyeMesh.scale.set(1.0, 1.06, 0.72);
    eyeMesh.lookAt(ex * 2, ey * 2, ez * 2);
    ballRotGroup.add(eyeMesh);
  }

  const mouthPoints: THREE.Vector3[] = [];
  const mouthSamples = 18;
  for (let i = 0; i <= mouthSamples; i++) {
    const t = i / mouthSamples;
    const u = (t - 0.5) * 2;
    const yaw = u * 0.4;
    const pitch = -0.24 - 0.14 * (u * u);
    const mr = ballRadius - ballRadius * 0.012;
    mouthPoints.push(
      new THREE.Vector3(
        Math.sin(yaw) * Math.cos(pitch) * mr,
        Math.sin(pitch) * mr,
        Math.cos(yaw) * Math.cos(pitch) * mr
      )
    );
  }
  const mouthCurve = new THREE.CatmullRomCurve3(mouthPoints);
  const mouthGeom = track(
    new THREE.TubeGeometry(mouthCurve, 28, ballRadius * 0.069, 12, false)
  );
  const mouthMesh = new THREE.Mesh(mouthGeom, sadBallFeatureMat);
  ballRotGroup.add(mouthMesh);

  const mouthCapGeom = track(new THREE.SphereGeometry(ballRadius * 0.069, 14, 12));
  for (const endPt of [mouthPoints[0], mouthPoints[mouthPoints.length - 1]]) {
    const cap = new THREE.Mesh(mouthCapGeom, sadBallFeatureMat);
    cap.position.copy(endPt);
    ballRotGroup.add(cap);
  }

  ballRotGroup.rotation.y = 0.36;
  return { ballRig, ballRotGroup };
}

/**
 * Cart3D
 *
 * Interactive Three.js studio-rendered 3D shopping cart paired with a 3D
 * glossy yellow "sad ball" character that drops into the basket on mount,
 * rolls randomly inside the wires, and on click leaps high out of the cart
 * to touch the fixed top Navbar before plunging back inside the basket.
 */
export function Cart3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let cleanupJumpOverlay: (() => void) | null = null;
    const disposables: Array<{ dispose: () => void }> = [];

    const track: TrackFn = (item) => {
      disposables.push(item);
      return item;
    };

    try {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 280;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
      camera.position.set(0.12, 0.72, 5.45);
      camera.lookAt(0, 0.08, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      container.appendChild(renderer.domElement);

      applyStudioEnvironment(renderer, scene, track);

      // Materials for the tubular chrome cart
      const chromeSteelMat = track(
        new THREE.MeshPhysicalMaterial({
          color: 0x9aaec4,
          metalness: 0.86,
          roughness: 0.22,
          clearcoat: 0.35,
          clearcoatRoughness: 0.15,
          envMapIntensity: 1.35,
        })
      );

      const brushedFrameMat = track(
        new THREE.MeshPhysicalMaterial({
          color: 0x8398b0,
          metalness: 0.88,
          roughness: 0.26,
          clearcoat: 0.25,
          envMapIntensity: 1.25,
        })
      );

      const maroonGripMat = track(
        new THREE.MeshPhysicalMaterial({
          color: 0x852e36,
          metalness: 0.14,
          roughness: 0.36,
          clearcoat: 0.55,
          clearcoatRoughness: 0.22,
        })
      );

      const maroonForkMat = track(
        new THREE.MeshPhysicalMaterial({
          color: 0x7c2931,
          metalness: 0.42,
          roughness: 0.34,
          clearcoat: 0.3,
        })
      );

      const rubberTireMat = track(
        new THREE.MeshStandardMaterial({
          color: 0x1d1f24,
          metalness: 0.08,
          roughness: 0.84,
        })
      );

      const hubcapMat = track(
        new THREE.MeshStandardMaterial({
          color: 0x6f7782,
          metalness: 0.72,
          roughness: 0.28,
        })
      );

      const cartRoot = new THREE.Group();
      cartRoot.position.set(0, -0.05, 0);
      scene.add(cartRoot);

      const cartGroup = new THREE.Group();
      cartRoot.add(cartGroup);

      const unitCylGeom = track(new THREE.CylinderGeometry(1, 1, 1, 14));
      const unitSphereGeom = track(new THREE.SphereGeometry(1, 12, 10));
      const upVec = new THREE.Vector3(0, 1, 0);

      const addRod = (
        parent: THREE.Object3D,
        a: THREE.Vector3,
        b: THREE.Vector3,
        radius: number,
        mat: THREE.Material,
        capEnds = false
      ) => {
        const dir = new THREE.Vector3().subVectors(b, a);
        const len = dir.length();
        if (len < 0.0001) return;

        const mesh = new THREE.Mesh(unitCylGeom, mat);
        mesh.scale.set(radius, len, radius);
        mesh.position.copy(a).add(b).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(upVec, dir.normalize());
        parent.add(mesh);

        if (capEnds) {
          const capA = new THREE.Mesh(unitSphereGeom, mat);
          capA.scale.setScalar(radius);
          capA.position.copy(a);
          parent.add(capA);

          const capB = new THREE.Mesh(unitSphereGeom, mat);
          capB.scale.setScalar(radius);
          capB.position.copy(b);
          parent.add(capB);
        }
      };

      const rearBotY = -0.22;
      const frontBotY = -0.15;
      const topY = 0.64;

      const rbx = -0.46;
      const fbx = 0.86;
      const rtx = -0.66;
      const ftx = 1.02;

      const rbz = 0.44;
      const fbz = 0.36;
      const rtz = 0.52;
      const ftz = 0.43;

      const topFrameR = 0.024;
      const wireR = 0.0115;

      // Top Perimeter Rim
      const tlTop = new THREE.Vector3(rtx, topY, -rtz);
      const trTop = new THREE.Vector3(rtx, topY, rtz);
      const flTop = new THREE.Vector3(ftx, topY, -ftz);
      const frTop = new THREE.Vector3(ftx, topY, ftz);

      addRod(cartGroup, tlTop, flTop, topFrameR, brushedFrameMat, true);
      addRod(cartGroup, trTop, frTop, topFrameR, brushedFrameMat, true);
      addRod(cartGroup, tlTop, trTop, topFrameR, brushedFrameMat, true);
      addRod(cartGroup, flTop, frTop, topFrameR, brushedFrameMat, true);

      // Bottom Basket Perimeter Frame
      const tlBot = new THREE.Vector3(rbx, rearBotY, -rbz);
      const trBot = new THREE.Vector3(rbx, rearBotY, rbz);
      const flBot = new THREE.Vector3(fbx, frontBotY, -fbz);
      const frBot = new THREE.Vector3(fbx, frontBotY, fbz);

      addRod(cartGroup, tlBot, flBot, topFrameR, brushedFrameMat, true);
      addRod(cartGroup, trBot, frBot, topFrameR, brushedFrameMat, true);
      addRod(cartGroup, tlBot, trBot, topFrameR, brushedFrameMat, true);
      addRod(cartGroup, flBot, frBot, topFrameR, brushedFrameMat, true);

      // Corner vertical struts
      addRod(cartGroup, tlBot, tlTop, topFrameR, brushedFrameMat);
      addRod(cartGroup, trBot, trTop, topFrameR, brushedFrameMat);
      addRod(cartGroup, flBot, flTop, topFrameR, brushedFrameMat);
      addRod(cartGroup, frBot, frTop, topFrameR, brushedFrameMat);

      // Side walls: vertical ribs + horizontal wires
      const sideRibCount = 8;
      for (let i = 1; i < sideRibCount; i++) {
        const t = i / sideRibCount;
        const bLeft = new THREE.Vector3().lerpVectors(tlBot, flBot, t);
        const tLeft = new THREE.Vector3().lerpVectors(tlTop, flTop, t);
        addRod(cartGroup, bLeft, tLeft, wireR, chromeSteelMat);

        const bRight = new THREE.Vector3().lerpVectors(trBot, frBot, t);
        const tRight = new THREE.Vector3().lerpVectors(trTop, frTop, t);
        addRod(cartGroup, bRight, tRight, wireR, chromeSteelMat);
      }

      const hWireRatios = [0.26, 0.52, 0.76];
      for (const h of hWireRatios) {
        const sl = new THREE.Vector3().lerpVectors(tlBot, tlTop, h);
        const el = new THREE.Vector3().lerpVectors(flBot, flTop, h);
        addRod(cartGroup, sl, el, wireR, chromeSteelMat);

        const sr = new THREE.Vector3().lerpVectors(trBot, trTop, h);
        const er = new THREE.Vector3().lerpVectors(frBot, frTop, h);
        addRod(cartGroup, sr, er, wireR, chromeSteelMat);

        addRod(cartGroup, el, er, wireR, chromeSteelMat);
        addRod(cartGroup, sl, sr, wireR, chromeSteelMat);
      }

      // Front & Rear wall vertical ribs
      const endRibCount = 5;
      for (let i = 1; i < endRibCount; i++) {
        const t = i / endRibCount;
        const fBot = new THREE.Vector3().lerpVectors(flBot, frBot, t);
        const fTop = new THREE.Vector3().lerpVectors(flTop, frTop, t);
        addRod(cartGroup, fBot, fTop, wireR, chromeSteelMat);

        const rBot = new THREE.Vector3().lerpVectors(tlBot, trBot, t);
        const rTop = new THREE.Vector3().lerpVectors(tlTop, trTop, t);
        addRod(cartGroup, rBot, rTop, wireR, chromeSteelMat);
      }

      // Basket floor grid
      for (let i = 1; i < 6; i++) {
        const t = i / 6;
        const pL = new THREE.Vector3().lerpVectors(tlBot, trBot, t);
        const pR = new THREE.Vector3().lerpVectors(flBot, frBot, t);
        addRod(cartGroup, pL, pR, wireR, chromeSteelMat);
      }
      for (let i = 1; i < 8; i++) {
        const t = i / 8;
        const pL = new THREE.Vector3().lerpVectors(tlBot, flBot, t);
        const pR = new THREE.Vector3().lerpVectors(trBot, frBot, t);
        addRod(cartGroup, pL, pR, wireR, chromeSteelMat);
      }

      // Rear Push Handle Uprights
      for (const side of [-1, 1]) {
        const handleCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(rbx, rearBotY, side * rbz),
          new THREE.Vector3(rtx + 0.04, topY * 0.45, side * 0.48),
          new THREE.Vector3(rtx - 0.02, topY + 0.06, side * rtz),
          new THREE.Vector3(-0.78, 0.96, side * 0.49),
          new THREE.Vector3(-0.98, 1.03, side * 0.47),
        ]);
        const handleStemGeom = track(
          new THREE.TubeGeometry(handleCurve, 28, 0.025, 14, false)
        );
        const handleStem = new THREE.Mesh(handleStemGeom, brushedFrameMat);
        cartGroup.add(handleStem);
      }

      // Burgundy Ergonomic Handlebar Grip
      const gripGeom = track(new THREE.CapsuleGeometry(0.056, 0.94, 12, 24));
      const gripMesh = new THREE.Mesh(gripGeom, maroonGripMat);
      gripMesh.rotation.x = Math.PI / 2;
      gripMesh.position.set(-1.0, 1.035, 0);
      cartGroup.add(gripMesh);

      const collarGeom = track(new THREE.CylinderGeometry(0.036, 0.036, 0.05, 16));
      for (const side of [-1, 1]) {
        const collar = new THREE.Mesh(collarGeom, brushedFrameMat);
        collar.rotation.x = Math.PI / 2;
        collar.position.set(-0.98, 1.03, side * 0.47);
        cartGroup.add(collar);
      }

      // Sculpted Lower Undercarriage / Chassis Frame
      const chassisY = -0.74;
      for (const side of [-1, 1]) {
        const legCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.22, rearBotY - 0.01, side * 0.40),
          new THREE.Vector3(-0.56, -0.52, side * 0.40),
          new THREE.Vector3(-0.62, -0.66, side * 0.40),
          new THREE.Vector3(-0.48, chassisY, side * 0.40),
          new THREE.Vector3(0.18, chassisY, side * 0.39),
          new THREE.Vector3(0.84, chassisY, side * 0.37),
        ]);
        const legGeom = track(
          new THREE.TubeGeometry(legCurve, 36, 0.028, 14, false)
        );
        const legMesh = new THREE.Mesh(legGeom, brushedFrameMat);
        cartGroup.add(legMesh);

        const tipCap = new THREE.Mesh(unitSphereGeom, brushedFrameMat);
        tipCap.scale.setScalar(0.028);
        tipCap.position.set(0.84, chassisY, side * 0.37);
        cartGroup.add(tipCap);
      }

      addRod(
        cartGroup,
        new THREE.Vector3(-0.44, chassisY, -0.40),
        new THREE.Vector3(-0.44, chassisY, 0.40),
        0.026,
        brushedFrameMat
      );
      addRod(
        cartGroup,
        new THREE.Vector3(0.68, chassisY, -0.37),
        new THREE.Vector3(0.68, chassisY, 0.37),
        0.026,
        brushedFrameMat
      );
      addRod(
        cartGroup,
        new THREE.Vector3(-0.24, rearBotY - 0.02, -0.43),
        new THREE.Vector3(0.08, rearBotY - 0.015, -0.43),
        0.026,
        brushedFrameMat,
        true
      );
      addRod(
        cartGroup,
        new THREE.Vector3(-0.24, rearBotY - 0.02, 0.43),
        new THREE.Vector3(0.08, rearBotY - 0.015, 0.43),
        0.026,
        brushedFrameMat,
        true
      );

      // 4 Swivel Casters
      const wheelMeshes: THREE.Mesh[] = [];
      const tireGeom = track(new THREE.CylinderGeometry(0.135, 0.135, 0.068, 28));
      const tireRimGeom = track(new THREE.TorusGeometry(0.112, 0.026, 12, 28));
      const hubGeom = track(new THREE.CylinderGeometry(0.072, 0.072, 0.074, 24));
      const boltGeom = track(new THREE.CylinderGeometry(0.022, 0.022, 0.09, 12));
      const swivelPlateGeom = track(new THREE.CylinderGeometry(0.062, 0.055, 0.04, 18));
      const forkLegGeom = track(new THREE.BoxGeometry(0.09, 0.16, 0.026));

      const wheelPositions: Array<[number, number]> = [
        [-0.44, -0.38],
        [-0.44, 0.38],
        [0.68, -0.35],
        [0.68, 0.35],
      ];

      for (const [wx, wz] of wheelPositions) {
        const caster = new THREE.Group();
        caster.position.set(wx, chassisY - 0.02, wz);

        const swivelTop = new THREE.Mesh(swivelPlateGeom, maroonForkMat);
        swivelTop.position.set(0, -0.02, 0);
        caster.add(swivelTop);

        for (const fSide of [-1, 1]) {
          const fork = new THREE.Mesh(forkLegGeom, maroonForkMat);
          fork.position.set(-0.02, -0.11, fSide * 0.052);
          fork.rotation.z = 0.22;
          caster.add(fork);
        }

        const wheelPivot = new THREE.Group();
        wheelPivot.position.set(-0.035, -0.185, 0);

        const tire = new THREE.Mesh(tireGeom, rubberTireMat);
        tire.rotation.x = Math.PI / 2;
        wheelPivot.add(tire);
        wheelMeshes.push(tire);

        for (const rSide of [-1, 1]) {
          const rim = new THREE.Mesh(tireRimGeom, rubberTireMat);
          rim.position.z = rSide * 0.015;
          wheelPivot.add(rim);
        }

        const hub = new THREE.Mesh(hubGeom, hubcapMat);
        hub.rotation.x = Math.PI / 2;
        wheelPivot.add(hub);

        const bolt = new THREE.Mesh(boltGeom, chromeSteelMat);
        bolt.rotation.x = Math.PI / 2;
        wheelPivot.add(bolt);

        caster.add(wheelPivot);
        cartGroup.add(caster);
      }

      // Build the Sad Ball inside the cart
      const ballRadius = 0.245;
      const { ballRig, ballRotGroup } = createSadBall(ballRadius, track);
      cartGroup.add(ballRig);

      // Generous invisible hit sphere around the ball for responsive clicks
      const ballHitGeom = track(new THREE.SphereGeometry(ballRadius * 1.45, 16, 12));
      const ballHitMat = track(new THREE.MeshBasicMaterial({ visible: false }));
      const ballHitMesh = new THREE.Mesh(ballHitGeom, ballHitMat);
      ballRig.add(ballHitMesh);

      // Ground Contact Shadow
      const shadowCanvas = document.createElement("canvas");
      shadowCanvas.width = 256;
      shadowCanvas.height = 256;
      const sCtx = shadowCanvas.getContext("2d");
      if (sCtx) {
        const sGrad = sCtx.createRadialGradient(128, 128, 12, 128, 128, 118);
        sGrad.addColorStop(0, "rgba(17, 19, 21, 0.22)");
        sGrad.addColorStop(0.55, "rgba(17, 19, 21, 0.08)");
        sGrad.addColorStop(1, "rgba(17, 19, 21, 0)");
        sCtx.fillStyle = sGrad;
        sCtx.fillRect(0, 0, 256, 256);

        const shadowTex = track(new THREE.CanvasTexture(shadowCanvas));
        const shadowGeom = track(new THREE.PlaneGeometry(2.85, 1.75));
        const shadowMat = track(
          new THREE.MeshBasicMaterial({
            map: shadowTex,
            transparent: true,
            depthWrite: false,
          })
        );
        const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.set(0.1, -1.07, 0);
        cartRoot.add(shadowMesh);
      }

      // Basket physics helpers
      const getBasketFloorY = (x: number) => {
        const tx = THREE.MathUtils.clamp((x - rbx) / (fbx - rbx), 0, 1);
        return THREE.MathUtils.lerp(rearBotY, frontBotY, tx) + ballRadius + 0.015;
      };

      const getBasketBounds = (x: number, y: number) => {
        const th = THREE.MathUtils.clamp((y - rearBotY) / (topY - rearBotY), 0, 1);
        const minX = THREE.MathUtils.lerp(rbx, rtx, th) + ballRadius + 0.035;
        const maxX = THREE.MathUtils.lerp(fbx, ftx, th) - ballRadius - 0.035;
        const tx = THREE.MathUtils.clamp((x - rbx) / (fbx - rbx), 0, 1);
        const botZ = THREE.MathUtils.lerp(rbz, fbz, tx);
        const topZ = THREE.MathUtils.lerp(rtz, ftz, tx);
        const maxZ = THREE.MathUtils.lerp(botZ, topZ, th) - ballRadius - 0.035;
        return { minX, maxX, maxZ };
      };

      // Physics State
      const ballPos = new THREE.Vector3(0.22, 2.35, 0.04);
      const ballVel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.28,
        -0.4,
        (Math.random() - 0.5) * 0.22
      );
      let hasEnteredBasket = false;
      let isHighJumping = false;
      let nextWanderTime = 1.65;
      let wanderDirX = (Math.random() > 0.5 ? 1 : -1) * 0.45;
      let wanderDirZ = (Math.random() > 0.5 ? 1 : -1) * 0.35;
      let squashY = 1;
      let squashVel = 0;
      let cartDipY = 0;
      let cartDipVel = 0;

      // Interactive drag & pointer tilt state
      let targetRotY = -0.36;
      let currentRotY = -0.36;
      let targetRotX = 0.08;
      let currentRotX = 0.08;
      let isDragging = false;
      let dragDistance = 0;
      let lastX = 0;
      let lastY = 0;

      const dom = renderer.domElement;
      const raycaster = new THREE.Raycaster();
      const pointerNdc = new THREE.Vector2();

      // Projects a local point inside cartGroup into viewport client pixel coordinates
      const projectCartPointToViewport = (localPt: THREE.Vector3) => {
        cartGroup.updateMatrixWorld(true);
        camera.updateMatrixWorld(true);
        const worldPt = localPt.clone().applyMatrix4(cartGroup.matrixWorld);
        const projected = worldPt.clone().project(camera);
        const rect = dom.getBoundingClientRect();
        const screenX = rect.left + ((projected.x + 1) / 2) * rect.width;
        const screenY = rect.top + ((1 - projected.y) / 2) * rect.height;

        // Compute rendered pixel radius using a horizontal tangent offset in camera space
        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
        const edgeWorld = worldPt.clone().addScaledVector(camRight, ballRadius);
        const edgeProj = edgeWorld.project(camera);
        const edgeX = rect.left + ((edgeProj.x + 1) / 2) * rect.width;
        const pxRadius = Math.max(22, Math.abs(edgeX - screenX));

        return { screenX, screenY, pxRadius };
      };

      // Launches the real 3D Sad Ball upward out of the cart box to touch the top Navbar and return
      const launchNavbarHighJump = () => {
        if (isHighJumping || !hasEnteredBasket) return;
        isHighJumping = true;
        ballRig.visible = false;

        const { screenX: startX, screenY: startY, pxRadius } =
          projectCartPointToViewport(ballPos);

        const navEl = document.querySelector(
          '[data-testid="site-header"] nav'
        ) as HTMLElement | null;
        const navRect = navEl?.getBoundingClientRect();
        const navBottom = navRect ? Math.max(navRect.bottom, 48) : 72;
        const peakY = navBottom + pxRadius * 0.72;
        const peakX = startX + (Math.random() - 0.5) * 44;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const overlayRenderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        overlayRenderer.setSize(vw, vh);
        overlayRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        overlayRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        overlayRenderer.toneMappingExposure = 1.2;
        overlayRenderer.outputColorSpace = THREE.SRGBColorSpace;

        const overlayCanvas = overlayRenderer.domElement;
        overlayCanvas.style.position = "fixed";
        overlayCanvas.style.inset = "0";
        overlayCanvas.style.width = "100vw";
        overlayCanvas.style.height = "100vh";
        overlayCanvas.style.pointerEvents = "none";
        overlayCanvas.style.zIndex = "45";
        document.body.appendChild(overlayCanvas);

        const overlayDisposables: Array<{ dispose: () => void }> = [];
        const oTrack: TrackFn = (item) => {
          overlayDisposables.push(item);
          return item;
        };

        const overlayScene = new THREE.Scene();
        const overlayCam = new THREE.OrthographicCamera(0, vw, vh, 0, -500, 500);
        applyStudioEnvironment(overlayRenderer, overlayScene, oTrack);

        const { ballRig: flyRig, ballRotGroup: flyRot } = createSadBall(
          pxRadius,
          oTrack
        );
        flyRot.rotation.y = ballRotGroup.rotation.y;
        overlayScene.add(flyRig);

        let jumpRaf = 0;
        let finished = false;
        const jumpStartMs = performance.now();
        const totalDurationMs = 1120;

        const cleanup = () => {
          if (finished) return;
          finished = true;
          cancelAnimationFrame(jumpRaf);
          for (const d of overlayDisposables) d.dispose();
          overlayRenderer.dispose();
          if (overlayCanvas.parentNode) {
            overlayCanvas.parentNode.removeChild(overlayCanvas);
          }
          cleanupJumpOverlay = null;
        };

        cleanupJumpOverlay = cleanup;

        // Basket target local coordinates for clean re-entry drop
        const returnLocalX = THREE.MathUtils.clamp(
          0.18 + (Math.random() - 0.5) * 0.4,
          rbx + ballRadius + 0.08,
          fbx - ballRadius - 0.08
        );
        const returnLocalZ = (Math.random() - 0.5) * 0.25;
        const returnLocalEntry = new THREE.Vector3(
          returnLocalX,
          topY + 0.05,
          returnLocalZ
        );

        const tickJump = (now: number) => {
          const elapsed = now - jumpStartMs;
          const u = Math.min(elapsed / totalDurationMs, 1);

          const { screenX: landX, screenY: landY } =
            projectCartPointToViewport(returnLocalEntry);

          let curX = startX;
          let curY = startY;
          let sY = 1;

          if (u < 0.44) {
            // Soar smoothly up out of the cart toward the bottom of the Navbar
            const p = u / 0.44;
            const easeOut = 1 - Math.pow(1 - p, 2.35);
            curX = THREE.MathUtils.lerp(startX, peakX, easeOut);
            curY = THREE.MathUtils.lerp(startY, peakY, easeOut);
            sY = 1 + 0.13 * Math.sin(p * Math.PI);
          } else if (u < 0.58) {
            // Brief elastic squish tap right against the Navbar pill
            const p = (u - 0.44) / 0.14;
            const squish = Math.sin(p * Math.PI);
            curX = peakX;
            curY = peakY - squish * (pxRadius * 0.14);
            sY = 1 - 0.24 * squish;
          } else {
            // Accelerate under gravity straight back down into the moving cart basket
            const p = (u - 0.58) / 0.42;
            const easeIn = Math.pow(p, 1.9);
            curX = THREE.MathUtils.lerp(peakX, landX, easeIn);
            curY = THREE.MathUtils.lerp(peakY, landY, easeIn);
            sY = 1 + 0.11 * Math.sin(p * Math.PI);
          }

          const sXZ = 1 / Math.sqrt(sY);
          // Orthographic Y runs bottom=0..top=vh, so invert viewport top-down Y
          flyRig.position.set(curX, vh - curY, 0);
          flyRig.scale.set(sXZ, sY, sXZ);
          flyRot.rotation.z = Math.sin(u * Math.PI * 2) * 0.22;
          flyRot.rotation.x = Math.cos(u * Math.PI * 2) * 0.14;

          overlayRenderer.render(overlayScene, overlayCam);

          if (u < 1) {
            jumpRaf = requestAnimationFrame(tickJump);
          } else {
            cleanup();
            // Hand off seamlessly back to in-basket 3D physics with energetic landing
            ballPos.copy(returnLocalEntry);
            ballVel.set(
              (Math.random() - 0.5) * 1.1,
              -4.8,
              (Math.random() - 0.5) * 0.9
            );
            squashY = 0.86;
            ballRig.visible = true;
            isHighJumping = false;
          }
        };

        jumpRaf = requestAnimationFrame(tickJump);
      };

      const isPointerOverBall = (clientX: number, clientY: number): boolean => {
        if (isHighJumping) return false;
        const rect = dom.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNdc, camera);
        return raycaster.intersectObject(ballHitMesh, false).length > 0;
      };

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        dragDistance = 0;
        lastX = e.clientX;
        lastY = e.clientY;
        dom.style.cursor = isPointerOverBall(e.clientX, e.clientY)
          ? "pointer"
          : "grabbing";
        renderer?.domElement.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (isDragging) {
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          dragDistance += Math.abs(dx) + Math.abs(dy);
          targetRotY += dx * 0.011;
          targetRotX = THREE.MathUtils.clamp(targetRotX + dy * 0.005, -0.18, 0.35);
          lastX = e.clientX;
          lastY = e.clientY;
        } else {
          const rect = container.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          targetRotX = 0.08 + ny * 0.06;
          targetRotY = -0.36 + nx * 0.22;
          dom.style.cursor = isPointerOverBall(e.clientX, e.clientY)
            ? "pointer"
            : "grab";
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (isDragging) {
          isDragging = false;
          // Clicking the ball (or a clean tap on the cart) launches the high Navbar jump!
          if (dragDistance < 12 && hasEnteredBasket && !isHighJumping) {
            launchNavbarHighJump();
          }
          dom.style.cursor = isPointerOverBall(e.clientX, e.clientY)
            ? "pointer"
            : "grab";
          try {
            renderer?.domElement.releasePointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
      };

      dom.style.cursor = "grab";
      dom.addEventListener("pointerdown", onPointerDown);
      dom.addEventListener("pointermove", onPointerMove);
      dom.addEventListener("pointerup", onPointerUp);
      dom.addEventListener("pointerleave", onPointerUp);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 280;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.045);
        const t = clock.elapsedTime;

        const swayY = isDragging ? 0 : Math.sin(t * 0.85) * 0.14;
        const desiredY = targetRotY + swayY;

        const prevRotY = currentRotY;
        currentRotY += (desiredY - currentRotY) * 0.08;
        currentRotX += (targetRotX - currentRotX) * 0.08;

        const dipForce = -cartDipY * 90 - cartDipVel * 11;
        cartDipVel += dipForce * dt;
        cartDipY += cartDipVel * dt;

        cartRoot.rotation.y = currentRotY;
        cartRoot.rotation.x = currentRotX;
        cartRoot.position.y = -0.05 + cartDipY + Math.sin(t * 1.4) * 0.01;

        const deltaRot = currentRotY - prevRotY;
        for (const wheel of wheelMeshes) {
          wheel.rotation.y += deltaRot * 2.2;
        }

        if (!isHighJumping) {
          ballVel.y -= 11.2 * dt;

          if (!hasEnteredBasket && ballPos.y < topY + 0.1) {
            hasEnteredBasket = true;
          }

          if (hasEnteredBasket) {
            if (t >= nextWanderTime) {
              nextWanderTime = t + 0.9 + Math.random() * 1.3;
              wanderDirX = (Math.random() - 0.5) * 1.35;
              wanderDirZ = (Math.random() - 0.5) * 1.05;
              if (
                Math.abs(ballPos.y - getBasketFloorY(ballPos.x)) < 0.04 &&
                Math.random() > 0.35
              ) {
                ballVel.y += 1.05 + Math.random() * 0.9;
              }
            }

            ballVel.x += (wanderDirX + Math.sin(t * 2.1) * 0.25) * dt;
            ballVel.z += (wanderDirZ + Math.cos(t * 1.7) * 0.25) * dt;

            ballVel.x *= 1 - 0.65 * dt;
            ballVel.z *= 1 - 0.65 * dt;
          }

          ballPos.addScaledVector(ballVel, dt);

          const floorY = getBasketFloorY(ballPos.x);
          if (ballPos.y <= floorY) {
            const impactSpeed = -ballVel.y;
            ballPos.y = floorY;

            if (impactSpeed > 0.45) {
              ballVel.y = impactSpeed * 0.48;
              squashY = THREE.MathUtils.clamp(1 - impactSpeed * 0.045, 0.78, 0.95);
              cartDipVel -= Math.min(impactSpeed * 0.16, 0.75);
              if (impactSpeed > 1.2) {
                ballVel.x += (Math.random() - 0.5) * 0.9;
                ballVel.z += (Math.random() - 0.5) * 0.7;
              }
            } else {
              ballVel.y = 0;
            }
          }

          if (hasEnteredBasket) {
            const bounds = getBasketBounds(ballPos.x, ballPos.y);
            if (ballPos.x < bounds.minX) {
              ballPos.x = bounds.minX;
              ballVel.x = Math.abs(ballVel.x) * 0.75 + 0.15;
              wanderDirX = Math.abs(wanderDirX);
            } else if (ballPos.x > bounds.maxX) {
              ballPos.x = bounds.maxX;
              ballVel.x = -Math.abs(ballVel.x) * 0.75 - 0.15;
              wanderDirX = -Math.abs(wanderDirX);
            }

            if (ballPos.z < -bounds.maxZ) {
              ballPos.z = -bounds.maxZ;
              ballVel.z = Math.abs(ballVel.z) * 0.75 + 0.15;
              wanderDirZ = Math.abs(wanderDirZ);
            } else if (ballPos.z > bounds.maxZ) {
              ballPos.z = bounds.maxZ;
              ballVel.z = -Math.abs(ballVel.z) * 0.75 - 0.15;
              wanderDirZ = -Math.abs(wanderDirZ);
            }
          }

          const squashForce = (1 - squashY) * 140 - squashVel * 12;
          squashVel += squashForce * dt;
          squashY += squashVel * dt;
          const stretchXZ = 1 / Math.sqrt(Math.max(squashY, 0.65));

          ballRig.position.copy(ballPos);
          ballRig.scale.set(stretchXZ, squashY, stretchXZ);

          const targetRollZ = THREE.MathUtils.clamp(-ballVel.x * 0.35, -0.45, 0.45);
          const targetPitchX = THREE.MathUtils.clamp(ballVel.z * 0.38, -0.4, 0.4);
          const targetFaceYaw =
            -currentRotY * 0.45 + THREE.MathUtils.clamp(ballVel.x * 0.45, -0.48, 0.48);

          ballRotGroup.rotation.z += (targetRollZ - ballRotGroup.rotation.z) * 0.14;
          ballRotGroup.rotation.x += (targetPitchX - ballRotGroup.rotation.x) * 0.14;
          ballRotGroup.rotation.y += (targetFaceYaw - ballRotGroup.rotation.y) * 0.08;
        }

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        cleanupJumpOverlay?.();
        resizeObserver.disconnect();
        dom.removeEventListener("pointerdown", onPointerDown);
        dom.removeEventListener("pointermove", onPointerMove);
        dom.removeEventListener("pointerup", onPointerUp);
        dom.removeEventListener("pointerleave", onPointerUp);
        for (const d of disposables) {
          d.dispose();
        }
        renderer?.dispose();
        if (dom.parentNode === container) {
          container.removeChild(dom);
        }
      };
    } catch {
      return undefined;
    }
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full max-w-[420px] h-[250px] sm:h-[290px] mx-auto select-none touch-none"
      aria-label="3D Empty Shopping Cart Illustration"
      role="img"
    />
  );
}
