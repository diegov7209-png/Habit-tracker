const Goals={

init(){

document.getElementById("addGoal").onclick=this.addGoal
this.render()

},

addGoal(){

const goals=Storage.get("goals")

goals.push({

id:Date.now(),
title:goalTitle.value,
desc:goalDesc.value,
milestones:[]

})

Storage.set("goals",goals)

Goals.render()

},

addMilestone(id){

const text=prompt("Milestone")

const goals=Storage.get("goals")

goals.forEach(g=>{

if(g.id==id){

g.milestones.push({

title:text,
done:false

})

}

})

Storage.set("goals",goals)

Goals.render()

},

toggle(id,index){

const goals=Storage.get("goals")

goals.forEach(g=>{

if(g.id==id){

g.milestones[index].done=!g.milestones[index].done

}

})

Storage.set("goals",goals)

Goals.render()

},

render(){

const div=document.getElementById("goalList")
div.innerHTML=""

const goals=Storage.get("goals")

goals.forEach(g=>{

let html=`
<div class="card">
<h3>${g.title}</h3>
<p>${g.desc}</p>
<button onclick="Goals.addMilestone(${g.id})">Add Milestone</button>
`

g.milestones.forEach((m,i)=>{

html+=`
<div>
<input type="checkbox"
${m.done?"checked":""}
onclick="Goals.toggle(${g.id},${i})">
${m.title}
</div>
`

})

html+=`</div>`

div.innerHTML+=html

})

}

}
