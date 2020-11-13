/*
    Author: your name here
    Name: main.js
    Purpose: Entry point of our application
*/
import createCar from "./createCar"
import createGarage from "./createGarage"

// Create four cars using the function you imported.
// Each of these variables contains an object that the factory function returns
const mustang = createCar("Ford", "Mustang")
const accord = createCar("Honda", "Accord")
const santafe = createCar("Hyundai", "Santa Fe")
const sierra = createCar("GMC", "Sierra")

// Make a new garage and store cars in it
const garage = createGarage() //Remember, this function return an object
garage.store(mustang)
garage.store(accord)
garage.store(santafe)
garage.store(sierra)

console.table(garage.getInventory())
console.table(garage.retrieve(sierra))
