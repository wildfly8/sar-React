# Tasks: WatchList

**Input**: Migrated from as-built code  
**Status**: migrated — all implementation tasks complete

## Phase 1: Setup

- [x] T001 CRA route `/` wired in `src/App.js`
- [x] T002 Nav link WatchList in `src/components/NavBar.jsx`

## Phase 2: Foundational

- [x] T003 API helper `myFetcher` / `SERVER_URL` / `VERSION` in `src/api/index.js`
- [x] T004 Sector/exchange/macro constants modules
- [x] T005 `MyContext` bootstrap for macro + TYT/VIX in `src/App.js`

## Phase 3: User Story 1 — Browse

- [x] T006 [US1] `WatchList.jsx` load ordered watchlist
- [x] T007 [US1] `WatchListTable.jsx` readonly sector tables
- [x] T008 [US1] Load error UI

## Phase 4: User Story 2 — Mutations

- [x] T009 [US2] Editlist tabs + click-edit table mode
- [x] T010 [US2] Add / Update / Delete / UpdSTKPx in `EditlistButtonPanel.jsx`
- [x] T011 [US2] Progress modal for long mutations

## Phase 5: User Story 3 — Macro strip

- [x] T012 [US3] Display VIX/TYT/next dates from context

## Gaps (open)

- [ ] T013 Remove or implement Map/Test buttons
- [ ] T014 Surface mutation failures instead of always completing modal
- [ ] T015 Add `src/components/WatchList*.test.jsx` if tests are desired
