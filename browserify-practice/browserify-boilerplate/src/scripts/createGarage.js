/*
    Author: your name here
    Name: createGarage.js
    Purpose: To store cars in garages
*/

/*
    This array only exists within the scope of this module.
    Therefore, no other module can access it. However,
    the object returned by `createGarage` object you define below allows
    code in other modules to indirectly access it by using
    the methods.
*/
const garage = []

  const createGarage = function() {
    return {
      store (car) {
        garage.push(car)
      },

      retrieve(carToFind) {
        // For more information about the Array.find method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        return garage.find(car => car.make === carToFind.make && car.model === carToFind.model)
      },

      /*
           The getInventory property is the only way for external code to
           read the value of the garage variable. There is no setter
           either. It is a read only property.
       */
      getInventory() {
        console.log(garage)
        return garage
      }
    }
  };

export default createGarage
