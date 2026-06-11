// =========================
// THEME TOGGLE
// =========================

const themeToggle =
document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "light") {

  document.body.classList.add("light");

  themeToggle.innerHTML = "☀️";

}

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")) {

    localStorage.setItem("theme", "light");

    themeToggle.innerHTML = "☀️";

  }

  else {

    localStorage.setItem("theme", "dark");

    themeToggle.innerHTML = "🌙";

  }

});


// =========================
// PROFILE MENU
// =========================

const menuToggle =
document.getElementById("menuToggle");

const profileMenu =
document.getElementById("profileMenu");

menuToggle.addEventListener("click", () => {

  profileMenu.classList.toggle("active");

});


// =========================
// TASK SYSTEM
// =========================

const taskInput =
document.getElementById("taskInput");

const taskList =
document.getElementById("taskList");

const taskCount =
document.getElementById("taskCount");

const addTaskBtn =
document.getElementById("addTaskBtn");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


// RENDER TASKS

function renderTasks(){

  const taskList =
  document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const div = document.createElement("div");

    div.className = "task-item";

    div.innerHTML = `
      <span onclick="toggleTask(${index})">
        ${task.completed ? "✅" : "⬜"}
        ${task.text}
      </span>

      <button onclick="deleteTask(${index})">
        ❌
      </button>
    `;

    taskList.appendChild(div);

  });

}


// ADD TASK

let tasks = [];

function addTask(){

  const input =
  document.getElementById("taskInput");

  const taskText = input.value.trim();

  if(taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);

  saveTasks();

  renderTasks();

  input.value = "";
}


// DELETE TASK

function deleteTask(index) {

  tasks.splice(index, 1);

  renderTasks();

}


// BUTTON EVENT

addTaskBtn.addEventListener("click", addTask);


// ENTER KEY EVENT

taskInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter") {

    addTask();

  }

});


// INITIAL LOAD

renderTasks();


// =========================
// NOTES SYSTEM
// =========================

const notes =
document.getElementById("notes");

notes.value =
localStorage.getItem("notes") || "";

notes.addEventListener("keyup", () => {

  localStorage.setItem(
    "notes",
    notes.value
  );

});


// =========================
// GREETING SYSTEM
// =========================

const greeting =
document.getElementById("greeting");

const hour =
new Date().getHours();

if(hour < 12) {

  greeting.innerHTML =
  "Good Morning, Pratiksha ☀️";

}

else if(hour < 18) {

  greeting.innerHTML =
  "Good Afternoon, Pratiksha 🌤️";

}

else {

  greeting.innerHTML =
  "Good Evening, Pratiksha 🌙";

}


// =========================
// TIMER
// =========================

const startTimerBtn =
document.getElementById("startTimerBtn");

const timerDisplay =
document.getElementById("timer");

let time = 1500;

let timerRunning = false;

let countdown;


function startTimer() {

  if(timerRunning) return;

  timerRunning = true;

  countdown = setInterval(() => {

    const minutes =
    Math.floor(time / 60);

    const seconds =
    time % 60;

    timerDisplay.innerHTML =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    time--;

    if(time < 0) {

      clearInterval(countdown);

      timerRunning = false;

      alert("Focus Session Complete 🎉");

      time = 1500;

      timerDisplay.innerHTML = "25:00";

    }

  }, 1000);

}


startTimerBtn.addEventListener(
  "click",
  startTimer
);


// =========================
// RANDOM QUOTES
// =========================

const quotes = [

  "Stay focused. Stay growing. ✨",

  "Small progress is still progress 🚀",

  "Discipline creates success 💎",

  "Dream big. Start small 🌙",

  "Consistency beats motivation 🔥"

];

const randomQuote =
quotes[Math.floor(Math.random() * quotes.length)];

const heroText =
document.querySelector(".hero p");

if(heroText){

  heroText.innerHTML = randomQuote;

}
document
.getElementById("addTaskBtn")
.addEventListener("click", addTask);

function toggleTask(index){

  tasks[index].completed =
  !tasks[index].completed;

  saveTasks();

  renderTasks();
}

function saveTasks(){

  localStorage.setItem(
    "focusverseTasks",
    JSON.stringify(tasks)
  );
}

function loadTasks(){

  const saved =
  localStorage.getItem("focusverseTasks");

  if(saved){

    tasks = JSON.parse(saved);

    renderTasks();
  }
}

loadTasks();

console.log("JS Loaded Successfully");

let tasks = [];

const addBtn =
document.getElementById("addTaskBtn");

addBtn.addEventListener("click", addTask);

function addTask(){

  console.log("Task function running");

  const input =
  document.getElementById("taskInput");

  const taskText =
  input.value.trim();

  if(taskText === ""){
    return;
  }

  tasks.push(taskText);

  renderTasks();

  input.value = "";
}

function renderTasks(){

  const taskList =
  document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const div =
    document.createElement("div");

    div.className = "task-item";

    div.innerHTML = `
      ${task}
      <button onclick="deleteTask(${index})">
        ❌
      </button>
    `;

    taskList.appendChild(div);

  });

}

function deleteTask(index){

  tasks.splice(index, 1);

  renderTasks();
}