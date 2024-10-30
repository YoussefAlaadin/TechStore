let ProductsInCart = localStorage.getItem("ProductsInCart")
let allProducts= document.querySelector(".allProducts")
let itemsCheck = [JSON.parse(localStorage.getItem("ProductsInCart"))]
let items=JSON.parse(ProductsInCart)
let empty = document.querySelector(".empty")
let calcRes=0;
let favItems= JSON.parse(localStorage.getItem("favorites"))
let swiperArea = document.querySelector(".swiper-wrapper")
let favSection= document.querySelector(".favorites");

/******************************* */
drawCartProducts(items)
drawFav(favItems )
/****************************** */
function emptyCart(){
    if(calcRes==0){
        empty.style.display="block"        
        document.querySelector(".price").style.display="none"
        console.log(calcRes)
        
    }
}
/*************************************************************** */

function drawFav(favItems){
  if(favItems.length==0){
    favSection.style.display="none"
  }
  else{
  let y = favItems.map((item) =>{
    return `
    <div class="swiper-slide productItem " style="max-width: 400px;">
                <div class="card h-100">
                    <div class="productImg px-2">
                        <img src="${item.image}" class="card-img-top productImg" style="height: 300px;" alt="${item.title}">
                        </div>
                    <div class="card-body productDesc position-relative mt-5">
                        <h5 class="productTitle d-block position-absolute">${item.title}</h5>
                        <h5 class="productCate d-block position-absolute" style="margin-top: 25px;">Category: ${item.category}</h5>
                        <div class="productAction">
                            <i class="fas fa-heart fav" style="color: #ff0000;" id="favBtnBg-${item.id}" onClick="remFav(${item.id})"></i>
                        </div>
                    </div>
                </div>
            </div>`
  })
  .join("")
  swiperArea.innerHTML = y;
}
}
console.log(favItems.length)
function drawCartProducts(items){
  calculateTotalPrice()
   let y = items.map((item)=>{
        return `<div class="card mb-3 m-auto mt-4" style="max-width: 600px;">
                <div class="row g-0">
                        <div class="col">
                            <div class="productImg px-2">
                                <img src="${item.image}" class="card-img-top productImg" alt="${item.title}">
                            </div>
                        </div>
                        <div class="col cardDesc">
                            <div class="card-body productDesc">
                                <h5 class="productTitle">${item.title}</h5>
                                <h5 class="productPrice">Price: ${item.price}$</h5>
                                <h5 class="productCate">Category: ${item.category}</h5>
                                <div class="productAction  justify-content-between">
                                </div>
                            </div>
                            <div class="quantity-price justify-content-between align-items-center">
                                <div class="input-group product-qty">
                                    <button type="button" onclick="removeFromCart(${item.id})"
                                        class="quantity-left-minus btn btn-light rounded-0">
                                        <i class="fas fa-minus" style="color: red;"></i>
                                    </button>
                                    <div class="itemQuantity"><span>${item.quantity}</span></div>
                                    <button type="button" onclick="addToCart(${item.id})"
                                        class="quantity-right-plus btn btn-light rounded-0">
                                        <i class="fas fa-plus"   style="color: green;"></i>
                                    </button>
                                </div>
                                <button type="button" class="btn mt-3 fw-bold deleteBtn" id="removeBtn-${item.id}"
                                    onClick=removeAll(${item.id})>Remove from Cart</button>
                            </div>
                        </div>
                    </div>
                </div>`
    })
     .join("")
    allProducts.innerHTML=y

}
/****************************************************/
function addToCart(id) {
    
    let existingItem = items.find((item) => item.id === id);
  
      existingItem.quantity += 1; // Increase quantity if item already in cart
    
  
    localStorage.setItem("ProductsInCart", JSON.stringify(items));
    drawCartProducts(items);
    calculateTotalPrice()
    emptyCart()
  }

/****************************************************/
  function removeFromCart(id) {
    let itemIndex = items.findIndex((item) => item.id === id);
  
    if (itemIndex !== -1) {
      if (items[itemIndex].quantity > 1) {
        items[itemIndex].quantity -= 1; // Decrease quantity if more than one
      }
      
      emptyCart()

      localStorage.setItem("ProductsInCart", JSON.stringify(items));
  
      drawCartProducts(items);
  

    }
    calculateTotalPrice()
    emptyCart()
  }
/****************************************************/

  function removeAll(id){
    let itemIndex = items.findIndex((item) => item.id === id);
    for(let i=items[itemIndex].quantity;i>0;i--){
         items[itemIndex].quantity -= 1;
    }
    items.splice(itemIndex, 1);
    
    emptyCart()
  
     localStorage.setItem("ProductsInCart", JSON.stringify(items));

     drawCartProducts(items);
      calculateTotalPrice()
      emptyCart()
  
  }
  function calculateTotalPrice() {
    let totalPrice = items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
  
    // Display the total price in the UI
    document.querySelector(".price").textContent = `Total: $${totalPrice.toFixed(2)}`;
    calcRes=totalPrice;
    return totalPrice;
  }
  
/************************************************************************ */

function remFav(id){
  let itemIndex= favItems.findIndex((item) =>item.id===id)  //0
    favItems.splice(itemIndex,1)
  
  localStorage.setItem("favorites", JSON.stringify(favItems))
  drawFav(favItems)
}

if(calcRes==0)
document.addEventListener("DOMContentLoaded", () => {
emptyCart()

})
  

let logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function () {
  sessionStorage.clear();
  window.location = "login.html";
});

/* `<div class="swiper-slide productItem mx-auto">
                <div class="card h-100">
                    <div class="productImg px-2">
                        <img src="${item.image}" class="card-img-top productImg" alt="${item.title}">
                    </div>
                    <div class="card-body productDesc position-relative mt-5">
                        <h5 class="productTitle d-block position-absolute">${item.title}</h5>
                        <h5 class="productCate d-block position-absolute" style="margin-top: 25px;">Category:
                            ${item.category}</h5>
                        <div class="productAction">
                            <i class="fas fa-heart fav" style="color: #ff0000;" id="favBtnBg-${item.id}"
                                onClick="remFav(${item.id})"></i>
                        </div>
                    </div>
                </div>
            </div>` */