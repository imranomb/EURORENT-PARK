let cards = document.querySelectorAll(".card");
let sections = document.querySelectorAll(".section");
let ths = 1;

thresholdSetter();

function thresholdSetter()
{
    if(screen.width > 767) ths = 1;
    else ths = 0;
}

const observer = new IntersectionObserver((obj) => {
    obj.forEach(entry => {
        if(entry.target.getAttribute("id") == "hero" && entry.isIntersecting)
        {
            console.log("glicing")
            document.getElementById("naslov2").classList.toggle("turnOn");
            document.getElementById("wave").classList.toggle("turnOn");
            cards.forEach(card => {
                card.classList.toggle("turnOn")
            })
            document.getElementById("slider").classList.toggle("turnOn")
            observer.unobserve(entry.target);
        }
        else if(entry.target.getAttribute("id") == "reservation" && entry.isIntersecting)
        {
            document.getElementById("naslov3").classList.toggle("turnOn");
            document.getElementById("contact_from").classList.toggle("turnOn");
            document.getElementById("pricing").classList.toggle("turnOn");
            observer.unobserve(entry.target);
            console.log("asfalt")
        }
        else if(entry.target.getAttribute("id") == "faq" && entry.isIntersecting)
        {
            document.getElementById("naslov4").classList.toggle("turnOn");
            const faqs = document.querySelectorAll(".faq");
            faqs.forEach(faq => {
                faq.classList.toggle("show");
            })
            observer.unobserve(entry.target);
        }
    })
},
{
    threshold: ths
}
)

sections.forEach(section => {
    observer.observe(section);
})



const tabsBox = document.querySelector(".usluge"),
allTabs = tabsBox.querySelectorAll(".card")

let isDragging = false;
let isHover = false;
let slidePath = 0;
let slideGap = 40;

const dragging = (e) => {
    if(!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
}

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
    autoScroll();
}

function autoScroll()
{
    let maxScrollLeft = tabsBox.scrollWidth - tabsBox.clientWidth;
    if(tabsBox.scrollLeft >= maxScrollLeft) slideGap = -30;
    else if(tabsBox.scrollLeft <= 0) slideGap = 30;
    if(isDragging == false && isHover == false) 
    {
        tabsBox.scrollBy({
            left: slideGap,
            behavior: "smooth"
        });
    }
    setTimeout(autoScroll, 1500);
}
const mouseLeave = () => {
    isHover = false;
    autoScroll();
}

autoScroll();
tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
tabsBox.addEventListener("touchmove", () => isDragging = true);
tabsBox.addEventListener("touchend", () => dragStop());


let slides = ["../public/slider/parking.jpg", "../public/slider/airport.jpg", "../public/slider/cctv.jpg"]
let slidesDesc = ["Slika našeg parkinga", "Sarajevski aerodrom", "Naša sigurnosna zaštita"];
let slideCounter = 0;

document.getElementById("right_arrow").addEventListener("click", () => {
    slideCounter++;
    if(slideCounter > 2) slideCounter = 0;
    slideChange();
})
document.getElementById("left_arrow").addEventListener("click", () => {
    slideCounter--;
    if(slideCounter < 0) slideCounter = 2;
    slideChange();
})
async function slideChange()
{
    const slideImage = document.getElementById("current");
    slideImage.animate([{filter: "blur(0px)"}, {filter: "blur(3px)"}], 
    {
        fill: "forwards",
        duration: 1000,
        easing: "ease-in"
    });
    await changeImage();
    slideImage.animate([{filter: "blur(3px)"}, {filter: "blur(0px)"}], 
    {
        fill: "forwards",
        duration: 1000,
        easing: "ease-out"
    });
}
const changeImage = () => {
    const slideImage = document.getElementById("current");
    document.getElementById("slide_desc").innerText = slidesDesc[slideCounter];
    slideImage.style.backgroundImage = `url(${slides[slideCounter]})`;
}

const navBar = document.querySelector(".navbar_ul");
const ham = document.getElementById("ham");

ham.addEventListener("click", () => {
    navBar.classList.toggle("active");
})

