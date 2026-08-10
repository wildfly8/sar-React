# Feature Specification: WatchList

**Feature Branch**: `001-watchlist`  
**Created**: 2026-08-09  
**Status**: migrated  
**Input**: Reverse-engineered from existing SPA implementation

## Summary

Analysts manage sector investment watchlists: browse key stats by sector, add/update/delete tickers, refresh EOD prices, and see macro strip context (VIX, TYT, next economic dates) on the home route `/`.

## User Scenarios & Testing

### User Story 1 - Browse sector watchlist (Priority: P1)

Analyst opens WatchList and switches sector tabs to review readonly ticker rows with key statistics.

**Independent Test**: Open `/`, select a sector tab, confirm table rows render for that sector.

**Acceptance Scenarios**:

1. **Given** API returns ordered watchlist data, **When** analyst selects sector tab, **Then** readonly table shows tickers for that sector.
2. **Given** API fails on load, **When** page mounts, **Then** a danger error control shows the error string and tables are hidden.

### User Story 2 - Edit and mutate watchlist (Priority: P1)

Analyst uses Editlist tabs to enter ticker/exchange, select rows, and Add / Update / Delete / UpdSTKPx.

**Independent Test**: On Editlist tab, add a ticker string, click Add; confirm POST is issued and UI proceeds through progress modal.

**Acceptance Scenarios**:

1. **Given** selected tickers with exchange, **When** Add is clicked, **Then** `POST /v1/api/watchlist/selected/add` is called with `"${exchange}_${TICKER}_${sector}"` strings.
2. **Given** editlist rows, **When** Update is clicked, **Then** `PUT /v1/api/watchlist/all/update` runs.
3. **Given** selected rows, **When** Delete is clicked, **Then** `DELETE /v1/api/watchlist/selected/delete` runs.
4. **Given** UpdSTKPx clicked, **When** request finishes, **Then** progress modal completes and page reloads.

### User Story 3 - Macro strip context (Priority: P2)

Analyst sees VIX, 10y TYT, and next FOMC/Jobs/Retail/GDP dates from shared App bootstrap data.

**Independent Test**: With API returning macro + TYT/VIX, open `/` and confirm strip values on Editlist panel.

## UI Requirements

- **Routes**: `/`
- **Components**: `WatchList.jsx`, `WatchListTable.jsx`, `EditlistButtonPanel.jsx`
- **Nav**: WatchList link in `NavBar.jsx`
- **Tables**: react-bootstrap-table-next; readonly vs click-edit modes
- **Client cache**: none

## API Contract

| Method | Path | Request | Response | Existing? |
|--------|------|---------|----------|-----------|
| GET | `/api/ordered-inv-watchlist-tickers-of-sectors?order=desc&sectors=...` | query | sector→ticker maps / keyStats | yes |
| POST | `/api/watchlist/selected/add` | JSON string array | (unused in UI beyond complete) | yes |
| PUT | `/api/watchlist/all/update` | — | — | yes |
| DELETE | `/api/watchlist/selected/delete` | JSON string array | — | yes |
| PUT | `/api/all/update-eod-px` | `"needAPICall"` | — | yes |
| GET | `/api/macro-economic-indices` | — | indices (App bootstrap) | yes |
| GET | `/api/ticker-eod-px?tickers=TYT,%5EVIX` | — | TYT / ^VIX (App bootstrap) | yes |

## Requirements

- **FR-001**: System MUST load ordered watchlist tickers for configured traded sectors.
- **FR-002**: System MUST support sector tab browsing in readonly mode.
- **FR-003**: System MUST allow add/update/delete of selected watchlist tickers via API.
- **FR-004**: System MUST support updating all stock EOD prices via UpdSTKPx.
- **FR-005**: System MUST surface load failures to the user when the initial GET fails.

## Key Entities

- **Watchlist row**: ticker, exchange, algoRating, market/fundamental stats assembled via `assembleWatchlistTableRow`.
- **Sector**: codes from `TRADED_SECTORS` in `SecurityConstants.js`.

## Success Criteria

- **SC-001**: Analyst can switch sectors and see rows without login.
- **SC-002**: Add/Update/Delete/UpdSTKPx invoke the documented endpoints.
- **SC-003**: Load failure is visible in the UI (not only console).

## Assumptions

- External API at `http://localhost:9090/v1` is required for meaningful data.
- No authentication.
- Map/Test buttons currently have no handlers (known gap).

## Changelog

- 2026-08-09: WatchList page has no outer vertical scrollbar; each subpanel table (readonly / editlist) scrolls independently (`App.css` `.watchlist-page` layout).
- 2026-08-09: WatchList D/E shows `N/A` when `debtToEquity_MRQ` is not a finite number (`MyUtil.displayOrNA`).

## Gaps

- No automated tests
- Map/Test buttons are non-functional
- Mutation success modal can appear even when requests fail (`finally` path)
- Weak client validation on ticker/exchange entry
