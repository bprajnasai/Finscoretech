
let totalIncome = 0;
let totalExpense = 0;
let chart;

function addTransaction() {
  const income = parseFloat(document.getElementById("incomeInput").value) || 0;
  const expense = parseFloat(document.getElementById("expenseInput").value) || 0;

  totalIncome += income;
  totalExpense += expense;

  document.getElementById("totalIncome").textContent = totalIncome;
  document.getElementById("totalExpense").textContent = totalExpense;

  const score = calculateFinScore();
  document.getElementById("finScore").textContent = score;

  showTip(score);
  updateChart();
}

function calculateFinScore() {
  if (totalIncome === 0) return 0;
  const savings = totalIncome - totalExpense;
  let score = Math.round((savings / totalIncome) * 100);
  return Math.max(0, Math.min(score, 100));
}

function showTip(score) {
  const tip = document.getElementById("tip");
  if (score >= 80) {
    tip.textContent = "Great job! You're saving well! 💰";
  } else if (score >= 50) {
    tip.textContent = "You're doing okay, try to reduce expenses.";
  } else {
    tip.textContent = "Warning: High spending! Time to budget! ⚠️";
  }
}

function updateChart() {
  const ctx = document.getElementById("expenseChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [totalIncome, totalExpense],
        backgroundColor: ["#4caf50", "#f44336"]
      }]
    }
  });
}

function downloadReport() {
  const doc = new jsPDF();
  doc.text("FinScoreTech – Monthly Financial Report", 20, 20);
  doc.text(`Total Income: ₹${totalIncome}`, 20, 40);
  doc.text(`Total Expense: ₹${totalExpense}`, 20, 50);
  doc.text(`FinScore™: ${calculateFinScore()}`, 20, 60);
  doc.save("FinScoreTech_Report.pdf");
}
