// Grabbing the elements
const clearAll = document.querySelector('.clear-all');
const amount = document.getElementById('mortgage-amount');
const term = document.getElementById('mortgage-term');
const interestRate = document.getElementById('interest-rate');
const repaymentRadio = document.getElementById('repayment-only');
const interestOnlyRadio = document.getElementById('interest-only');
const button = document.querySelector('.calculate-btn');
const resultSection = document.querySelector('.right-result');
const resultPlaceholder = document.querySelector('.results-placeholder');

// Result fields
const monthlyPaymentField = document.querySelector('.amount-result h1');
const totalRepaymentField = document.getElementById('r-payment');

// Calculation function
function calculateRepayments() {
    let mortgageAmount = parseFloat(amount.value);
    let mortgageTerm = parseFloat(term.value) * 12; // Convert years to months
    let interestRateValue = parseFloat(interestRate.value) / 100 / 12; // Monthly interest rate

    // Validation: check if any field is zero or empty
    if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRateValue) || mortgageAmount <= 0 || mortgageTerm <= 0 || interestRateValue <= 0) {
        // Highlight fields with missing values
        amount.style.borderColor = mortgageAmount > 0 ? '#e0e0e0' : 'red';
        term.style.borderColor = mortgageTerm > 0 ? '#e0e0e0' : 'red';
        interestRate.style.borderColor = interestRateValue > 0 ? '#e0e0e0' : 'red';
        return;
    }

    // Clear any previous errors
    amount.style.borderColor = '#e0e0e0';
    term.style.borderColor = '#e0e0e0';
    interestRate.style.borderColor = '#e0e0e0';

    let monthlyPayment, totalRepayment;

    if (repaymentRadio.checked) {
        // Full repayment calculation
        monthlyPayment = (mortgageAmount * interestRateValue * Math.pow(1 + interestRateValue, mortgageTerm)) /
        (Math.pow(1 + interestRateValue, mortgageTerm) - 1);
        totalRepayment = monthlyPayment * mortgageTerm;
    } else if (interestOnlyRadio.checked) {
        // Interest-only calculation
        monthlyPayment = mortgageAmount * interestRateValue; // Only interest paid each month
        totalRepayment = monthlyPayment * mortgageTerm + mortgageAmount; // Interest plus principal
    }

    // Update results on the right section
    monthlyPaymentField.textContent = `$${monthlyPayment.toFixed(2)}`;
    totalRepaymentField.textContent = `$${totalRepayment.toFixed(2)}`; 

    // Hide placeholder and show results
    resultPlaceholder.style.display = 'none';
    resultSection.style.display = 'block';
}

// Function to clear all inputs and reset the form
function clearForm() {
    amount.value = '';
    term.value = '';
    interestRate.value = '';
    repaymentRadio.checked = true;
    interestOnlyRadio.checked = false;
    resultPlaceholder.style.display = 'block';
    resultSection.style.display = 'none';

    // Reset input border colors
    amount.style.borderColor = '#e0e0e0';
    term.style.borderColor = '#e0e0e0';
    interestRate.style.borderColor = '#e0e0e0';
}

// Event listeners
button.addEventListener('click', calculateRepayments);
clearAll.addEventListener('click', clearForm);
