let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
let allProducts = JSON.parse(localStorage.getItem("allProducts"));

let productList = document.querySelector(".productList");
let totalPriceHTML = document.querySelector(".totalPrice");

let totalPrice = 0;

if (selectedProducts && selectedProducts.length > 0)
{
    selectedProducts.forEach(product => {
        
        let pricePerProduct = allProducts.find(item => item.id == product.productId)?.price || 0; 

        //ako postoji popust
        let discount = allProducts.find(item => item.id == product.productId)?.discount || 0;
        discount = discount / 100;

        if (discount != 0){
            let currentPrice = allProducts.find(item => item.id == product.productId)?.price || 0;
            let newPrice = currentPrice - currentPrice * discount;

            pricePerProduct = newPrice;
        }
        //-----

        let productName = allProducts.find(item => item.id == product.productId)?.name || 0;
        let productImage = allProducts.find(item => item.id == product.productId)?.image || 0;
        let totalItemPrice = pricePerProduct * product.quantity;
        let totalItemPriceFormated = totalItemPrice.toLocaleString('de-DE', {minimumFractionDigits: 0});

        let newProduct = document.createElement("tr");
        newProduct.innerHTML = `
        <td class="product" id="product"> <img src="${productImage}" height="50px"> <div class="productText"> ${productName} x <b> ${product.quantity} </b> </div> </td>
        <td class="tdPrice"> ${totalItemPriceFormated} RSD </td>
        `;
        productList.appendChild(newProduct);

        totalPrice += totalItemPrice;
    })

    let lastRow = document.createElement("tr");
    lastRow.classList.add("trUkupno");
    let totalPriceFormated = totalPrice.toLocaleString('de-DE', {minimumFractionDigits: 0});

    lastRow.innerHTML = `
    <td class="ukupno"> <b> Ukupno: </b> </td>
    <td class="ukupnoCena"> <b> ${totalPriceFormated} RSD </b> </td>
    `;    

    productList.appendChild(lastRow);
}
else{

}

//totalPriceHTML.innerText = totalPrice.toLocaleString("de-DE", {minimumFractionDigits: 0});

//-----------------

window.addEventListener("DOMContentLoaded", function(){
    var navbar = document.querySelector(".navbar").offsetHeight;
    document.querySelector(".container").style.marginTop = navbar + "px";
    document.querySelector(".dropDown").style.top = navbar + "px";
})

//---------------

//all products

let productElements = document.querySelectorAll(".product");
let productNames = [];

productElements.forEach(function(element){
    productNames.push(element.textContent.trim());
})

let productNamesFormated = productNames.join(', ');

//------------------

//base64 za sliku
function convertImageToBase64(imagePath, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', imagePath);
    xhr.responseType = 'blob';
    xhr.send();
}

//popUp prozori nakon validacije

const closeBtnPoslata = document.querySelector("#closeBtnPoslata");
const closeBtnError = document.querySelector("#closeBtnError");

const popUpPoslata = document.querySelector(".popUpPoslata");
const popUpError = document.querySelector(".popUpError");

closeBtnPoslata.addEventListener("click", () => {
    popUpPoslata.classList.remove("show");
    popUpPoslata.classList.add("hide");
    document.body.classList.remove("noScroll");
})

closeBtnError.addEventListener("click", () => {
    popUpError.classList.remove("show");
    popUpError.classList.add("hide");
    document.body.classList.remove("noScroll");
})

popUpPoslata.addEventListener("click", () => {
    popUpPoslata.classList.remove("show");
    popUpPoslata.classList.add("hide");
    document.body.classList.remove("noScroll");
})

popUpError.addEventListener("click", () => {
    popUpError.classList.remove("show");
    popUpError.classList.add("hide");
    document.body.classList.remove("noScroll");
})

document.body.classList.remove("noScroll");

popUpPoslata.classList.remove("show");
popUpPoslata.classList.add("hide");

popUpError.classList.remove("show");
popUpError.classList.add("hide");

//validation
function Validate()
{
    popUpPoslata.classList.remove("show");
    popUpPoslata.classList.add("hide");
    
    popUpError.classList.remove("show");
    popUpError.classList.add("hide");

    let firstName = document.querySelector("#firstName").value.trim();
    let lastName = document.querySelector("#lastName").value.trim();
    let email = document.querySelector("#email").value.trim();
    let phone = document.querySelector("#phone").value.trim();
    let city = document.querySelector("#city").value.trim();
    let adress = document.querySelector("#adress").value.trim();
    let posta = document.querySelector("#posta").value.trim();

    document.querySelector(".firstNameError").textContent = "";
    document.querySelector(".lastNameError").textContent = "";
    document.querySelector(".emailError").textContent = "";
    document.querySelector(".phoneError").textContent = "";
    document.querySelector(".cityError").textContent = "";

    let isValid = true;

    if (firstName === "")
    {
        document.querySelector(".firstNameError").textContent = "Morate popuniti ovo polje!";
        isValid = false;
    }

    if (lastName === "")
    {
        document.querySelector(".lastNameError").textContent = "Morate popuniti ovo polje!";
        isValid = false;
    }

    if (email === "")
    {
        document.querySelector(".emailError").textContent = "Morate popuniti ovo polje!";
        isValid = false;
    }

    let phonePattern = /^06[0-9]{7,9}$/;

    if(!phonePattern.test(phone))
    {
        document.querySelector(".phoneError").textContent = "Neispravan broj telefona!";
        isValid = false;
    }

    if(city === "")
    {
        document.querySelector(".cityError").textContent = "Morate popuniti ovo polje!";
        isValid = false;
    }

    if(adress === "")
    {
        document.querySelector(".adressError").textContent = "Morate popuniti ovo polje";
        isValid = false;
    }

    if(isValid)
    {
        let paramsForSeki = {
            from_name: "Kilex - Store",
            buyerName: firstName + " " + lastName,
            buyerEmail: email,
            buyerAdress: adress + ", " + posta + ", " + city,
            phoneNumber: phone,
            productName: productNamesFormated,
            totalPrice: totalPrice + "RSD"
        }
        //emailjs.send("service_8jgz5wn", "template_6o9qs5m", paramsForSeki).then(function (res){
        //})
        
        let paramsForUser = {
            data: "https://imgur.com/gCC2Me2.png",
            from_name: "Kilex - Store",
            buyerName: firstName + " " + lastName,
            productName: productNamesFormated,
            buyerEmail: email,
            buyerAdress: adress + ", " + posta + ", " + city,
            totalPrice: totalPrice + " RSD"
        };
    
        emailjs.send("service_8jgz5wn", "template_7dn3b8c", paramsForUser).then(function (res) {
            popUpPoslata.classList.add("show");
            popUpPoslata.classList.remove("hide");
            document.body.classList.add("noScroll");
        }).catch(function (err) {
            popUpError.classList.add("show");
            popUpError.classList.remove("hide");
            document.body.classList.add("noScroll");
        });
    }
}

//------------
//menu icon

const icoMenu = document.querySelector(".icoMenu");

const cartIcon = document.querySelector(".icoCart");

cartIcon.addEventListener("click", () => {
    window.location.href = "index.html";
})

//O nama i dropdown
const dropDown = document.querySelector(".dropDown");

dropDown.classList.remove("show");
dropDown.classList.add("hide");
icoMenu.classList.remove("active");
dropDown.style.transition = "1s";

icoMenu.addEventListener("click", function(){
    if (dropDown.classList.contains("show")){
        dropDown.style.transition = "1s";
        dropDown.classList.remove("show");
        dropDown.classList.add("hide");
        icoMenu.classList.remove("active");
    }
    else{
    dropDown.style.transition = ".2s";
    dropDown.classList.remove("hide");
    dropDown.classList.add("show");
    icoMenu.classList.add("active");
    }
})

dropDown.addEventListener("click", () => {
    dropDown.style.transition = "1s";
    dropDown.classList.remove("show");
    dropDown.classList.add("hide");
    icoMenu.classList.remove("active");
})

const pocetna = document.querySelector("#pocetna");
const kontakt = document.querySelector("#kontakt");
const oNama = document.querySelector("#oNama");
const footer = document.querySelector(".footer");

pocetna.addEventListener("click", () => {
    window.location.href = "index.html";
})

kontakt.addEventListener("click", () => {
    footer.scrollIntoView({ behavior: "smooth" });
})

const oNamaWindow = document.querySelector(".oNama");
const oNamaContent = document.querySelector(".oNamaContent");
const closeONama = document.querySelector("#closeONama");

oNamaWindow.classList.add("hide");
oNamaWindow.classList.remove("show");
document.body.classList.remove("noScroll");

oNama.addEventListener("click", () => { //o nama prozor
    dropDown.style.transition = "1s";
    dropDown.classList.remove("show");
    dropDown.classList.add("hide");
    icoMenu.classList.remove("active");

    oNamaWindow.classList.remove("hide");
    oNamaWindow.classList.add("show");
    document.body.classList.add("noScroll");
})

oNamaWindow.addEventListener("click", () => {
    oNamaWindow.classList.add("hide");
    oNamaWindow.classList.remove("show");
    document.body.classList.remove("noScroll");
})

closeONama.addEventListener("click", () => {
    oNamaWindow.classList.add("hide");
    oNamaWindow.classList.remove("show");
    document.body.classList.remove("noScroll");
})

oNamaContent.addEventListener("click", (event) => {
    event.stopPropagation();
})

//----------------------
//privacy policy prozor