# Feature Specification: Valuation

**Feature Branch**: `006-valuation`  
**Created**: 2026-08-09  
**Status**: migrated  
**Input**: Reverse-engineered from existing SPA implementation

## Summary

Ticker valuation workstation on `/valuation`: relative valuations, key ratios history, and intrinsic valuation (IV) inputs/calculate with sessionStorage persistence.

## User Scenarios & Testing

### User Story 1 - Load relative valuation & key ratios (Priority: P1)

Analyst enters a ticker (Enter) to load relative valuations, key ratios, EOD px, and intrinsic valuation baseline.

**Independent Test**: Enter ticker; confirm relative panels, KeyRatiosTable, and last price populate.

### User Story 2 - Calculate intrinsic valuation (Priority: P1)

Analyst edits FCF/growth/shares/perp/DR/MoS and submits IV to recalculate buyPx and perShareIV; NT/LT % vs lastPx update.

**Independent Test**: With ticker loaded, change an IV input and submit; confirm calculate API called and TP/IV update.

### User Story 3 - Restore session inputs (Priority: P2)

Analyst revisits page and sees persisted ticker/IV fields from sessionStorage; relative/keyratios reload when ticker storage present.

## UI Requirements

- **Routes**: `/valuation`
- **Components**: `Valuation.jsx`, `KeyRatiosTable.jsx`
- **Client cache**: sessionStorage `ticker`, `lastPx`, `nyFCF`, `fcfGr`, `sharesGr`, `perpGr`, `discR`, `moS`, `buyPx`, `perShareIV`

## API Contract

| Method | Path | Request | Response | Existing? |
|--------|------|---------|----------|-----------|
| GET | `/api/relative-valuations?ticker=` | query | current/forward relative maps | yes |
| GET | `/api/keyratios?ticker=` | query | historical ratios | yes |
| GET | `/api/ticker-eod-px?tickers=` | query | last px map | yes |
| GET | `/api/intrinsic-valuation?ticker=` | query | IV baseline inputs/outputs | yes |
| GET | `/api/intrinsic-valuation/calculate?...` | query params nyFCF, fcfGr, SharesGr, PerpGr, DiscR, MoS | recalculated IV | yes |

## Requirements

- **FR-001**: System MUST load relative, key ratios, EOD, and IV data for a ticker.
- **FR-002**: System MUST recalculate IV from editable inputs via calculate endpoint.
- **FR-003**: System MUST validate empty IV inputs client-side (alert) before calculate.
- **FR-004**: System MUST persist ticker and IV fields in sessionStorage.

## Key Entities

- **Relative valuation**: P/E, P/B, P/S, P/C vs 5y/industry/S&P; forward P/E, PEG
- **Key ratio row**: endDate + financial/margin/returns/leverage fields
- **IV model inputs**: nextYearFCF, growth rates, shares growth, perpetuity, discount, MoS → buyPx, perShareIV

## Success Criteria

- **SC-001**: Analyst can value a ticker and recalculate IV without login.
- **SC-002**: Inputs survive refresh via sessionStorage.

## Gaps

- No tests; “value traps” UI placeholders unused; full refresh is Enter-only (no Analyze button); calculate uses `alert` for errors.
