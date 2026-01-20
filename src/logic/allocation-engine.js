export function findOptimalAllocationAndInterest(totalFunds, allTiers) {
    const allocation = {};
    const breakdown = {};
    let totalMonthlyInterest = 0;
    let remainingFunds = totalFunds;

    // Sort all tiers from all banks by the highest marginal rate
    const sortedTiers = allTiers.sort((a, b) => b.rate - a.rate);

    // Allocate funds iteratively and calculate interest simultaneously
    for (const tier of sortedTiers) {
        if (remainingFunds <= 0) break;

        const amountToAllocate = Math.min(remainingFunds, tier.capacity);
        
        // Update total allocation for the bank
        if (!allocation[tier.bank]) {
            allocation[tier.bank] = 0;
        }
        allocation[tier.bank] += amountToAllocate;

        // Calculate and add interest for this specific tier
        const interestForTier = amountToAllocate * (tier.rate / 12);
        totalMonthlyInterest += interestForTier;

        // Update breakdown
        if (!breakdown[tier.bank]) {
            breakdown[tier.bank] = {};
        }
        const tierName = `Tier (${(tier.rate * 100).toFixed(2)}%)`;
        if (!breakdown[tier.bank][tierName]) {
            breakdown[tier.bank][tierName] = { interest: 0, rate: tier.rate };
        }
        breakdown[tier.bank][tierName].interest += interestForTier;
        
        remainingFunds -= amountToAllocate;
    }

    // Handle any remaining funds in the last (likely infinite capacity) tier
    if (remainingFunds > 0) {
        const lastTier = sortedTiers.find(t => t.capacity === Infinity && t.rate > 0) || sortedTiers[sortedTiers.length - 1];
        if (lastTier) {
            const lastBank = lastTier.bank;
            allocation[lastBank] += remainingFunds;
            const interestForTier = remainingFunds * (lastTier.rate / 12);
            totalMonthlyInterest += interestForTier;

            const bankBreakdownName = `${lastBank} Account`;
            if (!breakdown[bankBreakdownName]) {
                breakdown[bankBreakdownName] = {};
            }
            const tierName = `Tier (${(lastTier.rate * 100).toFixed(2)}%)`;
             if (!breakdown[bankBreakdownName][tierName]) {
                breakdown[bankBreakdownName][tierName] = { interest: 0, rate: lastTier.rate };
            }
            breakdown[bankBreakdownName][tierName].interest += interestForTier;
        }
    }

    return { allocation, totalMonthlyInterest, breakdown };
}
