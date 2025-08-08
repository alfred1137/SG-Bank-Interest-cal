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
---
Date: 2025-08-08
TaskRef: "Further enhancement of display"

Learnings:
- Using `vw` (viewport width) units for `max-width` in CSS allows for a more flexible and responsive layout that adapts to different screen sizes, as opposed to a fixed pixel value.
- When sorting strings that contain numbers (e.g., "Tier 1", "Tier 2"), it's necessary to extract the numerical part for a correct numerical sort, otherwise a standard string sort will produce incorrect order (e.g., "Tier 10" before "Tier 2").

Difficulties:
- No significant difficulties were encountered during this task. The plan was straightforward and the implementation was successful.

Successes:
- Successfully updated the layout to be more responsive and utilize more screen space.
- Successfully implemented the sorting of interest breakdown tiers, improving the clarity of the results display.

Improvements_Identified_For_Consolidation:
- The technique for sorting strings with embedded numbers is a useful and reusable pattern for data presentation.
---
Date: 2025-08-08
TaskRef: "Fix interest calculation error when SC BonusSaver is active"

Learnings:
- Identified a critical flaw in the `findOptimalAllocation` logic. The initial greedy algorithm was only locally optimal, as it did not consider that excluding a lower-yield active account could result in a better overall interest return.
- The correct approach requires evaluating all possible subsets of active accounts to find the true global maximum interest.
- Solidified the Test-Driven Development (TDD) process:
  1. Write a failing test case that captures the specific bug (`__tests__/optimal_allocation.test.js`).
  2. Confirm the test fails as expected.
  3. Refactor the code to make the test pass.
  4. Confirm all tests pass.

Difficulties:
- The initial fix was insufficient because it only optimized allocation among a fixed set of active accounts. The core issue was realizing the algorithm needed to be able to *discard* an active account if doing so was more beneficial.
- Implementing the subset generation logic adds computational complexity, but is necessary for a correct solution in this problem space.

Successes:
- Successfully refactored `findOptimalAllocation` to iterate through all subsets of active accounts, ensuring a globally optimal allocation.
- The new logic now correctly handles the user-reported scenario, where ignoring the SC BonusSaver account yields a higher total interest.
- All test suites, including the new targeted test, are passing, confirming the fix is robust.

Improvements_Identified_For_Consolidation:
- For complex optimization problems, a simple greedy algorithm may not be sufficient. It's important to consider whether evaluating combinations or subsets of options is necessary to find the true global optimum.
- The pattern of creating a specific, failing test case to reproduce a bug is a highly effective way to guide development and verify a fix.
