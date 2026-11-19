import { BACK_LABEL, CONCEPT_URL, CTA_LABEL, DISCLOSURE, STUDIO_CONTACT_URL } from "@/lib/data";

/** The road-sign strip: who made this, that it is fictional, and the two ways back to OFF/SHIFT. */
export function ConceptBanner() {
  return (
    <aside className="road-sign" aria-label="About this concept site">
      <p className="road-sign__disclosure">{DISCLOSURE}</p>
      <p className="road-sign__links">
        <a href={CONCEPT_URL}>{BACK_LABEL}</a>
        <a className="road-sign__cta" href={STUDIO_CONTACT_URL}>
          {CTA_LABEL}
        </a>
      </p>
    </aside>
  );
}
