import { findOptimalAllocation } from './calculator.js';

// Helper function to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(amount);
};

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
