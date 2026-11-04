import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Fan3DProps {
  speedLevel: number; // 1 to 5
  isRotating?: boolean;
  className?: string;
}

export const Fan3D: React.FC<Fan3DProps> = ({
  speedLevel = 3,
  isRotating = true,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const speedRef = useRef(speedLevel);
  const isRotatingRef = useRef(isRotating);

  useEffect(() => {
    speedRef.current = speedLevel;
  }, [speedLevel]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Detect software-rendered WebGL
    const isSoftwareGl = (() => {
      try {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();

    // Camera positioned slightly below the ceiling fan, looking upwards with natural perspective
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.0);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.appendChild(renderer.domElement);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0c1b30, 3.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe2f0ff, 3.8);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 4.8);
    rimLight.position.set(-3, 1, -2);
    scene.add(rimLight);

    // Upward specular rim light giving the blades the luminous cyan glow underneath
    const upwardRimLight = new THREE.DirectionalLight(0x00d8ff, 3.2);
    upwardRimLight.position.set(0, -2, 2);
    scene.add(upwardRimLight);

    const cyanGlowLight = new THREE.PointLight(0x00f0ff, 9.0, 8, 1.1);
    cyanGlowLight.position.set(0, 0.65, 0);
    scene.add(cyanGlowLight);

    // Fan Structure Group positioned near ceiling top
    const fanGroup = new THREE.Group();
    scene.add(fanGroup);
    fanGroup.position.set(0, 0.9, 0);

    // Ceiling Mount Canopy
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.88,
    });

    const canopyGeo = new THREE.CylinderGeometry(0.32, 0.42, 0.18, 36);
    const canopy = new THREE.Mesh(canopyGeo, darkMetalMat);
    canopy.position.y = 0.95;
    fanGroup.add(canopy);

    // Downrod
    const rodGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 20);
    const rod = new THREE.Mesh(rodGeo, darkMetalMat);
    rod.position.y = 0.55;
    fanGroup.add(rod);

    // Upper motor bell
    const bellGeo = new THREE.CylinderGeometry(0.38, 0.58, 0.24, 36);
    const bell = new THREE.Mesh(bellGeo, darkMetalMat);
    bell.position.y = 0.14;
    fanGroup.add(bell);

    // Rotating Hub and Blades Group
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 0, 0);
    fanGroup.add(rotorGroup);

    // Central Motor Hub
    const hubGeo = new THREE.CylinderGeometry(0.68, 0.64, 0.22, 44);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.2,
      metalness: 0.92,
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    rotorGroup.add(hub);

    // Luminous Electric Blue Halo Ring
    const haloGeo = new THREE.TorusGeometry(0.56, 0.065, 24, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.y = -0.11;
    rotorGroup.add(haloRing);

    // Inner frosted lens
    const lensGeo = new THREE.CircleGeometry(0.5, 36);
    const lensMat = new THREE.MeshBasicMaterial({
      color: 0x0088ff,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.y = -0.12;
    rotorGroup.add(lens);

    // 5 Aerodynamic Curved Fan Blades (matching high-end smart ceiling fan look)
    const bladeCount = 5;
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x141d2d,
      roughness: 0.25,
      metalness: 0.8,
      side: THREE.DoubleSide,
    });

    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, -0.14);
    bladeShape.lineTo(2.0, -0.26);
    bladeShape.quadraticCurveTo(2.65, -0.22, 2.75, 0);
    bladeShape.quadraticCurveTo(2.65, 0.22, 2.0, 0.26);
    bladeShape.lineTo(0, 0.14);
    bladeShape.closePath();

    const extrudeSettings = {
      depth: 0.024,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
    bladeGeo.center();

    for (let i = 0; i < bladeCount; i++) {
      const angle = (i * Math.PI * 2) / bladeCount;
      const bladeHolder = new THREE.Group();
      bladeHolder.rotation.y = angle;

      // Chrome blade bracket connector
      const bracketGeo = new THREE.BoxGeometry(0.42, 0.05, 0.14);
      const bracket = new THREE.Mesh(bracketGeo, darkMetalMat);
      bracket.position.x = 0.58;
      bladeHolder.add(bracket);

      const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
      bladeMesh.position.x = 1.75;
      bladeMesh.rotation.x = -0.12; // Realistic aerodynamic pitch
      bladeMesh.rotation.z = -0.015;
      bladeHolder.add(bladeMesh);

      rotorGroup.add(bladeHolder);
    }

    // Downward Airflow Streamlines
    const streamGroup = new THREE.Group();
    scene.add(streamGroup);
    streamGroup.position.set(0, 0.75, 0);

    const streamLines: THREE.Line[] = [];
    const streamCount = 24;

    for (let i = 0; i < streamCount; i++) {
      const baseAngle = (i * Math.PI * 2) / streamCount;
      const radiusTop = 0.55 + Math.random() * 0.25;
      const radiusBottom = 2.2 + Math.random() * 0.8;
      const swirl = 1.4;

      const curvePoints: THREE.Vector3[] = [];
      const segments = 24;
      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const currentRadius = THREE.MathUtils.lerp(radiusTop, radiusBottom, Math.pow(t, 1.3));
        const theta = baseAngle + t * swirl;
        const x = Math.cos(theta) * currentRadius;
        const z = Math.sin(theta) * currentRadius;
        const y = -t * 2.5;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25 + (i % 3) * 0.15,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(lineGeo, lineMat);
      streamGroup.add(line);
      streamLines.push(line);
    }

    // Concentric Airflow Expansion Ripples
    const ringGroup = new THREE.Group();
    fanGroup.add(ringGroup);

    const createRippleRing = (radius: number, yPos: number, opacity: number) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.025, radius + 0.025, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00e1ff,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = yPos;
      return ring;
    };

    const ripple1 = createRippleRing(1.4, 0.25, 0.35);
    const ripple2 = createRippleRing(2.1, 0.45, 0.22);
    const ripple3 = createRippleRing(2.8, 0.65, 0.14);
    ringGroup.add(ripple1, ripple2, ripple3);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.25;
      mouseY = y * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId = 0;
    let timeoutId: number | undefined;
    let currentSpeed = 0.05;
    let angleProgress = 0;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const glCtx = renderer.getContext() as WebGL2RenderingContext;
      const sync = glCtx.fenceSync(glCtx.SYNC_GPU_COMMANDS_COMPLETE, 0);
      glCtx.flush();
      const poll = () => {
        const state = sync && glCtx.getSyncParameter(sync, glCtx.SYNC_STATUS);
        if (state === glCtx.UNSIGNALED) {
          timeoutId = window.setTimeout(poll, 6);
        } else {
          if (sync) glCtx.deleteSync(sync);
          timeoutId = window.setTimeout(cb, 60);
        }
      };
      timeoutId = window.setTimeout(poll, 6);
    }

    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const targetSpeed = isRotatingRef.current ? 0.025 + speedRef.current * 0.028 : 0;
      currentSpeed = THREE.MathUtils.damp(currentSpeed, targetSpeed, 4, delta);

      rotorGroup.rotation.y += currentSpeed;
      streamGroup.rotation.y += currentSpeed * 0.75;

      angleProgress += delta * 2;
      const pulse = 1 + Math.sin(angleProgress) * 0.12;
      haloRing.scale.set(pulse, pulse, pulse);
      ripple1.scale.setScalar(1 + Math.sin(angleProgress * 0.7) * 0.08);
      ripple2.scale.setScalar(1 + Math.sin(angleProgress * 0.7 + 1) * 0.08);

      fanGroup.rotation.y = THREE.MathUtils.damp(fanGroup.rotation.y, mouseX, 3, delta);
      fanGroup.rotation.x = THREE.MathUtils.damp(fanGroup.rotation.x, -mouseY * 0.5, 3, delta);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(() => animate(performance.now()));
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate(performance.now());

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      canopyGeo.dispose();
      rodGeo.dispose();
      bellGeo.dispose();
      hubGeo.dispose();
      haloGeo.dispose();
      lensGeo.dispose();
      bladeGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
      data-testid="threejs-fan-canvas"
    >
      {!webglSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/80 rounded-2xl border border-cyan-500/30">
          <div className="w-24 h-24 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mb-4" />
          <p className="text-cyan-300 font-medium">3D Ceiling Fan Active (Simulated Flow)</p>
          <p className="text-xs text-slate-400 mt-1">Speed Level: {speedLevel} / 5</p>
        </div>
      )}
    </div>
  );
};
