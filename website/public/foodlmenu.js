// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js";
//import { getAnalytics } from "firebase/analytics";
//import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore-compat.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHSnODhZAlcuaEmOdrHgHt6s4wz1wc5pQ",
  authDomain: "restaurant-pos-47810.firebaseapp.com",
  projectId: "restaurant-pos-47810",
  storageBucket: "restaurant-pos-47810.appspot.com",
  messagingSenderId: "509910814482",
  appId: "1:509910814482:web:bedfe4bd55b264a4de2dcb",
  measurementId: "G-E4GN1V1HBK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = app.firestore();
const foodsCol = db.collection('foods');

var arr=Array(100).fill(0);
var most=[];
var foodstore=[];
var foodmenu=[];

var s = [];
var foodlist = [];
var total=0;

var backetList = [];

var orderList = [];
var foodname=[]
var foodmap=new Map();
var foodamount=new Map();
var set=false;

var checkincrease= Array(100).fill(0);
var checkdecrease= Array(100).fill(0);

function createFood(fname,fprice,cate,imgname) {
  let fooditem = document.createElement("div");
  fooditem.classList.add("group", "ani", "fooditem", "relative");
  let menuview = document.getElementsByClassName("menu-backet")[0];
  let fooditemcontent = `<a class="block relative h-48 rounded overflow-hidden">
<img
  class="food-img w-full h-48 object-cover"
  src="img/${cate}/${imgname}.jpg"
  alt="Image"
/>
</a>
<div class="food-menu-detail mt-2">
<h2 class="foodmenu text-gray-900 title-font text-lg font-bold">
  ${fname}
</h2>
<p class="text-xs mt-0.5">A delicious food made with 100% passion</p>
<p class="food-menu-price mt-0.5">$${fprice}</p>
<p class="text-xs text-green-600 opacity-70 mb-1 font-medium">
  *Available
</p>
</div>

<button
id="order"
class="  bg-red-400 w-full rounded-md mt-2 text-blue-50 font-medium  h-8 mb-2"
>
Order
</button>
<div class="info absolute top-4 p-1 rounded-sm right-4 text-white bg-gray-800 cursor-pointer">
  Info
</div>

`;
  fooditem.innerHTML = fooditemcontent;
  // if(cate=="french") {
  //   Frenchcategory.
  //   fooditem.classList.add("hidden")
  //   if(cate=="most") most.push(fooditem);
  // }
  if(cate!="most")fooditem.classList.add("hidden")
  let arr=[fooditem,cate]
  foodstore.push(arr);
  //console.log(foodstore)
  menuview.append(fooditem);
};

function addFoodList(name = "Food item", price = "100",src) {
  console.log("asd");
  let food = document.createElement("div");
  food.classList.add(
    "backet-food",
    "select-none",
    "flex",
    "flex-1",
    "items-center",
    "p-2",
    "border-t-2",
    "mb-2"
  );
  let backet = document.getElementsByClassName("backet")[0];
  var foodcontent = `
    <div class=" flex flex-col w-12 h-12 justify-center items-center  mr-4">
    <a href="#" class="block relative">
        <img alt="profil" src=${src}
            class="mx-auto object-cover rounded-full h-10 w-10 " />
    </a>
    </div>
    <div class="food-details flex-1  pl-1 mr-4">
    <div class="food-name font-medium text-lg ">
        ${name}
    </div>
    <div class="food-price text-gray-600  text-sm">
        ${price}
    </div>

    <div class="food-update w-full mt-1 flex flex-row items-center justify-around ">
        
        <button class="decrease btn">-</button>
        <div class="bg-white rounded  w-5/12  border-black border-dashed ">
            <p class="text-center text-sm">Amount: <span class="food-amount">1</span> </p>
        </div>
        <button class="increase  btn"> +</button>
    </div>

</div>
<button class=" delete-button hover:bg-red-400 hover:text-blue-50 bg-gray-500 w-6 h-6 rounded-md text-white font-medium mb-2">
                               X
</button>
    `;
  food.innerHTML = foodcontent;
  
  backet.append(food);
  addRemove();
  //updateTotal("plus")
  updateTotalTest();
}

function updateButton(event) {
  console.log('in updateButton()')
  let increaseButton = document.getElementsByClassName("increase");
  for (let i = 0; i < increaseButton.length; i++) {
    if(increaseButton[i].getAttribute('listener') !== 'true') {
      increaseButton[i].setAttribute('listener', 'true');
      increaseButton[i].addEventListener("click", function (event) {
        let par = event.target.parentElement;
        // let foodname=foodamount.parentElement;
        let foodamount = par.getElementsByClassName("food-amount")[0];
        let number = foodamount.innerText;
        foodamount.innerText = parseInt(number, 10) + 1;
        //updateTotal("plus")
        updateTotalTest()
      });
    }
  }



  let decreaseButton = document.getElementsByClassName("decrease");
  for (let i = 0; i < decreaseButton.length; i++) {
      if(decreaseButton[i].getAttribute('listener') !== 'true') {
        decreaseButton[i].setAttribute('listener', 'true');
        decreaseButton[i].addEventListener("click", function (event) {
          let par = event.target.parentElement;
          let foodamount = par.getElementsByClassName("food-amount")[0];
          let number = foodamount.innerText;
          
          foodamount.innerText = parseInt(number, 10) - 1 >=1 ?parseInt(number, 10)-1:1;
          // updateTotal("down")
          // let testing=par.parentElement.parentElement.parentElement.getElementsByClassName("delete-button")[0]
          //   testing.addEventListener('click',function(){
          //    par.parentElement.parentElement.remove()
          //    updateTotalTest();
          //   })
         
          updateTotalTest();
        });
        checkdecrease[i]=1;
      }
  }

}


function updateTotalTest(){
  let total=0
  let foodlist=document.getElementsByClassName("food-details");
  for(let i=0;i<foodlist.length;i++){
    // let fname=foodlist[i].getElementsByClassName("food-name")[0].innerText;
    let amount=foodlist[i].getElementsByClassName("food-amount")[0].innerText;
    let price=foodlist[i].getElementsByClassName("food-price")[0].innerText.slice(1)
    console.log(price)
    let totalprice= document.getElementsByClassName("total")[0].innerText;
    //let p=parseFloat(foodmap.get(fname).slice(1));
    let p=parseFloat(price)*parseFloat(amount);
    total+=p
    
  }
  document.getElementsByClassName("total")[0].innerText='$'+total;
}


function addRemove(){
  let p=document.getElementsByClassName("delete-button");
  for(let i=0;i<p.length;i++){
    p[i].addEventListener('click',function(event){
      let parent = event.target.parentElement;
      let details = parent.getElementsByClassName("food-details")[0];
      let name = details.getElementsByClassName("food-name")[0].innerText;
      let decreaseButton = details.getElementsByClassName("food-update")[0].getElementsByClassName("decrease")[0];
      let increaseButton = details.getElementsByClassName("food-update")[0].getElementsByClassName("increase")[0];
      foodmap.delete(name);
      decreaseButton.setAttribute('listener', 'false');
      increaseButton.setAttribute('listener', 'false');
      parent.remove();
      updateTotalTest();
    })
  }
}

// create menu view
foodsCol.get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    let data = doc.data();
    foodmenu.push([data.name, data.price, data.category]);
  })
  // sort foodmenu by category
  foodmenu.sort(function(a,b) {
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  });

  let count=0;
  let curr="";

  for(let i=0;i<foodmenu.length;i++){
    let [fname,fprice,cate]=foodmenu[i];
    if(i==0) curr=cate
    if(cate != curr){
      count=0
      curr=cate
    }
    let src=cate+count
    count++
    console.log(src);
    createFood(fname,fprice,cate,src);
  }

  s = document.querySelector("#split");
  foodlist = document.querySelector("#foodbacket");
  s.addEventListener("click", () => {
    if (foodlist.classList.contains("hidden")) {
      console.log("asd");
      document.querySelector("#fooditem").classList.add("col-span-8");
      document.querySelector("#fooditem").classList.remove("col-span-11");
      foodlist.classList.remove("hidden");
    } else {
      foodlist.classList.add("hidden");
      document.querySelector("#fooditem").classList.add("col-span-11");
      document.querySelector("#fooditem").classList.remove("col-span-8");
    }
    updateTotalTest();
  });

  let orderList = document.querySelectorAll("#order");
  for (let i = 0; i < orderList.length; i++) {
    orderList[i].addEventListener("click", function (event) {
      
      let but = event.target;
      let par = but.parentElement;
      let detail = par.getElementsByClassName("food-menu-detail")[0];
      
      let img = par.getElementsByClassName("food-img")[0];
      console.log(img.src.slice(21))
      let name = detail.getElementsByClassName("foodmenu")[0].innerText;
      let price = detail.getElementsByClassName("food-menu-price")[0].innerText;
      if(!foodmap.has(name)){
        backetList.push(0);
        foodmap.set(name,price);
        //console.log(img.src);
        addFoodList(name, price,img.src.slice(21));
        
        updateButton();
        
      }else{
        //foodamount.set(name,foodamount.get(name)+1);
        let foodlist=document.getElementsByClassName("food-details");
        for(let ob of foodlist){
          let obname =ob.getElementsByClassName("food-name")[0];
          if(name==obname.innerText){
            let amount =ob.getElementsByClassName("food-amount")[0];
            amount.innerText=parseInt(amount.innerText)+1;
          }
        }
      }
      
      
      // console.log(name);
      // console.log(price);
      // updateTotal("plus");
      // document.querySelector("#foodbacketamount").innerText = backetList.length;
      updateTotalTest()

    });
  }

  let cursor=document.getElementsByClassName("info")
  for(let i=0;i<cursor.length;i++){
    cursor[i].addEventListener('click',function(){
      
     document.getElementsByClassName("info-view")[0].classList.remove("hidden");
      
    })
  }
});

const filter=(val)=>{
  let t =document.getElementsByClassName("title")[0];
  if(val=="most"){
    t.innerText="Most Popular";
  } else if(val=="french"){
    t.innerText="French Food";
  }else if(val=="italian"){
    t.innerText="Italian Food";
  }else if(val=="seafood"){
    t.innerText="Seafood Food";
  }else if(val=="Desert"){
    t.innerText="Desert";
  }
  for(let [fdiv,cate] of foodstore){
    if(cate==val){
      //console.log(cate)
      fdiv.classList.remove("hidden");
    }else fdiv.classList.add("hidden");
  }
}
let frenchbutton=document.getElementsByClassName("french")[0]
frenchbutton.addEventListener('click',function (){
  filter("french");
});
let mostbutton=document.getElementsByClassName("most")[0]
mostbutton.addEventListener('click',function(){
  filter("most");
})

let italianbutton=document.getElementsByClassName("italian")[0]
italianbutton.addEventListener('click',function (){
  filter("italian");
});
let seafoodbutton=document.getElementsByClassName("seafood")[0]
seafoodbutton.addEventListener('click',function (){
  filter("seafood");
});
