import ReviewData from "./ReviewData";
import Review from "./Review";

const ReviewList = {
    fillReviewComponents (productObject) {
        ReviewData.getReviewData()
        .then(parsedResponse => {
            parsedResponse.forEach(review => {
                if (review.productId === productObject.id) {
                    Review.createReviewComponent(review);
                }
            });
        });
    }
};

export default ReviewList;