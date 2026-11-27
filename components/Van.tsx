/** Flat geometric van: eight shapes. No windows with faces, no scenery. */

export function VanArt() {
  return (
    <svg className="hero-van__svg" viewBox="0 0 760 250" role="img" aria-label="Geometric grooming van">
      <rect x="24" y="62" width="470" height="128" rx="16" fill="#2A3DF0" />
      <rect x="470" y="92" width="230" height="98" rx="14" fill="#2A3DF0" />
      <rect x="520" y="108" width="132" height="48" rx="6" fill="#1E2CC4" />
      <rect className="van-stripe" x="24" y="132" width="446" height="24" fill="var(--accent)" />
      <rect x="40" y="74" width="410" height="50" rx="6" fill="#FFF9EE" />
      <text x="245" y="108" textAnchor="middle" fill="#3B1C6B" fontSize="22" fontFamily="inherit" fontWeight="800">
        Mallow Hound
      </text>
      <circle cx="170" cy="198" r="34" fill="#3B1C6B" />
      <circle cx="575" cy="198" r="34" fill="#3B1C6B" />
      <rect x="668" y="150" width="28" height="16" rx="3" fill="#FF6A2B" />
    </svg>
  );
}

export function MiniVan() {
  return (
    <svg viewBox="0 0 64 40" focusable="false">
      <rect x="2" y="10" width="40" height="18" rx="2" fill="#2A3DF0" />
      <rect x="38" y="14" width="22" height="14" rx="2" fill="#2A3DF0" />
      <rect x="44" y="16" width="12" height="6" fill="#FFF9EE" />
      <rect x="2" y="18" width="36" height="4" fill="var(--accent)" />
      <rect x="6" y="12" width="16" height="5" fill="#FFF9EE" />
      <circle cx="16" cy="30" r="5" fill="#3B1C6B" />
      <circle cx="48" cy="30" r="5" fill="#3B1C6B" />
      <rect x="56" y="22" width="5" height="3" fill="#FF6A2B" />
    </svg>
  );
}

export function VanCutaway() {
  return (
    <svg viewBox="0 0 640 400" focusable="false" aria-hidden="true">
      <rect x="12" y="16" width="616" height="360" rx="18" fill="#FFF9EE" />
      <rect x="12" y="16" width="616" height="52" rx="18" fill="#FFD84D" />
      <rect x="12" y="48" width="616" height="22" fill="#FFD84D" />
      <rect x="12" y="312" width="616" height="64" fill="#7DE0B5" />
      <rect x="36" y="120" width="86" height="180" rx="8" fill="#2A3DF0" />
      <text x="79" y="214" textAnchor="middle" fill="#FFF9EE" fontSize="28" fontFamily="inherit" fontWeight="800">
        1
      </text>
      <rect x="160" y="196" width="196" height="108" rx="10" fill="#7DE0B5" />
      <rect x="176" y="212" width="164" height="72" fill="#FFF9EE" />
      <text x="258" y="256" textAnchor="middle" fill="#3B1C6B" fontSize="28" fontFamily="inherit" fontWeight="800">
        2
      </text>
      <rect x="400" y="108" width="196" height="26" rx="6" fill="#FF6A2B" />
      <rect x="486" y="108" width="16" height="78" fill="#3B1C6B" />
      <text x="548" y="128" textAnchor="middle" fill="#3B1C6B" fontSize="22" fontFamily="inherit" fontWeight="800">
        3
      </text>
      <rect x="390" y="248" width="210" height="26" rx="6" fill="#FFD84D" />
      <rect x="412" y="274" width="14" height="38" fill="#3B1C6B" />
      <rect x="568" y="274" width="14" height="38" fill="#3B1C6B" />
      <text x="495" y="268" textAnchor="middle" fill="#3B1C6B" fontSize="22" fontFamily="inherit" fontWeight="800">
        4
      </text>
    </svg>
  );
}

export function StopMark({ n }: { n: string }) {
  return (
    <div className="stop-mark" aria-hidden="true">
      <span className="stop-mark__n">{n}</span>
      <span className="stop-van">
        <MiniVan />
      </span>
    </div>
  );
}
