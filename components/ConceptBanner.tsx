import { CONCEPT_LABEL, CONCEPT_URL } from "@/lib/data";

export function ConceptBanner() {
  return (
    <div className="road-sign">
      <p>
        <a href={CONCEPT_URL} target="_blank" rel="noopener noreferrer">
          {CONCEPT_LABEL}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
