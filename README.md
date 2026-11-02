# Claude Code training — phase 3: spec, plan, code, review

A small library app (books, authors, loans) used for the phase 3 exercises. The exercises are in [`exercices/`](exercices/) and the slides in [`slides.md`](slides.md). The `solution` branch has one possible answer for each exercise.

## Prerequisites

Install these tools before the session. You need Node.js 20.19 or later. On Windows, use an x64 computer: the SQLite driver has no Windows ARM build.

On Windows, first allow PowerShell to run the npm and Claude Code launchers (once per user):

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

| Tool        | macOS (Homebrew)                           | Windows (winget, in PowerShell)            |
| ----------- | ------------------------------------------ | ------------------------------------------ |
| Node.js LTS | `brew install node`                        | `winget install OpenJS.NodeJS.LTS`         |
| git         | `brew install git`                         | `winget install Git.Git`                   |
| GitHub CLI  | `brew install gh`                          | `winget install GitHub.cli`                |
| Claude Code | `npm install -g @anthropic-ai/claude-code` | `npm install -g @anthropic-ai/claude-code` |

Then, on both systems:

```bash
gh auth login
claude
```

`claude` asks you to sign in the first time.

Close and open your terminal again after the installation, so that it finds the new commands.

The exercises use the `superpowers` plugin. Install it in Claude Code during the session:

```text
/plugin install superpowers@claude-plugins-official
```

## Run

```bash
git clone https://github.com/Vortex-Fiction/claude-code-formation-03-spec-plan-revue.git
cd claude-code-formation-03-spec-plan-revue
npm install
npm run back
```

In a second terminal:

```bash
npm run front
```

- API: http://localhost:3000/api/books
- App: http://localhost:5173

The SQLite database is created in `backend/data/` on the first `npm run back`. To start again from the seed data, stop the API and delete `backend/data/`.

## Check

```bash
npm test
npm run test:coverage
npm run lint
npm run lint:doc
```

`npm run test:coverage` runs the backend tests with coverage. It fails when lines, branches, functions or statements go below 100 %. It does not count `main.ts`, `db/database.module.ts` and `db/seed.ts`: `npm run back` runs them.

`npm run lint:doc` checks each `README.md` and `CLAUDE.md`, the tickets in `tickets/`, and the specs and plans in `docs/superpowers/` with Vale and the Simplified Technical English rules in `.vale/`. `npm install` downloads Vale. If `npm run lint:doc` tells you that Vale is missing, run `npm rebuild @vvago/vale`.

## Open a pull request

The last exercise opens a pull request on your fork. In your clone, create the fork once:

```bash
gh repo fork --remote
```

`gh` adds your fork as the `origin` remote and keeps this repo as `upstream`. Push your branch to `origin`. Then open the pull request on your fork, not on this repo:

```bash
gh pr create --repo <your-user>/claude-code-formation-03-spec-plan-revue
```
