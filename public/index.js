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
    console.log(detail);
    let name = detail.getElementsByClassName("foodmenu")[0].innerText;
    let price = detail.getElementsByClassName("food-menu-price")[0].innerText;
    if(!foodmap.has(name)){
      backetList.push(0);
      foodmap.set(name,price);
      addFoodList(name, price);
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
    updateTotal("plus");
    document.querySelector("#foodbacketamount").innerText = backetList.length;

  });
}

function addFoodList(name = "Food item", price = "100") {
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
        <img alt="profil" src="img/curry.jpg"
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
<button class="  hover:bg-red-400 hover:text-blue-50 bg-gray-500 w-6 h-6 rounded-md text-white font-medium mb-2">
                               X
                            </button>
    `;
  food.innerHTML = foodcontent;
  
  backet.append(food);
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
      updateTotal("plus")
    });
  }

  decreaseButton = document.getElementsByClassName("decrease");
  for (let i = 0; i < decreaseButton.length; i++) {
    decreaseButton[i].addEventListener("click", function (event) {
      let par = event.target.parentElement;
      let foodamount = par.getElementsByClassName("food-amount")[0];
      let number = foodamount.innerText;
      foodamount.innerText = parseInt(number, 10) - 1;
      updateTotal("down")
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