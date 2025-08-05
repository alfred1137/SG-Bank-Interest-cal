---
Date: 2025-08-05
TaskRef: "Improve test quality for interest calculator"

Learnings:
- Gained a deep understanding of the `findOptimalAllocation` logic in `calculator.js`, specifically how it prioritizes fund allocation based on the calculated "effective rate" of different bank account tiers.
- Reinforced the process for setting up a JavaScript testing environment using Jest and Babel to handle ES Module syntax (`import`/`export`). This involved installing `jest`, `@babel/core`, `@babel/preset-env`, and `babel-jest`, and creating a `babel.config.js` file.
- Learned the specific interest rate caps and conditions for the simulated UOB, SC, DBS, and CIMB accounts, which was crucial for debugging test expectations.

Difficulties:
- The primary challenge was debugging the failing test case 'Scenario 4'. My initial manual calculation of the optimal allocation was incorrect because I underestimated the return from one of the bank's bonus tiers.
- The resolution required carefully stepping through the `findOptimalAllocation` function's logic:
  1. It calculates the total interest for each bank's primary bonus tier (the "project").
  2. It derives an `effectiveRate` for that tier.
  3. It sorts the banks by this rate and allocates funds to the highest-rated ones first, up to their bonus caps.
  4. My initial test expectation did not correctly follow this sorting and allocation logic.

Successes:
- Successfully added four comprehensive test scenarios to `__tests__/script.test.js` that validate the allocation logic under different conditions (low funds, high funds, and changing bank priorities).
- All 23 tests are now passing, indicating the core calculation logic is robust and the new tests accurately reflect its behavior.
- Successfully resolved all environment and syntax issues related to running Jest tests on ES module-based code.

Improvements_Identified_For_Consolidation:
- The pattern for debugging complex calculation logic: When a test fails, don't just assume the code is wrong. Re-read the implementation carefully and manually trace the execution with the specific test inputs. The test's expectation might be the source of the error.
- The standard setup for a Jest/Babel environment is a valuable, reusable piece of knowledge.
