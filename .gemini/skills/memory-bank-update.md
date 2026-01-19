# Skill: Memory Bank Update

This skill defines the process for updating the Memory Bank. Maintaining an accurate and up-to-date Memory Bank is as important as writing the code itself. It is the only mechanism that ensures continuity and effective performance in future sessions.

## Core Principle

The Memory Bank must be a perfect reflection of the project's current state. Updates are not optional; they are a core part of the development workflow.

## Triggers for Update

An update to the Memory Bank is required in the following situations:

1.  **After Significant Implementation**: Any time a new feature is added, a major refactoring is completed, or a core part of the application is changed.
2.  **Discovery of New Patterns**: When a new architectural pattern, coding convention, or important insight is discovered, it must be documented.
3.  **Explicit User Request**: When the user issues a command like "**update memory bank**".
4.  **Before Submission**: As a final check before submitting the completed work, ensure the documentation reflects the changes.

## Update Workflow

1.  **Announce the Update**: Clearly state that you are beginning the process of updating the Memory Bank based on one of the triggers above.

2.  **Review ALL Core Files**: You must review every core file in the `memory-bank/` directory, even if you don't expect them all to change. This ensures no detail is missed. Start with the most dynamic files.
    -   `memory-bank/activeContext.md`
    -   `memory-bank/progress.md`
    -   `memory-bank/systemPatterns.md`
    -   `memory-bank/techContext.md`
    -   `memory-bank/productContext.md`
    -   `memory-bank/projectbrief.md`

3.  **Perform the Updates**:
    -   **`activeContext.md` & `progress.md`**: These are the most critical files to update.
        -   In `activeContext.md`, document the changes you just made and define the new "Next Steps".
        -   In `progress.md`, update the "What Works" section to include the new functionality and add any "Known Issues" if applicable.
    -   **Other Core Files**: Update other files if the changes impacted them.
        -   Did the architecture change? Update `systemPatterns.md`.
        -   Were new technologies or dependencies added? Update `techContext.md`.
        -   Did the product's scope or goals evolve? Update `productContext.md` and `projectbrief.md`.

4.  **Confirm Completion**: Announce that the Memory Bank update is complete and that it now accurately reflects the latest state of the project.
