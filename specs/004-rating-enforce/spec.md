# Feature Specification: RatingEnforce

**Feature Branch**: `004-rating-enforce`  
**Created**: 2026-08-09  
**Status**: migrated  
**Input**: Reverse-engineered from existing SPA implementation

## Summary

Editable rating enforcement table on `/rating-enforce`: load existing enforcements, edit tickers/ratings/reasons, save via POST.

## User Scenarios & Testing

### User Story 1 - Load enforcements (Priority: P1)

Analyst opens RatingEnforce and sees existing rows plus blank `isNew` rows for entry.

**Independent Test**: Open `/rating-enforce`; confirm table loads with API rows + empty slots.

### User Story 2 - Edit and save (Priority: P1)

Analyst edits ticker, systemRating, enforcedRating, enforcedReason and saves.

**Independent Test**: Edit a row, Save; confirm POST `/api/rating-enforcement/save` and page reload.

**Acceptance Scenarios**:

1. **Given** page mount, **When** GET succeeds, **Then** table shows enforcements assembled via `MyUtil`.
2. **Given** edited rows with tickers, **When** Save clicked, **Then** POST filtered rows (new rows `id: null`) and reload.

## UI Requirements

- **Routes**: `/rating-enforce`
- **Components**: `RatingEnforce.jsx`, `RatingEnforcementTable.jsx`
- **Tables**: click-edit bootstrap table
- **Client cache**: none

## API Contract

| Method | Path | Request | Response | Existing? |
|--------|------|---------|----------|-----------|
| GET | `/api/rating-enforcement` | — | enforcement list | yes |
| POST | `/api/rating-enforcement/save` | filtered row objects | — | yes |

## Requirements

- **FR-001**: System MUST load rating enforcements on mount.
- **FR-002**: System MUST provide blank editable rows for new entries.
- **FR-003**: System MUST save aggregated rows with tickers to the API.

## Key Entities

- **Rating enforcement**: `id`, `isNew`, `ticker`, `systemRating`, `enforcedRating`, `enforcedReason`

## Success Criteria

- **SC-001**: Analyst can load and save enforcements without login.

## Gaps

- No tests; no validation of rating codes; no loading/success UI (console + reload); cell uppercase not always written back.
