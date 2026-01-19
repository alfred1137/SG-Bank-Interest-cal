# Project Brief: SG Fund Allocation Optimizer

## 1. Core Objective

The primary goal of the SG Fund Allocation Optimizer is to provide a user-friendly, client-side web tool that calculates the optimal allocation of funds across various Singaporean bank accounts. The tool aims to maximize monthly interest earnings by navigating the complexities of tiered interest rates and conditional bonus criteria offered by different banks.

## 2. Key Features

-   **Total Funds Input**: Allow users to enter the total amount of funds they wish to allocate.
-   **Bank Account & Condition Selection**: Provide options for users to select which bank accounts they have and specify which conditions they meet (e.g., salary credit, card spend) to unlock bonus interest rates.
-   **Optimal Allocation Calculation**: Implement a robust algorithm that determines the most efficient distribution of funds to maximize interest returns.
-   **Detailed Results Display**:
    -   Show the calculated optimal allocation of funds for each selected bank.
    -   Provide a clear breakdown of the estimated monthly interest earned from each tier of each bank.
    -   Display the total estimated monthly interest.
    -   Calculate and display the equivalent annual interest rate based on the total funds.

## 3. Scope

-   **In-Scope**:
    -   Supported Banks: UOB (One and Stash), OCBC (360), Standard Chartered (Bonus$aver), DBS (Multiplier), CIMB (FastSaver).
    -   Client-side logic only; no backend or user data storage.
    -   Single-page web application.
    -   Core functionality is calculation and display of results.
-   **Out-of-Scope**:
    -   Financial advice or recommendations.
    -   User accounts or data persistence.
    -   Real-time interest rate updates (rates are hardcoded).
    -   Integration with bank APIs.

## 4. Target Audience

Individuals in Singapore who want to maximize the interest earned on their savings by strategically allocating funds across different high-yield savings accounts.

## 5. Success Metrics

-   **Accuracy**: The tool's calculations should be accurate based on the publicly available interest rate data.
-   **Usability**: The user interface should be intuitive and easy to use.
-   **Clarity**: The results should be presented in a clear and understandable manner.
-   **Performance**: The calculations should be performed quickly and efficiently in the browser.
