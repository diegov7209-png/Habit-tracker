const App = {

init(){

this.nav()
this.initCategories()

document.getElementById("menuToggle").onclick = () => {
document.getElementById("sidebar").classList.toggle("collapsed")
}

Tasks.init()
Habits.init()
Goals.init()

Dashboard.render()

document.getElementById("addCategory").onclick = this.addCategory
document.getElementById("saveReflection").onclick = this.saveReflection

this.renderCategories()
this.renderReflections()

},

nav(){

document.querySelectorAll(".sidebar button").forEach(btn => {

btn.onclick = () => {

document.querySelectorAll(".tab").forEach(t => {
t.classList.remove("active")
})

document.getElementById(btn.dataset.tab).classList.add("active")

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

const cats = Storage.get("categories")

const value = document.getElementById("newCategory").value

if(!value) return

cats.push(value)

Storage.set("categories",cats)

App.renderCategories()

document.getElementById("newCategory").value = ""

},

renderCategories(){

const cats = Storage.get("categories")

const taskCategory = document.getElementById("taskCategory")
const habitCategory = document.getElementById("habitCategory")

taskCategory.innerHTML = ""
habitCategory.innerHTML = ""

cats.forEach(c => {

taskCategory.innerHTML += `<option>${c}</option>`
habitCategory.innerHTML += `<option>${c}</option>`

})

const list = document.getElementById("categoryList")

list.innerHTML = ""

cats.forEach(c => {

list.innerHTML += `<li>${c}</li>`

})

},

saveReflection(){

const reflections = Storage.get("reflections")

reflections.push({

date:new Date().toLocaleDateString(),
accomplish:document.getElementById("reflectAccomplish").value,
energy:document.getElementById("reflectEnergy").value,
mood:document.getElementById("reflectMood").value,
block:document.getElementById("reflectBlock").value

})

Storage.set("reflections",reflections)

App.renderReflections()

document.getElementById("reflectAccomplish").value=""
document.getElementById("reflectEnergy").value=""
document.getElementById("reflectMood").value=""
document.getElementById("reflectBlock").value=""

},

renderReflections(){

const list = document.getElementById("reflectionHistory")

list.innerHTML = ""

const r = Storage.get("reflections")

r.forEach(e => {

list.innerHTML += `

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

document.addEventListener("DOMContentLoaded", () => {
App.init()
})
