import type { CoatId } from "@/lib/data";

export const C = {
  cream: "#FFF7EB",
  lavender: "#C9B6E4",
  ink: "#34303B",
  coral: "#ED917A",
  mint: "#C0DCC8",
};

const SW = 4;

function bumpyPath(cx: number, cy: number, rx: number, ry: number, n: number, bump: number) {
  const pts: string[] = [];
  const at = (a: number, ex: number) => [cx + (rx + ex) * Math.cos(a), cy + (ry + ex) * Math.sin(a)];
  const [sx, sy] = at(0, 0);
  pts.push(`M${sx.toFixed(0)} ${sy.toFixed(0)}`);
  for (let i = 0; i < n; i++) {
    const a1 = ((i + 1) / n) * Math.PI * 2;
    const am = ((i + 0.5) / n) * Math.PI * 2;
    const [cxp, cyp] = at(am, bump * 1.9);
    const [ex, ey] = at(a1, 0);
    pts.push(`Q${cxp.toFixed(0)} ${cyp.toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}`);
  }
  return pts.join(" ") + "Z";
}

function spikyPath(cx: number, cy: number, rx: number, ry: number, n: number, spike: number) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2;
    const k = i % 2 === 0 ? 1 : 1 - spike;
    pts.push(`${i === 0 ? "M" : "L"}${(cx + rx * k * Math.cos(a)).toFixed(0)} ${(cy + ry * k * Math.sin(a)).toFixed(0)}`);
  }
  return pts.join(" ") + "Z";
}

const stroke = { stroke: C.ink, strokeWidth: SW, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Mirror({ children }: { children: React.ReactNode }) {
  return <g transform="translate(240 0) scale(-1 1)">{children}</g>;
}

function Face({
  y,
  eyeDX = 26,
  closed = false,
  tongue = true,
  nose = C.ink,
  cheeks = true,
}: {
  y: number;
  eyeDX?: number;
  closed?: boolean;
  tongue?: boolean;
  nose?: string;
  cheeks?: boolean;
}) {
  const ny = y + 18;
  return (
    <g>
      {cheeks && (
        <>
          <ellipse cx={120 - eyeDX - 18} cy={y + 14} rx="10" ry="7" fill={C.coral} opacity=".38" />
          <ellipse cx={120 + eyeDX + 18} cy={y + 14} rx="10" ry="7" fill={C.coral} opacity=".38" />
        </>
      )}
      {closed ? (
        <>
          <path d={`M${120 - eyeDX - 8} ${y} Q${120 - eyeDX} ${y + 9} ${120 - eyeDX + 8} ${y}`} fill="none" {...stroke} />
          <path d={`M${120 + eyeDX - 8} ${y} Q${120 + eyeDX} ${y + 9} ${120 + eyeDX + 8} ${y}`} fill="none" {...stroke} />
        </>
      ) : (
        <>
          <circle cx={120 - eyeDX} cy={y} r="7.5" fill={C.ink} />
          <circle cx={120 + eyeDX} cy={y} r="7.5" fill={C.ink} />
          <circle cx={120 - eyeDX + 2.5} cy={y - 2.8} r="2.6" fill="#fff" />
          <circle cx={120 + eyeDX + 2.5} cy={y - 2.8} r="2.6" fill="#fff" />
        </>
      )}
      {tongue && !closed && (
        <path
          d={`M111 ${ny + 22} C111 ${ny + 44} 129 ${ny + 44} 129 ${ny + 22} Z`}
          fill={C.coral}
          {...stroke}
          strokeWidth="3.5"
        />
      )}
      <path
        d={`M120 ${ny + 10} V${ny + 16} M120 ${ny + 16} C114 ${ny + 27} 103 ${ny + 25} 101 ${ny + 18} M120 ${ny + 16} C126 ${ny + 27} 137 ${ny + 25} 139 ${ny + 18}`}
        fill="none"
        {...stroke}
        strokeWidth="3.5"
      />
      <path
        d={`M106 ${ny - 1} C106 ${ny - 9} 134 ${ny - 9} 134 ${ny - 1} C134 ${ny + 5} 126 ${ny + 11} 120 ${ny + 11} C114 ${ny + 11} 106 ${ny + 5} 106 ${ny - 1} Z`}
        fill={nose}
        stroke={C.ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse cx="114" cy={ny - 3} rx="4" ry="2" fill="#fff" opacity=".55" />
    </g>
  );
}

function Collar({ color = C.mint, y = 178 }: { color?: string; y?: number }) {
  return (
    <g>
      <path d={`M80 ${y - 2} C98 ${y + 16} 142 ${y + 16} 160 ${y - 2}`} fill="none" stroke={C.ink} strokeWidth="17" strokeLinecap="round" />
      <path d={`M80 ${y - 2} C98 ${y + 16} 142 ${y + 16} 160 ${y - 2}`} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
      <circle cx="120" cy={y + 13} r="9" fill={C.coral} {...stroke} strokeWidth="3.5" />
    </g>
  );
}

interface VariantProps {
  closed: boolean;
  tongue: boolean;
  collar: string;
}

function Short({ closed, tongue, collar }: VariantProps) {
  const fur = "#E9BE8C";
  const dark = "#C98F5C";
  return (
    <g>
      <path d="M52 240 C52 192 80 170 120 170 C160 170 188 192 188 240 Z" fill={fur} {...stroke} />
      <ellipse cx="120" cy="222" rx="30" ry="40" fill="#FBE9CF" />
      <Collar color={collar} />
      <path d="M72 82 C44 60 24 96 40 144 C58 140 78 112 84 90 Z" fill={dark} {...stroke} />
      <Mirror>
        <path d="M72 82 C44 60 24 96 40 144 C58 140 78 112 84 90 Z" fill={dark} {...stroke} />
      </Mirror>
      <ellipse cx="120" cy="108" rx="66" ry="58" fill={fur} {...stroke} />
      <path d="M120 54 C112 70 112 84 120 96 C128 84 128 70 120 54Z" fill="#FBE9CF" />
      <ellipse cx="120" cy="140" rx="38" ry="28" fill="#FBE9CF" {...stroke} strokeWidth="3.5" />
      <Face y={108} tongue={tongue} closed={closed} />
    </g>
  );
}

function Double({ closed, tongue, collar }: VariantProps) {
  const fur = "#FBF4EA";
  const mask = "#B9AECB";
  return (
    <g>
      <path d={bumpyPath(120, 232, 82, 56, 14, 8)} fill={fur} {...stroke} />
      <Collar color={collar} y={180} />
      <path d="M70 90 C58 60 60 36 68 22 C90 32 108 52 114 76 Z" fill={fur} {...stroke} />
      <path d="M75 78 C69 58 70 44 73 36 C86 44 96 56 100 70 Z" fill={C.lavender} />
      <Mirror>
        <path d="M70 90 C58 60 60 36 68 22 C90 32 108 52 114 76 Z" fill={fur} {...stroke} />
        <path d="M75 78 C69 58 70 44 73 36 C86 44 96 56 100 70 Z" fill={C.lavender} />
      </Mirror>
      <path d={bumpyPath(120, 110, 68, 56, 18, 6)} fill={fur} {...stroke} />
      <path
        d="M62 104 C66 66 100 56 120 58 C140 56 174 66 178 104 C164 88 150 92 142 100 C134 108 126 108 120 120 C114 108 106 108 98 100 C90 92 76 88 62 104Z"
        fill={mask}
      />
      <ellipse cx="120" cy="142" rx="36" ry="26" fill="#fff" opacity=".9" />
      <Face y={110} tongue={tongue} closed={closed} eyeDX={30} />
    </g>
  );
}

function Curly({ closed, tongue, collar }: VariantProps) {
  const fur = "#F4C3A5";
  return (
    <g>
      <path d={bumpyPath(120, 234, 76, 54, 12, 11)} fill={fur} {...stroke} />
      <Collar color={collar} y={182} />
      <path d={bumpyPath(54, 126, 22, 40, 9, 8)} fill={fur} {...stroke} />
      <path d={bumpyPath(186, 126, 22, 40, 9, 8)} fill={fur} {...stroke} />
      <ellipse cx="120" cy="124" rx="50" ry="52" fill="#F8D3BA" {...stroke} />
      <path d={bumpyPath(120, 62, 46, 34, 10, 12)} fill={fur} {...stroke} />
      <ellipse cx="120" cy="148" rx="30" ry="24" fill="#FDE8D8" />
      <path d="M96 44 C86 26 70 36 82 50 C70 52 74 70 92 56 Z" fill={C.coral} {...stroke} strokeWidth="3.5" />
      <path d="M144 44 C154 26 170 36 158 50 C170 52 166 70 148 56 Z" fill={C.coral} {...stroke} strokeWidth="3.5" />
      <circle cx="120" cy="48" r="8" fill={C.coral} {...stroke} strokeWidth="3.5" />
      <Face y={116} tongue={tongue} closed={closed} eyeDX={24} />
    </g>
  );
}

function Long({ closed, tongue, collar }: VariantProps) {
  const fur = "#B9835C";
  const light = "#F6E6CF";
  return (
    <g>
      <path d="M44 240 C40 196 70 172 120 172 C170 172 200 196 196 240 Z" fill={fur} {...stroke} />
      <path d="M96 184 C100 214 104 230 100 240 M144 184 C140 214 136 230 140 240" fill="none" stroke="#9C6A47" strokeWidth="3" strokeLinecap="round" />
      <Collar color={collar} y={180} />
      <path d="M72 70 C32 74 22 150 34 214 C60 224 82 182 86 120 Z" fill="#9C6A47" {...stroke} />
      <Mirror>
        <path d="M72 70 C32 74 22 150 34 214 C60 224 82 182 86 120 Z" fill="#9C6A47" {...stroke} />
      </Mirror>
      <ellipse cx="120" cy="112" rx="58" ry="54" fill={fur} {...stroke} />
      <path d="M120 58 C106 78 104 100 112 126 L128 126 C136 100 134 78 120 58Z" fill={light} />
      <path d="M120 58 C112 72 110 84 108 100 M120 58 C128 72 130 84 132 100" fill="none" stroke="#9C6A47" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="120" cy="142" rx="34" ry="26" fill={light} {...stroke} strokeWidth="3.5" />
      <path d="M104 56 C96 38 82 42 90 56 C80 62 92 72 104 62Z" fill={C.coral} {...stroke} strokeWidth="3.5" />
      <path d="M136 56 C144 38 158 42 150 56 C160 62 148 72 136 62Z" fill={C.coral} {...stroke} strokeWidth="3.5" />
      <circle cx="120" cy="58" r="7" fill={C.coral} {...stroke} strokeWidth="3.5" />
      <Face y={110} tongue={tongue} closed={closed} eyeDX={25} />
    </g>
  );
}

function Wiry({ closed, tongue, collar }: VariantProps) {
  const fur = "#CDBFAE";
  const dark = "#8F7C69";
  const light = "#F2E8DA";
  return (
    <g>
      <path d={spikyPath(120, 236, 78, 58, 13, 0.1)} fill={fur} {...stroke} />
      <Collar color={collar} y={180} />
      <path d="M68 74 C48 54 34 74 40 112 C58 114 74 100 82 84 Z" fill={dark} {...stroke} />
      <Mirror>
        <path d="M68 74 C48 54 34 74 40 112 C58 114 74 100 82 84 Z" fill={dark} {...stroke} />
      </Mirror>
      <rect x="60" y="58" width="120" height="104" rx="46" fill={fur} {...stroke} />
      <path d="M76 98 Q88 86 102 96" fill="none" stroke={dark} strokeWidth="7" strokeLinecap="round" />
      <path d="M164 98 Q152 86 138 96" fill="none" stroke={dark} strokeWidth="7" strokeLinecap="round" />
      <path d={bumpyPath(120, 168, 34, 12, 7, 5)} fill={light} {...stroke} strokeWidth="3.5" />
      <ellipse cx="120" cy="142" rx="34" ry="22" fill={light} {...stroke} strokeWidth="3.5" />
      <Face y={116} tongue={tongue} closed={closed} eyeDX={26} cheeks={false} />
    </g>
  );
}

export function Dog({
  coat,
  closed = false,
  tongue = true,
  collar = C.mint,
  className,
  x,
  y,
  width,
  height,
  title,
}: {
  coat: CoatId;
  closed?: boolean;
  tongue?: boolean;
  collar?: string;
  className?: string;
  x?: number;
  y?: number;
  width?: number | string;
  height?: number | string;
  title?: string;
}) {
  const props = { closed, tongue, collar };
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      x={x}
      y={y}
      width={width}
      height={height}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {coat === "short" && <Short {...props} />}
      {coat === "double" && <Double {...props} />}
      {coat === "curly" && <Curly {...props} />}
      {coat === "long" && <Long {...props} />}
      {coat === "wiry" && <Wiry {...props} />}
    </svg>
  );
}

export function Bubble({ x, y, r, className, delay = 0 }: { x: number; y: number; r: number; className?: string; delay?: number }) {
  return (
    <g className={className} style={{ animationDelay: `${delay}s` }}>
      <circle cx={x} cy={y} r={r} fill="#fff" fillOpacity=".55" stroke={C.ink} strokeWidth="2.5" />
      <path d={`M${x - r * 0.5} ${y - r * 0.15} A${r * 0.55} ${r * 0.55} 0 0 1 ${x - r * 0.1} ${y - r * 0.55}`} fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function Paw({ className, size = 24, color = "currentColor" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <g fill={color}>
        <ellipse cx="16" cy="21.5" rx="7.5" ry="6" />
        <ellipse cx="6.5" cy="14" rx="3" ry="4" transform="rotate(-18 6.5 14)" />
        <ellipse cx="12" cy="8.5" rx="3.1" ry="4.2" transform="rotate(-6 12 8.5)" />
        <ellipse cx="20" cy="8.5" rx="3.1" ry="4.2" transform="rotate(6 20 8.5)" />
        <ellipse cx="25.5" cy="14" rx="3" ry="4" transform="rotate(18 25.5 14)" />
      </g>
    </svg>
  );
}
