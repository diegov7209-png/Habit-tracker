document.addEventListener("DOMContentLoaded",()=>{

const sidebar=document.getElementById("sidebar");
const toggle=document.getElementById("menuToggle");

toggle.onclick=()=>{

sidebar.classList.toggle("collapsed");

};

/* PAGE SWITCHING */

document.querySelectorAll(".sidebar button").forEach(btn=>{

btn.onclick=()=>{

const page=btn.dataset.page;

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active");
});

document.getElementById(page).classList.add("active");

};

});

});
