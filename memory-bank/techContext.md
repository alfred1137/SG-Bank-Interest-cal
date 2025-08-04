# Technical Context: Optimal Fund Allocation Minisite

## Technologies Used
- **HTML5:** For structuring the web content.
- **CSS3:** For styling, primarily using Tailwind CSS utility classes.
- **Tailwind CSS (CDN):** Used for rapid UI development and responsive design. The prototype uses the CDN version, which is suitable for a simple minisite but might be replaced by a local build process for more complex projects.
- **JavaScript (ES6+):** For all interactive logic, calculations, and DOM manipulation. No external JavaScript libraries or frameworks are used beyond what's included in the prototype.

## Development Setup
- **Editor:** VS Code (assumed, given the environment).
- **Browser:** Any modern web browser for testing.
- **Local Server:** A simple local HTTP server (e.g., `python -m http.server` or VS Code's Live Server extension) can be used to serve the `index.html` file during development.

## Technical Constraints
- **Client-Side Only:** All logic must run in the browser. No server-side processing or database interactions.
- **No Build Process (Currently):** The prototype relies on CDN for Tailwind CSS. For production, a build process (e.g., using npm and PostCSS) would be ideal to purge unused CSS and optimize the bundle size.
- **Browser Compatibility:** Should aim for compatibility with modern browsers (Chrome, Firefox, Edge, Safari).

## Dependencies
- **Tailwind CSS CDN:** `https://cdn.tailwindcss.com`
- **Google Fonts (Inter):** `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap`

## Tool Usage Patterns
- **File Editing:** `write_to_file` and `replace_in_file` for modifying HTML, CSS, and JavaScript.
- **Directory Management:** `mkdir` for creating project structure (e.g., `memory-bank/`).
- **Version Control:** `git` commands for repository initialization and management.
- **Browser Interaction:** `browser_action` for testing the UI and functionality.
