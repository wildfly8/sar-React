# SAR React Constitution

**Project**: `sar` (Securities Analysis & Research)  
**Identity**: Create React App SPA for equity research workflows (watchlist, macro, company analysis, rating enforcement, screening, valuation, price targets).  
**Primary language**: JavaScript (React 16)  
**Architecture**: Monolith frontend SPA; business data and persistence live in an **external HTTP API** (default `http://localhost:9090`, API version `v1`).

Derived from the brownfield scan of this repository. Rules must stay grounded in detected structure and conventions.

## Core Principles

### I. Spec-First Delivery
Every feature begins with a written specification in `specs/` before implementation. Code changes must trace to user stories, functional requirements, and success criteria.

### II. Frontend Scope Boundary
This repository owns the **React UI only**. Do not add a backend, database, or ORM inside this repo unless the product decision explicitly expands scope. Server-side behavior belongs to the external API at `:9090` (or its successor). Specs that need API changes MUST document the contract impact and assume a separate API deliverable when the API is not in this tree.

### III. Preserve Working SPA Patterns
New work SHOULD follow existing patterns unless a spec deliberately changes them:

- Functional React components under `src/components/` (PascalCase `.jsx`)
- Shared API helpers in `src/api/index.js` (`SERVER_URL`, `VERSION`, `myFetcher`)
- Routing via `react-router-dom` v5 (`BrowserRouter`, `Switch`, `Route`) in `src/App.js`
- Shared macro UI state via `MyContext` when already the established channel
- Bootstrap / react-bootstrap / react-bootstrap-table-next for tabular research UIs

### IV. Simplicity (YAGNI)
Prefer the smallest change that satisfies the spec. Do not introduce Redux, TypeScript migration, new UI frameworks, or authentication without an explicit approved requirement. Do not invent unused abstraction layers.

### V. No Authentication
This application has **no login, profile, session, or identity integration**. Do not add Okta or other auth stacks, protected routes, or user-claim UI unless a future constitution amendment explicitly reintroduces auth.

## Code Boundaries

| Area | Path | Owns |
|------|------|------|
| App shell / routes / context | `src/App.js`, `src/index.js`, `src/App.css` | Route table, `MyContext` provider, global CSS imports |
| Feature screens | `src/components/*.jsx` | Page UI, tables, feature-local state, API calls for that screen |
| API client | `src/api/index.js` | Base URL, API version, shared `fetch` helper |
| Constants / utils | `src/*Constants.js`, `src/MyUtil.js`, `src/polyfills.js` | Shared enums, formatting, helpers |
| Static assets | `public/` | HTML shell, logos, manifest |
| Specs & plans | `specs/NNN-*/` | Feature SDD artifacts |
| Spec Kit config | `.specify/` | Constitution, templates, scripts |

**Import direction**: Feature components MAY import `../api`, utils, constants, and `MyContext` from `App.js`. Do not create circular imports between sibling feature components when a shared helper belongs in `MyUtil.js` or `src/api/`.

## Naming Conventions

| Kind | Convention | Example |
|------|------------|---------|
| Feature / table components | PascalCase `.jsx` | `WatchList.jsx`, `PxTargetTable.jsx` |
| Root modules | Descriptive `.js` | `MyUtil.js`, `SecurityConstants.js` |
| API module | lowercase folder + `index.js` | `src/api/index.js` |
| Routes | kebab-case paths | `/company-analysis`, `/rating-enforce`, `/px-target` |
| Branches (when git is used) | Prefer `###-feature-name` Spec Kit style | `001-watchlist-export` |

No consistent automated formatter/linter beyond CRA `eslintConfig: react-app` was detected — keep style consistent with neighboring files in the same module.

## Feature Surface (current routes)

| Route | Component | Domain focus |
|-------|-----------|--------------|
| `/` | WatchList (+ table / edit panel) | Sector watchlists, EOD px updates |
| `/macro-econ` | MacroEcon | Macro economic indices |
| `/company-analysis` | CompanyAnalysis | Basics, performance, company report |
| `/rating-enforce` | RatingEnforce | Rating enforcement load/save |
| `/screening` | Screening | Screening results |
| `/valuation` | Valuation | Relative/intrinsic valuation, key ratios |
| `/px-target` | PxTarget | Price targets, audit, IV calculate |

New screens require a new `Route` in `App.js` and a nav link in `NavBar.jsx` unless the spec says otherwise.

## API Contract Rules

- Default client base: `SERVER_URL` + `VERSION` → `http://localhost:9090/v1`
- Prefer `myFetcher` for JSON API calls; document exceptions (e.g. ad-hoc `fetch` in a component)
- Feature specs that call the API MUST list endpoints under an **API Contract** section (method, path, request/response shape at a product level)
- Dev proxy: `package.json` `"proxy": "http://localhost:9090/"` — keep aligned with `SERVER_URL` when changing local backends
- Do not hard-code a second competing base URL pattern without updating `src/api/index.js` and documenting the change

## Testing Requirements

| Item | Current reality | Rule |
|------|-----------------|------|
| Runner | `npm test` (CRA / Jest) | Use this command when tests are added |
| Existing tests | None detected | Tests are **optional** unless the feature spec requires them |
| Location (when added) | Prefer co-located `*.test.js(x)` under `src/` (CRA default) | Match CRA conventions |

Manual acceptance via the feature `quickstart.md` is the default verification path until a test suite exists.

## Quality Gates

- `npm start` must boot the SPA against the configured API (document if API must be running)
- `npm run build` must succeed before merge when a buildable change is claimed complete
- ESLint: CRA `react-app` defaults — do not leave new lint errors in touched files
- No CI pipeline was detected; do not invent CI gates in plans unless adding CI is in scope
- Unused declared dependencies (e.g. chart.js if not imported) MUST NOT be treated as active architecture until code imports them

## Technology Constraints

| Constraint | Value |
|------------|-------|
| Framework | React 16 + Create React App (`react-scripts` 3.4.1) |
| Routing | react-router-dom v5 |
| UI kit | Bootstrap 4 + react-bootstrap + bootstrap-table-next |
| Auth | None |
| Package manager | npm |
| Node start flag | `NODE_OPTIONS=--openssl-legacy-provider` (via `cross-env` in `npm start`) |
| Hosting / deploy target | **Not specified in repo** — do not assume Vercel/Next/static-only hosting |
| Backend | External API on port 9090 (out of tree) |

## Dependency Rules

1. UI features depend on the external API contract — never on in-repo persistence.
2. Shared fetch/base URL changes go through `src/api/index.js`.
3. Cross-feature shared values go in constants/utils, not copy-pasted magic strings, when already the local pattern.
4. Do not add new global state libraries or auth without constitution amendment + approved spec.

## Governance

- Amend this constitution when the stack or boundaries change (e.g. TypeScript adoption, API moved in-repo, auth reintroduced).
- Keep `.specify/templates/` aligned with these boundaries.
- Source of truth for discovered facts: `.specify/memory/project-profile.md` (re-scan when structure drifts).

**Version**: 2.1.0  
**Amended**: 2026-08-09 — removed authentication entirely from product scope
