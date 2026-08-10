# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: Filled by `/speckit-plan`. Keep plans aligned with the SAR React constitution.

## Summary

[Primary requirement + technical approach]

## Technical Context

**Language/Version**: JavaScript (React 16.8) via Create React App (`react-scripts` 3.4.1)

**Primary Dependencies**: react-router-dom v5, Bootstrap 4, react-bootstrap, react-bootstrap-table-next, shared `myFetcher` API client

**Storage**: None in this repo — persistence via external HTTP API (`http://localhost:9090/v1`)

**Testing**: `npm test` (CRA/Jest) if tests are in scope; otherwise manual quickstart verification

**Target Platform**: Modern desktop browsers; local `npm start` with OpenSSL legacy provider flag

**Project Type**: Frontend SPA (monolith CRA app); API is out of tree

**Performance Goals**: [feature-specific, e.g., table remains usable for N rows; avoid redundant refetch]

**Constraints**: Do not add backend/DB or auth in this repo; prefer existing component/API patterns

**Scale/Scope**: [screens/components/endpoints touched]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Change stays within frontend SPA boundaries (or documents required companion API work)
- [ ] Uses existing patterns (`src/components`, `src/api`, `App.js` routes, Bootstrap tables) or justifies deviation
- [ ] API usage goes through documented contract; base URL/`VERSION` strategy respected
- [ ] No authentication or identity UI introduced
- [ ] No unrequested stack additions (Redux, new UI kit, TypeScript-only rewrite, etc.)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1 — UI/entity fields as consumed by SPA (not DB schema)
├── quickstart.md        # Phase 1 — manual SPA verification steps
├── contracts/           # Phase 1 — HTTP API contract notes for the SPA
└── tasks.md             # Phase 2 (/speckit-tasks)
```

### Source Code (this repository)

```text
src/
├── App.js                 # Routes + MyContext
├── App.css
├── index.js
├── api/
│   └── index.js           # SERVER_URL, VERSION, myFetcher
├── config.js
├── MyUtil.js
├── *Constants.js
└── components/
    ├── NavBar.jsx
    ├── WatchList.jsx
    ├── WatchListTable.jsx
    ├── EditlistButtonPanel.jsx
    ├── MacroEcon.jsx
    ├── MacroEconTable.jsx
    ├── CompanyAnalysis.jsx
    ├── RatingEnforce.jsx
    ├── RatingEnforcementTable.jsx
    ├── Screening.jsx
    ├── Valuation.jsx
    ├── KeyRatiosTable.jsx
    ├── PxTarget.jsx
    └── PxTargetTable.jsx
public/                    # Static shell/assets
```

**Structure Decision**: Single CRA SPA. Feature work lands in `src/components/` (+ route/context wiring in `App.js` / `NavBar.jsx` when needed). API helper changes belong in `src/api/index.js`. Backend implementation is **out of scope** for this tree unless a linked API repo is named in research.

## Phase 0: Research

Document decisions in `research.md`:

- Which existing screen(s) to extend vs new route/component
- API endpoints available vs companion API gaps
- Table/editor UX patterns to reuse (`*Table.jsx`, modals, sessionStorage)

## Phase 1: Design

Produce:

- `data-model.md` — entities/fields as shown or edited in the UI
- `contracts/` — HTTP paths the SPA will call (and gaps)
- `quickstart.md` — `npm start`, required API up, click-path acceptance

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., new global state lib] | [current need] | [why MyContext/local state insufficient] |
