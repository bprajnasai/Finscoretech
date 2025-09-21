// Function to run a financial literacy quiz
export function runQuiz() {
    const questions = [
        {
            question: "What is compound interest?",
            options: ["Interest on savings and previously earned interest.", "Interest on your income.", "A type of tax."],
            answer: 0
        },
        {
            question: "Which of these is a good financial habit?",
            options: ["Spending more than you earn.", "Creating a budget.", "Avoiding savings accounts."],
            answer: 1
        }
    ];

    let score = 0;
    questions.forEach((q, index) => {
        const userAnswer = prompt(`Question ${index + 1}: ${q.question}\n\n1. ${q.options[0]}\n2. ${q.options[1]}\n3. ${q.options[2]}`);
        
        if (userAnswer && parseInt(userAnswer) - 1 === q.answer) {
            alert("Correct!");
            score++;
        } else {
            alert("Incorrect.");
        }
    });

    alert(`Quiz finished! You scored ${score} out of ${questions.length}.`);
}

// You can add more functions here, like displaying a glossary
export function showFinancialGlossary() {
    const glossary = {
        "Budget": "A plan for how you'll spend and save money.",
        "Assets": "Items of value that you own.",
        "Liabilities": "Debts or financial obligations."
    };

    let glossaryText = "Financial Glossary:\n\n";
    for (const term in glossary) {
        glossaryText += `${term}: ${glossary[term]}\n\n`;
    }
    alert(glossaryText);
}