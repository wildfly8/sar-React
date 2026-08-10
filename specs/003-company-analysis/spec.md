# Feature Specification: CompanyAnalysis

**Feature Branch**: `003-company-analysis`  
**Created**: 2026-08-09  
**Status**: migrated  
**Input**: Reverse-engineered from existing SPA implementation

## Summary

Ticker-driven company analysis on `/company-analysis`: basics overview, performance summary grid, and SAR report text, with sessionStorage hydration.

## User Scenarios & Testing

### User Story 1 - Analyze a ticker (Priority: P1)

Analyst enters a ticker and runs Analyze (button or Enter) to load three parallel API responses.

**Independent Test**: Enter a ticker, Analyze, confirm basics/perf/SAR sections populate.

**Acceptance Scenarios**:

1. **Given** a ticker, **When** Analyze runs, **Then** GETs company-basics, company-perfsummary, and company-report in parallel.
2. **Given** prior sessionStorage values, **When** page remounts, **Then** cached fields hydrate before a new analyze.

### User Story 2 - Review fundamentals text & metrics (Priority: P1)

Analyst reviews employees/auditor/legal, Morningstar/analyst notes, SAR report, and performance summary metrics across periods.

**Independent Test**: After successful analyze, verify grid keys from `SarConstants` and report text appear.

## UI Requirements

- **Routes**: `/company-analysis`
- **Components**: `CompanyAnalysis.jsx`
- **Client cache**: sessionStorage keys `numOfEmployees`, `auditor`, `legalAdvisor`, `analystReportTitile`, `analystReport`, `perfSummary`, `sarReport`

## API Contract

| Method | Path | Request | Response | Existing? |
|--------|------|---------|----------|-----------|
| GET | `/api/company-basics?ticker=` | query | `basicsOverview.*` | yes |
| GET | `/api/company-perfsummary?ticker=` | query | metric map | yes |
| GET | `/api/company-report?ticker=` | query | `{ response }` | yes |

## Requirements

- **FR-001**: System MUST accept a ticker and uppercase it for requests.
- **FR-002**: System MUST fetch basics, performance summary, and SAR report.
- **FR-003**: System MUST persist last analysis fields in sessionStorage.
- **FR-004**: System MUST show company-report errors as report text when that call fails.

## Key Entities

- **Company basics**: employees, auditor, legal advisor, morningstar take, analyst note
- **Perf summary**: NetMargin/FcfMargin/ROA/ROE/Leverage/D/E/Coverage/Current/Quick × periods
- **SAR report**: free-text response string

## Success Criteria

- **SC-001**: Analyst can analyze a ticker without login and see the three content areas.
- **SC-002**: Revisiting the page restores last cached analysis from sessionStorage.

## Assumptions

- API availability required for fresh data; cache may be stale.

## Gaps

- No tests; typo `analystReportTitile`; `JSON.parse(sessionStorage.getItem('perfSummary'))` may throw if missing; basics/perf errors mostly console-only; Enter clears input after submit.
