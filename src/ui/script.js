import { getUOBOneTierSegments, getUOBStashTierSegments, getOCBC360TierSegments, getSCTierSegments, getDBSTierSegments, getCIMBTierSegments } from '../logic/calculator.js';
import { findOptimalAllocationAndInterest } from '../logic/allocation-engine.js';

// Bank account names mapping
const bankAccountNames = {
    "UOB One": "UOB One Account",
    "UOB Stash": "UOB Stash Account",
    "OCBC 360": "OCBC 360 Account",
    "SC": "SC Bonus$aver Account",
    "DBS": "DBS Multiplier Account",
    "CIMB": "CIMB FastSaver Account"
};

// Helper function to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(amount);
};

const totalFundsInput = document.getElementById('totalFunds');
const uobConditionRadios = document.querySelectorAll('input[name="uobCondition"]');
const uobStashConditionRadios = document.querySelectorAll('input[name="uobStashCondition"]');
const ocbc360AccountStatusRadios = document.querySelectorAll('input[name="ocbc360AccountStatus"]');
const ocbc360ConditionCheckboxes = document.querySelectorAll('input[name="ocbc360Condition"]');
const scAccountStatusRadios = document.querySelectorAll('input[name="scAccountStatus"]');
const scConditionCheckboxes = document.querySelectorAll('input[name="scCondition"]');
const dbsConditionRadios = document.querySelectorAll('input[name="dbsCondition"]');
const cimbConditionRadios = document.querySelectorAll('input[name="cimbCondition"]');
const allocationResultsDiv = document.getElementById('allocationResults');
const interestBreakdownDiv = document.getElementById('interestBreakdown');
const monthlyInterestSpan = document.getElementById('monthlyInterest');
const equivalentRateDiv = document.getElementById('equivalentRate');

function updateAllocation() {
    const totalFunds = parseFloat(totalFundsInput.value);
    if (isNaN(totalFunds) || totalFunds < 0) {
        allocationResultsDiv.innerHTML = '<p class="text-red-500">Please enter a valid fund amount.</p>';
        interestBreakdownDiv.innerHTML = '';
        monthlyInterestSpan.textContent = formatCurrency(0);
        equivalentRateDiv.textContent = '';
        return;
    }

    const selectedUOBOneCondition = document.querySelector('input[name="uobCondition"]:checked').value;
    const selectedSCAccountStatus = document.querySelector('input[name="scAccountStatus"]:checked').value;
    const selectedSCConditions = Array.from(document.querySelectorAll('input[name="scCondition"]:checked')).map(cb => cb.value);
    const selectedDBSCondition = document.querySelector('input[name="dbsCondition"]:checked').value;
    const selectedCIMBCondition = document.querySelector('input[name="cimbCondition"]:checked').value;
    const selectedUOBStashCondition = document.querySelector('input[name="uobStashCondition"]:checked').value;
    const selectedOCBC360AccountStatus = document.querySelector('input[name="ocbc360AccountStatus"]:checked').value;
    const selectedOCBC360Conditions = Array.from(document.querySelectorAll('input[name="ocbc360Condition"]:checked')).map(cb => cb.value);

    // Consolidate all available tiers from selected banks
    const allTiers = [
        ...getUOBOneTierSegments(selectedUOBOneCondition),
        ...getUOBStashTierSegments(selectedUOBStashCondition),
        ...getOCBC360TierSegments(selectedOCBC360AccountStatus === 'no_account' ? 'no_account' : selectedOCBC360Conditions),
        ...getSCTierSegments(selectedSCAccountStatus, selectedSCConditions),
        ...getDBSTierSegments(selectedDBSCondition),
        ...getCIMBTierSegments(selectedCIMBCondition)
    ];

    const { allocation, totalMonthlyInterest, breakdown } = findOptimalAllocationAndInterest(totalFunds, allTiers);

    // Display allocation results
    allocationResultsDiv.innerHTML = '';
    for (const bank in allocation) {
        if (allocation[bank] > 0) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'result-item';
            itemDiv.innerHTML = `
                <span>${bankAccountNames[bank] || bank}:</span>
                <span class="text-right">${formatCurrency(allocation[bank])}</span>
            `;
            allocationResultsDiv.appendChild(itemDiv);
        }
    }

    // Display interest breakdown
    interestBreakdownDiv.innerHTML = '';
    for (const bank in breakdown) {
        const hasInterest = Object.values(breakdown[bank]).some(tierData => tierData.interest > 0);
        if (!hasInterest) continue;

        const bankTitle = document.createElement('h4');
        bankTitle.className = 'font-semibold text-sm mt-3';
        bankTitle.textContent = `${bank}:`;
        interestBreakdownDiv.appendChild(bankTitle);
        
        const sortedTiers = Object.keys(breakdown[bank]).sort((a, b) => {
            const rateA = parseFloat(a.match(/\(([^)]+)\)/)[1]);
            const rateB = parseFloat(b.match(/\(([^)]+)\)/)[1]);
            return rateB - rateA;
        });

        for (const tier of sortedTiers) {
            const tierData = breakdown[bank][tier];
            if (tierData.interest > 0) {
                const tierItem = document.createElement('div');
                tierItem.className = 'interest-breakdown-item';
                tierItem.innerHTML = `
                    <span>${tier} p.a.</span>
                    <span>${formatCurrency(tierData.interest)}</span>
                `;
                interestBreakdownDiv.appendChild(tierItem);
            }
        }
    }

    // Display total monthly interest and equivalent rate
    monthlyInterestSpan.textContent = formatCurrency(totalMonthlyInterest);
    if (totalFunds > 0) {
        const equivalentAnnualRate = (totalMonthlyInterest * 12 / totalFunds) * 100;
        equivalentRateDiv.textContent = `Equivalent ${equivalentAnnualRate.toFixed(2)}% p.a.`;
    } else {
        equivalentRateDiv.textContent = '';
    }
}

// Add event listeners
totalFundsInput.addEventListener('input', updateAllocation);
uobConditionRadios.forEach(radio => radio.addEventListener('change', updateAllocation));
uobStashConditionRadios.forEach(radio => radio.addEventListener('change', updateAllocation));
ocbc360AccountStatusRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const ocbc360Checkboxes = document.querySelectorAll('input[name="ocbc360Condition"]');
        if (radio.value === 'no_account') {
            ocbc360Checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = true;
            });
        } else {
            ocbc360Checkboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
        }
        updateAllocation();
    });
});
ocbc360ConditionCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateAllocation));
scAccountStatusRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const scCheckboxes = document.querySelectorAll('input[name="scCondition"]');
        if (radio.value === 'no_account') {
            scCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = true;
            });
        } else {
            scCheckboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
        }
        updateAllocation();
    });
});
scConditionCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateAllocation));
dbsConditionRadios.forEach(radio => radio.addEventListener('change', updateAllocation));
cimbConditionRadios.forEach(radio => radio.addEventListener('change', updateAllocation));

// Initial calculation on page load
window.onload = updateAllocation;
