import { findOptimalAllocation } from './calculator.js';

// Bank account names mapping
const bankAccountNames = {
    "UOB": "UOB One Account",
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

    const selectedUOBCondition = document.querySelector('input[name="uobCondition"]:checked').value;
    const selectedSCAccountStatus = document.querySelector('input[name="scAccountStatus"]:checked').value;
    const selectedSCConditions = Array.from(document.querySelectorAll('input[name="scCondition"]:checked')).map(cb => cb.value);
    const selectedDBSCondition = document.querySelector('input[name="dbsCondition"]:checked').value;
    const selectedCIMBCondition = document.querySelector('input[name="cimbCondition"]:checked').value;

    const { allocation, totalMonthlyInterest, breakdown } = findOptimalAllocation(totalFunds, selectedUOBCondition, selectedSCAccountStatus, selectedSCConditions, selectedDBSCondition, selectedCIMBCondition);

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
        bankTitle.textContent = `${bankAccountNames[bank] || bank}:`;
        interestBreakdownDiv.appendChild(bankTitle);
        
        const sortedTiers = Object.keys(breakdown[bank]).sort((a, b) => {
            const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
            const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
            return aNum - bNum;
        });

        for (const tier of sortedTiers) {
            const tierData = breakdown[bank][tier];
            if (tierData.interest > 0) {
                const tierItem = document.createElement('div');
                tierItem.className = 'interest-breakdown-item';
                tierItem.innerHTML = `
                    <span>${tier} (${(tierData.rate * 100).toFixed(2)}% p.a.)</span>
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
