# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`

**Created**: [DATE]

**Status**: Draft

**Input**: User description: "$ARGUMENTS"

## Summary

[One short paragraph: what changes for the SAR research user and which screens/routes are affected.]

## User Scenarios & Testing *(mandatory)*

<!--
  PRIORITIZE user journeys (P1, P2, P3...). Each story must be independently testable.
  Map stories to existing SAR surfaces when possible: WatchList, MacroEcon,
  CompanyAnalysis, RatingEnforce, Screening, Valuation, PxTarget, Login/Profile.
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [How to verify in the SPA — route, actions, expected UI/API outcome]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [How to verify independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [How to verify independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when the external API (`:9090`) is unreachable or returns non-JSON?
- What happens when [ticker / sector / empty watchlist / stale sessionStorage] boundary is hit?
## UI Requirements *(mandatory for SPA changes)*

- **Routes affected**: [e.g., `/`, `/valuation`, new `/...`]
- **Components touched**: [e.g., `src/components/Valuation.jsx`, `src/components/KeyRatiosTable.jsx`]
- **Nav / shell**: [Does `NavBar.jsx` or `App.js` need updates?]
- **Tables / forms**: [bootstrap-table columns, editable cells, modals, progress]
- **Client cache**: [sessionStorage keys if used; invalidation rules]

## API Contract *(mandatory if the feature calls or changes backend usage)*

<!--
  This repo is frontend-only. Document the HTTP contract the SPA will use.
  If the API does not yet support a call, mark it as API dependency.
-->

| Method | Path (under `/v1`) | Request | Response (product-level) | Existing? |
|--------|--------------------|---------|--------------------------|-----------|
| GET/POST | `/api/...` | [query/body] | [shape] | yes / **needs API change** |

- **Base URL source**: `src/api/index.js` (`SERVER_URL`, `VERSION`) unless justified otherwise
- **Fetcher**: Prefer `myFetcher`; note exceptions
- **API dependency**: [None | Companion API work required outside this repo]

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST [specific capability]
- **FR-002**: System MUST [specific capability]
- **FR-003**: Users MUST be able to [key interaction]
- **FR-004**: System MUST [error/empty-state behavior]

*Mark unknowns explicitly:*

- **FR-00X**: System MUST [NEEDS CLARIFICATION: ...]

### Key Entities *(include if feature involves research data)*

- **[Entity 1]**: [e.g., Watchlist ticker row — sector, ticker, fields shown in table]
- **[Entity 2]**: [relationships / ownership at product level — not DB schema]

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: [e.g., Analyst can load and edit watchlist for a sector in under N minutes]
- **SC-002**: [e.g., Valuation screen shows key ratios after selecting a ticker without full page reload]
- **SC-003**: [e.g., Clear error is shown when API call fails]

## Assumptions

- External SAR API is available at the configured host (default `http://localhost:9090`) for local verification
- No authentication — features are available without login
- UI stack remains React 16 + CRA + Bootstrap / react-bootstrap-table-next unless this feature changes it
- [Other feature-specific assumptions]
