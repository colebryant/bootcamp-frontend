// What is jQuery?

// // How do I access it?
//  https://code.jquery.com/

// // jQuery Cheat Sheet
//  https://oscarotero.com/jquery/

// // First, let's go through the basic process of creating and appending an element with vanilla JavaScript and jquery

// create a new div

const vanilla = document.createElement("div");
const $jMagic = $("<div>");

// Give your div some text

vanilla.textContent = "this is plain vanilla javascript";

$jMagic.text("WASSUP I'M JQUERY");

// Give it a class of "box"

vanilla.classList.add("box");

$jMagic.addClass("box");

// give vanilla an id of "box-a"

vanilla.setAttribute("id", "box-a");

// give jquery an id of "box-b"

$jMagic.attr("id", "box-b");

// append it to the DOM

const containerVanilla = document.querySelector("#vanilla-container");
containerVanilla.appendChild(vanilla);

$jMagic.appendTo("#jquery-container");

// There are lot of ways to append things with jQuery! I personally like .appendTo() and .prependTo() a lot because they're nice when you want to chain jQuery methods.

// Now let's look at it all chained in one line!!

$("<div>")
    .text("I'm a chained jquery!")
    .addClass("box")
    .attr("id", "box-b")
    .appendTo("#jquery-container");
