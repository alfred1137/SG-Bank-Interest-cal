# Progress: SG Fund Allocation Optimizer

## 1. What Works

As of the current analysis, the application is fully functional according to its core requirements.
-   **Fund Input**: Users can input their total funds.
-   **Bank Selection**: All bank account options and their corresponding conditions are selectable in the UI.
-   **Calculation Engine**: The allocation algorithm correctly calculates and distributes funds based on the selected inputs and the hardcoded interest rate tiers.
-   **Results Display**: The optimal allocation, total monthly interest, and detailed interest breakdown are displayed clearly and update in real-time as user inputs change.
-   **Development Environment**: The `npm` scripts for starting a local server (`npm start`), building CSS (`npm run build`), and running tests (`npm test`) are functional.

## 2. What's Left to Build

The core functionality is complete. Future work is likely to fall into these categories:

-   **Maintenance & Updates**:
    -   **Interest Rate Updates**: The interest rates and tier conditions for the banks are subject to change. The `calculator.js` file will need to be updated periodically to reflect the latest market conditions.
    -   **Dependency Updates**: Development dependencies in `package.json` may need to be updated over time.

-   **Potential New Features (Not Yet Prioritized)**:
    -   Adding more banks to the calculator.
    -   Allowing users to save or share their results.
    -   Implementing a more visually engaging results display (e.g., charts, graphs).
    -   Providing historical interest rate data.

## 3. Current Status

-   **Version**: 1.0.0 (as per `package.json`).
-   **State**: The project is in a stable, " MVP" (Minimum Viable Product) state. It successfully fulfills its primary purpose.
-   **Current Activity**: The project is undergoing a documentation phase to establish a comprehensive "Memory Bank" to ensure future maintainability.

## 4. Known Issues

-   There are no known bugs or functional issues with the application at this time.
-   The primary "issue" is not a bug, but a maintenance consideration: the hardcoded interest rate data will inevitably become outdated.

## 5. Evolution of Project Decisions

-   **Initial Concept**: A personal hobby project to solve a real-world problem.
-   **Technology Choice**: The decision to use vanilla JavaScript without a major framework was likely made to keep the project lightweight and simple for its single-purpose scope.
-   **Architectural Pattern**: The separation of concerns into `calculator.js` (data), `allocation-engine.js` (logic), and `script.js` (view) was a key decision that makes the code clean, testable, and easy to maintain. This pattern has proven effective.
-   **Current State**: The project has matured from a simple script to a well-structured, albeit small, web application with a proper development workflow (testing, CSS builds). The current focus on documentation reflects a shift towards ensuring its long-term viability.
