let goals = JSON.parse(localStorage.getItem("goals")) || [];

const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");

function renderGoals(){

goalList.innerHTML="";

goals.forEach((goal,i)=>{

const li=document.createElement("li");

li.innerHTML=`
${goal.text}
<button data-delete="${i}">X</button>
`;

goalList.appendChild(li);

});

localStorage.setItem("goals",JSON.stringify(goals));

if(typeof Dashboard !== "undefined"){
Dashboard.render();
}

}

addGoalBtn.onclick=()=>{

const text=goalInput.value.trim();

if(!text)return;

goals.push({text});

goalInput.value="";

renderGoals();

};

goalList.onclick=(e)=>{

const id=e.target.dataset.delete;

if(id!==undefined){

goals.splice(id,1);

renderGoals();

}

};

renderGoals();
