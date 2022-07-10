const timer = document.querySelector('.timer');
const power = document.querySelector('.power');
const settings = document.querySelector('.settings');

const inputTime = document.querySelector('.inputTime');
const setTime = document.querySelector('.setTime');

const getSeconds = (data) =>{
  let matchTimestr = timer.innerHTML.trim().match(/\d+/g);
  let matchTimeNum = matchTimeStr.map((digit) => parseInt(digit, 10));
  let seconds = mathTimeNum
  .map((elem, idx) =>{
    let sec = 0;
    if(idx === 0){
      sec += elem * 60;
    } else if (idx ===1){
      sec += elem;
    }
    return sec;
  })
  .reduce((acc, curr) => acc + curr,0);
  return seconds;
};

const countTime = () =>{
  timeInSeconds = getSeconds ();
  
  let timerId = setInterval(function(){
    let seconds = timeInSeconds % 60;
    let minutes = (timeInSeconds / 60) % 60;
    
    if(timeInSeconds <= 0){
      clearInterval(timerId);
      timer.innerHTML =  `<span class="elapsed">Time elapsed.<br>Set new time.</span>`;
    } else {
      if(seconds.toString().length < 2){
        seconds = `0${seconds}`;
      }
      let strTimer = `${Math.trunc(minutes)}:${seconds}`;
      timer.innerHTML = strTimer;
    }
  --timeInSeconds;
}, 1000);
  power.removeEventListener('click',countTime);
};

document.addEventListener('click',(event) =>{
  if(event.target.className=== 'settings'){
    inputTime.classList.add('active');
  } else if(event.target.className==='close'){
    inputTime.classList.remove('active');
  }
});

setTime.addEventListener('change',(event) =>{
  let newTime = parseInt(event.target.value,10);
  
  if(newTime.toString().length < 2){
    timer.innerHTML = `<span>0${newTime}:00</span>`;
  } else {
    timer.innerHTML = `<span>${newTime}:00</span>`;
  }
  
  setTime.value = '';
  inputTime.classList.remove('active');
});
/* jshint undef: true, unused: false, evil: true */
/* globals document, window, setInterval, clearInterval */
var clock = document.getElementById('clock');
var audio = document.getElementById('audio');
var statusPara = document.getElementById('status');
var buttons = document.getElementsByTagName("button");
var toggleBtn = document.getElementById('timer-toggle');
var resetBtn = document.getElementById("timer-reset");
var sessionTime = document.getElementById('session-time');
var breakTime = document.getElementById('break-time');
var sessionInSeconds = parseInt(sessionTime.value) * 60;
var breakinSeconds = parseInt(breakTime.value) * 60;

function formatTime(time) {
    var seconds = time % 60;
    var mins = (time - seconds) / 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return mins + ":" + seconds;
}

function updateSessionAndBreak() {
    sessionInSeconds = parseInt(sessionTime.value) * 60;
    breakinSeconds = parseInt(breakTime.value) * 60;
}


/**
  * @param {string} targetId
  * @param {integer} increment_value can be 1 for increasing or -1 for decreasing
  */
function updateCounter(targetId, increment_value) {
    var currentVal, newVal;
    var target = document.getElementById(targetId);
    currentVal = parseInt(target.value);

    if (currentVal <= 0 || currentVal >= 60) {
        return false;
    }

    newVal = currentVal + increment_value; // no need to parseString here
    target.value = newVal;

    updateSessionAndBreak();

    if (targetId === "session-time") {
        clock.innerHTML = formatTime(newVal * 60);
    }
}

function stopTimer() {
    for (var i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}

function startTimer() {
    statusPara.innerHTML = "Time to Work";
    var sessionStart = setInterval(sessionTimer, 1000);
    var breakStart;

    function sessionTimer() {
        if (sessionInSeconds >= 1) {
            sessionInSeconds--;
            clock.innerHTML = formatTime(sessionInSeconds);
        } else if (sessionInSeconds <= 0) {
            clearInterval(sessionStart);
            audio.play();
            statusPara.innerHTML = "Enjoy your Break";
            breakStart = setInterval(breakTimer, 1000);
        }
    }

    function breakTimer() {
        if (breakinSeconds >= 1) {
            breakinSeconds--;
            clock.innerHTML = formatTime(breakinSeconds);
        } else if (breakinSeconds <= 0) {
            clearInterval(breakStart);
            audio.load();
            updateSessionAndBreak();
            startTimer();
        }
    }

}

var musicBtn = document.getElementById("music");
musicBtn.onclick = function () {
    if (musicBtn.classList.contains("fa-volume-up")) {
        musicBtn.classList.remove("fa-volume-up");
        musicBtn.classList.add("fa-volume-off");
        if (statusPara.innerHTML === "Enjoy your Break") {
            audio.pause();
        }
    } else {
        musicBtn.classList.remove("fa-volume-off");
        musicBtn.classList.add("fa-volume-up");
        if (statusPara.innerHTML === "Enjoy your Break") {
            audio.play();
        }
    }
};

toggleBtn.onclick = function () {
    var i;
    if (toggleBtn.innerHTML === "Stop Timer") {
        toggleBtn.innerHTML = "Start Timer";
        stopTimer();
        for (i = 0; i <= 3; i++) {
            buttons[i].disabled = false;
        }
        audio.pause();
        audio.load();
    } else {
        startTimer();
        toggleBtn.innerHTML = "Stop Timer";
        for (i = 0; i <= 3; i++) {
            buttons[i].disabled = true;
        }
    }
};

resetBtn.onclick = function () {
    if (toggleBtn.innerHTML === "Stop Timer") {
        toggleBtn.click();
    }
    document.getElementById('session-time').value = "25";
    document.getElementById('break-time').value = "5";
    clock.innerHTML = "25:00";
    updateSessionAndBreak();

};