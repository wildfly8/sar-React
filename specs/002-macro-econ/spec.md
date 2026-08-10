# Feature Specification: MacroEcon

**Feature Branch**: `002-macro-econ`  
**Created**: 2026-08-09  
**Status**: migrated  
**Input**: Reverse-engineered from existing SPA implementation

## Summary

Read-only macro economic indices table on `/macro-econ`, fed by App-level fetch of `/api/macro-economic-indices`.

## User Scenarios & Testing

### User Story 1 - View macro indices (Priority: P1)

Analyst opens MacroEcon and reviews index name, next report date, and reports text.

**Independent Test**: With App bootstrap successful, open `/macro-econ` and confirm rows render.

**Acceptance Scenarios**:

1. **Given** `economicIndices` prop populated, **When** page renders, **Then** table shows `indexName`, formatted `nextReportDate`, and `reports`.
2. **Given** empty/null data, **When** page renders, **Then** table is empty (no dedicated empty-state message).

## UI Requirements

- **Routes**: `/macro-econ`
- **Components**: `MacroEcon.jsx`, `MacroEconTable.jsx`
- **Nav**: MacroEcon in `NavBar.jsx`
- **Client cache**: none (data from App state)

## API Contract

| Method | Path | Request | Response | Existing? |
|--------|------|---------|----------|-----------|
| GET | `/api/macro-economic-indices` | — | array of index objects | yes (fetched in `App.js`) |

## Requirements

- **FR-001**: System MUST display macro indices provided by App bootstrap.
- **FR-002**: System MUST format next report dates for display.

## Key Entities

- **Macro index**: `id`, `indexName`, `nextReportDate`, `reports`

## Success Criteria

- **SC-001**: Analyst can open MacroEcon without login and see indices when API data is present.

## Assumptions

- Data is loaded once at App mount; page does not refetch locally.

## Gaps

- No tests; no loading/error UI on the page itself (errors only `console.error` in App); display-only.
