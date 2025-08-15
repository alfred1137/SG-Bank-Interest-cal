import { findOptimalAllocationAndInterest } from '../allocation-engine.js';

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

    it('should return an empty object if total funds are zero', () => {
        const { allocation, totalMonthlyInterest } = findOptimalAllocationAndInterest(0, mockTiers);
        expect(allocation).toEqual({});
        expect(totalMonthlyInterest).toBe(0);
    });
});
