import {
    calculateUOBInterest,
    calculateSCInterest,
    calculateDBSInterest,
    calculateCIMBInterest,
    findOptimalAllocation,
} from '../calculator.js';

describe('Interest Calculation Functions', () => {
    describe('calculateUOBInterest', () => {
        test('should calculate interest correctly for spend_only condition', () => {
            const { total } = calculateUOBInterest(100000, 'spend_only');
            expect(total).toBeCloseTo(41.67, 2);
        });

        test('should calculate interest correctly for spend_giro_debit condition', () => {
            const { total } = calculateUOBInterest(100000, 'spend_giro_debit');
            expect(total).toBeCloseTo(104.17, 2);
        });

        test('should calculate interest correctly for spend_salary_giro condition', () => {
            const { total } = calculateUOBInterest(100000, 'spend_salary_giro');
            expect(total).toBeCloseTo(156.25, 2);
        });

        test('should handle balance over 150k', () => {
            const { total } = calculateUOBInterest(200000, 'spend_salary_giro');
            expect(total).toBeCloseTo(314.58, 2);
        });
    });

    describe('calculateSCInterest', () => {
        test('should calculate base interest with no conditions', () => {
            const { total } = calculateSCInterest(100000, []);
            expect(total).toBeCloseTo(4.17, 2);
        });

        test('should add bonus for salary_credit', () => {
            const { total } = calculateSCInterest(100000, ['salary_credit']);
            expect(total).toBeCloseTo(129.17, 2);
        });

        test('should add bonus for card_spend', () => {
            const { total } = calculateSCInterest(100000, ['card_spend']);
            expect(total).toBeCloseTo(133.33, 2);
        });

        test('should add bonus for insure', () => {
            const { total } = calculateSCInterest(100000, ['insure']);
            expect(total).toBeCloseTo(212.5, 2);
        });

        test('should add bonus for invest', () => {
            const { total } = calculateSCInterest(100000, ['invest']);
            expect(total).toBeCloseTo(212.5, 2);
        });

        test('should stack bonuses correctly', () => {
            const { total } = calculateSCInterest(100000, ['salary_credit', 'card_spend']);
            expect(total).toBeCloseTo(258.33, 2);
        });

        test('should handle balance over 100k', () => {
            const { total } = calculateSCInterest(150000, ['salary_credit', 'card_spend']);
            expect(total).toBeCloseTo(260.42, 2);
        });
    });

    describe('calculateDBSInterest', () => {
        test('should calculate interest for income_1_cat_500_to_15000', () => {
            const { total } = calculateDBSInterest(50000, 'income_1_cat_500_to_15000');
            expect(total).toBeCloseTo(75, 2);
        });

        test('should calculate interest for income_3_cat_30000_plus', () => {
            const { total } = calculateDBSInterest(100000, 'income_3_cat_30000_plus');
            expect(total).toBeCloseTo(341.67, 2);
        });

        test('should handle balance over cap', () => {
            const { total } = calculateDBSInterest(150000, 'income_3_cat_30000_plus');
            expect(total).toBeCloseTo(343.75, 2);
        });
    });

    describe('calculateCIMBInterest', () => {
        test('should calculate interest for first tier', () => {
            const { total } = calculateCIMBInterest(25000);
            expect(total).toBeCloseTo(18.33, 2);
        });

        test('should calculate interest for all tiers', () => {
            const { total } = calculateCIMBInterest(100000);
            expect(total).toBeCloseTo(124.17, 2);
        });
    });
});

describe('findOptimalAllocation', () => {
    test('should allocate all funds to the best option if it can take it all', () => {
        const { allocation } = findOptimalAllocation(100000, 'spend_salary_giro', [], 'income_1_cat_500_to_15000');
        expect(allocation.UOB).toBe(100000);
        expect(allocation.SC).toBe(0);
        expect(allocation.DBS).toBe(0);
        expect(allocation.CIMB).toBe(0);
    });

    test('should split funds between best options', () => {
        const { allocation } = findOptimalAllocation(200000, 'spend_salary_giro', ['salary_credit', 'card_spend'], 'income_3_cat_30000_plus');
        // DBS and SC have the highest effective rates
        expect(allocation.DBS).toBe(100000);
        expect(allocation.SC).toBe(100000);
        expect(allocation.UOB).toBe(0);
    });

    test('should allocate remaining funds to best fallback', () => {
        const { allocation } = findOptimalAllocation(500000, 'spend_salary_giro', ['salary_credit', 'card_spend'], 'income_3_cat_30000_plus');
        expect(allocation.UOB + allocation.SC + allocation.DBS + allocation.CIMB).toBe(500000);
        expect(allocation.CIMB).toBeGreaterThan(75000); // CIMB is the fallback
    });
});

describe('Comprehensive Optimal Allocation Tests', () => {
    test('Scenario 1: Low funds, best option takes all', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(50000, 'spend_salary_giro', [], 'income_3_cat_30000_plus');
        expect(allocation.DBS).toBe(50000);
        expect(allocation.UOB).toBe(0);
        expect(allocation.SC).toBe(0);
        expect(allocation.CIMB).toBe(0);
        expect(totalMonthlyInterest).toBeCloseTo(170.83, 2);
    });

    test('Scenario 2: Mid funds, split between top 2 banks', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(150000, 'spend_salary_giro', ['salary_credit', 'card_spend'], 'income_3_cat_30000_plus');
        expect(allocation.DBS).toBe(100000);
        expect(allocation.SC).toBe(50000);
        expect(allocation.UOB).toBe(0);
        expect(allocation.CIMB).toBe(0);
        expect(totalMonthlyInterest).toBeCloseTo(470.83, 2);
    });

    test('Scenario 3: High funds, testing fallback mechanism', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(500000, 'spend_only', [], 'income_1_cat_500_to_15000');
        expect(allocation.DBS).toBe(50000);
        expect(allocation.UOB).toBe(150000);
        expect(allocation.SC).toBe(100000);
        expect(allocation.CIMB).toBe(200000); // 75k bonus cap + 125k fallback
        expect(totalMonthlyInterest).toBeCloseTo(313.75, 2);
    });

    test('Scenario 4: Different conditions changing the allocation order', () => {
        // Here, SC with full bonus should be better than UOB with mid-tier bonus
        const { allocation, totalMonthlyInterest } = findOptimalAllocation(200000, 'spend_giro_debit', ['salary_credit', 'card_spend', 'invest'], 'income_1_cat_500_to_15000');
        expect(allocation.SC).toBe(100000);
        expect(allocation.DBS).toBe(50000);
        expect(allocation.CIMB).toBe(50000);
        expect(allocation.UOB).toBe(0);
        expect(totalMonthlyInterest).toBeCloseTo(597.08, 2);
    });
});
