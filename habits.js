let habits = JSON.parse(localStorage.getItem("habits")) || [];

const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");

function renderHabits(){

if(!habitList) return;

habitList.innerHTML="";

habits.forEach((habit,i)=>{

const li=document.createElement("li");

li.innerHTML=`
<input type="checkbox" ${habit.done ? "checked":""} data-index="${i}">
<span>${habit.text}</span>
`;

habitList.appendChild(li);

});

localStorage.setItem("habits",JSON.stringify(habits));

if(typeof Dashboard !== "undefined"){
Dashboard.render();
}

}

if(addHabitBtn){

addHabitBtn.onclick=()=>{

const text=habitInput.value.trim();

if(!text)return;

habits.push({text,done:false});

habitInput.value="";

renderHabits();

};

}

habitList.onclick=(e)=>{

const index=e.target.dataset.index;

if(index!==undefined){

habits[index].done=!habits[index].done;

renderHabits();

}

};

renderHabits();
