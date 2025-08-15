import { getUOBTierSegments, getSCTierSegments, getDBSTierSegments, getCIMBTierSegments } from '../calculator.js';
import { findOptimalAllocationAndInterest } from '../allocation-engine.js';

describe('Integration Test for Allocation Engine', () => {

    test('Scenario 1: High-yield accounts should be prioritized', () => {
        const totalFunds = 150000;
        const allTiers = [
            ...getUOBTierSegments('spend_salary_giro'),
            ...getDBSTierSegments('income_3_cat_30000_plus')
        ];
        
        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(totalFunds, allTiers);
        
        // Optimal: 25k to UOB (4.5%), 100k to DBS (4.1%), 25k to UOB (3.0%)
        expect(allocation.DBS).toBe(100000);
        expect(allocation.UOB).toBe(50000);
        expect(totalMonthlyInterest).toBeCloseTo(497.92, 2); 
    });

    test('Scenario 2: Funds spread across multiple banks', () => {
        const totalFunds = 200000;
        const allTiers = [
            ...getUOBTierSegments('spend_giro_debit'),
            ...getSCTierSegments('active', ['salary_credit', 'card_spend']),
            ...getDBSTierSegments('income_2_cat_30000_plus'),
            ...getCIMBTierSegments('active')
        ];

        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(totalFunds, allTiers);
        
        // SC rate is 3.1%, DBS is 3.0%
        expect(allocation.SC).toBe(100000);
        expect(allocation.DBS).toBe(100000);
        expect(totalMonthlyInterest).toBeCloseTo(508.33, 2);
    });

    test('Scenario 3: High funds, all accounts get some allocation', () => {
        const totalFunds = 500000;
        const allTiers = [
            ...getUOBTierSegments('spend_salary_giro'),
            ...getSCTierSegments('active', ['salary_credit']),
            ...getDBSTierSegments('income_3_cat_30000_plus'),
            ...getCIMBTierSegments('active')
        ];

        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(totalFunds, allTiers);
        
        const allocatedTotal = Object.values(allocation).reduce((sum, val) => sum + val, 0);
        expect(allocatedTotal).toBe(totalFunds);

        expect(allocation.UOB).toBe(150000);
        expect(allocation.DBS).toBe(100000);
        expect(allocation.SC).toBe(100000);
        expect(allocation.CIMB).toBe(150000);

        expect(totalMonthlyInterest).toBeCloseTo(940.83, 2);
    });

    test('Scenario 4: $200k allocation with complex interaction', () => {
        const totalFunds = 200000;
        const allTiers = [
            ...getUOBTierSegments('spend_salary_giro'),
            ...getSCTierSegments('active', ['salary_credit', 'card_spend']),
            ...getDBSTierSegments('income_3_cat_30000_plus'),
            ...getCIMBTierSegments('active')
        ];

        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(totalFunds, allTiers);

        // Optimal: 25k to UOB (4.5%), 100k to DBS (4.1%), 75k to SC (3.1%)
        expect(allocation.DBS).toBe(100000);
        expect(allocation.UOB).toBe(25000);
        expect(allocation.SC).toBe(75000);
        expect(allocation.CIMB).toBeUndefined();

        expect(totalMonthlyInterest).toBeCloseTo(629.17, 2);
    });
});
