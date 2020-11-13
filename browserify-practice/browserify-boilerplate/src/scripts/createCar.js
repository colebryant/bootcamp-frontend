/*
    Author: your name here
    Name: createCar.js
    Purpose: Produces a new car object
*/
const createCar = function(make, model) {
  return {

    // "make": make,
    // "model": model,
    // "toString": function() {
    //   return `a ${this.make} ${this.model}`
    // },
    // "drive": function(destination) {
    //   return `You drive ${this} to ${destination}`
    // }
    make,
    model,

    makeString () {
        return `a ${this.make} ${this.model}`
    },

    drive (destination) {
        return `You drive ${this.makeString()} to ${destination}`
    }
  }
};

export default createCar;
