# concept-mallow-hound

**Mallow Hound** is a fictional mobile dog grooming van for the Perth area, built as a portfolio concept by [OFF/SHIFT Studio](https://offshiftstudio.com.au/concepts/mallow-hound).

> An OFF/SHIFT concept — fictional demonstration. Not a real business. Nothing here is for sale, no forms send data, and every page is `noindex`.

- Slug: `mallow-hound`
- Future demo URL: `mallow-hound.offshiftstudio.com.au` (not configured; nothing is deployed from this repo)
- Direction: playful, soft and premium. Original SVG dog illustrations, rounded shapes, Nunito Sans + DM Sans.
- Palette: `#FFF7EB` cream, `#C9B6E4` lavender, `#34303B` ink, `#ED917A` coral, `#C0DCC8` mint.
- Signature interaction: the coat selector, where a visitor picks coat type and dog size and sees the recommended package, time and price.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, how the van works, packages, coat selector, service area check, calm-handling promise, demo booking form, FAQ, footer |
| `/packages` | Package details, price and time table for every coat and size, add-ons |
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

Deployment is intentionally not part of this repository's workflow. `wrangler.jsonc` names the worker `concept-mallow-hound`; deploying and attaching a domain is a separate, manual step.

## Rules this concept follows

- Visible label on every page, linking to `https://offshiftstudio.com.au/concepts/mallow-hound`
- `noindex, nofollow` via meta tag, `X-Robots-Tag` header (`next.config.ts` and `public/_headers`) and `robots.txt`
- No reviews, testimonials, ratings, statistics, awards or client logos
- Forms are demo-only: client-side validation, a clear demo success state, no network request
- WCAG 2.2 AA focus: landmarks, keyboard support, visible focus, checked contrast, reduced-motion support, content works without JavaScript effects
- Asset sources and licences are recorded in [`ASSETS.md`](./ASSETS.md)


## Visual redesign

A centred van-led opening replaces the split headline and illustration panel. Coverage checking and coat selection now lead the booking journey. Package cards, offset shadows, repeated decorative scenes and the invented service map have been removed in favour of an open grooming menu, simple handling notes and a quieter booking form. Original van and coat illustrations remain purposeful brand assets.
