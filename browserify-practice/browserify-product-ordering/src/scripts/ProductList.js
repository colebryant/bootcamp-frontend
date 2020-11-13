// This module creates the DOM component for the list of products and then appends them to the DOM when called

import Product from "./Product";
import ProductData from "./ProductData";

const ProductList = {
    appendProductComponents () {
        ProductData.getProductData()
        .then(parsedResponse => {
            let productsFragment = document.createDocumentFragment();
            parsedResponse.forEach(productObject => {
                let productComponent = Product.buildProduct(productObject);
                productsFragment.appendChild(productComponent);
            });
            let output = document.querySelector(".output");
            output.appendChild(productsFragment);
        });
    }
};

export default ProductList;