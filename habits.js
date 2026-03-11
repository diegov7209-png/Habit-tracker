const Habits={

init(){

document.getElementById("addHabit").onclick=this.addHabit
this.render()

},

addHabit(){

const habits=Storage.get("habits")

habits.push({

id:Date.now(),
title:habitTitle.value,
category:habitCategory.value,
streak:0,
best:0,
history:{}

})

Storage.set("habits",habits)

Habits.render()

},

complete(id){

const habits=Storage.get("habits")
const today=new Date().toISOString().slice(0,10)

habits.forEach(h=>{

if(h.id==id){

if(!h.history[today]){

h.history[today]=true
h.streak++

if(h.streak>h.best)h.best=h.streak

}

}

})

Storage.set("habits",habits)

Habits.render()

},

render(){

const list=document.getElementById("habitList")
list.innerHTML=""

const habits=Storage.get("habits")

habits.forEach(h=>{

const li=document.createElement("li")

li.innerHTML=`
<b>${h.title}</b>
<br>
Streak: ${h.streak} | Best: ${h.best}
<br>
<button onclick="Habits.complete(${h.id})">
Complete Today
</button>
`

list.appendChild(li)

})

}

}
