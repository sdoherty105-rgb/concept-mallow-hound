# concept-mallow-hound

**Mallow Hound** is a fictional mobile dog grooming van for the Perth area, built as a portfolio concept by [OFF/SHIFT Studio](https://offshiftstudio.com.au/concepts/mallow-hound).

> An OFF/SHIFT concept — fictional demonstration. Not a real business. Nothing here is for sale, no forms send data, and every page is `noindex`.

- Slug: `mallow-hound`
- Demo URL: https://mallow-hound.offshiftstudio.com.au (live; see Deployment status below)
- Direction: 05 Colourful, “The route”. A scroll of colour-block stops. The van rides a dashed road in the margin. Playful, written for adults with dogs. Bricolage Grotesque (width 75, weight 800) and Atkinson Hyperlegible Next.
- Palette: `#FFF9EE` paper, `#2A3DF0` cobalt, `#FFD84D` butter, `#7DE0B5` mint, `#FF6A2B` tangerine (fills and large display only), `#3B1C6B` grape.
- Signature interactions: the suburb check types the answer on the van, and the coat picker re-themes the accent and lifts the matching ticket.

## Pages

| Route | What it is |
| --- | --- |
| `/` | The route: suburb check, the van, coat picker, four unequal tickets, a week of day buttons, question strips, the depot |
| `/packages` | The full menu: demonstration price ledger, one band per groom, extras |
| `/robots.txt` | `Disallow: /` |

## Stack

Next.js 15 (App Router, TypeScript), static prerendered, deployable to Cloudflare Workers with `@opennextjs/cloudflare`. Fonts are self-hosted via `next/font/local`. No analytics, no trackers, no third-party requests.

## Commands

```bash
npm install
npm run dev          # local dev server
npm run build        # production build
npm start            # serve the production build
npm run typecheck
npm test             # unit tests (Vitest)
npm run test:e2e     # Playwright (needs `npm run build` first)
npm run lhci         # Lighthouse CI, mobile
npm run cf:build     # OpenNext Worker bundle, build only
```

## Deployment status (checked 2026-11-10)

- https://mallow-hound.offshiftstudio.com.au is live on the Cloudflare Worker `concept-mallow-hound` (HTTP 200, `X-Robots-Tag: noindex, nofollow`).
- It serves the **`main`** design (b3f8aff, PR #2: lavender/cream, "Calm promise" nav). The colour-block route redesign on `redesign/2026-11` (draft PR #3) is **not** deployed.
- This repository has no deploy step: CI (`.github/workflows/ci.yml`) only builds, tests, runs Lighthouse and smoke-tests the Worker bundle locally. Whatever published `main` was configured outside this repo (Cloudflare dashboard). Pushes to `redesign/2026-11` since 2 Nov have not changed the live site.
- To launch the redesign: merge PR #3, then deploy `main` the same way it was deployed before (`npm run cf:build`, then `npx wrangler deploy` by the owner), and confirm that the live home page shows the "Fictional business. A concept site by OFF/SHIFT Studio." strip.
- https://offshiftstudio.com.au/concepts/mallow-hound (the "Back to the concept" target) returned 404 on 2026-11-10; it is owned by the studio repo.

## Rules this concept follows

- A strip on every page (repeated in the footer) says the business is fictional and links to "Back to the concept" (`https://offshiftstudio.com.au/concepts/mallow-hound`) and "Want a website like this?" (`https://offshiftstudio.com.au/?concept=mallow-hound#contact`), both in the same tab
- `noindex, nofollow` via meta tag, `X-Robots-Tag` header (`next.config.ts` and `public/_headers`) and `robots.txt`
- No reviews, testimonials, ratings, statistics, awards or client logos
- Forms are demo-only: client-side validation, a clear demo success state, no network request
- WCAG 2.2 AA focus: landmarks, keyboard support, visible focus, checked contrast, reduced-motion support, content works without JavaScript effects
- Asset sources and licences are recorded in [`ASSETS.md`](./ASSETS.md)


## Visual redesign

The page is a route. A road-sign strip carries the concept label, numbered stop pills replace the old link row, and a dashed road in the left margin carries the van as you scroll. Each stop is a different colour block with different content: a suburb input, a cutaway, a coat picker, unequal tickets, a week of day buttons, and accordion strips. The packages page is a separate menu board, not another copy of the home page. Nunito Sans and DM Sans are retired. Illustration is flat geometric SVG with no faces.
