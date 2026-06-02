<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

# AGENTS.md — CyberPath Academy

## What this is
A single-page React app (`cybersec-roadmap.jsx`) for a 24-month Arabic
cybersecurity learning roadmap. ~4,240 lines, all in **one JSX file** with
inline styles + one embedded `<style>` block. No router, no router-based state —
`page` is a `useState`. Deployed as a PWA on GitHub Pages.

The app is a **unified roadmap** — the Dashboard IS the roadmap, containing
everything inline: current week (topics/missions/quiz/resources), study hours
logger, daily plan, spaced repetition, and a visual map of all 80 weeks across
5 phases. Program and Missions pages still exist as drill-down views but are
not in the nav.

## Commands
- `npm run dev` — vite dev server on port `5000` (host `0.0.0.0`, set in `vite.config.js`).
- `npm run build` — produces `dist/` (~411KB JS, 134KB gzip).
- `npm run preview` — preview the built bundle.
- `npm run deploy` — `gh-pages -d dist`; pushes `dist/` to the `gh-pages` branch.
  GitHub Pages must be set to serve from that branch (already configured via `gh api`).
- There is **no test/lint/typecheck command**. The build itself is the smoke test.

## Architecture (single file)
File order in `cybersec-roadmap.jsx`:
1. `FONTS` (Google Fonts import) and `CSS` (the entire stylesheet as a template literal).
2. `PHASES` (~5 phases × 12–20 weeks, lines 166+) — the 24-month program.
3. `QUIZZES` (~ line 1435) — keyed by `quizId` from PHASES weeks.
4. `LEVELS`, `BADGES`, `ROUTINE`, `INIT_TODOS` constants.
5. `TRACKS` (~line 1657) — 16 cybersecurity tracks. Each phase has `topics[]` and
   `resources[]` (typed as `{title,type,lang,url}`). `type ∈ video|lab|article|writeup|book`.
6. `TRACK_ORDER` array.
7. Helpers: `today`, `findPhase`, `findWeek`, `DAY_PLAN`, `Ring`, `Tag`.
8. `export default function CyberPath()` — the whole app.

`src/main.jsx` is just a `createRoot` wrapper.

## Data model
- User state (`s`) initialized from `D0` and persisted via `window.storage`
  (Replit-only API; wrapped in `try/catch` so the app still loads on
  GitHub Pages, just without persistence).
- Theme: `data-theme={theme}` on the root `<div>`. Defined CSS vars in `:root`
  (dark) and `[data-theme="light"]` (light). Toggle button is in the sidebar.

## Conventions
- **All data lives in the single `.jsx` file** — do not split it without a strong reason.
  New tracks/lessons go inside the `TRACKS` object. New quizzes go in `QUIZZES`.
- **Dashboard IS the roadmap** — all features (topics, missions, quiz, resources,
  study hours, daily plan, spaced repetition, roadmap map) are inline in the
  Dashboard. Program and Missions pages exist as drill-down but are not in the nav.
- **Nav**: 7 items — الرحلة(Dashboard), اختبارات, إنجازات, موارد, Todo, الروتين, إحصائيات.
- **Inline styles** are intentional. Use CSS variables (`var(--t0)`, `var(--bg)`,
  `var(--sbd)`, etc.) for colors so dark/light mode keeps working. Hardcoded
  hex inside `style={{...}}` will break the theme.
- **CSS variables palette** (in `const CSS`):
  - text: `--t0..--t5` (primary → muted)
  - background: `--bg`, `--bg2..--bg4`, `--sg` (sidebar gradient)
  - white/black overlays: `--wo, --wh, --wb, --wm, --w3, --w5, --w7, --w12` /
    `--bo, --bt`
  - accent (green) and cyan: `--sbg*`, `--sbd*`, `--db*`
  - When adding new colors for theming, add a CSS var, not a hex literal.
- **Animations** are class-based: `.stg` (staggered list), `.hov-up` (hover lift),
  `.scale-click` (tap shrink), `.theme-tgl`, `.slide`. Reuse these.
- **Responsive**: `isMobile` state (`<768px`) toggles the bottom nav vs desktop
  sidebar. Three breakpoints: `<767px` (mobile/bottom-nav), `768–1024px` (tablet
  collapsed sidebar), `≥1200px` (wide grid). Touch targets must be ≥44px.

## Deployment
- `base: '/cybersec-roadmap/'` in `vite.config.js` — repo name baked in. If the
  repo is renamed or moved to a user/org site, this must change.
- GitHub remote: `https://github.com/0xlegacy52/cybersec-roadmap.git`.
- Live URL: `https://0xlegacy52.github.io/cybersec-roadmap/`.
- The `gh-pages` branch is created/pushed by `npm run deploy`. Do **not** commit
  `dist/` to `main` (it's generated).

## PWA
- Configured via `vite-plugin-pwa` in `vite.config.js`. `registerType: 'autoUpdate'`.
- Icons are SVG (`public/icon-192.svg`, `public/icon-512.svg`) referenced in the
  manifest as `image/svg+xml`. If you need PNG fallbacks for older iOS, add them
  under `public/` and list them in `vite.config.js` `manifest.icons` AND
  `includeAssets`.
- `workbox` precaches `**/*.{js,css,html,svg}` and runtime-caches Google Fonts.

## Gotchas
- The `storage` API (`window.storage.get/set`) is a Replit environment API.
  On GitHub Pages it fails silently and the app still loads — but user progress
  won't persist. If persistence is needed on Pages, swap to `localStorage`.
- No TypeScript, no ESLint, no Prettier, no test runner. The build is the
  only automated check.
- `cybersec-roadmap.jsx` is ~4,240 lines. Use `grep`/`Read` with offsets
  rather than reading the whole file.
- The `attached_assets/` directory has older snapshots; ignore unless doing
  history research.
- `.opencode/command/` has SpecKit workflow commands — these are project-local
  helpers, not part of the shipped app.
