# Tech Context: SG Fund Allocation Optimizer

## 1. Core Technologies

-   **HTML5**: Used for the structure and content of the web page (`index.html`).
-   **CSS (via Tailwind CSS)**: The primary styling is done using the Tailwind CSS utility-first framework. The final CSS is compiled into a single `style.css` file.
-   **JavaScript (ES6+)**: All application logic is written in modern JavaScript. Key features used include ES Modules (`import`/`export`) to structure the code. No external JavaScript frameworks (like React, Vue, or Angular) are used.
-   **Node.js**: Serves as the runtime environment for all development-related tasks, including dependency management, running the local server, building CSS, and executing tests.

## 2. Development Setup & Workflow

### a. Prerequisites

-   A Node.js and npm (or equivalent) installation is required.

### b. Installation

-   To set up the development environment, clone the repository and run the following command in the root directory to install all necessary development dependencies:
    ```bash
    npm install
    ```

### c. Running the Application Locally

-   A simple HTTP server is used for local development. To start it, run:
    ```bash
    npm start
    ```
    This will serve the `index.html` file, typically at `http://localhost:8080`.

### d. Building CSS

-   The project uses Tailwind CSS for styling. The source CSS file is located at `src/input.css`. To compile the Tailwind utilities into the final `style.css` file used by the application, run:
    ```bash
    npm run build
    ```
    This command must be run whenever changes are made to the HTML that involve new Tailwind classes or if `tailwind.config.js` is modified.

### e. Testing

-   Unit tests are written using the **Jest** framework.
-   Test files are located in the `__tests__` directory.
-   Babel (`@babel/preset-env`) is used to transpile ES6 modules within the test environment, allowing `import`/`export` syntax to be used in test files.
-   To run all tests, use the command:
    ```bash
    npm test
    ```

## 3. Dependencies

All dependencies are for development purposes only; the final application has no runtime dependencies.

-   **`jest`**: The testing framework.
-   **`babel`**: Transpiles JavaScript for the test runner.
-   **`tailwindcss`, `postcss`, `autoprefixer`**: For the CSS build process.
-   **`http-server`**: For the local development server.

## 4. Technical Constraints & Decisions

-   **No Backend**: The decision to keep the application purely client-side simplifies development and deployment significantly. It means no databases, no server-side code, and no APIs are necessary.
-   **No JS Frameworks**: The project intentionally avoids frameworks like React or Vue. This keeps the project lightweight and free of external runtime dependencies, but means all DOM manipulation must be handled manually.
-   **Static Deployment**: The application is designed to be hosted on any static site hosting service, like GitHub Pages. This is a direct benefit of the "No Backend" constraint.
