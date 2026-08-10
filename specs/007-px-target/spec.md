# Feature Specification: PxTarget

**Feature Branch**: `007-px-target`  
**Created**: 2026-08-09  
**Status**: migrated  
**Input**: Reverse-engineered from existing SPA implementation

## Summary

Price-target enforcement workstation on `/px-target`: load/edit PT rows, IV-driven enforcement recalculation, audit history, save with audit notes, ranking modals, and yahoo-quote price refresh.

## User Scenarios & Testing

### User Story 1 - Load and edit PT enforcements (Priority: P1)

Analyst opens PxTarget, waits for load modal, and edits gray enforcement cells (FCF-related and enforced PTs).

**Independent Test**: Open `/px-target`; confirm table loads; edit an enforcement cell and see derived margins/PTs update.

### User Story 2 - Save with audit notes (Priority: P1)

Analyst saves changes; for each changed ticker a prompt collects an audit note; POST save then reload.

**Independent Test**: Change a cell, Save, provide note(s); confirm POST `/api/px-target/save`.

### User Story 3 - Audit history (Priority: P2)

Analyst double-clicks a row to view PT enforcement audit history modal.

**Independent Test**: Double-click a data row; confirm GET `/api/pt-enforcement-audit?ticker=`.

### User Story 4 - Rank lists (Priority: P2)

Analyst clicks Rank to see top-10 NT/LT/PT by margin for ETF/A/B/C lists (requires ≥10 rows per list).

### User Story 5 - Update prices (Priority: P2)

Analyst clicks UpdatePx to sequentially refresh yahoo quotes for non-list tickers and recompute list averages.

## UI Requirements

- **Routes**: `/px-target`
- **Components**: `PxTarget.jsx`, `PxTargetTable.jsx`
- **Tables**: editable bootstrap table; list summary rows (`LIST_TYPES`) non-editable
- **Client cache**: none
- **Modals**: loading, ranking, audit history; Save uses `prompt()` for notes

## API Contract

| Method | Path | Request | Response | Existing? |
|--------|------|---------|----------|-----------|
| GET | `/api/px-target` | — | PT rows | yes |
| POST | `/api/px-target/save` | enforcement + audit objects | — | yes |
| GET | `/api/pt-enforcement-audit?ticker=` | query | audit history | yes |
| GET | `/api/yahoo-quote?ticker=` | query | quote | yes |
| GET | `/api/intrinsic-valuation/calculate?...` | query | recalculated IV/PTs | yes |

## Requirements

- **FR-001**: System MUST load all price targets into an editable table.
- **FR-002**: System MUST recalculate enforced NT/LT PT via IV calculate when FCF-related enforcements change.
- **FR-003**: System MUST save enforcements and audit diffs with analyst notes.
- **FR-004**: System MUST show audit history on double-click.
- **FR-005**: System MUST support Rank and UpdatePx operator actions.

## Key Entities

- **PT row**: ticker, sector, lastPx, dChg%, multiples, FCF/growth/disc/MoS, analyst & enforced NT/LT/PT + margins, ranks
- **List aggregate rows**: ETF_List, A_List, B_List, C_List, NR_List, New_List
- **Audit entry**: old→new enforced fields, note, lastUpdate

## Success Criteria

- **SC-001**: Analyst can load, edit, audit, and save PTs without login.
- **SC-002**: UpdatePx refreshes daily % change for tickers via yahoo-quote.

## Gaps

- No tests; Rank hidden if list length &lt; 10; assumes first six rows are list aggregates; sequential quotes are slow; mutation + forceUpdate patterns; alerts/prompts for UX.
