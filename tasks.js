const Tasks = {

init(){

document.getElementById("addTask").onclick=this.addTask
this.render()

},

addTask(){

const tasks=Storage.get("tasks")

tasks.push({

id:Date.now(),
title:taskTitle.value,
category:taskCategory.value,
priority:taskPriority.value,
deadline:taskDeadline.value,
completed:false

})

Storage.set("tasks",tasks)

Tasks.render()

},

toggle(id){

const tasks=Storage.get("tasks")

tasks.forEach(t=>{
if(t.id==id)t.completed=!t.completed
})

Storage.set("tasks",tasks)

Tasks.render()

},

delete(id){

let tasks=Storage.get("tasks")

tasks=tasks.filter(t=>t.id!=id)

Storage.set("tasks",tasks)

Tasks.render()

},

render(){

const list=document.getElementById("taskList")
list.innerHTML=""

const tasks=Storage.get("tasks")

tasks.forEach(t=>{

const li=document.createElement("li")

li.innerHTML=`
<b>${t.title}</b>
<br>
${t.category} | ${t.priority} | ${t.deadline}
<br>
<button onclick="Tasks.toggle(${t.id})">
${t.completed?"Undo":"Complete"}
</button>
<button onclick="Tasks.delete(${t.id})">Delete</button>
`

list.appendChild(li)

})

}

}
