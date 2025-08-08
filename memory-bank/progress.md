# Progress: Optimal Fund Allocation Minisite

## Current Status
The basic project scaffolding is complete, and the codebase has been reviewed for GitHub Pages deployment. This includes:

- Creation of `memory-bank/` directory.
- Initialization of core memory bank files (`projectBrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`, `activeContext.md`).
- Migration of the prototype HTML content into `index.html` in the repository root.
- Separation of CSS into `style.css` and JavaScript into `script.js` in the repository root.
- Initialization of a Git repository and an initial commit.
- Review of the codebase for GitHub Pages compatibility.

## What Works

- The `memory-bank/` directory structure is set up.
- The memory bank is populated with initial context and updated with deployment plan.
- The `index.html` file is in place and correctly links to external CSS and JavaScript files.
- The core calculation logic and UI functionality are preserved.
- Git repository is initialized and the initial state is committed.
- The project is compatible with GitHub Pages deployment as a static site.

## What's Left to Build

### Phase 1: Core Enhancements

- [X] Implemented automated tests for the calculation logic.
- [X] Migrated to a local Tailwind CSS build process.

### Phase 2: Enhancing Display and User Options

- [X] Implement Display Revisions.
- [X] Add `No account` and `Failed requirements` options to all bank account selections.
- [X] Update left column (options) on the page to display full account names of different bank accounts
- [X] Have the left column (options) be scrollable while keeping the right column (calculator)

### Phase 3: Fix allocation

- [X] The current `findOptimalAllocation` function in `calculator.js` has a logical flaw in how it handles tiered interest accounts. It attempts to treat each tier as an independent segment and sorts them by rate, which is incorrect for accounts where lower tiers must be filled to unlock higher-tier rates.
>>>>>>>
- The `findOptimalAllocation` function has been refactored to correctly handle tiered interest accounts by dynamically selecting the best marginal rate from the available tiers in each step of the allocation process.
- The test suite has been updated to reflect the correct logic and all tests are now passing.

### Phase 4: Further enhancement of display

- [X] **Expand overall layout to use more available width:** Modified `style.css` to change the container's `max-width` to `90vw` for a flexible, responsive layout.
- [X] **Increase spacing between the left (options) and right (calculator) columns:** Updated the `gap` property in `style.css` to `4rem` for better visual separation.
- [X] **Display tiered interest breakdown in ascending order:** Implemented a sorting function in `script.js` to ensure interest tiers are displayed numerically.

### Phase 5: Integrating New Bank Accounts

- [ ] Update the parameters in calculator, so that they specify which specific account is being assessed (e.g. `uobCondition` can be `uobOneCondition` for UOB ONE account). This is in preparation for adding more account options which may come from the same bank.
- [ ] Add UOB Stash account.
- [ ] Add OCBC 365 account.

## Known Issues

- No known issues at this time. The core calculation logic has been validated by a comprehensive test suite.

## Evolution of Project Decisions

- Initial decision to keep the project as a single HTML file for rapid prototyping has been executed. The next phase involved modularizing the code by separating CSS and JavaScript.
- The memory bank has been established as the primary source of truth for project context and progress.
- The project is confirmed to be suitable for GitHub Pages deployment after a simple file relocation.
- A phased implementation plan has been adopted to systematically enhance the application, starting with core improvements like testing and local asset bundling, followed by feature enhancements and new account integrations.
- The project has been migrated from using the Tailwind CSS CDN to a local Node.js build process to improve reliability and enable customization.
