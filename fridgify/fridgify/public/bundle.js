(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _foodCollection = _interopRequireDefault(require("./foodCollection"));

var _foodList = _interopRequireDefault(require("./foodList"));

var _foodEditForm = _interopRequireDefault(require("./foodEditForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Given a single food object, this component builds out the HTML and returns it
const food = {
  // This method takes one argument, which we expect to be an object that represents a food and will have the following structure:
  // {
  //   name: "name value",
  //   expiration: "expiration value",
  //   type: "type value"
  // }
  // Given this object, the method will build HTML elements and append them appropriately so that it will look like this:
  // <article>
  //   <h3>name value</h3>
  //   <p>expiration value</p>
  //   <p>type value</p>
  // </article>
  // This HTML is then returned to the point from where this method was called
  foodBuilder(foodObject) {
    let foodArticle = document.createElement("article"); // In order to have the id of the food item available when the user clicks on the delete and edit button, we set the id of the HTML article element for each food item to contain the id of the item in the API. We are intentionally planning ahead and formating the id this way so that when the buttons are clicked, we can use the split method for strings to get just the id number of the food item to be edited/deleted. Also, because we are using the ids from the API, it also ensures that each delete button has a unique id. By moving the id to the article element, it also gives us a a way to target the whole article element so that we can replace the contents of the article element with a pre-filled form when the user clicks the edit button.

    foodArticle.setAttribute("id", `food--${foodObject.id}`);
    let foodName = document.createElement("h3");
    foodName.textContent = foodObject.name;
    let foodExp = document.createElement("p");
    foodExp.textContent = foodObject.expiration;
    let foodType = document.createElement("p");
    foodType.textContent = foodObject.type; // In order to change the data for an existing food item in our API, we need to provide the user with a way to edit the existing values. This means we will show the user a form with the existing values already populated. Once again, we want our data to be our point of truth. So we make a HTTP GET request targeting the specific food item the user wants to edit to get the data that will be populated in the form. Once we have that data, we can build the form, populate the input fields with our data form the GET request and then append that form to the appropriate place on the DOM.

    let editFoodButton = document.createElement("button");
    editFoodButton.textContent = "Edit";
    editFoodButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let foodId = articleId.split("--")[1];

      _foodCollection.default.getFood(foodId).then(response => {
        _foodEditForm.default.createAndAppendForm(articleId, response);
      });
    }); // Since we can get the id of the food item to be deleted from the parent element(the article element), we can use that to make an HTTP DELETE request to our API. Once again after this we want to get the list of food items from the API using a HTTP GET request and display it to the user so that the user does not have to refresh the page in order to see that the item they deleted has actually been deleted.

    let deleteFoodButton = document.createElement("button");
    deleteFoodButton.textContent = "Delete";
    deleteFoodButton.addEventListener("click", () => {
      let foodId = event.target.parentNode.id.split("--")[1];

      _foodCollection.default.deleteFood(foodId).then(response => {
        _foodList.default.fridgify();
      });
    });
    foodArticle.appendChild(foodName);
    foodArticle.appendChild(foodExp);
    foodArticle.appendChild(foodType);
    foodArticle.appendChild(editFoodButton);
    foodArticle.appendChild(deleteFoodButton);
    return foodArticle;
  }

};
var _default = food;
exports.default = _default;

},{"./foodCollection":2,"./foodEditForm":3,"./foodList":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Component responsible for interacting with the API. All fetch calls for this application will be defined here
const foodCollection = {
  // This method returns a fetch, which means it is returning a promise. Which means to access the response from the asynchronous HTTP GET request that is being made by this fetch, we can chain a .then at the point where this method(getAllFoods) is called. The .then then is chained to the fetch inside the method is parsing the data from JSON to data structures Javascript will understand. In this case, because we have a collection of items, it will be an array of objects.
  getAllFoods() {
    return fetch("http://localhost:8088/fridge").then(response => response.json());
  },

  // This method will make a HTTP POST request to the API. Because a POST has a body with the data for the new item you want created, this method will take one argument which will be the object for the new food item we want to add to our collection in the API.
  postNewFood(newFoodToSave) {
    // We want to return this fetch request so that at the point it is called, we can take advantage of the asynchronous nature of promises to wait for this to be done before getting the latest data and rerendering the DOM.
    return fetch("http://localhost:8088/fridge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFoodToSave)
    });
  },

  // In order to delete a item from the JSON Server API, all we need is the id of the item in order to target it, which is the only argument this method has.
  deleteFood(foodId) {
    return fetch(`http://localhost:8088/fridge/${foodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  // Again, you need the id of the food item in order to get data for that item back from the API.
  getFood(foodId) {
    return fetch(`http://localhost:8088/fridge/${foodId}`).then(response => response.json());
  },

  // In order to edit an existing food item, we need the id to identify which food item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
  putExistingFood(foodId, foodToEdit) {
    return fetch(`http://localhost:8088/fridge/${foodId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(foodToEdit)
    });
  }

};
var _default = foodCollection;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _foodCollection = _interopRequireDefault(require("./foodCollection"));

var _foodList = _interopRequireDefault(require("./foodList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const foodEditForm = {
  // This module will build an edit form and append it to the DOM. The form will contain input fields with existing values from the API and an Update button. The user can edit the the values in the input fields. An event listener on the Update button will handle taking the new values entered by the user and calling the API to update the data.
  createAndAppendForm(articleId, foodObjToEdit) {
    // Building the edit form with fields for the name, expiration and type of the food item. Each of the input fields contains the existing values from the database.
    let foodNameField = document.createElement("p");
    let foodNameLabel = document.createElement("label");
    foodNameLabel.textContent = "Name";
    let foodNameInput = document.createElement("input");
    foodNameInput.value = foodObjToEdit.name;
    foodNameField.appendChild(foodNameLabel);
    foodNameField.appendChild(foodNameInput);
    let foodExpirationField = document.createElement("p");
    let foodExpirationLabel = document.createElement("label");
    foodExpirationLabel.textContent = "Expiration";
    let foodExpirationInput = document.createElement("input");
    foodExpirationInput.value = foodObjToEdit.expiration;
    foodExpirationField.appendChild(foodExpirationLabel);
    foodExpirationField.appendChild(foodExpirationInput);
    let foodTypeField = document.createElement("p");
    let foodTypeLabel = document.createElement("label");
    foodTypeLabel.textContent = "Type";
    let foodTypeInput = document.createElement("input");
    foodTypeInput.value = foodObjToEdit.type;
    foodTypeField.appendChild(foodTypeLabel);
    foodTypeField.appendChild(foodTypeInput);
    let updateButton = document.createElement("button");
    updateButton.textContent = "Update"; // There is an event listener on the Update button which will take the new values in the input fields and build an object for the food item to be edited. Then we make a HTTP PUT request where we target the food item we want to edit by specifying the id in the URL. We also pass the object representing the food item with the new values as data in our HTTP request. Once again, because our data has been modified, we make an HTTP GET request to get all the food items and display them.

    updateButton.addEventListener("click", () => {
      let editedFood = {
        name: foodNameInput.value,
        expiration: foodExpirationInput.value,
        type: foodTypeInput.value
      };

      _foodCollection.default.putExistingFood(foodObjToEdit.id, editedFood).then(response => {
        _foodList.default.fridgify();
      });
    }); // We passed in the id of the article so we know exactly where to append the edit form.

    let foodItemArticle = document.querySelector(`#${articleId}`); // Because we want to replace what is currently in the article element with the edit form, we clear out all children HTML elements in our targeted element before appending our edit form to it.

    while (foodItemArticle.firstChild) {
      foodItemArticle.removeChild(foodItemArticle.firstChild);
    }

    foodItemArticle.appendChild(foodNameField);
    foodItemArticle.appendChild(foodExpirationField);
    foodItemArticle.appendChild(foodTypeField);
    foodItemArticle.appendChild(updateButton);
  }

};
var _default = foodEditForm;
exports.default = _default;

},{"./foodCollection":2,"./foodList":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _foodCollection = _interopRequireDefault(require("./foodCollection"));

var _foodList = _interopRequireDefault(require("./foodList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const foodForm = {
  // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new food to their refrigerator and a button with an event listener that will listen for the click
  createAndAppendForm() {
    // 1. Build HTML form
    let formHeader = document.createElement("h3");
    formHeader.textContent = "Add something to your refrigerator";
    let foodNameField = document.createElement("fieldset");
    let foodNameLabel = document.createElement("label");
    foodNameLabel.textContent = "Name";
    foodNameLabel.setAttribute("for", "food__name");
    let foodNameInput = document.createElement("input");
    foodNameInput.setAttribute("id", "food__name");
    foodNameInput.setAttribute("name", "food__name");
    foodNameField.appendChild(foodNameLabel);
    foodNameField.appendChild(foodNameInput);
    let foodExpirationField = document.createElement("fieldset");
    let foodExpirationLabel = document.createElement("label");
    foodExpirationLabel.textContent = "Expiration";
    foodExpirationLabel.setAttribute("for", "food__expiration");
    let foodExpirationInput = document.createElement("input");
    foodExpirationInput.setAttribute("id", "food__expiration");
    foodExpirationInput.setAttribute("name", "food__expiration");
    foodExpirationField.appendChild(foodExpirationLabel);
    foodExpirationField.appendChild(foodExpirationInput);
    let foodTypeField = document.createElement("fieldset");
    let foodTypeLabel = document.createElement("label");
    foodTypeLabel.textContent = "Type";
    foodTypeLabel.setAttribute("for", "food__type");
    let foodTypeInput = document.createElement("input");
    foodTypeInput.setAttribute("id", "food__type");
    foodTypeInput.setAttribute("name", "food__type");
    foodTypeField.appendChild(foodTypeLabel);
    foodTypeField.appendChild(foodTypeInput);
    let submitButton = document.createElement("button");
    submitButton.textContent = "Add Food";
    submitButton.setAttribute("class", "food__save"); // 2. Attach event listener to button in form

    submitButton.addEventListener("click", this.handleAddNewFood); // 3. Append the HTML form to the DOM
    //Notice that I have added an article element to my index.html with the class "form".

    let foodFormFragment = document.createDocumentFragment();
    foodFormFragment.appendChild(formHeader);
    foodFormFragment.appendChild(foodNameField);
    foodFormFragment.appendChild(foodExpirationField);
    foodFormFragment.appendChild(foodTypeField);
    foodFormFragment.appendChild(submitButton);
    let formArticle = document.querySelector(".form");
    formArticle.appendChild(foodFormFragment);
  },

  // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
  handleAddNewFood(event) {
    // 1. Get user input that user entered
    let inputFoodName = document.querySelector("#food__name").value;
    let inputFoodExpiration = document.querySelector("#food__expiration").value;
    let inputFoodType = document.querySelector("#food__type").value; // 2. Create a new object with the same structure we have been using throughout the application to represent a food item:
    // {
    //   name: "user input name",
    //   expiration: "user input expiration",
    //   type: "user input type"
    // }

    let newFood = {
      name: inputFoodName,
      expiration: inputFoodExpiration,
      type: inputFoodType // 3. Call the method(postNewFood) with the fetch request to POST to the API and pass it the object we created in the previous step
      // Notice the import statement at the top of the module so I can call a method in the foodCollection module.
      // *****IMPORTANT*****
      // You will notice at this point that while a new food item is being added to our API, unless you refresh the application, the newly added item will not show up on the DOM. We definitely do not want our user to have to hit refresh every time they add new food to their refrigerator.
      // We also do NOT want to manually add our new food item to the list of food on the DOM. Instead, we want our data to be our point of truth. Our DOM should always use the data from our API to render the DOM. Logically, here are the steps we want to take place.
      // 1. Add new food item to the API using a POST HTTP request.
      //     We are already doing this. We are using the fetch defined in the foodCollection module to add a new food item to the API.
      // 2. After the new item has been added, we want to get a list of all the food items (using a GET HTTP request) and render them to the DOM.
      // Because we want to make sure we only do this after the first step is done, we will return the fetch call that is doing the POST and chain a .then to the call (just like we do with the GET). This means we are doing the POST and then waiting until a response comes back before doing this step. The reason we want to wait is because we want to be sure that when we ask our API for the list of food items, the newly added item is on that list. So we wait until it has been added before using a GET request to get a list of all food items and rendering them to the DOM.
      // But that sounds awfully familiar: make a GET HTTP request to the API for a list of all food items, iterate over that list and build the HTML for each item, append the HTML to the DOM. This is exactly what our fridgify method in our foodList module is already doing. Which means I can simply call that method from here. Once again, note that I am importing the appropriate module at the top of this file.
      // To summarize, we are adding a new item to the API, then getting an updated list of items from the API and rerendering the DOM.
      // *******************

    };

    _foodCollection.default.postNewFood(newFood).then(response => {
      _foodList.default.fridgify();
    });
  }

};
var _default = foodForm;
exports.default = _default;

},{"./foodCollection":2,"./foodList":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _foodCollection = _interopRequireDefault(require("./foodCollection"));

var _food = _interopRequireDefault(require("./food"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This component will get the data, build the HTML from the data and append it to the DOM.
// To get the data, we will use the foodCollection component.
// To build the HTML for each object in the array of food(which is what the data coming from the API becomes once we parse it), we will use the food component.
const foodList = {
  fridgify() {
    // 1. Get data
    // The getAllFoods method will do a fetch and return a promise. This call will return the data from the API in the response.
    _foodCollection.default.getAllFoods().then(allFoods => {
      // An empty document fragment
      let foodDocFragment = document.createDocumentFragment(); // 2. Iterate over data and build HTML for each item
      // We loop over the array of objects returned from our API and for each obect, we make a call to the foodBuilder method in the food module. This method takes a food object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.

      allFoods.forEach(foodItem => {
        let foodHtml = _food.default.foodBuilder(foodItem);

        foodDocFragment.appendChild(foodHtml);
      }); // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output" and append our document fragment to that element. Because the HTML element with class "output" is already on the DOM, the HTML in the document fragment is appended to the DOM.

      let outputArticle = document.querySelector(".output"); //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
      // outputArticle.innerHTML = ""
      // If we do not do this, each time we add a new food item using our form, all the food items will be appended to the bottom of our list so that we will have duplicates. To understand why this while loop is needed, try commenting it out and observe the behavior of the application. Essentially, we are clearing out our output container (our article tag with class "output") so that we repopulate it.

      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }

      outputArticle.appendChild(foodDocFragment);
    });
  }

};
var _default = foodList;
exports.default = _default;

},{"./food":1,"./foodCollection":2}],6:[function(require,module,exports){
"use strict";

var _foodList = _interopRequireDefault(require("./foodList"));

var _foodForm = _interopRequireDefault(require("./foodForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_foodList.default.fridgify();

_foodForm.default.createAndAppendForm();

},{"./foodForm":4,"./foodList":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2Zvb2QuanMiLCIuLi9zY3JpcHRzL2Zvb2RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9mb29kRWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL2Zvb2RGb3JtLmpzIiwiLi4vc2NyaXB0cy9mb29kTGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7OztBQUVBO0FBQ0EsTUFBTSxJQUFJLEdBQUc7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLEVBQUEsV0FBVyxDQUFDLFVBQUQsRUFBYTtBQUN0QixRQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixDQUFsQixDQURzQixDQUV0Qjs7QUFDQSxJQUFBLFdBQVcsQ0FBQyxZQUFaLENBQXlCLElBQXpCLEVBQWdDLFNBQVEsVUFBVSxDQUFDLEVBQUcsRUFBdEQ7QUFFQSxRQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFmO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxHQUF1QixVQUFVLENBQUMsSUFBbEM7QUFFQSxRQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFkO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixHQUFzQixVQUFVLENBQUMsVUFBakM7QUFFQSxRQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFmO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxHQUF1QixVQUFVLENBQUMsSUFBbEMsQ0Fac0IsQ0FjdEI7O0FBQ0EsUUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBckI7QUFDQSxJQUFB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O0FBQ2YsRUFBQSxRQUFRLEdBQUU7QUFDUjtBQUNBO0FBQ0EsNEJBQWUsV0FBZixHQUNDLElBREQsQ0FDTSxRQUFRLElBQUk7QUFFaEI7QUFDQSxVQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBdEIsQ0FIZ0IsQ0FLaEI7QUFDQTs7QUFDQSxNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLFFBQVEsSUFBSTtBQUMzQixZQUFJLFFBQVEsR0FBRyxjQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBZjs7QUFDQSxRQUFBLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixRQUE1QjtBQUNELE9BSEQsRUFQZ0IsQ0FZaEI7QUFDQTs7QUFDQSxVQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixDQUFwQixDQWRnQixDQWdCaEI7QUFDQTtBQUVBOztBQUNBLGFBQU8sYUFBYSxDQUFDLFVBQXJCLEVBQWlDO0FBQy9CLFFBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsYUFBYSxDQUFDLFVBQXhDO0FBQ0Q7O0FBQ0QsTUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixlQUExQjtBQUVELEtBMUJEO0FBMkJEOztBQS9CYyxDQUFqQjtlQWtDZSxROzs7Ozs7QUN6Q2Y7O0FBQ0E7Ozs7QUFFQSxrQkFBUyxRQUFUOztBQUNBLGtCQUFTLG1CQUFUIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGZvb2RDb2xsZWN0aW9uIGZyb20gXCIuL2Zvb2RDb2xsZWN0aW9uXCJcclxuaW1wb3J0IGZvb2RMaXN0IGZyb20gXCIuL2Zvb2RMaXN0XCJcclxuaW1wb3J0IGZvb2RFZGl0Rm9ybSBmcm9tIFwiLi9mb29kRWRpdEZvcm1cIlxyXG5cclxuLy9HaXZlbiBhIHNpbmdsZSBmb29kIG9iamVjdCwgdGhpcyBjb21wb25lbnQgYnVpbGRzIG91dCB0aGUgSFRNTCBhbmQgcmV0dXJucyBpdFxyXG5jb25zdCBmb29kID0ge1xyXG5cclxuICAvLyBUaGlzIG1ldGhvZCB0YWtlcyBvbmUgYXJndW1lbnQsIHdoaWNoIHdlIGV4cGVjdCB0byBiZSBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZm9vZCBhbmQgd2lsbCBoYXZlIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxyXG4gIC8vIHtcclxuICAvLyAgIG5hbWU6IFwibmFtZSB2YWx1ZVwiLFxyXG4gIC8vICAgZXhwaXJhdGlvbjogXCJleHBpcmF0aW9uIHZhbHVlXCIsXHJcbiAgLy8gICB0eXBlOiBcInR5cGUgdmFsdWVcIlxyXG4gIC8vIH1cclxuXHJcbiAgLy8gR2l2ZW4gdGhpcyBvYmplY3QsIHRoZSBtZXRob2Qgd2lsbCBidWlsZCBIVE1MIGVsZW1lbnRzIGFuZCBhcHBlbmQgdGhlbSBhcHByb3ByaWF0ZWx5IHNvIHRoYXQgaXQgd2lsbCBsb29rIGxpa2UgdGhpczpcclxuICAvLyA8YXJ0aWNsZT5cclxuICAvLyAgIDxoMz5uYW1lIHZhbHVlPC9oMz5cclxuICAvLyAgIDxwPmV4cGlyYXRpb24gdmFsdWU8L3A+XHJcbiAgLy8gICA8cD50eXBlIHZhbHVlPC9wPlxyXG4gIC8vIDwvYXJ0aWNsZT5cclxuXHJcbiAgLy8gVGhpcyBIVE1MIGlzIHRoZW4gcmV0dXJuZWQgdG8gdGhlIHBvaW50IGZyb20gd2hlcmUgdGhpcyBtZXRob2Qgd2FzIGNhbGxlZFxyXG4gIGZvb2RCdWlsZGVyKGZvb2RPYmplY3QpIHtcclxuICAgIGxldCBmb29kQXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpXHJcbiAgICAvLyBJbiBvcmRlciB0byBoYXZlIHRoZSBpZCBvZiB0aGUgZm9vZCBpdGVtIGF2YWlsYWJsZSB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgZGVsZXRlIGFuZCBlZGl0IGJ1dHRvbiwgd2Ugc2V0IHRoZSBpZCBvZiB0aGUgSFRNTCBhcnRpY2xlIGVsZW1lbnQgZm9yIGVhY2ggZm9vZCBpdGVtIHRvIGNvbnRhaW4gdGhlIGlkIG9mIHRoZSBpdGVtIGluIHRoZSBBUEkuIFdlIGFyZSBpbnRlbnRpb25hbGx5IHBsYW5uaW5nIGFoZWFkIGFuZCBmb3JtYXRpbmcgdGhlIGlkIHRoaXMgd2F5IHNvIHRoYXQgd2hlbiB0aGUgYnV0dG9ucyBhcmUgY2xpY2tlZCwgd2UgY2FuIHVzZSB0aGUgc3BsaXQgbWV0aG9kIGZvciBzdHJpbmdzIHRvIGdldCBqdXN0IHRoZSBpZCBudW1iZXIgb2YgdGhlIGZvb2QgaXRlbSB0byBiZSBlZGl0ZWQvZGVsZXRlZC4gQWxzbywgYmVjYXVzZSB3ZSBhcmUgdXNpbmcgdGhlIGlkcyBmcm9tIHRoZSBBUEksIGl0IGFsc28gZW5zdXJlcyB0aGF0IGVhY2ggZGVsZXRlIGJ1dHRvbiBoYXMgYSB1bmlxdWUgaWQuIEJ5IG1vdmluZyB0aGUgaWQgdG8gdGhlIGFydGljbGUgZWxlbWVudCwgaXQgYWxzbyBnaXZlcyB1cyBhIGEgd2F5IHRvIHRhcmdldCB0aGUgd2hvbGUgYXJ0aWNsZSBlbGVtZW50IHNvIHRoYXQgd2UgY2FuIHJlcGxhY2UgdGhlIGNvbnRlbnRzIG9mIHRoZSBhcnRpY2xlIGVsZW1lbnQgd2l0aCBhIHByZS1maWxsZWQgZm9ybSB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgZWRpdCBidXR0b24uXHJcbiAgICBmb29kQXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZm9vZC0tJHtmb29kT2JqZWN0LmlkfWApXHJcbiAgICBcclxuICAgIGxldCBmb29kTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxyXG4gICAgZm9vZE5hbWUudGV4dENvbnRlbnQgPSBmb29kT2JqZWN0Lm5hbWVcclxuXHJcbiAgICBsZXQgZm9vZEV4cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBmb29kRXhwLnRleHRDb250ZW50ID0gZm9vZE9iamVjdC5leHBpcmF0aW9uXHJcblxyXG4gICAgbGV0IGZvb2RUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgIGZvb2RUeXBlLnRleHRDb250ZW50ID0gZm9vZE9iamVjdC50eXBlXHJcblxyXG4gICAgLy8gSW4gb3JkZXIgdG8gY2hhbmdlIHRoZSBkYXRhIGZvciBhbiBleGlzdGluZyBmb29kIGl0ZW0gaW4gb3VyIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSB1c2VyIHdpdGggYSB3YXkgdG8gZWRpdCB0aGUgZXhpc3RpbmcgdmFsdWVzLiBUaGlzIG1lYW5zIHdlIHdpbGwgc2hvdyB0aGUgdXNlciBhIGZvcm0gd2l0aCB0aGUgZXhpc3RpbmcgdmFsdWVzIGFscmVhZHkgcG9wdWxhdGVkLiBPbmNlIGFnYWluLCB3ZSB3YW50IG91ciBkYXRhIHRvIGJlIG91ciBwb2ludCBvZiB0cnV0aC4gU28gd2UgbWFrZSBhIEhUVFAgR0VUIHJlcXVlc3QgdGFyZ2V0aW5nIHRoZSBzcGVjaWZpYyBmb29kIGl0ZW0gdGhlIHVzZXIgd2FudHMgdG8gZWRpdCB0byBnZXQgdGhlIGRhdGEgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpbiB0aGUgZm9ybS4gT25jZSB3ZSBoYXZlIHRoYXQgZGF0YSwgd2UgY2FuIGJ1aWxkIHRoZSBmb3JtLCBwb3B1bGF0ZSB0aGUgaW5wdXQgZmllbGRzIHdpdGggb3VyIGRhdGEgZm9ybSB0aGUgR0VUIHJlcXVlc3QgYW5kIHRoZW4gYXBwZW5kIHRoYXQgZm9ybSB0byB0aGUgYXBwcm9wcmlhdGUgcGxhY2Ugb24gdGhlIERPTS5cclxuICAgIGxldCBlZGl0Rm9vZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgIGVkaXRGb29kQnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCJcclxuICAgIGVkaXRGb29kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGxldCBhcnRpY2xlSWQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5pZFxyXG4gICAgICBsZXQgZm9vZElkID0gYXJ0aWNsZUlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgICAgZm9vZENvbGxlY3Rpb24uZ2V0Rm9vZChmb29kSWQpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICBmb29kRWRpdEZvcm0uY3JlYXRlQW5kQXBwZW5kRm9ybShhcnRpY2xlSWQsIHJlc3BvbnNlKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBTaW5jZSB3ZSBjYW4gZ2V0IHRoZSBpZCBvZiB0aGUgZm9vZCBpdGVtIHRvIGJlIGRlbGV0ZWQgZnJvbSB0aGUgcGFyZW50IGVsZW1lbnQodGhlIGFydGljbGUgZWxlbWVudCksIHdlIGNhbiB1c2UgdGhhdCB0byBtYWtlIGFuIEhUVFAgREVMRVRFIHJlcXVlc3QgdG8gb3VyIEFQSS4gT25jZSBhZ2FpbiBhZnRlciB0aGlzIHdlIHdhbnQgdG8gZ2V0IHRoZSBsaXN0IG9mIGZvb2QgaXRlbXMgZnJvbSB0aGUgQVBJIHVzaW5nIGEgSFRUUCBHRVQgcmVxdWVzdCBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBzbyB0aGF0IHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgdG8gcmVmcmVzaCB0aGUgcGFnZSBpbiBvcmRlciB0byBzZWUgdGhhdCB0aGUgaXRlbSB0aGV5IGRlbGV0ZWQgaGFzIGFjdHVhbGx5IGJlZW4gZGVsZXRlZC5cclxuICAgIGxldCBkZWxldGVGb29kQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgZGVsZXRlRm9vZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCJcclxuICAgIGRlbGV0ZUZvb2RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgbGV0IGZvb2RJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgICAgZm9vZENvbGxlY3Rpb24uZGVsZXRlRm9vZChmb29kSWQpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICBmb29kTGlzdC5mcmlkZ2lmeSgpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGZvb2RBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2ROYW1lKVxyXG4gICAgZm9vZEFydGljbGUuYXBwZW5kQ2hpbGQoZm9vZEV4cClcclxuICAgIGZvb2RBcnRpY2xlLmFwcGVuZENoaWxkKGZvb2RUeXBlKVxyXG4gICAgZm9vZEFydGljbGUuYXBwZW5kQ2hpbGQoZWRpdEZvb2RCdXR0b24pXHJcbiAgICBmb29kQXJ0aWNsZS5hcHBlbmRDaGlsZChkZWxldGVGb29kQnV0dG9uKVxyXG5cclxuICAgIHJldHVybiBmb29kQXJ0aWNsZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9vZFxyXG4iLCIvLyBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS4gQWxsIGZldGNoIGNhbGxzIGZvciB0aGlzIGFwcGxpY2F0aW9uIHdpbGwgYmUgZGVmaW5lZCBoZXJlXHJcblxyXG5jb25zdCBmb29kQ29sbGVjdGlvbiA9IHtcclxuICAvLyBUaGlzIG1ldGhvZCByZXR1cm5zIGEgZmV0Y2gsIHdoaWNoIG1lYW5zIGl0IGlzIHJldHVybmluZyBhIHByb21pc2UuIFdoaWNoIG1lYW5zIHRvIGFjY2VzcyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgYXN5bmNocm9ub3VzIEhUVFAgR0VUIHJlcXVlc3QgdGhhdCBpcyBiZWluZyBtYWRlIGJ5IHRoaXMgZmV0Y2gsIHdlIGNhbiBjaGFpbiBhIC50aGVuIGF0IHRoZSBwb2ludCB3aGVyZSB0aGlzIG1ldGhvZChnZXRBbGxGb29kcykgaXMgY2FsbGVkLiBUaGUgLnRoZW4gdGhlbiBpcyBjaGFpbmVkIHRvIHRoZSBmZXRjaCBpbnNpZGUgdGhlIG1ldGhvZCBpcyBwYXJzaW5nIHRoZSBkYXRhIGZyb20gSlNPTiB0byBkYXRhIHN0cnVjdHVyZXMgSmF2YXNjcmlwdCB3aWxsIHVuZGVyc3RhbmQuIEluIHRoaXMgY2FzZSwgYmVjYXVzZSB3ZSBoYXZlIGEgY29sbGVjdGlvbiBvZiBpdGVtcywgaXQgd2lsbCBiZSBhbiBhcnJheSBvZiBvYmplY3RzLlxyXG4gIGdldEFsbEZvb2RzKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWRnZVwiKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIC8vIFRoaXMgbWV0aG9kIHdpbGwgbWFrZSBhIEhUVFAgUE9TVCByZXF1ZXN0IHRvIHRoZSBBUEkuIEJlY2F1c2UgYSBQT1NUIGhhcyBhIGJvZHkgd2l0aCB0aGUgZGF0YSBmb3IgdGhlIG5ldyBpdGVtIHlvdSB3YW50IGNyZWF0ZWQsIHRoaXMgbWV0aG9kIHdpbGwgdGFrZSBvbmUgYXJndW1lbnQgd2hpY2ggd2lsbCBiZSB0aGUgb2JqZWN0IGZvciB0aGUgbmV3IGZvb2QgaXRlbSB3ZSB3YW50IHRvIGFkZCB0byBvdXIgY29sbGVjdGlvbiBpbiB0aGUgQVBJLlxyXG4gIHBvc3ROZXdGb29kKG5ld0Zvb2RUb1NhdmUpIHtcclxuICAgIC8vIFdlIHdhbnQgdG8gcmV0dXJuIHRoaXMgZmV0Y2ggcmVxdWVzdCBzbyB0aGF0IGF0IHRoZSBwb2ludCBpdCBpcyBjYWxsZWQsIHdlIGNhbiB0YWtlIGFkdmFudGFnZSBvZiB0aGUgYXN5bmNocm9ub3VzIG5hdHVyZSBvZiBwcm9taXNlcyB0byB3YWl0IGZvciB0aGlzIHRvIGJlIGRvbmUgYmVmb3JlIGdldHRpbmcgdGhlIGxhdGVzdCBkYXRhIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWRnZVwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0Zvb2RUb1NhdmUpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8gSW4gb3JkZXIgdG8gZGVsZXRlIGEgaXRlbSBmcm9tIHRoZSBKU09OIFNlcnZlciBBUEksIGFsbCB3ZSBuZWVkIGlzIHRoZSBpZCBvZiB0aGUgaXRlbSBpbiBvcmRlciB0byB0YXJnZXQgaXQsIHdoaWNoIGlzIHRoZSBvbmx5IGFyZ3VtZW50IHRoaXMgbWV0aG9kIGhhcy5cclxuICBkZWxldGVGb29kKGZvb2RJZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZnJpZGdlLyR7Zm9vZElkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8gQWdhaW4sIHlvdSBuZWVkIHRoZSBpZCBvZiB0aGUgZm9vZCBpdGVtIGluIG9yZGVyIHRvIGdldCBkYXRhIGZvciB0aGF0IGl0ZW0gYmFjayBmcm9tIHRoZSBBUEkuXHJcbiAgZ2V0Rm9vZChmb29kSWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ZyaWRnZS8ke2Zvb2RJZH1gKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcbiAgLy8gSW4gb3JkZXIgdG8gZWRpdCBhbiBleGlzdGluZyBmb29kIGl0ZW0sIHdlIG5lZWQgdGhlIGlkIHRvIGlkZW50aWZ5IHdoaWNoIGZvb2QgaXRlbSB3ZSB3YW50IHRvIGVkaXQgYW5kIHRoZSBuZXcgZGF0YSB3ZSB3YW50IHRvIHJlcGxhY2UgdGhlIGV4aXN0aW5nIGRhdGEgd2l0aC4gU28gdGhpcyB0aW1lLCB3ZSBoYXZlIHR3byBhcmd1bWVudHMgZm9yIHRoZSBtZXRob2QuXHJcbiAgcHV0RXhpc3RpbmdGb29kKGZvb2RJZCwgZm9vZFRvRWRpdCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZnJpZGdlLyR7Zm9vZElkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShmb29kVG9FZGl0KVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvb2RDb2xsZWN0aW9uXHJcbiIsImltcG9ydCBmb29kQ29sbGVjdGlvbiBmcm9tIFwiLi9mb29kQ29sbGVjdGlvblwiXHJcbmltcG9ydCBmb29kTGlzdCBmcm9tIFwiLi9mb29kTGlzdFwiXHJcblxyXG5jb25zdCBmb29kRWRpdEZvcm0gPSB7XHJcbiAgLy8gVGhpcyBtb2R1bGUgd2lsbCBidWlsZCBhbiBlZGl0IGZvcm0gYW5kIGFwcGVuZCBpdCB0byB0aGUgRE9NLiBUaGUgZm9ybSB3aWxsIGNvbnRhaW4gaW5wdXQgZmllbGRzIHdpdGggZXhpc3RpbmcgdmFsdWVzIGZyb20gdGhlIEFQSSBhbmQgYW4gVXBkYXRlIGJ1dHRvbi4gVGhlIHVzZXIgY2FuIGVkaXQgdGhlIHRoZSB2YWx1ZXMgaW4gdGhlIGlucHV0IGZpZWxkcy4gQW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIFVwZGF0ZSBidXR0b24gd2lsbCBoYW5kbGUgdGFraW5nIHRoZSBuZXcgdmFsdWVzIGVudGVyZWQgYnkgdGhlIHVzZXIgYW5kIGNhbGxpbmcgdGhlIEFQSSB0byB1cGRhdGUgdGhlIGRhdGEuXHJcbiAgY3JlYXRlQW5kQXBwZW5kRm9ybSAoYXJ0aWNsZUlkLCBmb29kT2JqVG9FZGl0KSB7XHJcblxyXG4gICAgLy8gQnVpbGRpbmcgdGhlIGVkaXQgZm9ybSB3aXRoIGZpZWxkcyBmb3IgdGhlIG5hbWUsIGV4cGlyYXRpb24gYW5kIHR5cGUgb2YgdGhlIGZvb2QgaXRlbS4gRWFjaCBvZiB0aGUgaW5wdXQgZmllbGRzIGNvbnRhaW5zIHRoZSBleGlzdGluZyB2YWx1ZXMgZnJvbSB0aGUgZGF0YWJhc2UuXHJcbiAgICBsZXQgZm9vZE5hbWVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcblxyXG4gICAgbGV0IGZvb2ROYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIGZvb2ROYW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIk5hbWVcIlxyXG4gICAgbGV0IGZvb2ROYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIGZvb2ROYW1lSW5wdXQudmFsdWUgPSBmb29kT2JqVG9FZGl0Lm5hbWVcclxuXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lTGFiZWwpXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lSW5wdXQpXHJcblxyXG4gICAgbGV0IGZvb2RFeHBpcmF0aW9uRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG5cclxuICAgIGxldCBmb29kRXhwaXJhdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBmb29kRXhwaXJhdGlvbkxhYmVsLnRleHRDb250ZW50ID0gXCJFeHBpcmF0aW9uXCJcclxuICAgIGxldCBmb29kRXhwaXJhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBmb29kRXhwaXJhdGlvbklucHV0LnZhbHVlID0gZm9vZE9ialRvRWRpdC5leHBpcmF0aW9uXHJcblxyXG4gICAgZm9vZEV4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChmb29kRXhwaXJhdGlvbkxhYmVsKVxyXG4gICAgZm9vZEV4cGlyYXRpb25GaWVsZC5hcHBlbmRDaGlsZChmb29kRXhwaXJhdGlvbklucHV0KVxyXG5cclxuICAgIGxldCBmb29kVHlwZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuXHJcbiAgICBsZXQgZm9vZFR5cGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgZm9vZFR5cGVMYWJlbC50ZXh0Q29udGVudCA9IFwiVHlwZVwiXHJcbiAgICBsZXQgZm9vZFR5cGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgZm9vZFR5cGVJbnB1dC52YWx1ZSA9IGZvb2RPYmpUb0VkaXQudHlwZVxyXG5cclxuICAgIGZvb2RUeXBlRmllbGQuYXBwZW5kQ2hpbGQoZm9vZFR5cGVMYWJlbClcclxuICAgIGZvb2RUeXBlRmllbGQuYXBwZW5kQ2hpbGQoZm9vZFR5cGVJbnB1dClcclxuXHJcbiAgICBsZXQgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgdXBkYXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJVcGRhdGVcIlxyXG5cclxuICAgIC8vIFRoZXJlIGlzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBVcGRhdGUgYnV0dG9uIHdoaWNoIHdpbGwgdGFrZSB0aGUgbmV3IHZhbHVlcyBpbiB0aGUgaW5wdXQgZmllbGRzIGFuZCBidWlsZCBhbiBvYmplY3QgZm9yIHRoZSBmb29kIGl0ZW0gdG8gYmUgZWRpdGVkLiBUaGVuIHdlIG1ha2UgYSBIVFRQIFBVVCByZXF1ZXN0IHdoZXJlIHdlIHRhcmdldCB0aGUgZm9vZCBpdGVtIHdlIHdhbnQgdG8gZWRpdCBieSBzcGVjaWZ5aW5nIHRoZSBpZCBpbiB0aGUgVVJMLiBXZSBhbHNvIHBhc3MgdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGZvb2QgaXRlbSB3aXRoIHRoZSBuZXcgdmFsdWVzIGFzIGRhdGEgaW4gb3VyIEhUVFAgcmVxdWVzdC4gT25jZSBhZ2FpbiwgYmVjYXVzZSBvdXIgZGF0YSBoYXMgYmVlbiBtb2RpZmllZCwgd2UgbWFrZSBhbiBIVFRQIEdFVCByZXF1ZXN0IHRvIGdldCBhbGwgdGhlIGZvb2QgaXRlbXMgYW5kIGRpc3BsYXkgdGhlbS5cclxuICAgIHVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgZWRpdGVkRm9vZCA9IHtcclxuICAgICAgICBuYW1lOiBmb29kTmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICAgIGV4cGlyYXRpb246IGZvb2RFeHBpcmF0aW9uSW5wdXQudmFsdWUsXHJcbiAgICAgICAgdHlwZTogZm9vZFR5cGVJbnB1dC52YWx1ZVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBmb29kQ29sbGVjdGlvbi5wdXRFeGlzdGluZ0Zvb2QoZm9vZE9ialRvRWRpdC5pZCwgZWRpdGVkRm9vZClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGZvb2RMaXN0LmZyaWRnaWZ5KClcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgLy8gV2UgcGFzc2VkIGluIHRoZSBpZCBvZiB0aGUgYXJ0aWNsZSBzbyB3ZSBrbm93IGV4YWN0bHkgd2hlcmUgdG8gYXBwZW5kIHRoZSBlZGl0IGZvcm0uXHJcbiAgICBsZXQgZm9vZEl0ZW1BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7YXJ0aWNsZUlkfWApXHJcblxyXG4gICAgLy8gQmVjYXVzZSB3ZSB3YW50IHRvIHJlcGxhY2Ugd2hhdCBpcyBjdXJyZW50bHkgaW4gdGhlIGFydGljbGUgZWxlbWVudCB3aXRoIHRoZSBlZGl0IGZvcm0sIHdlIGNsZWFyIG91dCBhbGwgY2hpbGRyZW4gSFRNTCBlbGVtZW50cyBpbiBvdXIgdGFyZ2V0ZWQgZWxlbWVudCBiZWZvcmUgYXBwZW5kaW5nIG91ciBlZGl0IGZvcm0gdG8gaXQuXHJcbiAgICB3aGlsZSAoZm9vZEl0ZW1BcnRpY2xlLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgZm9vZEl0ZW1BcnRpY2xlLnJlbW92ZUNoaWxkKGZvb2RJdGVtQXJ0aWNsZS5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIGZvb2RJdGVtQXJ0aWNsZS5hcHBlbmRDaGlsZChmb29kTmFtZUZpZWxkKVxyXG4gICAgZm9vZEl0ZW1BcnRpY2xlLmFwcGVuZENoaWxkKGZvb2RFeHBpcmF0aW9uRmllbGQpXHJcbiAgICBmb29kSXRlbUFydGljbGUuYXBwZW5kQ2hpbGQoZm9vZFR5cGVGaWVsZClcclxuICAgIGZvb2RJdGVtQXJ0aWNsZS5hcHBlbmRDaGlsZCh1cGRhdGVCdXR0b24pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGZvb2RFZGl0Rm9ybVxyXG4iLCJpbXBvcnQgZm9vZENvbGxlY3Rpb24gZnJvbSBcIi4vZm9vZENvbGxlY3Rpb25cIlxyXG5pbXBvcnQgZm9vZExpc3QgZnJvbSBcIi4vZm9vZExpc3RcIlxyXG5cclxuY29uc3QgZm9vZEZvcm0gPSB7XHJcblxyXG4gIC8vIFRoaXMgbW9kdWxlIHdpbGwgYnVpbGQgYSBmb3JtIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS4gVGhlIGZvcm0gd2lsbCBjb250YWluIGlucHV0IGZpZWxkcyBmb3IgYSB1c2VyIHRvIGFkZCBhIG5ldyBmb29kIHRvIHRoZWlyIHJlZnJpZ2VyYXRvciBhbmQgYSBidXR0b24gd2l0aCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IHdpbGwgbGlzdGVuIGZvciB0aGUgY2xpY2tcclxuICBjcmVhdGVBbmRBcHBlbmRGb3JtICgpIHtcclxuICAgIC8vIDEuIEJ1aWxkIEhUTUwgZm9ybVxyXG4gICAgbGV0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIkFkZCBzb21ldGhpbmcgdG8geW91ciByZWZyaWdlcmF0b3JcIlxyXG5cclxuICAgIGxldCBmb29kTmFtZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpXHJcblxyXG4gICAgbGV0IGZvb2ROYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxuICAgIGZvb2ROYW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIk5hbWVcIlxyXG4gICAgZm9vZE5hbWVMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJmb29kX19uYW1lXCIpXHJcbiAgICBsZXQgZm9vZE5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgZm9vZE5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImZvb2RfX25hbWVcIilcclxuICAgIGZvb2ROYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImZvb2RfX25hbWVcIilcclxuXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lTGFiZWwpXHJcbiAgICBmb29kTmFtZUZpZWxkLmFwcGVuZENoaWxkKGZvb2ROYW1lSW5wdXQpXHJcblxyXG4gICAgbGV0IGZvb2RFeHBpcmF0aW9uRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIilcclxuXHJcbiAgICBsZXQgZm9vZEV4cGlyYXRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxyXG4gICAgZm9vZEV4cGlyYXRpb25MYWJlbC50ZXh0Q29udGVudCA9IFwiRXhwaXJhdGlvblwiXHJcbiAgICBmb29kRXhwaXJhdGlvbkxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImZvb2RfX2V4cGlyYXRpb25cIilcclxuICAgIGxldCBmb29kRXhwaXJhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBmb29kRXhwaXJhdGlvbklucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZm9vZF9fZXhwaXJhdGlvblwiKVxyXG4gICAgZm9vZEV4cGlyYXRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiZm9vZF9fZXhwaXJhdGlvblwiKVxyXG5cclxuICAgIGZvb2RFeHBpcmF0aW9uRmllbGQuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25MYWJlbClcclxuICAgIGZvb2RFeHBpcmF0aW9uRmllbGQuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25JbnB1dClcclxuXHJcbiAgICBsZXQgZm9vZFR5cGVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKVxyXG5cclxuICAgIGxldCBmb29kVHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXHJcbiAgICBmb29kVHlwZUxhYmVsLnRleHRDb250ZW50ID0gXCJUeXBlXCJcclxuICAgIGZvb2RUeXBlTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiZm9vZF9fdHlwZVwiKVxyXG4gICAgbGV0IGZvb2RUeXBlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIGZvb2RUeXBlSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJmb29kX190eXBlXCIpXHJcbiAgICBmb29kVHlwZUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJmb29kX190eXBlXCIpXHJcblxyXG4gICAgZm9vZFR5cGVGaWVsZC5hcHBlbmRDaGlsZChmb29kVHlwZUxhYmVsKVxyXG4gICAgZm9vZFR5cGVGaWVsZC5hcHBlbmRDaGlsZChmb29kVHlwZUlucHV0KVxyXG5cclxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkFkZCBGb29kXCJcclxuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZvb2RfX3NhdmVcIilcclxuXHJcbiAgICAvLyAyLiBBdHRhY2ggZXZlbnQgbGlzdGVuZXIgdG8gYnV0dG9uIGluIGZvcm1cclxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVBZGROZXdGb29kKVxyXG5cclxuICAgIC8vIDMuIEFwcGVuZCB0aGUgSFRNTCBmb3JtIHRvIHRoZSBET01cclxuICAgIC8vTm90aWNlIHRoYXQgSSBoYXZlIGFkZGVkIGFuIGFydGljbGUgZWxlbWVudCB0byBteSBpbmRleC5odG1sIHdpdGggdGhlIGNsYXNzIFwiZm9ybVwiLlxyXG4gICAgbGV0IGZvb2RGb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcilcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZE5hbWVGaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZEV4cGlyYXRpb25GaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9vZFR5cGVGaWVsZClcclxuICAgIGZvb2RGb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKVxyXG5cclxuICAgIGxldCBmb3JtQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKVxyXG4gICAgZm9ybUFydGljbGUuYXBwZW5kQ2hpbGQoZm9vZEZvcm1GcmFnbWVudClcclxuXHJcbiAgfSxcclxuICAvLyBUaGlzIG1vZHVsZSB3aWxsIGFsc28gY29udGFpbiB0aGUgZnVuY3Rpb24gdGhhdCBleGVjdXRlcyB3aGVuIHRoZSBidXR0b24gaW4gdGhlIGZvcm0gaXMgY2xpY2tlZC4gV2hlbiB0aGUgYnV0dG9uIGluIHRoZSBmb3JtIGlzIGNsaWNrZWQsIHRoZSBmb2xsb3dpbmcgd2lsbCBoYXBwZW46XHJcbiAgaGFuZGxlQWRkTmV3Rm9vZCAoZXZlbnQpIHtcclxuICAgIC8vIDEuIEdldCB1c2VyIGlucHV0IHRoYXQgdXNlciBlbnRlcmVkXHJcbiAgICBsZXQgaW5wdXRGb29kTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vZF9fbmFtZVwiKS52YWx1ZVxyXG4gICAgbGV0IGlucHV0Rm9vZEV4cGlyYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb2RfX2V4cGlyYXRpb25cIikudmFsdWVcclxuICAgIGxldCBpbnB1dEZvb2RUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29kX190eXBlXCIpLnZhbHVlXHJcblxyXG4gICAgLy8gMi4gQ3JlYXRlIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBzYW1lIHN0cnVjdHVyZSB3ZSBoYXZlIGJlZW4gdXNpbmcgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24gdG8gcmVwcmVzZW50IGEgZm9vZCBpdGVtOlxyXG4gICAgLy8ge1xyXG4gICAgICAvLyAgIG5hbWU6IFwidXNlciBpbnB1dCBuYW1lXCIsXHJcbiAgICAgIC8vICAgZXhwaXJhdGlvbjogXCJ1c2VyIGlucHV0IGV4cGlyYXRpb25cIixcclxuICAgICAgLy8gICB0eXBlOiBcInVzZXIgaW5wdXQgdHlwZVwiXHJcbiAgICAvLyB9XHJcblxyXG4gICAgbGV0IG5ld0Zvb2QgPSB7XHJcbiAgICAgIG5hbWU6IGlucHV0Rm9vZE5hbWUsXHJcbiAgICAgIGV4cGlyYXRpb246IGlucHV0Rm9vZEV4cGlyYXRpb24sXHJcbiAgICAgIHR5cGU6IGlucHV0Rm9vZFR5cGVcclxuICAgIH1cclxuXHJcbiAgICAvLyAzLiBDYWxsIHRoZSBtZXRob2QocG9zdE5ld0Zvb2QpIHdpdGggdGhlIGZldGNoIHJlcXVlc3QgdG8gUE9TVCB0byB0aGUgQVBJIGFuZCBwYXNzIGl0IHRoZSBvYmplY3Qgd2UgY3JlYXRlZCBpbiB0aGUgcHJldmlvdXMgc3RlcFxyXG5cclxuICAgIC8vIE5vdGljZSB0aGUgaW1wb3J0IHN0YXRlbWVudCBhdCB0aGUgdG9wIG9mIHRoZSBtb2R1bGUgc28gSSBjYW4gY2FsbCBhIG1ldGhvZCBpbiB0aGUgZm9vZENvbGxlY3Rpb24gbW9kdWxlLlxyXG5cclxuICAgIC8vICoqKioqSU1QT1JUQU5UKioqKipcclxuICAgIC8vIFlvdSB3aWxsIG5vdGljZSBhdCB0aGlzIHBvaW50IHRoYXQgd2hpbGUgYSBuZXcgZm9vZCBpdGVtIGlzIGJlaW5nIGFkZGVkIHRvIG91ciBBUEksIHVubGVzcyB5b3UgcmVmcmVzaCB0aGUgYXBwbGljYXRpb24sIHRoZSBuZXdseSBhZGRlZCBpdGVtIHdpbGwgbm90IHNob3cgdXAgb24gdGhlIERPTS4gV2UgZGVmaW5pdGVseSBkbyBub3Qgd2FudCBvdXIgdXNlciB0byBoYXZlIHRvIGhpdCByZWZyZXNoIGV2ZXJ5IHRpbWUgdGhleSBhZGQgbmV3IGZvb2QgdG8gdGhlaXIgcmVmcmlnZXJhdG9yLlxyXG5cclxuICAgIC8vIFdlIGFsc28gZG8gTk9UIHdhbnQgdG8gbWFudWFsbHkgYWRkIG91ciBuZXcgZm9vZCBpdGVtIHRvIHRoZSBsaXN0IG9mIGZvb2Qgb24gdGhlIERPTS4gSW5zdGVhZCwgd2Ugd2FudCBvdXIgZGF0YSB0byBiZSBvdXIgcG9pbnQgb2YgdHJ1dGguIE91ciBET00gc2hvdWxkIGFsd2F5cyB1c2UgdGhlIGRhdGEgZnJvbSBvdXIgQVBJIHRvIHJlbmRlciB0aGUgRE9NLiBMb2dpY2FsbHksIGhlcmUgYXJlIHRoZSBzdGVwcyB3ZSB3YW50IHRvIHRha2UgcGxhY2UuXHJcbiAgICAvLyAxLiBBZGQgbmV3IGZvb2QgaXRlbSB0byB0aGUgQVBJIHVzaW5nIGEgUE9TVCBIVFRQIHJlcXVlc3QuXHJcbiAgICAvLyAgICAgV2UgYXJlIGFscmVhZHkgZG9pbmcgdGhpcy4gV2UgYXJlIHVzaW5nIHRoZSBmZXRjaCBkZWZpbmVkIGluIHRoZSBmb29kQ29sbGVjdGlvbiBtb2R1bGUgdG8gYWRkIGEgbmV3IGZvb2QgaXRlbSB0byB0aGUgQVBJLlxyXG4gICAgLy8gMi4gQWZ0ZXIgdGhlIG5ldyBpdGVtIGhhcyBiZWVuIGFkZGVkLCB3ZSB3YW50IHRvIGdldCBhIGxpc3Qgb2YgYWxsIHRoZSBmb29kIGl0ZW1zICh1c2luZyBhIEdFVCBIVFRQIHJlcXVlc3QpIGFuZCByZW5kZXIgdGhlbSB0byB0aGUgRE9NLlxyXG4gICAgICAgICAgLy8gQmVjYXVzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBvbmx5IGRvIHRoaXMgYWZ0ZXIgdGhlIGZpcnN0IHN0ZXAgaXMgZG9uZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGZldGNoIGNhbGwgdGhhdCBpcyBkb2luZyB0aGUgUE9TVCBhbmQgY2hhaW4gYSAudGhlbiB0byB0aGUgY2FsbCAoanVzdCBsaWtlIHdlIGRvIHdpdGggdGhlIEdFVCkuIFRoaXMgbWVhbnMgd2UgYXJlIGRvaW5nIHRoZSBQT1NUIGFuZCB0aGVuIHdhaXRpbmcgdW50aWwgYSByZXNwb25zZSBjb21lcyBiYWNrIGJlZm9yZSBkb2luZyB0aGlzIHN0ZXAuIFRoZSByZWFzb24gd2Ugd2FudCB0byB3YWl0IGlzIGJlY2F1c2Ugd2Ugd2FudCB0byBiZSBzdXJlIHRoYXQgd2hlbiB3ZSBhc2sgb3VyIEFQSSBmb3IgdGhlIGxpc3Qgb2YgZm9vZCBpdGVtcywgdGhlIG5ld2x5IGFkZGVkIGl0ZW0gaXMgb24gdGhhdCBsaXN0LiBTbyB3ZSB3YWl0IHVudGlsIGl0IGhhcyBiZWVuIGFkZGVkIGJlZm9yZSB1c2luZyBhIEdFVCByZXF1ZXN0IHRvIGdldCBhIGxpc3Qgb2YgYWxsIGZvb2QgaXRlbXMgYW5kIHJlbmRlcmluZyB0aGVtIHRvIHRoZSBET00uXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEJ1dCB0aGF0IHNvdW5kcyBhd2Z1bGx5IGZhbWlsaWFyOiBtYWtlIGEgR0VUIEhUVFAgcmVxdWVzdCB0byB0aGUgQVBJIGZvciBhIGxpc3Qgb2YgYWxsIGZvb2QgaXRlbXMsIGl0ZXJhdGUgb3ZlciB0aGF0IGxpc3QgYW5kIGJ1aWxkIHRoZSBIVE1MIGZvciBlYWNoIGl0ZW0sIGFwcGVuZCB0aGUgSFRNTCB0byB0aGUgRE9NLiBUaGlzIGlzIGV4YWN0bHkgd2hhdCBvdXIgZnJpZGdpZnkgbWV0aG9kIGluIG91ciBmb29kTGlzdCBtb2R1bGUgaXMgYWxyZWFkeSBkb2luZy4gV2hpY2ggbWVhbnMgSSBjYW4gc2ltcGx5IGNhbGwgdGhhdCBtZXRob2QgZnJvbSBoZXJlLiBPbmNlIGFnYWluLCBub3RlIHRoYXQgSSBhbSBpbXBvcnRpbmcgdGhlIGFwcHJvcHJpYXRlIG1vZHVsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cclxuICAgIC8vIFRvIHN1bW1hcml6ZSwgd2UgYXJlIGFkZGluZyBhIG5ldyBpdGVtIHRvIHRoZSBBUEksIHRoZW4gZ2V0dGluZyBhbiB1cGRhdGVkIGxpc3Qgb2YgaXRlbXMgZnJvbSB0aGUgQVBJIGFuZCByZXJlbmRlcmluZyB0aGUgRE9NLlxyXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKlxyXG4gICAgZm9vZENvbGxlY3Rpb24ucG9zdE5ld0Zvb2QobmV3Rm9vZClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgZm9vZExpc3QuZnJpZGdpZnkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvb2RGb3JtXHJcbiIsIi8vIFRoaXMgY29tcG9uZW50IHdpbGwgZ2V0IHRoZSBkYXRhLCBidWlsZCB0aGUgSFRNTCBmcm9tIHRoZSBkYXRhIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTS5cclxuXHJcbi8vIFRvIGdldCB0aGUgZGF0YSwgd2Ugd2lsbCB1c2UgdGhlIGZvb2RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuaW1wb3J0IGZvb2RDb2xsZWN0aW9uIGZyb20gXCIuL2Zvb2RDb2xsZWN0aW9uXCJcclxuLy8gVG8gYnVpbGQgdGhlIEhUTUwgZm9yIGVhY2ggb2JqZWN0IGluIHRoZSBhcnJheSBvZiBmb29kKHdoaWNoIGlzIHdoYXQgdGhlIGRhdGEgY29taW5nIGZyb20gdGhlIEFQSSBiZWNvbWVzIG9uY2Ugd2UgcGFyc2UgaXQpLCB3ZSB3aWxsIHVzZSB0aGUgZm9vZCBjb21wb25lbnQuXHJcbmltcG9ydCBmb29kIGZyb20gXCIuL2Zvb2RcIlxyXG5cclxuY29uc3QgZm9vZExpc3QgPSB7XHJcbiAgZnJpZGdpZnkoKXtcclxuICAgIC8vIDEuIEdldCBkYXRhXHJcbiAgICAvLyBUaGUgZ2V0QWxsRm9vZHMgbWV0aG9kIHdpbGwgZG8gYSBmZXRjaCBhbmQgcmV0dXJuIGEgcHJvbWlzZS4gVGhpcyBjYWxsIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGZyb20gdGhlIEFQSSBpbiB0aGUgcmVzcG9uc2UuXHJcbiAgICBmb29kQ29sbGVjdGlvbi5nZXRBbGxGb29kcygpXHJcbiAgICAudGhlbihhbGxGb29kcyA9PiB7XHJcblxyXG4gICAgICAvLyBBbiBlbXB0eSBkb2N1bWVudCBmcmFnbWVudFxyXG4gICAgICBsZXQgZm9vZERvY0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcblxyXG4gICAgICAvLyAyLiBJdGVyYXRlIG92ZXIgZGF0YSBhbmQgYnVpbGQgSFRNTCBmb3IgZWFjaCBpdGVtXHJcbiAgICAgIC8vIFdlIGxvb3Agb3ZlciB0aGUgYXJyYXkgb2Ygb2JqZWN0cyByZXR1cm5lZCBmcm9tIG91ciBBUEkgYW5kIGZvciBlYWNoIG9iZWN0LCB3ZSBtYWtlIGEgY2FsbCB0byB0aGUgZm9vZEJ1aWxkZXIgbWV0aG9kIGluIHRoZSBmb29kIG1vZHVsZS4gVGhpcyBtZXRob2QgdGFrZXMgYSBmb29kIG9iamVjdCBhcyBhbiBhcmd1bWVudCBhbmQgcmV0dXJucyBhbiBIVE1MIGNvbXBvbmVudC4gT25jZSB3ZSBoYXZlIHRoYXQgSFRNTCwgd2UgYXBwZW5kIGl0IHRvIG91ciBkb2N1bWVudCBmcmFnbWVudCBzbyB0aGF0IGl0IGlzIHNsb3dseSBidWlsdCB1cC4gQnkgdGhlIGVuZCBvZiB0aGUgZm9yRWFjaCBsb29wLCBvdXIgZG9jdW1lbnQgZnJhZ21lbnQgY29udGFpbnMgYWxsIHRoZSBIVE1MIGZvciBhbGwgb3VyIGRhdGEuXHJcbiAgICAgIGFsbEZvb2RzLmZvckVhY2goZm9vZEl0ZW0gPT4ge1xyXG4gICAgICAgIGxldCBmb29kSHRtbCA9IGZvb2QuZm9vZEJ1aWxkZXIoZm9vZEl0ZW0pXHJcbiAgICAgICAgZm9vZERvY0ZyYWdtZW50LmFwcGVuZENoaWxkKGZvb2RIdG1sKVxyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgLy8gMy4gQXBwZW5kIHRoZSBIVE1MIHRvIHRoZSBET01cclxuICAgICAgLy8gV2UgZ2V0IGEgcmVmZXJlbmNlIHRvIGEgSFRNTCBlbGVtZW50IHdpdGggdGhlIGNsYXNzIFwib3V0cHV0XCIgYW5kIGFwcGVuZCBvdXIgZG9jdW1lbnQgZnJhZ21lbnQgdG8gdGhhdCBlbGVtZW50LiBCZWNhdXNlIHRoZSBIVE1MIGVsZW1lbnQgd2l0aCBjbGFzcyBcIm91dHB1dFwiIGlzIGFscmVhZHkgb24gdGhlIERPTSwgdGhlIEhUTUwgaW4gdGhlIGRvY3VtZW50IGZyYWdtZW50IGlzIGFwcGVuZGVkIHRvIHRoZSBET00uXHJcbiAgICAgIGxldCBvdXRwdXRBcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIilcclxuXHJcbiAgICAgIC8vVGhpcyB3aGlsZSBsb29wIGVzc2VudGlhbGx5IHJlbW92ZXMgYWxsIGNoaWxkIG5vZGVzIG9mIGFuIGVsZW1lbnQgdW50aWwgdGhlIGVsZW1lbnQgaGFzIG5vIGNoaWxkIG5vZGVzIGxlZnQuIEl0IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGZvbGxvd2luZzpcclxuICAgICAgLy8gb3V0cHV0QXJ0aWNsZS5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gICAgICAvLyBJZiB3ZSBkbyBub3QgZG8gdGhpcywgZWFjaCB0aW1lIHdlIGFkZCBhIG5ldyBmb29kIGl0ZW0gdXNpbmcgb3VyIGZvcm0sIGFsbCB0aGUgZm9vZCBpdGVtcyB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZSBib3R0b20gb2Ygb3VyIGxpc3Qgc28gdGhhdCB3ZSB3aWxsIGhhdmUgZHVwbGljYXRlcy4gVG8gdW5kZXJzdGFuZCB3aHkgdGhpcyB3aGlsZSBsb29wIGlzIG5lZWRlZCwgdHJ5IGNvbW1lbnRpbmcgaXQgb3V0IGFuZCBvYnNlcnZlIHRoZSBiZWhhdmlvciBvZiB0aGUgYXBwbGljYXRpb24uIEVzc2VudGlhbGx5LCB3ZSBhcmUgY2xlYXJpbmcgb3V0IG91ciBvdXRwdXQgY29udGFpbmVyIChvdXIgYXJ0aWNsZSB0YWcgd2l0aCBjbGFzcyBcIm91dHB1dFwiKSBzbyB0aGF0IHdlIHJlcG9wdWxhdGUgaXQuXHJcbiAgICAgIHdoaWxlIChvdXRwdXRBcnRpY2xlLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICBvdXRwdXRBcnRpY2xlLnJlbW92ZUNoaWxkKG91dHB1dEFydGljbGUuZmlyc3RDaGlsZCk7XHJcbiAgICAgIH1cclxuICAgICAgb3V0cHV0QXJ0aWNsZS5hcHBlbmRDaGlsZChmb29kRG9jRnJhZ21lbnQpXHJcblxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvb2RMaXN0XHJcbiIsImltcG9ydCBmb29kTGlzdCBmcm9tIFwiLi9mb29kTGlzdFwiXHJcbmltcG9ydCBmb29kRm9ybSBmcm9tIFwiLi9mb29kRm9ybVwiXHJcblxyXG5mb29kTGlzdC5mcmlkZ2lmeSgpXHJcbmZvb2RGb3JtLmNyZWF0ZUFuZEFwcGVuZEZvcm0oKVxyXG4iXX0=
