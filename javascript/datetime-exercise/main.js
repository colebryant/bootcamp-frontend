/* Lightning Exercise
Setup a simple application with just index.html and main.js (no browserify/grunt and no React).
​
1) This application should display the current date & time on the DOM
2) There should be a button that when clicked, updates the current date & time on the DOM
3) Push it up to Github
4) Once you are finished, slack Emily or Leah your repo link
​
*notes: this is a simple web application, so you will need to run the http server */

const output = document.getElementById("output");

const dateTimeElement = document.createElement("p");

let initialDateTime = new Date();
let initialYear = initialDateTime.getFullYear();
let initialMonth = initialDateTime.getMonth();
let initialDay = initialDateTime.getDate();
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let initialMonthName = months[initialMonth];
let initialHour = initialDateTime.getHours();
let amPm = "";
const hourify = () => {
    if (initialHour <= 12) {
        amPm = "A.M.";
        return initialHour;
    } else if (initialHour > 12) {
        amPm = "P.M.";
        return initialHour - 12;
    };
};
const initalHourName = hourify();
const initialMinutes = initialDateTime.getMinutes();
const initialSeconds = initialDateTime.getSeconds();

dateTimeElement.textContent = `It is ${initalHourName}:${initialMinutes}:${initialSeconds}${amPm} on ${initialMonthName} ${initialDay}, ${initialYear}`;
output.appendChild(dateTimeElement);

const updateButton = document.createElement("button");
updateButton.textContent = "update";
updateButton.addEventListener("click", () => {
    let currentDateTime = new Date();
    let currentYear = currentDateTime.getFullYear();
    let currentMonth = currentDateTime.getMonth();
    let currentDay = currentDateTime.getDate();
    let currentMonthName = months[currentMonth];
    let currentHour = currentDateTime.getHours();
    let amPm = "";
    const hourify = () => {
        if (currentHour <= 12) {
            amPm = "A.M.";
            return currentHour;
        } else if (currentHour > 12) {
            amPm = "P.M.";
            return currentHour - 12;
        };
    };
    const currentHourName = hourify();
    const currentMinutes = currentDateTime.getMinutes();
    const currentSeconds = currentDateTime.getSeconds();

    dateTimeElement.textContent = `It is ${currentHourName}:${currentMinutes}:${currentSeconds}${amPm} on ${currentMonthName} ${currentDay}, ${currentYear}`;
});
output.appendChild(updateButton);

