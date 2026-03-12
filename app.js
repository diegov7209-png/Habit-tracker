document.addEventListener("DOMContentLoaded", () => {

const pages = document.querySelectorAll(".page")
const navButtons = document.querySelectorAll(".sidebar button")

navButtons.forEach(btn => {

btn.onclick = () => {

pages.forEach(p => p.classList.remove("active"))

const target = document.getElementById(btn.dataset.page)

target.classList.add("active")

}

})

/* TASKS */

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

const taskInput = document.getElementById("taskInput")
const addTaskBtn = document.getElementById("addTask")
const taskList = document.getElementById("taskList")

function renderTasks(){

taskList.innerHTML=""

tasks.forEach((task,i)=>{

const li=document.createElement("li")

li.innerHTML=`
<input type="checkbox" ${task.done ? "checked":""}>
<span>${task.text}</span>
<button data-id="${i}">x</button>
`

taskList.appendChild(li)

})

localStorage.setItem("tasks",JSON.stringify(tasks))

}

addTaskBtn.onclick=()=>{

const text=taskInput.value.trim()

if(!text)return

tasks.push({text,done:false})

taskInput.value=""

renderTasks()

}

taskList.onclick=(e)=>{

const id=e.target.dataset.id

if(id){

tasks.splice(id,1)

renderTasks()

}

}

renderTasks()

})
