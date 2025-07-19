function calculateScore() {
  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const savings = parseFloat(document.getElementById("savings").value);
  const resultBox = document.getElementById("result");

  // Check for valid inputs
  if (isNaN(income) || isNaN(expenses) || isNaN(savings)) {
    resultBox.innerHTML = "❗ Please enter valid numbers in all fields.";
    return;
  }

  // Basic scoring logic
  let score = (savings / income) * 100 - (expenses / income) * 50;
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Feedback message
  let message = `💡 Your FinScore is <strong>${score}/100</strong><br><br>`;
  if (score > 80) {
    message += "✅ Excellent! You are financially strong. Keep it up! 💰";
  } else if (score > 50) {
    message += "⚠️ You're doing okay, but try to improve your savings.";
  } else {
    message += "🚨 Warning! Reconsider your financial habits — reduce expenses or grow income.";
  }

  resultBox.innerHTML = message;
}

