let meals = 0;
let water = 0;
let streak = 0;
let reminderTimer;
let countdownInterval;

// Tab switching
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Meal and Water logging
function logMeal() {
  if (meals < 3) {
    meals++;
    document.getElementById("meal-count").innerText = meals;
    showPopup("Meal logged!");
  }
  checkStreak();
}

function logWater() {
  if (water < 8) {
    water++;
    document.getElementById("water-count").innerText = water;
    showPopup("Water logged!");
  }
  checkStreak();
}

function checkStreak() {
  if (meals === 3 && water === 8) {
    streak++;
    document.getElementById("streak").innerText = `🔥 Streak - ${streak}`;
    meals = 0;
    water = 0;
    document.getElementById("meal-count").innerText = meals;
    document.getElementById("water-count").innerText = water;
    showPopup("Daily streak increased!");
  }
}

// Reminders
function setReminder(minutes) {
  clearInterval(countdownInterval);
  clearTimeout(reminderTimer);

  let totalSeconds = minutes * 60;
  updateCountdown(totalSeconds);

  countdownInterval = setInterval(() => {
    totalSeconds--;
    updateCountdown(totalSeconds);
    if (totalSeconds <= 0) clearInterval(countdownInterval);
  }, 1000);

  reminderTimer = setTimeout(() => {
    if (document.getElementById("notifications").checked) {
      if (document.getElementById("notification-sound").checked) {
        document.getElementById("bell-sound").play();
      }
      showPopup("Reminder: Drink water / eat a meal!");
    }
  }, minutes * 60000);
}

function updateCountdown(seconds) {
  const countdownEl = document.getElementById("countdown");
  if (seconds <= 0) {
    countdownEl.innerText = "Reminder set!";
  } else {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    countdownEl.innerText = `Time left: ${m}m ${s}s`;
  }
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// Popup messages
function showPopup(message) {
  if (!document.getElementById("notifications").checked) return;

  const popup = document.createElement("div");
  popup.innerText = message;
  popup.className = "popup";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}
