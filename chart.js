import Chart from 'chart.js/auto';

// Function to render a budget breakdown pie chart
export function renderBudgetChart(income, expenses) {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;

    const remaining = income - expenses;
    const data = {
        labels: ['Income', 'Expenses', 'Remaining'],
        datasets: [{
            data: [income, expenses, remaining],
            backgroundColor: [
                '#4CAF50', // Green for income
                '#F44336', // Red for expenses
                '#2196F3'  // Blue for remaining
            ],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Your Financial Breakdown'
                }
            }
        }
    });
}

// Function to render a financial score trend line chart
export function renderScoreTrend(data) {
    const ctx = document.getElementById('scoreTrendChart');
    if (!ctx) return;

    const labels = data.map(d => d.month);
    const scores = data.map(d => d.score);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Financial Score',
                data: scores,
                borderColor: '#4CAF50',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Your Finscore Progress Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100 // Assuming score is out of 100
                }
            }
        }
    });
}