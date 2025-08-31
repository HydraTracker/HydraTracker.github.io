let meals = 0;
let water = 0;
let streak = 0;
let countdownInterval;

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function logMeal() {
  if (meals < 3) {
    meals++;
    document.getElementById('mealCount').textContent = `Meals logged: ${meals}/3`;
    showToast('Meal logged!');
    checkStreak();
  }
}

function logWater() {
  if (water < 8) {
    water++;
    document.getElementById('waterCount').textContent = `Glasses of water: ${water}/8`;
    showToast('Water logged!');
    checkStreak();
  }
}

function checkStreak() {
  if (meals === 3 && water === 8) {
    streak++;
    document.getElementById('streak').textContent = `🔥 Streak: ${streak}`;
    meals = 0;
    water = 0;
    document.getElementById('mealCount').textContent = 'Meals logged: 0/3';
    document.getElementById('waterCount').textContent = 'Glasses of water: 0/8';
  }
}

function setReminder() {
  clearInterval(countdownInterval);
  let seconds = parseInt(document.getElementById('reminder').value);
  let countdownEl = document.getElementById('countdown');

  countdownInterval = setInterval(() => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    countdownEl.textContent = `Time left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;

    if (seconds <= 0) {
      clearInterval(countdownInterval);
      countdownEl.textContent = 'Reminder Ended!';
      if (document.getElementById('notifications').checked) {
        if (document.getElementById('notificationSound').checked) {
          document.getElementById('bell').play();
        }
        alert('⏰ Time is up!');
      }
    }
    seconds--;
  }, 1000);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
}

function showToast(message) {
  let toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.top = '10px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#333';
  toast.style.color = 'white';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.zIndex = '1000';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}
