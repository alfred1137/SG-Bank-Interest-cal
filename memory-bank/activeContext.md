# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

The project has successfully completed **Phase 8: Codebase Review & Refactoring**. The codebase is now structured with a clear separation of concerns (Logic, UI, Config), and interest rates are externalized.

The immediate focus returns to feature completeness and user experience improvements:
1.  **Phase 7: Add Legal Disclaimers** - Ensuring users understand the tool is for estimation only.
2.  **Phase 8: UI Improvements** - Polishing the visual presentation and usability.

## Recent Changes

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

1.  **Legal Disclaimers (Phase 7):**
    -   Add concise disclaimer near results.
    -   Implement "Legal / Disclaimer" modal in the footer.
2.  **UI Polish (Phase 8):**
    -   Add Favicon.
    -   Improve bank selection panel (remove horizontal scroll if possible).
    -   Move Title to top (outside interaction space).
    -   Move "Total Funds" input to the right panel.
    -   Improve Tier display format in breakdown.
