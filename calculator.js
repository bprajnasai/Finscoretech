// Get references to DOM elements
const finScoreForm = document.getElementById('finScoreForm');
const finScoreValue = document.getElementById('finScoreValue');
const scoreDisplay = document.getElementById('scoreDisplay');
const scoreCategory = document.getElementById('scoreCategory');
const resultsSection = document.getElementById('resultsSection');
const adviceList = document.getElementById('adviceList');

// Display elements
const displayIncome = document.getElementById('displayIncome');
const displaySavings = document.getElementById('displaySavings');
const displayDebt = document.getElementById('displayDebt');
const displayExpenses = document.getElementById('displayExpenses');
const displayRemaining = document.getElementById('displayRemaining');

// Listen for form submission
finScoreForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input values
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const monthlySavings = parseFloat(document.getElementById('monthlySavings').value);
    const totalDebt = parseFloat(document.getElementById('totalDebt').value);
    const emergencyFund = parseFloat(document.getElementById('emergencyFund').value);

    // Calculate the FinScore based on a simple weighted model
    // NOTE: A real FinScore would be much more complex, using credit data, etc.
    const savingsRate = (monthlySavings / monthlyIncome) || 0;
    const debtToIncomeRatio = (totalDebt / (monthlyIncome * 12)) || 0;
    const emergencyFundCoverage = (emergencyFund / (monthlyIncome - monthlySavings)) || 0;

    // Calculate score (higher is better)
    const score = (savingsRate * 50) + (emergencyFundCoverage * 30) + ((1 - Math.min(debtToIncomeRatio, 1)) * 20);

    // Cap the score at 100
    const finalScore = Math.min(score, 100).toFixed(0);

    // Display the results
    finScoreValue.textContent = finalScore;
    scoreDisplay.classList.remove('hidden');
    resultsSection.classList.remove('hidden');

    // Determine the score category
    let category, advice;
    if (finalScore >= 80) {
        category = 'Excellent';
        advice = [
            "You're in great financial shape! Consider investing your extra savings to grow your wealth.",
            "Review your budget periodically to ensure you stay on track.",
            "Look into diversifying your investments for long-term growth."
        ];
    } else if (finalScore >= 60) {
        category = 'Good';
        advice = [
            "You are on a solid path! Focus on increasing your savings rate to improve your score.",
            "Consider paying down high-interest debt to free up more income.",
            "Start a small, automated investment plan to build long-term wealth."
        ];
    } else if (finalScore >= 40) {
        category = 'Fair';
        advice = [
            "There's room for improvement. Focus on building your emergency fund and reducing debt.",
            "Create a detailed budget to identify areas where you can cut back on spending.",
            "Start a debt repayment plan, focusing on one debt at a time."
        ];
    } else {
        category = 'Needs Improvement';
        advice = [
            "It's time to take control of your finances. The first step is to create a budget.",
            "Focus on building a small emergency fund, even $500 can make a difference.",
            "Explore options for reducing your debt, such as debt consolidation or negotiation."
        ];
    }

    scoreCategory.textContent = category;
    scoreCategory.classList.remove('hidden');

    // Display advice
    adviceList.innerHTML = '';
    advice.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        adviceList.appendChild(li);
    });

    // Calculate and display budgeting info
    const expenses = monthlyIncome - monthlySavings;
    const remaining = monthlyIncome - expenses;
    displayIncome.textContent = `$${monthlyIncome.toFixed(2)}`;
    displaySavings.textContent = `$${monthlySavings.toFixed(2)}`;
    displayDebt.textContent = `$${totalDebt.toFixed(2)}`;
    displayExpenses.textContent = `$${expenses.toFixed(2)}`;
    displayRemaining.textContent = `$${remaining.toFixed(2)}`;
});