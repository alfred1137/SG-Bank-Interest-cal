import { BANK_CONFIG } from '../config/bank-rates.js';

export function getUOBOneTierSegments(uobOneCondition) {
    if (uobOneCondition === 'no_account' || !BANK_CONFIG.uobOne.conditions[uobOneCondition]) return [];
    
    const rates = BANK_CONFIG.uobOne.conditions[uobOneCondition];
    const tiers = BANK_CONFIG.uobOne.tiers;

    return tiers.map((tier, index) => ({
        bank: 'UOB One',
        capacity: tier.capacity,
        rate: rates[index]
    }));
}

export function getSCTierSegments(scAccountStatus, scConditions) {
    if (scAccountStatus === 'no_account') return [];
    
    const config = BANK_CONFIG.sc;
    const baseRate = config.baseRate;
    let bonusRate = 0;

    if (Array.isArray(scConditions)) {
        scConditions.forEach(condition => {
            if (config.bonuses[condition]) {
                bonusRate += config.bonuses[condition];
            }
        });
    }

    return [
        { bank: 'SC', capacity: config.bonusCap, rate: baseRate + bonusRate },
        { bank: 'SC', capacity: Infinity, rate: baseRate }
    ];
}

export function getDBSTierSegments(dbsCondition) {
    if (dbsCondition === 'no_account' || dbsCondition === 'fail_requirement') return [];
    
    const config = BANK_CONFIG.dbs;
    const conditionConfig = config.conditions[dbsCondition];

    if (!conditionConfig) return [];

    return [
        { bank: 'DBS', capacity: conditionConfig.cap, rate: conditionConfig.rate },
        { bank: 'DBS', capacity: Infinity, rate: config.baseRate }
    ];
}

export function getCIMBTierSegments(cimbCondition) {
    if (cimbCondition === 'no_account') return [];

    const tiers = BANK_CONFIG.cimb.tiers;

    return tiers.map(tier => ({
        bank: 'CIMB',
        capacity: tier.capacity,
        rate: tier.rate
    }));
}

export function getUOBStashTierSegments(uobStashCondition) {
    if (uobStashCondition === 'no_account') return [];

    const config = BANK_CONFIG.uobStash;
    const rates = (uobStashCondition === 'maintain_balance') ? config.bonusRates : config.baseRates;
    const tiers = config.tiers;

    return tiers.map((capacity, index) => ({
        bank: 'UOB Stash',
        capacity: capacity,
        rate: rates[index]
    }));
}

export function getOCBC360TierSegments(ocbc360AccountStatus, ocbc360Conditions) {
    if (ocbc360AccountStatus === 'no_account') return [];

    const config = BANK_CONFIG.ocbc360;
    let rate = config.baseRate;

    if (Array.isArray(ocbc360Conditions)) {
        ocbc360Conditions.forEach(condition => {
            if (config.bonuses[condition]) {
                rate += config.bonuses[condition];
            }
        });
    }

    return [
        { bank: 'OCBC 360', capacity: config.tier1Cap, rate: rate },
        { bank: 'OCBC 360', capacity: config.tier2Cap, rate: config.baseRate },
        { bank: 'OCBC 360', capacity: Infinity, rate: config.baseRate }
    ];
}
