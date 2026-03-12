const Dashboard = {

render(){

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const habits = JSON.parse(localStorage.getItem("habits")) || [];
const goals = JSON.parse(localStorage.getItem("goals")) || [];

const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.done).length;

let percent = 0;

if(totalTasks > 0){
percent = Math.round((completedTasks / totalTasks) * 100);
}

/* UPDATE STATS */

document.getElementById("totalTasks").innerText = totalTasks;
document.getElementById("completedTasks").innerText = completedTasks;
document.getElementById("activeHabits").innerText = habits.length;
document.getElementById("goalCount").innerText = goals.length;

/* UPDATE PROGRESS CIRCLE */

const circle = document.querySelector(".circle");

circle.style.background =
`conic-gradient(#6366F1 ${percent}%, #1F2937 0)`;

document.querySelector(".percent").innerText = percent + "%";

}

};

document.addEventListener("DOMContentLoaded", () => {

Dashboard.render();

});
