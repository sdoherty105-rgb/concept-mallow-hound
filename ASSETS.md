# Assets and licensing

Every asset in this repository, with its source and licence. Prices, suburbs, visit windows and promises on the site are invented demonstration data.

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Dog coat illustrations (short, double, curly, long, wiry) and the puppy | `components/Dogs.tsx` | Original SVG drawn in code for this concept by OFF/SHIFT Studio. One side-profile pose for every coat: snout, ear, two legs and a tail. No eyes or mouth. | Original work, owned by OFF/SHIFT Studio |
| Geometric van, margin van and cutaway interior | `components/Van.tsx` | Original SVG drawn in code for this concept. The hero van is eight flat shapes. | Original work, owned by OFF/SHIFT Studio |
| Favicon | `app/icon.svg` | Original SVG, the same van reduced to flat shapes | Original work, owned by OFF/SHIFT Studio |
| OFF/SHIFT Studio wordmark (footer credit) | `public/brand/offshift-wordmark-light.svg` | Canonical file from the OFF/SHIFT Studio repository `public/brand/`, used unaltered and linked to offshiftstudio.com.au | Owned by OFF/SHIFT Studio, used by the studio on its own concept |
| Fredoka variable, Latin subset, axes wdth and wght | `app/fonts/Fredoka-latin.woff2` | [Fredoka](https://github.com/hafontia/Fredoka-One), file taken from [google/fonts](https://github.com/google/fonts/tree/main/ofl/fredoka) `Fredoka[wdth,wght].ttf` and subset with fonttools to Basic Latin plus typographic punctuation. Full licence text: `app/fonts/OFL-Fredoka.txt`. No Reserved Font Name is declared. | SIL Open Font License 1.1 |
| Atkinson Hyperlegible Next variable, Latin subset, weight axis | `app/fonts/AtkinsonHyperlegibleNext-latin.woff2` | [Atkinson Hyperlegible Next](https://github.com/googlefonts/atkinson-hyperlegible-next), file taken from [google/fonts](https://github.com/google/fonts/tree/main/ofl/atkinsonhyperlegiblenext) `AtkinsonHyperlegibleNext[wght].ttf` and subset the same way. Full licence text: `app/fonts/OFL-Atkinson.txt`. No Reserved Font Name is declared. | SIL Open Font License 1.1 |
| Screenshots, before the route redesign | `docs/screens/before/` | Captured from the previous Mallow Hound concept with Playwright | Original work |
| Screenshots, after the route redesign | `docs/screens/` | Captured from this site with Playwright at 390, 768 and 1440, reduced motion on, so the van is in its static parked state | Original work (contains only the assets above) |

## Summary

- No photographs, stock imagery, or images of people or dogs’ faces are used anywhere.
- No third-party images, icon sets, scripts or trackers are loaded at runtime. Fonts are self-hosted from `app/fonts` and served by Next.js.
- All names, prices, suburbs, visit windows, hours, phone number and email address on the site are invented. The email domain uses the reserved `.example` TLD.
- The fonts are covered by the SIL Open Font License 1.1, which permits embedding, subsetting and redistribution of modified copies as long as the fonts are not sold on their own.
