fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(productInfo => productInfo.json())
                .then(parsedProductInfo => {
                    const ingredientList = parsedProductInfo.product.ingredients_text;
                    const country = parsedProductInfo.product.countries;
                    const calories = parsedProductInfo.product.nutriments.energy_serving;
                    const fat = parsedProductInfo.product.nutriments.fat_serving;
                    const sugar = parsedProductInfo.product.nutriments.sugars_serving;
                    const foodAsHTML = createHTML(food, ingredientList, country, calories, fat, sugar);
                    addFoodToDom(foodAsHTML);
                });
        });
    });



const createHTML = (food, ingredientList, country, calories, fat, sugar) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.textContent = food.name;
    const p1 = document.createElement("p");
    p1.textContent = `Food Type: ${food.type}`;
    const p2 = document.createElement("p");
    p2.textContent = `Ethnicity: ${food.ethnicity}`;
    const p3 = document.createElement("p");
    p3.textContent = `Ingredients: ${ingredientList}`;
    const p4 = document.createElement("p");
    // Can't seem to find country of origin in json files so just pulling "country"
    p4.textContent = `Country: ${country}`;
    const p5 = document.createElement("p");
    p5.textContent = `Calories per Serving (kCal): ${calories}`;
    const p6 = document.createElement("p");
    p6.textContent = `Fat per Serving (g): ${fat}`;
    const p7 = document.createElement("p");
    p7.textContent = `Sugar per Serving (g): ${sugar}`;
    div.appendChild(h1);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(p5);
    div.appendChild(p6);
    div.appendChild(p7);
    return div;
};

const addFoodToDom = (foodAsHTML) => {
    const headSection = document.querySelector(".foodList");
    headSection.appendChild(foodAsHTML);
};