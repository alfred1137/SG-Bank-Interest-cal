# Technical Context: Optimal Fund Allocation Minisite

## Technologies Used
- **HTML5:** For structuring the web content.
- **CSS3:** For styling.
- **Tailwind CSS:** A utility-first CSS framework used for styling. It is managed as a local dependency and compiled into `style.css` via a build script.
- **JavaScript (ES6+):** For all interactive logic, calculations, and DOM manipulation. The code is structured using ES Modules (`import`/`export`).
- **Node.js:** Used for package management (`npm`) and running build/test scripts.
- **Jest:** The testing framework used for unit testing the JavaScript logic.
- **Babel:** Used to transpile modern JavaScript for compatibility with the Jest testing environment.

## Development Setup
- **Editor:** VS Code.
- **Package Manager:** npm for managing project dependencies.
- **Build Process:** An `npm run build` script uses `tailwindcss` and `postcss` to compile `src/input.css` into the final `style.css`.
- **Testing:** An `npm test` script runs the Jest test suite located in the `__tests__` directory.
- **Local Server:** A simple local HTTP server (e.g., VS Code's Live Server extension) can be used to serve `index.html`.

## Technical Constraints
- **Client-Side Only:** All logic must run in the browser.
- **Static Site:** The project is a static site, making it suitable for deployment on platforms like GitHub Pages.
- **Browser Compatibility:** Should aim for compatibility with modern browsers (Chrome, Firefox, Edge, Safari).

## Dependencies
- **npm Packages (devDependencies):**
  - `tailwindcss`, `postcss`, `autoprefixer` for the CSS build process.
  - `jest`, `babel-jest`, `@babel/core`, `@babel/preset-env` for the testing framework.
- **Google Fonts (Inter):** `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap`

## Tool Usage Patterns
- **File Editing:** `write_to_file` and `replace_in_file` for modifying HTML, CSS, and JavaScript.
- **Directory Management:** `mkdir` for creating project structure (e.g., `memory-bank/`).
- **Version Control:** `git` commands for repository initialization and management.
- **Browser Interaction:** `browser_action` for testing the UI and functionality.
