// Lightning Exercise 1: Use the reduce method on the following array to determine how much total rain fell last month.

const monthlyRainfall = [23, 13, 27, 20, 20, 31, 33, 26, 19, 12, 14, 12, 10];

const totalRainfall = monthlyRainfall.reduce(
    (currentTotal, nextValue) => currentTotal += nextValue,
    0
)

console.log(totalRainfall);

// Lightning Exercise 2: Use the reduce method on the following array to build a sentence.

const words = ["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"];

const sentence = words.reduce(
    (currentTotal, nextValue) => currentTotal += ` ${nextValue}`,
    0
);

console.log(sentence);

// Use the filter method to get all the big spenders in the main array into a new one.

// Array to contain all the big spenders

let bigSpendersArray = [];

const bigSpenders = businesses.filter(business => {
    if (business.orders.some(order => {
        return order > 9000;
    })) {
        bigSpendersArray.push(business.companyName);
    };
});

console.log(bigSpendersArray);

