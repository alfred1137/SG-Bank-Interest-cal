# System Patterns: Optimal Fund Allocation Minisite

## Architecture Overview
The minisite is a single-page application (SPA) implemented using HTML, CSS (Tailwind CSS), and JavaScript. It follows a client-side architecture where all logic for calculations and UI updates resides within the browser.

```mermaid
graph TD
    User[User] --> Browser[Web Browser]
    Browser --> HTML[index.html]
    HTML --> CSS[Tailwind CSS & Inline Styles]
    HTML --> JS[JavaScript Logic]
    JS --> Calculation[Interest Calculation Functions]
    JS --> Allocation[Optimal Allocation Algorithm]
    JS --> UIUpdate[DOM Manipulation for Results]
    Calculation --> Allocation
    Allocation --> UIUpdate
    UIUpdate --> User
```

## Key Technical Decisions
- **Frontend Framework/Library:** None. Pure HTML, CSS, and JavaScript for simplicity and minimal overhead.
- **Styling:** Tailwind CSS, managed via a local Node.js build process (`npm run build`) that compiles `src/input.css` into a static `style.css` file. This avoids reliance on a CDN and is compatible with static hosting platforms like GitHub Pages.
- **Testing:** Jest is used as the testing framework to ensure the accuracy of the calculation logic. Tests are run via the `npm test` command.
- **Data Storage:** No persistent data storage is used. All inputs are ephemeral and processed in real-time.
- **Backend:** No backend is required. All calculations are performed client-side.

## Design Patterns in Use
- **Module Pattern:** The JavaScript code is organized into modules. `calculator.js` contains all the pure calculation logic, which is then imported and used by `script.js` for DOM manipulation and handling user events. This separation of concerns makes the code more maintainable and easier to test.
- **Event-Driven Programming:** UI updates are triggered by user input events (e.g., `input` on total funds, `change` on radio buttons), which are handled in `script.js`.

## Component Relationships
- **HTML Structure:** Defines the layout and input fields.
- **CSS:** Styles the HTML elements for visual presentation.
- **JavaScript:**
    - Reads input values from HTML elements.
    - Contains functions for calculating interest for each bank.
    - Implements an algorithm to find the optimal fund allocation.
    - Updates the HTML DOM to display results.

## Critical Implementation Paths
- **Interest Calculation Functions:** Each bank's interest calculation logic (`calculateUOBInterest`, `calculateSCInterest`, `calculateDBSInterest`, `calculateCIMBInterest`) must accurately reflect the bank's tiered rates and conditions.
- **Optimal Allocation Algorithm (`findOptimalAllocation`):** This is the core logic that determines how funds are distributed. It must correctly identify the highest marginal interest rate at each step to ensure optimal allocation.
- **UI Update Logic:** The `updateAllocation` function is responsible for reading inputs, calling the allocation algorithm, and rendering the results dynamically.
