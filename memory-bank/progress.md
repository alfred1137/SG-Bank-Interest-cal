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

## What's Left to Build (TODOs)

### Phase 1: Core Enhancements

- [X] Implemented automated tests for the calculation logic.
- [X] Migrated to a local Tailwind CSS build process.

### Phase 2: Enhancing Display and User Options

- [X] Implement Display Revisions.
- [X] Add `No account` and `Failed requirements` options to all bank account selections.
- [X] Update left column (options) on the page to display full account names of different bank accounts
- [X] Have the left column (options) be scrollable while keeping the right column (calculator)

### Phase 3: Fix allocation

- [X] The `findOptimalAllocation` function in `calculator.js` has been completely refactored to ensure a globally optimal fund allocation. The final implementation evaluates all possible subsets of active bank accounts to find the combination that yields the absolute maximum interest, intelligently discarding less beneficial accounts if necessary. This resolves a critical bug where the previous greedy algorithm produced suboptimal results. A new test file, `__tests__/optimal_allocation.test.js`, was created to verify this specific fix.

### Phase 4: Further enhancement of display

- [X] **Expand overall layout to use more available width:** Modified `style.css` to change the container's `max-width` to `90vw` for a flexible, responsive layout.
- [X] **Increase spacing between the left (options) and right (calculator) columns:** Updated the `gap` property in `style.css` to `4rem` for better visual separation.
- [X] **Display tiered interest breakdown in ascending order:** Implemented a sorting function in `script.js` to ensure interest tiers are displayed numerically.

### Phase 5: Overhaul calculator

- [X] **feat(calculator): Redevelop allocation engine for correctness and accuracy.** Key changes include:
    - **Architectural Refactor:** The core logic is now decoupled into a dedicated `allocation-engine.js`, with `calculator.js` refactored to serve as a pure data module for bank interest tiers.
    - **Correct Algorithm:** A new `findOptimalAllocationAndInterest` function correctly sorts all available interest tiers by their marginal rate and allocates funds sequentially, ensuring a globally optimal result. Interest is calculated simultaneously with allocation to guarantee accuracy.
    - **UI Integration:** The main `script.js` has been updated to integrate with the new, modular engine.
    - **Test Overhaul:** The testing suite has been completely revamped. The old, irrelevant tests were removed, and new unit tests for the allocation engine and comprehensive integration tests were created. All tests are now passing.

### Phase 6: Integrating New Bank Accounts

- [ ] **Update Parameters for Specificity:** Refactor function parameters to be account-specific (e.g., `uobCondition` to `uobOneCondition`) to prepare for multiple accounts from the same bank.
- [ ] **Add UOB Stash Account:** Integrate the UOB Stash account, including its interest rate tiers, conditions, and UI elements.
- [ ] **Add OCBC 360 Account:** Integrate the OCBC 360 account, including its interest rate tiers, conditions, and UI elements.

## Known Issues

- No known issues at this time. The core calculation logic has been validated by a comprehensive test suite.

## Evolution of Project Decisions

- Initial decision to keep the project as a single HTML file for rapid prototyping has been executed. The next phase involved modularizing the code by separating CSS and JavaScript.
- The memory bank has been established as the primary source of truth for project context and progress.
- The project is confirmed to be suitable for GitHub Pages deployment after a simple file relocation.
- A phased implementation plan has been adopted to systematically enhance the application, starting with core improvements like testing and local asset bundling, followed by feature enhancements and new account integrations.
- The project has been migrated from using the Tailwind CSS CDN to a local Node.js build process to improve reliability and enable customization.
