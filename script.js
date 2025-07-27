
function calculateScore() {
  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const savings = parseFloat(document.getElementById("savings").value);
  const result = document.getElementById("result");

  if (income <= 0 || expenses < 0 || savings < 0 || isNaN(income) || isNaN(expenses) || isNaN(savings)) {
    result.innerHTML = "❗ Please enter valid positive values.";
    return;
  }

  let score = ((savings / income) * 100) - ((expenses / income) * 50);
  score = Math.max(0, Math.min(100, Math.round(score)));
  let message = `Your FinScore is <strong>${score}</strong>/100.`;

  if (score === 100) {
    message += "<br>🎉 Perfect score! You're a financial wizard! ✨";
    confettiCelebration();
  }

  result.innerHTML = message;
}

function confettiCelebration() {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();
}
