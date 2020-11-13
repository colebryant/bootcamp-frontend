// document.querySelector("#activate-flight").addEventListener("click", function flightHandlerFunction() {
//     document.querySelector("#flight").classList.remove("disabled");
//     document.querySelector("#flight").classList.add("enabled");        
// });

// document.querySelector("#activate-mindreading").addEventListener("click", function mindreadingHandlerFunction() {
//     document.querySelector("#mindreading").classList.remove("disabled");
//     document.querySelector("#mindreading").classList.add("enabled");        
// });

// document.querySelector("#activate-xray").addEventListener("click", function xrayHandlerFunction() {
//     document.querySelector("#xray").classList.remove("disabled");
//     document.querySelector("#xray").classList.add("enabled");        
// });

document.querySelector("#activate-all").addEventListener("click", function activateAllFunction() {
    const items = document.querySelectorAll(".power");
    items.forEach(function(item) {
        item.classList.remove("disabled");
        item.classList.add("enabled");
    })
});

document.querySelector("#deactivate-all").addEventListener("click", function deactivateAllFunction() {
    const items = document.querySelectorAll(".power");
    items.forEach(function(item) {
        item.classList.add("disabled");
        item.classList.remove("enabled");
    })
});


// CHALLENGE 1

const makeItHappen = () => {
    let power = event.target.id.split("-")[1];
    document.querySelector(`#${power}`).classList.remove("disabled");
    document.querySelector(`#${power}`).classList.add("enabled");
}


document.querySelector("#activate-flight").addEventListener("click", makeItHappen);

document.querySelector("#activate-mindreading").addEventListener("click", makeItHappen);

document.querySelector("#activate-xray").addEventListener("click", makeItHappen);
