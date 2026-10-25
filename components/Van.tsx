import { Bubble, C, Dog, Sparkle } from "./Dogs";

const stroke = { stroke: C.ink, strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export function VanBody({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="320" cy="312" rx="290" ry="12" fill={C.ink} opacity=".12" />
      <defs>
        <clipPath id="mh-van-clip">
          <path d="M60 262 V110 Q60 72 98 72 H400 Q430 72 444 100 L482 168 H546 Q590 172 590 214 V262 Z" />
        </clipPath>
        <clipPath id="mh-win-clip">
          <rect x="128" y="104" width="136" height="88" rx="24" />
        </clipPath>
      </defs>
      <path d="M60 262 V110 Q60 72 98 72 H400 Q430 72 444 100 L482 168 H546 Q590 172 590 214 V262 Z" fill={C.lavender} {...stroke} />
      <g clipPath="url(#mh-van-clip)">
        <rect x="40" y="226" width="570" height="46" fill={C.mint} />
        <path d="M40 226 H610" stroke={C.ink} strokeWidth="4" />
        <circle cx="96" cy="108" r="46" fill="#fff" opacity=".18" />
        <circle cx="360" cy="236" r="60" fill="#fff" opacity=".14" />
      </g>
      <path d="M436 106 L468 160 H414 V106 Z" fill={C.cream} {...stroke} />
      <path d="M426 96 L446 96" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
      <rect x="128" y="104" width="136" height="88" rx="24" fill={C.cream} {...stroke} />
      <g clipPath="url(#mh-win-clip)">
        <Dog coat="short" x={160} y={112} width={72} height={72} collar={C.coral} />
      </g>
      <rect x="128" y="104" width="136" height="88" rx="24" fill="none" {...stroke} />
      <path
        d="M112 104 H280 L292 82 H100 Z"
        fill={C.coral}
        {...stroke}
      />
      <path d="M128 104 q 14 16 28 0 q 14 16 28 0 q 14 16 28 0 q 14 16 28 0 q 14 16 24 0" fill={C.cream} {...stroke} strokeWidth="3.5" />
      <text x="318" y="130" fontFamily="var(--font-display)" fontWeight="900" fontSize="26" fill={C.ink} letterSpacing="-0.5">
        Mallow
      </text>
      <text x="318" y="160" fontFamily="var(--font-display)" fontWeight="900" fontSize="26" fill={C.ink} letterSpacing="-0.5">
        Hound
      </text>
      <path d="M322 176 h76" stroke={C.coral} strokeWidth="6" strokeLinecap="round" />
      <rect x="196" y="56" width="92" height="18" rx="9" fill={C.cream} {...stroke} />
      <path d="M484 176 h56" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
      <circle cx="574" cy="204" r="9" fill={C.coral} {...stroke} strokeWidth="3.5" />
      <rect x="560" y="250" width="40" height="12" rx="6" fill={C.cream} {...stroke} strokeWidth="3.5" />
      {[170, 490].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="266" r="48" fill={C.ink} />
          <g className="wheel">
            <circle cx={cx} cy="266" r="34" fill={C.ink} stroke={C.cream} strokeWidth="4" />
            <circle cx={cx} cy="266" r="16" fill={C.cream} stroke={C.ink} strokeWidth="3.5" />
            <circle cx={cx} cy="266" r="5" fill={C.coral} />
          </g>
        </g>
      ))}
    </g>
  );
}

export function HeroScene() {
  return (
    <svg
      viewBox="0 0 680 560"
      className="hero-scene"
      role="img"
      aria-label="Illustration of the lavender Mallow Hound grooming van parked on a grassy rise, with a freshly groomed curly dog sitting in front and bubbles floating up"
    >
      <path
        d="M70 300 C20 200 90 70 230 56 C330 18 470 28 560 100 C650 170 666 320 600 410 C540 500 380 536 250 508 C130 484 110 400 70 300Z"
        fill={C.lavender}
        opacity=".55"
      />
      <path
        d="M110 330 C70 250 130 130 250 112 C350 84 470 100 540 160 C610 220 610 330 550 400 C490 470 370 490 270 470 C190 452 150 410 110 330Z"
        fill={C.mint}
        opacity=".7"
      />
      <path d="M14 468 C100 428 250 436 340 458 C440 482 560 436 666 452 V528 a28 28 0 0 1 -28 28 H42 a28 28 0 0 1 -28 -28Z" fill={C.mint} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M40 520 q10 -16 20 0 M610 510 q10 -16 20 0 M300 530 q10 -16 20 0" fill="none" stroke={C.ink} strokeWidth="3.5" strokeLinecap="round" />
      <VanBody x={48} y={62} scale={0.98} />
      <g className="bob">
        <Dog coat="curly" x={60} y={352} width={190} height={190} collar={C.coral} />
      </g>
      <Bubble className="bubble" x={310} y={96} r={16} delay={0} />
      <Bubble className="bubble" x={352} y={50} r={10} delay={1.2} />
      <Bubble className="bubble" x={270} y={38} r={8} delay={2.1} />
      <Bubble className="bubble" x={412} y={84} r={12} delay={0.7} />
      <Sparkle className="twinkle" x={46} y={330} s={1.2} />
      <Sparkle className="twinkle" x={290} y={380} s={0.9} />
      <Sparkle className="twinkle t2" x={592} y={104} s={1} />
      <Sparkle className="twinkle t3" x={640} y={250} s={0.7} />
    </svg>
  );
}

export function VanCutaway() {
  return (
    <svg
      viewBox="0 0 640 380"
      className="cutaway"
      role="img"
      aria-label="Cutaway of the grooming van showing a warm-water tub with a dog and bubbles, a quiet dryer, a non-slip grooming table, and the onboard water tank and power"
    >
      <rect x="20" y="40" width="600" height="290" rx="44" fill={C.cream} stroke={C.ink} strokeWidth="4" />
      <path d="M20 270 H620 V286 a44 44 0 0 1 -44 44 H64 a44 44 0 0 1 -44 -44Z" fill={C.mint} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M20 84 a44 44 0 0 1 44 -44 H576 a44 44 0 0 1 44 44 V102 H20Z" fill={C.lavender} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="82" cy="71" r="7" fill={C.cream} stroke={C.ink} strokeWidth="3" />
      <circle cx="112" cy="71" r="7" fill={C.cream} stroke={C.ink} strokeWidth="3" />
      <rect x="140" y="60" width="150" height="22" rx="11" fill={C.cream} stroke={C.ink} strokeWidth="3" />

      <rect x="40" y="130" width="100" height="136" rx="22" fill={C.lavender} stroke={C.ink} strokeWidth="4" />
      <path d="M40 176 H140 M40 222 H140" stroke={C.ink} strokeWidth="3" opacity=".5" />
      <path d="M60 196 q10 -10 20 0 t20 0 t20 0" fill="none" stroke={C.cream} strokeWidth="5" strokeLinecap="round" />
      <path d="M140 232 C180 232 190 240 190 262" fill="none" stroke={C.ink} strokeWidth="6" strokeLinecap="round" />

      <path d="M196 262 V214 a22 22 0 0 1 22 -22 H370 a22 22 0 0 1 22 22 V262Z" fill={C.mint} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <Dog coat="curly" x={226} y={104} width={136} height={136} collar={C.coral} />
      <path d="M200 214 q18 -14 36 0 t36 0 t36 0 t36 0 t36 0" fill={C.cream} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M204 262 V222 H388 V262Z" fill={C.mint} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M384 100 V118" fill="none" stroke={C.ink} strokeWidth="6" strokeLinecap="round" />
      <path d="M372 118 h24 l-5 14 h-14Z" fill={C.coral} stroke={C.ink} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M377 140 v10 M384 140 v14 M391 140 v8" stroke={C.ink} strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <Bubble className="bubble" x={222} y={186} r={13} delay={0} />
      <Bubble className="bubble" x={352} y={170} r={9} delay={1.4} />
      <Bubble className="bubble" x={252} y={150} r={8} delay={0.8} />

      <path d="M440 266 V150 h10 V266Z" fill={C.ink} />
      <rect x="418" y="140" width="80" height="26" rx="13" fill={C.lavender} stroke={C.ink} strokeWidth="4" />
      <path d="M498 150 h46 a14 14 0 0 1 14 14 v30" fill="none" stroke={C.ink} strokeWidth="6" strokeLinecap="round" />
      <rect x="530" y="194" width="56" height="42" rx="18" fill={C.coral} stroke={C.ink} strokeWidth="4" />
      <path d="M546 206 h24 M546 216 h24" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <rect x="410" y="236" width="180" height="30" rx="14" fill={C.coral} stroke={C.ink} strokeWidth="4" />
      <path d="M430 266 v22 M570 266 v22" stroke={C.ink} strokeWidth="6" strokeLinecap="round" />

      {[
        { n: 1, x: 90, y: 150 },
        { n: 2, x: 296, y: 244 },
        { n: 3, x: 492, y: 114 },
        { n: 4, x: 500, y: 258 },
      ].map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r="19" fill={C.coral} stroke={C.ink} strokeWidth="4" />
          <text x={p.x} y={p.y + 7} textAnchor="middle" fontFamily="var(--font-display)" fontWeight="900" fontSize="21" fill={C.ink}>
            {p.n}
          </text>
        </g>
      ))}
      <Sparkle className="twinkle" x={420} y={196} s={0.9} />
    </svg>
  );
}
