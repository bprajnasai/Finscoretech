document.addEventListener('DOMContentLoaded', () => {

    // --- Animation Logic ---
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    animatedElements.forEach(el => el.style.opacity = '0');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- Budget Calculator Functionality ---
    const budgetForm = document.getElementById('budget-form');
    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const incomeInput = document.getElementById('income-input');
            const expensesInput = document.getElementById('expenses-input');
            const remainingBudgetDiv = document.getElementById('remaining-budget');

            const income = parseFloat(incomeInput.value);
            const expenses = parseFloat(expensesInput.value);

            if (isNaN(income) || isNaN(expenses)) {
                remainingBudgetDiv.textContent = 'Please enter valid numbers.';
                return;
            }

            const remainingBudget = income - expenses;
            remainingBudgetDiv.textContent = `Your remaining budget is: $${remainingBudget.toFixed(2)}`;
            remainingBudgetDiv.style.color = remainingBudget >= 0 ? '#4CAF50' : '#F44336';
            
            // Render the budget chart after calculation
            renderBudgetChart(income, expenses);
        });
    }

    // --- AI Assistant Prompt Handler ---
    const aiForm = document.getElementById('ai-form');
    if (aiForm) {
        aiForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const aiPromptInput = document.getElementById('ai-prompt-input');
            const aiResponseDiv = document.getElementById('ai-response');
            
            aiResponseDiv.textContent = 'Thinking...';
            const userPrompt = aiPromptInput.value;

            setTimeout(() => {
                aiResponseDiv.innerHTML = "Thank you for your question! **For example**, a good way to start saving is by setting a small, manageable goal and automating a transfer to a separate savings account each payday.";
                aiPromptInput.value = '';
            }, 1500);
        });
    }

    // --- Goal Tracker ---
    const setGoalBtn = document.getElementById('setGoalBtn');
    if (setGoalBtn) {
        setGoalBtn.addEventListener('click', () => {
            const targetAmount = parseFloat(prompt("Enter your savings goal (e.g., 5000):"));
            const currentAmount = parseFloat(prompt("Enter your current savings:"));

            if (isNaN(targetAmount) || isNaN(currentAmount)) {
                alert("Please enter valid numbers.");
                return;
            }

            localStorage.setItem('targetGoal', targetAmount);
            localStorage.setItem('currentSavings', currentAmount);

            updateGoalProgress(currentAmount, targetAmount);
            alert(`Goal of $${targetAmount} set successfully!`);
        });
        
        const storedGoal = localStorage.getItem('targetGoal');
        const storedSavings = localStorage.getItem('currentSavings');
        if (storedGoal && storedSavings) {
            updateGoalProgress(parseFloat(storedSavings), parseFloat(storedGoal));
        }
    }

    function updateGoalProgress(currentAmount, targetAmount) {
        const progressBar = document.getElementById('goalProgressBar');
        const progressText = document.getElementById('goalProgressText');
        
        if (!progressBar || !progressText) return;

        const percentage = (currentAmount / targetAmount) * 100;
        progressBar.style.width = `${Math.min(percentage, 100)}%`;
        progressText.textContent = `${percentage.toFixed(0)}%`;
        
        if (currentAmount >= targetAmount) {
            progressBar.style.backgroundColor = '#2196F3';
            progressText.textContent = 'Goal Reached! 🎉';
        }
    }
    
    // --- Data Visualization (Chart.js) ---
    function renderBudgetChart(income, expenses) {
        const ctx = document.getElementById('budgetChart');
        if (!ctx) return;
        
        const remaining = Math.max(0, income - expenses);
        const data = {
            labels: ['Income', 'Expenses', 'Remaining'],
            datasets: [{
                data: [income, expenses, remaining],
                backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
                hoverOffset: 4
            }]
        };

        if (window.budgetChartInstance) {
            window.budgetChartInstance.destroy();
        }

        window.budgetChartInstance = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: { responsive: true }
        });
    }
    
    const scoreData = [
        { month: 'Jan', score: 65 },
        { month: 'Feb', score: 70 },
        { month: 'Mar', score: 72 },
        { month: 'Apr', score: 75 }
    ];
    
    function renderScoreTrend(data) {
        const ctx = document.getElementById('scoreTrendChart');
        if (!ctx) return;
        
        const labels = data.map(d => d.month);
        const scores = data.map(d => d.score);
        
        if (window.scoreTrendChartInstance) {
            window.scoreTrendChartInstance.destroy();
        }
        
        window.scoreTrendChartInstance = new Chart(ctx, {
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
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    if (document.getElementById('budgetChart')) {
        renderBudgetChart(5000, 3500); 
    }
    if (document.getElementById('scoreTrendChart')) {
        renderScoreTrend(scoreData);
    }
    
    // --- Financial Education ---
    const runQuizBtn = document.getElementById('runQuizBtn');
    if (runQuizBtn) {
        runQuizBtn.addEventListener('click', () => {
            const questions = [
                { question: "What is compound interest?", answer: "Interest on your savings and previously earned interest." },
                { question: "Which of these is a good financial habit?", answer: "Creating a budget." }
            ];

            let score = 0;
            questions.forEach((q, index) => {
                const userAnswer = prompt(`${index + 1}. ${q.question}\nEnter your answer:`);
                if (userAnswer && userAnswer.toLowerCase().includes(q.answer.toLowerCase())) {
                    alert("Correct!");
                    score++;
                } else {
                    alert(`Incorrect. The correct answer is: ${q.answer}`);
                }
            });
            alert(`Quiz finished! You scored ${score} out of ${questions.length}.`);
        });
    }

    const showGlossaryBtn = document.getElementById('showGlossaryBtn');
    if (showGlossaryBtn) {
        showGlossaryBtn.addEventListener('click', () => {
            const glossary = {
                "Budget": "A plan for how you'll spend and save money.",
                "Assets": "Items of value that you own, such as property or investments.",
                "Liabilities": "Debts or financial obligations, like loans or mortgages."
            };
            let glossaryText = "Financial Glossary:\n\n";
            for (const term in glossary) {
                glossaryText += `${term}: ${glossary[term]}\n\n`;
            }
            alert(glossaryText);
        });
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo. In a real app, the message would be sent to an email service.');
            contactForm.reset();
        });
    }

});