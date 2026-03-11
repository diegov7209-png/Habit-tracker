const App={

init(){

this.nav()
this.initCategories()

Tasks.init()
Habits.init()
Goals.init()

Dashboard.render()

document.getElementById("addCategory").onclick=this.addCategory
document.getElementById("saveReflection").onclick=this.saveReflection

this.renderCategories()
this.renderReflections()

},

nav(){

document.querySelectorAll(".sidebar button")
.forEach(btn=>{

btn.onclick=()=>{

document.querySelectorAll(".tab")
.forEach(t=>t.classList.remove("active"))

document.getElementById(btn.dataset.tab)
.classList.add("active")

Dashboard.render()

}

})

},

initCategories(){

if(!localStorage.getItem("categories")){

Storage.set("categories",[
"Business",
"Health",
"Learning",
"Personal"
])

}

},

addCategory(){

const cats=Storage.get("categories")

cats.push(newCategory.value)

Storage.set("categories",cats)

App.renderCategories()

},

renderCategories(){

const cats=Storage.get("categories")

taskCategory.innerHTML=""
habitCategory.innerHTML=""

cats.forEach(c=>{

taskCategory.innerHTML+=`<option>${c}</option>`
habitCategory.innerHTML+=`<option>${c}</option>`

})

const list=document.getElementById("categoryList")
list.innerHTML=""

cats.forEach(c=>{

list.innerHTML+=`<li>${c}</li>`

})

},

saveReflection(){

const reflections=Storage.get("reflections")

reflections.push({

date:new Date().toLocaleDateString(),
accomplish:reflectAccomplish.value,
energy:reflectEnergy.value,
mood:reflectMood.value,
block:reflectBlock.value

})

Storage.set("reflections",reflections)

App.renderReflections()

},

renderReflections(){

const list=document.getElementById("reflectionHistory")
list.innerHTML=""

const r=Storage.get("reflections")

r.forEach(e=>{

list.innerHTML+=`

<div class="card">

<b>${e.date}</b>
<p>${e.accomplish}</p>
<p>Energy: ${e.energy}</p>
<p>Mood: ${e.mood}</p>
<p>Block: ${e.block}</p>

</div>

`

})

}

}
window.addEventListener("load", () => App.init());
