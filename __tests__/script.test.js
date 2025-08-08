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
            const { total } = calculateSCInterest(100000, 'active', ['salary_credit', 'card_spend']);
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
describe('findOptimalAllocation (Correct Tiered Logic)', () => {

    test('Scenario 1: High-yield accounts should be prioritized', () => {
        // Conditions: DBS is best (4.1%), then UOB (1.5% -> 3.0% -> 4.5%).
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(150000, 'spend_salary_giro', 'no_account', [], 'income_3_cat_30000_plus', 'no_account');
        
        // Optimal: 100k to DBS T1 (4.1%), then 50k to UOB T1 (1.5%)
        expect(allocation.DBS).toBe(100000);
        expect(allocation.UOB).toBe(50000);
        expect(allocation.CIMB).toBe(0);
        expect(allocation.SC).toBe(0);
        // Correct interest: 100k@4.1% + 50k@1.5%
        expect(totalMonthlyInterest).toBeCloseTo(404.17, 2); 
    });

    test('Scenario 2: Funds spread across multiple banks', () => {
        // Conditions with a mix of good rates
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(200000, 'spend_giro_debit', 'active', ['salary_credit', 'card_spend'], 'income_2_cat_30000_plus', 'active');
        
        // Highest marginal rates: SC (3.05%), DBS (3.0%), CIMB T3 (2.5%), UOB T1 (1.0%)
        // Allocation order: SC (100k@3.05%), DBS (100k@3.0%)
        expect(allocation.SC).toBe(100000);
        expect(allocation.DBS).toBe(100000);
        expect(allocation.UOB).toBe(0);
        expect(allocation.CIMB).toBe(0);
        expect(totalMonthlyInterest).toBeCloseTo(508.33, 2);
    });

    test('Scenario 3: High funds, all accounts get some allocation', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(500000, 'spend_salary_giro', 'active', ['salary_credit'], 'income_3_cat_30000_plus', 'active');
        
        // Check that total funds are allocated
        expect(allocation.UOB + allocation.SC + allocation.DBS + allocation.CIMB).toBe(500000);

        // Check allocation based on correct descending marginal rates
        expect(allocation.UOB).toBe(150000); // Fills up UOB's high tiers first
        expect(allocation.DBS).toBe(100000); // Then DBS's high tier
        expect(allocation.SC).toBe(100000);  // Then SC's high tier
        expect(allocation.CIMB).toBe(150000); // Remainder goes to CIMB and its tiers

        expect(totalMonthlyInterest).toBeCloseTo(940.83, 2);
    });

    test('Scenario 4: $200k allocation with complex interaction', () => {
        const totalFunds = 200000;
        const uobCondition = 'spend_salary_giro'; // UOB: 1.5% -> 3.0% -> 4.5%
        const scAccountStatus = 'active';
        const scConditions = ['salary_credit', 'card_spend']; // SC: 3.05%
        const dbsCondition = 'income_3_cat_30000_plus'; // DBS: 4.1%
        const cimbCondition = 'active'; // CIMB: 0.88% -> 1.78% -> 2.5%

        const { allocation, totalMonthlyInterest } = findOptimalAllocation(
            totalFunds, uobCondition, scAccountStatus, scConditions, dbsCondition, cimbCondition
        );

        // Expected allocation order based on true marginal rates:
        // 1. DBS Tier 1: 100k @ 4.1%
        // 2. SC Tier 1: 100k @ 3.05%
        expect(allocation.DBS).toBe(100000);
        expect(allocation.SC).toBe(100000);
        expect(allocation.UOB).toBe(0);
        expect(allocation.CIMB).toBe(0);

        const expectedDBS = calculateDBSInterest(100000, dbsCondition).total;
        const expectedSC = calculateSCInterest(100000, scAccountStatus, scConditions).total;
        const expectedTotal = expectedDBS + expectedSC;

        expect(totalMonthlyInterest).toBeCloseTo(expectedTotal, 2);
        expect(totalMonthlyInterest).toBeCloseTo(600.00, 2);
    });
});
