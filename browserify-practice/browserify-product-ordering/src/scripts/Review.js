// This module creates the review component to be appended to the DOM

const Review = {
    createReviewComponent (reviewObject) {
        let docuFrag = document.createDocumentFragment();
        let reviewTitle = document.createElement("h3");
        reviewTitle.textContent = `Review: ${reviewObject.reviewTitle}`;
        let reviewText = document.createElement("p");
        reviewText.textContent = reviewObject.reviewText;

        docuFrag.appendChild(reviewTitle);
        docuFrag.appendChild(reviewText);

        let reviewOutput = document.querySelector(`.pieReview${reviewObject.productId}`);
        reviewOutput.appendChild(docuFrag);
    }
};

export default Review;