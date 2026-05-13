import { useEffect, useRef } from "react";

// ── Gold palette ──────────────────────────────────────────────────────────────
const GOLD = {
  star:   [255, 248, 215] as const, // near-white star highlight
  bright: [228, 192, 122] as const, // accent-light
  mid:    [200, 162, 90]  as const, // accent
  warm:   [175, 130, 60]  as const, // warm dim
  deep:   [130,  95, 38]  as const, // deep back
};

type RGB = readonly [number, number, number];
const rgba = ([r, g, b]: RGB, a: number) =>
  `rgba(${r},${g},${b},${Math.min(1, Math.max(0, a)).toFixed(3)})`;

// ── 3D math ───────────────────────────────────────────────────────────────────
const rotY = (x: number, y: number, z: number, a: number) => {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: x * c + z * s, y, z: -x * s + z * c };
};
const rotX = (x: number, y: number, z: number, a: number) => {
  const c = Math.cos(a), s = Math.sin(a);
  return { x, y: y * c - z * s, z: y * s + z * c };
};
const project = (x: number, y: number, z: number, fov: number, cx: number, cy: number) => {
  const s = fov / (fov + z + fov * 0.4);
  return { sx: x * s + cx, sy: y * s + cy, s };
};

// ── Particle definitions ───────────────────────────────────────────────────────
interface Pt {
  phi: number;
  theta: number;
  phiWobble: number;  // breathing phase per particle
  rOff: number;       // radius offset (shell thickness)
  glowR: number;      // max glow radius at full depth
  color: RGB;
  baseOpacity: number;
  isRing: boolean;
}

export default function ParticleCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ nx: 0.5, ny: 0.5 }); // normalized 0..1
  const tiltRef   = useRef({ x: 0, y: 0 });        // smoothed tilt

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PR = Math.min(window.devicePixelRatio, 2);
    let W = 0, H = 0, CX = 0, CY = 0, BASE_R = 0;
    let raf = 0, t = 0;
    let pts: Pt[] = [];

    // ── Build particle set ──────────────────────────────────────────────────
    const build = () => {
      pts = [];
      const SURFACE = 280;
      const RING    = 52;
      const POLECAP = 24; // extra bright at poles

      // Surface — uniform spherical distribution
      for (let i = 0; i < SURFACE; i++) {
        const phi   = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const lat   = Math.abs(Math.cos(phi)); // 0=equator 1=pole

        let color: RGB, glowR: number, baseOpacity: number;
        const rnd = Math.random();

        if (rnd < 0.035) {
          // Rare bright star sparks
          color = GOLD.star; glowR = 1.5 + Math.random() * 2.5; baseOpacity = 0.9;
        } else if (lat > 0.75 || rnd < 0.12) {
          color = GOLD.bright; glowR = 5 + Math.random() * 9;  baseOpacity = 0.45 + Math.random() * 0.35;
        } else if (rnd < 0.45) {
          color = GOLD.mid;    glowR = 4 + Math.random() * 7;  baseOpacity = 0.18 + Math.random() * 0.28;
        } else if (rnd < 0.75) {
          color = GOLD.warm;   glowR = 3 + Math.random() * 5;  baseOpacity = 0.10 + Math.random() * 0.18;
        } else {
          color = GOLD.deep;   glowR = 2 + Math.random() * 4;  baseOpacity = 0.06 + Math.random() * 0.12;
        }

        pts.push({ phi, theta, phiWobble: Math.random() * Math.PI * 2,
          rOff: (Math.random() - 0.5) * 0.06, glowR, color, baseOpacity, isRing: false });
      }

      // Pole caps — concentrated bright cluster at both poles
      for (let i = 0; i < POLECAP; i++) {
        const northOrSouth = i < POLECAP / 2 ? 0 : Math.PI;
        pts.push({
          phi: northOrSouth + (Math.random() - 0.5) * 0.45,
          theta: Math.random() * Math.PI * 2,
          phiWobble: Math.random() * Math.PI * 2,
          rOff: 0,
          glowR: 8 + Math.random() * 14,
          color: Math.random() < 0.4 ? GOLD.star : GOLD.bright,
          baseOpacity: 0.55 + Math.random() * 0.35,
          isRing: false,
        });
      }

      // Equatorial ring — perfectly aligned at phi = π/2
      for (let i = 0; i < RING; i++) {
        pts.push({
          phi: Math.PI / 2 + (Math.random() - 0.5) * 0.08,
          theta: (i / RING) * Math.PI * 2,
          phiWobble: 0,
          rOff: 0.06 + Math.random() * 0.06, // ring sits slightly outside sphere
          glowR: 6 + Math.random() * 10,
          color: Math.random() < 0.35 ? GOLD.bright : GOLD.mid,
          baseOpacity: 0.55 + Math.random() * 0.35,
          isRing: true,
        });
      }
    };

    // ── Resize ─────────────────────────────────────────────────────────────
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = Math.round(W * PR);
      canvas.height = Math.round(H * PR);
      ctx.scale(PR, PR);
      CX = W / 2;
      CY = H / 2;
      BASE_R = Math.min(W, H) * 0.40;
      build();
    };

    // ── Draw one particle ──────────────────────────────────────────────────
    const drawPt = (sx: number, sy: number, r: number, color: RGB, opacity: number) => {
      if (r < 0.4 || opacity < 0.015) return;
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r);
      g.addColorStop(0,    rgba(color, opacity));
      g.addColorStop(0.38, rgba(color, opacity * 0.55));
      g.addColorStop(1,    rgba(color, 0));
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";
      t += 0.007;

      // Smooth tilt toward mouse
      const targetTiltX = (mouseRef.current.ny - 0.5) * 0.45;
      const targetTiltY = (mouseRef.current.nx - 0.5) * 0.55;
      tiltRef.current.x += (targetTiltX - tiltRef.current.x) * 0.04;
      tiltRef.current.y += (targetTiltY - tiltRef.current.y) * 0.04;

      // Breathing radius
      const R  = BASE_R * (1 + Math.sin(t * 0.38) * 0.022);
      const rotAngleY = t * 0.16 + tiltRef.current.y;
      const rotAngleX = -0.22 + tiltRef.current.x;
      const FOV = Math.max(W, H) * 0.85;

      // ── Ambient core glow ────────────────────────────────────────────
      ctx.globalAlpha = 0.055;
      const amb = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.85);
      amb.addColorStop(0, rgba(GOLD.mid, 1));
      amb.addColorStop(1, rgba(GOLD.mid, 0));
      ctx.beginPath();
      ctx.arc(CX, CY, R * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = amb;
      ctx.fill();
      ctx.globalAlpha = 1;

      // ── Collect draw commands (depth sort) ──────────────────────────
      type Cmd = { sx: number; sy: number; r: number; color: RGB; op: number; z: number };
      const cmds: Cmd[] = [];

      for (const p of pts) {
        // Breathing wobble per particle
        const wobble = Math.sin(t * 0.28 + p.phiWobble) * 0.018;
        const phi    = p.phi + wobble;
        const animTheta = p.theta + t * 0.16; // all particles rotate together

        // Spherical → Cartesian
        const r3 = R * (1 + p.rOff);
        let pos = {
          x: r3 * Math.sin(phi) * Math.cos(animTheta),
          y: r3 * Math.cos(phi),
          z: r3 * Math.sin(phi) * Math.sin(animTheta),
        };

        // Apply rotations
        let rot = rotY(pos.x, pos.y, pos.z, rotAngleY);
        rot     = rotX(rot.x,  rot.y,  rot.z,  rotAngleX);

        // Perspective projection
        const { sx, sy, s } = project(rot.x, rot.y, rot.z, FOV, CX, CY);

        // Depth factor: 0 = far back, 1 = front face
        const depth = (rot.z + R * 1.1) / (R * 2.2);

        const opacity  = p.baseOpacity * (0.08 + depth * 0.92);
        const glowSize = p.glowR * s * (0.18 + depth * 0.82);

        cmds.push({ sx, sy, r: glowSize, color: p.color, op: opacity, z: rot.z });
      }

      // Painter's algorithm: back to front
      cmds.sort((a, b) => a.z - b.z);
      for (const c of cmds) drawPt(c.sx, c.sy, c.r, c.color, c.op);

      // ── Front hemisphere bright rim flash ────────────────────────────
      // A subtle bright point at the "noon" position to simulate specular
      const specX = CX + R * 0.18 * Math.cos(t * 0.08);
      const specY = CY - R * 0.22;
      drawPt(specX, specY, R * 0.18, GOLD.star, 0.06 + Math.sin(t * 0.5) * 0.025);

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
      onMouseMove={(e) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseRef.current = {
          nx: (e.clientX - rect.left) / rect.width,
          ny: (e.clientY - rect.top)  / rect.height,
        };
      }}
      onMouseLeave={() => { mouseRef.current = { nx: 0.5, ny: 0.5 }; }}
    />
  );
}
