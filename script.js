// This script will handle logic for both the score and tips pages.

// Logic for the FinScore Calculator and Pie Chart (on score.html)
if (document.getElementById('finscore-form')) {
    const form = document.getElementById('finscore-form');
    const resultSection = document.getElementById('result-section');
    const scoreDisplay = document.getElementById('score-display');
    const financialChartCtx = document.getElementById('financial-chart').getContext('2d');
    const personalTipsList = document.getElementById('personal-tips-list');
    
    let myChart; // Variable to hold the chart instance

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const salary = parseFloat(document.getElementById('salary').value);
        const expenses = parseFloat(document.getElementById('expenses').value);
        const savings = parseFloat(document.getElementById('savings').value);

        // Simple Finscore Calculation (out of 100)
        const savingsRatio = Math.min(savings / (0.2 * salary), 1);
        const expenseRatio = Math.min(1 - (expenses / (0.5 * salary)), 1);
        const remainingRatio = Math.min((salary - expenses - savings) / (0.3 * salary), 1);

        const finscore = Math.round((savingsRatio * 50) + (expenseRatio * 30) + (remainingRatio * 20));

        // Display the score
        scoreDisplay.textContent = `Your Finscore: ${finscore}/100`;
        resultSection.classList.remove('hidden');

        // Generate dynamic tips based on score
        personalTipsList.innerHTML = ''; // Clear previous tips
        const tips = getTipsByScore(finscore);
        tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            personalTipsList.appendChild(li);
        });

        // Update or create the pie chart
        if (myChart) {
            myChart.destroy(); // Destroy the old chart instance
        }
        myChart = new Chart(financialChartCtx, {
            type: 'pie',
            data: {
                labels: ['Expenses', 'Savings', 'Remaining'],
                datasets: [{
                    data: [expenses, savings, salary - expenses - savings],
                    backgroundColor: [
                        '#dc3545', // Red
                        '#28a745', // Green
                        '#ffc107'  // Yellow
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    });

    // Function to get tips based on the calculated Finscore
    function getTipsByScore(score) {
        if (score >= 80) {
            return [
                "Excellent! Your finances are in great shape. Consider increasing your savings or investing a portion of your income.",
                "You're a financial pro! Look into diversifying your investments for long-term growth.",
                "Keep up the great work! Review your financial goals and set new milestones."
            ];
        } else if (score >= 50) {
            return [
                "Good start! Focus on reducing discretionary expenses.",
                "Create a detailed budget to identify areas where you can save more.",
                "Automate your savings to make them a priority each month."
            ];
        } else {
            return [
                "Time to take action! Focus on reducing your debt and tracking every expense.",
                "Talk to a financial advisor to create a personalized plan.",
                "Cut back on non-essential spending to improve your cash flow."
            ];
        }
    }
}

// Logic for the AI Chatbot (on tips.html)
if (document.getElementById('chat-form')) {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, 'user-message');
            chatInput.value = '';
            // Get a response from the "AI"
            setTimeout(() => {
                const botResponse = getChatbotResponse(userMessage);
                appendMessage(botResponse, 'bot-message');
            }, 1000); // Simulate a delay
        }
    });

    function appendMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', className);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        // Scroll to the bottom of the chat window
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getChatbotResponse(userText) {
        const lowerText = userText.toLowerCase();

        if (lowerText.includes('budget')) {
            return "A budget is a plan for your money. It helps you track your income and expenses so you can meet your financial goals.";
        } else if (lowerText.includes('saving') || lowerText.includes('savings')) {
            return "To save money, try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.";
        } else if (lowerText.includes('investing') || lowerText.includes('invest')) {
            return "Investing is putting your money to work. Start by researching low-cost index funds or talking to a financial expert.";
        } else if (lowerText.includes('debt') || lowerText.includes('loan')) {
            return "Focus on paying off high-interest debt first. The 'snowball' and 'avalanche' methods are popular strategies.";
        } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
            return "Hello there! How can I help you with your financial questions?";
        } else {
            return "I'm sorry, I don't have information on that topic. Please ask me a question about budgeting, saving, or investing.";
        }
    }
}