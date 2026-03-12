let reflections = JSON.parse(localStorage.getItem("reflections")) || [];

const reflectionText=document.getElementById("reflectionText");
const saveReflectionBtn=document.getElementById("saveReflection");
const reflectionHistory=document.getElementById("reflectionHistory");

function renderReflections(){

reflectionHistory.innerHTML="";

reflections.forEach(r=>{

const li=document.createElement("li");

li.innerText=r;

reflectionHistory.appendChild(li);

});

localStorage.setItem("reflections",JSON.stringify(reflections));

}

saveReflectionBtn.onclick=()=>{

const text=reflectionText.value.trim();

if(!text)return;

reflections.push(text);

reflectionText.value="";

renderReflections();

};

renderReflections();
