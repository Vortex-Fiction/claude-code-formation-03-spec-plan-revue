# Build log

This repo was built with Claude Code from a written plan. Each entry is the instruction given for one task.

## Task 1 — Start phase 3 from the phase 2 reference answers

> Copy the tree of the phase 2 `solution` branch without its history, with `git archive`. It already has the three `CLAUDE.md` files, `.claude/settings.json`, the format hook and the `libs/shared` README. Remove the phase 2 exercises, slides and build log. The README tells how to install the `superpowers` plugin and how to fork the repo for the pull request.

## Task 2 — Add the coverage gate and the phase 3 feature ticket

> Add `npm run test:coverage`: Vitest with v8 on `backend/src`, 100 % for lines, branches, functions and statements. Do not count `main.ts`, the specs and the seed. When the gate fails, add the missing tests, not exclusions. Write `tickets/feature.md` about due dates and overdue loans: a clear need, and real open questions for the brainstorm. Add empty `docs/superpowers/specs/` and `docs/superpowers/plans/` folders. `npm run lint:doc` also checks the ticket, the specs and the plans.

## Task 3 — Add the phase 3 exercises

> Write four exercises in French under `exercices/`: brainstorm the ticket into a spec with `superpowers:brainstorming`, write the plan with `superpowers:writing-plans`, execute it in a worktree with TDD and one commit per task, then review in three layers and open the pull request on the fork. Each exercise ends with clear success criteria. The lint and Git ignore a worktree under `.claude/worktrees/`.

## Task 4 — Add the phase 3 slides

> Write `slides.md` for Marp, in French, about 25 slides in the order of the phase 3 outline: the cycle, the spec, the plan, TDD, proof before claims, Git, worktrees, subagents, the three review layers and the hunt list. At most 5 bullets per slide, speaker notes on the theory slides. Render to PNG and check that no text overflows.
