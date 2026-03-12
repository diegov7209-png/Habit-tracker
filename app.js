document.addEventListener("DOMContentLoaded", () => {

/* SIDEBAR NAVIGATION */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".sidebar button");

navButtons.forEach(btn => {

btn.onclick = () => {

pages.forEach(p => p.classList.remove("active"));

const target = document.getElementById(btn.dataset.page);

if(target){
target.classList.add("active");
}

};

});

/* SIDEBAR COLLAPSE */

const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggleSidebar");

if(toggle){

toggle.onclick = () => {

sidebar.classList.toggle("collapsed");

};

}

/* LOAD DASHBOARD */

if(typeof Dashboard !== "undefined"){
Dashboard.render();
}

});
