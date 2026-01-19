# Active Context: SG Fund Allocation Optimizer

## 1. Current Work Focus

The current primary focus is on establishing a robust and comprehensive **Memory Bank** for the project. This initiative is critical for ensuring long-term maintainability and efficient development, especially given the context of a memory-resetting AI engineer.

The immediate task is the creation and population of all core memory bank documents:
-   `projectbrief.md`
-   `productContext.md`
-   `systemPatterns.md`
-   `techContext.md`
-   `activeContext.md` (this file)
-   `progress.md`

## 2. Recent Changes

-   **Project Analysis**: The entire codebase (`.html`, `.js`, `.css`, `package.json`, `README.md`) has been reviewed to gain a foundational understanding of the project's purpose, architecture, and technology stack.
-   **Memory Bank Creation**: The `memory-bank` directory has been created.
-   **Initial Documentation**: The core memory bank files are being written based on the initial project analysis.

## 3. Next Steps

-   Complete the creation of all core memory bank files.
-   Create the `.gemini/skills` directory and associated markdown files to guide future AI interactions with the codebase and the memory bank.
-   Submit the initial memory bank and skills as the foundational documentation for the project.

## 4. Active Decisions & Considerations

-   **Decision**: The memory bank will be structured according to the specified hierarchical model, starting with the `projectbrief.md`.
-   **Consideration**: The level of detail in the memory bank files should be sufficient for an engineer with no prior context to understand the project quickly. The goal is clarity and conciseness.
-   **Decision**: A separate `.gemini/skills` directory will be created to store instructions for the AI, keeping the memory bank itself focused on project-specific information.

## 5. Key Learnings & Project Insights

-   **Simplicity is Key**: The project's strength lies in its simplicity. It's a vanilla HTML/CSS/JS application with no backend and minimal dependencies. This makes it easy to understand, maintain, and deploy.
-   **Core Logic is Sound**: The greedy algorithm in `allocation-engine.js` is an effective and efficient solution for the allocation problem.
-   **Data is Volatile**: The interest rate data in `calculator.js` is the most likely part of the codebase to become outdated. Future work will likely involve updating these rates. This highlights the importance of having this logic isolated in its own module.
