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

## Next Steps
1. Update `memory-bank/interest-rates/00-interest-rates-master.md` to reflect the provided interest rate images as data sources.
2. Implement automated tests for the calculation logic (future).
3. Address potential performance/reliability concerns related to Tailwind CSS CDN (future).

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
