(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
    Author: your name here
    Name: createCar.js
    Purpose: Produces a new car object
*/
const createCar = function (make, model) {
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

    makeString() {
      return `a ${this.make} ${this.model}`;
    },

    drive(destination) {
      return `You drive ${this.makeString()} to ${destination}`;
    }

  };
};

var _default = createCar;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
const garage = [];

const createGarage = function () {
  return {
    store(car) {
      garage.push(car);
    },

    retrieve(carToFind) {
      // For more information about the Array.find method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      return garage.find(car => car.make === carToFind.make && car.model === carToFind.model);
    },

    /*
         The getInventory property is the only way for external code to
         read the value of the garage variable. There is no setter
         either. It is a read only property.
     */
    getInventory() {
      console.log(garage);
      return garage;
    }

  };
};

var _default = createGarage;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _createCar = _interopRequireDefault(require("./createCar"));

var _createGarage = _interopRequireDefault(require("./createGarage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: your name here
    Name: main.js
    Purpose: Entry point of our application
*/
// Create four cars using the function you imported.
// Each of these variables contains an object that the factory function returns
const mustang = (0, _createCar.default)("Ford", "Mustang");
const accord = (0, _createCar.default)("Honda", "Accord");
const santafe = (0, _createCar.default)("Hyundai", "Santa Fe");
const sierra = (0, _createCar.default)("GMC", "Sierra"); // Make a new garage and store cars in it

const garage = (0, _createGarage.default)(); //Remember, this function return an object

garage.store(mustang);
garage.store(accord);
garage.store(santafe);
garage.store(sierra);
console.table(garage.getInventory());
console.table(garage.retrieve(sierra));

},{"./createCar":1,"./createGarage":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NyZWF0ZUNhci5qcyIsIi4uL3NjcmlwdHMvY3JlYXRlR2FyYWdlLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7OztBQUtBLE1BQU0sU0FBUyxHQUFHLFVBQVMsSUFBVCxFQUFlLEtBQWYsRUFBc0I7QUFDdEMsU0FBTztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFBLElBVks7QUFXTCxJQUFBLEtBWEs7O0FBYUwsSUFBQSxVQUFVLEdBQUk7QUFDVixhQUFRLEtBQUksS0FBSyxJQUFLLElBQUcsS0FBSyxLQUFNLEVBQXBDO0FBQ0gsS0FmSTs7QUFpQkwsSUFBQSxLQUFLLENBQUUsV0FBRixFQUFlO0FBQ2hCLGFBQVEsYUFBWSxLQUFLLFVBQUwsRUFBa0IsT0FBTSxXQUFZLEVBQXhEO0FBQ0g7O0FBbkJJLEdBQVA7QUFxQkQsQ0F0QkQ7O2VBd0JlLFM7Ozs7Ozs7Ozs7O0FDN0JmOzs7Ozs7QUFNQTs7Ozs7OztBQU9BLE1BQU0sTUFBTSxHQUFHLEVBQWY7O0FBRUUsTUFBTSxZQUFZLEdBQUcsWUFBVztBQUM5QixTQUFPO0FBQ0wsSUFBQSxLQUFLLENBQUUsR0FBRixFQUFPO0FBQ1YsTUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQVo7QUFDRCxLQUhJOztBQUtMLElBQUEsUUFBUSxDQUFDLFNBQUQsRUFBWTtBQUNsQjtBQUNBLGFBQU8sTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosS0FBYSxTQUFTLENBQUMsSUFBdkIsSUFBK0IsR0FBRyxDQUFDLEtBQUosS0FBYyxTQUFTLENBQUMsS0FBMUUsQ0FBUDtBQUNELEtBUkk7O0FBVUw7Ozs7O0FBS0EsSUFBQSxZQUFZLEdBQUc7QUFDYixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtBQUNBLGFBQU8sTUFBUDtBQUNEOztBQWxCSSxHQUFQO0FBb0JELENBckJEOztlQXVCYSxZOzs7Ozs7QUNqQ2Y7O0FBQ0E7Ozs7QUFOQTs7Ozs7QUFRQTtBQUNBO0FBQ0EsTUFBTSxPQUFPLEdBQUcsd0JBQVUsTUFBVixFQUFrQixTQUFsQixDQUFoQjtBQUNBLE1BQU0sTUFBTSxHQUFHLHdCQUFVLE9BQVYsRUFBbUIsUUFBbkIsQ0FBZjtBQUNBLE1BQU0sT0FBTyxHQUFHLHdCQUFVLFNBQVYsRUFBcUIsVUFBckIsQ0FBaEI7QUFDQSxNQUFNLE1BQU0sR0FBRyx3QkFBVSxLQUFWLEVBQWlCLFFBQWpCLENBQWYsQyxDQUVBOztBQUNBLE1BQU0sTUFBTSxHQUFHLDRCQUFmLEMsQ0FBOEI7O0FBQzlCLE1BQU0sQ0FBQyxLQUFQLENBQWEsT0FBYjtBQUNBLE1BQU0sQ0FBQyxLQUFQLENBQWEsTUFBYjtBQUNBLE1BQU0sQ0FBQyxLQUFQLENBQWEsT0FBYjtBQUNBLE1BQU0sQ0FBQyxLQUFQLENBQWEsTUFBYjtBQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBTSxDQUFDLFlBQVAsRUFBZDtBQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXHJcbiAgICBBdXRob3I6IHlvdXIgbmFtZSBoZXJlXHJcbiAgICBOYW1lOiBjcmVhdGVDYXIuanNcclxuICAgIFB1cnBvc2U6IFByb2R1Y2VzIGEgbmV3IGNhciBvYmplY3RcclxuKi9cclxuY29uc3QgY3JlYXRlQ2FyID0gZnVuY3Rpb24obWFrZSwgbW9kZWwpIHtcclxuICByZXR1cm4ge1xyXG5cclxuICAgIC8vIFwibWFrZVwiOiBtYWtlLFxyXG4gICAgLy8gXCJtb2RlbFwiOiBtb2RlbCxcclxuICAgIC8vIFwidG9TdHJpbmdcIjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgIHJldHVybiBgYSAke3RoaXMubWFrZX0gJHt0aGlzLm1vZGVsfWBcclxuICAgIC8vIH0sXHJcbiAgICAvLyBcImRyaXZlXCI6IGZ1bmN0aW9uKGRlc3RpbmF0aW9uKSB7XHJcbiAgICAvLyAgIHJldHVybiBgWW91IGRyaXZlICR7dGhpc30gdG8gJHtkZXN0aW5hdGlvbn1gXHJcbiAgICAvLyB9XHJcbiAgICBtYWtlLFxyXG4gICAgbW9kZWwsXHJcblxyXG4gICAgbWFrZVN0cmluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBhICR7dGhpcy5tYWtlfSAke3RoaXMubW9kZWx9YFxyXG4gICAgfSxcclxuXHJcbiAgICBkcml2ZSAoZGVzdGluYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gYFlvdSBkcml2ZSAke3RoaXMubWFrZVN0cmluZygpfSB0byAke2Rlc3RpbmF0aW9ufWBcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDYXI7XHJcbiIsIi8qXHJcbiAgICBBdXRob3I6IHlvdXIgbmFtZSBoZXJlXHJcbiAgICBOYW1lOiBjcmVhdGVHYXJhZ2UuanNcclxuICAgIFB1cnBvc2U6IFRvIHN0b3JlIGNhcnMgaW4gZ2FyYWdlc1xyXG4qL1xyXG5cclxuLypcclxuICAgIFRoaXMgYXJyYXkgb25seSBleGlzdHMgd2l0aGluIHRoZSBzY29wZSBvZiB0aGlzIG1vZHVsZS5cclxuICAgIFRoZXJlZm9yZSwgbm8gb3RoZXIgbW9kdWxlIGNhbiBhY2Nlc3MgaXQuIEhvd2V2ZXIsXHJcbiAgICB0aGUgb2JqZWN0IHJldHVybmVkIGJ5IGBjcmVhdGVHYXJhZ2VgIG9iamVjdCB5b3UgZGVmaW5lIGJlbG93IGFsbG93c1xyXG4gICAgY29kZSBpbiBvdGhlciBtb2R1bGVzIHRvIGluZGlyZWN0bHkgYWNjZXNzIGl0IGJ5IHVzaW5nXHJcbiAgICB0aGUgbWV0aG9kcy5cclxuKi9cclxuY29uc3QgZ2FyYWdlID0gW11cclxuXHJcbiAgY29uc3QgY3JlYXRlR2FyYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdG9yZSAoY2FyKSB7XHJcbiAgICAgICAgZ2FyYWdlLnB1c2goY2FyKVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgcmV0cmlldmUoY2FyVG9GaW5kKSB7XHJcbiAgICAgICAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIEFycmF5LmZpbmQgbWV0aG9kOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maW5kXHJcbiAgICAgICAgcmV0dXJuIGdhcmFnZS5maW5kKGNhciA9PiBjYXIubWFrZSA9PT0gY2FyVG9GaW5kLm1ha2UgJiYgY2FyLm1vZGVsID09PSBjYXJUb0ZpbmQubW9kZWwpXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgICAgIFRoZSBnZXRJbnZlbnRvcnkgcHJvcGVydHkgaXMgdGhlIG9ubHkgd2F5IGZvciBleHRlcm5hbCBjb2RlIHRvXHJcbiAgICAgICAgICAgcmVhZCB0aGUgdmFsdWUgb2YgdGhlIGdhcmFnZSB2YXJpYWJsZS4gVGhlcmUgaXMgbm8gc2V0dGVyXHJcbiAgICAgICAgICAgZWl0aGVyLiBJdCBpcyBhIHJlYWQgb25seSBwcm9wZXJ0eS5cclxuICAgICAgICovXHJcbiAgICAgIGdldEludmVudG9yeSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhnYXJhZ2UpXHJcbiAgICAgICAgcmV0dXJuIGdhcmFnZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhcmFnZVxyXG4iLCIvKlxyXG4gICAgQXV0aG9yOiB5b3VyIG5hbWUgaGVyZVxyXG4gICAgTmFtZTogbWFpbi5qc1xyXG4gICAgUHVycG9zZTogRW50cnkgcG9pbnQgb2Ygb3VyIGFwcGxpY2F0aW9uXHJcbiovXHJcbmltcG9ydCBjcmVhdGVDYXIgZnJvbSBcIi4vY3JlYXRlQ2FyXCJcclxuaW1wb3J0IGNyZWF0ZUdhcmFnZSBmcm9tIFwiLi9jcmVhdGVHYXJhZ2VcIlxyXG5cclxuLy8gQ3JlYXRlIGZvdXIgY2FycyB1c2luZyB0aGUgZnVuY3Rpb24geW91IGltcG9ydGVkLlxyXG4vLyBFYWNoIG9mIHRoZXNlIHZhcmlhYmxlcyBjb250YWlucyBhbiBvYmplY3QgdGhhdCB0aGUgZmFjdG9yeSBmdW5jdGlvbiByZXR1cm5zXHJcbmNvbnN0IG11c3RhbmcgPSBjcmVhdGVDYXIoXCJGb3JkXCIsIFwiTXVzdGFuZ1wiKVxyXG5jb25zdCBhY2NvcmQgPSBjcmVhdGVDYXIoXCJIb25kYVwiLCBcIkFjY29yZFwiKVxyXG5jb25zdCBzYW50YWZlID0gY3JlYXRlQ2FyKFwiSHl1bmRhaVwiLCBcIlNhbnRhIEZlXCIpXHJcbmNvbnN0IHNpZXJyYSA9IGNyZWF0ZUNhcihcIkdNQ1wiLCBcIlNpZXJyYVwiKVxyXG5cclxuLy8gTWFrZSBhIG5ldyBnYXJhZ2UgYW5kIHN0b3JlIGNhcnMgaW4gaXRcclxuY29uc3QgZ2FyYWdlID0gY3JlYXRlR2FyYWdlKCkgLy9SZW1lbWJlciwgdGhpcyBmdW5jdGlvbiByZXR1cm4gYW4gb2JqZWN0XHJcbmdhcmFnZS5zdG9yZShtdXN0YW5nKVxyXG5nYXJhZ2Uuc3RvcmUoYWNjb3JkKVxyXG5nYXJhZ2Uuc3RvcmUoc2FudGFmZSlcclxuZ2FyYWdlLnN0b3JlKHNpZXJyYSlcclxuXHJcbmNvbnNvbGUudGFibGUoZ2FyYWdlLmdldEludmVudG9yeSgpKVxyXG5jb25zb2xlLnRhYmxlKGdhcmFnZS5yZXRyaWV2ZShzaWVycmEpKVxyXG4iXX0=
