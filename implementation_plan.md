# Implementation Plan

[Overview]
This plan outlines the process for expanding the fund allocation calculator by integrating two new bank accounts (UOB Stash and OCBC 360) and refactoring existing code to improve clarity and scalability. The goal is to add more options for the user to optimize their fund allocation for higher interest returns. This implementation is the next logical step in the project's evolution, as outlined in `memory-bank/activeContext.md`.

[Types]
No new complex types will be introduced; the existing data structure for interest rate tiers will be reused. The structure is an array of objects, where each object represents a tier with `bank`, `capacity`, and `rate` properties.

[Files]
This implementation will modify three existing files: `calculator.js`, `script.js`, and `index.html`.

- **`calculator.js`**: This file will be modified to add functions for the new UOB Stash and OCBC 360 accounts. The existing `getUOBTierSegments` function will be renamed to `getUOBOneTierSegments`.
- **`script.js`**: This file will be updated to handle the new UI elements for the UOB Stash and OCBC 360 accounts, and to call the new functions in `calculator.js`. The bank account names mapping will also be updated.
- **`index.html`**: This file will be updated to include new sections for the UOB Stash and OCBC 360 account conditions, allowing users to select them.

[Functions]
This implementation will add new functions and modify existing ones to support the new bank accounts.

- **New Functions:**
    - `getUOBStashTierSegments(uobStashCondition)` in `calculator.js`: This function will return the interest rate tiers for the UOB Stash account based on the provided condition.
    - `getOCBC360TierSegments(ocbc360Condition)` in `calculator.js`: This function will return the interest rate tiers for the OCBC 360 account based on the provided conditions.
- **Modified Functions:**
    - `getUOBTierSegments` in `calculator.js` will be renamed to `getUOBOneTierSegments`. The parameter `uobCondition` will be renamed to `uobOneCondition`.
    - `updateAllocation` in `script.js`: This function will be modified to get the selected conditions for the new accounts, call the new tier segment functions, and include their results in the `allTiers` array for the allocation engine.
- **Removed Functions:**
    - No functions will be removed.

[Classes]
No classes will be added, modified, or removed as the project uses a functional approach.

[Dependencies]
No new dependencies will be added.

[Testing]
The testing approach will involve manual testing of the UI to ensure the new accounts are correctly integrated and the calculations are accurate.

- **New Tests:**
    - No new automated test files will be created, but manual testing will be performed.
- **Modified Tests:**
    - Existing tests may need to be updated to reflect the function renaming (`getUOBTierSegments` to `getUOBOneTierSegments`).

[Implementation Order]
The implementation will follow a logical sequence to ensure a smooth integration of the new accounts.

1.  **Refactor `calculator.js`**: Rename `getUOBTierSegments` to `getUOBOneTierSegments` and update its parameter.
2.  **Refactor `script.js`**: Update the call to the renamed function from step 1.
3.  **Add UOB Stash Account**:
    -   Add `getUOBStashTierSegments` function to `calculator.js`.
    -   Add UI elements for UOB Stash to `index.html`.
    -   Update `script.js` to handle the new UI elements and integrate the UOB Stash account into the allocation logic.
4.  **Add OCBC 360 Account**:
    -   Add `getOCBC360TierSegments` function to `calculator.js`.
    -   Add UI elements for OCBC 360 to `index.html`.
    -   Update `script.js` to handle the new UI elements and integrate the OCBC 360 account into the allocation logic.
5.  **Update Bank Account Names**:
    -   Update the `bankAccountNames` object in `script.js` to include the new accounts.
6.  **Final Testing**:
    -   Perform thorough manual testing of the entire application to ensure all accounts work correctly and the allocation is optimal.
