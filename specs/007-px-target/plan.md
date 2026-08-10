# Implementation Plan: PxTarget

**Branch**: `007-px-target` | **Date**: 2026-08-09 | **Spec**: [spec.md](./spec.md)  
**Status**: migrated (as-built)

## Summary

Most complex SPA screen: large editable table, IV calculate on cell edit, audit modal, save with prompted notes, ranking, sequential yahoo-quote refresh.

## Technical Context

**Language/Version**: JavaScript / React 16 CRA  
**Primary Dependencies**: react-bootstrap-table-next editor, Modals, `MyUtil` aggregators, `SecurityConstants.LIST_TYPES`  
**Storage**: External API  
**Testing**: None  
**Shared**: IV calculate with Valuation

## Constitution Check

- [x] Frontend-only, no auth
- [x] API via `myFetcher` (+ one fetch pattern for yahoo-quote)

## Project Structure

```text
src/components/PxTarget.jsx
src/components/PxTargetTable.jsx
src/MyUtil.js
src/SecurityConstants.js
src/api/index.js
```

## Complexity

High: many columns, derived fields, list aggregates, audit diffing, sequential network updates.
