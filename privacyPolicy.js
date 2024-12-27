//loader

window.onload = () => {
    const loadingScreen = document.getElementById("loader");
    loadingScreen.style.display = 'none';
}

//offset odozgo

window.addEventListener("DOMContentLoaded", function(){
    var navbar = document.querySelector(".navbar").offsetHeight;
    document.querySelector(".naslov").style.marginTop = navbar + 20 + "px";
    if (window.innerWidth <= 900){
        document.querySelector(".dropDown").style.top = navbar + "px";
    }
    else{
        document.querySelector(".dropDown").style.top = 0 + "px";
    }
})

window.addEventListener("resize", function(){
    var navbar = document.querySelector(".navbar").offsetHeight;
    document.querySelector(".naslov").style.marginTop = navbar + 20 + "px";
    if (window.innerWidth <= 900){
        document.querySelector(".dropDown").style.top = navbar + "px";
    }
    else{
        document.querySelector(".dropDown").style.top = 0 + "px";
    }
})

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
    window.history.back();
})

//O nama i dropdown
const dropDown = document.querySelector(".dropDown");

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