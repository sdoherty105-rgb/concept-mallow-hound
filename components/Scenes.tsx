import { C, Dog } from "./Dogs";

export function CalmScene() {
  return (
    <svg
      viewBox="0 0 480 400"
      className="calm-scene"
      role="img"
      aria-label="Illustration of a long-haired dog with closed eyes resting on a soft cushion"
    >
      <circle cx="240" cy="200" r="180" fill={C.cream} opacity=".55" />
      <circle cx="240" cy="200" r="132" fill={C.cream} opacity=".6" />
      <path d="M90 330 C90 296 140 284 240 284 C340 284 390 296 390 330 C390 362 340 372 240 372 C140 372 90 362 90 330Z" fill={C.coral} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M130 322 C170 306 310 306 350 322" fill="none" stroke={C.cream} strokeWidth="5" strokeLinecap="round" opacity=".8" />
      <circle cx="104" cy="332" r="8" fill={C.cream} stroke={C.ink} strokeWidth="3" />
      <circle cx="376" cy="332" r="8" fill={C.cream} stroke={C.ink} strokeWidth="3" />
      <g className="bob-slow">
        <Dog coat="long" closed tongue={false} x={110} y={60} width={260} height={260} collar={C.lavender} />
      </g>
      <ellipse cx="400" cy="88" rx="36" ry="14" fill={C.lavender} opacity=".55" />
      <ellipse cx="418" cy="62" rx="22" ry="9" fill={C.lavender} opacity=".45" />
    </svg>
  );
}

export function BookingScene() {
  return (
    <svg
      viewBox="0 0 360 260"
      className="booking-scene"
      role="img"
      aria-label="Illustration of a wiry terrier and a short-coated dog sitting side by side, looking pleased"
    >
      <ellipse cx="180" cy="130" rx="168" ry="118" fill={C.lavender} opacity=".6" />
      <path d="M12 212 C80 194 160 204 240 212 C296 218 330 208 348 204 V236 a20 20 0 0 1 -20 20 H32 a20 20 0 0 1 -20 -20Z" fill={C.mint} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
      <g className="bob-slow">
        <Dog coat="wiry" x={26} y={70} width={170} height={170} collar={C.coral} />
      </g>
      <g className="bob">
        <Dog coat="double" x={170} y={46} width={176} height={176} collar={C.cream} />
      </g>
    </svg>
  );
}

export function CalmIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: C.ink, strokeWidth: 3.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22" fill={C.cream} stroke={C.ink} strokeWidth="3" />
      {name === "one" && (
        <>
          <circle cx="24" cy="21" r="8" {...common} fill={C.coral} />
          <path d="M12 38 C14 30 34 30 36 38" {...common} />
        </>
      )}
      {name === "hello" && (
        <>
          <path d="M14 26 C14 18 22 16 24 22 C26 16 34 18 34 26 C34 32 24 38 24 38 C24 38 14 32 14 26Z" {...common} fill={C.coral} />
        </>
      )}
      {name === "breaks" && (
        <>
          <rect x="15" y="14" width="6" height="20" rx="3" {...common} fill={C.lavender} />
          <rect x="27" y="14" width="6" height="20" rx="3" {...common} fill={C.lavender} />
        </>
      )}
      {name === "warm" && (
        <>
          <path d="M24 12 C30 20 34 24 34 29 A10 10 0 0 1 14 29 C14 24 18 20 24 12Z" {...common} fill={C.mint} />
        </>
      )}
      {name === "stop" && (
        <>
          <circle cx="24" cy="24" r="10" {...common} fill={C.lavender} />
          <path d="M24 18 V24 L28 27" {...common} />
        </>
      )}
      {name === "loop" && (
        <>
          <rect x="15" y="12" width="18" height="24" rx="5" {...common} fill={C.mint} />
          <path d="M21 17 H27 M24 31 H24.01" {...common} />
        </>
      )}
    </svg>
  );
}
