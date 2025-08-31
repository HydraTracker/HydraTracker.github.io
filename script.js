let meals = 0;
let water = 0;
let streak = 0;
let reminderTimeout;
let countdownInterval;

function logMeal() {
  if (meals < 3) {
    meals++;
    document.getElementById('meals-count').innerText = meals;
    alert('Meal logged!');
    checkStreak();
  }
}

function logWater() {
  if (water < 8) {
    water++;
    document.getElementById('water-count').innerText = water;
    alert('Water logged!');
    checkStreak();
  }
}

function checkStreak() {
  if (meals === 3 && water === 8) {
    streak++;
    document.getElementById('streak').innerText = streak;
    meals = 0;
    water = 0;
    document.getElementById('meals-count').innerText = meals;
    document.getElementById('water-count').innerText = water;
    alert('Streak increased!');
  }
}

function setReminder() {
  clearTimeout(reminderTimeout);
  clearInterval(countdownInterval);
  let time = parseInt(document.getElementById('reminder-time').value);
  let countdownDisplay = document.getElementById('countdown');
  let remaining = time;

  countdownDisplay.innerText = formatTime(remaining);
  countdownInterval = setInterval(() => {
    remaining--;
    countdownDisplay.innerText = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  reminderTimeout = setTimeout(() => {
    let notifications = document.getElementById('notifications').checked;
    let soundEnabled = document.getElementById('notification-sound').checked;
    if (notifications) {
      alert('Reminder: Time is up!');
      if (soundEnabled) {
        console.log('Bell sound would play here.');
      }
    }
  }, time * 1000);
}

function formatTime(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function toggleTheme() {
  let body = document.body;
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }
}

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(button.getAttribute('data-tab')).classList.add('active');
  });
});
