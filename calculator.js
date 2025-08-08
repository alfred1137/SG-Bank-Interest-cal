export function calculateUOBInterest(balance, uobCondition) {
    let totalMonthlyInterest = 0;
    let breakdown = {};
    let rates = {};

    switch (uobCondition) {
        case 'no_account':
            return { total: 0, breakdown: {} };
        case 'spend_only':
            rates = { t1: 0.0065, t2: 0.0005, t3: 0.0005, t4: 0.0005 };
            break;
        case 'spend_giro_debit':
            rates = { t1: 0.0100, t2: 0.0200, t3: 0.0005, t4: 0.0005 };
            break;
        case 'spend_salary_giro':
            rates = { t1: 0.0150, t2: 0.0300, t3: 0.0450, t4: 0.0005 };
            break;
    }

    if (balance > 150000) {
        let amountInTier = balance - 150000;
        let interest = amountInTier * (rates.t4 / 12);
        breakdown["Tier 4 (>S$150k)"] = { interest, rate: rates.t4 };
        totalMonthlyInterest += interest;
    }
    if (balance > 125000) {
        let amountInTier = Math.min(balance - 125000, 25000);
        let interest = amountInTier * (rates.t3 / 12);
        breakdown["Tier 3 (S$125k-S$150k)"] = { interest, rate: rates.t3 };
        totalMonthlyInterest += interest;
    }
    if (balance > 75000) {
        let amountInTier = Math.min(balance - 75000, 50000);
        let interest = amountInTier * (rates.t2 / 12);
        breakdown["Tier 2 (S$75k-S$125k)"] = { interest, rate: rates.t2 };
        totalMonthlyInterest += interest;
    }
    if (balance > 0) {
        let amountInTier = Math.min(balance, 75000);
        let interest = amountInTier * (rates.t1 / 12);
        breakdown["Tier 1 (S$0-S$75k)"] = { interest, rate: rates.t1 };
        totalMonthlyInterest += interest;
    }

    return { total: totalMonthlyInterest, breakdown };
}

export function calculateSCInterest(balance, scAccountStatus, scConditions) {
    if (scAccountStatus === 'no_account') {
        return { total: 0, breakdown: {} };
    }
    let totalMonthlyInterest = 0;
    let breakdown = {};
    const baseRate = 0.0005 / 12;
    let bonusRate = 0;

    if (scConditions.includes('salary_credit')) {
        bonusRate += 0.0150;
    }
    if (scConditions.includes('card_spend')) {
        bonusRate += 0.0155;
    }
    if (scConditions.includes('insure')) {
        bonusRate += 0.0250;
    }
    if (scConditions.includes('invest')) {
        bonusRate += 0.0250;
    }
    
    bonusRate /= 12;

    const annualBaseRate = 0.0005;
    const annualBonusRate = (bonusRate * 12);

    if (balance > 100000) {
        let amountInTier = balance - 100000;
        let interest = amountInTier * baseRate;
        breakdown["Tier 2 (>S$100k)"] = { interest, rate: annualBaseRate };
        totalMonthlyInterest += interest;
    }

    if (balance > 0) {
        let amountInTier = Math.min(balance, 100000);
        let interest = amountInTier * (baseRate + bonusRate);
        breakdown["Tier 1 (S$0-S$100k)"] = { interest, rate: annualBaseRate + annualBonusRate };
        totalMonthlyInterest += interest;
    }
    
    return { total: totalMonthlyInterest, breakdown };
}

export function calculateDBSInterest(balance, dbsCondition) {
    let totalMonthlyInterest = 0;
    let breakdown = {};
    let rate = 0;
    let cap = 0;

    // Determine rate and cap based on the condition
    switch (dbsCondition) {
        case 'no_account':                  return { total: 0, breakdown: {} };
        case 'income_1_cat_500_to_15000':    rate = 0.0180; cap = 50000; break;
        case 'income_1_cat_15000_to_30000':  rate = 0.0190; cap = 50000; break;
        case 'income_1_cat_30000_plus':      rate = 0.0220; cap = 50000; break;
        case 'income_2_cat_500_to_15000':    rate = 0.0210; cap = 100000; break;
        case 'income_2_cat_15000_to_30000':  rate = 0.0220; cap = 100000; break;
        case 'income_2_cat_30000_plus':      rate = 0.0300; cap = 100000; break;
        case 'income_3_cat_500_to_15000':    rate = 0.0240; cap = 100000; break;
        case 'income_3_cat_15000_to_30000':  rate = 0.0250; cap = 100000; break;
        case 'income_3_cat_30000_plus':      rate = 0.0410; cap = 100000; break;
        default:                            rate = 0.0000; cap = 0; break; // Fail requirement
    }

    // Calculate interest for the amount within the cap
    if (balance > 0) {
        const amountInTier = Math.min(balance, cap);
        const interest = amountInTier * (rate / 12);
        breakdown[`Tier 1 (S$0-S$${cap/1000}k)`] = { interest, rate };
        totalMonthlyInterest += interest;
    }
    
    // Calculate interest for the amount above the cap
    if (balance > cap) {
        const amountInTier = balance - cap;
        const baseRate = 0.0005;
        const interest = amountInTier * (baseRate / 12); // Base rate for balance > cap
        breakdown[`Tier 2 (>S$${cap/1000}k)`] = { interest, rate: baseRate };
        totalMonthlyInterest += interest;
    }

    return { total: totalMonthlyInterest, breakdown };
}

export function calculateCIMBInterest(balance, cimbCondition) {
    if (cimbCondition === 'no_account') {
        return { total: 0, breakdown: {} };
    }
    let totalMonthlyInterest = 0;
    let breakdown = {};
    const rates = {
        t1: 0.0088 / 12, // First S$25,000
        t2: 0.0178 / 12, // Next S$25,000
        t3: 0.0250 / 12, // Next S$25,000
        t4: 0.0080 / 12  // Above S$75,000
    };

    const annualRates = {
        t1: 0.0088, // First S$25,000
        t2: 0.0178, // Next S$25,000
        t3: 0.0250, // Next S$25,000
        t4: 0.0080  // Above S$75,000
    };

    if (balance > 75000) {
        let amountInTier = balance - 75000;
        let interest = amountInTier * rates.t4;
        breakdown["Tier 4 (>S$75k)"] = { interest, rate: annualRates.t4 };
        totalMonthlyInterest += interest;
    }
    if (balance > 50000) {
        let amountInTier = Math.min(balance - 50000, 25000);
        let interest = amountInTier * rates.t3;
        breakdown["Tier 3 (S$50k-S$75k)"] = { interest, rate: annualRates.t3 };
        totalMonthlyInterest += interest;
    }
    if (balance > 25000) {
        let amountInTier = Math.min(balance - 25000, 25000);
        let interest = amountInTier * rates.t2;
        breakdown["Tier 2 (S$25k-S$50k)"] = { interest, rate: annualRates.t2 };
        totalMonthlyInterest += interest;
    }
    if (balance > 0) {
        let amountInTier = Math.min(balance, 25000);
        let interest = amountInTier * rates.t1;
        breakdown["Tier 1 (S$0-S$25k)"] = { interest, rate: annualRates.t1 };
        totalMonthlyInterest += interest;
    }

    return { total: totalMonthlyInterest, breakdown };
}

// --- Tier-based segment definitions for each bank ---

function getUOBTierSegments(uobCondition) {
    if (uobCondition === 'no_account') return [];
    let rates = {};
    switch (uobCondition) {
        case 'spend_only': rates = { t1: 0.0065, t2: 0.0005, t3: 0.0005, t4: 0.0005 }; break;
        case 'spend_giro_debit': rates = { t1: 0.0100, t2: 0.0200, t3: 0.0005, t4: 0.0005 }; break;
        case 'spend_salary_giro': rates = { t1: 0.0150, t2: 0.0300, t3: 0.0450, t4: 0.0005 }; break;
    }
    return [
        { bank: 'UOB', amount: 75000, rate: rates.t1 },
        { bank: 'UOB', amount: 50000, rate: rates.t2 },
        { bank: 'UOB', amount: 25000, rate: rates.t3 },
        { bank: 'UOB', amount: Infinity, rate: rates.t4 }
    ];
}

function getSCTierSegments(scAccountStatus, scConditions) {
    if (scAccountStatus === 'no_account') return [];
    const baseRate = 0.0005;
    let bonusRate = 0;
    if (scConditions.includes('salary_credit')) bonusRate += 0.0150;
    if (scConditions.includes('card_spend')) bonusRate += 0.0155;
    if (scConditions.includes('insure')) bonusRate += 0.0250;
    if (scConditions.includes('invest')) bonusRate += 0.0250;
    return [
        { bank: 'SC', amount: 100000, rate: baseRate + bonusRate },
        { bank: 'SC', amount: Infinity, rate: baseRate }
    ];
}

function getDBSTierSegments(dbsCondition) {
    if (dbsCondition === 'no_account' || dbsCondition === 'fail_requirement') return [];
    let rate = 0, cap = 0;
    switch (dbsCondition) {
        case 'income_1_cat_500_to_15000':    rate = 0.0180; cap = 50000; break;
        case 'income_1_cat_15000_to_30000':  rate = 0.0190; cap = 50000; break;
        case 'income_1_cat_30000_plus':      rate = 0.0220; cap = 50000; break;
        case 'income_2_cat_500_to_15000':    rate = 0.0210; cap = 100000; break;
        case 'income_2_cat_15000_to_30000':  rate = 0.0220; cap = 100000; break;
        case 'income_2_cat_30000_plus':      rate = 0.0300; cap = 100000; break;
        case 'income_3_cat_500_to_15000':    rate = 0.0240; cap = 100000; break;
        case 'income_3_cat_15000_to_30000':  rate = 0.0250; cap = 100000; break;
        case 'income_3_cat_30000_plus':      rate = 0.0410; cap = 100000; break;
    }
    return [
        { bank: 'DBS', amount: cap, rate: rate },
        { bank: 'DBS', amount: Infinity, rate: 0.0005 }
    ];
}

function getCIMBTierSegments(cimbCondition) {
    if (cimbCondition === 'no_account') return [];
    const rates = { t1: 0.0088, t2: 0.0178, t3: 0.0250, t4: 0.0080 };
    return [
        { bank: 'CIMB', amount: 25000, rate: rates.t1 },
        { bank: 'CIMB', amount: 25000, rate: rates.t2 },
        { bank: 'CIMB', amount: 25000, rate: rates.t3 },
        { bank: 'CIMB', amount: Infinity, rate: rates.t4 }
    ];
}

export function findOptimalAllocation(totalFunds, uobCondition, scAccountStatus, scConditions, dbsCondition, cimbCondition) {
    let allocation = { "UOB": 0, "SC": 0, "DBS": 0, "CIMB": 0 };
    let remainingFunds = totalFunds;

    const uobTiers = getUOBTierSegments(uobCondition);
    const scTiers = getSCTierSegments(scAccountStatus, scConditions);
    const dbsTiers = getDBSTierSegments(dbsCondition);
    const cimbTiers = getCIMBTierSegments(cimbCondition);

    const tierPointers = { uob: 0, sc: 0, dbs: 0, cimb: 0 };

    while (remainingFunds > 0) {
        let bestOption = { bank: null, rate: -1, amount: 0 };

        // Find the best marginal rate from the current available tiers
        if (tierPointers.uob < uobTiers.length) {
            const tier = uobTiers[tierPointers.uob];
            if (tier.rate > bestOption.rate) bestOption = { bank: 'UOB', ...tier };
        }
        if (tierPointers.sc < scTiers.length) {
            const tier = scTiers[tierPointers.sc];
            if (tier.rate > bestOption.rate) bestOption = { bank: 'SC', ...tier };
        }
        if (tierPointers.dbs < dbsTiers.length) {
            const tier = dbsTiers[tierPointers.dbs];
            if (tier.rate > bestOption.rate) bestOption = { bank: 'DBS', ...tier };
        }
        if (tierPointers.cimb < cimbTiers.length) {
            const tier = cimbTiers[tierPointers.cimb];
            if (tier.rate > bestOption.rate) bestOption = { bank: 'CIMB', ...tier };
        }

        if (bestOption.bank === null || bestOption.rate === -1) {
            // No more tiers to allocate to, break the loop
            break;
        }

        const amountToAllocate = Math.min(remainingFunds, bestOption.amount);
        allocation[bestOption.bank] += amountToAllocate;
        remainingFunds -= amountToAllocate;

        // Move to the next tier for the chosen bank
        switch (bestOption.bank) {
            case 'UOB': tierPointers.uob++; break;
            case 'SC': tierPointers.sc++; break;
            case 'DBS': tierPointers.dbs++; break;
            case 'CIMB': tierPointers.cimb++; break;
        }
    }
    
    // If there are still funds left (e.g., all primary tiers are full), allocate to the first available fallback
    if (remainingFunds > 0) {
        allocation.UOB += remainingFunds;
    }

    // Calculate final interest and breakdown based on the optimal allocation
    const uobResult = calculateUOBInterest(allocation.UOB, uobCondition);
    const scResult = calculateSCInterest(allocation.SC, scAccountStatus, scConditions);
    const dbsResult = calculateDBSInterest(allocation.DBS, dbsCondition);
    const cimbResult = calculateCIMBInterest(allocation.CIMB, cimbCondition);

    const totalMonthlyInterest = uobResult.total + scResult.total + dbsResult.total + cimbResult.total;
    const breakdown = {
        "UOB": uobResult.breakdown,
        "SC": scResult.breakdown,
        "DBS": dbsResult.breakdown,
        "CIMB": cimbResult.breakdown
    };

    return { allocation, totalMonthlyInterest, breakdown };
}
