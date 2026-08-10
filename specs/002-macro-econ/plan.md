# Implementation Plan: MacroEcon

**Branch**: `002-macro-econ` | **Date**: 2026-08-09 | **Spec**: [spec.md](./spec.md)  
**Status**: migrated (as-built)

## Summary

Thin display feature: App fetches indices; MacroEcon passes props into MacroEconTable.

## Technical Context

**Language/Version**: JavaScript / React 16 CRA  
**Primary Dependencies**: react-bootstrap-table-next  
**Storage**: External API  
**Testing**: None  
**Project Type**: Frontend SPA screen

## Constitution Check

- [x] Frontend-only, no auth
- [x] Reuses App bootstrap rather than duplicating fetch

## Project Structure

```text
src/App.js
src/components/MacroEcon.jsx
src/components/MacroEconTable.jsx
src/MacroEconomicIndexConstants.js
```

## As-built approach

1. App GET `/api/macro-economic-indices` into state.
2. Route passes `economicIndices` prop to MacroEcon.
3. Table renders columns; row select highlight only.
