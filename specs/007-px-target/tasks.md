# Tasks: PxTarget

**Status**: migrated — implementation complete

- [x] T001 Route + nav
- [x] T002 GET px-target + loading modal
- [x] T003 Editable PxTargetTable + IV recalculation on enforcement edits
- [x] T004 Double-click audit history modal
- [x] T005 Save with audit prompts + POST
- [x] T006 Rank modal for list tops
- [x] T007 UpdatePx sequential yahoo-quote refresh

## Gaps (open)

- [ ] T008 Parallelize or batch quote updates
- [ ] T009 Replace prompt/alert with in-app forms
- [ ] T010 Optional tests

## Phase 1: Convergence

- [ ] T011 Recalculate `neartermMargin` / `longtermMargin` after editing `enforcedNeartermPT` / `enforcedLongtermPT` cells in `PxTargetTable.jsx` per US1 (partial)
- [ ] T012 Derive `nonEditableRows` from `SecurityConstants.LIST_TYPES` (ticker) instead of hard-coded indices `[0,1,2,3,4,5]` in `PxTargetTable.jsx` per UI Requirements / Spec Gaps (partial)
