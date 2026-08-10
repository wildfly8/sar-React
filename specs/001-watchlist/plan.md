# Implementation Plan: WatchList

**Branch**: `001-watchlist` | **Date**: 2026-08-09 | **Spec**: [spec.md](./spec.md)  
**Status**: migrated (as-built)

## Summary

Home-route watchlist UI: sector tabs, editable table, mutation panel, and macro strip via `MyContext`.

## Technical Context

**Language/Version**: JavaScript / React 16 CRA  
**Primary Dependencies**: react-bootstrap-table-next (+ editor), react-bootstrap, `myFetcher`  
**Storage**: External API only  
**Testing**: None present (`npm test` available)  
**Project Type**: Frontend SPA screen  
**Constraints**: No auth; API out of tree

## Constitution Check

- [x] Frontend-only
- [x] Uses `src/components` + `src/api`
- [x] No auth
- [x] Existing Bootstrap table patterns

## Project Structure

```text
src/App.js                         # MyContext bootstrap (macro, TYT, VIX)
src/components/WatchList.jsx
src/components/WatchListTable.jsx
src/components/EditlistButtonPanel.jsx
src/MyUtil.js                      # assembleWatchlistTableRow, aggregateFullTickers
src/SecurityConstants.js
src/ExchangeConstants.js
src/MacroEconomicIndexConstants.js
src/api/index.js
```

## As-built approach

1. Mount: GET ordered watchlist → build readonly/edit maps per sector.
2. Tabs sync between readonly and editlist views.
3. Mutations POST/PUT/DELETE then show progress modal; UpdSTKPx reloads page.
4. EditlistButtonPanel reads `MyContext` for macro strip.

## Complexity

Moderate UI state (dual maps, tabs, selection) with multiple mutation endpoints; no local persistence.
