export const BANK_CONFIG = {
  uobOne: {
    tiers: [
      { capacity: 75000 },
      { capacity: 50000 },
      { capacity: 25000 },
      { capacity: Infinity }
    ],
    conditions: {
      spend_only: [0.0065, 0.0005, 0.0005, 0.0005],
      spend_giro_debit: [0.0100, 0.0200, 0.0005, 0.0005],
      spend_salary_giro: [0.0100, 0.0250, 0.0340, 0.0005]
    }
  },
  sc: {
    baseRate: 0.0005,
    bonusCap: 100000,
    bonuses: {
      salary_credit: 0.0150,
      card_spend: 0.0155,
      insure: 0.0250,
      invest: 0.0250
    }
  },
  dbs: {
    baseRate: 0.0005,
    conditions: {
      income_1_cat_500_to_15000: { rate: 0.0180, cap: 50000 },
      income_1_cat_15000_to_30000: { rate: 0.0190, cap: 50000 },
      income_1_cat_30000_plus: { rate: 0.0220, cap: 50000 },
      income_2_cat_500_to_15000: { rate: 0.0210, cap: 100000 },
      income_2_cat_15000_to_30000: { rate: 0.0220, cap: 100000 },
      income_2_cat_30000_plus: { rate: 0.0300, cap: 100000 },
      income_3_cat_500_to_15000: { rate: 0.0240, cap: 100000 },
      income_3_cat_15000_to_30000: { rate: 0.0250, cap: 100000 },
      income_3_cat_30000_plus: { rate: 0.0410, cap: 100000 }
    }
  },
  cimb: {
    tiers: [
      { capacity: 25000, rate: 0.0088 },
      { capacity: 25000, rate: 0.0178 },
      { capacity: 25000, rate: 0.0250 },
      { capacity: Infinity, rate: 0.0080 }
    ]
  },
  uobStash: {
    tiers: [10000, 30000, 30000, 30000, Infinity],
    baseRates: [0.0005, 0.0005, 0.0005, 0.0005, 0.0005],
    bonusRates: [0.006, 0.006, 0.01, 0.03, 0.0005] // Applied if maintain_balance
  },
  ocbc360: {
    baseRate: 0.0005,
    tier1Cap: 75000,
    tier2Cap: 25000,
    bonuses: {
      salary: 0.012,
      save: 0.005,
      insure: 0.006,
      invest: 0.006
    }
  }
};
