const typingText = document.getElementById("typingText");
const phrases = ["💰 Smart Budgeting", "📊 Instant FinScore", "🚀 Your Money Guide"];
let i = 0, j = 0, isDeleting = false;

function typeLoop() {
  if (!typingText) return;
  const current = phrases[i];
  typingText.textContent = current.substring(0, j);
  if (!isDeleting) {
    j++;
    if (j === current.length + 1) {
      isDeleting = true;
      setTimeout(typeLoop, 1000);
      return;
    }
  } else {
    j--;
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 60 : 100);
}
typeLoop();
