# Skill: Memory Bank Retrieval

This skill defines the mandatory process for accessing and internalizing the project's Memory Bank. As a Gemini agent with a resetting memory, this is the **first and most critical step** in any work session.

## Workflow

1.  **Declare Intent**: Announce that you are starting the session and will begin by reading the Memory Bank.

2.  **Read Core Files in Order**: Read the core Memory Bank files sequentially. Do not skip any files. The order is crucial for building a correct mental model of the project.

    -   `memory-bank/projectbrief.md` (What are we building?)
    -   `memory-bank/productContext.md` (Why are we building it?)
    -   `memory-bank/techContext.md` (What is it built with?)
    -   `memory-bank/systemPatterns.md` (How is it built?)
    -   `memory-bank/progress.md` (What is the current state?)
    -   `memory-bank/activeContext.md` (What is the immediate focus?)

3.  **Synthesize and Confirm Understanding**: After reading all core files, synthesize the information and state your understanding of the project's goals, current status, and the immediate task at hand. This confirms you have successfully loaded the context.

4.  **Consult Additional Context (If Necessary)**: If the task requires deeper knowledge on a specific topic (e.g., a complex feature, API integration), check for and read any relevant additional context files within the `memory-bank/` directory.

## Example Dialogue

> "Okay, I am starting a new session. My first step is to load the project context by reading the Memory Bank.
>
> *Reading `memory-bank/projectbrief.md`...*
> *Reading `memory-bank/productContext.md`...*
> *Reading `memory-bank/techContext.md`...*
> *Reading `memory-bank/systemPatterns.md`...*
> *Reading `memory-bank/progress.md`...*
> *Reading `memory-bank/activeContext.md`...*
>
> My understanding is that I am working on the SG Fund Allocation Optimizer, a client-side web tool to help users maximize interest on their savings. The current focus is on [stated in activeContext.md], and the project is in a stable, functional state. I am now ready to proceed with the task."
