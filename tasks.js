let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function renderTasks(){

if(!taskList) return;

taskList.innerHTML = "";

tasks.forEach((task,index)=>{

const li = document.createElement("li");

li.className = "task-row";

li.innerHTML = `
<input type="checkbox" ${task.done ? "checked" : ""} data-index="${index}">
<span class="${task.done ? "completed":""}">${task.text}</span>
<button class="delete-btn" data-delete="${index}">✕</button>
`;

taskList.appendChild(li);

});

localStorage.setItem("tasks", JSON.stringify(tasks));

if(typeof Dashboard !== "undefined"){
Dashboard.render();
}

}

/* ADD TASK */

if(addTaskBtn){

addTaskBtn.onclick = () => {

const text = taskInput.value.trim();

if(!text) return;

tasks.push({
text,
done:false
});

taskInput.value = "";

renderTasks();

};

}

/* TASK CLICK EVENTS */

if(taskList){

taskList.onclick = (e) => {

const checkbox = e.target.dataset.index;
const deleteBtn = e.target.dataset.delete;

if(checkbox !== undefined){

tasks[checkbox].done = !tasks[checkbox].done;

renderTasks();

}

if(deleteBtn !== undefined){

tasks.splice(deleteBtn,1);

renderTasks();

}

};

}

renderTasks();
