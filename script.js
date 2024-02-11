let cards = document.querySelectorAll(".card");
let descriptions = document.querySelectorAll(".card_description")
let arrows = document.querySelectorAll(".arrow");
let currentActive = 4;
let colors = document.querySelectorAll(".color_c");

let sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((obj) => {
    obj.forEach(entry => {
        if(entry.target.getAttribute("id") == "hero" && entry.isIntersecting)
        {
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
    threshold: 1
}
)

sections.forEach(section => {
    observer.observe(section);
})

cards.forEach(card => {
    card.addEventListener("click", () => {
        arrow_reset();
        descriptions.forEach(desc => {
            if(desc.classList.contains("active")) desc.classList.remove("active");
        })
        if(currentActive == card.dataset.id) {
            currentActive = 4;
            return;
        }
        else 
        {
            currentActive = card.dataset.id;
            descriptions[currentActive].classList.toggle("active");
            arrows[currentActive].classList.toggle("open");
            selectedCard(currentActive);
        }
    })
})

function selectedCard(id)
{
    const x = document.getElementById("hero");
    x.style.setProperty("--card1_border", "40%");
    x.style.setProperty("--card2_border", "40%");
    x.style.setProperty("--card3_border", "40%");
    if(id == 0) x.style.setProperty("--card1_border", "100%");
    else if(id == 1) x.style.setProperty("--card2_border", "100%");
    else if(id == 2) x.style.setProperty("--card3_border", "100%");
}

function arrow_reset()
{
    arrows.forEach(arrow => {
        if(arrow.classList.contains("open")) arrow.classList.remove("open");
    })
}

colors.forEach(color => {
    color.addEventListener("change", () => {
        if(color.getAttribute("id") == "color_1") changePrimaryColor();
        else if(color.getAttribute("id") == "color_2") changeSecondaryColor();
        else if(color.getAttribute("id") == "color_3") changeThirdColor();
    })
})

function changePrimaryColor()
{
    document.getElementById("reservation").style.setProperty("--primary_color", `${colors[0].value}`)
    document.getElementById("faq").style.setProperty("--primary_color", `${colors[0].value}`)
    document.getElementById("hero").style.setProperty("--primary_color", `${colors[0].value}`)
    document.getElementById("main").style.setProperty("--primary_color", `${colors[0].value}`)
}
function changeSecondaryColor()
{
    document.getElementById("reservation").style.setProperty("--secondary_color", `${colors[1].value}`)
    document.getElementById("faq").style.setProperty("--secondary_color", `${colors[1].value}`)
    document.getElementById("hero").style.setProperty("--secondary_color", `${colors[1].value}`)
    document.getElementById("main").style.setProperty("--secondary_color", `${colors[1].value}`)
}
function changeThirdColor()
{
    document.getElementById("reservation").style.setProperty("--third_color", `${colors[2].value}`)
    document.getElementById("faq").style.setProperty("--third_color", `${colors[2].value}`)
    document.getElementById("hero").style.setProperty("--third_color", `${colors[2].value}`)
    document.getElementById("main").style.setProperty("--third_color", `${colors[2].value}`)
}