

// =========== Function To Add Class active To Link & Remove Class active other Links =========== 
function activeLinks(aLinks, activeClass) {
    aLinks.forEach((targetLink)=> {
        targetLink.addEventListener("click", ()=> {
            aLinks.forEach((othersLinks)=> {
                othersLinks.classList.remove(`${activeClass}`)
            })
            targetLink.classList.add(`${activeClass}`)
        })
    })
}

// =========== Add Active Class To Links Header ===========
let links = document.querySelectorAll(".links li a");
activeLinks(links, "active");

/* ============== Show Content of Each Icon ================== */
function showCart() {
    document.querySelector(".cart-container").classList.toggle("showing");
    document.querySelector('.icons-overlay').classList.toggle("showing");
}
function login() {
    document.querySelector('.icons .login .user').classList.toggle("showing");
    document.querySelector('.icons-overlay').classList.toggle("showing");
}
function showMenu() {
    document.querySelector("header .icons .open-menu").classList.toggle("showing")
    document.querySelector("header .icons .close-menu").classList.toggle("showing")
}
/* ================================ */ 


// =========== Calc How many Products In Cart ===========
let cartContent = document.querySelector(".cart-content");
function countItem() {
    let countItemInCart = document.querySelector(".counter");
    countItemInCart.innerHTML = products.length;
    if (!localStorage.Products || products.length == 0) {
        countItemInCart.innerHTML = 0;
        countItemInCart.style.display = "none";
        cartContent.innerHTML = `<p class="massage text-white-50">Your cart is empty</p>`;
    }else {
        countItemInCart.style.display = "block";
    }
}
// ==========================================
let card = document.querySelector(".products .category");

// =========== Get Products From Localstorage ===========
let products = [];
if(localStorage.Products) {
    products = JSON.parse(localStorage.Products)
}
getProducts();
// =========== Start Section Products ===========
function showProducts(product) {
    card.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card pt-0">
            <p class="mt-2 mb-2 text-start">ID: <span>${product.id}</span></p>
            <img src= "${product.image}" class="card-img-top" alt="this is Product Image" loading="lazy">
            <div class="card-body p-0">
                <h5 class="card-title mb-1">${product.category}</h5>
                <p class="card-text text-start m-1 text-black-50">${product.title}</p>
                <div class="mt-2 mb-2 ps-2 pe-2 d-flex justify-content-between align-items-center">
                    <p class="mb-0 rate-product">${product.rating.rate}</p>
                    <p class="fw-bold mb-0">$${product.price}</p>
                </div>
                <button id="${product.id}" onclick="setProducts(this.parentElement)" class="btn btn-primary w-100">Add To Cart</button>
            </div>
        </div>
    </div>
    `;
}

let activeProducts = document.querySelectorAll(".products .container .shops ul li");
activeLinks(activeProducts, 'active-product');
// =========== Fetch Data From API ===========
let allProducts = [];
async function fetchData() {
    try {
        let response;
        response = await fetch("https://fakestoreapi.com/products");
        allProducts = await response.json();
        card.innerHTML = '';
        for (let product of allProducts) {
            showProducts(product)
        }
    } catch (error) {
        alert(error+": Not Data Found");
    }
}
window.onload = function() {
    setTimeout(() => {
        fetchData();
    }, 1000);
}

// =========== Add Product To Cart ===========
function setProducts(product) {
    let productContent = product.parentElement;
    let productData = {
        id: productContent.children[0].children[0].innerHTML,
        image: productContent.children[1].src,
        category: productContent.children[2].children[0].innerHTML,
        title: productContent.children[2].children[1].innerHTML,
    }
    products.push(productData);
    localStorage.setItem("Products", JSON.stringify(products));
    getProducts();
    countItem();
}

// =========== Get Products From Local Storage and Show It In Cart If It Found ===========
function getProducts() {
    let data = '';
    for(let i = 0; i < products.length; i++) {
        data += `
            <div class="cart-item text-start d-flex align-items-center justify-content-between flex-wrap">
                <img src="${products[i].image}" alt="product">
                <div class="cart-body">
                    <h5 class="">${products[i].category}</h5>
                    <P class="text-white-50 m-0" title="${products[i].title}">${products[i].title}</P>
                </div>
                <button onclick= "removeProduct(${[i]})" class="remove-btn"><i class="fa-solid fa-trash"></i></button>
                <button class="check-btn">Checkout</button>
            </div>
        `;
        if(document.querySelector(".massage")) {
            document.querySelector(".massage").remove();
        }
    }
    cartContent.innerHTML = data;
    countItem()
}

// =========== Remove Product From Cart ===========
function removeProduct(index) {
    products.splice(index,1)
    localStorage.Products = JSON.stringify(products);
    countItem();
    getProducts();
}
// =========== Filter Products  ===========
function filterProducts(category) {
    card.innerHTML = '';
    for(let product of allProducts) {
        if(product.category == category) {
            showProducts(product);
        }else if(category == 'products') {
            showProducts(product);
        }
    }
}

// =========== Spacial Offer For Product ===========
let countdown = new Date("Dec 31, 2025 23:59:59").getTime();
let counter = setInterval(() => {
    let dateNew = new Date().getTime();
    let diffDate = countdown - dateNew;
    
    let days = Math.floor(diffDate / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diffDate % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diffDate % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    if(diffDate < 0) {
        clearInterval(counter);
    }
}, 1000);