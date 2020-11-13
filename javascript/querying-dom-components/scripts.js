document.querySelector(".article__header").textContent = "Welcome to the Cole Blog";

let x = document.querySelectorAll(".article__header");

for (let i = 0; i < x.length; i++) {
    x[i].classList.add("important");
}

document.querySelector(".dashed").classList.remove("dashed");

document.querySelector(".article__footer").classList.add("goldenrod");
