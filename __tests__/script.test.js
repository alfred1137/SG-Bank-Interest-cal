import {
    calculateUOBInterest,
    calculateSCInterest,
    calculateDBSInterest,
    calculateCIMBInterest,
    findOptimalAllocation,
} from '../calculator.js';

// Initial simple tests for individual bank calculations remain the same
describe('Interest Calculation Functions', () => {
    describe('calculateUOBInterest', () => {
        test('should calculate interest correctly for spend_salary_giro condition', () => {
            const { total } = calculateUOBInterest(100000, 'spend_salary_giro');
            expect(total).toBeCloseTo(156.25, 2);
        });
    });

    describe('calculateSCInterest', () => {
        test('should stack bonuses correctly', () => {
            const { total } = calculateSCInterest(100000, ['salary_credit', 'card_spend']);
            expect(total).toBeCloseTo(258.33, 2);
        });
    });

    describe('calculateDBSInterest', () => {
        test('should calculate interest for income_3_cat_30000_plus', () => {
            const { total } = calculateDBSInterest(100000, 'income_3_cat_30000_plus');
            expect(total).toBeCloseTo(341.67, 2);
        });
    });

    describe('calculateCIMBInterest', () => {
        test('should calculate interest for all tiers', () => {
            const { total } = calculateCIMBInterest(100000);
            expect(total).toBeCloseTo(124.17, 2);
        });
    });
});

// New, more accurate tests for the refactored findOptimalAllocation function
describe('findOptimalAllocation (Marginal Rate Logic)', () => {

    test('Bug Fix: Activating DBS should increase total interest', () => {
        const totalFunds = 250000;
        const uobCondition = 'spend_salary_giro';
        const scConditions = ['salary_credit'];

        // Calculation BEFORE DBS is active (rate is 0)
        const resultBefore = findOptimalAllocation(totalFunds, uobCondition, scConditions, 'default');
        
        // Calculation AFTER DBS is active (rate is 1.8%)
        const resultAfter = findOptimalAllocation(totalFunds, uobCondition, scConditions, 'income_1_cat_500_to_15000');

        // Key assertion: The total interest must be higher after activating a new interest-bearing account
        expect(resultAfter.totalMonthlyInterest).toBeGreaterThan(resultBefore.totalMonthlyInterest);

        // Also check the specific values to confirm the logic is sound
        expect(resultBefore.totalMonthlyInterest).toBeCloseTo(468.33, 2);
        expect(resultAfter.totalMonthlyInterest).toBeCloseTo(479.79, 2);
    });

    test('Scenario 1: High-yield accounts should be prioritized', () => {
        // With these conditions, UOB Tier 3 (4.5%) and DBS (4.1%) are the best.
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(150000, 'spend_salary_giro', [], 'income_3_cat_30000_plus');
        
        // Optimal allocation: 25k to UOB T3 (4.5%), 100k to DBS T1 (4.1%), 25k to UOB T2 (3.0%)
        expect(allocation.UOB).toBe(50000);
        expect(allocation.DBS).toBe(100000);
        expect(allocation.CIMB).toBe(0);
        expect(allocation.SC).toBe(0);
        expect(totalMonthlyInterest).toBeCloseTo(497.92, 2); // Interest from 25k@4.5% + 100k@4.1% + 25k@3.0%
    });

    test('Scenario 2: Funds spread across multiple high-to-mid tiers', () => {
        // Conditions where rates are more mixed
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(200000, 'spend_giro_debit', ['salary_credit', 'card_spend'], 'income_1_cat_500_to_15000');
        
        // Highest rates: SC (3.1%), CIMB T3 (2.5%), UOB T2 (2.0%), DBS (1.8%)
        expect(allocation.SC).toBe(100000);
        expect(allocation.CIMB).toBe(25000);
        expect(allocation.UOB).toBe(50000);
        expect(allocation.DBS).toBe(25000);
        expect(totalMonthlyInterest).toBeCloseTo(431.25, 2);
    });

    test('Scenario 3: High funds, all accounts get allocation including fallbacks', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(500000, 'spend_salary_giro', ['salary_credit'], 'income_3_cat_30000_plus');
        
        // Check that total funds are allocated
        expect(allocation.UOB + allocation.SC + allocation.DBS + allocation.CIMB).toBe(500000);

        // Check allocation based on descending marginal rates
        expect(allocation.UOB).toBe(150000);
        expect(allocation.DBS).toBe(100000);
        expect(allocation.CIMB).toBe(150000);
        expect(allocation.SC).toBe(100000);

        expect(totalMonthlyInterest).toBeCloseTo(940.83, 2);
    });
});
