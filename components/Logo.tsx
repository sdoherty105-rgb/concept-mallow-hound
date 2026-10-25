import { C } from "./Dogs";

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22" fill={C.lavender} stroke={C.ink} strokeWidth="3" />
      <g fill={C.cream} stroke={C.ink} strokeWidth="2.4" strokeLinejoin="round">
        <ellipse cx="24" cy="29" rx="9" ry="7.5" />
        <ellipse cx="13" cy="21" rx="3.6" ry="4.8" transform="rotate(-20 13 21)" />
        <ellipse cx="19.5" cy="14.5" rx="3.6" ry="4.8" transform="rotate(-6 19.5 14.5)" />
        <ellipse cx="28.5" cy="14.5" rx="3.6" ry="4.8" transform="rotate(6 28.5 14.5)" />
        <ellipse cx="35" cy="21" rx="3.6" ry="4.8" transform="rotate(20 35 21)" />
      </g>
      <circle cx="24" cy="29" r="3.4" fill={C.coral} />
    </svg>
  );
}
