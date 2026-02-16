const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const list = document.getElementById("sessionList");
const totalEl = document.getElementById("total");

let seconds = 0;
let interval = null;
let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

displaySessions();

startBtn.addEventListener("click", ()=>{
    if(interval) return;

    interval = setInterval(()=>{
        seconds++;
        updateTimer();
    },1000);
});

stopBtn.addEventListener("click", ()=>{
    clearInterval(interval);
    interval = null;

    if(seconds > 0){
        sessions.push(seconds);
        localStorage.setItem("sessions", JSON.stringify(sessions));
        seconds = 0;
        updateTimer();
        displaySessions();
    }
});

function updateTimer(){
    let hrs = String(Math.floor(seconds/3600)).padStart(2,"0");
    let mins = String(Math.floor((seconds%3600)/60)).padStart(2,"0");
    let secs = String(seconds%60).padStart(2,"0");

    timerEl.textContent = `${hrs}:${mins}:${secs}`;
}

function displaySessions(){
    list.innerHTML = "";
    let total = 0;

    sessions.forEach(s=>{
        total += s;
        list.innerHTML += `<li>${s} sec</li>`;
    });

    totalEl.textContent = total;
}
