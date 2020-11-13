let bandNumber = 0;

const takeNumber = function (bandName) {
    bandNumber++;
    let name = `${bandNumber}. ${bandName}`;
    return name;
}

const scum = takeNumber("Galactic Scum")
console.log(scum)  // This should print "1. Galactic Scum" in the console

const under = takeNumber("Underdogs")
console.log(under)  // This should print "2. Underdogs" in the console
