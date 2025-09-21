// Function to update the progress bar and display
export function updateGoalProgress(currentAmount, targetAmount) {
    const progressBar = document.getElementById('goalProgressBar');
    const progressText = document.getElementById('goalProgressText');
    
    if (!progressBar || !progressText) return;

    const percentage = (currentAmount / targetAmount) * 100;
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
    progressText.textContent = `${percentage.toFixed(0)}%`;

    if (currentAmount >= targetAmount) {
        alert('Congratulations! You have reached your goal!');
    }
}

// Function to set a new goal
export function setGoal() {
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
}