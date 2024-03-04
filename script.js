let cards = document.querySelectorAll(".card");
let sections = document.querySelectorAll(".section");
let ths = 1;
let transitionDelay = 0.3;
thresholdSetter();
mobileHeaderSet();

function thresholdSetter()
{
    if(screen.width > 767) ths = 0.6;
    else ths = 0.2;
}

function mobileHeaderSet()
{
    const header = document.getElementById("bb");
    if(screen.height < 829) 
    {
        header.classList.toggle("ss")
    }
}

const observer = new IntersectionObserver((obj) => {
    obj.forEach(entry => {
        if(entry.target.getAttribute("id") == "hero" && entry.isIntersecting)
        {
            console.log("glicing")
            document.getElementById("naslov2").classList.toggle("turnOn");
            document.getElementById("wave").classList.toggle("turnOn");
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

const cardObserver = new IntersectionObserver((obj) => {
    obj.forEach(entry => {
        if(entry.isIntersecting)
        {
            entry.target.classList.toggle("turnOn")
            cardObserver.unobserve(entry.target)
        }
    })
}, 
{
    threshold: 1
})

sections.forEach(section => {
    observer.observe(section);
})
cards.forEach(card => {
    cardObserver.observe(card)
})

// const tabsBox = document.querySelector(".usluge"),
// allTabs = tabsBox.querySelectorAll(".card")

// let isDragging = false;
// let isHover = false;
// let slidePath = 0;
// let slideGap = 40;

// const dragging = (e) => {
//     if(!isDragging) return;
//     tabsBox.classList.add("dragging");
//     tabsBox.scrollLeft -= e.movementX;
// }

// const dragStop = () => {
//     isDragging = false;
//     tabsBox.classList.remove("dragging");
//     autoScroll();
// }

// function autoScroll()
// {
//     let maxScrollLeft = tabsBox.scrollWidth - tabsBox.clientWidth;
//     if(tabsBox.scrollLeft >= maxScrollLeft) slideGap = -30;
//     else if(tabsBox.scrollLeft <= 0) slideGap = 30;
//     if(isDragging == false && isHover == false) 
//     {
//         tabsBox.scrollBy({
//             left: slideGap,
//             behavior: "smooth"
//         });
//     }
//     setTimeout(autoScroll, 1500);
// }
// const mouseLeave = () => {
//     isHover = false;
//     autoScroll();
// }

// autoScroll();
// tabsBox.addEventListener("mousedown", () => isDragging = true);
// tabsBox.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);
// tabsBox.addEventListener("touchmove", () => isDragging = true);
// tabsBox.addEventListener("touchend", () => dragStop());


let slides = ["https://images.pexels.com/photos/2220292/pexels-photo-2220292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "../public/airportw.jpg", "https://images.pexels.com/photos/1381709/pexels-photo-1381709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
let slidesDesc = ["Slika našeg parkinga", "Sarajevski aerodrom", "Naša sigurnosna zaštita"];
let descBck = document.querySelector(".slide_text_bck");
let slideCounter = 0;

document.getElementById("arrow_right").addEventListener("click", () => {
    slideCounter++;
    if(slideCounter > 2) slideCounter = 0;
    slideChange();
})
document.getElementById("arrow_left").addEventListener("click", () => {
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
    descBck.animate([{transform: "translateX(0%)"}, {transform: "translateX(-100%)"}], {
        fill: "forwards",
        duration: 1000,
        easing: "ease-in"
    })
    await changeImage();
    slideImage.animate([{filter: "blur(3px)"}, {filter: "blur(0px)"}], 
    {
        fill: "forwards",
        delay: 1000,
        duration: 1000,
        easing: "ease-out"
    });
    descBck.animate([{transform: "translateX(-100%)"}, {transform: "translateX(0%)"}], {
        fill: "forwards",
        delay: 1200,
        duration: 1000,
        easing: "ease-in"
    })
}
const changeImage = () => {
    setTimeout(() => {
        console.log("t")
        const slideImage = document.getElementById("current");
        document.getElementById("slide_desc").innerText = slidesDesc[slideCounter];
        slideImage.style.backgroundImage = `url(${slides[slideCounter]})`;
    }, 1300)
}

const navBar = document.querySelector(".navbar_ul");
const ham = document.getElementById("ham");

ham.addEventListener("click", () => {
    navBar.classList.toggle("active");
    ham.style.backgroundImage = navBar.classList.contains("active") ? `url("../public/x.png")` : `url("../public/menu_icon.png")`
})

