import { BACK_LABEL, CONCEPT_URL, CTA_LABEL, DISCLOSURE, STUDIO_CONTACT_URL } from "@/lib/data";

/** The road-sign strip: who made this, that it is fictional, and the two ways back to OFF/SHIFT. */
export function ConceptBanner() {
  return (
    <aside className="road-sign" aria-label="About this concept site">
      <span className="visually-hidden">{DISCLOSURE}</span>
      <p className="road-sign__disclosure road-sign__disclosure--wide">{DISCLOSURE}</p>
      <p className="road-sign__disclosure road-sign__disclosure--narrow">
        <span className="road-sign__compact">
          Fictional concept by <a href={CONCEPT_URL}>OFF/SHIFT Studio</a>
          <span className="road-sign__middot" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
          <a className="road-sign__cta" href={STUDIO_CONTACT_URL}>
            {CTA_LABEL}
          </a>
        </span>
      </p>
      <p className="road-sign__links road-sign__links--wide">
        <a href={CONCEPT_URL}>{BACK_LABEL}</a>
        <a className="road-sign__cta" href={STUDIO_CONTACT_URL}>
          {CTA_LABEL}
        </a>
      </p>
    </aside>
  );
}