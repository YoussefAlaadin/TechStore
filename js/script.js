let logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function () {
  sessionStorage.clear();
  window.location = "login.html";
});
/* if(localStorage.clear()){
    sessionStorage.clear()
} */
/**********************LOG OUT**********************/
let userInfo = document.getElementById("userInfo");
let links = document.getElementById("links");
let username = sessionStorage.getItem("username");
let welcome = document.querySelector(".welcome");
if (sessionStorage.getItem("email")) {
  links.style.display = "none";
  userInfo.style.display = "flex";
  console.log(username);
  welcome.innerHTML = `<h5 id="userWelcome">Welcome, ${username} <i class="fas fa-heart" style="color: #ff0000";></i></h5>`;
}
console.log(sessionStorage.getItem("email"));
/*****************************USER INFO & LINKS DISPLAY************************ */
let allProducts = document.querySelector(".products");
let products = [
  {
    id: 1,
    title: "Ideapad Gaming 3",
    price: 750,
    category: "Laptops",
    image: "Images/lap1.jpg",
  },

  {
    id: 2,
    title: "Katana GF76",
    price: 800,
    category: "Laptops",
    image: "Images/lap2.jpg",
  },
  {
    id: 3,
    title: "Gaming Monitor",
    price: 300,
    category: "Monitors",
    image: "Images/mon1.jpg",
  },
  {
    id: 4,
    title: "MSI G255G 25 inch",
    price: 250,
    category: "Monitors",
    image: "Images/mon2.jpg",
  },
  {
    id: 5,
    title: "Intel i7-13500H",
    price: 600,
    category: "Processors",
    image: "Images/cpu1.jpg",
  },
  {
    id: 6,
    title: "Ryzen7 7800X",
    price: 700,
    category: "Processors",
    image: "Images/cpu2.jpg",
  },
  {
    id: 7,
    title: "Gaming Headphone",
    price: 100,
    category: "Accessories",
    image: "Images/headphone1.jpg",
  },
  {
    id: 8,
    title: "Logitech Gaming Mouse",
    price: 500,
    category: "Accessories",
    image: "Images/mouse1.jpg",
  },
  {
    id: 9,
    title: "Headphone Stand RGB",
    price: 80,
    category: "Accessories",
    image: "Images/cessory1.jpg",
  },
];
/************************************************************ */

let searchInput = document.getElementById("searchInput"); //Reference to the search input
let searchArea = document.querySelector(".searchedProducts");
let searchType = document.getElementById("searchType");

// Function to draw products
function drawItems(productsToShow) {
  let y = productsToShow
    .map((item) => {
      return `
      <div class="col-5 productItem mx-auto">
      <div class="card h-100">
        <div class="productImg px-2">
          <img src="${item.image}" class="card-img-top productImg" alt="${item.title}">
        </div>
        <div class="card-body productDesc">
          <h5 class="productTitle d-block">${item.title}</h5>
          <h5 class="productPrice d-block">Price: ${item.price}$</h5>
          <h5 class="productCate d-f">Category: ${item.category}</h5>
          <div class="productAction d-flex justify-content-between">
            <button type="button" class="add btn mt-3 fw-bold" id="addBtn-${item.id}" onClick=addToCart(${item.id})>Add to Cart</button>
            <button type="button" class="btn mt-3 fw-bold deleteBtn" id="removeBtn-${item.id}" style="display: none;" onClick=removeAll(${item.id})>Remove from Cart</button>
            <i class="far fa-heart mt-3" id="favBtn-${item.id}"   onClick=addFav(${item.id}) ></i>
            <i class="fas fa-heart mt-3 fav" style="color: #ff0000; display:none;" id="favBtnBg-${item.id}" onClick=remFav(${item.id}) ></i>
            
          </div>
        </div>
      </div>
    </div>
    `;
    })
    .join("");

  searchArea.innerHTML = y;
}

// Function to filter products based on search type (Name or Category)
function filterProducts() {
  let searchTerm = searchInput.value.toLowerCase();
  let searchBy = searchType.value; // Either 'name' or 'category'

  let filteredProducts = products.filter((item) => {
    if (searchBy === "name") {
      return item.title.toLowerCase().includes(searchTerm); // Search by product name
    } else if (searchBy === "category") {
      return item.category.toLowerCase().includes(searchTerm); // Search by category
    }
  });

  drawItems(filteredProducts); // Draw the filtered products
}

// Event listeners for search input and dropdown change
searchInput.addEventListener("input", filterProducts);
searchType.addEventListener("change", filterProducts);

// Initially draw all products
drawItems(products);

/***********************************************DRAW AND FILTER ITEMS******************* */

let shoppingCart = document.querySelector(".shopping-cart-content");
let cartItem = document.querySelector(".cartItem");
let badge = document.querySelector(".badge");
let emptyCart = document.querySelector("#emptyCart");
let subTot = document.querySelector(".subTot");
let total = document.querySelector(".totalPrice");
let price = document.querySelector(".price");
let viewCart = document.querySelector("#viewCart");
let addedItem = localStorage.getItem("ProductsInCart")
  ? JSON.parse(localStorage.getItem("ProductsInCart"))
  : [];
let productPrice = document.querySelector(".product-price");
let favorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];
/********************************************************************************************************************** */

// Initialize UI and button visibility on page load
if (sessionStorage.getItem("email")) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log(favorites);
    drawCart();
    updateCartUI();
    calculateTotalPrice();
    // Set button states based on `addedItem`
    addedItem.forEach((item) => {
      toggleButtonVisibility(item.id, true); // Show "Remove" button for each item in the cart
    });
    favorites.forEach((item) => {
      toggleFavBtn(item.id, true);
    });
  });
}
/************************************************************************** */

function toggleFavBtn(id, isAdded) {
  let favBtnBg = document.querySelector(`#favBtnBg-${id}`);
  let favBtn = document.querySelector(`#favBtn-${id}`);
/*   favorites.map((item) => {
    item.id === id; */
  if(isAdded){
    favBtnBg.style.display = "block";
    favBtn.style.display = "none";
  }
else{
  favBtn.style.display = "block";
  favBtnBg.style.display = "none";
}

  }


function addFav(id) {
  if (sessionStorage.getItem("email")) {
    let favItem = products.find((item) => item.id === id); // katana

  
      favorites.push(favItem);
      toggleFavBtn(id, true);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log(favorites);
  } else {
    window.location = "login.html";
  }
}
function remFav(id){
  let favIndex = favorites.findIndex((item) => item.id === id); //0
  favorites.splice(favIndex, 1);
  toggleFavBtn(id, false);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  console.log(favorites);
}

/************************************************************************** */

/* if(sessionStorage.getItem("email")){
  else{
    Window.location="login.html"
  } */

function addToCart(id) {
  if (sessionStorage.getItem("email")) {
    let choosenItem = products.find((item) => item.id === id);
    let existingItem = addedItem.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
      choosenItem.quantity = 1; // Set initial quantity if new item
      addedItem = [...addedItem, choosenItem];
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawCart();
    updateCartUI();
    toggleButtonVisibility(id, true); // Toggle to show "Remove" button
    calculateTotalPrice();
  } else {
    window.location = "login.html";
  }
}

/**************************************************************************** */
function removeFromCart(id) {
  let itemIndex = addedItem.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    if (addedItem[itemIndex].quantity > 1) {
      addedItem[itemIndex].quantity -= 1; // Decrease quantity if more than one
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawCart();
    updateCartUI();
  }
  calculateTotalPrice();
}
/**************************************************************************** */
function removeAll(id) {
  let itemIndex = addedItem.findIndex((item) => item.id === id);
  for (let i = addedItem[itemIndex].quantity; i > 0; i--) {
    addedItem[itemIndex].quantity -= 1;
  }
  addedItem.splice(itemIndex, 1);
  toggleButtonVisibility(id, false); // Show "Add to Cart" button

  localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));

  drawCart();
  updateCartUI();
  calculateTotalPrice();
}
/************************************************************************** */
/* function removeDuplicates(id){
  let itemIndex = addedItem.findIndex((item) => item.id === id);
  for(let i=addedItem[itemIndex].quantity;i>0;i--){
       addedItem[itemIndex].quantity -= 1;
  }
  addedItem.splice(itemIndex, 1);
  toggleButtonVisibility(id, false); // Show "Add to Cart" button


   localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawCart();
    updateCartUI();
  calculateTotalPrice()

} */
// Function to remove duplicates based on the `id` property
/********************************************************************************* */

function calculateTotalPrice() {
  let totalPrice = addedItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Display the total price in the UI
  document.querySelector(".price").textContent = `Total: $${totalPrice.toFixed(
    2
  )}`;

  return totalPrice;
}
/************************************************************************** */

function toggleButtonVisibility(id, isAdded) {
  let addBtn = document.querySelector(`#addBtn-${id}`);
  let removeBtn = document.querySelector(`#removeBtn-${id}`);

  if (isAdded) {
    addBtn.style.display = "none";
    removeBtn.style.display = "inline-block";
  } else {
    addBtn.style.display = "inline-block";
    removeBtn.style.display = "none";
  }
}
/******************************************************************************* */

function drawCart() {
  cartItem.innerHTML = ""; // Clear existing items
  addedItem.forEach((item) => {
    cartItem.innerHTML += `
      <div class="mini-cart-item d-flex border-bottom py-3">
        <div class="col-lg-2 col-md-3 col-sm-2 me-4">
          <a href="#" title="product-image">
            <img src="${item.image}" class="img-fluid" alt="${item.title}">
          </a>
        </div>
        <div class="col-lg-9 col-md-8 col-sm-8">
          <div class="product-header d-flex justify-content-between align-items-center mb-3">
            <h4 class="product-title fs-6 me-5">${item.title}</h4>
            <button id="removeDuplicatesBtn" onclick="removeAll(${item.id})" class="remove" aria-label="Remove this item">
              <i class="fas fa-times" style="font-size: 1.2rem;"></i>
            </button>
          </div>
          <div class="quantity-price d-flex justify-content-between align-items-center">
            <div class="input-group product-qty">
              <button type="button" onclick="removeFromCart(${item.id})" class="quantity-left-minus btn btn-light rounded-0">
                <i class="fas fa-minus" style="color: red;" ></i>
              </button>
              <div class="itemQuantity"><span>${item.quantity}</span></div>
              <button type="button" onclick="addToCart(${item.id})" class="quantity-right-plus btn btn-light rounded-0">
                <i class="fas fa-plus" style="color: green;"></i>
              </button>
            </div>
            <div class="price-code">
              <span class="product-price fs-6">$${item.price}</span>
            </div>
          </div>
        </div>
      </div>`;
  });
}

function updateCartUI() {
  badge.innerHTML = addedItem.reduce((total, item) => total + item.quantity, 0); // Total quantity in cart

  if (addedItem.length === 0) {
    emptyCart.style.display = "block";
    subTot.style.display = "none";
    price.style.display = "none";
    viewCart.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    subTot.style.display = "block";
    price.style.display = "block";
    viewCart.style.display = "flex";
  }
}
/************************************************************************************ */
// Initial rendering
drawCart();
updateCartUI();

/********************************************CART************************************************/
