(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Component that displays a person's name, phone number, and address.
const contact = {
  contactBuilder(contactObject) {
    let contactArticle = document.createElement("article");
    let contactName = document.createElement("h3");
    contactName.textContent = contactObject.name;
    let contactNumber = document.createElement("p");
    contactNumber.textContent = contactObject["phone-number"];
    let contactAddress = document.createElement("p");
    contactAddress.textContent = contactObject.address;
    contactArticle.appendChild(contactName);
    contactArticle.appendChild(contactNumber);
    contactArticle.appendChild(contactAddress);
    return contactArticle;
  }

};
var _default = contact;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
const contactCollection = {
  getAllContacts() {
    return fetch("http://localhost:8088/contacts").then(response => response.json());
  },

  saveAContact(contactInfo) {
    return fetch("http://localhost:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactInfo)
    }).then(response => response.json());
  }

};
var _default = contactCollection;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
const contactForm = {
  createDomElement({
    elementType,
    content = null,
    attributes = {}
  }) {
    const element = document.createElement(elementType);
    element.textContent = content;

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    ;
    return element;
  },

  makeForm() {
    const outputArticle = document.querySelector(".output");
    const formToAppend = document.createElement("form");
    let nameInput = this.createDomElement({
      elementType: "input",
      attributes: {
        type: "text",
        class: "nameInput"
      }
    });
    let numberInput = this.createDomElement({
      elementType: "input",
      attributes: {
        type: "text",
        class: "numberInput"
      }
    });
    let addressInput = this.createDomElement({
      elementType: "input",
      attributes: {
        type: "text",
        class: "addressInput"
      }
    });
    let saveButton = this.createDomElement({
      elementType: "button",
      content: "Save",
      attributes: {
        class: "saveButton"
      }
    });
    saveButton.addEventListener("click", this.saveContactToJson);
    formToAppend.appendChild(nameInput);
    formToAppend.appendChild(numberInput);
    formToAppend.appendChild(addressInput);
    formToAppend.appendChild(saveButton);
    outputArticle.appendChild(formToAppend);
  },

  saveContactToJson() {
    let newContactName = document.querySelector(".nameInput");
    let newContactNumber = document.querySelector(".numberInput");
    let newContactAddress = document.querySelector(".addressInput");
    let newContact = {
      "name": newContactName.value,
      "phone-number": newContactNumber.value,
      "address": newContactAddress.value
    };

    _contactCollection.default.saveAContact(newContact);
  }

};
var _default = contactForm;
exports.default = _default;

},{"./contactCollection":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _contact = _interopRequireDefault(require("./contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component that displays all contacts. It should import the Contact component and the ContactCollection component.
const contactList = {
  contactify() {
    _contactCollection.default.getAllContacts().then(parsedResponse => {
      let contactFragment = document.createDocumentFragment();
      parsedResponse.forEach(contactItem => {
        let contactToAppend = _contact.default.contactBuilder(contactItem);

        contactFragment.appendChild(contactToAppend);
      });
      const outputArticle = document.querySelector(".output");
      outputArticle.appendChild(contactFragment);
    });
  }

};
var _default = contactList;
exports.default = _default;

},{"./contact":1,"./contactCollection":2}],5:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList"));

var _contactForm = _interopRequireDefault(require("./contactForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import the ContactList component and the ContactForm component.
_contactForm.default.makeForm();

_contactList.default.contactify();

},{"./contactForm":3,"./contactList":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUVBLE1BQU0sT0FBTyxHQUFHO0FBQ1osRUFBQSxjQUFjLENBQUMsYUFBRCxFQUFnQjtBQUMxQixRQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixDQUFyQjtBQUVBLFFBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQWxCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixHQUEwQixhQUFhLENBQUMsSUFBeEM7QUFFQSxRQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsR0FBNEIsYUFBYSxDQUFDLGNBQUQsQ0FBekM7QUFFQSxRQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFyQjtBQUNBLElBQUEsY0FBYyxDQUFDLFdBQWYsR0FBNkIsYUFBYSxDQUFDLE9BQTNDO0FBRUEsSUFBQSxjQUFjLENBQUMsV0FBZixDQUEyQixXQUEzQjtBQUNBLElBQUEsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsYUFBM0I7QUFDQSxJQUFBLGNBQWMsQ0FBQyxXQUFmLENBQTJCLGNBQTNCO0FBRUEsV0FBTyxjQUFQO0FBQ0g7O0FBbEJXLENBQWhCO2VBcUJlLE87Ozs7Ozs7Ozs7QUN2QmY7QUFFQSxNQUFNLGlCQUFpQixHQUFHO0FBQ3RCLEVBQUEsY0FBYyxHQUFHO0FBQ2IsV0FBTyxLQUFLLENBQUMsZ0NBQUQsQ0FBTCxDQUNGLElBREUs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QUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUF2QjtBQUNBLFFBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBeEI7QUFDQSxRQUFJLFVBQVUsR0FBRztBQUNiLGNBQVEsY0FBYyxDQUFDLEtBRFY7QUFFYixzQkFBZ0IsZ0JBQWdCLENBQUMsS0FGcEI7QUFHYixpQkFBVyxpQkFBaUIsQ0FBQztBQUhoQixLQUFqQjs7QUFLQSwrQkFBa0IsWUFBbEIsQ0FBK0IsVUFBL0I7QUFDSDs7QUEzRGUsQ0FBcEI7ZUE4RGUsVzs7Ozs7Ozs7Ozs7QUNoRWY7O0FBQ0E7Ozs7QUFIQTtBQUtBLE1BQU0sV0FBVyxHQUFHO0FBQ2hCLEVBQUEsVUFBVSxHQUFHO0FBQ1QsK0JBQWtCLGNBQWxCLEdBQ0MsSUFERCxDQUNNLGNBQWMsSUFBSTtBQUNwQixVQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBdEI7QUFDQSxNQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFdBQVcsSUFBSTtBQUNsQyxZQUFJLGVBQWUsR0FBRyxpQkFBUSxjQUFSLENBQXVCLFdBQXZCLENBQXRCOztBQUNBLFFBQUEsZUFBZSxDQUFDLFdBQWhCLENBQTRCLGVBQTVCO0FBQ0gsT0FIRDtBQUlKLFlBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLENBQXRCO0FBQ0EsTUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixlQUExQjtBQUNDLEtBVEQ7QUFVSDs7QUFaZSxDQUFwQjtlQWVlLFc7Ozs7OztBQ2xCZjs7QUFDQTs7OztBQUhBO0FBS0EscUJBQVksUUFBWjs7QUFDQSxxQkFBWSxVQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQ29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxyXG5cclxuY29uc3QgY29udGFjdCA9IHtcclxuICAgIGNvbnRhY3RCdWlsZGVyKGNvbnRhY3RPYmplY3QpIHtcclxuICAgICAgICBsZXQgY29udGFjdEFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRhY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xyXG4gICAgICAgIGNvbnRhY3ROYW1lLnRleHRDb250ZW50ID0gY29udGFjdE9iamVjdC5uYW1lO1xyXG5cclxuICAgICAgICBsZXQgY29udGFjdE51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGNvbnRhY3ROdW1iZXIudGV4dENvbnRlbnQgPSBjb250YWN0T2JqZWN0W1wicGhvbmUtbnVtYmVyXCJdO1xyXG5cclxuICAgICAgICBsZXQgY29udGFjdEFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBjb250YWN0QWRkcmVzcy50ZXh0Q29udGVudCA9IGNvbnRhY3RPYmplY3QuYWRkcmVzcztcclxuXHJcbiAgICAgICAgY29udGFjdEFydGljbGUuYXBwZW5kQ2hpbGQoY29udGFjdE5hbWUpO1xyXG4gICAgICAgIGNvbnRhY3RBcnRpY2xlLmFwcGVuZENoaWxkKGNvbnRhY3ROdW1iZXIpO1xyXG4gICAgICAgIGNvbnRhY3RBcnRpY2xlLmFwcGVuZENoaWxkKGNvbnRhY3RBZGRyZXNzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhY3RBcnRpY2xlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdDsiLCIvLyBDb21wb25lbnQgdGhhdCBsb2FkcyBleGlzdGluZyBjb250YWN0cyBmcm9tIHN0b3JhZ2UsIGFuZCBzYXZlcyBuZXcgb25lcy4gRWFjaCBuZXcgY29udGFjdCBzaG91bGQgaGF2ZSBhbiBhdXRvLWdlbmVyYXRlZCBpZGVudGlmaWVyLlxyXG5cclxuY29uc3QgY29udGFjdENvbGxlY3Rpb24gPSB7XHJcbiAgICBnZXRBbGxDb250YWN0cygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcclxuICAgIH0sXHJcbiAgICBzYXZlQUNvbnRhY3QoY29udGFjdEluZm8pIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0SW5mbylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0Q29sbGVjdGlvbjsiLCIvLyBDb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuXHJcbmltcG9ydCBjb250YWN0Q29sbGVjdGlvbiBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiO1xyXG5cclxuY29uc3QgY29udGFjdEZvcm0gPSB7XHJcbiAgICBjcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZSwgY29udGVudCA9IG51bGwsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxuICAgIG1ha2VGb3JtKCkge1xyXG4gICAgICAgIGNvbnN0IG91dHB1dEFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dFwiKTtcclxuICAgICAgICBjb25zdCBmb3JtVG9BcHBlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuXHJcbiAgICAgICAgbGV0IG5hbWVJbnB1dCA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImlucHV0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6IFwibmFtZUlucHV0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBudW1iZXJJbnB1dCA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImlucHV0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6IFwibnVtYmVySW5wdXRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGFkZHJlc3NJbnB1dCA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImlucHV0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6IFwiYWRkcmVzc0lucHV0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzYXZlQnV0dG9uID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiU2F2ZVwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogXCJzYXZlQnV0dG9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2F2ZUNvbnRhY3RUb0pzb24pO1xyXG5cclxuICAgICAgICBmb3JtVG9BcHBlbmQuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcclxuICAgICAgICBmb3JtVG9BcHBlbmQuYXBwZW5kQ2hpbGQobnVtYmVySW5wdXQpO1xyXG4gICAgICAgIGZvcm1Ub0FwcGVuZC5hcHBlbmRDaGlsZChhZGRyZXNzSW5wdXQpO1xyXG4gICAgICAgIGZvcm1Ub0FwcGVuZC5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgICAgICBvdXRwdXRBcnRpY2xlLmFwcGVuZENoaWxkKGZvcm1Ub0FwcGVuZCk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZUNvbnRhY3RUb0pzb24oKSB7XHJcbiAgICAgICAgbGV0IG5ld0NvbnRhY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYW1lSW5wdXRcIik7XHJcbiAgICAgICAgbGV0IG5ld0NvbnRhY3ROdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm51bWJlcklucHV0XCIpO1xyXG4gICAgICAgIGxldCBuZXdDb250YWN0QWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkcmVzc0lucHV0XCIpO1xyXG4gICAgICAgIGxldCBuZXdDb250YWN0ID0ge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogbmV3Q29udGFjdE5hbWUudmFsdWUsXHJcbiAgICAgICAgICAgIFwicGhvbmUtbnVtYmVyXCI6IG5ld0NvbnRhY3ROdW1iZXIudmFsdWUsXHJcbiAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBuZXdDb250YWN0QWRkcmVzcy52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29udGFjdENvbGxlY3Rpb24uc2F2ZUFDb250YWN0KG5ld0NvbnRhY3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm07IiwiLy8gQ29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuXHJcbmltcG9ydCBjb250YWN0Q29sbGVjdGlvbiBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0XCI7XHJcblxyXG5jb25zdCBjb250YWN0TGlzdCA9IHtcclxuICAgIGNvbnRhY3RpZnkoKSB7XHJcbiAgICAgICAgY29udGFjdENvbGxlY3Rpb24uZ2V0QWxsQ29udGFjdHMoKVxyXG4gICAgICAgIC50aGVuKHBhcnNlZFJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhY3RGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICAgICAgcGFyc2VkUmVzcG9uc2UuZm9yRWFjaChjb250YWN0SXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGFjdFRvQXBwZW5kID0gY29udGFjdC5jb250YWN0QnVpbGRlcihjb250YWN0SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBjb250YWN0RnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29udGFjdFRvQXBwZW5kKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0QXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpO1xyXG4gICAgICAgIG91dHB1dEFydGljbGUuYXBwZW5kQ2hpbGQoY29udGFjdEZyYWdtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RMaXN0OyIsIi8vIEltcG9ydCB0aGUgQ29udGFjdExpc3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdEZvcm0gY29tcG9uZW50LlxyXG5cclxuaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCI7XHJcbmltcG9ydCBjb250YWN0Rm9ybSBmcm9tIFwiLi9jb250YWN0Rm9ybVwiO1xyXG5cclxuY29udGFjdEZvcm0ubWFrZUZvcm0oKTtcclxuY29udGFjdExpc3QuY29udGFjdGlmeSgpO1xyXG5cclxuIl19
