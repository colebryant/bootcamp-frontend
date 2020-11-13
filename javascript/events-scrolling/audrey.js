const audrey = document.getElementById("audrey")

/*
    Add an event listener to the `document` object to listen
    for the "scroll" event.
*/
document.addEventListener("scroll", function () {
    /*
        Adjust the width of audrey to be 1/3 the value of
        `window.scrollY`. No lower than 50px, though.
    */
    
    let widthAmount = (1/3) * window.scrollY;
    audrey.style.width = `${widthAmount}px`;
    let heightAmount = (1/4) * window.scrollY;
    audrey.style.height = `${heightAmount}px`;


    /*
        Adjust the height of audrey to be 1/4 the value of
        `window.scrollY`. No lower than 100px, though.
    */
})