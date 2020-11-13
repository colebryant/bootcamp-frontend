// Create an input field in your DOM. Give it an id of message.
// Create two article elements with unique id values. Use Flexbox to display them in a row, each taking 50% of the width of the browser.
// Give each article a different border color.
// Write an event listener that listens for the keyup event on the input field.
// The event handler function should update the textContent property of both sections.

const fragment = document.createDocumentFragment();

const input = document.createElement("input");
input.setAttribute("id", "message");
input.setAttribute("type", "text");
fragment.appendChild(input);

const div = document.createElement("div");
div.className = "parent-container";
fragment.appendChild(div);

document.querySelector("body").appendChild(fragment);

const article1 = document.createElement("article");
article1.setAttribute("id", "article1");
article1.textContent = "First Article";
div.appendChild(article1);

const article2 = document.createElement("article");
article2.setAttribute("id", "article2");
article2.textContent = "Second Article";
div.appendChild(article2);

input.addEventListener("keyup", function() {
    article1.textContent = event.target.value;
    article2.textContent = event.target.value;
})
