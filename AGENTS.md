# SG Bank Interest Cal - Agent Instructions

## Commands
- **Build CSS:** `npm run build` (compiles `src/input.css` to `src/output.css`)
- **Test:** `npm test` (Jest)
- **Start Dev Server:** `npm start` (http-server on port 8080)

## Architecture & Layout
- **Entry:** `index.html` (Vanilla JS SPA + Tailwind CSS output)
- **Logic Engine:** `src/logic/allocation-engine.js`, `src/logic/calculator.js`
- **Config Data:** `src/config/bank-rates.js` (Separate rates/tiers from calculation logic)
- **UI:** `src/ui/script.js`
- **Tests:** `__tests__/` (`allocation-engine.test.js`, `script.test.js`)

## Conventions
- Keep calculations decoupled from DOM handling.
- Update unit tests under `__tests__/` when modifying `src/logic/`.
- Always rebuild CSS (`npm run build`) after editing Tailwind classes or `src/input.css`.

## Git & Version Control Guidelines

### 1. Incremental Commits
* Commit after every logical checkpoint.
* One responsibility per commit.
* No mixed changes.
* Every commit: build, compile, tests pass.

### 2. Staging
* Never use `git add .` or `git add -A`.
* Stage explicit files/paths only.
  * Example: `git add src/components/Button.tsx`

### 3. Commit Messages
* Use Conventional Commits.
  * Example: `feat(ui): add primary button component`
* Imperative, present tense.
* Rules:
  * Title < 50 chars.
  * Blank line between title/body.
  * Body wrap ≤ 72 chars/line.
  * Body explains *why*, not *how*.
  * Use bullet points.

### 4. Verification & Failures
* Run tests, linters, builders before commit.
* On hook, linter, test failure: stop immediately.
* Never use `--no-verify`.
* Show full error logs.
* Wait for user instruction.

## Version Bumping

### Trigger

Every push to `main`.

### Steps

1. Analyse push diff; determine release scope.
2. Apply SemVer:
   * Fixes: patch
   * Features: minor
   * Breaking changes: major
3. Update version fields in project manifests and UI elements.
4. Commit: `chore: bump version to X.Y.Z`
5. Create lightweight tag `vX.Y.Z`; push tag to origin.

