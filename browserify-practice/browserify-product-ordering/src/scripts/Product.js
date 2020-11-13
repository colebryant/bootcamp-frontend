// This module creates the product components which contain the product's title, sections for the other items and the review from the ReviewList module

import ReviewList from "./ReviewList";

const Product = {
    buildProduct (productObject) {
        let productContainer = document.createElement("section");
        productContainer.classList.add("productContainer");

        let pieContainer = document.createElement("section");
        pieContainer.classList.add("pieContainer");

        let title = document.createElement("h2");
        title.textContent = productObject.productName;

        let imageItem = document.createElement("img");
        imageItem.classList.add("pieImage");
        imageItem.setAttribute("src", productObject.imageUrl);
        imageItem.setAttribute("alt", productObject.productName);

        let details = document.createElement("ul");

        let description = document.createElement("li");
        description.textContent = productObject.productDescription;

        let price = document.createElement("li");
        price.textContent = `Price: ${productObject.productPrice} per pie`;

        let quantity = document.createElement("li");
        quantity.textContent = `Remaining Inventory: ${productObject.productQuantity}`;

        let reviewsContainer = document.createElement("article");
        reviewsContainer.classList.add("pieReviews", `pieReview${productObject.id}`);
        ReviewList.fillReviewComponents(productObject);

        pieContainer.appendChild(title);
        pieContainer.appendChild(imageItem);
        details.appendChild(description);
        details.appendChild(price);
        details.appendChild(quantity);
        pieContainer.appendChild(details);

        productContainer.appendChild(pieContainer);
        productContainer.appendChild(reviewsContainer);

        return productContainer;
    }
};

export default Product;
