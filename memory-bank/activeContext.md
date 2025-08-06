# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

With the testing framework now in place and the core logic validated, the current focus is on executing **Phase 2: Enhancing Display and User Options**.

## Recent Changes

- **Automated Tests Implemented:**
  - Successfully set up a testing environment using Jest and Babel to handle ES Modules.
  - Separated core calculation logic from `script.js` into a dedicated `calculator.js` file to facilitate testing.
  - Created `__tests__/script.test.js` with a comprehensive suite of 23 tests.
  - All tests for `calculateXInterest` and `findOptimalAllocation` are passing, ensuring the logic is robust and accurate.
- **Phase 1 Complete: Migrated to Local Tailwind CSS Build Process**
  - Installed `tailwindcss`, `postcss`, and `autoprefixer`.
  - Configured `tailwind.config.js` and `postcss.config.js`.
  - Added a `build` script to `package.json` to process `src/input.css` into the final `style.css`.
  - Updated `index.html` to remove the Tailwind CDN and link to the local `style.css`.
- Created `memory-bank/` directory and core files.
- Moved `Prototype.html` content to `index.html`.
- Initialized Git repository and made an initial commit.
- Separated JavaScript into `script.js` and `calculator.js`, and CSS into `style.css`.
- User has provided interest rate reference images in `memory-bank/interest-rates/`.
- The phased implementation plan has been approved.

## Next Steps

The following is the execution plan to address the "What's Left to Build" items:

### Phase 2: Enhancing Display and User Options (Current Focus)

1.  **Implement Display Revisions (Completed):**
    *   **Objective:** Enhanced the display of interest calculations by showing full account names, annualized interest rates per tier, right-aligning monetary values, and displaying the overall equivalent annualized interest rate.
    *   **Action:** This involved modifications to `calculator.js` (to return annualized rates), `script.js` (for display logic and new calculations, including account name mappings and equivalent rate calculation), `index.html` (for new display elements), and `style.css` (for alignment).

2.  **Add "No account" and "Failed requirements" Options (In Progress):**
    *   **Objective:** To allow users to explicitly select "No account" or "Failed requirements" for UOB, SC, and DBS accounts, which will result in no interest (0) or only the prevailing interest rate (if available) respectively for calculation for those banks.
    *   **Detailed Plan:**
        1.  **Modify `index.html`:**
            *   **UOB:** Add a new radio option with `value="no_account"` and appropriate text (e.g., "No account / Not applicable") at the beginning of the `uobCondition` toggle group.
            *   **SC:** Add a new checkbox option with `value="no_account"` and appropriate text (e.g., "No account / Not applicable") at the beginning of the `scCondition` grid.
            *   **DBS:** Add a new radio option with `value="no_account"` and appropriate text (e.g., "No account / Not applicable") at the beginning of the `dbsCondition` toggle group. The existing "Fail requirement" option will remain as is.
        2.  **Modify `script.js`:**
            *   No significant changes are expected here, as the existing `querySelectorAll` and `checked` logic should correctly capture the new radio/checkbox values.
        3.  **Modify `calculator.js`:**
            *   **`calculateUOBInterest` function:** Add a new `case 'no_account':` to the `switch (uobCondition)` statement. This case will return `{ total: 0, breakdown: {} }`.
            *   **`calculateSCInterest` function:** At the beginning of the function, add a check: `if (scConditions.includes('no_account')) { return { total: 0, breakdown: {} }; }`.
            *   **`calculateDBSInterest` function:** Add a new `case 'no_account':` to the `switch (dbsCondition)` statement. This case will return `{ total: 0, breakdown: {} }`. Ensure the `default` case for `dbsCondition` (which currently handles 'fail_requirement') correctly sets `rate = 0.0000` and `cap = 0`.
            *   **`findOptimalAllocation` function:**
                *   **UOB Segments:** If `uobCondition` is `'no_account'`, push a single segment for UOB with `rate: 0`, `amount: Infinity`, `minBalance: 0`, `maxBalance: Infinity`.
                *   **SC Segments:** If `scConditions` includes `'no_account'`, push a single segment for SC with `rate: 0`, `amount: Infinity`, `minBalance: 0`, `maxBalance: Infinity`.
                *   **DBS Segments:** If `dbsCondition` is `'no_account'` or `'fail_requirement'`, push a single segment for DBS with `rate: 0`, `amount: Infinity`, `minBalance: 0`, `maxBalance: Infinity`.

### Phase 3: Integrating New Bank Accounts

1. __Add UOB Stash Account:__

   - __Data:__ Research and define the tiered interest rates and conditions for UOB Stash.
   - __HTML:__ Add a new section in `index.html` for UOB Stash conditions (if any) and input fields.
   - __JavaScript:__ Create a new `calculateUOBStashInterest` function in `script.js`.
   - __Integration:__ Update `findOptimalAllocation` to consider UOB Stash as another "project" for fund allocation.
   - __UI:__ Update `updateAllocation` to display UOB Stash results.

2. __Add OCBC 365 Account:__

   - __Data:__ Research and define the tiered interest rates and conditions for OCBC 365.
   - __HTML:__ Add a new section in `index.html` for OCBC 365 conditions (if any) and input fields.
   - __JavaScript:__ Create a new `calculateOCBC365Interest` function in `script.js`.
   - __Integration:__ Update `findOptimalAllocation` to consider OCBC 365 as another "project" for fund allocation.
   - __UI:__ Update `updateAllocation` to display OCBC 365 results.

__Phase 4: Documentation Update__

1. __Update `progress.md`:__ After each phase, I will update the `progress.md` file to reflect the completed tasks and any new known issues or decisions.
2. __Update `activeContext.md`:__ I will also update `activeContext.md` to reflect the current work focus and any new learnings.


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
