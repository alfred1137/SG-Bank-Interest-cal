import { findOptimalAllocation } from '../calculator.js';

describe('findOptimalAllocation with subset evaluation', () => {
    test('should ignore a less optimal account even if active to achieve a true maximum interest', () => {
        const totalFunds = 250000;
        // These are the conditions from the user's screenshots that produced the suboptimal result
        const uobCondition = 'spend_salary_giro'; // High tiers are 3.0% and 4.5%
        const scAccountStatus = 'active'; // SC is active
        const scConditions = ['salary_credit']; // SC rate is 1.55%
        const dbsCondition = 'income_1_cat_500_to_15000'; // DBS rate is 1.8%
        const cimbCondition = 'active'; // CIMB has a 1.78% tier

        const { allocation, totalMonthlyInterest } = findOptimalAllocation(
            totalFunds, uobCondition, scAccountStatus, scConditions, dbsCondition, cimbCondition
        );

        // The truly optimal allocation ignores the SC account because its 1.55% rate
        // is worse than using those funds in UOB's higher tiers and CIMB's second tier.
        // The expected allocation should match the user's higher-interest scenario.
        expect(allocation.SC).toBe(0);
        expect(allocation.UOB).toBe(150000);
        expect(allocation.DBS).toBe(50000);
        expect(allocation.CIMB).toBe(50000);

        // The total interest should match the higher value from the user's screenshot.
        expect(totalMonthlyInterest).toBeCloseTo(442.92, 2);
    });
});
