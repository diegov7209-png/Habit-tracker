document.addEventListener("DOMContentLoaded", () => {

/* GOOGLE LOGIN */

const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("googleLogin").onclick = () => {

auth.signInWithPopup(provider);

};

/* AUTH STATE */

auth.onAuthStateChanged(user => {

if(user){

currentUser = user;

document.getElementById("loginScreen").style.display = "none";
document.getElementById("app").style.display = "block";

loadUserData();

}else{

document.getElementById("loginScreen").style.display = "flex";
document.getElementById("app").style.display = "none";

}

});

/* LOGOUT */

document.getElementById("logoutBtn").onclick = () => {

auth.signOut();

};

/* SIDEBAR NAV */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".sidebar button[data-page]");

navButtons.forEach(btn => {

btn.onclick = () => {

pages.forEach(p => p.classList.remove("active"));

document.getElementById(btn.dataset.page).classList.add("active");

};

});

});

/* LOAD USER DATA */

async function loadUserData(){

const doc = await db.collection("users").doc(currentUser.uid).get();

if(!doc.exists){

await db.collection("users").doc(currentUser.uid).set({

tasks:[],
habits:[],
goals:[],
categories:[],
reflections:[]

});

}

const data = (await db.collection("users").doc(currentUser.uid).get()).data();

localStorage.setItem("tasks",JSON.stringify(data.tasks));
localStorage.setItem("habits",JSON.stringify(data.habits));
localStorage.setItem("goals",JSON.stringify(data.goals));
localStorage.setItem("categories",JSON.stringify(data.categories));
localStorage.setItem("reflections",JSON.stringify(data.reflections));

Dashboard.render();

}
