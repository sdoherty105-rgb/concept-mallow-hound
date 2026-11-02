import type { ReactNode } from "react";
import type { CoatId } from "@/lib/data";

/**
 * One pose for every coat: side profile facing right, with a snout,
 * an ear, two legs and a tail. Coat changes the outline around that dog,
 * not the fact that it is a dog. No eyes or mouth.
 */

function Frame({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 220 140" className={className} aria-hidden={title ? undefined : true} role={title ? "img" : undefined} focusable="false">
      {title ? <title>{title}</title> : null}
      <g fill="currentColor">{children}</g>
    </svg>
  );
}

function Leg({ x, y, h }: { x: number; y: number; h: number }) {
  return <rect x={x} y={y} width="13" height={h} rx="6" />;
}

function Short() {
  return (
    <>
      <path d="M8 62 C22 48 34 56 40 66 C30 62 16 68 8 66 Z" />
      <Leg x={52} y={86} h={40} />
      <Leg x={108} y={84} h={44} />
      <ellipse cx="86" cy="78" rx="46" ry="24" />
      <path d="M118 70 L136 46 L152 64 L128 82 Z" />
      <ellipse cx="128" cy="58" rx="11" ry="16" transform="rotate(-30 128 58)" />
      <circle cx="146" cy="52" r="18" />
      <rect x="158" y="46" width="46" height="15" rx="7" />
    </>
  );
}

function Double() {
  return (
    <>
      <ellipse cx="28" cy="70" rx="20" ry="16" />
      <Leg x={58} y={96} h={32} />
      <Leg x={112} y={96} h={34} />
      <ellipse cx="92" cy="82" rx="54" ry="32" />
      <circle cx="70" cy="58" r="18" />
      <path d="M124 74 L142 50 L158 68 L134 86 Z" />
      <circle cx="152" cy="56" r="20" />
      <ellipse cx="140" cy="48" rx="9" ry="12" />
      <rect x="166" y="50" width="42" height="16" rx="8" />
    </>
  );
}

function Curly() {
  return (
    <>
      <circle cx="36" cy="74" r="14" />
      <Leg x={58} y={96} h={32} />
      <Leg x={112} y={94} h={36} />
      <ellipse cx="90" cy="84" rx="44" ry="24" />
      <circle cx="62" cy="62" r="16" />
      <circle cx="90" cy="54" r="16" />
      <circle cx="116" cy="58" r="15" />
      <path d="M126 72 L144 48 L160 66 L136 84 Z" />
      <circle cx="154" cy="54" r="18" />
      <circle cx="146" cy="36" r="10" />
      <rect x="166" y="48" width="42" height="15" rx="7" />
    </>
  );
}

function Long() {
  return (
    <>
      <path d="M12 78 C26 96 40 100 48 86 C36 96 22 92 12 84 Z" />
      <Leg x={54} y={100} h={28} />
      <Leg x={106} y={98} h={30} />
      <ellipse cx="86" cy="86" rx="46" ry="22" />
      <path d="M68 96 C60 114 56 130 58 140 L74 140 C74 120 78 106 86 94 Z" />
      <path d="M116 76 L134 50 L150 68 L126 86 Z" />
      <circle cx="144" cy="54" r="18" />
      <path d="M132 60 C124 78 120 108 124 136 L138 136 C136 102 140 74 148 58 Z" />
      <rect x="156" y="48" width="48" height="15" rx="7" />
    </>
  );
}

function Wiry() {
  return (
    <>
      <path d="M14 62 L36 50 L50 66 L22 74 Z" />
      <Leg x={52} y={86} h={42} />
      <Leg x={106} y={84} h={44} />
      <rect x="44" y="62" width="78" height="36" rx="8" />
      <path d="M112 68 L130 46 L146 64 L122 80 Z" />
      <rect x="128" y="38" width="34" height="30" rx="6" />
      <path d="M132 48 L122 14 L152 46 Z" />
      <path d="M148 46 L158 10 L174 44 Z" />
      <rect x="154" y="46" width="50" height="16" rx="7" />
      <path d="M168 52 H200 L196 78 H186 L178 64 H170 L162 80 H154 Z" />
    </>
  );
}

function Puppy() {
  return (
    <>
      <path d="M22 86 C34 74 46 80 50 90 C40 86 28 92 22 88 Z" />
      <Leg x={62} y={96} h={30} />
      <Leg x={108} y={96} h={32} />
      <ellipse cx="90" cy="90" rx="40" ry="22" />
      <path d="M116 82 L132 58 L148 76 L124 92 Z" />
      <ellipse cx="124" cy="70" rx="12" ry="18" transform="rotate(-25 124 70)" />
      <circle cx="146" cy="64" r="22" />
      <rect x="162" y="60" width="34" height="16" rx="8" />
    </>
  );
}

const DRAW: Record<CoatId, () => ReactNode> = {
  short: Short,
  double: Double,
  curly: Curly,
  long: Long,
  wiry: Wiry,
};

export function Dog({ coat, className, title }: { coat: CoatId; className?: string; title?: string }) {
  const Shape = DRAW[coat];
  return (
    <Frame className={className} title={title}>
      <Shape />
    </Frame>
  );
}

export function PuppyMark({ className, title }: { className?: string; title?: string }) {
  return (
    <Frame className={className} title={title}>
      <Puppy />
    </Frame>
  );
}
