/* FIREBASE GOOGLE LOGIN + CLOUD SYNC */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


/* FIREBASE CONFIG */

const firebaseConfig = {
  apiKey: "AIzaSyBeNU9vq7vxe3NM7wmg7i1nS0o7NEk7qzQ",
  authDomain: "villasistente.firebaseapp.com",
  projectId: "villasistente",
  storageBucket: "villasistente.firebasestorage.app",
  messagingSenderId: "242785175343",
  appId: "1:242785175343:web:22b89a051c219684d103da",
  measurementId: "G-J4ZTKXHGED"
};


/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.db = db;
window.auth = auth;

let currentUser = null;
window.currentUser = null;


/* GOOGLE LOGIN */

const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("googleLogin");

if(loginBtn){

loginBtn.onclick = async () => {

try{

const result = await signInWithPopup(auth, provider);

const user = result.user;

console.log("Logged in:", user);

}catch(error){

console.error("Login error:", error);

}

};

}


/* AUTH STATE */

onAuthStateChanged(auth, async (user) => {

if(user){

currentUser = user;
window.currentUser = user;

console.log("User logged in:", user.email);

await loadUserData();

}else{

console.log("User not logged in");

}

});


/* LOAD USER DATA */

async function loadUserData(){

if(!currentUser) return;

const ref = doc(db,"users",currentUser.uid);

const snapshot = await getDoc(ref);

if(snapshot.exists()){

const data = snapshot.data();

localStorage.setItem("tasks",JSON.stringify(data.tasks || []));
localStorage.setItem("habits",JSON.stringify(data.habits || []));
localStorage.setItem("goals",JSON.stringify(data.goals || []));
localStorage.setItem("reflections",JSON.stringify(data.reflections || []));

location.reload();

}else{

await setDoc(ref,{
tasks:[],
habits:[],
goals:[],
reflections:[]
});

}

}


/* SAVE DATA TO CLOUD */

window.syncCloud = async function(){

if(!currentUser) return;

const ref = doc(db,"users",currentUser.uid);

await updateDoc(ref,{

tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
habits: JSON.parse(localStorage.getItem("habits") || "[]"),
goals: JSON.parse(localStorage.getItem("goals") || "[]"),
reflections: JSON.parse(localStorage.getItem("reflections") || "[]")

});

console.log("Cloud sync complete");

};
