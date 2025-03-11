let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
let allProducts = JSON.parse(localStorage.getItem("allProducts"));

console.log(allProducts);

let productList = document.querySelector(".productList");
let totalPriceHTML = document.querySelector(".totalPrice");

let totalPrice = 0;

let productsForPDF = [];
let priceForPDF;
let argsForPDF = [];

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

        priceForPDF = totalItemPriceFormated;

        let newProduct = document.createElement("tr");
        newProduct.innerHTML = `
        <td class="product" id="product"> <img src="${productImage}" height="50px"> <div class="productText"> ${productName} x <b> ${product.quantity} </b> </div> </td>
        <td class="tdPrice"> ${totalItemPriceFormated} RSD </td>
        `;
        productList.appendChild(newProduct);

        totalPrice += totalItemPrice;

        const noviProizvod = {
            id: product.id,
            name: productName,
            price: pricePerProduct,
            description: "Trepavice",
            quantity: product.quantity
        }

        productsForPDF.push(noviProizvod);
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
    if (window.innerWidth <= 900){
        document.querySelector(".dropDown").style.top = navbar + "px";
    }
    else{
        document.querySelector(".dropDown").style.top = 0 + "px";
    }
})

window.addEventListener("resize", function(){
    var navbar = document.querySelector(".navbar").offsetHeight;
    document.querySelector(".container").style.marginTop = navbar + "px";
    if (window.innerWidth <= 900){
        document.querySelector(".dropDown").style.top = navbar + "px";
    }
    else{
        document.querySelector(".dropDown").style.top = 0 + "px";
    }
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
    window.location.href = "index.html";
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
    window.location.href = "index.html";
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

//-----------------
//funkcija za brisanje podataka nakon narucivanja
function ClearInputs() {
    let firstName = document.querySelector("#firstName").value = "";
    let lastName = document.querySelector("#lastName").value = "";
    let email = document.querySelector("#email").value = "";
    let phone = document.querySelector("#phone").value = "";
    let city = document.querySelector("#city").value = "";
    let adress = document.querySelector("#adress").value = "";
    let posta = document.querySelector("#posta").value = "";
}
//---------------

//provera inputa
let inputClassError = "";

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", (e) => {
        inputClassError = input.id + "Error";
        if (!document.querySelector("." + inputClassError))
            return;

        if (input.value === "") {
            document.querySelector("." + inputClassError).textContent = "Morate popuniti ovo polje!";
        }
        else {
            document.querySelector("." + inputClassError).textContent = "";
        }

        if (e.target.id == "email") {
            if (input.value.includes("@")) {
                document.querySelector(".emailError").textContent = "";
            }
            else {
                document.querySelector(".emailError").textContent = "Morate popuniti ovo polje u ispravnom formatu!";
            }
        }
    })
})
//------------------

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
        document.querySelector(".emailError").textContent = "Morate popuniti ovo polje u ispravnom formatu!";
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

    if (selectedProducts == null)
        isValid = false;

    let addressForPDF = adress + " " + posta + " " + city;

    if(isValid)
    {
        const now = new Date();
            
        const year = now.getFullYear(); 
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0'); 
        const hours = String(now.getHours()).padStart(2, '0'); 
        const minutes = String(now.getMinutes()).padStart(2, '0'); 

        // Formatiranje
        const date = `${day}. ${month}. ${year}`;
        const time = `${hours}:${minutes}`;

        argsForPDF = [
            {ime: firstName, prezime: lastName, adresa: addressForPDF, telefon: phone, email: email, datum: date, vreme: time} 
        ];

        let paramsForSeki = {
            from_name: "Kilex - Store",
            buyerName: firstName + " " + lastName,
            buyerEmail: email,
            buyerAdress: adress + ", " + posta + ", " + city,
            phoneNumber: phone,
            productName: productNamesFormated,
            totalPrice: totalPrice + "RSD",
            date: date,
            time: time
        }
        emailjs.send("service_8jgz5wn", "template_6o9qs5m", paramsForSeki).then(function (res){
        })
        
        let paramsForUser = {
            data: "https://imgur.com/gCC2Me2.png",
            from_name: "Kilex - Store",
            buyerName: firstName + " " + lastName,
            productName: productNamesFormated,
            buyerEmail: email,
            buyerAdress: adress + ", " + posta + ", " + city,
            totalPrice: totalPrice + " RSD",
            date: date,
            time: time
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
                
        
        //nakon uspesne validacije
        ClearInputs();
        document.querySelectorAll(".productList tr").forEach(row => {
            if (!row.classList.contains("trUkupno") && !row.classList.contains("tbody"))
                row.innerHTML = "";
        })

        localStorage.removeItem("selectedProducts");
        selectedProducts = [];
    }
    else{
        document.querySelector(".form").scrollIntoView({ behavior: "smooth" });
    }
}

//------------
//menu icon

function DropDownForPC(){
    if (window.innerWidth <= 900){
        icoMenu.style.visibility = "visible";
    
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
    }
    else{
        icoMenu.style.visibility = "hidden";
        dropDown.classList.remove("hide");
        dropDown.classList.add("show");
    }
}

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

window.addEventListener("resize", () => {
    DropDownForPC();
})

window.addEventListener("DOMContentLoaded", () => {
    DropDownForPC();
})

icoMenu.addEventListener("click", () => {
    DropDownForPC();
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
    if (window.innerWidth <= 900){
        dropDown.style.transition = "1s";
        dropDown.classList.remove("show");
        dropDown.classList.add("hide");
        icoMenu.classList.remove("active");
    }

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
//generisanje PDF
function GeneratePDF() {
    const pdfObject = jsPDFInvoiceTemplate.default(props);

    const jsPDFInstance = pdfObject.jsPDFDocObject; // Ovo vraća stvarni jsPDF objekat

    const pdfBase64 = jsPDFInstance.output('datauristring'); // Kreiranje Base64 stringa
    //samo je ostalo da se ovo prosledi kao atachment korisniku na mejl
}

document.querySelector(".order").addEventListener("click", () => {
    GeneratePDF();
})

var props = {
    outputType: jsPDFInvoiceTemplate.OutputType.DataUriString,
    //Allows for additional configuration prior to writing among others, adds support for different languages and symbols
    returnJsPDFDocObject: true,
    fileName: "Faktura",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 35.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: 'JPG', //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        name: "Kilex",
        address: "Srbija, Stajkovce",
        phone: "+381 62 176 7144",
        email: "kilexxx0@gmail.com",
        website: "www.kilex.co",
    },
    contact: {
        label: "Faktura za:",
        name: argsForPDF.ime + " " + argsForPDF.prezime,
        address: argsForPDF.adresa,
        phone: argsForPDF.phone,
        email: argsForPDF.email,
    },
    invoice: {
        //label: "Invoice #: ",
        //num: 19,
        invDate: "Datum izdavanja:" + argsForPDF.datum + " " + argsForPDF.vreme,
        //invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#", 
            style: { 
              width: 10 
            } 
          }, 
          { 
            title: "Proizvodi",
            style: {
              width: 30
            } 
          }, 
          { 
            title: "Opis",
            style: {
              width: 80
            } 
          }, 
          { title: "Cena"},
          { title: "Kolicina"},
          //{ title: "Unit"},
          { title: "Ukupno"}
        ],
        table: productsForPDF.map((product, index) => ([
            index + 1,               // Redni broj
            product.name,            // Naziv proizvoda
            product.description,     // Opis proizvoda
            product.price,           // Cena
            product.quantity,        // Količina
            product.price * product.quantity // Ukupna cena
        ])),
        additionalRows: [{
            col1: 'Ukupno:',
            col2: priceForPDF,
            col3: 'ALL',
            style: {
                fontSize: 14 //optional, default 12
            }
        },
        {
            col1: 'VAT:',
            col2: '20',
            col3: '%',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        {
            col1: 'SubTotal:',
            col2: '116,199.90',
            col3: 'ALL',
            style: {
                fontSize: 10 //optional, default 12
            }
        }],
        invDescLabel: "Napomena: ",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "Faktura je generisana na racunaru i validna je bez potpisa ili pecata.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};
