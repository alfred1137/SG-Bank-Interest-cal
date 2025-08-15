# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

The project is now in **Phase 6: Integrating New Bank Accounts**. The primary objective is to expand the calculator's functionality by adding new bank account options and refactoring the existing code to support this expansion.

## Recent Changes

- **Phase 5 Complete: Allocation Engine Redevelopment**
  - **Objective:** The core allocation logic was completely redeveloped to ensure correctness, accuracy, and efficiency.
  - **Key Outcomes:**
    - **Architectural Refactor:** The logic was decoupled into a dedicated `allocation-engine.js`, with `calculator.js` now serving as a pure data module for bank interest tiers.
    - **Correct Algorithm:** A new `findOptimalAllocationAndInterest` function was implemented, which correctly uses the "Marginal Rate Allocation" strategy for globally optimal results.
    - **UI Integration:** `script.js` was updated to integrate with the new modular engine.
    - **Test Overhaul:** The test suite was revamped with new unit and integration tests, all of which are passing.

## Next Steps

The following is the execution plan for **Phase 6: Integrating New Bank Accounts**:

1.  **Update Parameters for Specificity:**
    *   Refactor function parameters in the codebase to be account-specific (e.g., changing `uobCondition` to `uobOneCondition`). This is a prerequisite for adding multiple accounts from the same bank.
2.  **Add UOB Stash Account:**
    *   Define the interest rate tiers and conditions for the UOB Stash account in `calculator.js`.
    *   Add the necessary UI elements and event listeners for the UOB Stash account in `index.html` and `script.js`.
    *   Integrate the new account into the `allocation-engine.js`.
3.  **Add OCBC 360 Account:**
    *   Define the interest rate tiers and conditions for the OCBC 360 account in `calculator.js`.
    *   Add the necessary UI elements and event listeners for the OCBC 360 account in `index.html` and `script.js`.
    *   Integrate the new account into the `allocation-engine.js`.



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
