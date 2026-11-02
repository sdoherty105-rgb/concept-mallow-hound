import type { ReactNode } from "react";
import type { CoatId } from "@/lib/data";

/**
 * Side-profile hounds, one per coat. No eyes, nose or mouth.
 * Each coat is a different silhouette, not the same body with swapped ears.
 * Short is long and low, double is a round coat, curly is a pom clip,
 * long is a hair curtain, wiry is a box with a beard, puppy is a big head.
 */

function Frame({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g fill="currentColor">{children}</g>
    </svg>
  );
}

function Short() {
  return (
    <>
      <path d="M18 92 L46 84 L44 98 Z" />
      <path d="M42 108 C52 74 96 66 138 72 C162 76 176 90 188 102 L176 116 C148 128 86 132 54 120 C40 114 34 112 42 108 Z" />
      <path d="M156 98 C168 68 196 54 222 64 C234 70 234 86 220 94 C204 102 182 100 168 112 Z" />
      <path d="M178 66 L160 54 L190 64 Z" />
      <path d="M72 116 L66 150 L82 150 L86 120 Z" />
      <path d="M118 120 L122 152 L138 152 L130 122 Z" />
    </>
  );
}

function Double() {
  return (
    <>
      <circle cx="118" cy="96" r="52" />
      <circle cx="168" cy="78" r="34" />
      <circle cx="62" cy="100" r="28" />
      <circle cx="86" cy="70" r="22" />
      <circle cx="146" cy="58" r="20" />
      <path d="M78 128 L72 152 L90 152 L92 130 Z" />
      <path d="M124 132 L128 154 L146 154 L138 132 Z" />
    </>
  );
}

function Curly() {
  return (
    <>
      <circle cx="78" cy="108" r="34" />
      <circle cx="118" cy="96" r="30" />
      <circle cx="156" cy="78" r="26" />
      <circle cx="186" cy="96" r="16" />
      <circle cx="64" cy="136" r="12" />
      <circle cx="108" cy="140" r="12" />
      <circle cx="96" cy="64" r="14" />
      <circle cx="140" cy="52" r="12" />
    </>
  );
}

function Long() {
  return (
    <>
      <path d="M78 96 C86 78 120 74 150 80 L156 108 C130 118 96 118 74 108 Z" />
      <circle cx="168" cy="58" r="24" />
      <path d="M152 66 C146 90 140 120 136 150 H150 C152 120 156 92 162 70 Z" />
      <path d="M174 68 C180 96 184 124 186 150 H200 C196 118 190 90 182 68 Z" />
      <path d="M70 104 C62 120 58 136 56 150 H70 C72 134 76 118 82 106 Z" />
      <path d="M108 110 C104 126 102 140 100 152 H114 C114 136 116 122 122 110 Z" />
      <path d="M48 100 C36 112 30 128 34 142 C40 132 52 118 64 108 Z" />
    </>
  );
}

function Wiry() {
  return (
    <>
      <path d="M46 92 H132 V118 H46 Z" />
      <path d="M118 78 H168 V108 H124 Z" />
      <path d="M128 78 L136 48 L150 76 Z" />
      <path d="M150 72 L164 42 L176 74 Z" />
      <path d="M156 108 H196 L190 124 H182 L176 116 H168 L162 128 H152 Z" />
      <path d="M34 96 L48 86 V102 Z" />
      <path d="M58 118 H70 V150 H58 Z" />
      <path d="M96 118 H108 V150 H96 Z" />
      <path d="M132 112 H144 V148 H132 Z" />
    </>
  );
}

function Puppy() {
  return (
    <>
      <ellipse cx="108" cy="112" rx="46" ry="30" />
      <circle cx="162" cy="78" r="36" />
      <ellipse cx="138" cy="70" rx="14" ry="22" />
      <ellipse cx="186" cy="74" rx="14" ry="22" />
      <path d="M78 124 L74 150 L90 150 L92 126 Z" />
      <path d="M118 128 L122 152 L138 152 L132 128 Z" />
      <path d="M62 108 L40 116 L46 126 L70 118 Z" />
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
