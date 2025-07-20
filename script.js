function calculateScore() {
  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const savings = parseFloat(document.getElementById("savings").value);
  const resultBox = document.getElementById("result");

  if (isNaN(income) || isNaN(expenses) || isNaN(savings)) {
    resultBox.innerHTML = "❗ Please enter valid numbers in all fields.";
    return;
  }

  let score = (savings / income) * 100 - (expenses / income) * 50;
  score = Math.max(0, Math.min(100, Math.round(score)));

  let message = `💡 Your FinScore is <strong>${score}/100</strong><br><br>`;
  if (score > 80) {
    message += "✅ Excellent! You're financially strong 💰";
  } else if (score > 50) {
    message += "⚠️ Doing okay. Try to save more!";
  } else {
    message += "🚨 Warning! Improve your financial habits!";
  }

  resultBox.innerHTML = message;
}
