# Tasks: RatingEnforce

**Status**: migrated — implementation complete

- [x] T001 Route + nav
- [x] T002 GET rating-enforcement + blank rows
- [x] T003 Editable RatingEnforcementTable
- [x] T004 POST save + reload

## Gaps (open)

- [ ] T005 Client validation + user-visible save errors
- [ ] T006 Optional tests

## Phase 1: Convergence

- [ ] T007 Seed blank `isNew` rows and surface a user-visible load error when GET `/api/rating-enforcement` fails (today catch only `console.error` and `editableArray` stays `[]`) per FR-001/FR-002/US1 (partial)
