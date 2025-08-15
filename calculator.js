export function getUOBTierSegments(uobCondition) {
    if (uobCondition === 'no_account') return [];
    let rates = {};
    switch (uobCondition) {
        case 'spend_only': rates = { t1: 0.0065, t2: 0.0005, t3: 0.0005, t4: 0.0005 }; break;
        case 'spend_giro_debit': rates = { t1: 0.0100, t2: 0.0200, t3: 0.0005, t4: 0.0005 }; break;
        case 'spend_salary_giro': rates = { t1: 0.0150, t2: 0.0300, t3: 0.0450, t4: 0.0005 }; break;
        default: return [];
    }
    return [
        { bank: 'UOB', capacity: 75000, rate: rates.t1 },
        { bank: 'UOB', capacity: 50000, rate: rates.t2 },
        { bank: 'UOB', capacity: 25000, rate: rates.t3 },
        { bank: 'UOB', capacity: Infinity, rate: rates.t4 }
    ];
}

export function getSCTierSegments(scAccountStatus, scConditions) {
    if (scAccountStatus === 'no_account') return [];
    const baseRate = 0.0005;
    let bonusRate = 0;
    if (scConditions.includes('salary_credit')) bonusRate += 0.0150;
    if (scConditions.includes('card_spend')) bonusRate += 0.0155;
    if (scConditions.includes('insure')) bonusRate += 0.0250;
    if (scConditions.includes('invest')) bonusRate += 0.0250;
    return [
        { bank: 'SC', capacity: 100000, rate: baseRate + bonusRate },
        { bank: 'SC', capacity: Infinity, rate: baseRate }
    ];
}

export function getDBSTierSegments(dbsCondition) {
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
        default: return [];
    }
    return [
        { bank: 'DBS', capacity: cap, rate: rate },
        { bank: 'DBS', capacity: Infinity, rate: 0.0005 }
    ];
}

export function getCIMBTierSegments(cimbCondition) {
    if (cimbCondition === 'no_account') return [];
    const rates = { t1: 0.0088, t2: 0.0178, t3: 0.0250, t4: 0.0080 };
    return [
        { bank: 'CIMB', capacity: 25000, rate: rates.t1 },
        { bank: 'CIMB', capacity: 25000, rate: rates.t2 },
        { bank: 'CIMB', capacity: 25000, rate: rates.t3 },
        { bank: 'CIMB', capacity: Infinity, rate: rates.t4 }
    ];
}
