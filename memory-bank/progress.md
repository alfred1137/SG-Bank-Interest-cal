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

### Core Features
- [ ] Calculate and display the equivalent interest rate of total interest earned.
- [ ] Display additional details on the minisite:
    - [ ] Full name of bank accounts.
    - [ ] Interest rates of different tiers.
- [ ] Add `No account` and `Failed requirements` options to all bank account selections.

### New Account Integration
- [ ] Add UOB Stash account.
- [ ] Add OCBC 365 account.

### Future Enhancements
- [ ] Implement automated tests for the calculation logic.
- [ ] Address potential performance/reliability concerns related to Tailwind CSS CDN.

## Known Issues
- The current setup relies on CDN for Tailwind CSS, which is fine for a prototype but not ideal for production due to potential performance and reliability concerns.
- The optimal allocation algorithm might need further review for edge cases and absolute mathematical optimality.

## Evolution of Project Decisions
- Initial decision to keep the project as a single HTML file for rapid prototyping has been executed. The next phase involved modularizing the code by separating CSS and JavaScript.
- The memory bank has been established as the primary source of truth for project context and progress.
- The project is confirmed to be suitable for GitHub Pages deployment after a simple file relocation.
