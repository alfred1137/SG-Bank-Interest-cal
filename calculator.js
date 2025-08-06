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

export function findOptimalAllocation(totalFunds, uobCondition, scAccountStatus, scConditions, dbsCondition, cimbCondition) {
    const segments = [];

    // 1. Extract Interest Segments from Each Bank
    // UOB Segments
    if (uobCondition === 'no_account') {
        segments.push({ bank: 'UOB', tierName: 'No Account', minBalance: 0, maxBalance: Infinity, amount: Infinity, rate: 0, currentAllocation: 0 });
    } else {
        let uobRates = {};
        switch (uobCondition) {
            case 'spend_only': uobRates = { t1: 0.0065, t2: 0.0005, t3: 0.0005, t4: 0.0005 }; break;
            case 'spend_giro_debit': uobRates = { t1: 0.0100, t2: 0.0200, t3: 0.0005, t4: 0.0005 }; break;
            case 'spend_salary_giro': uobRates = { t1: 0.0150, t2: 0.0300, t3: 0.0450, t4: 0.0005 }; break;
        }
        segments.push({ bank: 'UOB', tierName: 'Tier 1 (S$0-S$75k)', minBalance: 0, maxBalance: 75000, amount: 75000, rate: uobRates.t1, currentAllocation: 0 });
        segments.push({ bank: 'UOB', tierName: 'Tier 2 (S$75k-S$125k)', minBalance: 75000, maxBalance: 125000, amount: 50000, rate: uobRates.t2, currentAllocation: 0 });
        segments.push({ bank: 'UOB', tierName: 'Tier 3 (S$125k-S$150k)', minBalance: 125000, maxBalance: 150000, amount: 25000, rate: uobRates.t3, currentAllocation: 0 });
        segments.push({ bank: 'UOB', tierName: 'Tier 4 (>S$150k)', minBalance: 150000, maxBalance: Infinity, amount: Infinity, rate: uobRates.t4, currentAllocation: 0 });
    }

    // SC Segments
    if (scAccountStatus === 'no_account') {
        segments.push({ bank: 'SC', tierName: 'No Account', minBalance: 0, maxBalance: Infinity, amount: Infinity, rate: 0, currentAllocation: 0 });
    } else {
        const scBaseRate = 0.0005;
        let scBonusRate = 0;
        if (scConditions.includes('salary_credit')) { scBonusRate += 0.0150; }
        if (scConditions.includes('card_spend')) { scBonusRate += 0.0155; }
        if (scConditions.includes('insure')) { scBonusRate += 0.0250; }
        if (scConditions.includes('invest')) { scBonusRate += 0.0250; }
        segments.push({ bank: 'SC', tierName: 'Tier 1 (S$0-S$100k)', minBalance: 0, maxBalance: 100000, amount: 100000, rate: scBaseRate + scBonusRate, currentAllocation: 0 });
        segments.push({ bank: 'SC', tierName: 'Tier 2 (>S$100k)', minBalance: 100000, maxBalance: Infinity, amount: Infinity, rate: scBaseRate, currentAllocation: 0 });
    }

    // DBS Segments
    if (dbsCondition === 'no_account') {
        segments.push({ bank: 'DBS', tierName: 'No Account/Fail', minBalance: 0, maxBalance: Infinity, amount: Infinity, rate: 0, currentAllocation: 0 });
    } else {
        let dbsRate = 0, dbsCap = 0;
        switch (dbsCondition) {
            case 'income_1_cat_500_to_15000':    dbsRate = 0.0180; dbsCap = 50000; break;
            case 'income_1_cat_15000_to_30000':  dbsRate = 0.0190; dbsCap = 50000; break;
            case 'income_1_cat_30000_plus':      dbsRate = 0.0220; dbsCap = 50000; break;
            case 'income_2_cat_500_to_15000':    dbsRate = 0.0210; dbsCap = 100000; break;
            case 'income_2_cat_15000_to_30000':  dbsRate = 0.0220; dbsCap = 100000; break;
            case 'income_2_cat_30000_plus':      dbsRate = 0.0300; dbsCap = 100000; break;
            case 'income_3_cat_500_to_15000':    dbsRate = 0.0240; dbsCap = 100000; break;
            case 'income_3_cat_15000_to_30000':  dbsRate = 0.0250; dbsCap = 100000; break;
            case 'income_3_cat_30000_plus':      dbsRate = 0.0410; dbsCap = 100000; break;
        }
        segments.push({ bank: 'DBS', tierName: `Tier 1 (S$0-S$${dbsCap/1000}k)`, minBalance: 0, maxBalance: dbsCap, amount: dbsCap, rate: dbsRate, currentAllocation: 0 });
        segments.push({ bank: 'DBS', tierName: `Tier 2 (>S$${dbsCap/1000}k)`, minBalance: dbsCap, maxBalance: Infinity, amount: Infinity, rate: 0.0005, currentAllocation: 0 });
    }


    // CIMB Segments
    if (cimbCondition === 'no_account') {
        segments.push({ bank: 'CIMB', tierName: 'No Account', minBalance: 0, maxBalance: Infinity, amount: Infinity, rate: 0, currentAllocation: 0 });
    } else {
        const cimbRates = { t1: 0.0088, t2: 0.0178, t3: 0.0250, t4: 0.0080 };
        segments.push({ bank: 'CIMB', tierName: 'Tier 1 (S$0-S$25k)', minBalance: 0, maxBalance: 25000, amount: 25000, rate: cimbRates.t1, currentAllocation: 0 });
        segments.push({ bank: 'CIMB', tierName: 'Tier 2 (S$25k-S$50k)', minBalance: 25000, maxBalance: 50000, amount: 25000, rate: cimbRates.t2, currentAllocation: 0 });
        segments.push({ bank: 'CIMB', tierName: 'Tier 3 (S$50k-S$75k)', minBalance: 50000, maxBalance: 75000, amount: 25000, rate: cimbRates.t3, currentAllocation: 0 });
        segments.push({ bank: 'CIMB', tierName: 'Tier 4 (>S$75k)', minBalance: 75000, maxBalance: Infinity, amount: Infinity, rate: cimbRates.t4, currentAllocation: 0 });
    }

    // 2. Sort Segments and Allocate Funds
    segments.sort((a, b) => b.rate - a.rate);

    let remainingFunds = totalFunds;
    for (const segment of segments) {
        if (remainingFunds <= 0) break;
        const amountToAllocate = Math.min(remainingFunds, segment.amount);
        segment.currentAllocation = amountToAllocate;
        remainingFunds -= amountToAllocate;
    }

    // 3. Calculate Total Interest and Breakdown
    let allocation = { "UOB": 0, "SC": 0, "DBS": 0, "CIMB": 0 };
    let breakdown = { "UOB": {}, "SC": {}, "DBS": {}, "CIMB": {} };
    let totalMonthlyInterest = 0;

    for (const segment of segments) {
        if (segment.currentAllocation > 0) {
            allocation[segment.bank] += segment.currentAllocation;
            const interest = segment.currentAllocation * (segment.rate / 12);
            totalMonthlyInterest += interest;
            if(interest > 0) {
                breakdown[segment.bank][segment.tierName] = { interest, rate: segment.rate };
            }
        }
    }

    return { allocation, totalMonthlyInterest, breakdown };
}
