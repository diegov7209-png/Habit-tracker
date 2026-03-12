const Dashboard = {

render(){

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const habits = JSON.parse(localStorage.getItem("habits")) || [];
const goals = JSON.parse(localStorage.getItem("goals")) || [];

const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.done).length;
const activeHabits = habits.length;
const goalCount = goals.length;

let completionRate = 0;

if(totalTasks > 0){
completionRate = Math.round((completedTasks / totalTasks) * 100);
}

/* UPDATE DASHBOARD NUMBERS */

const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const activeHabitsEl = document.getElementById("activeHabits");
const goalCountEl = document.getElementById("goalCount");

if(totalTasksEl) totalTasksEl.innerText = totalTasks;
if(completedTasksEl) completedTasksEl.innerText = completedTasks;
if(activeHabitsEl) activeHabitsEl.innerText = activeHabits;
if(goalCountEl) goalCountEl.innerText = goalCount;

/* UPDATE PROGRESS CIRCLE */

const circle = document.querySelector(".circle");

if(circle){

circle.style.background =
`conic-gradient(#6366F1 ${completionRate}%, #1F2937 0)`;

const percent = circle.querySelector(".percent");

if(percent){
percent.innerText = completionRate + "%";
}

}

}

};
