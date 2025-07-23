function calculateScore() {
  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const savings = parseFloat(document.getElementById("savings").value);
  const resultBox = document.getElementById("result");

  if (isNaN(income) || isNaN(expenses) || isNaN(savings)) {
    resultBox.innerHTML = "❗ Please enter valid numbers in all fields.";
    return;
  }

  if (income < 0 || expenses < 0 || savings < 0) {
    resultBox.innerHTML = "🚫 Negative values are not allowed. Please enter only positive numbers.";
    return;
  }

  let score = (savings / income) * 100 - (expenses / income) * 50;
  score = Math.max(0, Math.min(100, Math.round(score)));

  let message = `💡 Your FinScore is <strong>${score}/100</strong><br><br>`;
  if (score > 80) {
    message += "✅ Excellent! You are financially strong. Keep it up! 💰";
  } else if (score > 50) {
    message += "⚠️ You're doing okay, but try to improve your savings.";
  } else {
    message += "🚨 Warning! Reconsider your financial habits.";
  }

  resultBox.innerHTML = message;
}
