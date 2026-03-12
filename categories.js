let categories = JSON.parse(localStorage.getItem("categories")) || [];

const categoryInput=document.getElementById("categoryInput");
const addCategoryBtn=document.getElementById("addCategory");
const categoryList=document.getElementById("categoryList");

function renderCategories(){

categoryList.innerHTML="";

categories.forEach(c=>{

const li=document.createElement("li");

li.innerText=c;

categoryList.appendChild(li);

});

localStorage.setItem("categories",JSON.stringify(categories));

}

addCategoryBtn.onclick=()=>{

const text=categoryInput.value.trim();

if(!text)return;

categories.push(text);

categoryInput.value="";

renderCategories();

};

renderCategories();
