let cards = document.querySelectorAll(".card");
let descriptions = document.querySelectorAll(".card_description")
let arrows = document.querySelectorAll(".arrow");
let currentActive = 4;
let colors = document.querySelectorAll(".color_c");
let slidePath = 0;
let slideGap = 40;

let sections = document.querySelectorAll(".section");

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
    threshold: 0
}
)

sections.forEach(section => {
    observer.observe(section);
})

function arrow_reset()
{
    arrows.forEach(arrow => {
        if(arrow.classList.contains("open")) arrow.classList.remove("open");
    })
}


const tabsBox = document.querySelector(".usluge"),
allTabs = tabsBox.querySelectorAll(".card")

let isDragging = false;
let isHover = false;


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
    if(tabsBox.scrollLeft == maxScrollLeft) slideGap = -30;
    else if(tabsBox.scrollLeft === 0) slideGap = 30;
    tabsBox.scrollBy({
        left: slideGap,
        behavior: "smooth"
    });
    if(isDragging == false && isHover == false) setTimeout(autoScroll, 1500);
}
const mouseLeave = () => {
    isHover = false;
    autoScroll();
}
autoScroll();
tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
tabsBox.addEventListener("touchdown", () => isDragging = true);
tabsBox.addEventListener("toucmove", dragging);
document.addEventListener("touchup", dragStop);

