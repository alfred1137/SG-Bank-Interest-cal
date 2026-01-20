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

// Use specific hex codes for Chart.js
const bankPieColors = {
    "UOB One": "#89b4fa",       // ctp-blue
    "UOB Stash": "#89dceb",      // ctp-sky
    "OCBC 360": "#f38ba8",       // ctp-red
    "SC": "#a6e3a1",            // ctp-green
    "DBS": "#eba0ac",           // ctp-maroon
    "CIMB": "#f9e2af",          // ctp-yellow
    "Unallocated": "#6c7086"     // ctp-overlay0
};

const formatCurrency = (amount) => {
    const formatted = new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(amount);
    return formatted.replace('$', 'S$');
};

const totalFundsInput = document.getElementById('totalFunds');
const allocationResultsDiv = document.getElementById('allocationResults');
const interestBreakdownDiv = document.getElementById('interestBreakdown');
const monthlyInterestDiv = document.getElementById('monthlyInterest');
const annualInterestDiv = document.getElementById('annualInterest');
const equivalentRateDiv = document.getElementById('equivalentRate');
const allocationPieChartCanvas = document.getElementById('allocationPieChart');
let pieChart;

function updateAllocationVisualizer(totalFunds, allocation) {
    if (pieChart) {
        pieChart.destroy();
    }
    if (totalFunds <= 0) return;

    const labels = [];
    const data = [];
    const backgroundColors = [];
    let allocatedFunds = 0;

    for (const bank in allocation) {
        if (allocation[bank] > 0) {
            labels.push(bankAccountNames[bank] || bank);
            data.push(allocation[bank]);
            backgroundColors.push(bankPieColors[bank] || '#6c7086');
            allocatedFunds += allocation[bank];
        }
    }

    const unallocatedFunds = totalFunds - allocatedFunds;
    if (unallocatedFunds > 1) { // Allow for rounding errors
        labels.push('Unallocated');
        data.push(unallocatedFunds);
        backgroundColors.push(bankPieColors['Unallocated']);
    }

    pieChart = new Chart(allocationPieChartCanvas, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: '#1e1e2e', // ctp-base
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += formatCurrency(context.parsed);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function updateAllocation() {
    const totalFunds = parseFloat(totalFundsInput.value);
    if (isNaN(totalFunds) || totalFunds < 0) {
        allocationResultsDiv.innerHTML = '<p class="text-ctp-error">Please enter a valid fund amount.</p>';
        interestBreakdownDiv.innerHTML = '';
        monthlyInterestDiv.textContent = formatCurrency(0);
        annualInterestDiv.textContent = `${formatCurrency(0)} / year`;
        equivalentRateDiv.textContent = 'Equivalent 0.00% p.a.';
        updateAllocationVisualizer(0, {});
        return;
    }

    // UOB One
    const uobToggle = document.getElementById('uobToggle').checked;
    let selectedUOBOneCondition = 'no_account';
    if (uobToggle) {
        const uobSpendToggle = document.getElementById('uobSpendToggle').checked;
        const uobGiro = document.querySelector('input[name="uobCondition"][value="giro"]').checked;
        const uobSalary = document.querySelector('input[name="uobCondition"][value="salary"]').checked;
        
        if (!uobSpendToggle) {
            selectedUOBOneCondition = 'no_account';
        } else {
            if (uobGiro && uobSalary) selectedUOBOneCondition = 'spend_salary_giro';
            else if (uobGiro) selectedUOBOneCondition = 'spend_giro_debit';
            else if (uobSalary) selectedUOBOneCondition = 'spend_salary_giro';
            else selectedUOBOneCondition = 'spend_only';
        }
    }

    // UOB Stash
    const uobStashToggle = document.getElementById('uobStashToggle').checked;
    let selectedUOBStashCondition = 'no_account';
    if (uobStashToggle) {
        const uobStashMabToggle = document.getElementById('uobStashMabToggle').checked;
        selectedUOBStashCondition = uobStashMabToggle ? 'maintain_balance' : 'base_rate';
    }

    // SC Bonus$aver
    const scToggle = document.getElementById('scToggle').checked;
    const selectedSCAccountStatus = scToggle ? 'has_account' : 'no_account';
    const selectedSCConditions = Array.from(document.querySelectorAll('input[name="scCondition"]:checked')).map(cb => cb.value);

    // OCBC 360
    const ocbc360Toggle = document.getElementById('ocbc360Toggle').checked;
    const selectedOCBC360AccountStatus = ocbc360Toggle ? 'has_account' : 'no_account';
    const selectedOCBC360Conditions = Array.from(document.querySelectorAll('input[name="ocbc360Condition"]:checked')).map(cb => cb.value);

    // DBS Multiplier
    const dbsToggle = document.getElementById('dbsToggle').checked;
    let selectedDBSCondition = 'no_account';
    if (dbsToggle) {
        const catCount = document.querySelector('input[name="dbsCatCount"]:checked').value;
        const volume = document.querySelector('input[name="dbsVolume"]:checked').value;
        selectedDBSCondition = `income_${catCount}_cat_${volume}`;
    }

    // CIMB FastSaver
    const cimbToggle = document.getElementById('cimbToggle').checked;
    const selectedCIMBCondition = cimbToggle ? 'has_account' : 'no_account';

    const allTiers = [
        ...getUOBOneTierSegments(selectedUOBOneCondition),
        ...getUOBStashTierSegments(selectedUOBStashCondition),
        ...getOCBC360TierSegments(selectedOCBC360AccountStatus, selectedOCBC360Conditions),
        ...getSCTierSegments(selectedSCAccountStatus, selectedSCConditions),
        ...getDBSTierSegments(selectedDBSCondition),
        ...getCIMBTierSegments(selectedCIMBCondition)
    ];

    const { allocation, totalMonthlyInterest, breakdown } = findOptimalAllocationAndInterest(totalFunds, allTiers);

    // Update Hero Section
    monthlyInterestDiv.textContent = formatCurrency(totalMonthlyInterest);
    const totalAnnualInterest = totalMonthlyInterest * 12;
    annualInterestDiv.textContent = `${formatCurrency(totalAnnualInterest)} / year`;
    if (totalFunds > 0) {
        const equivalentAnnualRate = (totalAnnualInterest / totalFunds) * 100;
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
                tierItem.className = 'interest-breakdown-item flex justify-between items-center py-2';
                const capText = tierData.capacity === Infinity ? "" : ` (up to ${formatCurrency(tierData.capacity)})`;
                tierItem.innerHTML = `
                    <div class="flex flex-col">
                        <span class="text-ctp-text font-medium text-sm">${tier} p.a.</span>
                        <span class="text-[10px] text-ctp-subtext uppercase tracking-wider">On ${formatCurrency(tierData.allocatedAmount)}${capText}</span>
                    </div>
                    <span class="font-mono text-ctp-text font-bold">${formatCurrency(tierData.interest)}</span>
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


// Add event listeners to all input elements
document.addEventListener('change', (event) => {
    if (event.target.tagName === 'INPUT') {
        if (event.target.name === 'dbsCatCount') {
            updateDBSRatePreviews();
        }
        updateAllocation();
    }
});
document.addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT' && (event.target.type === 'number' || event.target.type === 'text')) {
        updateAllocation();
    }
});

function updateDBSRatePreviews() {
    const catCount = document.querySelector('input[name="dbsCatCount"]:checked').value;
    const volumes = ['500_to_15000', '15000_to_30000', '30000_plus'];
    import('../config/bank-rates.js').then(({ BANK_CONFIG }) => {
        volumes.forEach((vol, index) => {
            const config = BANK_CONFIG.dbs.conditions[`income_${catCount}_cat_${vol}`];
            const previewEl = document.getElementById(`dbsRatePreview${index + 1}`);
            if (config && previewEl) {
                previewEl.textContent = `Cap ${formatCurrency(config.cap)}`;
            }
        });
    });
}

// Toggle visibility of conditional options
function setupConditionalVisibility(toggleId, conditionsId) {
    const toggle = document.getElementById(toggleId);
    const conditions = document.getElementById(conditionsId);
    if (toggle && conditions) {
        toggle.addEventListener('change', () => {
            conditions.classList.toggle('hidden', !toggle.checked);
            // Handle child inputs when hiding
            if (!toggle.checked) {
                // Uncheck child checkboxes except specific ones we want to keep
                conditions.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                    if (cb.id !== 'uobSpendToggle' && cb.id !== 'uobStashMabToggle') cb.checked = false;
                });
                // Uncheck radio buttons
                conditions.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
            }
            updateAllocation();
        });
        // Initial state
        conditions.classList.toggle('hidden', !toggle.checked);
    }
}

setupConditionalVisibility('uobToggle', 'uobConditions');
setupConditionalVisibility('uobStashToggle', 'uobStashConditions');
setupConditionalVisibility('scToggle', 'scConditions');
setupConditionalVisibility('ocbc360Toggle', 'ocbc360Conditions');
setupConditionalVisibility('dbsToggle', 'dbsConditionsWrapper');


// Modal Logic Helper
function setupModal(modalId, openBtnId, closeBtnId, closeXId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const closeX = document.getElementById(closeXId);

    if (!modal) return;

    const toggle = (show) => {
        if (show) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    };

    if (openBtn) openBtn.addEventListener('click', () => toggle(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
    if (closeX) closeX.addEventListener('click', () => toggle(false));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) toggle(false);
    });
}

// Setup Modals
setupModal('disclaimerModal', 'openDisclaimer', 'closeDisclaimerBtn', 'closeDisclaimer');
setupModal('aboutModal', 'openAbout', 'closeAboutBtn', 'closeAbout');

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

const applyTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        htmlElement.classList.remove('light');
    } else if (theme === 'light') {
        htmlElement.classList.add('light');
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.remove('dark', 'light');
    }
};

const toggleTheme = () => {
    const currentTheme = getStoredTheme();
    if (currentTheme === 'dark') {
        setStoredTheme('light');
        applyTheme('light');
    } else if (currentTheme === 'light') {
        setStoredTheme('dark');
        applyTheme('dark');
    } else {
        // If no theme stored, check system preference
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const newTheme = systemIsDark ? 'light' : 'dark';
        setStoredTheme(newTheme);
        applyTheme(newTheme);
    }
};

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// Initial theme application
const storedTheme = getStoredTheme();
if (storedTheme) {
    applyTheme(storedTheme);
}

// Initial calculation on page load
window.addEventListener('load', () => {
    updateDBSRatePreviews();
    updateAllocation();
});