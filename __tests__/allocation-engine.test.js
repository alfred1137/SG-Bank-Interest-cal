import { findOptimalAllocationAndInterest } from '../src/logic/allocation-engine.js';

describe('Allocation Engine', () => {
    const mockTiers = [
        // Bank A
        { bank: 'A', capacity: 10000, rate: 0.05 },
        { bank: 'A', capacity: 20000, rate: 0.03 },
        { bank: 'A', capacity: Infinity, rate: 0.01 },
        // Bank B
        { bank: 'B', capacity: 15000, rate: 0.04 },
        { bank: 'B', capacity: Infinity, rate: 0.02 },
        // Bank C
        { bank: 'C', capacity: 5000, rate: 0.06 },
    ];

    it('should allocate funds and calculate interest correctly', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(20000, mockTiers);
        expect(allocation).toEqual({ 'C': 5000, 'A': 10000, 'B': 5000 });
        expect(totalMonthlyInterest).toBeCloseTo(83.33, 2);
    });

    it('should handle total funds exceeding the capacity of all but the infinity tiers', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(100000, mockTiers);
        expect(allocation).toEqual({ 'C': 5000, 'A': 30000, 'B': 65000 });
        expect(totalMonthlyInterest).toBeCloseTo(250.00, 2);
    });

    it('should return a consistent breakdown object when funds exceed all capacities', () => {
        const finiteTiers = [
            { bank: 'A', capacity: 10000, rate: 0.05 },
            { bank: 'B', capacity: 10000, rate: 0.04 }
        ];
        const { breakdown } = findOptimalAllocationAndInterest(30000, finiteTiers);
        // Remaining 10000 should be in "B" (last bank), not "B Account"
        expect(Object.keys(breakdown)).toContain('B');
        expect(Object.keys(breakdown)).not.toContain('B Account');
    });

    it('should return an empty object if total funds are zero', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(0, mockTiers);
        expect(allocation).toEqual({});
        expect(totalMonthlyInterest).toBe(0);
    });
});
