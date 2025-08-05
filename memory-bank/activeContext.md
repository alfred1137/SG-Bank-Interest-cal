# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

The current focus is on preparing the webpage for deployment via GitHub Pages, which involves reviewing the existing code and planning the necessary file structure adjustments.

## Recent Changes

- Created `memory-bank/` directory.
- Created `memory-bank/projectBrief.md`, `memory-bank/productContext.md`, `memory-bank/systemPatterns.md`, and `memory-bank/techContext.md`.
- Moved `Prototype.html` content to `index.html` in the repository root.
- Initialized Git repository and made an initial commit.
- Separated JavaScript into `script.js` and CSS into `style.css` in the repository root.
- Reviewed the codebase (`index.html`, `style.css`, `script.js`) for GitHub Pages compatibility.
- Created `memory-bank/interest-rates/` directory and `memory-bank/interest-rates/00-interest-rates-master.md` placeholder file.
- User has provided interest rate reference images in `memory-bank/interest-rates/`.
- Implemented Automated Tests for Calculation Logic

   - __Action:__ Set up a testing framework (e.g., Jest or a simple in-browser testing setup).
   - __Tests:__ Write unit tests for each `calculateXInterest` function and the `findOptimalAllocation` function to ensure accuracy and cover various edge cases.
   - __Proposed Framework:__ Jest (Node.js)
     - __Setup:__
       1. Initialize Node.js project (`npm init -y`).
       2. Install Jest as a dev dependency (`npm install --save-dev jest`).
       3. Add a test script to `package.json`: `"test": "jest"`.
     - __Testing Strategy:__
       1. Create a `__tests__` directory.
       2. Create `script.test.js` to import and test functions from `script.js`.
       3. Write unit tests for `calculateXInterest` functions covering base, edge, and typical cases.
       4. Write integration-style unit tests for `findOptimalAllocation` to verify optimal allocation and handle various conditions.

## Next Steps

plan to address the "What's Left to Build" items:

__Phase 1: __Enhancements__

1. __Address Tailwind CSS CDN Concerns:__

   - __Action:__ Migrate from Tailwind CSS CDN to a local build process. This will involve:

     - Initializing a Node.js project (`npm init`).
     - Installing Tailwind CSS and PostCSS as dev dependencies.
     - Configuring `tailwind.config.js` to purge unused CSS.
     - Setting up a build script to compile CSS.

   - __HTML:__ Update `index.html` to link to the locally built `style.css` instead of the CDN.
   - __Proposed Framework:__ Tailwind CSS (Node.js)
     - __Setup:__
       1. Initialize Node.js project (`npm init -y`).
       2. Install Tailwind CSS, PostCSS, and Autoprefixer as dev dependencies (`npm install --save-dev tailwindcss postcss autoprefixer`).
       3. Generate Tailwind config files (`npx tailwindcss init -p`).
       4. Configure `tailwind.config.js` for purging: `content: ["./index.html", "./script.js"]`.
       5. Create `src/input.css` with Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`).
       6. Add a build script to `package.json`: `"build:css": "tailwindcss -i ./src/input.css -o ./style.css --minify"`.
     - __HTML Update:__ Ensure `index.html` links to `./style.css`.


__Phase 2: Enhancing Display and User Options__

1. __Calculate and Display Equivalent Interest Rate:__

   - __Action:__ Modify `script.js` to calculate the equivalent annual interest rate based on the `totalMonthlyInterest` and `totalFunds`.
   - __Display:__ Add a new element in `index.html` to display this calculated equivalent rate.

2. __Display Full Bank Account Names and Tier Interest Rates:__

   - __Action:__ Update the `interestBreakdownDiv` rendering logic in `script.js` to include the full bank account names and the specific annual interest rates for each tier. This will likely involve creating a data structure in `script.js` to map conditions/tiers to their descriptive names and rates.
   - __Display:__ Modify the `interest-breakdown-item` in `index.html` and `style.css` if necessary to accommodate this additional information.

3. __Add "No account" and "Failed requirements" Options:__

   - __Action:__ For UOB, SC, and DBS, add new radio/checkbox options in `index.html` for "No account" and "Failed requirements".
   - __Logic:__ Update the respective `calculateUOBInterest`, `calculateSCInterest`, and `calculateDBSInterest` functions in `script.js` to handle these new conditions, returning 0 interest and 0 breakdown for these selections.

__Phase 3: Integrating New Bank Accounts__

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

- The prototype provides a solid foundation for the core calculation logic, which is the most complex part of the application.
- The UI is basic but functional, leveraging Tailwind CSS for quick styling.
- The current setup is highly compatible with GitHub Pages due to its static nature and CDN usage for Tailwind CSS.
- The interest rate data from `script.js` has been documented, and new image references are available for further documentation updates.
