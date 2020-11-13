// This module fetches the product data from the API

const ProductData = {
    getProductData () {
        return fetch("http://localhost:8088/products")
            .then(response => response.json());
    }
};

export default ProductData;