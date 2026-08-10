---
description: "Task list template for SAR React feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: OPTIONAL — include only if the feature specification requires them. Runner: `npm test` (CRA/Jest). Prefer co-located `src/**/*.test.js(x)`.

**Organization**: Tasks are grouped by user story for independent delivery.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3...)
- Include exact file paths in descriptions

## Path Conventions (this repo)

- Feature UI: `src/components/*.jsx`
- Routes / context: `src/App.js`
- Nav: `src/components/NavBar.jsx`
- API client: `src/api/index.js`
- Utils / constants: `src/MyUtil.js`, `src/*Constants.js`
- Static: `public/`
- Specs: `specs/[###-feature]/`

<!--
  /speckit-tasks MUST replace sample tasks with real ones from spec.md + plan.md.
  Do not keep illustrative Python/backend paths.
-->

## Phase 1: Setup (Shared)

**Purpose**: Confirm local SPA + API baseline for the feature

- [ ] T001 Confirm `npm start` runs with OpenSSL legacy provider script from `package.json`
- [ ] T002 Confirm external API reachable at configured `SERVER_URL` (`src/api/index.js`) or document offline mocks
- [ ] T003 [P] Skim constitution + plan Constitution Check; note any intentional deviations

---

## Phase 2: Foundational (Blocking)

**Purpose**: Shared wiring that blocks all user stories

**⚠️ CRITICAL**: No user story work until this phase completes (skip items that do not apply)

- [ ] T004 Add/update shared API constants or helpers in `src/api/index.js` if needed
- [ ] T005 [P] Add/update shared constants/utils (`src/*Constants.js`, `src/MyUtil.js`) if needed
- [ ] T006 [P] Add route in `src/App.js` and nav entry in `src/components/NavBar.jsx` if the feature introduces a new screen
- [ ] T007 Extend `MyContext` in `src/App.js` only if multiple screens must share new state

**Checkpoint**: Foundation ready — story implementation can begin

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [What the analyst can do]

**Independent Test**: [Route + click path from quickstart.md]

### Tests for User Story 1 (OPTIONAL — only if tests requested)

- [ ] T010 [P] [US1] Add failing test in `src/components/[Component].test.jsx`

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create/update page component in `src/components/[Feature].jsx`
- [ ] T012 [P] [US1] Create/update table/panel in `src/components/[Feature]Table.jsx` (if applicable)
- [ ] T013 [US1] Wire API calls via `myFetcher` to endpoints listed in `contracts/`
- [ ] T014 [US1] Handle loading, empty, and API error states in the UI
- [ ] T015 [US1] Persist/cache in `sessionStorage` only if plan requires it

**Checkpoint**: User Story 1 usable against live (or mocked) API

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief]

**Independent Test**: [How to verify alone]

### Implementation for User Story 2

- [ ] T020 [P] [US2] Update `src/components/[...].jsx`
- [ ] T021 [US2] Integrate with US1 without breaking US1 independent path
- [ ] T022 [US2] API + error handling for US2 endpoints

**Checkpoint**: US1 and US2 both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief]

**Independent Test**: [How to verify alone]

### Implementation for User Story 3

- [ ] T030 [P] [US3] Update `src/components/[...].jsx`
- [ ] T031 [US3] Complete remaining FR/SC for this story

**Checkpoint**: All prioritized stories independently functional

---

## Phase N: Polish & Verification

- [ ] T040 Run `npm run build` and fix build errors in touched code
- [ ] T041 [P] Run `npm test` if tests were added
- [ ] T042 Execute `quickstart.md` against SPA + API
- [ ] T043 [P] Remove dead code / unused imports introduced by the feature
- [ ] T044 Update README only if operator steps changed (API URL, env vars)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup → Foundational → User stories (P1→P2→P3) → Polish**
- User stories may proceed in parallel after Foundational if they touch different files

### Within Each User Story

- Optional tests first (must fail before implementation)
- Component shell → API wiring → error/empty states → polish
- Prefer extending existing `*Table.jsx` patterns over new table libraries

### Parallel Opportunities

- Independent component files marked [P]
- Constants/utils vs page shell when no shared types yet
- Nav/route wiring vs table implementation when props are agreed

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup + Foundational
2. User Story 1
3. **STOP** — validate via quickstart on the target route
4. Demo before starting P2+

### Incremental Delivery

1. Foundation ready
2. Ship US1 → verify → continue
3. Add US2/US3 without regressing prior routes

---

## Notes

- Backend/API implementation tasks belong in the companion API repo — track as dependencies, not as `src/` tasks here
- Do not add authentication unless constitution is amended
- Commands: `npm start`, `npm run build`, `npm test`
