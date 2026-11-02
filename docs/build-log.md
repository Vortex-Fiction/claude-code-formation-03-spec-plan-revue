# Build log

This repo was built with Claude Code from a written plan. Each entry is the instruction given for one task.

## Task 1 — Start phase 3 from the phase 2 reference answers

> Copy the tree of the phase 2 `solution` branch without its history, with `git archive`. It already has the three `CLAUDE.md` files, `.claude/settings.json`, the format hook and the `libs/shared` README. Remove the phase 2 exercises, slides and build log. The README tells how to install the `superpowers` plugin and how to fork the repo for the pull request.

## Task 2 — Add the coverage gate and the phase 3 feature ticket

> Add `npm run test:coverage`: Vitest with v8 on `backend/src`, 100 % for lines, branches, functions and statements. Do not count `main.ts`, the specs and the seed. When the gate fails, add the missing tests, not exclusions. Write `tickets/feature.md` about due dates and overdue loans: a clear need, and real open questions for the brainstorm. Add empty `docs/superpowers/specs/` and `docs/superpowers/plans/` folders. `npm run lint:doc` also checks the ticket, the specs and the plans.
