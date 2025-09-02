# Active Context: Optimal Fund Allocation Minisite

## Current Work Focus

The project is now in **Phase 7: Add Legal Disclaimers**. The primary objective is to integrate clear, prominent disclaimers into the application to protect both the user and the developer.

## Recent Changes

- **Documentation Update Cycle: 2025-09-02**
  - Reviewed all memory bank files and updated them to reflect the completion of Phases 1-6.
  - Defined the scope and implementation plan for Phase 7 based on user requirements.

## Next Steps

The following is the detailed execution plan for **Phase 7: Add Legal Disclaimers**:

### 1. Define Disclaimer Content

-   **Concise Disclaimer Text:** "Disclaimer: These calculations are for informational purposes only and do not constitute financial advice. Please consult with a financial professional."
-   **Full Disclaimer Text (for Modal and README):**
    -   **Not Financial Advice:** The information provided by this tool is for general informational purposes only and does not constitute financial, investment, legal, or tax advice.
    -   **Accuracy of Information:** While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the interest rates and bank conditions presented.
    -   **Hypothetical Results:** The calculations are based on publicly available data and assume certain conditions. Actual interest earned may vary.
    -   **Use at Your Own Risk:** Any reliance you place on such information is therefore strictly at your own risk.
    -   **No Liability:** In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising out of, or in connection with, the use of this tool.
    -   **Consult a Professional:** You should consult with a qualified financial professional before making any financial decisions.

### 2. Update `README.md`

1.  **Action:** Use `replace_in_file`.
2.  **Details:** Add a new "## Disclaimer" section at the very top of the `README.md` file.
3.  **Content:** Insert the full disclaimer text into this new section.

### 3. Implement UI Elements in `index.html`

1.  **Concise Disclaimer Link:**
    -   **Action:** Add a `div` with an `id` of `disclaimer-link-concise` directly below the `results-container` div.
    -   **Content:** The div will contain an `a` tag with the concise disclaimer text, styled with an underline. This link will trigger the modal.

2.  **Footer:**
    -   **Action:** Add a `<footer>` element at the bottom of the `<body>`.
    -   **Content:** The footer will contain a link with the text "Disclaimer | Legal | Terms" and an `id` of `disclaimer-link-footer`. This link will also trigger the modal.

3.  **Modal Structure:**
    -   **Action:** Add the HTML for the modal component inside the `<body>`, likely before the closing tag. It should have an `id` of `disclaimer-modal` and be hidden by default using the Tailwind `hidden` class.
    -   **Structure:**
        -   An outer `div` for the semi-transparent overlay.
        -   An inner `div` for the modal content panel.
        -   A `h2` for the modal title ("Disclaimer").
        -   A `div` or `p` tags for the full disclaimer text.
        -   A `button` with an `id` of `close-modal-btn` to close the modal.

### 4. Implement Functionality in `script.js`

1.  **DOM Element Selection:**
    -   Get references to the modal (`disclaimer-modal`), the two opening links (`disclaimer-link-concise`, `disclaimer-link-footer`), and the close button (`close-modal-btn`).

2.  **Event Handlers:**
    -   Create two functions: `openModal()` and `closeModal()`.
        -   `openModal()` will remove the `hidden` class from the modal element.
        -   `closeModal()` will add the `hidden` class to the modal element.
    -   Attach `click` event listeners to both opening links. The listener's callback will call `openModal()` and `event.preventDefault()`.
    -   Attach a `click` event listener to the close button to call `closeModal()`.
    -   Attach a `click` event listener to the modal overlay to also call `closeModal()`, allowing users to click outside the panel to close it.

### 5. Apply Styling

1.  **Action:** Add Tailwind CSS classes directly to the new HTML elements in `index.html`.
2.  **Styling Details:**
    -   **Links:** `text-sm`, `text-gray-500`, `underline`, `cursor-pointer`.
    -   **Footer:** `text-center`, `py-4`, `mt-8`, `border-t`.
    -   **Modal Overlay:** `fixed`, `inset-0`, `bg-black`, `bg-opacity-50`, `flex`, `items-center`, `justify-center`.
    -   **Modal Panel:** `bg-white`, `p-6`, `rounded-lg`, `shadow-xl`, `max-w-2xl`, `mx-auto`.
    -   **Close Button:** Positioned at the top-right of the modal panel, styled for clear visibility and interaction.

## Active Decisions and Considerations

- The project will be deployed as a static site on GitHub Pages.
- The current structure with `index.html`, `style.css`, and `script.js` in the repository root is suitable for direct deployment.
- The optimal allocation algorithm and interest calculation logic from the prototype will be preserved as the core functionality.

## Important Patterns and Preferences

- Use of Markdown for all memory bank documentation.
- Clear separation of concerns in the project structure (repository root for source code, `memory-bank/` for documentation).

## Learnings and Project Insights

- **Jest/Babel Setup:** A standard pattern for testing modern JavaScript (ES Modules) involves installing `jest`, `@babel/core`, `@babel/preset-env`, and `babel-jest`, and creating a `babel.config.js` to transpile the code. This is a reusable setup for future projects.
- **Debugging Complex Logic:** When a test for a complex calculation fails, the error may lie in the test's *expectation* rather than the code itself. It's crucial to manually trace the code's execution with the test's inputs to verify the expected output before assuming the implementation is faulty.
- **Code Separation for Testability:** Separating pure logic (like in `calculator.js`) from DOM manipulation code (in `script.js`) is a key pattern for making code easier to test.
- The prototype provides a solid foundation for the core calculation logic.
- The project now uses a local Node.js build process for Tailwind CSS.
- Encountered issues with the default `npx` command, requiring the use of a specific portable Node.js path. A global `.clinerule` (`node-js-execution.md`) was created to address this for future tasks.
