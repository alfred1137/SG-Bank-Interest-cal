# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

With the display enhancements now complete, the current focus is on executing **Phase 5: Integrating New Bank Accounts**.

## Recent Changes

- **Phase 4 Complete: Further enhancement of display**
  - **Objective:** Improve the overall layout and readability of the application.
  - **Actions:**
    - Modified `style.css` to make the main container flexible (`max-width: 90vw`) and increase the gap between columns to `4rem`.
    - Updated the grid layout for wider screens to `2fr 1fr` to give more space to the input section.
    - Implemented a sorting function in `script.js` to ensure the interest breakdown tiers are always displayed in ascending numerical order.
- **Phase 3 Complete: Fixed Allocation Logic**
  - Refactored the `findOptimalAllocation` function in `calculator.js` to correctly implement a marginal rate allocation strategy that respects tiered dependencies.
  - The new logic iteratively selects the best available tier from any bank, ensuring a truly optimal distribution of funds.
  - Updated the Jest test suite in `__tests__/script.test.js` with new scenarios and corrected expected values to validate the new algorithm.
  - All tests are now passing, confirming the accuracy of the core calculation engine.

## Next Steps

The following is the execution plan for **Phase 5: Integrating New Bank Accounts**:

1.  **Update calculator parameters:**
    *   Modify the function signatures and calls in `calculator.js` and `script.js` to specify which account is being assessed (e.g., `uobCondition` becomes `uobOneCondition`).
2.  **Add UOB Stash Account:**
    *   Research and define the tiered interest rates and conditions for UOB Stash.
    *   Add a new section in `index.html` for UOB Stash conditions.
    *   Create a new `calculateUOBStashInterest` function in `calculator.js`.
    *   Update `findOptimalAllocation` to include the UOB Stash account.
3.  **Add OCBC 365 Account:**
    *   Research and define the tiered interest rates and conditions for OCBC 365.
    *   Add a new section in `index.html` for OCBC 365 conditions.
    *   Create a new `calculateOCBC365Interest` function in `calculator.js`.
    *   Update `findOptimalAllocation` to include the OCBC 365 account.



## Active Decisions and Considerations

- The project will be deployed as a static site on GitHub Pages.
- The current structure with `index.html`, `style.css`, and `script.js` in the repository root is suitable for direct deployment.
- The optimal allocation algorithm and interest calculation logic from the prototype will be preserved as the core functionality.

## Important Patterns and Preferences

- Use of Markdown for all memory bank documentation.
- Clear separation of concerns in the project structure (repository root for source code, `memory-bank/` for documentation).

## Learnings and Project Insights

- **Jest/Babel Setup:** A standard pattern for testing modern JavaScript (ES Modules) involves installing `jest`, `@babel/core`, `@babel/preset-env`, and `babel-jest`, and creating a `babel.config.js` to transpile the code. This is a reusable setup for future projects.
- **Debugging Complex Logic:** When a test for a complex calculation fails, the error may lie in the test's *expectation* rather than the code itself. It's crucial to manually trace the code's execution with the test's inputs to verify the expected output before assuming the implementation is faulty.
- **Code Separation for Testability:** Separating pure logic (like in `calculator.js`) from DOM manipulation code (in `script.js`) is a key pattern for making code easier to test.
- The prototype provides a solid foundation for the core calculation logic.
- The project now uses a local Node.js build process for Tailwind CSS.
- Encountered issues with the default `npx` command, requiring the use of a specific portable Node.js path. A global `.clinerule` (`node-js-execution.md`) was created to address this for future tasks.
