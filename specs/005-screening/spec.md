# Feature Specification: Screening

**Feature Branch**: `005-screening`  
**Created**: 2026-08-09  
**Status**: migrated  
**Input**: Reverse-engineered from existing SPA implementation

## Summary

Generate and display a screening report string on `/screening`, with sessionStorage persistence and a progress modal while generating.

## User Scenarios & Testing

### User Story 1 - Generate screening result (Priority: P1)

Analyst clicks Generate Result; a modal shows progress; report text appears in a panel.

**Independent Test**: Click Generate Result; confirm GET `/api/screening-result` and report renders.

### User Story 2 - Restore prior report (Priority: P2)

Analyst revisits Screening and sees last report from sessionStorage.

**Independent Test**: Generate once, navigate away and back; report still shown from `sessionStorage.screeningReport`.

## UI Requirements

- **Routes**: `/screening`
- **Components**: `Screening.jsx`
- **Client cache**: `sessionStorage.screeningReport`

## API Contract

| Method | Path | Request | Response | Existing? |
|--------|------|---------|----------|-----------|
| GET | `/api/screening-result` | — | `{ response }` text | yes |

## Requirements

- **FR-001**: System MUST fetch screening result on demand.
- **FR-002**: System MUST show a progress modal while the request is in flight.
- **FR-003**: System MUST persist the report string in sessionStorage.
- **FR-004**: System MUST display API errors as report text when the call fails.

## Key Entities

- **Screening report**: opaque string (`fulfillment.response`)

## Success Criteria

- **SC-001**: Analyst can generate and re-view a screening report without login.

## Gaps

- No tests; no screening parameters/filters; unstructured text only; progress jumps 0→100.
