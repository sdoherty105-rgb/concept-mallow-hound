import type { ReactNode } from "react";
import type { CoatId } from "@/lib/data";

/**
 * One construction rule for every silhouette: a body ellipse, a head circle,
 * two ears, four legs and one tail. Coat type changes only those parts.
 * No eyes, muzzle or mouth. The puppy uses the same parts at puppy proportions.
 */

type Parts = {
  body: [number, number, number, number];
  head: [number, number, number];
  ears: ReactNode;
  tail: ReactNode;
  extra?: ReactNode;
  legs?: [number, number];
};

function Legs({ y = 78, h = 22 }: { y?: number; h?: number }) {
  return (
    <>
      <rect x="38" y={y} width="10" height={h} rx="4" />
      <rect x="54" y={y + 2} width="10" height={h - 2} rx="4" />
      <rect x="78" y={y + 2} width="10" height={h - 2} rx="4" />
      <rect x="94" y={y} width="10" height={h} rx="4" />
    </>
  );
}

function Mark({ parts }: { parts: Parts }) {
  const [bx, by, rx, ry] = parts.body;
  const [hx, hy, hr] = parts.head;
  return (
    <g fill="currentColor">
      {parts.extra}
      <ellipse cx={bx} cy={by} rx={rx} ry={ry} />
      <circle cx={hx} cy={hy} r={hr} />
      {parts.ears}
      <Legs y={parts.legs?.[0]} h={parts.legs?.[1]} />
      {parts.tail}
    </g>
  );
}

const COAT: Record<CoatId, Parts> = {
  short: {
    body: [70, 62, 34, 20],
    head: [102, 42, 16],
    ears: (
      <>
        <polygon points="90,32 84,16 100,28" />
        <polygon points="108,28 116,14 118,32" />
      </>
    ),
    tail: <rect x="34" y="50" width="22" height="7" rx="3" transform="rotate(-24 34 50)" />,
  },
  double: {
    body: [70, 64, 32, 20],
    head: [100, 42, 16],
    extra: <ellipse cx="70" cy="64" rx="44" ry="30" />,
    ears: (
      <>
        <ellipse cx="90" cy="28" rx="8" ry="12" />
        <ellipse cx="112" cy="28" rx="8" ry="12" />
      </>
    ),
    tail: <ellipse cx="30" cy="52" rx="14" ry="8" transform="rotate(-30 30 52)" />,
  },
  curly: {
    body: [72, 64, 30, 18],
    head: [100, 40, 15],
    extra: (
      <>
        <circle cx="46" cy="52" r="10" />
        <circle cx="58" cy="44" r="10" />
        <circle cx="74" cy="40" r="10" />
        <circle cx="90" cy="46" r="9" />
        <circle cx="48" cy="68" r="9" />
        <circle cx="64" cy="76" r="9" />
        <circle cx="82" cy="76" r="9" />
      </>
    ),
    ears: (
      <>
        <circle cx="90" cy="26" r="9" />
        <circle cx="112" cy="26" r="9" />
      </>
    ),
    tail: <circle cx="34" cy="58" r="8" />,
  },
  long: {
    body: [72, 60, 32, 18],
    head: [104, 40, 15],
    ears: (
      <>
        <rect x="84" y="28" width="10" height="36" rx="5" />
        <rect x="112" y="30" width="10" height="34" rx="5" />
      </>
    ),
    extra: (
      <>
        <rect x="46" y="74" width="6" height="22" rx="3" />
        <rect x="58" y="76" width="6" height="20" rx="3" />
        <rect x="70" y="76" width="6" height="22" rx="3" />
        <rect x="82" y="74" width="6" height="20" rx="3" />
      </>
    ),
    tail: <rect x="30" y="48" width="8" height="34" rx="4" transform="rotate(18 30 48)" />,
    legs: [80, 16],
  },
  wiry: {
    body: [70, 64, 30, 18],
    head: [100, 42, 14],
    extra: (
      <polygon points="40,58 28,50 36,66 24,74 42,74 48,88 56,74 70,90 78,72 96,86 100,70 116,78 108,60 122,52 104,50 96,36 84,48" />
    ),
    ears: (
      <>
        <polygon points="90,30 84,12 98,26" />
        <polygon points="108,26 118,10 120,30" />
      </>
    ),
    tail: <polygon points="36,58 16,44 22,64 8,72 34,66" />,
  },
};

export function Dog({
  coat,
  className,
  title,
}: {
  coat: CoatId;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 110"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <Mark parts={COAT[coat]} />
    </svg>
  );
}

export function PuppyMark({ className, title }: { className?: string; title?: string }) {
  const parts: Parts = {
    body: [68, 68, 26, 16],
    head: [96, 46, 20],
    ears: (
      <>
        <ellipse cx="82" cy="34" rx="7" ry="12" />
        <ellipse cx="110" cy="34" rx="7" ry="12" />
      </>
    ),
    tail: <rect x="40" y="58" width="16" height="6" rx="3" transform="rotate(-20 40 58)" />,
    legs: [82, 16],
  };
  return (
    <svg
      viewBox="0 0 140 110"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <Mark parts={parts} />
    </svg>
  );
}
