export type FormationMode = "flat" | "tilt" | "ring";

export interface Work {
  title: string;
  image: string;
  category?: string;
  date?: string;
  year?: string;
}

export interface Pose {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
  o: number;
}

export interface FmLayout {
  W: number;
  H: number;
  cardW: number;
  cardH: number;
  spacing: number;
  totalW: number;
  radius: number;
}

export const MODES: { id: FormationMode; label: string }[] = [
  { id: "flat", label: "Flat" },
  { id: "tilt", label: "Tilt" },
  { id: "ring", label: "Ring" },
];

export const PERSP = 1200;
export const PARALLAX_MAX = 7;
export const HOVER_ZOOM = 0.08;
export const HOVER_EASE = 0.12;
export const SPRING = 0.1;
export const MORPH_DUR = 650;
export const MORPH_STAGGER = 200;
export const SWAP_BAND = 120;
export const SWAP_FLOOR = 0.25;
export const SWAP_SPEED_REF = 40;

export const clamp = (val: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, val));

export const copyPose = (dst: Pose, src: Pose): void => {
  dst.x = src.x;
  dst.y = src.y;
  dst.z = src.z;
  dst.rx = src.rx;
  dst.ry = src.ry;
  dst.rz = src.rz;
  dst.s = src.s;
  dst.o = src.o;
};

export const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

export const lerpPose = (out: Pose, a: Pose, b: Pose, t: number): void => {
  out.x = lerp(a.x, b.x, t);
  out.y = lerp(a.y, b.y, t);
  out.z = lerp(a.z, b.z, t);
  out.rx = lerp(a.rx, b.rx, t);
  out.ry = lerp(a.ry, b.ry, t);
  out.rz = lerp(a.rz, b.rz, t);
  out.s = lerp(a.s, b.s, t);
  out.o = lerp(a.o, b.o, t);
};

export const poseTransform = (p: Pose): string =>
  `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, ${p.z.toFixed(2)}px) rotateX(${p.rx.toFixed(2)}deg) rotateY(${p.ry.toFixed(2)}deg) rotateZ(${p.rz.toFixed(2)}deg) scale(${p.s.toFixed(3)})`;

export const focusScore = (p: Pose): number => {
  return Math.abs(p.x) * 1.5 + Math.abs(p.y) - p.z * 0.4;
};

export const getLayout = (W: number, H: number, n: number): FmLayout => {
  const isMobile = W < 640;
  const cardW = isMobile ? Math.min(260, Math.max(220, W * 0.7)) : Math.min(320, Math.max(260, W * 0.28));
  const cardH = Math.round(cardW * 1.35);
  const spacing = cardW + (isMobile ? 20 : 32);
  const totalW = Math.max(n * spacing, W * 1.2);
  const radius = Math.max(340, Math.round((spacing * Math.max(n, 6)) / (2 * Math.PI)));

  return { W, H, cardW, cardH, spacing, totalW, radius };
};

// Wrap a coordinate inside [-totalW/2, totalW/2]
const wrapCoord = (val: number, totalW: number): number => {
  let v = val % totalW;
  if (v > totalW / 2) v -= totalW;
  if (v < -totalW / 2) v += totalW;
  return v;
};

export const poseFor = (
  mode: FormationMode,
  index: number,
  L: FmLayout,
  browse: number
): Pose => {
  const { W, H, spacing, totalW, radius } = L;

  if (mode === "ring") {
    // 3D Cylindrical carousel
    const n = Math.max(1, Math.round(totalW / spacing));
    const stepAngle = (2 * Math.PI) / n;
    const baseAngle = index * stepAngle;
    const currentAngle = baseAngle + (browse / radius);
    
    const sin = Math.sin(currentAngle);
    const cos = Math.cos(currentAngle);

    const x = sin * radius;
    const z = cos * radius - radius * 0.65;
    const y = 0;
    const ry = (currentAngle * 180) / Math.PI;

    // Fade cards around the backside
    const opacity = clamp((cos + 0.35) / 1.35, 0.05, 1);
    const scale = clamp(0.7 + cos * 0.3, 0.6, 1.05);

    return {
      x,
      y,
      z,
      rx: 0,
      ry,
      rz: 0,
      s: scale,
      o: opacity,
    };
  }

  if (mode === "tilt") {
    // 3D perspective angled cards
    const rawX = index * spacing + browse;
    const x = wrapCoord(rawX, totalW);
    const normX = x / (W / 2 || 1);
    const dist = Math.abs(normX);

    const z = -dist * 180;
    const y = normX * -14;
    const ry = -24;
    const rx = 8;
    const rz = -4;
    const scale = clamp(1 - dist * 0.12, 0.75, 1.05);
    const opacity = clamp(1 - (dist - 0.7) * 1.5, 0.1, 1);

    return {
      x,
      y,
      z,
      rx,
      ry,
      rz,
      s: scale,
      o: opacity,
    };
  }

  // "flat" mode (default horizontal infinite carousel)
  const rawX = index * spacing + browse;
  const x = wrapCoord(rawX, totalW);
  const normX = x / (W / 2 || 1);
  const dist = Math.abs(normX);

  const scale = clamp(1 - dist * 0.1, 0.8, 1.04);
  const opacity = clamp(1 - (dist - 0.8) * 2, 0.1, 1);

  return {
    x,
    y: 0,
    z: -dist * 40,
    rx: 0,
    ry: 0,
    rz: 0,
    s: scale,
    o: opacity,
  };
};
