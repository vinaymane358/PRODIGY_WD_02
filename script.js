
let timer;
let startTime;
let elapsedTime = 0;
let paused = true;
let lapCounter = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 100);
    }
}

function pauseTimer() {
    if (!paused) {
        paused = true;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
}

function resetTimer() {
    paused = true;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
    lapCounter = 1;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function recordLap() {
    const lapTime = display.textContent;
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
    lapCounter++;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
