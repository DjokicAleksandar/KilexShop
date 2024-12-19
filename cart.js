let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
let allProducts = JSON.parse(localStorage.getItem("allProducts"));

let productList = document.querySelector(".productList");
let totalPriceHTML = document.querySelector(".totalPrice");

let totalPrice = 0;

if (selectedProducts && selectedProducts.length > 0)
{
    selectedProducts.forEach(product => {
        
        let pricePerProduct = allProducts.find(item => item.id == product.productId)?.price || 0; //ne koristim
        let productName = allProducts.find(item => item.id == product.productId)?.name || 0;
        let totalItemPrice = pricePerProduct * product.quantity;

        let newProduct = document.createElement("tr");
        newProduct.innerHTML = `
        <td class="product" id="product"> ${productName} x <b> ${product.quantity} </b> </td>
        <td> ${totalItemPrice} RSD </td>
        `;
        productList.appendChild(newProduct);

        totalPrice += totalItemPrice;
    })

    let lastRow = document.createElement("tr");
    lastRow.innerHTML = `
    <td> <b> Ukupno: </b> </td>
    <td> <b> ${totalPrice} RSD </b> </td>
    `;    

    productList.appendChild(lastRow);

    let dostava = document.createElement("tr");
    dostava.innerHTML = `
    <td> <b> Dostava </b> </td>
    <td> <b> Isporuka kurirkom službom </b> </td>
    `;

    productList.appendChild(dostava);
}
else{

}

//totalPriceHTML.innerText = totalPrice.toLocaleString("de-DE", {minimumFractionDigits: 0});

//-----------------

window.addEventListener("DOMContentLoaded", function(){
    var navbar = document.querySelector(".navbar").offsetHeight;
    document.querySelector(".container").style.marginTop = navbar + "px";
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

//validation

function Validate()
{
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
        emailjs.send("service_8jgz5wn", "template_6o9qs5m", paramsForSeki).then(function (res){
          alert("Porudzbina poslata!" + res.status);
        })
        
        let paramsForUser = {
            data: "https://imgur.com/gCC2Me2", //NE RADI!!!!
            from_name: "Kilex - Store",
            buyerName: firstName + " " + lastName,
            productName: productNamesFormated,
            buyerEmail: email,
            buyerAdress: adress + ", " + posta + ", " + city,
            totalPrice: totalPrice + " RSD"
        };

        console.log(paramsForUser.data);
    
        emailjs.send("service_8jgz5wn", "template_7dn3b8c", paramsForUser).then(function (res) {
            alert("Poslat email korisniku! Status: " + res.status);
        }).catch(function (err) {
            console.error("Greška prilikom slanja email-a:", err);
        });
    }
}

//------------
//menu icon

const icoMenu = document.querySelector(".icoMenu");

icoMenu.addEventListener("click", () => {
    window.location.href = "index.html";
})

const cartIcon = document.querySelector(".icoCart");

cartIcon.addEventListener("click", () => {
    window.location.href = "index.html";
})