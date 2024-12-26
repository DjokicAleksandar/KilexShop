//loader

window.onload = () => {
    const loadingScreen = document.getElementById("loader");
    loadingScreen.style.display = 'none';
}

//offset odozgo

window.addEventListener("DOMContentLoaded", function(){
    var navbar = document.querySelector(".navbar").offsetHeight;
    document.querySelector(".naslov").style.marginTop = navbar + 20 + "px";
    document.querySelector(".dropDown").style.top = navbar + "px";
})

//------------
//menu icon

const icoMenu = document.querySelector(".icoMenu");

const cartIcon = document.querySelector(".icoCart");

cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html";
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