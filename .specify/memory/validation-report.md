# Validation Report

**Date**: 2026-08-09  
**Scope**: Constitution + templates vs post-auth-removal codebase  
**Mode**: Read-only evidence check

## Constitution

| Rule | Status | Detail |
|------|--------|--------|
| Primary language: JavaScript (React/CRA) | ✅ Pass | `src/` is `.jsx`/`.js` only; `package.json` has `react`, `react-scripts` |
| Frontend SPA in `src/` | ✅ Pass | Components, api, App shell present |
| No backend in repo | ✅ Pass | No `server/`, `lib/db`; API via `src/api/index.js` → `:9090` |
| No authentication | ✅ Pass | No Login/Profile; no `@okta/*` in `package.json`; no auth routes in `App.js` |
| Routes table matches app | ✅ Pass | `/`, `/macro-econ`, `/company-analysis`, `/rating-enforce`, `/screening`, `/valuation`, `/px-target` in `App.js` + `NavBar.jsx` |
| Components PascalCase `.jsx` | ✅ Pass | e.g. `WatchList.jsx`, `PxTargetTable.jsx` |
| API via `myFetcher` / `SERVER_URL` | ✅ Pass | `src/api/index.js` |
| Test location CRA/`npm test` | ⚠️ Note | Runner exists; **no test files** yet (constitution allows optional tests) |
| Branch pattern `###-feature-name` | ⚠️ Note | No `.git` history in workspace — rule is aspirational |
| `src/config.js` | ✅ Pass | Removed; constitution no longer references it |
| Hosting not assumed Vercel | ✅ Pass | No vercel/next config |

## Templates

| Template | Status | Detail |
|----------|--------|--------|
| Spec template | ✅ Pass | UI + API Contract sections; no auth assumptions |
| Plan template | ✅ Pass | Lists real `src/components/*` (no Login/Profile); `npm` scripts match |
| Tasks template | ✅ Pass | Paths/`npm start|build|test` match `package.json` |

## AGENTS.md

| Check | Status | Detail |
|-------|--------|--------|
| Present | N/A | Correctly absent (single-module SPA) |

## Drift / follow-ups

1. **Unused deps**: `chart.js`, `react-chartjs-2`, and several other packages remain in `package.json` without `src/` imports — constitution already warns; optional cleanup later.
2. **`registerServiceWorker.js`**: still carries Okta Apache copyright header (file origin), not auth runtime.
3. **`specs/`**: empty until migrate (expected).

## Summary

- **Checks passed**: 11/11 structural checks
- **Notes**: 2 non-blocking (no tests, no git history)
- **Action needed before migrate**: none — config matches CRA SPA + no-auth reality
