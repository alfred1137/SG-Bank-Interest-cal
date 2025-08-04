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
    let allocation = { "UOB": 0, "SC": 0, "DBS": 0, "CIMB": 0 };
    let remainingFunds = totalFunds;

    // 1. Define "projects" for each bank's bonus structure
    const projects = [];

    // UOB Project
    const uobBonusCap = 150000;
    const uobInterestForCap = calculateUOBInterest(uobBonusCap, uobCondition).total;
    if (uobInterestForCap > 0) {
        projects.push({
            bank: 'UOB',
            cost: uobBonusCap,
            reward: uobInterestForCap,
            effectiveRate: uobInterestForCap / uobBonusCap
        });
    }

    // SC Project
    const scBonusCap = 100000;
    const scInterestForCap = calculateSCInterest(scBonusCap, scConditions).total;
    if (scInterestForCap > 0) {
        projects.push({
            bank: 'SC',
            cost: scBonusCap,
            reward: scInterestForCap,
            effectiveRate: scInterestForCap / scBonusCap
        });
    }

    // DBS Project
    let dbsBonusCap = 0;
    switch (true) {
        case dbsCondition.startsWith('income_1_cat'): dbsBonusCap = 50000; break;
        case dbsCondition.startsWith('income_2_cat'): dbsBonusCap = 100000; break;
        case dbsCondition.startsWith('income_3_cat'): dbsBonusCap = 100000; break;
    }
    if (dbsBonusCap > 0) {
        const dbsInterestForCap = calculateDBSInterest(dbsBonusCap, dbsCondition).total;
        if (dbsInterestForCap > 0) {
            projects.push({
                bank: 'DBS',
                cost: dbsBonusCap,
                reward: dbsInterestForCap,
                effectiveRate: dbsInterestForCap / dbsBonusCap
            });
        }
    }

    // CIMB Project
    const cimbBonusCap = 75000;
    const cimbInterestForCap = calculateCIMBInterest(cimbBonusCap).total;
    if (cimbInterestForCap > 0) {
        projects.push({
            bank: 'CIMB',
            cost: cimbBonusCap,
            reward: cimbInterestForCap,
            effectiveRate: cimbInterestForCap / cimbBonusCap
        });
    }

    // 2. Sort projects by their effective rate, descending
    projects.sort((a, b) => b.effectiveRate - a.effectiveRate);

    // 3. Allocate funds based on the sorted projects
    for (const project of projects) {
        if (remainingFunds <= 0) break;
        const amountToAllocate = Math.min(remainingFunds, project.cost);
        allocation[project.bank] += amountToAllocate;
        remainingFunds -= amountToAllocate;
    }

    // 4. If any funds remain, allocate them to the bank with the best "fallback" rate
    // (i.e., the rate for funds above the bonus cap).
    if (remainingFunds > 0) {
        let bestFallbackBank = 'CIMB'; // Default fallback
        let maxFallbackRate = 0.0080; // CIMB's >75k rate

        // UOB fallback
        let uobRates = {};
        switch (uobCondition) {
            case 'spend_only': uobRates = { t4: 0.0005 }; break;
            case 'spend_giro_debit': uobRates = { t4: 0.0005 }; break;
            case 'spend_salary_giro': uobRates = { t4: 0.0005 }; break;
        }
        if (uobRates.t4 > maxFallbackRate) {
            maxFallbackRate = uobRates.t4;
            bestFallbackBank = 'UOB';
        }

        // SC & DBS fallback rate is 0.0005, which is lower than CIMB's.
        // So we only need to compare with UOB.
        
        allocation[bestFallbackBank] += remainingFunds;
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
