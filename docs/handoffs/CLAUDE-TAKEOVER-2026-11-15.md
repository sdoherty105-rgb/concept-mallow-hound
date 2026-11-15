# Claude Code takeover: Mallow & Hound (concept-mallow-hound) — 15 Nov 2026

> Handoff written by **Grok Bot "Chief"** (OFF/SHIFT coordinator) on 15 Nov 2026, about 10:25 PM AWST (UTC+8), under Stephen Doherty's owner directive on [offshift-studio Issue #84, comment 6895682139](https://github.com/sdoherty105-rgb/offshift-studio/issues/84#issuecomment-6895682139) and his chat instruction t499u (10:11 PM AWST, 15 Nov 2026).
> This file is documentation only. No design, code or tests were changed by this handoff commit.
> Where there is no direct evidence, this file says **UNKNOWN / NOT ACCESSIBLE**.

## 1. Repository, PR, branch and current owner

| Item | Value |
|---|---|
| Repo | [sdoherty105-rgb/concept-mallow-hound](https://github.com/sdoherty105-rgb/concept-mallow-hound) |
| Draft PR | [#3](https://github.com/sdoherty105-rgb/concept-mallow-hound/pull/3) — `Redesign Mallow Hound as a colour-block van route` (draft, open) |
| Base | `main` |
| Branch | `redesign/2026-11` (existing; keep using it) |
| Verified code head (before this file) | `8d1a4d2f9124bb28328df214523e30e9dc9e0c0e` — "Record the real deployment status in the README" (committed 10 Nov 2026, 10:04 PM AWST) |
| Directive's last-seen SHA | `8d1a4d2f9124bb28328df214523e30e9dc9e0c0e` — **matches** the verified head (re-checked with `gh api repos/sdoherty105-rgb/concept-mallow-hound/branches/redesign/2026-11` at ~10:15 PM AWST) |
| Branch tip after this handoff | the docs-only commit that adds this file (parent = `8d1a4d2`) |
| CI on the code head | **Green** — [run 42830562729](https://github.com/sdoherty105-rgb/concept-mallow-hound/actions/runs/42830562729) (pull_request) and [run 42830548097](https://github.com/sdoherty105-rgb/concept-mallow-hound/actions/runs/42830548097) (push), 10 Nov 2026 ~10:05 PM AWST, both success (jobs: Build, test and Lighthouse (mobile); OpenNext Cloudflare bundle (build only, no deploy)). |
| Live deployed SHA / version | **UNKNOWN / NOT VERIFIED TODAY** as a Git SHA. Cloudflare Worker `concept-mallow-hound` active version `2c46b0b5-20b9-4262-b9ba-ce4f76676eb5`, manual `wrangler` deploy, 25 Oct 2026 ~10:27 PM AWST. README (10 Nov) says live = `main` `b3f8aff` (pre-redesign). |
| Previous implementation owner | Cursor cloud agent `bc-5d04a030-a59a-50d8-9b22-b2872660365d` (run #4) |
| Previous owner status | **STOPPED — status `error`** (Chief, CloudAgent status check ~10:12 PM AWST 15 Nov). No run is active. Its final run started ~9:45 PM AWST, read two files and ran `git status`, then errored before making any edit. Cursor usage is exhausted; Stephen said **do not restart it and do not enable on-demand usage**. |
| New implementation owner | **Claude Code — pending takeover.** One implementation owner at a time (see section 7). |

### Deploy-trigger check (done before pushing this file)
- `.github/workflows/ci.yml` (the only workflow on this branch) triggers on `push` to any branch except `main`, and `pull_request`. It contains **no deploy step**: the OpenNext job only builds the Worker bundle (`opennextjs-cloudflare build`), and there is no `wrangler deploy` / `versions upload` anywhere in the workflow. `package.json` has no deploy script.
- `wrangler.jsonc`: Worker name `concept-mallow-hound`, no routes or secrets in the file.
- Cloudflare (read-only API check by Chief, 15 Nov 2026 ~10:20 PM AWST): the Worker `concept-mallow-hound` has **no Workers Builds (Git) triggers**. Its active deployment is version `2c46b0b5-20b9-4262-b9ba-ce4f76676eb5`, deployed with `wrangler` (manual) on **25 Oct 2026 at about 10:27 PM AWST**. So pushes to any branch of this repo do not build or deploy on Cloudflare.
- Live deployed SHA: **UNKNOWN / NOT VERIFIED TODAY** from Cloudflare (Cloudflare records a version ID, not a Git SHA). The repo README (checked 10 Nov 2026) says the live demo serves **`main` at `b3f8aff`**, the pre-redesign design, not this branch.
- Decision for this handoff commit: committed straight to `redesign/2026-11` as a fast-forward (one new file only), with `[skip ci]` in the commit message because it is documentation-only. The last code commit's CI result stands (see below). Claude's first real fix push will run CI normally.

## 2. Independent review findings (Phil, Issue #84 quality gate) — copied faithfully

Source: Phil's read-only quality gate, report `/workspace/concept-review/issue84/REPORT.md` on the Grok Bot box (Phil's summary sent 15 Nov 2026 at about 9:41 PM AWST). Tested SHA: **`8d1a4d2f9124bb28328df214523e30e9dc9e0c0e`** — identical to the verified code head. Method: `npm ci && npm run build`, `next start`, Playwright 1.65.1 (Chromium headless shell) and @axe-core/playwright (wcag2a/2aa/21a/21aa/22aa) at 390, 768 and 1440.

**Verdict: NEEDS SPECIFIC FIXES (minor)**

Matrix row from the report:

| Concept | Tested SHA | 390/768/1440 | Centrepiece | Reduced motion | Keyboard/focus | Contrast (axe) | Overflow | Disclosure/mock pricing/noindex | Demo forms | Overall |
|---|---|---|---|---|---|---|---|---|---|---|
| Mallow & Hound | 8d1a4d2 | PASS | PASS (suburb check, coat/size ticket, prefill) | PASS | PASS | PASS | PASS | PASS | FAIL-minor (required fields not indicated) | **NEEDS SPECIFIC FIXES** |

Checks that **passed** on this concept at every route and width (must stay passing): HTTP 200; `x-robots-tag: noindex` header plus meta noindex; fictional disclosure visible in the first viewport; mock prices labelled; skip link first in tab order and working; visible focus ring; no horizontal overflow at 390/768/1440; zero console errors; zero failed requests; demo forms make no non-GET or external requests and say nothing was sent.

### Findings and exact fixes (verbatim from the report)
1. **`components/BookingForm.tsx`.** Fields are required (for example "Please enter your email address.") but nothing marks them, and there's no `aria-required`. Fix: add a `required` prop to `Field` (line 397) that renders a visible "(required)" marker and sets `aria-required="true"` on the control. Apply it to ownerName, mobile, email, suburb, dogName, coat and size (lines ~212–320). Alternatively, make email optional. *(Severity: FAIL-minor.)*

### Screenshot evidence
**Phil's captures are on the Grok Bot box, not on GitHub** (box path `/workspace/concept-review/issue84/mallow-hound/8d1a4d2/`). Files there:
`home-390.png`, `home-768.png`, `home-1440.png` (+ `-reduced` at 390/1440), `packages-390/768/1440.png` (+ `-reduced`), `kbd-first-tab-390.png`, `kbd-first-tab-1440.png`, `kbd-tab6-390.png`, `kbd-tab6-1440.png`, `generic.json`, and `journey/` (booking journey).

Ask the coordinator (Chief) for copies if you need to see them; you can reproduce every finding yourself with the repro steps in section 4.

In-repo captures from the earlier redesign work (pre-dating these findings) are under [`docs/screens/`](https://github.com/sdoherty105-rgb/concept-mallow-hound/tree/8d1a4d2f9124bb28328df214523e30e9dc9e0c0e/docs/screens) at `8d1a4d2` (`home-390/768/1440.png`, `packages-390/768/1440.png`, `before/`).

Not verified by Phil (applies here too): real iPhone/Safari; Lighthouse was not re-run by Phil (CI Lighthouse is the record); live Cloudflare site not checked; 768 got generic captures only (journeys ran at 390 and 1440).

## 3. Status of each fix: FIXED vs IN PROGRESS vs NOT STARTED

Evidence: GitHub branch head (unchanged since the review) and the full Cursor transcript of `bc-5d04a030-a59a-50d8-9b22-b2872660365d` (copy on the Grok Bot box at `/workspace/cloud-agent-transcripts/bc-5d04a030-a59a-50d8-9b22-b2872660365d.jsonl`), read from the last prompt mentioning "issue #84 quality gate" to the end.

| # | Fix | Status | Evidence |
|---|---|---|---|
| 1 | `Field` `required` prop → visible "(required)" + `aria-required="true"` on ownerName, mobile, email, suburb, dogName, coat, size | **NOT STARTED** | Final run read `lib/booking.ts` and `components/BookingForm.tsx`, ran `git status` (clean, on `8d1a4d2`), then errored. No edit tool call. |

FIXED and committed on GitHub for this finding: **none.**

**Uncommitted Cursor VM/worktree state: UNKNOWN / NOT ACCESSIBLE.** The Cursor VM (`/agent/repos/concept-mallow-hound`) cannot be reached, nothing from the final run was committed or pushed (the GitHub head is still `8d1a4d2`), and no Cursor agent store for this ID is mounted. Treat any in-VM edits as **lost**; they do **not** exist on GitHub. Redo the work from `8d1a4d2`.

## 4. Claude's checklist (smallest approved change set)

- [ ] **M1 Required fields.** In `components/BookingForm.tsx`, extend `Field` (line 397; props `id`, `label`, `error`, `children`) with `required?: boolean`. When true, render a visible "(required)" marker inside the label and set `aria-required="true"` on the control. Apply it to the Fields at ≈ line 212 `ownerName` ("Your name"), 224 `mobile`, 238 `email`, 251 `suburb`, 270 `dogName` ("Dog’s name"), 291 `coat` ("Coat type"), 309 `size`. Do **not** mark `packageId`.
  - Check `lib/booking.ts` validation first: the marked set must exactly match what validation actually requires. Keep email required unless Stephen decides otherwise (the report's "make email optional" alternative is a scope/copy decision, so don't take it without approval).
  - For `coat` and `size` (choice groups), put `aria-required="true"` on the group/radio input that carries the field id, whichever the existing markup uses.
  - Accept: at 390/768/1440 each of the seven labels shows "(required)"; each control (or its radiogroup) exposes `aria-required="true"` in the accessibility tree; error messages unchanged; submitting still makes no network request and the success message still says nothing was sent; axe clean; booking-form screenshots at 390/768/1440 committed.

**Global acceptance for this concept**
- [ ] Only the files listed above change (plus new screenshots under `docs/screens/` and, if needed, a focused test for the fix).
- [ ] Local: `npm run typecheck`, `npm test` (vitest), `npm run build`, `npm run test:e2e`, `npx lhci autorun --config=lighthouserc.cjs`, `npm run cf:smoke` all pass.
- [ ] axe (wcag2a/2aa/21a/21aa/22aa) at 390/768/1440: zero serious/critical violations on every route.
- [ ] GitHub CI on the new head is green on every job: Build, test and Lighthouse (mobile); OpenNext Cloudflare bundle (build only, no deploy).
- [ ] Lighthouse gates unchanged and passing (Performance >= 0.90, Accessibility >= 0.95, Best Practices >= 0.95, SEO >= 0.6, LCP <= 2500 ms, CLS <= 0.1, as in `lighthouserc.cjs`).
- [ ] Screenshots at 390/768/1440 committed under `docs/screens/` and linked in a PR #3 comment that lists the new head SHA and each CI job conclusion by name.
- [ ] PR #3 is still a **draft**; nothing merged or deployed.

**Explicitly out of scope:** form layout or styling beyond the marker, validation rules, copy (other than the "(required)" marker), pricing/estimate logic, the colour-block route, package cards, Lighthouse thresholds, README deploy text, any other concept.

## 5. Visual direction and must-preserve details

- Approved direction: **"Colour-block van route"** — playful, saturated. Bricolage Grotesque + Atkinson Hyperlegible Next (self-hosted via `next/font/local`); yellow/cobalt/mint/plum colour blocks on cream.
- Navigation: numbered route stops.
- Centrepiece: colour-block route with suburb check, coat/size ticket, and booking prefill; honest demo booking estimate.
- Studio strip fits two lines on phones (recent fix `37f2ee6`); coat icons are dog side profiles.
- No analytics, trackers or third-party requests.

Rules for every concept:
- Keep `noindex` (the `x-robots-tag: noindex` header **and** the meta robots tag) on every route.
- Keep the fictional-business disclosure visible in the first viewport on every route.
- Keep every form mock-only: no network send (no non-GET or external request), and the success state must keep saying nothing was sent.
- Keep mock/demo price labelling.
- Keep the skip link as the first tab stop, a visible focus ring everywhere, zero console errors, zero failed requests, and no horizontal overflow at 390/768/1440.
- Keep reduced-motion behaviour as it is.
- Keep the Lighthouse CI gates exactly as configured in the repo (`lighthouserc.cjs`). Do **not** lower any threshold.
- `demoLive` is a flag in the OFF/SHIFT studio site (`sdoherty105-rgb/offshift-studio`), not in this repo. It stays `false`; nothing in this handoff touches it.
- No new creative direction. The approved redesign on `redesign/2026-11` is the direction; only the listed fixes are in scope.

## 6. Safe execution recipe

```bash
# 1. Clone and check out the EXISTING branch (do not create a new one)
git clone https://github.com/sdoherty105-rgb/concept-mallow-hound.git
cd concept-mallow-hound
git checkout redesign/2026-11
git pull --ff-only origin redesign/2026-11

# 2. Verify you are on the expected code before editing.
#    The branch tip will be the docs-only handoff commit that added THIS file;
#    its parent must be the verified code head 8d1a4d2.
git log -3 --oneline
git merge-base --is-ancestor 8d1a4d2f9124bb28328df214523e30e9dc9e0c0e HEAD && echo "OK: 8d1a4d2 is in history"
git diff --stat 8d1a4d2f9124bb28328df214523e30e9dc9e0c0e HEAD   # must show ONLY docs/handoffs/CLAUDE-TAKEOVER-2026-11-15.md
# If the tip has moved beyond the handoff commit, STOP and report: someone else is working on it.

# 3. Install and run the repo's own checks (Node 22, as in CI)
npm ci
npm run typecheck
npm test                            # vitest run
npm run build
npx playwright install --with-deps chromium   # first time only
npm run test:e2e
npx lhci autorun --config=lighthouserc.cjs
npm run cf:smoke                    # OpenNext build + local wrangler-dev smoke; no deploy
npm run screens                     # existing screenshot script (scripts/screenshots.mjs)
```
Note: CI here runs on **every push to non-`main` branches**, so each push to `redesign/2026-11` starts CI (build/test/Lighthouse/bundle only; it never deploys).
- Screenshots: capture 390, 768 and 1440 (plus the specific repro views below) **before and after** the change and commit them under `docs/screens/` (follow the existing naming in that folder). Attach or link them in PR #3.
- Avoid conflicts: one concept at a time; only you edit this branch while you hold ownership. `git pull --ff-only` before each commit; never force-push.
- Avoid accidental live deployments: CI here never deploys (checked below) and the Cloudflare Worker has no Git build trigger, so pushing to `redesign/2026-11` is safe. Never run `wrangler deploy` / `wrangler versions upload`, and never push to `main`.

## 7. Ownership, handoff time and review gates

- Handoff owner: **Grok Bot "Chief"** (coordinator), 15 Nov 2026, about 10:25 PM AWST (UTC+8).
- Source evidence: GitHub API (branch, PR, workflow runs) at ~10:15 PM AWST; Cloudflare API read-only (Worker deployments, Workers Builds triggers) at ~10:20 PM AWST; Phil's report `/workspace/concept-review/issue84/REPORT.md`; Cursor transcript `/workspace/cloud-agent-transcripts/bc-5d04a030-a59a-50d8-9b22-b2872660365d.jsonl`; Stephen's directive (Issue #84 comment 6895682139) and chat t499u.
- **One implementation owner at a time.** Cursor ownership is stopped (status `error`, not restarted, will not be restarted). Claude Code becomes the only implementation owner once Stephen hands it this URL. Before coding, Claude confirms: the branch tip is this handoff commit (or its verified successor), no other agent has pushed since, and the PR is still a draft.
- Work on **one concept at a time**.
- After Claude pushes: **independent re-test by Phil** (Issue #84 quality gate, re-run at the new SHA) and **Engineer review**, then **Stephen's explicit acceptance**. Merge and deploy each need Stephen's **separate, explicit approval**. Approval to build is not approval to merge or deploy.

## 8. Prohibitions

- **No merge** of PR #3 or anything else. The PR stays a **draft**.
- **No deployment** of any kind: no `wrangler deploy`, no `wrangler versions upload`, no `npm run cf:preview` against a remote, no dashboard deploys.
- **No enabling `demoLive`** (it stays `false` in offshift-studio) and no edits to the offshift-studio repo from this task.
- **No client or Mandy work** (BAH/BAH2 are protected and out of scope).
- **No credentials or secrets** created, changed, printed or committed. No Cloudflare settings, DNS or Workers Builds changes.
- **No paid Cursor runs**: do not restart or resume the Cursor cloud agents listed above. Cursor usage is exhausted and Stephen said not to restart them or enable on-demand usage.
- **No unrelated refactors**, dependency upgrades, design changes, copy changes, or threshold changes.
- **No force-push, no history rewrite, no branch deletion.** Fast-forward commits only.
- No outreach or contact with anyone outside the repo.
