# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

The project is now focusing on final UI/UX polish and additional components.

1.  **Phase 8: UI Improvements** - Polishing the visual presentation and usability.
2.  **Phase 9: other expected components** - About page and social links.

## Recent Changes

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

1.  **UI Polish (Phase 8):**
    -   Add Favicon.
    -   Improve bank selection panel (remove horizontal scroll if possible).
    -   Move Title to top (outside interaction space).
    -   Move "Total Funds" input to the right panel.
    -   Improve Tier display format in breakdown.
2.  **Additional Components (Phase 9):**
    -   Implement "About" page.
    -   Add social links (GitHub, Blog).
