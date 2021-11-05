
let most=[];
let foodstore=[]
foodmenu=[
  ["The Noddel Italian","16","most"],
  ["The crab soup","16","most"],
  ["The Catelyzer","16","most"],
  ["The Egg","16","most"],
  ["Pizaa Aloha","12","most"],
  ["Pizaa Blackninja","12","most"],
  ["Fresh combo","13","most"],
  ["french1","16","french"],
  ["french2","15","french"],
  ["french3","14","french"],
  ["Pizaa Aloha","12","italian"],
  ["Pizaa Blackninja","12","italian"],
  ["Pasta","14","italian"],
  ["Pancake","16","italian"],
  ["Pizaa Magic","13","italian"],
  ["Fresh meal","13","seafood"],
  ["Fresh Combo","13","seafood"],
  ["Fresh Shirmp","13","seafood"],
  ["Fresh Oyester","13","seafood"],
  ["Fresh Combo2","14","seafood"],
]

function createMenuView(){
  let count=0
  let curr=""
  for(let i=0;i<foodmenu.length;i++){
    let [fname,fprice,cate]=foodmenu[i];
    if(i==0) curr=cate
    if(cate != curr){
      count=0
      curr=cate
    }
    let src=cate+count
    count++
    //console.log(src);
    createFood(fname,fprice,cate,src);
  }
}
createMenuView();
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
<p class="text-xs text-red-500 opacity-70 mb-1 font-medium">
  *Long time cooking
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
frenchbutton=document.getElementsByClassName("french")[0]
frenchbutton.addEventListener('click',function (){
  filter("french");
});
mostbutton=document.getElementsByClassName("most")[0]
mostbutton.addEventListener('click',function(){
  filter("most");
})

italianbutton=document.getElementsByClassName("italian")[0]
italianbutton.addEventListener('click',function (){
  filter("italian");
});
seafoodbutton=document.getElementsByClassName("seafood")[0]
seafoodbutton.addEventListener('click',function (){
  filter("seafood");
});


const s = document.querySelector("#split");
const foodlist = document.querySelector("#foodbacket");
let total=0;
s.addEventListener("click", () => {
  if (foodlist.classList.contains("hidden")) {
    //console.log("asd");
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
// split_menu.addEventListener("click", ()=>{
//     foodlist.classList.add("hidden");
//     console.log("hello")
//   });
let backetList = [];

orderList = document.querySelectorAll("#order");
foodname=[]
foodmap=new Map();
foodamount=new Map();
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
      console.log(img.src);
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
<button class="opacity-0 delete-button hover:bg-red-400 hover:text-blue-50 bg-gray-500 w-6 h-6 rounded-md text-white font-medium mb-2">
                               X
                            </button>
    `;
  food.innerHTML = foodcontent;
  
  backet.append(food);
  //updateTotal("plus")
  updateTotalTest();
}

function updateButton(event) {
  increaseButton = document.getElementsByClassName("increase");
  for (let i = 0; i < increaseButton.length; i++) {
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

  decreaseButton = document.getElementsByClassName("decrease");
  for (let i = 0; i < decreaseButton.length; i++) {
    decreaseButton[i].addEventListener("click", function (event) {
      let par = event.target.parentElement;
      let foodamount = par.getElementsByClassName("food-amount")[0];
      let number = foodamount.innerText;
      
      foodamount.innerText = parseInt(number, 10) - 1 >=0 ?parseInt(number, 10)-1:0;
      // updateTotal("down")
      let testing=par.parentElement.parentElement.getElementsByClassName("delete-button")[0]
      
      if(foodamount.innerText=='0'){
        testing.classList.remove("opacity-0")
        testing.addEventListener('click',function(){
         par.parentElement.parentElement.remove()
         updateTotalTest();
        })
      }
      updateTotalTest();
    });
  }

}

function updateTotal(change){
  let foodlist=document.getElementsByClassName("food-details");
  for(let i=1;i<foodlist.length;i++){
    let fname=foodlist[i].getElementsByClassName("food-name")[0].innerText;
    let amount=foodlist[i].getElementsByClassName("food-amount")[0].innerText;
    
    let totalprice= document.getElementsByClassName("total")[0].innerText;
    let p=parseFloat(foodmap.get(fname).slice(1));
    if(change=="plus")total = total+p;
    else {
      total=total -p >=0 ?total -p:0;
      
    }
    document.getElementsByClassName("total")[0].innerText='$'+total;
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


let cursor=document.getElementsByClassName("info")
for(let i=0;i<cursor.length;i++){
  cursor[i].addEventListener('click',function(){
    
   document.getElementsByClassName("info-view")[0].classList.remove("hidden");
    
  })

}



function myFunction(event) {
  document.getElementsByClassName("info-view")[0].classList.add("hidden")
}
