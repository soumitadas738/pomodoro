let workTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60; // 5 minutes
let timeLeft = workTime;
let timer;
let isRunning = false;
let onBreak = false;

const timeDisplay = document.getElementById("time");
const statusText = document.getElementById("status-text");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        if (!onBreak) {
          onBreak = true;
          timeLeft = breakTime;
          statusText.textContent = "It’s Break Time!";
          startTimer();
        } else {
          onBreak = false;
          timeLeft = workTime;
          statusText.textContent = "Focus Time!";
        }
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resumeTimer() {
  if (!isRunning) {
    startTimer();
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  onBreak = false;
  timeLeft = workTime;
  statusText.textContent = "Focus Time!";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
