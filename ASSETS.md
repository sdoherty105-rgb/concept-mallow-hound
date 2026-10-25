# Assets and licensing

Every asset in this repository, with its source and licence.

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Dog illustrations (five coat types: short, double, curly, long, wiry) | `components/Dogs.tsx` | Original SVG drawn in code for this concept by OFF/SHIFT Studio | Original work, owned by OFF/SHIFT Studio |
| Grooming van, van cutaway, hero scene, calm-handling scene, booking scene, map | `components/Van.tsx`, `components/Scenes.tsx`, `components/ServiceCheck.tsx` | Original SVG drawn in code for this concept | Original work, owned by OFF/SHIFT Studio |
| Logo mark (paw) and favicon | `components/Logo.tsx`, `app/icon.svg` | Original SVG | Original work, owned by OFF/SHIFT Studio |
| Icons (checkmarks, chevrons, calm-promise icons) | `app/globals.css` (inline data URIs), `components/Scenes.tsx` | Original SVG | Original work, owned by OFF/SHIFT Studio |
| Nunito Sans (display font), Latin subset, weights 600 to 1000 | `app/fonts/NunitoSans-var.woff2` | [Google Fonts](https://fonts.google.com/specimen/Nunito+Sans) via the `@fontsource-variable/nunito-sans` package. Subset to Basic Latin plus a few punctuation marks and limited to weights 600 to 1000 with `fonttools` to reduce size | SIL Open Font License 1.1 |
| DM Sans (body font), Latin subset, weights 400 to 700 | `app/fonts/DMSans-var.woff2` | [Google Fonts](https://fonts.google.com/specimen/DM+Sans) via the `@fontsource-variable/dm-sans` package. Subset to Basic Latin plus a few punctuation marks and limited to weights 400 to 700 with `fonttools` to reduce size | SIL Open Font License 1.1 |
| Screenshots | `docs/screens/` | Captured from this site with Playwright | Original work (contains only the assets above) |

## Summary

- No photographs, stock imagery, or images of people are used anywhere.
- No third-party images, icon sets, scripts or trackers are loaded at runtime. Fonts are self-hosted from `app/fonts` and served by Next.js.
- All names, prices, suburbs, hours, phone number and email address on the site are invented. The email domain uses the reserved `.example` TLD.
- The fonts are covered by the SIL Open Font License 1.1, which permits embedding, subsetting and redistribution of modified copies as long as the fonts are not sold on their own. Neither family declares a reserved font name that this subsetting would conflict with.
