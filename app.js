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
  if (tab === "tasks") renderTasks();
  if (tab === "categories") renderCategories();
  if (tab === "dashboard") renderDashboard();
  if (tab === "habits") renderHabits();
  if (tab === "goals") renderGoals();
}

function renderDashboard() {
  document.getElementById("content").innerHTML = `
    <h2>Overview</h2>
    <div class="card">
      <p>Total Tasks: ${db.tasks.length}</p>
      <p>Completed Tasks: ${db.tasks.filter(t => t.completed).length}</p>
    </div>
  `;
}

function renderTasks() {
  let html = `
    <h2>Tasks</h2>
    <div class="card">
      <input id="taskTitle" placeholder="Task title">
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
        Category: ${db.categories.find(c => c.id == task.categoryId)?.name || ""}
        <br>
        ${task.deadline ? `Deadline: ${task.deadline}` : ""}
        <br>
        <button onclick="toggleTask(${task.id})">✔</button>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const categoryId = document.getElementById("taskCategory").value;
  const priority = document.getElementById("taskPriority").value;
  const deadline = document.getElementById("taskDeadline").value;

  if (!title) return;

  db.tasks.push({
    id: Date.now(),
    title,
    categoryId,
    priority,
    deadline,
    completed: false
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

function renderHabits() {
  document.getElementById("content").innerHTML =
    "<h2>Habits (Coming in Phase 2)</h2>";
}

function renderGoals() {
  document.getElementById("content").innerHTML =
    "<h2>Goals (Coming in Phase 2)</h2>";
}

switchTab("dashboard");
