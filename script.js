// Helper function to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(amount);
};

// --- Interest Calculation Functions ---

function calculateUOBInterest(balance, uobCondition) {
    let totalMonthlyInterest = 0;
    let breakdown = {};
    let rates = {};

    switch (uobCondition) {
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
        breakdown["Tier 4 (>S$150k)"] = interest;
        totalMonthlyInterest += interest;
    }
    if (balance > 125000) {
        let amountInTier = Math.min(balance - 125000, 25000);
        let interest = amountInTier * (rates.t3 / 12);
        breakdown["Tier 3 (S$125k-S$150k)"] = interest;
        totalMonthlyInterest += interest;
    }
    if (balance > 75000) {
        let amountInTier = Math.min(balance - 75000, 50000);
        let interest = amountInTier * (rates.t2 / 12);
        breakdown["Tier 2 (S$75k-S$125k)"] = interest;
        totalMonthlyInterest += interest;
    }
    if (balance > 0) {
        let amountInTier = Math.min(balance, 75000);
        let interest = amountInTier * (rates.t1 / 12);
        breakdown["Tier 1 (S$0-S$75k)"] = interest;
        totalMonthlyInterest += interest;
    }

    return { total: totalMonthlyInterest, breakdown };
}

function calculateSCInterest(balance, scConditions) {
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

    if (balance > 100000) {
        let amountInTier = balance - 100000;
        let interest = amountInTier * baseRate;
        breakdown["Tier 2 (>S$100k)"] = interest;
        totalMonthlyInterest += interest;
    }

    if (balance > 0) {
        let amountInTier = Math.min(balance, 100000);
        let interest = amountInTier * (baseRate + bonusRate);
        breakdown["Tier 1 (S$0-S$100k)"] = interest;
        totalMonthlyInterest += interest;
    }
    
    return { total: totalMonthlyInterest, breakdown };
}

function calculateDBSInterest(balance, dbsCondition) {
    let totalMonthlyInterest = 0;
    let breakdown = {};
    let rate = 0;
    let cap = 0;

    // Determine rate and cap based on the condition
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
        default:                            rate = 0.0000; cap = 0; break; // Fail requirement
    }

    // Calculate interest for the amount within the cap
    if (balance > 0) {
        const amountInTier = Math.min(balance, cap);
        const interest = amountInTier * (rate / 12);
        breakdown[`Tier 1 (S$0-S$${cap/1000}k)`] = interest;
        totalMonthlyInterest += interest;
    }
    
    // Calculate interest for the amount above the cap
    if (balance > cap) {
        const amountInTier = balance - cap;
        const interest = amountInTier * (0.0005 / 12); // Base rate for balance > cap
        breakdown[`Tier 2 (>S$${cap/1000}k)`] = interest;
        totalMonthlyInterest += interest;
    }

    return { total: totalMonthlyInterest, breakdown };
}

function calculateCIMBInterest(balance) {
    let totalMonthlyInterest = 0;
    let breakdown = {};
    const rates = {
        t1: 0.0088 / 12, // First S$25,000
        t2: 0.0178 / 12, // Next S$25,000
        t3: 0.0250 / 12, // Next S$25,000
        t4: 0.0080 / 12  // Above S$75,000
    };

    if (balance > 75000) {
        let amountInTier = balance - 75000;
        let interest = amountInTier * rates.t4;
        breakdown["Tier 4 (>S$75k)"] = interest;
        totalMonthlyInterest += interest;
    }
    if (balance > 50000) {
        let amountInTier = Math.min(balance - 50000, 25000);
        let interest = amountInTier * rates.t3;
        breakdown["Tier 3 (S$50k-S$75k)"] = interest;
        totalMonthlyInterest += interest;
    }
    if (balance > 25000) {
        let amountInTier = Math.min(balance - 25000, 25000);
        let interest = amountInTier * rates.t2;
        breakdown["Tier 2 (S$25k-S$50k)"] = interest;
        totalMonthlyInterest += interest;
    }
    if (balance > 0) {
        let amountInTier = Math.min(balance, 25000);
        let interest = amountInTier * rates.t1;
        breakdown["Tier 1 (S$0-S$25k)"] = interest;
        totalMonthlyInterest += interest;
    }

    return { total: totalMonthlyInterest, breakdown };
}

// --- Optimal Allocation Logic ---

function findOptimalAllocation(totalFunds, uobCondition, scConditions, dbsCondition) {
    let allocation = {"UOB": 0, "SC": 0, "DBS": 0, "CIMB": 0};
    let currentFunds = totalFunds;

    const getMarginalRate = (bankName, currentBalance) => {
        if (bankName === "UOB") {
            let rates = {};
            switch (uobCondition) {
                case 'spend_only': rates = { t1: 0.0065, t2: 0.0005, t3: 0.0005, t4: 0.0005 }; break;
                case 'spend_giro_debit': rates = { t1: 0.0100, t2: 0.0200, t3: 0.0005, t4: 0.0005 }; break;
                case 'spend_salary_giro': rates = { t1: 0.0150, t2: 0.0300, t3: 0.0450, t4: 0.0005 }; break;
            }
            if (currentBalance < 75000) return rates.t1 / 12;
            if (currentBalance < 125000) return rates.t2 / 12;
            if (currentBalance < 150000) return rates.t3 / 12;
            return rates.t4 / 12;
        } else if (bankName === "SC") {
            const baseRate = 0.0005;
            let bonusRate = 0;
            if (scConditions.includes('salary_credit')) bonusRate += 0.0150;
            if (scConditions.includes('card_spend')) bonusRate += 0.0155;
            if (scConditions.includes('insure')) bonusRate += 0.0250;
            if (scConditions.includes('invest')) bonusRate += 0.0250;
            if (currentBalance < 100000) return (baseRate + bonusRate) / 12;
            return baseRate / 12;
        } else if (bankName === "DBS") {
            let rate = 0;
            let cap = 0;
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
                default:                            rate = 0.0000; cap = 0; break;
            }
            if (currentBalance < cap) return rate / 12;
            return 0.0005 / 12; // Base rate for balance > cap
        } else if (bankName === "CIMB") {
            if (currentBalance < 25000) return 0.0088 / 12;
            if (currentBalance < 50000) return 0.0178 / 12;
            if (currentBalance < 75000) return 0.0250 / 12;
            return 0.0080 / 12;
        }
        return 0;
    };

    while (currentFunds > 0) {
        let bestBank = null;
        let maxMarginalRate = -1;

        for (const bankName of Object.keys(allocation)) {
            const rate = getMarginalRate(bankName, allocation[bankName]);
            if (rate > maxMarginalRate) {
                maxMarginalRate = rate;
                bestBank = bankName;
            } else if (rate === maxMarginalRate) {
                // Tie-breaking: CIMB > UOB > SC > DBS for positive rates
                if (bestBank === "UOB" && bankName === "CIMB") bestBank = bankName;
                else if (bestBank === "SC" && (bankName === "CIMB" || bankName === "UOB")) bestBank = bankName;
                else if (bestBank === "DBS" && (bankName === "CIMB" || bankName === "UOB" || bankName === "SC")) bestBank = bankName;
            }
        }

        // If no bank offers a positive marginal rate, we can't optimize further.
        if (maxMarginalRate <= 0) {
            break;
        }

        // This should not happen if maxMarginalRate > 0, but it's a safe guard.
        if (!bestBank) {
            break;
        }
        
        let amountToAdd = currentFunds;

        if (bestBank === "UOB") {
            if (allocation["UOB"] < 75000) amountToAdd = Math.min(currentFunds, 75000 - allocation["UOB"]);
            else if (allocation["UOB"] < 125000) amountToAdd = Math.min(currentFunds, 125000 - allocation["UOB"]);
            else if (allocation["UOB"] < 150000) amountToAdd = Math.min(currentFunds, 150000 - allocation["UOB"]);
        } else if (bestBank === "SC") {
            if (allocation["SC"] < 100000) {
                amountToAdd = Math.min(currentFunds, 100000 - allocation["SC"]);
            }
        } else if (bestBank === "DBS") {
            let cap = 0;
            switch (true) {
                case dbsCondition.startsWith('income_1_cat'): cap = 50000; break;
                case dbsCondition.startsWith('income_2_cat'): cap = 100000; break;
                case dbsCondition.startsWith('income_3_cat'): cap = 100000; break;
            }
            if (cap > 0 && allocation["DBS"] < cap) {
                amountToAdd = Math.min(currentFunds, cap - allocation["DBS"]);
            }
        } else if (bestBank === "CIMB") {
            if (allocation["CIMB"] < 25000) amountToAdd = Math.min(currentFunds, 25000 - allocation["CIMB"]);
            else if (allocation["CIMB"] < 50000) amountToAdd = Math.min(currentFunds, 50000 - allocation["CIMB"]);
            else if (allocation["CIMB"] < 75000) amountToAdd = Math.min(currentFunds, 75000 - allocation["CIMB"]);
        }
        
        // If the calculated amount is zero or less, we can't proceed.
        if (amountToAdd <= 0) {
            break;
        }
        
        allocation[bestBank] += amountToAdd;
        currentFunds -= amountToAdd;
    }

    // If any funds remain after the optimization loop (e.g., all rates were <= 0),
    // allocate them to a default fallback account. CIMB is a reasonable choice.
    if (currentFunds > 0) {
        allocation["CIMB"] += currentFunds;
    }

    const uobResult = calculateUOBInterest(allocation["UOB"], uobCondition);
    const scResult = calculateSCInterest(allocation["SC"], scConditions);
    const dbsResult = calculateDBSInterest(allocation["DBS"], dbsCondition);
    const cimbResult = calculateCIMBInterest(allocation["CIMB"]);
    const totalMonthlyInterest = uobResult.total + scResult.total + dbsResult.total + cimbResult.total;

    return { allocation, totalMonthlyInterest, breakdown: { UOB: uobResult.breakdown, SC: scResult.breakdown, DBS: dbsResult.breakdown, CIMB: cimbResult.breakdown } };
}

// --- Event Listeners and Display Logic ---

const totalFundsInput = document.getElementById('totalFunds');
const uobConditionRadios = document.querySelectorAll('input[name="uobCondition"]');
const scConditionCheckboxes = document.querySelectorAll('input[name="scCondition"]');
const dbsConditionRadios = document.querySelectorAll('input[name="dbsCondition"]');
const allocationResultsDiv = document.getElementById('allocationResults');
const interestBreakdownDiv = document.getElementById('interestBreakdown');
const monthlyInterestSpan = document.getElementById('monthlyInterest');

function updateAllocation() {
    const totalFunds = parseFloat(totalFundsInput.value);
    if (isNaN(totalFunds) || totalFunds < 0) {
        allocationResultsDiv.innerHTML = '<p class="text-red-500">Please enter a valid fund amount.</p>';
        interestBreakdownDiv.innerHTML = '';
        monthlyInterestSpan.textContent = formatCurrency(0);
        return;
    }

    const selectedUOBCondition = document.querySelector('input[name="uobCondition"]:checked').value;
    const selectedSCConditions = Array.from(document.querySelectorAll('input[name="scCondition"]:checked')).map(cb => cb.value);
    const selectedDBSCondition = document.querySelector('input[name="dbsCondition"]:checked').value;

    const { allocation, totalMonthlyInterest, breakdown } = findOptimalAllocation(totalFunds, selectedUOBCondition, selectedSCConditions, selectedDBSCondition);

    // Display allocation results
    allocationResultsDiv.innerHTML = '';
    for (const bank in allocation) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'result-item';
        itemDiv.innerHTML = `
            <span>${bank}:</span>
            <span>${formatCurrency(allocation[bank])}</span>
        `;
        allocationResultsDiv.appendChild(itemDiv);
    }

    // Display interest breakdown
    interestBreakdownDiv.innerHTML = '';
    for (const bank in breakdown) {
        const bankTitle = document.createElement('h4');
        bankTitle.className = 'font-semibold text-sm mt-3';
        bankTitle.textContent = `${bank} Account:`;
        interestBreakdownDiv.appendChild(bankTitle);
        
        for (const tier in breakdown[bank]) {
            if (breakdown[bank][tier] > 0) {
                const tierItem = document.createElement('div');
                tierItem.className = 'interest-breakdown-item flex justify-between';
                tierItem.innerHTML = `
                    <span>${tier}</span>
                    <span>${formatCurrency(breakdown[bank][tier])}</span>
                `;
                interestBreakdownDiv.appendChild(tierItem);
            }
        }
    }

    // Display total monthly interest
    monthlyInterestSpan.textContent = formatCurrency(totalMonthlyInterest);
}

// Add event listeners
totalFundsInput.addEventListener('input', updateAllocation);
uobConditionRadios.forEach(radio => radio.addEventListener('change', updateAllocation));
scConditionCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateAllocation));
dbsConditionRadios.forEach(radio => radio.addEventListener('change', updateAllocation));

// Initial calculation on page load
window.onload = updateAllocation;
