import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Brand palette ─────────────────────────────────────────────────────────────
const GOLD   = new THREE.Color("#C8A25A");
const GOLD2  = new THREE.Color("#D6B599");
const FOG_COLOR = new THREE.Color("#060504");

// ── Constants ─────────────────────────────────────────────────────────────────
const FRAME_COUNT  = 22;
const FRAME_SPACING = 3.2;
const TOTAL_LENGTH  = FRAME_COUNT * FRAME_SPACING;

// ── Build a closed rect line loop ─────────────────────────────────────────────
function makeRectGeo(W: number, H: number) {
  return new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-W, -H / 2, 0),
    new THREE.Vector3(-W,  H / 2, 0),
    new THREE.Vector3( W,  H / 2, 0),
    new THREE.Vector3( W, -H / 2, 0),
    new THREE.Vector3(-W, -H / 2, 0),
  ]);
}

// ── Single wireframe arch frame ───────────────────────────────────────────────
function ArchFrame({ z, pulse }: { z: number; pulse: number }) {
  const outerMat = useMemo(() => new THREE.LineBasicMaterial({
    color: GOLD, transparent: true, opacity: 0.65, depthWrite: false,
  }), []);
  const innerMat = useMemo(() => new THREE.LineBasicMaterial({
    color: GOLD, transparent: true, opacity: 0.18, depthWrite: false,
  }), []);

  const outer = useMemo(() => new THREE.Line(makeRectGeo(2.4, 3.2), outerMat), [outerMat]);
  const inner = useMemo(() => new THREE.Line(makeRectGeo(1.9, 2.6), innerMat), [innerMat]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const intensity = 0.55 + 0.45 * Math.sin(t * 1.4 + pulse);
    outerMat.color.lerpColors(GOLD, GOLD2, intensity);
    outerMat.opacity = 0.22 + 0.58 * intensity;
  });

  return (
    <group position={[0, 0.4, z]}>
      <primitive object={outer} />
      <primitive object={inner} />
    </group>
  );
}

// ── Corridor: scrolls frames along Z, loops seamlessly ───────────────────────
function Corridor() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Advance along Z toward camera (negative Z = forward in Three.js)
    const speed = 1.4; // units per second
    const offset = (clock.elapsedTime * speed) % FRAME_SPACING;
    groupRef.current.position.z = offset;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: FRAME_COUNT }, (_, i) => (
        <ArchFrame
          key={i}
          z={-i * FRAME_SPACING}
          pulse={(i / FRAME_COUNT) * Math.PI * 2}
        />
      ))}
    </group>
  );
}

// ── Floor grid lines ──────────────────────────────────────────────────────────
function FloorGrid() {
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = 12;
    for (let i = -count; i <= count; i++) {
      // Along Z
      pts.push(new THREE.Vector3(i * 0.4, -1.2, -TOTAL_LENGTH));
      pts.push(new THREE.Vector3(i * 0.4, -1.2, 2));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={GOLD} transparent opacity={0.06} depthWrite={false} />
    </lineSegments>
  );
}

// ── Floating light pulses ─────────────────────────────────────────────────────
function LightPulses() {
  const COUNT = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const data = useMemo(() => Array.from({ length: COUNT }, () => ({
    x: (Math.random() - 0.5) * 5.2,
    y: (Math.random() - 0.5) * 3.8,
    z: -Math.random() * TOTAL_LENGTH,
    speed: 0.4 + Math.random() * 1.2,
    phase: Math.random() * Math.PI * 2,
    size:  0.012 + Math.random() * 0.025,
  })), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    data.forEach((p, i) => {
      // Move toward camera
      let z = p.z + t * p.speed;
      z = ((z % TOTAL_LENGTH) + TOTAL_LENGTH) % TOTAL_LENGTH - TOTAL_LENGTH;
      const flicker = 0.4 + 0.6 * Math.abs(Math.sin(t * 2.1 + p.phase));
      dummy.position.set(p.x, p.y, z);
      const s = p.size * flicker;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, GOLD2.clone().multiplyScalar(flicker));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color={GOLD2} transparent opacity={0.85} depthWrite={false} />
    </instancedMesh>
  );
}

// ── Star field ────────────────────────────────────────────────────────────────
function Stars() {
  const geo = useMemo(() => {
    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = -Math.random() * TOTAL_LENGTH;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial
        color={GOLD2}
        size={0.018}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Inner scene ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <fog attach="fog" args={[FOG_COLOR, 4, TOTAL_LENGTH * 0.72]} />
      <Corridor />
      <FloorGrid />
      <LightPulses />
      <Stars />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function HeroScene({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0.4, 3.8], fov: 58 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
