# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus
The current focus is on setting up the basic project scaffolding, including the directory structure and the initial memory bank for Cline. The next immediate step is to move the provided `Prototype.html` content into `src/index.html` and then initialize a Git repository.

## Recent Changes
- Created `src/` and `memory-bank/` directories.
- Created `memory-bank/projectBrief.md`, `memory-bank/productContext.md`, `memory-bank/systemPatterns.md`, and `memory-bank/techContext.md`.
- Moved `Prototype.html` content to `src/index.html`.
- Initialized Git repository and made an initial commit.

## Next Steps
1. Refine the prototype by separating JavaScript and CSS into dedicated files.
2. Implement automated tests for the calculation logic.
3. Plan for deployment of the static minisite.

## Active Decisions and Considerations
- The project will initially remain a single HTML file with inline JavaScript and CSS (via CDN) for simplicity, as per the prototype. Future enhancements might involve separating JS/CSS files and introducing a build process.
- The optimal allocation algorithm and interest calculation logic from the prototype will be preserved as the core functionality.

## Important Patterns and Preferences
- Use of Markdown for all memory bank documentation.
- Clear separation of concerns in the project structure (`src/` for source code, `memory-bank/` for documentation).

## Learnings and Project Insights
- The prototype provides a solid foundation for the core calculation logic, which is the most complex part of the application.
- The UI is basic but functional, leveraging Tailwind CSS for quick styling.
