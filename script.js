document.getElementById("fin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const savings = parseFloat(document.getElementById("savings").value);
  const resultBox = document.getElementById("result");

  if (income < 0 || expenses < 0 || savings < 0 || isNaN(income) || isNaN(expenses) || isNaN(savings)) {
    resultBox.innerHTML = "🚫 Please enter valid, positive numbers in all fields.";
    return;
  }

  const score = Math.max(0, Math.min(100, Math.round((savings / income) * 100 - (expenses / income) * 50)));

  let message = `💡 <strong>Your FinScore is ${score}/100</strong><br><br>`;
  if (score > 80) {
    message += "✅ Amazing! You are financially rock-solid. 💰<br>📈 Tip: Start investing or build a passive income stream.";
  } else if (score > 50) {
    message += "⚠️ You're doing okay! Some savings, but scope to grow.<br>💡 Tip: Reduce small expenses and track them.";
  } else {
    message += "🚨 You're overspending or undersaving!<br>📉 Tip: Try using the 50-30-20 budgeting rule and save more.";
  }

  resultBox.innerHTML = message;
});
