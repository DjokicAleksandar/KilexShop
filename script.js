//loader

window.onload = () => {
    const loadingScreen = document.getElementById("loader");
    loadingScreen.style.display = 'none';
}

//------
//offset slike

window.addEventListener("DOMContentLoaded", function(){
    var navbar = document.querySelector(".navbar").offsetHeight;
    document.querySelector(".imageContainer").style.marginTop = navbar + "px";
})

//--------------------

//------------------
//otvaranje i zatvaranje korpe

const emptyCart = document.querySelector(".emptyCart");
const cartBtn = document.querySelector(".icoCart");
const popUp = document.querySelector(".popUpCart");
const cartContent = document.querySelector(".cartContent");
const continueBtn = document.querySelector(".continueBtn");
const closeX = document.querySelector(".close");

//prikazi
cartBtn.addEventListener("click", () => {
    popUp.classList.add("show");
    popUp.classList.remove("hide");
    document.body.classList.add('noScroll');
})

//sakrij
popUp.addEventListener("click", (e) => {
    popUp.classList.add("hide")
    popUp.classList.remove("show");
    document.body.classList.remove('noScroll');
})

continueBtn.addEventListener("click", () => {
    popUp.classList.add("hide");
    popUp.classList.remove("show");
    document.body.classList.remove('noScroll');
})

closeX.addEventListener("click", () => {
    popUp.classList.add("hide")
    popUp.classList.remove("show");
    document.body.classList.remove('noScroll');
})

cartContent.addEventListener("click", (e) => {
    e.stopPropagation();
})

//----------
//proizvodi

//button for cart page
let openCartPageBtn = document.querySelector('.openCartPageBtn');
openCartPageBtn.disabled = true;
//-----

let listProductHTML = document.querySelector(".items");
let listCartHTML = document.querySelector(".listCart");
let iconCartNumber = document.querySelector(".cartNumber");
let totalPrice = document.querySelector("#totalPrice");
let listProduct = [];
let carts = [];
let windowWidth = window.innerWidth;

//svi proizvodi
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProduct.length > 0)
    {
        let i = 0;

        listProduct.forEach(product => {
            i = i + 1;
            let newProduct = document.createElement('li');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;

            if (windowWidth < 600){
                newProduct.innerHTML = `<a href="#" class="itemLink" id="LI${i}">
                        <img src="${product.image}" class="itemImage" draggable="false">
                    </a>
                    <p class="itemBadge"> Trepavice </p>
                    <h2 class="itemName"> ${product.name} </h2>
                    <h3 class="itemPrice"> ${product.price} RSD </h3>
                    <button class="addToCartButton"> DODAJ U KORPU </button>
                    <div class="productStripe">  </div>`;
            }
            else{
                newProduct.innerHTML = `<a href="#" class="itemLink" id="LI${i}">
                        <img src="${product.image}" class="itemImage" draggable="false">
                    </a>
                    <p class="itemBadge"> Trepavice </p>
                    <h2 class="itemName"> ${product.name} </h2>
                    <h3 class="itemPrice"> ${product.price} RSD </h3>
                    <button class="addToCartButton"> DODAJ U KORPU </button>
                    <div class="productStripe">  </div>`;
            }
            
                    
            listProductHTML.appendChild(newProduct)
        })
    }
}
//--
//add to cart
const addToCart = (productId) => {
    let positionThisProductInCart = carts.findIndex((value) => value.productId == productId);
    if (carts.length <= 0)
    {
        carts = [{
            productId: productId,
            quantity: 1
        }]
    }
    else if (positionThisProductInCart < 0)
    {
        carts.push({
           productId: productId,
           quantity: 1 
        })
    }
    else
    {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
}

const addCartToMemory = () => {
    //24:55
}

let cartItemTotal = document.querySelector(".cartItemTotal");
let cartIsEmpty = true;////////

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPriceValue = 0;

    if (carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('cartItem');
            newCart.dataset.id = cart.productId;

            let positionProduct = listProduct.findIndex((value) => value.id == cart.productId);
            let info = listProduct[positionProduct];

            let itemTotalPrice = info.price*cart.quantity;
            totalPriceValue += itemTotalPrice;

            let formattedPrice = itemTotalPrice.toLocaleString('de-DE', {minimumFractionDigits: 0});
            
            newCart.innerHTML = 
                    `
                <div class="itemInfo">
                    <div class="cartItemImage">
                        <img src="${info.image}" height="50px">
                    </div>
                    <div class="cartItemName">
                        ${info.name}
                    </div>
                    <div class="cartItemTotal">
                        ${formattedPrice} RSD
                    </div>
                    <div class="quantity">
                        <div class="minus">-</div>
                        <div class="quantityNumber"> ${cart.quantity} </div>
                        <div class="plus">+</div>
                    </div>
                </div>

                <div class="bottomStripe">  </div>
                    `;
            
            listCartHTML.appendChild(newCart);
        })
        emptyCart.style.display = 'none'; //cart is empty text
        document.querySelector(".price").classList.add("priceVisible");
        cartIsEmpty = false;//////////////
    }
    else{
        emptyCart.style.display = 'block'; //cart is empty text
        document.querySelector(".price").classList.remove("priceVisible");
        cartIsEmpty = true;///////////////
    }
    iconCartNumber.innerText = totalQuantity;

    let formattedTotalPrice = totalPriceValue.toLocaleString('de-DE', {minimumFractionDigits: 0});
    totalPrice.innerText = `${formattedTotalPrice} RSD`;

    //disable button for cart page
    if (cartIsEmpty)
        openCartPageBtn.disabled = true;
    else
    {
        openCartPageBtn.disabled = false;

        openCartPageBtn.addEventListener('click', () => {
            localStorage.setItem("selectedProducts", JSON.stringify(carts)); //local storage
            localStorage.setItem("allProducts", JSON.stringify(listProduct));
            window.location.href = "cart.html"; 
        })
    }
    //----
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus'))
    {
        let productId = positionClick.parentElement.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')){
            type = 'plus';
        }

        changeQuantity(productId, type);
    }
})

const changeQuantity = (productId, type) => {
    let positionItemInCart = carts.findIndex((value) => value.productId == productId);
    if (positionItemInCart >= 0)
    {
        switch(type){
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }
                else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    //addCartToMemory
    addCartToHTML();
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addToCartButton')){
        let productId = positionClick.parentElement.dataset.id;
        addToCart(productId);
        
        popUp.classList.add("show");
        popUp.classList.remove("hide");
        document.body.classList.add("noScroll");
    }
})

//data from json
const initApp = () => {
    fetch("products.json")
    .then(response => response.json())
    .then(data => {
        listProduct = data;
        addDataToHTML();
    })
}
initApp();

//-------------
//menu icon

const icoMenu = document.querySelector(".icoMenu");

icoMenu.addEventListener("click", function(){
    window.location.href = "index.html";
})

//---------------
//kontakt pokazivanje
const velikaSlika = document.querySelector(".velikaSlika");
const contact = document.querySelector(".contact");

document.addEventListener("scroll", () => {
    const trenutniScroll = window.scrollY;
    const donjaGranica = velikaSlika.getBoundingClientRect().bottom;

    if (trenutniScroll > donjaGranica){
        contact.classList.add("visibleContact");
    }
    else{
        contact.classList.remove("visibleContact");
    }
});

//--------------
//menjanje teksta u kontaktu



//------------------
//pokazivanje proizvoda

//chatgpt
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const proizvodi = document.querySelectorAll(".item");

        proizvodi.forEach(proizvod => {
            const box = proizvod.getBoundingClientRect();
            if (box.top <= window.innerHeight) {
                proizvod.classList.add("visibleItem");
                console.log("da");
            } else {
                proizvod.classList.remove("visibleItem");
                console.log("ne");
            }
        });
    }, 500); // Kašnjenje od 500ms
});


//---------

document.addEventListener("scroll", () => {
    const proizvodi = document.querySelectorAll(".item");

    proizvodi.forEach(proizvod => {
        const box = proizvod.getBoundingClientRect();

        if (box.top <= window.innerHeight && box.bottom >= 0){
            proizvod.classList.add("visibleItem");
        }
        else{
            proizvod.classList.remove("visibleItem");
        }
    })
})

//------------------
//DODAVANJE SLIKA ZA SVAKU TREPAVICU I SLAJDERI
//SEKI

document.addEventListener('scroll', function() { //los nacin sa scroll, ispravi!!!!!
    const popUpProduct = document.querySelector('.popUpProduct');
    const popUpContent = document.querySelector('.popUpProductContent');
    const sliderImages = document.querySelectorAll('.slider img');
    const sliderNavLinks = document.querySelectorAll('.sliderNav a');
    const productName = document.querySelector('.productName');
    const closeSecond = document.querySelector('.closeSecond');

    const productMap = {
        LI1: {
            //name: 'Trepavice K2',
            images: ['Images/Eyelash/K2-Kutija - Copy.jpg', 'Images/Eyelash/K2-Cela - Copy.jpg', 'Images/Eyelash/K2-Obe - Copy.jpg']
        }
    };

    document.querySelectorAll('.itemLink').forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            console.log('aca');

            const linkId = link.id;
            const eyelash = productMap[linkId];

            if (eyelash) {
                sliderImages.forEach((img, index) => {
                  img.src = eyelash.images[index];  

                  //productName.textContent = eyelash.name;
                });

                //prikaz 
                popUpProduct.classList.add("show");
                popUpProduct.classList.remove("hide");
                document.body.classList.add('noScroll');

                //onemoguci scroll pozadine
                document.body.classList.add('noScroll');

                //onemoguci kliktanje pozadine
                popUpContent.addEventListener("click", (e) => {
                    e.stopPropagation();
                })
            }
        })

        popUpProduct.addEventListener("click", (e) => {
            popUpProduct.classList.add("hide")
            popUpProduct.classList.remove("show");
            document.body.classList.remove('noScroll');
        })

        closeSecond.addEventListener("click", () => {
            popUpProduct.classList.add("hide")
            popUpProduct.classList.remove("show");
            document.body.classList.remove('noScroll');
        })
    })
})

//MENJANJE TACKICA ISPOD SLIKE

const slider = document.querySelector('.slider');
const navDots = document.querySelectorAll('.sliderNav a');

function updateActiveDot() {
    const sliderWidth = slider.scrollWidth / slider.childElementCount;
    const scrollLeft = slider.scrollLeft;
    const activeIndex = Math.round(scrollLeft / sliderWidth);

    navDots.forEach(dot => dot.classList.remove('active'));

    navDots[activeIndex].classList.add('active');
}

slider.addEventListener('scroll', updateActiveDot);

updateActiveDot();