// This module fetches the review data from the API

const ReviewData = {
    getReviewData () {
        return fetch("http://localhost:8088/reviews")
            .then(response => response.json())
    }
};

export default ReviewData;
