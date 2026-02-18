/*
 * Confetti dash data — pre-computed positions, rotations, and colours
 * arranged in radiating arcs behind the character (right-centre of banner).
 * Origin point is roughly (1050, 340) in a 1440×460 viewBox.
 */
const CONFETTI_COLORS = [
  "#ff4444", // red
  "#44bb44", // green
  "#4488ff", // blue
  "#ffcc22", // yellow
  "#cc55ff", // purple
  "#ff66aa", // pink
  "#ff8833", // orange
  "#44dddd", // cyan
];

interface Dash {
  x: number;
  y: number;
  angle: number;
  color: string;
}

// Generate arcs of dashes radiating from origin
const generateConfetti = (): Dash[] => {
  const ox = 1050;
  const oy = 340;
  const dashes: Dash[] = [];
  const arcs = [
    { r: 80, count: 8, spread: 140, startAngle: -150 },
    { r: 120, count: 11, spread: 150, startAngle: -155 },
    { r: 165, count: 14, spread: 155, startAngle: -158 },
    { r: 210, count: 16, spread: 158, startAngle: -160 },
    { r: 260, count: 18, spread: 160, startAngle: -162 },
    { r: 310, count: 19, spread: 158, startAngle: -160 },
    { r: 360, count: 20, spread: 155, startAngle: -158 },
  ];

  let ci = 0;
  for (const arc of arcs) {
    for (let i = 0; i < arc.count; i++) {
      const frac = arc.count === 1 ? 0.5 : i / (arc.count - 1);
      const angleDeg = arc.startAngle + frac * arc.spread;
      const angleRad = (angleDeg * Math.PI) / 180;
      dashes.push({
        x: ox + Math.cos(angleRad) * arc.r,
        y: oy + Math.sin(angleRad) * arc.r,
        angle: angleDeg + 90, // perpendicular tangent
        color: CONFETTI_COLORS[ci % CONFETTI_COLORS.length],
      });
      ci++;
    }
  }
  return dashes;
};

const confetti = generateConfetti();

const darkPalette = {
  bgFrom: "#141628",
  bgTo: "#0f1020",
  skyTop: "#1b1e36",
  skyMid: "#141628",
  skyBot: "#0f1020",
  mountains: ["#1e2240", "#191c38", "#151830", "#121528", "#0e1022"],
  shadow: "#0a0c18",
  starFill: "#ffffff",
  starOpacity: 0.35,
};

const lightPalette = {
  bgFrom: "#b3d4f7",
  bgTo: "#f8f9fc",
  skyTop: "#7bbcf5",
  skyMid: "#dce8f4",
  skyBot: "#f8f9fc",
  mountains: ["#e8efe7", "#ecf1eb", "#f0f4ef", "#f4f7f3", "#f8f9fc"],
  shadow: "#e8efe7",
  starFill: "#ffffff",
  starOpacity: 0.4,
};

import { useTheme } from "@/context/ThemeContext";

export default function HeroBanner() {
  const { theme } = useTheme();
  const p = theme === "dark" ? darkPalette : lightPalette;

  return (
    <div className="relative overflow-hidden -mt-[64px] pt-[64px]" style={{ background: `linear-gradient(180deg, ${p.bgFrom} 0%, ${p.bgTo} 100%)` }}>
      <svg className="w-full max-h-[55vh] md:max-h-[460px]" viewBox="0 0 1440 460" preserveAspectRatio="xMaxYMax slice" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        <defs>
          {/* Sky gradient */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.skyTop} />
            <stop offset="50%" stopColor={p.skyMid} />
            <stop offset="100%" stopColor={p.skyBot} />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1440" height="460" fill="url(#skyGrad)" />

        {/* ── Mountain layers (back → front) ── */}

        {/* Layer 5 — farthest, lightest */}
        <path
          d="M0,310 C80,270 160,250 280,265 C400,280 480,230 600,220 C720,210 820,240 940,235
             C1060,230 1140,210 1260,225 C1340,235 1400,250 1440,260 L1440,460 L0,460Z"
          fill={p.mountains[0]}
          opacity="0.5"
        />

        {/* Layer 4 */}
        <path
          d="M0,340 C100,300 200,280 340,295 C480,310 560,260 700,250 C840,240 940,270 1060,260
             C1180,250 1280,230 1440,270 L1440,460 L0,460Z"
          fill={p.mountains[1]}
          opacity="0.6"
        />

        {/* Layer 3 */}
        <path
          d="M0,360 C120,330 240,310 380,325 C520,340 620,290 760,280 C900,270 1000,310 1120,300
             C1240,290 1360,270 1440,290 L1440,460 L0,460Z"
          fill={p.mountains[2]}
          opacity="0.75"
        />

        {/* Layer 2 */}
        <path
          d="M0,380 C140,350 260,340 400,355 C540,370 660,320 800,310 C940,300 1060,340 1180,330
             C1300,320 1400,300 1440,320 L1440,460 L0,460Z"
          fill={p.mountains[3]}
          opacity="0.85"
        />

        {/* Layer 1 — nearest, darkest */}
        <path
          d="M0,400 C160,380 300,370 440,380 C580,390 700,350 840,345 C980,340 1100,370 1220,360
             C1340,350 1400,340 1440,350 L1440,460 L0,460Z"
          fill={p.mountains[4]}
          opacity="0.95"
        />

        {/* ── Confetti dashes ── */}
        {confetti.map((d, i) => (
          <rect key={i} x={d.x - 5} y={d.y - 1.5} width={10} height={3} rx={1.5} fill={d.color} opacity={0.85} transform={`rotate(${d.angle} ${d.x} ${d.y})`} />
        ))}

        {/* ── Character (SVG illustration) ── */}
        <g transform="translate(1010, 310)">
          {/* Shadow / ground */}
          <ellipse cx="40" cy="130" rx="50" ry="8" fill={p.shadow} opacity="0.5" />

          {/* Legs — crossed, sitting */}
          <path d="M15,100 C15,115 20,125 30,125 C35,125 38,120 38,115" fill="#1a1a2e" stroke="#15152a" strokeWidth="1" />
          <path d="M65,100 C65,115 60,125 50,125 C45,125 42,120 42,115" fill="#1a1a2e" stroke="#15152a" strokeWidth="1" />

          {/* Shoes */}
          <ellipse cx="28" cy="126" rx="8" ry="4" fill="#e8e8e8" />
          <ellipse cx="52" cy="126" rx="8" ry="4" fill="#e8e8e8" />

          {/* Body / hoodie */}
          <path
            d="M20,55 C18,70 16,85 18,100 C20,105 30,108 40,108 C50,108 60,105 62,100
               C64,85 62,70 60,55 C55,48 45,45 40,45 C35,45 25,48 20,55Z"
            fill="#e8a830"
          />
          {/* Hoodie belly panel */}
          <path
            d="M28,60 C27,72 27,85 28,98 C30,102 36,104 40,104 C44,104 50,102 52,98
               C53,85 53,72 52,60 C48,56 44,54 40,54 C36,54 32,56 28,60Z"
            fill="#d4d4d8"
          />
          {/* Pocket on hoodie */}
          <path d="M32,80 C33,75 47,75 48,80 C48,88 47,92 40,92 C33,92 32,88 32,80Z" fill="#c8c8cc" opacity="0.6" />

          {/* Arms */}
          <path d="M20,60 C12,70 10,85 15,95 C18,98 22,96 22,92" fill="#e8a830" stroke="#d49525" strokeWidth="0.5" />
          <path d="M60,60 C68,70 70,85 65,95 C62,98 58,96 58,92" fill="#e8a830" stroke="#d49525" strokeWidth="0.5" />

          {/* Hands */}
          <circle cx="36" cy="105" r="4" fill="#f0c8a0" />
          <circle cx="44" cy="105" r="4" fill="#f0c8a0" />

          {/* Neck */}
          <rect x="35" y="40" width="10" height="8" rx="3" fill="#f0c8a0" />

          {/* Head */}
          <ellipse cx="40" cy="30" rx="22" ry="24" fill="#f0c8a0" />

          {/* Hair — messy/fluffy */}
          <path
            d="M18,25 C16,15 20,4 30,2 C35,1 42,0 48,2 C58,5 64,14 62,25
               C63,20 60,10 52,6 C46,3 34,3 28,6 C22,10 18,18 18,25Z"
            fill="#4a3520"
          />
          {/* Hair tuft */}
          <path d="M55,8 C60,2 65,5 62,12 C60,8 57,6 55,8Z" fill="#4a3520" />
          <path d="M22,12 C18,6 14,10 17,16 C18,12 20,10 22,12Z" fill="#4a3520" />

          {/* Side hair */}
          <path d="M18,25 C16,30 17,35 19,34 C20,30 19,27 18,25Z" fill="#4a3520" />
          <path d="M62,25 C64,30 63,35 61,34 C60,30 61,27 62,25Z" fill="#4a3520" />

          {/* Eyes */}
          <circle cx="32" cy="32" r="3.5" fill="#1a1a2e" />
          <circle cx="48" cy="32" r="3.5" fill="#1a1a2e" />
          {/* Eye highlights */}
          <circle cx="33.2" cy="31" r="1.2" fill="#fff" opacity="0.7" />
          <circle cx="49.2" cy="31" r="1.2" fill="#fff" opacity="0.7" />

          {/* Mouth — gentle smile */}
          <path d="M36,40 Q40,44 44,40" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />

          {/* Blush */}
          <ellipse cx="26" cy="38" rx="4" ry="2.5" fill="#e8a0a0" opacity="0.3" />
          <ellipse cx="54" cy="38" rx="4" ry="2.5" fill="#e8a0a0" opacity="0.3" />
        </g>

        {/* Small stars scattered */}
        {[
          [120, 80],
          [250, 140],
          [380, 60],
          [500, 180],
          [620, 100],
          [750, 50],
          [880, 160],
          [1300, 90],
          [1380, 200],
          [200, 200],
          [450, 120],
          [680, 180],
          [950, 80],
          [1200, 150],
          [100, 170],
        ].map(([x, y], i) => (
          <circle key={`star-${i}`} cx={x} cy={y} r={0.8} fill={p.starFill} opacity={p.starOpacity} />
        ))}
      </svg>
    </div>
  );
}
