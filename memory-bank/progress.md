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

- [X] Implement automated tests for the calculation logic.
- [X] Address potential performance/reliability concerns related to Tailwind CSS CDN by migrating to a local build process.

### Phase 2: Enhancing Display and User Options

- [ ] Calculate and display the equivalent interest rate of total interest earned.
- [ ] Display additional details on the minisite:
    - [ ] Full name of bank accounts.
    - [ ] Interest rates of different tiers.
- [ ] Add `No account` and `Failed requirements` options to all bank account selections.

### Phase 3: Integrating New Bank Accounts

- [ ] Add UOB Stash account.
- [ ] Add OCBC 365 account.

### Phase 4: Documentation Update

- [ ] Update `progress.md` and `activeContext.md` after each phase.

## Known Issues

- The optimal allocation algorithm might need further review for edge cases and absolute mathematical optimality.

## Evolution of Project Decisions

- Initial decision to keep the project as a single HTML file for rapid prototyping has been executed. The next phase involved modularizing the code by separating CSS and JavaScript.
- The memory bank has been established as the primary source of truth for project context and progress.
- The project is confirmed to be suitable for GitHub Pages deployment after a simple file relocation.
- A phased implementation plan has been adopted to systematically enhance the application, starting with core improvements like testing and local asset bundling, followed by feature enhancements and new account integrations.
- The project has been migrated from using the Tailwind CSS CDN to a local Node.js build process to improve reliability and enable customization.
