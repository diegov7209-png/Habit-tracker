let db = JSON.parse(localStorage.getItem("executionOS")) || {
  categories: [
    { id: 1, name: "Home" },
    { id: 2, name: "Work" },
    { id: 3, name: "Personal" },
    { id: 4, name: "Health" },
    { id: 5, name: "Finance" }
  ],
  tasks: [],
  habits: [],
  goals: []
};

function saveDB() {
  localStorage.setItem("executionOS", JSON.stringify(db));
}

function switchTab(tab) {
  if (tab === "dashboard") renderDashboard();
  if (tab === "tasks") renderTasks();
  if (tab === "habits") renderHabits();
  if (tab === "goals") renderGoals();
  if (tab === "categories") renderCategories();
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function renderDashboard() {
  const totalTasks = db.tasks.length;
  const completedTasks = db.tasks.filter(t => t.completed).length;

  const habitCompletionsToday = db.habits.filter(h =>
    h.history && h.history[today()]
  ).length;

  document.getElementById("content").innerHTML = `
    <h2>Overview</h2>
    <div class="card">
      <p>Total Tasks: ${totalTasks}</p>
      <p>Completed Tasks: ${completedTasks}</p>
      <p>Habits Completed Today: ${habitCompletionsToday}</p>
    </div>
  `;
}

/* ===================== TASKS ===================== */

function renderTasks() {
  let html = `
    <h2>Tasks</h2>
    <div class="card">
      <input id="taskTitle" placeholder="Task title">
      <textarea id="taskNotes" placeholder="Notes"></textarea>

      <select id="taskCategory">
        ${db.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
      </select>

      <select id="taskPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <input type="date" id="taskDeadline">

      <button class="primary" onclick="addTask()">Add Task</button>
    </div>
  `;

  db.tasks.forEach(task => {
    html += `
      <div class="card priority-${task.priority} ${task.completed ? "completed" : ""}">
        <strong>${task.title}</strong><br>
        ${task.notes || ""}
        <br>
        Category: ${db.categories.find(c => c.id == task.categoryId)?.name}
        <br>
        ${task.deadline ? `Deadline: ${task.deadline}<br>` : ""}
        <button onclick="toggleTask(${task.id})">✔</button>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  if (!title) return;

  db.tasks.push({
    id: Date.now(),
    title,
    notes: document.getElementById("taskNotes").value,
    categoryId: document.getElementById("taskCategory").value,
    priority: document.getElementById("taskPriority").value,
    deadline: document.getElementById("taskDeadline").value,
    reminders: [],
    completed: false,
    createdAt: today()
  });

  saveDB();
  renderTasks();
}

function toggleTask(id) {
  const task = db.tasks.find(t => t.id === id);
  task.completed = !task.completed;
  saveDB();
  renderTasks();
}

/* ===================== HABITS ===================== */

function renderHabits() {
  let html = `
    <h2>Habits</h2>
    <div class="card">
      <input id="habitTitle" placeholder="Habit title">
      <select id="habitCategory">
        ${db.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
      </select>
      <button class="primary" onclick="addHabit()">Add Habit</button>
    </div>
  `;

  db.habits.forEach(habit => {
    const streak = calculateStreak(habit);
    html += `
      <div class="card">
        <strong>${habit.title}</strong>
        <br>
        🔥 Streak: ${streak}
        <br>
        <button onclick="completeHabit(${habit.id})">Mark Today</button>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

function addHabit() {
  const title = document.getElementById("habitTitle").value;
  if (!title) return;

  db.habits.push({
    id: Date.now(),
    title,
    categoryId: document.getElementById("habitCategory").value,
    history: {}
  });

  saveDB();
  renderHabits();
}

function completeHabit(id) {
  const habit = db.habits.find(h => h.id === id);
  habit.history[today()] = true;
  saveDB();
  renderHabits();
}

function calculateStreak(habit) {
  let streak = 0;
  let date = new Date();

  while (true) {
    const dateStr = date.toISOString().split("T")[0];
    if (habit.history[dateStr]) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else break;
  }

  return streak;
}

/* ===================== GOALS ===================== */

function renderGoals() {
  let html = `
    <h2>Goals</h2>
    <div class="card">
      <input id="goalTitle" placeholder="Goal title">
      <input type="date" id="goalTarget">
      <input type="number" id="goalProgress" placeholder="Progress %" min="0" max="100">
      <button class="primary" onclick="addGoal()">Add Goal</button>
    </div>
  `;

  db.goals.forEach(goal => {
    html += `
      <div class="card">
        <strong>${goal.title}</strong><br>
        Target: ${goal.targetDate}<br>
        Progress: ${goal.progress}%<br>
        <progress value="${goal.progress}" max="100"></progress>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

function addGoal() {
  const title = document.getElementById("goalTitle").value;
  if (!title) return;

  db.goals.push({
    id: Date.now(),
    title,
    targetDate: document.getElementById("goalTarget").value,
    progress: document.getElementById("goalProgress").value || 0
  });

  saveDB();
  renderGoals();
}

/* ===================== CATEGORIES ===================== */

function renderCategories() {
  let html = `
    <h2>Categories</h2>
    <div class="card">
      <input id="newCategory" placeholder="New category name">
      <button class="primary" onclick="addCategory()">Add</button>
    </div>
  `;

  db.categories.forEach(c => {
    html += `<div class="card">${c.name}</div>`;
  });

  document.getElementById("content").innerHTML = html;
}

function addCategory() {
  const name = document.getElementById("newCategory").value;
  if (!name) return;

  db.categories.push({ id: Date.now(), name });
  saveDB();
  renderCategories();
}

switchTab("dashboard");
