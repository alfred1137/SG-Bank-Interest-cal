# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

The project is now focusing on final UI/UX polish and additional components.

1.  **Phase 8: UI Improvements** - Polishing the visual presentation and usability.
2.  **Phase 9: other expected components** - About page and social links.

## Recent Changes

-   **Theme & UI Polish (2026-01-20):**
    -   Switched dark mode flavor to **Catppuccin Macchiato** (lighter/softer than Mocha).
    -   Adjusted semantic mappings to ensure cards and blocks use **lighter surface levels** for better contrast and a cleaner look.
    -   Implemented a **floating theme toggle** at the bottom right for better accessibility.
    -   Refined the **Catppuccin Latte (Light Mode)** palette for better depth and consistency.
    -   Added support for **manual theme overrides** (.dark/.light classes) with `localStorage` persistence.
    -   **Overhauled README.md:** Switched to a professional, comprehensive template with clear installation and usage instructions.
    -   **Favicon:** Integrated a bank-themed SVG favicon from SVG Find.
    -   **About Modal:** Added an "About Project" section to explain the mission and tech stack.
-   **Phase 8: UI Improvements - Defaults & Labels (2026-01-20):**
    -   Implemented default settings for all bank accounts as per user requirements.
    -   Added "Last updated" dates to each bank account card for transparency.
    -   Introduced "Minimum qualifying requirement" labels to specific conditions (UOB One spend, UOB Stash MAB, DBS Multiplier volume).
    -   Enhanced the interest breakdown UI to show the specific allocated amount and capacity (cap) for each tier.
    -   Refined currency formatting to consistently use "S$" prefix.
    -   **Merge:** Successfully merged all features into the `main` branch and pushed to origin.
-   **Phase 7: Legal Disclaimers & Modal Fix (2026-01-20):** 
    -   Added concise disclaimer to hero section and full disclaimer in footer.
    -   Implemented the legal disclaimer modal.
    -   **Fix:** Resolved an issue where the modal was non-functional and appeared to "freeze" the page due to missing CSS variables and incorrect display class toggling.
-   **Catppuccin Integration Complete (2026-01-20):** Successfully implemented the Catppuccin color scheme (Latte/Mocha) across the entire application, including adaptive dark mode support and semantic variable mapping.
-   **Refactoring Complete (2026-01-19):**
    -   **Externalized Configuration:** Created `src/config/bank-rates.js` to store all interest rates and tier structures.
    -   **Restructured Project:**
        -   Moved core logic to `src/logic/` (`calculator.js`, `allocation-engine.js`).
        -   Moved UI code to `src/ui/` (`script.js`).
    -   **Enhanced Robustness:** Added input validation for array parameters in calculation logic.
    -   **Decoupled Tests:** Updated `__tests__/` to reflect the new structure and verified functionality with `npm test`.

## Current State

-   **Architecture:** Modular, config-driven, and testable.
-   **Tests:** Passing (Unit and Integration).
-   **Config:** Centralized in `src/config/bank-rates.js`.

## Next Steps

1.  **UI Polish (Phase 8 Refinements):**
    -   Add Favicon.
2.  **Additional Components (Phase 9):**
    -   Implement support for Light Mode (Latte).
    -   Add Dark / Light mode toggle.
    -   Overhaul README.
    -   Implement "About" page / more social links (GitHub already linked).
