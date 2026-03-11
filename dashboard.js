const Dashboard={

render(){

const tasks=Storage.get("tasks")
const habits=Storage.get("habits")
const goals=Storage.get("goals")

const totalTasks=tasks.length
const completed=tasks.filter(t=>t.completed).length

let habitRate=0

habits.forEach(h=>{
habitRate+=h.streak
})

const cards=document.getElementById("dashboard-cards")

cards.innerHTML=`

<div class="dashboard-card">
<h3>${totalTasks}</h3>
<p>Total Tasks</p>
</div>

<div class="dashboard-card">
<h3>${completed}</h3>
<p>Completed</p>
</div>

<div class="dashboard-card">
<h3>${habits.length}</h3>
<p>Active Habits</p>
</div>

<div class="dashboard-card">
<h3>${goals.length}</h3>
<p>Goals</p>
</div>

`

AI.render()

}

}
