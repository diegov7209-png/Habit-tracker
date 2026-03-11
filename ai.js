const AI={

generate(){

const tasks=Storage.get("tasks")
const habits=Storage.get("habits")

let suggestions=[]

const urgent=tasks.filter(t=>!t.completed && t.priority==="High")

if(urgent.length>0){

suggestions.push(
"Focus on high priority tasks first."
)

}

const habitMiss=habits.filter(h=>h.streak===0)

if(habitMiss.length>0){

suggestions.push(
"Your habits need attention today."
)

}

const completed=tasks.filter(t=>t.completed).length

if(completed>5){

suggestions.push(
"Great productivity recently. Maintain momentum."
)

}

if(suggestions.length===0){

suggestions.push(
"Everything looks balanced. Keep executing."
)

}

return suggestions

},

render(){

const div=document.getElementById("ai-suggestions")

const s=this.generate()

div.innerHTML="<h3>AI Assistant</h3>"

s.forEach(t=>{

div.innerHTML+=`<div class="card">${t}</div>`

})

}

}
