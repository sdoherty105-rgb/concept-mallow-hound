import { COATS, PACKAGES, SIZES, DEMO_PRICE, formatDuration, recommend } from "@/lib/data";

/** Coat/size prices as a table on wide screens and stacked cards on phones (no sideways scroll). */
export function PriceLedger() {
  return (
    <>
      <div className="table-wrap ledger-table" tabIndex={0} role="region" aria-label="Demonstration price ledger">
        <table>
          <caption>Recommended package, time and demonstration price for every coat and size. Puppy Debut is a flat $59.</caption>
          <thead>
            <tr>
              <th scope="col">Coat</th>
              {SIZES.map((size) => (
                <th scope="col" key={size.id}>
                  {size.name}
                  <span>{size.range}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COATS.map((coat) => (
              <tr key={coat.id}>
                <th scope="row">
                  {coat.name}
                  <span>{PACKAGES.find((pack) => pack.id === coat.packageId)?.name}</span>
                </th>
                {SIZES.map((size) => {
                  const rec = recommend(coat.id, size.id);
                  return (
                    <td key={size.id}>
                      <strong>${rec.price}</strong>
                      <span>{formatDuration(rec.minutes)}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ledger-cards" role="region" aria-label="Demonstration price ledger">
        <p className="demo-flag ledger-cards__note">{DEMO_PRICE}</p>
        <ul className="ledger-cards__list">
          {COATS.map((coat) => (
            <li key={coat.id} className="ledger-card">
              <h3 className="ledger-card__coat">
                {coat.name}
                <span>{PACKAGES.find((pack) => pack.id === coat.packageId)?.name}</span>
              </h3>
              <ul className="ledger-card__sizes">
                {SIZES.map((size) => {
                  const rec = recommend(coat.id, size.id);
                  return (
                    <li key={size.id} className="ledger-card__size">
                      <span className="ledger-card__label">
                        {size.name}
                        <small>{size.range}</small>
                      </span>
                      <span className="ledger-card__price">
                        <strong>${rec.price}</strong>
                        <small>{formatDuration(rec.minutes)}</small>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}