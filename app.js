let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    li.className = habit.completed ? "completed" : "";
    li.innerHTML = `
      ${habit.name}
      <div>
        <button onclick="toggleHabit(${index})">✔</button>
        <button onclick="deleteHabit(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function addHabit() {
  const input = document.getElementById("habitInput");
  if (input.value.trim() === "") return;

  habits.push({
    name: input.value,
    completed: false
  });

  input.value = "";
  saveHabits();
  renderHabits();
}

function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;
  saveHabits();
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
}

renderHabits();