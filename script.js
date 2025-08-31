let meals = 0;
let water = 0;
let streak = 0;
let reminderTimer;
let countdownInterval;
let showPopups = true;
let dailyMealGoal = 3;
let dailyWaterGoal = 8;

if ('Notification' in window) {
  Notification.requestPermission();
}

document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

function logMeal() {
  if(meals<dailyMealGoal){meals++;document.getElementById("meal-count").innerText=meals;showPopupMessage("Meal logged!");}checkStreak();
}
function logWater() {
  if(water<dailyWaterGoal){water++;document.getElementById("water-count").innerText=water;showPopupMessage("Water logged!");}checkStreak();
}
function checkStreak() {
  if(meals===dailyMealGoal && water===dailyWaterGoal){
    streak++;document.getElementById("streak").innerText=`🔥 Streak - ${streak}`;
    meals=0;water=0;document.getElementById("meal-count").innerText=meals;document.getElementById("water-count").innerText=water;
    showPopupMessage("Daily streak increased!");sendNotification("Streak Update!", `Your streak is now ${streak}!`);
  }
}
function setReminder(minutes){
  clearInterval(countdownInterval);clearTimeout(reminderTimer);
  let totalSeconds=minutes*60;updateCountdown(totalSeconds);
  countdownInterval=setInterval(()=>{totalSeconds--;updateCountdown(totalSeconds);if(totalSeconds<=0)clearInterval(countdownInterval);},1000);
  reminderTimer=setTimeout(()=>{
    if(document.getElementById("notifications").checked){
      if(document.getElementById("notification-sound").checked){document.getElementById("bell-sound").play();}
      showPopupMessage("Reminder: Drink water / eat a meal!");sendNotification("HydraTrack Reminder","Time to drink water or eat a meal!");
    }
  },minutes*60000);
}
function updateCountdown(seconds){const countdownEl=document.getElementById("countdown");if(seconds<=0)countdownEl.innerText="Reminder set!";else countdownEl.innerText=`Time left: ${Math.floor(seconds/60)}m ${seconds%60}s`;}
function toggleTheme(){document.body.classList.toggle("dark");document.body.classList.toggle("light");}
function showPopupMessage(message){if(!document.getElementById("notifications").checked || !showPopups)return;const popup=document.createElement("div");popup.innerText=message;popup.className="popup";document.body.appendChild(popup);setTimeout(()=>popup.remove(),2000);}
function sendNotification(title,body){if('Notification' in window && Notification.permission==='granted'){new Notification(title,{body:body,icon:'icon.png'});}}
document.getElementById("show-popups").addEventListener("change",e=>{showPopups=e.target.checked;});
document.getElementById("reset-streak").addEventListener("click",()=>{streak=0;meals=0;water=0;document.getElementById("streak").innerText=`🔥 Streak - ${streak}`;document.getElementById("meal-count").innerText=meals;document.getElementById("water-count").innerText=water;showPopupMessage("Streak reset!");});
document.getElementById("daily-meal-goal").addEventListener("change",e=>{dailyMealGoal=parseInt(e.target.value);});
document.getElementById("daily-water-goal").addEventListener("change",e=>{dailyWaterGoal=parseInt(e.target.value);});
