let cards = document.querySelectorAll(".card");
let descriptions = document.querySelectorAll(".card_description")
let arrows = document.querySelectorAll(".arrow");
let currentActive = 4;

let sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((obj) => {
    obj.forEach(entry => {
        if(entry.target.getAttribute("id") == "hero" && entry.isIntersecting)
        {
            document.getElementById("naslov").classList.toggle("turnOn");
            document.getElementById("wave").classList.toggle("turnOn");
            cards.forEach(card => {
                card.classList.toggle("turnOn")
            })
            document.getElementById("slider").classList.toggle("turnOn")
            observer.unobserve(entry.target);
        }
        else if(entry.target.getAttribute("id") == "reservation" && entry.isIntersecting)
        {
            document.getElementById("contact_from").classList.toggle("turnOn");
            document.getElementById("pricing").classList.toggle("turnOn");
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