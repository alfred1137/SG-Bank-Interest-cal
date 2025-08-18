# Singapore Bank Interest Rates Documentation

This file contains processed and documented information regarding Singapore bank interest rates, derived from the `script.js` reference material and provided image sources.

## Overview

This document outlines the interest rate calculation logic for various Singapore banks (UOB, Standard Chartered (SC), DBS, CIMB) as implemented in the `script.js` file. It focuses on the tiered interest rates and the conditions under which they apply for each bank. All rates are annualised.

## Key Findings

The `script.js` file implements distinct interest rate structures for each bank, with rates presented as annualized percentages:

*   **UOB One Account:** Four-tiered structure with revised rates effective from 1 Sep 2025, dependent on user conditions.
    *   `spend_only` (Meet Card Spend of min. S$500):
        *   Tier 1 (First S$75k): 0.65%
        *   Tier 2 (Next S$50k): 0.05%
        *   Tier 3 (Next S$25k): 0.05%
        *   Tier 4 (Above S$150k): 0.05%
    *   `spend_giro_debit` (Meet Card Spend of min. S$500 AND make 3 GIRO debit transactions):
        *   Tier 1 (First S$75k): 1.00%
        *   Tier 2 (Next S$50k): 2.00%
        *   Tier 3 (Next S$25k): 0.05%
        *   Tier 4 (Above S$150k): 0.05%
    *   `spend_salary_giro` (Meet Card Spend of min. S$500 AND credit salary):
        *   Tier 1 (First S$75k): 1.50%
        *   Tier 2 (Next S$50k): 3.00%
        *   Tier 3 (Next S$25k): 4.50%
        *   Tier 4 (Above S$150k): 0.05%

*   **UOB Stash Account:** Tiered structure with a base rate and a bonus rate for increasing the monthly average balance (MAB).
    *   Base Rate (if MAB is not increased): 0.05% on all balances.
    *   Bonus Rates (if MAB is increased):
        *   Tier 1 (First S$10k): 0.05%
        *   Tier 2 (Next S$30k): 1.60%
        *   Tier 3 (Next S$30k): 2.20%
        *   Tier 4 (Next S$30k): 3.00%
        *   Tier 5 (Above S$100k): 0.05%

*   **OCBC 360 Account:** Multi-component structure with a base rate and bonus rates based on qualifying activities. Balances above S$100,000 earn base interest (assumed 0.05% p.a.).
    *   Base Rate: 0.05% (Assumed).
    *   Bonus Rates (per qualifying activity):
        *   **Salary** (Credit salary of at least S$1,800):
            *   First S$75k: 1.20%
            *   Next S$25k: 2.40%
        *   **Save** (Increase average daily balance by at least S$500):
            *   First S$75k: 0.40%
            *   Next S$25k: 0.80%
        *   **Spend** (Charge at least S$500 to selected OCBC Credit Cards):
            *   First S$75k: 0.40%
            *   Next S$25k: 0.40%
        *   **Insure** (Purchase an eligible insurance product):
            *   First S$75k: 1.20%
            *   Next S$25k: 2.40%
        *   **Invest** (Purchase an eligible investment product):
            *   First S$75k: 1.20%
            *   Next S$25k: 2.40%
        *   **Grow** (Maintain average daily balance of at least S$250,000):
            *   First S$75k: 2.00%
            *   Next S$25k: 2.00%

*   **Standard Chartered (SC) BonusSaver:** Multi-tiered structure with a base rate and bonus rates based on qualifying activities.
    *   Base Rate: 0.05%.
    *   Bonus Rates (per qualifying activity):
        *   Salary Credit: 1.50% (credit salary of at least S$3,000 via GIRO, PayNow or FAST)
        *   Card Spend: 1.55% (card spends of at least S$1,000 or more)
        *   Insure: 2.50% (purchase an eligible Insurance Policy with minimum annual premium of S$2,000)
        *   Invest: 2.50% (invest in eligible Unit Trust or Online Equities of at least S$20,000)
    *   Effective Rates: Tier 1 (S$0-S$100k) is Base + sum of applicable Bonus Rates; Tier 2 (>S$100k) is Base only.

*   **DBS Multiplier:** Rates are tied to user engagement conditions (credit income + number of transacting categories: Credit Card/PayLah! Retail Spend, Home Loan Instalment, Insurance, Investments). Balances above the eligible cap earn base interest (0.05% p.a.).
    *   **Income + 1 category (First S$50,000 balance):**
        *   ≥ S$500 to < S$15,000: 1.80% p.a.
        *   ≥ S$15,000 to < S$30,000: 1.90% p.a.
        *   ≥ S$30,000: 2.20% p.a.
    *   **Income + 2 categories (First S$100,000 balance):**
        *   ≥ S$500 to < S$15,000: 2.10% p.a.
        *   ≥ S$15,000 to < S$30,000: 2.20% p.a.
        *   ≥ S$30,000: 3.00% p.a.
    *   **Income + ≥3 categories (First S$100,000 balance):**
        *   ≥ S$500 to < S$15,000: 2.40% p.a.
        *   ≥ S$15,000 to < S$30,000: 2.50% p.a.
        *   ≥ S$30,000: 4.10% p.a.

*   **CIMB FastSaver:** Fixed four-tiered structure, independent of external conditions. Rates effective from 5 August 2025 onwards.
    *   Tier 1 (S$0-S$25k): 0.88%.
    *   Tier 2 (S$25k-S$50k): 1.78%.
    *   Tier 3 (S$50k-S$75k): 2.50%.
    *   Tier 4 (>S$75k): 0.80%.

## Data Sources

*   `script.js`: This JavaScript file serves as the primary data source, containing all the functions and logic for calculating interest rates for UOB, Standard Chartered, DBS, and CIMB.
*   `memory-bank/interest-rates/11-CIMB-fastsaver-20250804.png`: Image reference for CIMB FastSaver rates as of 4 August 2025.
*   `memory-bank/interest-rates/12-CIMB-fastsaver-20250805.png`: Image reference for CIMB FastSaver rates as of 5 August 2025.
*   `memory-bank/interest-rates/21-DBS-Multiplier-20250804.png`: Image reference for DBS Multiplier rates as of 4 August 2025.
*   `memory-bank/interest-rates/31-SC-bonussaver-20250804.png`: Image reference for Standard Chartered BonusSaver rates as of 4 August 2025.
*   `memory-bank/interest-rates/41-UOB-One-20250901.png`: Image reference for UOB One rates as of 1 September 2025.
*   `memory-bank/interest-rates/42-UOB-Stash-20250805.png`: Image reference for UOB Stash rates as of 5 August 2025.
*   `memory-bank/interest-rates/51-OCBC-360-20250805.png`: Image reference for OCBC 360 rates as of 5 August 2025.

## Analysis and Insights

The interest rate structures vary significantly across banks, often incentivizing specific user behaviors (e.g., UOB, SC, DBS conditions). CIMB offers a consistent tiered rate without external conditions. The `script.js` also includes an `findOptimalAllocation` function, which uses a greedy algorithm to distribute funds across these bank accounts to maximize total monthly interest by prioritizing the highest marginal interest rate for each additional dollar.
