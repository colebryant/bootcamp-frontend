// EXERCISE 1:

const cookies = ["Oatmeal Raisin", "Chocolate Chip", "Sugar", "Peanut Butter", "Snickerdoodle", "Ginger"]

for (let x = 1; x < cookies.length; x++) {
    const currentCookie = cookies[x]
    console.log(`Mmmmmmm... that's a good ${currentCookie} cookie`)
}

// EXERCISE 2:

const conjunction = function (firstWord, secondWord) {
    return `${firstWord} ${secondWord}`
}

const conjoinedWord = conjunction("Master", "Card")
console.log(conjoinedWord)
