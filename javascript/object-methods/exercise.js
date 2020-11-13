// Lightning Exercise 1: Create an object that represents a bill from your doctor's office.
// It should have the following properties: officeName, streetAddress, doctorName, patientName, visitDate, amountBilled, dueDate.
// You provide example values for each one.

const dateVisited = "visitDate";
const owed = "amountBilled";
const patient = "patientName";

const doctorBill = {
    officeName: "Nashville Orthopedics",
    streetAddress: "1234 Nashville Street",
    doctorName: "Dr. John Smith",
    patientName: "Bill Billiamson",
    visitDate: "1/3/2019",
    amountBilled: "$150",
    dueDate: "1/31/2019"
};

// Lightning Exercise 2: Use square bracket notation to output the value of those three properties to the console in Chrome.

console.log(doctorBill[dateVisited], doctorBill[owed], doctorBill[patient]);

// Lightning Exercise 3: Use Object.values() to output all the property values to the console in Chrome.

for (const value of Object.values(doctorBill)) {
    console.log(value);
};

// Lightning Exercise 4: Output all of the key names from your doctor's office bill to the console in Chrome.

for (const key of Object.keys(doctorBill)) {
    console.log(key);
};

// Lightning Exercise 5: Output all of the key names from your doctor's office bill to the DOM inside a parent <section> element. Wrap each one in a <span> element.

outputElement.innerHTML += "<h1>Lightning Exercise 5</h1>";

for (const key of Object.keys(doctorBill)) {
    outputElement.innerHTML += `<section>${key}</section><span></span>`;
};

// Lightning Exercise 6: Create an object to represent your favorite dinner item (e.g. meatloaf, spaghetti, fried fish, gumbo).
// Each object should have a name property, but you can add any other properties that you like, such as size, weight, ethnicity, vegetarian boolean.

const favoriteDinnerItems = [
    {
        name: "steak",
        type: "ribeye",
        vegetarian: false,
        weight: "10oz",
        doneness: "medium rare"
    },
    {
        name: "chicken",
        type: "breast",
        vegetarian: false,
        weight: "10oz",
        doneness: "cooked"
    },
    {
        name: "pork",
        type: "loin",
        vegetarian: false,
        weight: "10oz",
        doneness: "medium well"
    }
];

// Lightning Exercise 7: Output all of the key/value pairs into the DOM inside an <article> element with a class of food.

outputElement.innerHTML += "<h1>Lightning Exercise 7</h1>";

favoriteDinnerItems.forEach(foodItem => {
    let newArticle = document.createElement("article");
    newArticle.classList.add("food");
    for (const entrySet of Object.entries(foodItem)) {
        let newDiv = document.createElement("div");
        newDiv.textContent = `${entrySet[0]}, ${entrySet[1]}`;
        newArticle.appendChild(newDiv);
    };
    outputElement.appendChild(newArticle);
    outputElement.innerHTML += "<hr/>"
});
