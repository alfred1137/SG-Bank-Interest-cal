# Progress: Optimal Fund Allocation Minisite

## Current Status
The project has undergone a major refactoring to improve maintainability and scalability. The codebase is now modular, with logic separated from UI and configuration externalized.

- **Refactoring Complete:** Core logic is in `src/logic`, UI code in `src/ui`, and rates in `src/config`.
- **Tests Passing:** Unit and integration tests verified against the new structure.
- **Ready for Features:** The stable codebase is ready for the remaining UI and content tasks.

## What Works

- The `memory-bank/` directory structure is set up.
- The `index.html` file correctly links to the new modular JavaScript files.
- The core calculation logic is robust and config-driven.
- Git repository is initialized and the project is compatible with GitHub Pages.

## What's Left to Build (TODOs)

### Phase 10: Catppuccin Aesthetic

- [X] Define Catppuccin colors in `src/input.css`.
- [X] Update `index.html` to use Catppuccin-themed Tailwind classes.
- [X] Implement support for both Light (Latte) and Dark (Mocha) modes using system preferences.
- [X] Update component styles (toggles, cards, header) to match the aesthetic.

### Phase 7: Add Legal Disclaimers

- [X] Add a disclaimer to the top of the `README.md` file.
- [X] Add a concise disclaimer near the calculation results on the webpage.
- [X] Add a comprehensive disclaimer in the page footer, linked to a modal.
- [X] Implement the modal containing the full disclaimer text.

### Phase 8: More UI improvements

- [ ] Favicon
- [ ] no horizontally scrollable bank selection panel unless out of space
- [ ] Title `Fund Allocation Optimizer` outside of the interaction space (to the top)
- [ ] `Total Funds (SGD):` input to the right panel above calculator
- [ ] Tier display improvement (e.g `Tier (2.50%) p.a.` to `Tier 1 (10k) at 2.50% p.a.`)

### Phase 9: other expected components

- [ ] about page
- [ ] social button to github and blog

## Completed Milestones

- **Phase 1: Core Enhancements:** Implemented automated tests and migrated to a local Tailwind CSS build process.
- **Phase 2: UI/UX Improvements:** Revised the display, added options for account selection, made the options column scrollable, and displayed full account names.
- **Phase 3: Allocation Fix:** Refactored the `findOptimalAllocation` function to ensure globally optimal fund allocation, resolving a critical bug.
- **Phase 4: Display Enhancements:** Expanded the layout width, increased column spacing, and sorted the tiered interest breakdown.
- **Phase 5: Calculator Overhaul:** Redeveloped the allocation engine for correctness and accuracy, decoupling logic into `allocation-engine.js` and revamping the test suite.
- **Phase 6: New Bank Accounts:** Integrated UOB Stash and OCBC 360 accounts, refactoring parameters for specificity.
- **Refactoring:** Modularized codebase (`src/logic`, `src/ui`) and externalized configuration (`src/config/bank-rates.js`).

## Known Issues

- No known issues at this time. The core calculation logic has been validated by a comprehensive test suite.

## Evolution of Project Decisions

- Initial decision to keep the project as a single HTML file for rapid prototyping has been executed. The next phase involved modularizing the code by separating CSS and JavaScript.
- The memory bank has been established as the primary source of truth for project context and progress.
- The project is confirmed to be suitable for GitHub Pages deployment after a simple file relocation.
- A phased implementation plan has been adopted to systematically enhance the application, starting with core improvements like testing and local asset bundling, followed by feature enhancements and new account integrations.
- The project has been migrated from using the Tailwind CSS CDN to a local Node.js build process to improve reliability and enable customization.
- **Refactoring Decision:** To prevent "spaghetti code" and make rate updates easier, we adopted a config-driven architecture and separated logic from UI.