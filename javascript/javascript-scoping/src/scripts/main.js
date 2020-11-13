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

// EXERCISE 3:


const ModSquad = {
    "members": ["Pete Cochran", "Linc Hayes", "Julie Barnes", "Capt. Adam Greer", "Chief Barney Metcalf"],
    "series": {
        "start": "1968",
        "end": "1973"
    }
}

let HTMLRepresentation = `<h1>The Mod Squad</h1>`

ModSquad.members.forEach(member => {
    HTMLRepresentation += `<div>${member}</div>`
})

document.querySelector(".show-info").innerHTML = HTMLRepresentation

// EXERCISE 4:

const locations = [[2,1], [1,2], [1,3], [2,1], [2,2], [2,3]]

let i = 0;

for (let k = 0; k < locations.length; k++) {
    const currentLocation = locations[k];
    let invalidLocation = false;
    if (currentLocation[0] > 2) {
        invalidLocation = true;
        i++;
    }
    if (invalidLocation) {
        console.log("This location is invalid");
    }
}

console.log(`There were ${i} invalid locations`);

// ADVANCED CHALLENGE !!!

const llamaNamer = function () {
    const possibleNames = ["Larry", "Leon", "Leona", "Les", "Laura", "Lemony", "Lars", "Lekisha"];
    const randomizer = Math.floor(Math.random() * 7);

    const namer = function () {
        const suffix = " the Llama";
        const name = possibleNames[randomizer];
        return name + suffix;
    }
    return namer();
}

nameMaker = llamaNamer();
console.log(nameMaker);