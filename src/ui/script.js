import { getUOBOneTierSegments, getUOBStashTierSegments, getOCBC360TierSegments, getSCTierSegments, getDBSTierSegments, getCIMBTierSegments } from '../logic/calculator.js';
import { findOptimalAllocationAndInterest } from '../logic/allocation-engine.js';

const bankAccountNames = {
    "UOB One": "UOB One Account",
    "UOB Stash": "UOB Stash Account",
    "OCBC 360": "OCBC 360 Account",
    "SC": "SC Bonus$aver Account",
    "DBS": "DBS Multiplier Account",
    "CIMB": "CIMB FastSaver Account"
};

const bankColors = {
    "UOB One": "bg-uob-one",
    "UOB Stash": "bg-uob-stash",
    "OCBC 360": "bg-ocbc-360",
    "SC": "bg-sc",
    "DBS": "bg-dbs",
    "CIMB": "bg-cimb",
    "Unallocated": "bg-ctp-overlay"
};

const formatCurrency = (amount) => new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(amount);

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
const monthlyInterestDiv = document.getElementById('monthlyInterest');
const equivalentRateDiv = document.getElementById('equivalentRate');
const allocationVisualizerDiv = document.getElementById('allocation-visualizer');

function updateAllocationVisualizer(totalFunds, allocation) {
    allocationVisualizerDiv.innerHTML = '';
    if (totalFunds <= 0) return;

    let allocatedFunds = 0;
    for (const bank in allocation) {
        if (allocation[bank] > 0) {
            const percentage = (allocation[bank] / totalFunds) * 100;
            const segment = document.createElement('div');
            segment.className = `allocation-bar-segment ${bankColors[bank] || 'bg-ctp-overlay'}`;
            segment.style.width = `${percentage}%`;
            segment.title = `${bankAccountNames[bank]}: ${formatCurrency(allocation[bank])}`;
            allocationVisualizerDiv.appendChild(segment);
            allocatedFunds += allocation[bank];
        }
    }

    const unallocatedFunds = totalFunds - allocatedFunds;
    if (unallocatedFunds > 1) { // Allow for rounding errors
        const percentage = (unallocatedFunds / totalFunds) * 100;
        const segment = document.createElement('div');
        segment.className = `allocation-bar-segment ${bankColors['Unallocated']}`;
        segment.style.width = `${percentage}%`;
        segment.title = `Unallocated: ${formatCurrency(unallocatedFunds)}`;
        allocationVisualizerDiv.appendChild(segment);
    }
}

function updateAllocation() {
    const totalFunds = parseFloat(totalFundsInput.value);
    if (isNaN(totalFunds) || totalFunds < 0) {
        allocationResultsDiv.innerHTML = '<p class="text-ctp-error">Please enter a valid fund amount.</p>';
        interestBreakdownDiv.innerHTML = '';
        monthlyInterestDiv.textContent = formatCurrency(0);
        equivalentRateDiv.textContent = 'Equivalent 0.00% p.a.';
        updateAllocationVisualizer(0, {});
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

    const allTiers = [
        ...getUOBOneTierSegments(selectedUOBOneCondition),
        ...getUOBStashTierSegments(selectedUOBStashCondition),
        ...getOCBC360TierSegments(selectedOCBC360AccountStatus === 'no_account' ? 'no_account' : selectedOCBC360Conditions),
        ...getSCTierSegments(selectedSCAccountStatus, selectedSCConditions),
        ...getDBSTierSegments(selectedDBSCondition),
        ...getCIMBTierSegments(selectedCIMBCondition)
    ];

    const { allocation, totalMonthlyInterest, breakdown } = findOptimalAllocationAndInterest(totalFunds, allTiers);

    // Update Hero Section
    monthlyInterestDiv.textContent = formatCurrency(totalMonthlyInterest);
    if (totalFunds > 0) {
        const equivalentAnnualRate = (totalMonthlyInterest * 12 / totalFunds) * 100;
        equivalentRateDiv.textContent = `Equivalent ${equivalentAnnualRate.toFixed(2)}% p.a.`;
    } else {
        equivalentRateDiv.textContent = 'Equivalent 0.00% p.a.';
    }

    // Update Allocation Visualizer and Text
    updateAllocationVisualizer(totalFunds, allocation);
    allocationResultsDiv.innerHTML = '';
    const sortedAllocation = Object.entries(allocation).sort(([,a],[,b]) => b-a);

    for (const [bank, amount] of sortedAllocation) {
        if (amount > 0) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex justify-between items-center text-sm text-ctp-text';
            itemDiv.innerHTML = `
                <span class="font-semibold">${bankAccountNames[bank] || bank}</span>
                <span class="font-mono text-ctp-subtext">${formatCurrency(amount)}</span>
            `;
            allocationResultsDiv.appendChild(itemDiv);
        }
    }

    // Update Interest Breakdown Accordions
    interestBreakdownDiv.innerHTML = '';
    for (const bank in breakdown) {
        const hasInterest = Object.values(breakdown[bank]).some(tierData => tierData.interest > 0);
        if (!hasInterest) continue;

        const totalBankInterest = Object.values(breakdown[bank]).reduce((sum, tier) => sum + tier.interest, 0);

        const accordion = document.createElement('div');
        accordion.innerHTML = `
            <div class="accordion-header">
                <h4 class="font-semibold text-ctp-text">${bankAccountNames[bank]}</h4>
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-ctp-success">${formatCurrency(totalBankInterest)}</span>
                    <svg class="w-4 h-4 transform transition-transform text-ctp-subtext" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
            <div class="accordion-content"></div>
        `;

        const content = accordion.querySelector('.accordion-content');
        const sortedTiers = Object.keys(breakdown[bank]).sort((a, b) => parseFloat(b.match(/[\d.]+/)) - parseFloat(a.match(/[\d.]+/)));

        for (const tier of sortedTiers) {
            const tierData = breakdown[bank][tier];
            if (tierData.interest > 0) {
                const tierItem = document.createElement('div');
                tierItem.className = 'interest-breakdown-item';
                tierItem.innerHTML = `
                    <span class="text-ctp-subtext">${tier} p.a.</span>
                    <span class="font-mono text-ctp-text">${formatCurrency(tierData.interest)}</span>
                `;
                content.appendChild(tierItem);
            }
        }
        interestBreakdownDiv.appendChild(accordion);
    }
}

// Event Delegation for Accordions
interestBreakdownDiv.addEventListener('click', function(event) {
    const header = event.target.closest('.accordion-header');
    if (header) {
        const content = header.nextElementSibling;
        const icon = header.querySelector('svg');
        content.classList.toggle('open');
        icon.classList.toggle('rotate-180');
    }
});


// Add event listeners to controls
[totalFundsInput, ...uobConditionRadios, ...uobStashConditionRadios, ...ocbc360AccountStatusRadios, ...ocbc360ConditionCheckboxes, ...scAccountStatusRadios, ...scConditionCheckboxes, ...dbsConditionRadios, ...cimbConditionRadios].forEach(element => {
    element.addEventListener(element.type === 'checkbox' || element.type === 'radio' ? 'change' : 'input', updateAllocation);
});


// Enable/disable checkboxes based on account status
function setupConditionalCheckboxes(statusRadiosName, conditionCheckboxesName) {
    const statusRadios = document.querySelectorAll(`input[name="${statusRadiosName}"]`);
    const conditionCheckboxes = document.querySelectorAll(`input[name="${conditionCheckboxesName}"]`);

    function toggleCheckboxes() {
        const hasAccount = document.querySelector(`input[name="${statusRadiosName}"]:checked`).value === 'has_account';
        conditionCheckboxes.forEach(checkbox => {
            checkbox.disabled = !hasAccount;
            if (!hasAccount) {
                checkbox.checked = false;
            }
        });
        updateAllocation();
    }

    statusRadios.forEach(radio => radio.addEventListener('change', toggleCheckboxes));
    // Initial state setup on load
    toggleCheckboxes();
}

setupConditionalCheckboxes('scAccountStatus', 'scCondition');
setupConditionalCheckboxes('ocbc360AccountStatus', 'ocbc360Condition');


// Modal Logic
const disclaimerModal = document.getElementById('disclaimerModal');
const openDisclaimerBtn = document.getElementById('openDisclaimer');
const closeDisclaimerX = document.getElementById('closeDisclaimer');
const closeDisclaimerBtn = document.getElementById('closeDisclaimerBtn');

function toggleModal(show) {
    if (show) {
        disclaimerModal.classList.remove('hidden');
        disclaimerModal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        disclaimerModal.classList.add('hidden');
        disclaimerModal.classList.remove('flex');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

openDisclaimerBtn.addEventListener('click', () => toggleModal(true));
closeDisclaimerX.addEventListener('click', () => toggleModal(false));
closeDisclaimerBtn.addEventListener('click', () => toggleModal(false));

// Close on outside click
disclaimerModal.addEventListener('click', (e) => {
    if (e.target === disclaimerModal) toggleModal(false);
});

// Initial calculation on page load
window.addEventListener('load', updateAllocation);
