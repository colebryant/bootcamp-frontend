(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventListeners = _interopRequireDefault(require("./eventListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dashboard = {
  buildLoginForm() {
    //using string interpolation to create the form
    let formHTML = `
    <h1 class = "t-border">Nomads</h1>
      <section class = "form">
        <form action="" class = registerForm>
          <input id = "regUserName" type="text" placeholder = "Username" required>
          <input id = "regEmail" type="email" placeholder = "Email" required>
          <input id = "regPassword" type="password" placeholder = "Password" required>
          <input id = "regConfirmPassword" type="password" placeholder = "Confirm Password" required>
          <button id = "registerButton">Create Account</button>
          <p class = "message">Already a Registered Member? <a href = "#">LogIn</a></p>
        </form>
        <form class = "login-form">
          <input id = "userNameVal" type="text" placeholder = "Username">
          <input id = "passwordVal" type="password" placeholder = "Password">
          <button type = "button" id = "logIn">Login</button>
          <button id = "modalButton">About</button>
          <p class = "message">Don't have an account? <a href = "#">Register</a></p>
        </form>
      </section>
      <section id="nomadModal" class="modal">
      <!-- Modal content -->
        <section class="modal-content">
          <section class="modal-header">
            <span class="close">&times;</span>
            <h2>About Nomads</h2>
          </section>
          <section class="modal-body">
            <h3>The developers behind Nomads</h3>
            <img id = "creatorsImage" src = "images/nomadCreators.jpg" alt = "application creators">
            <p>Nomads is a front-end social media app with a theme centered around van life travelers. Users can peruse articles, check out upcoming events, organize their tasks, message other users and add friends. Our group built this app as part of a practice sprint at Nashville Software School.</p>
          </section>
          <section class="modal-footer">
            <h3>Created By: Jordan Rosas, Justin Wheeler, Cole Bryant, Joseph Baugh and Russell Reiter</h3>
          </section>
        </section>
      </section>
      `;
    $("#output").html(formHTML);

    _eventListeners.default.modalDisplayAnimation();

    $("#logIn").click(_eventListeners.default.userLogin); // $("#logIn").click(eventListeners.tasksNavLink)

    $("#registerButton").click(_eventListeners.default.userRegistration);
    $("#registerButton").click(this.buildLoginForm); // $("#registerButton").click(eventListeners.userLogin)
  },

  createNavBar() {
    let navHTML = `
      <nav>
        <ul>
          <li id = "newsLink"><a class = "active" href = "#">Articles</a></li>
          <li id = "eventLink"><a href = "#">Events</a></li>
          <li id = "tasksLink"><a href = "#">Tasks</a></li>
          <li id = "friendsLink"><a href = "#">Friends</a></li>
          <li id = "messagesLink"><a href = "#">Messages</a></li>
          <li class = "signOut" id = "logo" ><a href="#">Sign Out</a></li>
        </ul>
      </nav>
    `;
    let navBarContainer = document.querySelector("#main-nav");
    navBarContainer.innerHTML = navHTML;
    /*Navigation link event listeners*/

    $("#messagesLink").click(_eventListeners.default.messagesNavLink);
    $("#eventLink").click(_eventListeners.default.eventsNavLink);
    $("#friendsLink").click(_eventListeners.default.friendsNavLink);
    $("#tasksLink").click(_eventListeners.default.tasksNavLink);
    $("#newsLink").click(_eventListeners.default.newsNavLink);
    /*after signout is clicked session storage is cleared and the logIn/register form is presented from here
    another user can log in and session storage will kick off for the new logged in user*/

    $(".signOut").click(_eventListeners.default.nomadNavLink);
  }

};
var _default = dashboard;
exports.default = _default;

},{"./eventListeners":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const domComponents = {
  createDomElement({
    elementType,
    content = null,
    cssClass,
    attributes = {}
  }) {
    const element = document.createElement(elementType);
    element.textContent = content;

    if (cssClass) {
      element.classList.add(cssClass);
    }

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    return element;
  }

};
var _default = domComponents;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _dashboard = _interopRequireDefault(require("./dashboard"));

var _eventListeners = _interopRequireDefault(require("./eventListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import domComponents from "./domComponents";
//BUILDS NAIGATIONBAR//
// domComponents.createNavBar()
_dashboard.default.buildLoginForm();

$("modalButton").click(_eventListeners.default.modalDisplayAnimation); //NEWS SECTION
// news.save();
// news.allSaved();
// news.getNews();
// news.newsElementCreator();
// news.newsElementCreator();

},{"./dashboard":1,"./eventListeners":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dashboard = _interopRequireDefault(require("./dashboard"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _events = _interopRequireDefault(require("./events"));

var _messages = _interopRequireDefault(require("./messages"));

var _friends = _interopRequireDefault(require("./friends"));

var _news = _interopRequireDefault(require("./news"));

var _tasks = _interopRequireDefault(require("./tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventListeners = {
  /*===============================================================================================================
  LOGIN FORM: user enters Username and Password. when User clicks login, the input field and NOMADS header disappear
  and the user will be displayed the "Dashboard" and the navigation bar. Upon login, sessionStorage is started. In the Console
  you will be able to see Who is logged in and what their userId is. ie. 1,2,3,4 etc.
  =================================================================================================================*/
  userLogin() {
    let logInVal = document.querySelector("#userNameVal").value;
    let passwordVal = document.querySelector("#passwordVal").value; //get to compare

    _nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "GET",
      "embedItem": "?_embed=users"
    }).then(parsedUsers => {
      parsedUsers.forEach(user => {
        /*If login credentials match those in database.json. We want the user to be displayed their "dashboad"
        and navigation bar. So we need to set display to none and invoke the function - createNavBar()*/
        if (logInVal === user.userName && passwordVal === user.password) {
          //hides NOMAD heading
          $(".t-border").hide(); //hides the form

          $(".form").hide(); //displays navigatin bar

          _dashboard.default.createNavBar(); //session storage


          sessionStorage.setItem("userId", user.id);
          let userId = sessionStorage.getItem("userId"); //console.log verifying that credentials match and user is logged in

          console.log("logged in as" + " " + user.userName);
          console.log("your user ID is: " + userId);
          let usersName = " ";

          _nomadData.default.connectToData({
            "dataSet": "users",
            "fetchType": "GET",
            "dataBaseObject": "",
            "embedItem": "?_embed=users"
          }).then(users => {
            users.forEach(user => {
              if (user.id === Number(userId)) {
                usersName = user.userName;
              }
            });
            let taskContainers = document.getElementById("#tasksContainer");
            const targetContainer = document.getElementById("output");

            let welcomeMessage = _domComponents.default.createDomElement({
              elementType: "h1",
              content: `welcome ${usersName}`,
              cssClass: "welcome-user"
            });

            targetContainer.insertBefore(welcomeMessage, taskContainers);
          });

          _tasks.default.createTaskTables();

          _nomadData.default.connectToData({
            "dataSet": "users",
            "fetchType": "GET",
            "dataBaseObject": "",
            "embedItem": "?_embed=users"
          }).then(users => {
            users.forEach(user => {
              if (user.id === Number(userId)) {
                const targetContainer = document.getElementById("output");
                targetContainer.appendChild(_domComponents.default.createDomElement({
                  elementType: "h1",
                  content: `welcome ${user.userName}`,
                  cssClass: "welcome-user"
                }));
              }
            });
          });
        }
      });
    });
  },

  /*===============================================================================================================
  REGISTRATION FORM: When registering for an account the user will enter desired username, email, and password
  =================================================================================================================*/
  userRegistration() {
    let regUserName = document.querySelector("#regUserName").value;
    let regEmail = document.querySelector("#regEmail").value;
    let regPassword = document.querySelector("#regPassword").value; // let regConfirmPassword = document.querySelector("#regUserName").value

    _nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "POST",
      "dataBaseObject": {
        "userName": regUserName,
        "email": regEmail,
        "password": regPassword
      }
    }).then(_nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "GET",
      "embedItem": `?userName=${regUserName}`
    }).then(user => {
      console.log(user);
      user.forEach(x => {
        sessionStorage.setItem("userId", x.id); //hides NOMAD heading

        $(".t-border").hide(); //hides the form

        $(".form").hide(); //displays navigatin bar

        _dashboard.default.createNavBar();

        let userId = sessionStorage.getItem("userId"); //console.log verifying that credentials match and user is logged in

        console.log("logged in as" + " " + x.userName);
        console.log("your user ID is: " + userId);
      });
    }));
  },

  /*===============================================================================================================
  MODAL: user will click the NOMAD MISSION button and a modal will pop up describing what the application is about
  and who it is tailored towards
  =================================================================================================================*/
  modalDisplayAnimation() {
    let modal = document.getElementById("nomadModal"); // target modal to open it

    let btn = document.getElementById("modalButton"); // Get the <span> element that closes the modal

    let span = document.getElementsByClassName("close")[0]; // When the user clicks the button, open the modal

    btn.onclick = function () {
      modal.style.display = "block";
    }; // When the user clicks on <span> (x), close the modal


    span.onclick = function () {
      modal.style.display = "none";
    }; // When the user clicks anywhere outside of the modal, close it


    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    $(".message a").click(function () {
      $("form").animate({
        height: "toggle",
        opacity: "toggle"
      }, "slow");
    });
  },

  /*===============================================================================================================
  NAVBAR LI ELISTENERS: When user clicks an item in the NAVBAR the content associated with that tab will populate the DOM
  =================================================================================================================*/
  messagesNavLink() {
    _messages.default.createMessageBoard();

    console.log("working");

    _friends.default.buildFriendSearchBar();
  },

  eventsNavLink() {
    _events.default.showEventForm();

    _events.default.appendUserAndFriendEvents(); //appendUserEvent


    console.log("events clicked");
  },

  friendsNavLink() {
    console.log("friends nav link clicked");

    _friends.default.defineCurrentUsersFriends();

    _friends.default.initializePotentialFriends();
  },

  newsNavLink() {
    //NEWS SECTION
    _news.default.getAPINews(); // news.savedNewsElementsCreator();


    console.log("news link clicked");
  },

  tasksNavLink() {
    _tasks.default.createTaskTables();

    _friends.default.buildFriendSearchBar();
  },

  nomadNavLink() {
    _dashboard.default.buildLoginForm();

    $("nav").hide();
    sessionStorage.clear();
    console.log("signed out");
  },

  /*========================================================================================================
  END OF NAVIGATION EVENTLISTENERS
  =========================================================================================================*/
  friendsDeleteFriend() {
    console.log(event.target);
  }

};
var _default = eventListeners;
exports.default = _default;

},{"./dashboard":1,"./domComponents":2,"./events":6,"./friends":7,"./messages":9,"./news":11,"./nomadData":13,"./tasks":14}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import domComponents from "./domComponents";
const eventPageListeners = {
  handleShowButton() {
    const eventsContainer = document.querySelector("#eventsContainer");
    const showButton = document.querySelector("#showForm");
    eventsContainer.removeChild(showButton);

    const eventForm = _events.default.createEventInput();

    eventsContainer.insertBefore(eventForm, eventsContainer.firstChild);
  },

  handleSaveButton() {
    const nameInputted = document.querySelector("#eventName").value;
    const dateInputted = document.querySelector("#eventDate").value;
    const timeInputted = document.querySelector("#eventTime").value;
    const locationInputted = document.querySelector("#eventLocation").value;

    if (nameInputted === "" || dateInputted === "" || timeInputted === "" || locationInputted === "") {
      alert("Please input information in all fields");
    } else {
      _nomadData.default.connectToData({
        dataSet: "events",
        fetchType: "POST",
        dataBaseObject: {
          userId: Number(sessionStorage.getItem("userId")),
          eventName: nameInputted,
          eventDate: dateInputted,
          eventTime: timeInputted,
          eventLocation: locationInputted
        }
      }).then(() => {
        _events.default.appendUserAndFriendEvents();
      });
    }

    ;
  },

  handleHideButton() {
    const eventsContainer = document.querySelector("#eventsContainer");
    const formContainer = document.querySelector(".eventInput");
    eventsContainer.removeChild(formContainer);

    _events.default.addShowButton();
  },

  handleDeleteButton() {
    const idToDelete = event.target.id.split("--")[1];

    _nomadData.default.connectToData({
      deleteId: idToDelete,
      dataSet: "events",
      fetchType: "DELETE",
      dataBaseObject: {
        userId: sessionStorage.getItem("userId")
      }
    }).then(() => {
      _events.default.appendUserAndFriendEvents();
    });
  },

  handleEditButton() {
    const idToEdit = event.target.id.split("--")[1];

    _nomadData.default.connectToData({
      dataSet: "events",
      fetchType: "GET",
      dataBaseObject: {
        userId: Number(sessionStorage.getItem("userId"))
      },
      embedItem: `/${idToEdit}` // Above is a bit of a hacky solution in order to get a specific event. Maybe need to add specific get function to nomadData

    }).then(parsedResponse => {
      _events.default.createEventEditInput(idToEdit, parsedResponse);
    });
  },

  handleUpdateButton() {
    const editedId = event.target.id.split("--")[1];
    const editedName = document.querySelector(`#editName--${editedId}`).value;
    const editedDate = document.querySelector(`#editDate--${editedId}`).value;
    const editedTime = document.querySelector(`#editTime--${editedId}`).value;
    const editedLocation = document.querySelector(`#editLocation--${editedId}`).value;

    if (editedName === "" || editedDate === "" || editedTime === "" || editedLocation === "") {
      alert("Please do not leave edit fields blank");
    } else {
      _nomadData.default.connectToData({
        putId: editedId,
        dataSet: "events",
        fetchType: "PUT",
        dataBaseObject: {
          id: editedId,
          userId: Number(sessionStorage.getItem("userId")),
          eventName: editedName,
          eventDate: editedDate,
          eventTime: editedTime,
          eventLocation: editedLocation
        }
      }).then(() => {
        _events.default.appendUserAndFriendEvents();
      });
    }
  }

};
var _default = eventPageListeners;
exports.default = _default;

},{"./events":6,"./nomadData":13}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _eventPageListeners = _interopRequireDefault(require("./eventPageListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Author: Cole Bryant / Purpose:
//createEventInput and createEventItem will be added to this object. so dombuilder.
const events = {
  showEventForm() {
    const output = document.querySelector("#output");

    while (output.firstChild) {
      output.removeChild(output.firstChild);
    }

    const eventsContainer = document.createElement("article");
    eventsContainer.setAttribute("id", "eventsContainer");
    output.appendChild(eventsContainer);
    const eventsForm = this.createEventInput();
    eventsContainer.appendChild(eventsForm);
    const eventLog = document.createElement("article");
    eventLog.setAttribute("id", "eventLog");
    eventsContainer.appendChild(eventLog);
  },

  addShowButton() {
    const eventsContainer = document.querySelector("#eventsContainer");

    const showButton = _domComponents.default.createDomElement({
      elementType: "button",
      content: "Create a New Event",
      attributes: {
        type: "button",
        id: "showForm"
      }
    });

    showButton.addEventListener("click", _eventPageListeners.default.handleShowButton);
    eventsContainer.insertBefore(showButton, eventsContainer.firstChild);
  },

  appendUserAndFriendEvents() {
    const eventLog = document.querySelector("#eventLog");
    const eventHolder = [];
    const userHolder = [Number(sessionStorage.getItem("userId"))];

    _nomadData.default.connectToData({
      dataSet: "friends",
      fetchType: "GET",
      dataBaseObject: "",
      embedItem: "?_embed=events"
    }).then(parsedResponse => {
      parsedResponse.forEach(response => {
        if (response.userId === Number(sessionStorage.getItem("userId"))) {
          userHolder.push(response.otherFriendId);
        }

        ;
      });
      userHolder.forEach(userId => {
        _nomadData.default.connectToData({
          dataSet: "events",
          fetchType: "GET",
          dataBaseObject: "",
          embedItem: `?_userId=${userId}`
        }).then(parsedResponse => {
          parsedResponse.forEach(response => {
            if (response.userId === userId) {
              eventHolder.push(response);
            }

            ;
          });
          const sortedEvents = eventHolder.sort((a, b) => {
            return new Date(a.eventDate) - new Date(b.eventDate);
          });
          const docuFrag = document.createDocumentFragment();
          sortedEvents.forEach(event => {
            while (eventLog.firstChild) {
              eventLog.removeChild(eventLog.firstChild);
            }

            ;
            const eventItem = this.createEventItem(event);
            docuFrag.appendChild(eventItem);
          });
          eventLog.appendChild(docuFrag);
        });
      });
    });
  },

  createEventInput() {
    const eventsContainer = document.querySelector("#eventsContainer");

    const eventForm = _domComponents.default.createDomElement({
      elementType: "form",
      attributes: {
        class: "eventInput"
      }
    });

    eventsContainer.appendChild(eventForm);

    const formHeader = _domComponents.default.createDomElement({
      elementType: "h2",
      content: "Add a New Event:"
    });

    eventForm.appendChild(formHeader);

    const nameFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const nameLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Event Name:",
      attributes: {
        for: "eventName"
      }
    });

    const nameInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "text",
        name: "eventName",
        id: "eventName"
      }
    });

    nameFieldset.appendChild(nameLabel);
    nameFieldset.appendChild(nameInput);

    const dateFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const dateLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Event Date:",
      attributes: {
        for: "eventDate"
      }
    });

    const dateInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "date",
        name: "eventDate",
        id: "eventDate"
      }
    });

    dateFieldset.appendChild(dateLabel);
    dateFieldset.appendChild(dateInput);

    const timeFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const timeLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Event Time:",
      attributes: {
        for: "eventTime"
      }
    });

    const timeInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "time",
        name: "eventTime",
        id: "eventTime"
      }
    });

    timeFieldset.appendChild(timeLabel);
    timeFieldset.appendChild(timeInput);

    const locationFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const locationLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Event Location:",
      attributes: {
        for: "eventLocation"
      }
    });

    const locationInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "text",
        name: "eventLocation",
        id: "eventLocation"
      }
    });

    locationFieldset.appendChild(locationLabel);
    locationFieldset.appendChild(locationInput);

    const saveButton = _domComponents.default.createDomElement({
      elementType: "button",
      content: "Save",
      attributes: {
        type: "button",
        id: "saveEvent"
      }
    });

    saveButton.addEventListener("click", _eventPageListeners.default.handleSaveButton);

    const hideButton = _domComponents.default.createDomElement({
      elementType: "button",
      content: "Hide Event Input",
      attributes: {
        type: "button",
        id: "hideEvent"
      }
    });

    hideButton.addEventListener("click", _eventPageListeners.default.handleHideButton);
    eventForm.appendChild(nameFieldset);
    eventForm.appendChild(dateFieldset);
    eventForm.appendChild(timeFieldset);
    eventForm.appendChild(locationFieldset);
    eventForm.appendChild(saveButton);
    eventForm.appendChild(hideButton);
    return eventForm;
  },

  createEventItem(eventObject) {
    const eventItem = _domComponents.default.createDomElement({
      elementType: "article",
      attributes: {
        class: "eventItem",
        id: `eventItem--${eventObject.id}`
      }
    });

    const eventHeader = _domComponents.default.createDomElement({
      elementType: "h2",
      content: eventObject.eventName
    });

    const date = new Date(eventObject.eventDate);

    const datify = () => {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      return `${monthNames[monthIndex]} ${day}, ${year}`;
    };

    const longDate = datify();

    const eventDateTime = _domComponents.default.createDomElement({
      elementType: "p",
      content: `At ${eventObject.eventTime} on ${longDate}`
    });

    const eventLocation = _domComponents.default.createDomElement({
      elementType: "p",
      content: `Location: ${eventObject.eventLocation}`
    });

    eventItem.appendChild(eventHeader);
    eventItem.appendChild(eventDateTime);
    eventItem.appendChild(eventLocation);

    if (eventObject.userId === Number(sessionStorage.getItem("userId"))) {
      const editButton = _domComponents.default.createDomElement({
        elementType: "button",
        content: "Edit",
        attributes: {
          type: "button",
          id: `editEvent--${eventObject.id}`
        }
      });

      editButton.addEventListener("click", _eventPageListeners.default.handleEditButton);

      const deleteButton = _domComponents.default.createDomElement({
        elementType: "button",
        content: "Delete",
        attributes: {
          type: "button",
          id: `deleteEvent--${eventObject.id}`
        }
      });

      deleteButton.addEventListener("click", _eventPageListeners.default.handleDeleteButton);
      eventItem.appendChild(editButton);
      eventItem.appendChild(deleteButton);
    } else {
      _nomadData.default.connectToData({
        dataSet: "users",
        fetchType: "GET",
        embedItem: `/${eventObject.userId}`
      }).then(parsedResponse => {
        const eventUser = _domComponents.default.createDomElement({
          elementType: "p",
          content: `Event Created By: ${parsedResponse.userName}`
        });

        eventItem.appendChild(eventUser);
      });
    }

    ;
    return eventItem;
  },

  createEventEditInput(containerId, eventObject) {
    const formContainer = _domComponents.default.createDomElement({
      elementType: "form",
      attributes: {
        class: "eventEdit"
      }
    });

    const eventHeader = _domComponents.default.createDomElement({
      elementType: "h2",
      content: eventObject.eventName
    });

    formContainer.appendChild(eventHeader);

    const nameFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const nameLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Edit Name:",
      attributes: {
        for: "eventName"
      }
    });

    const nameInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "text",
        name: "eventName",
        id: `editName--${containerId}`,
        value: eventObject.eventName
      }
    });

    nameFieldset.appendChild(nameLabel);
    nameFieldset.appendChild(nameInput);

    const dateFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const dateLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Edit Date:",
      attributes: {
        for: "eventDate"
      }
    });

    const dateInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "date",
        name: "eventDate",
        id: `editDate--${containerId}`,
        value: eventObject.eventDate
      }
    });

    dateFieldset.appendChild(dateLabel);
    dateFieldset.appendChild(dateInput);

    const timeFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const timeLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Edit Time:",
      attributes: {
        for: "eventTime"
      }
    });

    const timeInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "time",
        name: "eventTime",
        id: `editTime--${containerId}`,
        value: eventObject.eventTime
      }
    });

    timeFieldset.appendChild(timeLabel);
    timeFieldset.appendChild(timeInput);

    const locationFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset"
    });

    const locationLabel = _domComponents.default.createDomElement({
      elementType: "label",
      content: "Edit Location:",
      attributes: {
        for: "eventLocation"
      }
    });

    const locationInput = _domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        type: "text",
        name: "eventLocation",
        id: `editLocation--${containerId}`,
        value: eventObject.eventLocation
      }
    });

    locationFieldset.appendChild(locationLabel);
    locationFieldset.appendChild(locationInput);

    const updateButton = _domComponents.default.createDomElement({
      elementType: "button",
      content: "Update",
      attributes: {
        type: "button",
        id: `submitEdits--${containerId}`
      }
    });

    updateButton.addEventListener("click", _eventPageListeners.default.handleUpdateButton);
    formContainer.appendChild(nameFieldset);
    formContainer.appendChild(dateFieldset);
    formContainer.appendChild(timeFieldset);
    formContainer.appendChild(locationFieldset);
    formContainer.appendChild(updateButton);
    let currentContainer = document.querySelector(`#eventItem--${containerId}`);

    while (currentContainer.firstChild) {
      currentContainer.removeChild(currentContainer.firstChild);
    }

    ;
    currentContainer.appendChild(formContainer);
  }

};
var _default = events;
exports.default = _default;

},{"./domComponents":2,"./eventPageListeners":5,"./nomadData":13}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _friendsEventsListener = _interopRequireDefault(require("./friendsEventsListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const friends = {
  defineCurrentUsersFriends() {
    $("#output").empty();
    let userId = sessionStorage.getItem('userId');
    let currentUser = Number(userId);
    console.log(currentUser, userId);
    const targetContainer = document.getElementById("output");

    const friendScrollContainer = _domComponents.default.createDomElement({
      elementType: "section",
      cssClass: "friendScrollContainer",
      attributes: {
        id: "friendScrollContainer"
      }
    });

    targetContainer.appendChild(friendScrollContainer);
    friendScrollContainer.appendChild(_domComponents.default.createDomElement({
      elementType: "section",
      attributes: {
        id: "allFriendContainer"
      }
    }));
    const allFriendContainer = document.getElementById("allFriendContainer");
    allFriendContainer.appendChild(_domComponents.default.createDomElement({
      elementType: "h2",
      content: "friends:",
      cssClass: "friendTag"
    }));
    let friendHolder = []; // PULL FROM FRIENDS JSON-------------------------

    _nomadData.default.connectToData({
      "dataSet": "friends",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=events"
    }).then(fromFriends => {
      // console.log(fromFriends)
      fromFriends.forEach(friendData => {
        // console.log(friendData)
        if (friendData.userId === currentUser) {
          friendHolder.push(friendData.otherFriendId);
        }
      });
      friendHolder.forEach(officialFriend => {
        this.loadCurrentUsersFriends(officialFriend);
      });
    });
  },

  loadCurrentUsersFriends(friend) {
    // PULL FROM USERS JSON -----------------------
    // console.log(friend)
    const allFriendContainer = document.getElementById("allFriendContainer");
    allFriendContainer.appendChild(_domComponents.default.createDomElement({
      elementType: "article",
      attributes: {
        class: "friend-container",
        id: `friend-${friend}`
      }
    }));
    const friendContainer = document.getElementById(`friend-${friend}`); // GET A BOX HERE THAT CONTAINS VISUAL OF FRIENDS

    let friendDomBuilder = [];

    _nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=events"
    }).then(fromUserData => {
      // console.log(fromUserData);
      fromUserData.forEach(userInfo => {
        // console.log(friend, userInfo.id)
        if (userInfo.id === friend) {
          // console.log(userInfo.userName);
          const friendIdentifier = {
            elementType: "h2",
            content: userInfo.userName
          };
          friendDomBuilder.push(friendIdentifier); // PULL FROM EVENTS JSON ------

          _nomadData.default.connectToData({
            "dataSet": "events",
            "fetchType": "GET",
            "dataBaseObject": "",
            "embedItem": "?_embed=events"
          }).then(events => {
            events.forEach(event => {
              if (event.userId === friend) {
                // console.log(event.eventName);
                const eventHolder = {
                  elementType: "p",
                  content: `EVENT: ${event.eventName} on ${event.eventDate}`,
                  attributes: {
                    id: `event-${event.id}`
                  }
                };
                friendDomBuilder.push(eventHolder);
              }
            });
          }); // PULL FROM NEWSITEMS JSON ------


          _nomadData.default.connectToData({
            "dataSet": "newsitems",
            "fetchType": "GET",
            "dataBaseObject": "",
            "embedItem": "?_embed=newsitems"
          }).then(newsShiz => {
            // console.log(newsShiz)
            newsShiz.forEach(userSpecificArticles => {
              if (userSpecificArticles.userId === friend) {
                // console.log(userSpecificArticles.title)
                const articleHolder = {
                  elementType: "p",
                  content: `ARTICLE: ${userSpecificArticles.title}`,
                  attributes: {
                    id: `article-${userSpecificArticles.id}`
                  }
                };
                friendDomBuilder.push(articleHolder);
              }
            }); // console.log(friendDomBuilder)

            friendDomBuilder.forEach(object => {
              // console.log(object);
              friendContainer.appendChild(_domComponents.default.createDomElement(object));
            });
            const deleteFriend = document.createElement("button");
            deleteFriend.classList.add(`delete-friend-${friend}`);
            deleteFriend.setAttribute("type", "button");
            deleteFriend.textContent = "DELETE";
            friendContainer.appendChild(deleteFriend);
            deleteFriend.addEventListener("click", () => {
              _friendsEventsListener.default.friendsDeleteFriend();
            });
          });
        }
      });
    });
  },

  initializePotentialFriends() {
    let userId = sessionStorage.getItem("userId");
    let currentUser = Number(userId); // console.log("friends Page user id is-",currentUser);

    const scrollTargetContainer = document.getElementById("friendScrollContainer");
    const findNewFriendContainer = document.createElement("section");
    let friendsIHave = [];
    findNewFriendContainer.setAttribute("id", "future-friends");
    scrollTargetContainer.appendChild(findNewFriendContainer);
    const findNewFriendTag = document.createElement("h5");
    findNewFriendContainer.appendChild(findNewFriendTag);
    findNewFriendTag.classList.add("friendToBe");
    findNewFriendTag.textContent = "friend to be:";

    _nomadData.default.connectToData({
      "dataSet": "friends",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=friends"
    }).then(fromFriends => {
      // console.log(fromFriends)
      fromFriends.forEach(friendData => {
        // console.log(friendData)
        if (friendData.userId === currentUser) {
          friendsIHave.push(friendData.otherFriendId);
        }
      }); // console.log(friendsIHave)

      this.showUserPotentialFriends(friendsIHave);
    });
  },

  showUserPotentialFriends(friend) {
    let userId = sessionStorage.getItem("userId");
    let currentUser = Number(userId); // console.log(friend)

    let allTheUsers = [];
    friend.push(currentUser);

    _nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=users"
    }).then(allUsers => {
      allUsers.forEach(user => {
        // console.log(user.id)
        allTheUsers.push(user.id);
      });
      console.log("everyone", allTheUsers, "user and friends", friend);
      let notCurrentFriend = this.differenceOf2Arrays(allTheUsers, friend);
      notCurrentFriend.forEach(noFriendOfMine => {
        this.printPotentialFriendsToBrowser(noFriendOfMine);
      });
    });
  },

  differenceOf2Arrays(array1, array2) {
    var temp = [];
    array1 = array1.toString().split(",").map(Number);
    array2 = array2.toString().split(",").map(Number);

    for (var i in array1) {
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }

    for (i in array2) {
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }

    return temp.sort((a, b) => a - b);
  },

  printPotentialFriendsToBrowser(notAFriend) {
    // console.log(notAFriend)
    const targetSectionContainer = document.getElementById("future-friends");
    targetSectionContainer.appendChild(_domComponents.default.createDomElement({
      elementType: "div",
      attributes: {
        id: `potentialFriend-${notAFriend}`
      }
    }));

    _nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=users"
    }).then(usersInfo => {
      usersInfo.forEach(user => {
        if (user.id === notAFriend) {
          console.log(user.id, "is no friend");
          const potentialFriendContainer = document.getElementById(`potentialFriend-${notAFriend}`);
          potentialFriendContainer.appendChild(_domComponents.default.createDomElement({
            elementType: "h2",
            content: user.userName,
            cssClass: `potential-friend-${user.id}`
          }));
          potentialFriendContainer.appendChild(_domComponents.default.createDomElement({
            elementType: "button",
            content: "Add Friend",
            attributes: {
              id: `add-friend-button-${user.id}`,
              type: "button",
              class: "add-friend-button"
            }
          }));
          const forAddButton = document.getElementById(`add-friend-button-${user.id}`);
          forAddButton.addEventListener("click", () => {
            _friendsEventsListener.default.friendsAddFriend();
          });
        }
      });
    }); // console.log(notAFriend)

  },

  friendSortFromMessagesSection(arrayOfFriends, friendToAdd, friendToAddName) {
    let userId = sessionStorage.getItem('userId');
    let currentUser = Number(userId);
    arrayOfFriends.push(currentUser);
    let arrayOfUsers = [];

    _nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=events"
    }).then(users => {
      users.forEach(user => {
        arrayOfUsers.push(user.id);
      });
      let notFriendsList = this.compareMessageFriendArrays(arrayOfUsers, arrayOfFriends);
      this.messengerAddfriendFinale(notFriendsList, friendToAdd, friendToAddName);
    });
  },

  compareMessageFriendArrays(array1, array2) {
    var temp = [];
    array1 = array1.toString().split(',').map(Number);
    array2 = array2.toString().split(',').map(Number);

    for (var i in array1) {
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }

    for (i in array2) {
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }

    return temp.sort((a, b) => a - b);
  },

  messengerAddfriendFinale(notfriends, wantedFriend, friendToAddName) {
    console.log(notfriends, Number(wantedFriend));
    const finalFriend = notfriends.filter(friendsThatArent => friendsThatArent === Number(wantedFriend)); // console.log(finalFriend[0], Number(wantedFriend))

    if (finalFriend[0] === Number(wantedFriend)) {
      if (friendToAddName === "modal") {
        _friendsEventsListener.default.searchBarAddFriendToJson(finalFriend);
      } else {
        this.modalQuestionaireOfFriendshipValidity(wantedFriend, friendToAddName);
      } // alert(`You've added a fellow Nomad ${friendToAddName} your friend list`)

    } else {
      alert("Uh.... You can't friend there (it's you or someone who's already a friend).");
    }
  },

  modalQuestionaireOfFriendshipValidity(wantedFriend, friendToAddName) {
    document.getElementById("output").appendChild(_domComponents.default.createDomElement({
      elementType: "section",
      attributes: {
        id: "modal-container"
      }
    }));
    document.getElementById("modal-container").appendChild(_domComponents.default.createDomElement({
      elementType: "div",
      attributes: {
        id: "friends__backdrop"
      }
    }));
    document.getElementById("modal-container").appendChild(_domComponents.default.createDomElement({
      elementType: "div",
      attributes: {
        id: "friends__modal"
      }
    }));
    const modalParentTarget = document.getElementById("friends__modal");
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "h1",
      content: `You sure you want ${friendToAddName} as a friend?`,
      attributes: {
        id: "friends__content"
      }
    }));
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "p",
      content: "I mean really....",
      attributes: {
        href: "#",
        id: "friends__close"
      }
    }));
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "button",
      content: "Don't Friend",
      attributes: {
        id: "dontFriend",
        type: "button"
      }
    }));
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "button",
      content: `Yes, make ${friendToAddName} a Friend`,
      attributes: {
        id: "friendItUp",
        name: wantedFriend,
        type: "button"
      }
    }));
    document.getElementById("dontFriend").addEventListener("click", () => {
      _friendsEventsListener.default.closeMessageModal();
    });
    document.getElementById("friendItUp").addEventListener("click", () => {
      _friendsEventsListener.default.closeMessageModal();
    });
    this.openFriendModal();
  },

  openFriendModal() {
    let backdrop = document.getElementById("friends__backdrop");
    let modal = document.getElementById("friends__modal");
    backdrop.style.display = "block";
    modal.style.display = "block";
  },

  buildFriendSearchBar() {
    document.getElementById("output").appendChild(_domComponents.default.createDomElement({
      elementType: "div",
      attributes: {
        id: "friend-search-box"
      }
    }));
    document.getElementById("friend-search-box").appendChild(_domComponents.default.createDomElement({
      elementType: "input",
      attributes: {
        id: "friend-search-input",
        class: "search-txt",
        type: "text",
        name: "",
        placeholder: "Search For Friends"
      }
    }));
    document.getElementById("friend-search-box").appendChild(_domComponents.default.createDomElement({
      elementType: "a",
      attributes: {
        class: "friend-search-btn",
        href: "#",
        id: "friend-icon-anchor"
      }
    }));
    document.getElementById("friend-icon-anchor").appendChild(_domComponents.default.createDomElement({
      elementType: "i",
      cssClass: "fas"
    }));
    let searchIcon = document.querySelector(".fas");
    searchIcon.classList.add("fa-search");
    const usersSearchFriendInputEnter = document.getElementById("friend-search-input");
    usersSearchFriendInputEnter.addEventListener("keypress", keyPressEvent => {
      // console.log(event.key)
      if (keyPressEvent.charCode === 13) {
        let userInputEnter = keyPressEvent.target.value;

        _friendsEventsListener.default.searchInputMagic(userInputEnter);

        usersSearchFriendInputEnter.value = "";
      }
    });
    const usersSearchFriendInputClick = document.getElementById("friend-icon-anchor");
    usersSearchFriendInputClick.addEventListener("click", () => {
      let userInputClick = usersSearchFriendInputEnter.value;

      _friendsEventsListener.default.searchInputMagic(userInputClick);

      usersSearchFriendInputEnter.value = "";
    });
  },

  searchResultDisplayed(friendSearchResultDisplayed) {
    console.log("yo");
    document.getElementById("output").appendChild(_domComponents.default.createDomElement({
      elementType: "section",
      attributes: {
        id: "modal-container"
      }
    }));
    document.getElementById("modal-container").appendChild(_domComponents.default.createDomElement({
      elementType: "div",
      attributes: {
        id: "friends__backdrop"
      }
    }));
    document.getElementById("modal-container").appendChild(_domComponents.default.createDomElement({
      elementType: "div",
      attributes: {
        id: "friends__modal"
      }
    }));
    const modalParentTarget = document.getElementById("friends__modal");
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "h1",
      content: `Would you like to be friends with ${friendSearchResultDisplayed.userName}?`,
      attributes: {
        id: "friends__content"
      }
    }));
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "p",
      content: `I mean ${friendSearchResultDisplayed.userName} is pretty cool...`,
      attributes: {
        href: "#",
        id: "friends__close"
      }
    }));
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "button",
      content: "Don't Friend",
      attributes: {
        id: "dontFriend",
        type: "button"
      }
    }));
    modalParentTarget.appendChild(_domComponents.default.createDomElement({
      elementType: "button",
      content: `Yes, make ${friendSearchResultDisplayed.userName} a Friend`,
      attributes: {
        id: "friendItUp-searchModal",
        type: "button"
      }
    }));
    document.getElementById("dontFriend").addEventListener("click", () => {
      _friendsEventsListener.default.closeMessageModal();
    });
    document.getElementById("friendItUp-searchModal").addEventListener("click", () => {
      _friendsEventsListener.default.searchBarFriending(friendSearchResultDisplayed.id);
    });
    this.openFriendModal();
  }

};
var _default = friends; // const tester = [
//   {
//     elementType: "h2",
//     content: "jake bannon"
//   },
//   {
//     elementType: "p",
//     content: "Pool Party 3pm"
//   },
//   {
//     elementType: "p",
//     content: "check out this news article"
//   }
// ]

exports.default = _default;

},{"./domComponents":2,"./friendsEventsListener":8,"./nomadData":13}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _friends = _interopRequireDefault(require("./friends"));

var _nomadData = _interopRequireDefault(require("./nomadData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const friendsEventsListener = {
  friendsDeleteFriend() {
    const friendToDelete = event.target.classList.value.split("-")[2];
    let userId = sessionStorage.getItem("userId");
    let currentUser = userId;
    console.log(friendToDelete, currentUser);
    let finalNumberSendForDelete = 0;

    _nomadData.default.connectToData({
      "dataSet": "friends",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=friends"
    }).then(destroyFriendsHeart => {
      destroyFriendsHeart.forEach(goodbyeFriend => {
        console.log(goodbyeFriend.userId, Number(currentUser));

        if (goodbyeFriend.otherFriendId === Number(friendToDelete) && goodbyeFriend.userId === Number(currentUser)) {
          console.log("PeaceOut", goodbyeFriend.id);
          finalNumberSendForDelete = goodbyeFriend.id;
        }
      });
      let goodByeSearchResults = document.getElementById(`friend-${friendToDelete}`);
      goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);
      console.log(finalNumberSendForDelete);

      _nomadData.default.connectToData({
        "deleteId": finalNumberSendForDelete,
        "dataSet": "friends",
        "fetchType": "DELETE",
        "dataBaseObject": {
          "userId": sessionStorage.getItem("userId")
        }
      }).then(() => {
        $("#output").empty();

        _friends.default.defineCurrentUsersFriends();

        _friends.default.initializePotentialFriends();
      });
    });
  },

  friendsAddFriend() {
    let userId = sessionStorage.getItem("userId");
    let currentUser = Number(userId);
    const friendToBeAdded = event.target.id.split("-")[3];
    console.log(`user${currentUser}`, `Adding Friend${friendToBeAdded}`);
    let goodByeNonFriend = document.getElementById(`potentialFriend-${friendToBeAdded}`);
    goodByeNonFriend.parentNode.removeChild(goodByeNonFriend); // alert(`${event.target.previousSibling.innerText} is now your friend!`);

    _nomadData.default.connectToData({
      "dataSet": "friends",
      "fetchType": "POST",
      "dataBaseObject": {
        "userId": currentUser,
        "otherFriendId": Number(friendToBeAdded)
      }
    }).then(() => {
      $("#output").empty();

      _friends.default.defineCurrentUsersFriends();

      _friends.default.initializePotentialFriends();
    });
  },

  shiz() {
    if (event.target.attributes.name.value === "undefined") {
      console.log("shziball");
    }

    const friendToBeAdded = event.target.attributes.name.value;
    const friendToBeAddedHasAName = event.target.textContent.split(":")[0];
    let friendsIHave = [];
    let userId = sessionStorage.getItem('userId');
    let currentUser = Number(userId);

    _nomadData.default.connectToData({
      "dataSet": "friends",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=friends"
    }).then(fromFriends => {
      // console.log(fromFriends)
      fromFriends.forEach(friendData => {
        // console.log(friendData)
        if (friendData.userId === currentUser) {
          friendsIHave.push(friendData.otherFriendId);
        }
      }); // console.log(friendsIHave)

      _friends.default.friendSortFromMessagesSection(friendsIHave, friendToBeAdded, friendToBeAddedHasAName);
    });
  },

  closeMessageModal() {
    let userId = sessionStorage.getItem('userId');
    let currentUser = Number(userId);

    if (event.target.id === "dontFriend") {
      let goodByeSearchResults = document.getElementById("modal-container");
      goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);
    } else if (event.target.id === "friendItUp") {
      let goodByeSearchResults = document.getElementById("modal-container");
      goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);
      let friendTobe = event.target.attributes.name.value;
      console.log(friendTobe);

      _nomadData.default.connectToData({
        "dataSet": "friends",
        "fetchType": "POST",
        "dataBaseObject": {
          "userId": currentUser,
          "otherFriendId": Number(friendTobe)
        }
      });
    }
  },

  searchInputMagic(userInput) {
    let userId = sessionStorage.getItem('userId');
    let currentUser = Number(userId); // console.log(userInput)

    _nomadData.default.connectToData({
      "dataSet": "users",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=users"
    }).then(users => {
      const foundUsers = users.find(user => user.userName.includes(userInput));
      console.log(foundUsers.id, currentUser);

      if (foundUsers.id === currentUser) {
        alert("Can't friend yourself");
      } else {
        _friends.default.searchResultDisplayed(foundUsers);
      }
    });
  },

  searchBarFriending(friendToBeFromSearchId) {
    const definedAsFromSearchModal = "modal";
    let friendsIHave = [];
    let userId = sessionStorage.getItem('userId');
    let currentUser = Number(userId);

    _nomadData.default.connectToData({
      "dataSet": "friends",
      "fetchType": "GET",
      "dataBaseObject": "",
      "embedItem": "?_embed=friends"
    }).then(fromFriends => {
      // console.log(fromFriends)
      fromFriends.forEach(friendData => {
        // console.log(friendData)
        if (friendData.userId === currentUser) {
          friendsIHave.push(friendData.otherFriendId);
        }
      }); // console.log(friendsIHave)

      _friends.default.friendSortFromMessagesSection(friendsIHave, friendToBeFromSearchId, definedAsFromSearchModal);
    });
  },

  searchBarAddFriendToJson(friendToBe) {
    let userId = sessionStorage.getItem('userId');
    let currentUser = Number(userId);
    let goodByeSearchResults = document.getElementById("modal-container");
    goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);

    _nomadData.default.connectToData({
      "dataSet": "friends",
      "fetchType": "POST",
      "dataBaseObject": {
        "userId": currentUser,
        "otherFriendId": Number(friendToBe)
      }
    });
  }

};
var _default = friendsEventsListener;
exports.default = _default;

},{"./friends":7,"./nomadData":13}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _messagesEventListeners = _interopRequireDefault(require("./messagesEventListeners"));

var _friendsEventsListener = _interopRequireDefault(require("./friendsEventsListener.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messages = {
  createMessageBoard() {
    $("#output").empty();
    let outputArticle = document.getElementById("output"); //create display container

    let messagesContainer = _domComponents.default.createDomElement({
      elementType: "section",
      cssClass: "messagesContainer",
      attributes: {
        id: "messagesContainer"
      }
    }); //create message input field


    let messageInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "messageInput",
      attributes: {
        id: "messageInput",
        placeholder: "Enter Message Here"
      }
    }); //create submit button for input field


    let messageSubmitButton = _domComponents.default.createDomElement({
      elementType: "button",
      cssClass: "messageSubmitButton",
      content: "Submit",
      attributes: {
        id: "messageSubmitButton",
        type: "button"
      }
    });

    messageSubmitButton.addEventListener("click", _messagesEventListeners.default.postNewMessage, {
      once: true
    });
    messagesContainer.appendChild(messageInput);
    messagesContainer.appendChild(messageSubmitButton);
    outputArticle.appendChild(messagesContainer);
    this.getMessages();
  },

  getMessages() {
    //GET fetch & .then to build object(s) for createDomElement() using _expand to display UN: message
    _nomadData.default.connectToData({
      dataSet: "messages",
      fetchType: "GET",
      embedItem: "?_expand=user"
    }).then(messages => {
      let messageContainer = document.getElementById("messagesContainer");
      let messageInput = document.getElementById("messageInput"); //sort messages by timeStamp

      messages.sort(function (a, b) {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      }); //build DOM Component for each message and append

      messages.forEach(message => {
        console.log(message);
        let messageText = message.message;
        let userName = message.user.userName;
        let messageId = message.id;
        let messageTimeStamp = message.timeStamp;
        let messageUser = `${message.userId}`;
        let loggedInUser = sessionStorage.getItem("userId");

        let messageDiv = _domComponents.default.createDomElement({
          elementType: "div",
          cssClass: "messageDiv",
          attributes: {
            id: `messageDiv_${messageId}`
          }
        });

        let messageElement = _domComponents.default.createDomElement({
          // ADD LINK HERE
          elementType: "h3",
          cssClass: "messageUserName",
          content: `${userName}:`,
          attributes: {
            id: `message${messageId}`,
            name: parseInt(messageUser)
          }
        });

        let messageElement2 = _domComponents.default.createDomElement({
          elementType: "p",
          cssClass: "messageText",
          content: `${messageText}`,
          attributes: {
            id: messageId
          }
        });

        if (messageUser === loggedInUser) {
          let messageEditButton = _domComponents.default.createDomElement({
            elementType: "button",
            cssClass: "messageEditButton",
            content: "Edit",
            attributes: {
              id: `messageEditButton_${messageId}`,
              name: messageTimeStamp,
              type: "button"
            }
          });

          messageEditButton.addEventListener("click", _messagesEventListeners.default.editMessage, {
            once: true
          });
          messageDiv.appendChild(messageElement);
          messageElement.appendChild(messageElement2);
          messageDiv.appendChild(messageEditButton);
          messageContainer.insertBefore(messageDiv, messageInput);
        } else {
          messageElement.appendChild(messageElement2);
          messageContainer.insertBefore(messageElement, messageInput);
        }

        messageElement.addEventListener("click", _friendsEventsListener.default.shiz);
      });
    });
  }

};
var _default = messages;
exports.default = _default;

},{"./domComponents":2,"./friendsEventsListener.js":8,"./messagesEventListeners":10,"./nomadData":13}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _messages = _interopRequireDefault(require("./messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import friendsEventsListener from "./friendsEventsListener.js";
const messagesEventListeners = {
  postNewMessage() {
    let messageInput = document.getElementById("messageInput").value;
    let timeStamp = new Date();

    _nomadData.default.connectToData({
      dataSet: "messages",
      fetchType: "POST",
      dataBaseObject: {
        userId: Number(sessionStorage.getItem("userId")),
        message: messageInput,
        timeStamp: timeStamp
      }
    }).then(shit => {
      console.log(shit);
      $("#output").empty();

      _messages.default.createMessageBoard();
    });
  },

  editMessage() {
    let number = event.currentTarget.id;
    let messageArray = number.split("_");
    let messageId = messageArray[1];
    let messageToEdit = document.getElementById(`${messageId}`);
    let messageText = messageToEdit.innerHTML;
    let messageDiv = document.getElementById(`messageDiv_${messageId}`);
    let messageTimeStamp = event.currentTarget.name;

    let messageEditForm = _domComponents.default.createDomElement({
      elementType: "form",
      cssClass: "messageEditForm",
      attributes: {
        id: "messageEditForm"
      }
    });

    let messageEditFieldset = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "messageEditFieldset",
      attributes: {
        id: "messageEditFieldset"
      }
    });

    let messageEditInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "messageEditInput",
      attributes: {
        id: `messageEditInput_${messageId}`,
        value: `${messageText}`
      }
    });

    let messageEditSubmitButton = _domComponents.default.createDomElement({
      elementType: "button",
      cssClass: "messageEditSubmitButton",
      content: "Submit",
      attributes: {
        id: `messageEditSubmitButton_${messageId}`,
        name: messageTimeStamp,
        type: "button"
      }
    });

    messageEditSubmitButton.addEventListener("click", messagesEventListeners.handleEditSubmitButton);
    messageEditFieldset.appendChild(messageEditInput);
    messageEditFieldset.appendChild(messageEditSubmitButton);
    messageEditForm.appendChild(messageEditFieldset);
    messageDiv.appendChild(messageEditForm);
    event.stopPropagation();
  },

  handleEditSubmitButton() {
    let number = event.currentTarget.id;
    let messageArray = number.split("_");
    let messageId = messageArray[1];
    let messageTimeStamp = `${event.currentTarget.name}`;
    let messageEditInput = document.getElementById(`messageEditInput_${messageId}`);

    _nomadData.default.connectToData({
      putId: messageId,
      dataSet: "messages",
      fetchType: "PUT",
      dataBaseObject: {
        userId: Number(sessionStorage.getItem("userId")),
        message: `${messageEditInput.value}`,
        timeStamp: `${messageTimeStamp}`
      }
    }).then(shit => {
      console.log(shit);
      $("#output").empty();

      _messages.default.createMessageBoard();
    });
  }

};
var _default = messagesEventListeners;
exports.default = _default;

},{"./domComponents":2,"./messages":9,"./nomadData":13}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _newsListener = _interopRequireDefault(require("./newsListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const news = {
  getAPINews() {
    //clear when called.
    $("#output").empty(); //getAPINews will pull news from API then call createElement and append to output.
    //Create a header for incoming news.

    let articleCounter = 0;

    const newsContainer = _domComponents.default.createDomElement({
      elementType: "div",
      cssClass: "mainVein"
    });

    const targetValue = document.querySelector("#output"); //New container for scrolling.

    const newsHeader = _domComponents.default.createDomElement({
      elementType: "h1",
      content: "Current News",
      cssClass: "newsAPIHeader"
    });

    newsContainer.appendChild(newsHeader);
    targetValue.appendChild(newsContainer); //pull the data from the api and display it to the dom.

    let currentArticlesDiv = _domComponents.default.createDomElement({
      elementType: "div",
      cssClass: "currentArticlesDiv",
      attributes: {
        id: "currentArticlesDiv"
      }
    });

    return fetch("https://newsapi.org/v2/everything?q=vanlife&from=2019-01-05&sortBy=publishedAt&language=en&apiKey=9f5c509fe90044dc95a8a6963573284f").then(newsItems => newsItems.json()).then(displayData => {
      displayData.articles.forEach(dataGran => {
        let artURL = dataGran.url;
        let artTitle = dataGran.title;
        let artDesc = dataGran.description;
        let artImage = dataGran.urlToImage; //counter used to give unique identifier for tagging and grabbing.

        articleCounter++;
        sessionStorage.setItem(`article_${articleCounter}_title`, `${artTitle}`);
        sessionStorage.setItem(`article_${articleCounter}_url`, `${artURL}`);
        sessionStorage.setItem(`article_${articleCounter}_desc`, `${artDesc}`);
        sessionStorage.setItem(`article_${articleCounter}_image`, `${artImage}`); //add section container for all articles.

        const newsAPIArtContain = _domComponents.default.createDomElement({
          elementType: "article",
          cssClass: "newsAPIArticleContainer" // attribute: {
          //     style: "height:95vh; overflow: scroll; color:white;text-align:center;font-size:20px;overflow:auto; border-radius: 12px;"
          // }

        });

        const articleContainer = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: `newsAPIContainer_${articleCounter}`,
          attribute: {
            id: "apiSectionGrab",
            style: "border-radius: 12px;"
          }
        });

        newsAPIArtContain.appendChild(articleContainer);
        currentArticlesDiv.appendChild(newsAPIArtContain); //create fieldset for articles to be and then attach them to the sections above.

        const parentAPISection = _domComponents.default.createDomElement({
          elementType: "p",
          content: dataGran.title,
          cssClass: "apiData",
          attributes: {
            id: `article_${articleCounter}`,
            style: "color:white;text-align:center;font-size:20px;overflow:auto; border-radius: 12px;"
          }
        });

        parentAPISection.appendChild(_domComponents.default.createDomElement({
          elementType: "img",
          content: dataGran.urlToImage,
          cssClass: `apiImage`,
          attributes: {
            id: `apiImage_${articleCounter}`,
            src: `${dataGran.urlToImage}` // style: "width: 30%; height: 15%; border-radius: 12px;"

          }
        }));
        currentArticlesDiv.appendChild(parentAPISection); //creating button in order to attach to individual articles.

        const saveApiButton = _domComponents.default.createDomElement({
          elementType: "button",
          content: "Remember This",
          cssClass: "allButtons",
          attributes: {
            name: `${articleCounter}` //style: "  border: 0; line-height:2; width:9%; background:rgb(81, 78, 78); color:rgb( 191, 162, 44);line-height: 2; border-radius: 12px;"

          }
        }); //Eventlistener to send current data to savefunction.


        parentAPISection.appendChild(saveApiButton);
        saveApiButton.addEventListener("click", _newsListener.default.saveButtonListener);
      });
      newsContainer.appendChild(currentArticlesDiv); //calls the creator to make the SAVED ARTICLES Section

      news.savedNewsElementsCreator();
    });
  },

  // method displays friends news.
  getUserFriendsNews() {
    //create array and call to get user data.
    const friendHolder = [];
    let friendsContainer = document.querySelector(".article1");

    _nomadData.default.connectToData({
      dataSet: "users",
      fetchType: "GET",
      embedItem: "?_embed=friends"
    }).then(parsedResponse => {
      //for loop to run through array of user info.
      for (let i = 0; i < parsedResponse.length; i++) {
        const response = parsedResponse[i]; // if statement to ccmpare response id to session id inorder to see if the news article is the users or friend.

        if (response.id === Number(sessionStorage.getItem("userId"))) {
          // if not the user then lop through array and push id's.
          for (let j = 0; j < response.friends.length; j++) {
            const friends = response.friends[j];
            friendHolder.push(friends.otherFriendId);
          } // once friendholder array is loaded loop through again to compare agains pulled dataItems that have been fetched.


          friendHolder.forEach(friendId => {
            _nomadData.default.connectToData({
              dataSet: "newsItems",
              fetchType: "GET",
              embedItem: `?userId=${friendId}`
            }).then(parsedResponse => {
              console.log(friendsContainer);
              parsedResponse.forEach(response => {
                //call the function that builds DOM element for story and posts to DOM.  Be sure that function includes displaying a userName to dinstinguish user's stories from friends' stories.
                const articleSectionFriend = _domComponents.default.createDomElement({
                  elementType: "section",
                  cssClass: `newsArticleContainer--${response.id}`
                });

                const friendsHeader = _domComponents.default.createDomElement({
                  elementType: "h3",
                  content: `${response.title}`,
                  cssClass: "newsTitle"
                });

                const newsURL = _domComponents.default.createDomElement({
                  elementType: "a",
                  content: response.url,
                  cssClass: "newsURL",
                  attributes: {
                    href: `${response.url}`,
                    target: "blank"
                  }
                });

                articleSectionFriend.appendChild(friendsHeader);
                articleSectionFriend.appendChild(newsURL);
                friendsContainer.appendChild(articleSectionFriend);
              });
            });
          });
        }
      }
    });
  },

  savedNewsElementsCreator() {
    //Creates the header for the saved news articles.
    let mainContainer = document.querySelector(".mainVein");

    const mainSavedContainer = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "article1",
      attribute: {
        style: "border-width: thin"
      }
    });

    mainContainer.appendChild(mainSavedContainer);

    const savedHeader = _domComponents.default.createDomElement({
      elementType: "h1",
      content: "Saved News",
      cssClass: "savedHeader",
      attribute: {
        id: "savedHeader"
      }
    });

    mainSavedContainer.appendChild(savedHeader);
    const saveRef = ""; //creates the object that is needed to use the createDomElement Factory.

    let newsCreatorKey = {
      "dataSet": "newsItems",
      "fetchType": "GET",
      "embedItem": `?_embed=${saveRef}` //Makes the call to the data factory to fetch/get data to put in the object.

    };

    _nomadData.default.connectToData(newsCreatorKey).then(dbGrabs => {
      dbGrabs.forEach(dbGrab => {
        const sectionSavedContainer = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: `newsArticleContainer--${dbGrab.id}`
        });

        const savedHeader = _domComponents.default.createDomElement({
          elementType: "h3",
          content: `${dbGrab.title}`,
          cssClass: "newsTitle"
        });

        const savedNewsURL = _domComponents.default.createDomElement({
          elementType: "a",
          content: dbGrab.url,
          cssClass: "newsURL",
          attributes: {
            href: `${dbGrab.url}`,
            target: "blank"
          }
        });

        const delButon = _domComponents.default.createDomElement({
          elementType: "button",
          content: "ADIOS",
          cssClass: "allButtons",
          attributes: {
            id: `newsDeleteButton--${dbGrab.id}`
          }
        }); //creating a button and pointing at the article to delete. Attached event listner.


        sectionSavedContainer.appendChild(savedHeader);
        sectionSavedContainer.appendChild(savedNewsURL);
        sectionSavedContainer.appendChild(delButon);
        delButon.addEventListener("click", _newsListener.default.deleteButtonListener);
        mainSavedContainer.appendChild(sectionSavedContainer);
        mainContainer.appendChild(mainSavedContainer);
      });
      news.getUserFriendsNews();
    });
  }

};
var _default = news;
exports.default = _default;

},{"./domComponents":2,"./newsListener":12,"./nomadData":13}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _news = _interopRequireDefault(require("./news"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newsListener = {
  saveButtonListener() {
    //This is functioning and writing to JSON. Need to attach this to the save button.
    const saveID = event.target.name;
    let artTitle = sessionStorage.getItem(`article_${saveID}_title`);
    let artDescription = sessionStorage.getItem(`article_${saveID}_desc`);
    let articleURL = sessionStorage.getItem(`article_${saveID}_url`);
    const newsObjectPost = {
      "dataSet": "newsItems",
      "fetchType": "POST",
      "dataBaseObject": {
        "userId": Number(sessionStorage.getItem('userId')),
        "url": `${articleURL}`,
        "title": `${artTitle}`,
        "synopsis": `${artDescription}`
      }
    };
    console.log(sessionStorage);

    _nomadData.default.connectToData(newsObjectPost).then(response => response.json).then(shit => {
      console.log(shit);
      $("#output").empty();

      _news.default.getAPINews();
    });
  },

  deleteButtonListener() {
    //To delete from saved news articles.
    const deleteID = event.target.id.split("--")[1];

    _nomadData.default.connectToData({
      deleteId: deleteID,
      dataSet: "newsItems",
      fetchType: "DELETE"
    }).then(() => {
      $(".article1").remove();

      _news.default.savedNewsElementsCreator();
    });
  }

};
var _default = newsListener;
exports.default = _default;

},{"./news":11,"./nomadData":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const nomadData = {
  connectToData(fetchObject) {
    let dataSet = fetchObject.dataSet;
    let embedItem = fetchObject.embedItem;
    let fetchType = fetchObject.fetchType;
    let dataBaseObject = fetchObject.dataBaseObject;
    let putId = fetchObject.putId;
    let deleteId = fetchObject.deleteId;

    if (fetchType == "GET") {
      return fetch(`http://localhost:8088/${dataSet}${embedItem}`).then(response => response.json()); // parses response to JSON
    } else if (fetchType === "POST") {
      // Default options are marked with *
      return fetch(`http://localhost:8088/${dataSet}`, {
        method: `${fetchType}`,
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8" // "Content-Type": "application/x-www-form-urlencoded",

        },
        // referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(dataBaseObject) // body data type must match "Content-Type" header

      });
    } else if (fetchType === "PUT") {
      return fetch(`http://localhost:8088/${dataSet}/${putId}`, {
        method: `${fetchType}`,
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8" // "Content-Type": "application/x-www-form-urlencoded",

        },
        // referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(dataBaseObject) // body data type must match "Content-Type" header

      });
    } else if (fetchType === "DELETE") {
      return fetch(`http://localhost:8088/${dataSet}/${deleteId}`, {
        method: `${fetchType}`,
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8" // "Content-Type": "application/x-www-form-urlencoded",

        } // referrer: "no-referrer", // no-referrer, *client

      });
    } else {
      console.log("YOU SCREWED IT UP");
    }
  }

};
var _default = nomadData;
exports.default = _default;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _tasksEventListeners = _interopRequireDefault(require("./tasksEventListeners"));

var _tasksPopup = _interopRequireDefault(require("./tasksPopup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import eventListeners from "./eventListeners"
const tasks = {
  createTaskTables() {
    $("#output").empty(); //need to get session storage before building tasks form upon logIn

    this.getTasks();
    let outputArticle = document.getElementById("output"); //create display container

    let tasksContainer = _domComponents.default.createDomElement({
      elementType: "section",
      cssClass: "tasksContainer",
      attributes: {
        id: "tasksContainer"
      }
    }); //create tasks tables


    let activeTasksTable = _domComponents.default.createDomElement({
      elementType: "table",
      cssClass: "activeTasksTable",
      attributes: {
        id: "activeTasksTable"
      }
    });

    let activeTasksTableTitle = _domComponents.default.createDomElement({
      elementType: "caption",
      cssClass: "activeTasksTableTitle",
      content: "ACTIVE TASKS"
    });

    let completedTasksTable = _domComponents.default.createDomElement({
      elementType: "table",
      cssClass: "completedTasksTable",
      attributes: {
        id: "completedTasksTable"
      }
    });

    let completedTasksTableTitle = _domComponents.default.createDomElement({
      elementType: "caption",
      cssClass: "completedTasksTableTitle",
      content: "COMPLETED TASKS"
    }); //create row with column headers


    let activeTasksHeaderRow = _domComponents.default.createDomElement({
      elementType: "tr",
      cssClass: "activeTasksHeaderRow",
      attributes: {
        id: "activeTasksHeaderRow"
      }
    });

    let completedTasksHeaderRow = _domComponents.default.createDomElement({
      elementType: "tr",
      cssClass: "completedTasksHeaderRow",
      attributes: {
        id: "completedTasksHeaderRow"
      }
    }); //create column headers


    let activeTasksHeader = _domComponents.default.createDomElement({
      elementType: "th",
      cssClass: "activeTasksHeader",
      content: "Task",
      attributes: {
        id: "activeTasksHeader"
      }
    });

    let activeTasksDueDateHeader = _domComponents.default.createDomElement({
      elementType: "th",
      cssClass: "activeTasksDueDateHeader",
      content: "Due Date",
      attributes: {
        id: "activeTasksDueDateHeader"
      }
    });

    let activeTasksEdit = _domComponents.default.createDomElement({
      elementType: "th",
      cssClass: "activeTasksEdit",
      content: "",
      attributes: {
        id: "activeTasksEdit"
      }
    });

    let completedTasksHeader = _domComponents.default.createDomElement({
      elementType: "th",
      cssClass: "completedTasksHeader",
      content: "Task",
      attributes: {
        id: "completedTasksHeader"
      }
    });

    let completedTasksDueDateHeader = _domComponents.default.createDomElement({
      elementType: "th",
      cssClass: "completedTasksDueDateHeader",
      content: "Due Date",
      attributes: {
        id: "completedTasksDueDateHeader"
      }
    }); //create button to make new tasks


    let createTaskButton = _domComponents.default.createDomElement({
      elementType: "button",
      cssClass: "createTaskButton",
      content: "Create New Task",
      attributes: {
        id: "createTaskButton",
        type: "button"
      }
    });

    let completedTasksEdit = _domComponents.default.createDomElement({
      elementType: "th",
      cssClass: "completedTasksEdit",
      content: "",
      attributes: {
        id: "completedTasksEdit"
      }
    }); //append header row to table and table to container


    activeTasksTable.appendChild(activeTasksTableTitle);
    completedTasksTable.appendChild(completedTasksTableTitle);
    activeTasksHeaderRow.appendChild(activeTasksHeader);
    activeTasksHeaderRow.appendChild(activeTasksDueDateHeader);
    activeTasksHeaderRow.appendChild(activeTasksEdit);
    activeTasksTable.appendChild(activeTasksHeaderRow);
    tasksContainer.appendChild(activeTasksTable);
    completedTasksHeaderRow.appendChild(completedTasksHeader);
    completedTasksHeaderRow.appendChild(completedTasksDueDateHeader);
    completedTasksHeaderRow.appendChild(completedTasksEdit);
    completedTasksTable.appendChild(completedTasksHeaderRow);
    tasksContainer.appendChild(completedTasksTable);
    createTaskButton.addEventListener("click", _tasksPopup.default.createNewTaskForm);
    tasksContainer.appendChild(createTaskButton);
    outputArticle.appendChild(tasksContainer);
  },

  getTasks() {
    let currentUser = Number(sessionStorage.getItem("userId")); //populate tasks

    _nomadData.default.connectToData({
      dataSet: "tasks",
      fetchType: "GET",
      embedItem: "?_embed=users"
    }).then(tasks => {
      tasks.sort(function (a, b) {
        return new Date(a.expectedCompletionDate) - new Date(b.expectedCompletionDate);
      });
      tasks.forEach(task => {
        if (task.userId === currentUser) {
          let status = task.complete;
          let activeTasksTable = document.getElementById("activeTasksTable");
          let completedTasksTable = document.getElementById("completedTasksTable"); // create a new table row for each task

          let taskRow = _domComponents.default.createDomElement({
            elementType: "tr",
            cssClass: "taskTableRow",
            attributes: {
              id: `taskTableRow_${task.id}`
            }
          }); //create cells to hold task and due date


          let taskCell = _domComponents.default.createDomElement({
            elementType: "td",
            cssClass: "taskCell",
            attributes: {
              id: `taskCell_${task.id}`
            }
          });

          let dueDateCell = _domComponents.default.createDomElement({
            elementType: "td",
            cssClass: "dueDateCell",
            attributes: {
              id: `dueDateCell_${task.id}`
            }
          });

          let taskEditCell = _domComponents.default.createDomElement({
            elementType: "td",
            cssClass: "taskEditCell",
            attributes: {
              id: `taskEditCell_${task.id}`
            }
          });

          let taskEditButton = _domComponents.default.createDomElement({
            elementType: "button",
            cssClass: "taskEditButton",
            content: "Edit",
            attributes: {
              id: `taskEditButton_${task.id}`,
              type: "button"
            }
          }); //create task checkbox and title


          let taskLabel = _domComponents.default.createDomElement({
            elementType: "label",
            cssClass: "taskLabel",
            attributes: {
              id: `taskLabel_${task.id}`
            }
          }); //create task title


          let taskTitle = document.createTextNode(`${task.task}`); //create task checkbox

          let taskCheckbox = _domComponents.default.createDomElement({
            elementType: "input",
            cssClass: "taskCheckbox",
            attributes: {
              id: `taskCheckbox_${task.id}`,
              type: "checkbox",
              value: `${task.task}`
            }
          }); //create task dute date


          let dueDateArray = new Date(task.expectedCompletionDate).toDateString().split(" ");
          let dueDate = `${dueDateArray[1]} ${dueDateArray[2]} ${dueDateArray[3]}`;

          let taskDueDate = _domComponents.default.createDomElement({
            elementType: "p",
            cssClass: "taskDueDate",
            content: dueDate,
            attributes: {
              id: `taskDueDate_${task.id}`
            }
          }); //append -- order is important for checkbox and label to ensure box in on the left


          taskCheckbox.addEventListener("change", _tasksEventListeners.default.markTaskComplete);
          taskEditButton.addEventListener("click", _tasksEventListeners.default.taskEditButton);
          taskLabel.appendChild(taskCheckbox);
          taskLabel.appendChild(taskTitle);
          taskCell.appendChild(taskLabel);
          dueDateCell.appendChild(taskDueDate);
          taskEditCell.appendChild(taskEditButton);
          taskRow.appendChild(taskCell);
          taskRow.appendChild(dueDateCell);
          taskRow.appendChild(taskEditCell);

          if (status) {
            completedTasksTable.appendChild(taskRow);
            taskCheckbox.setAttribute("checked", "");
          } else {
            activeTasksTable.appendChild(taskRow);
          }
        }
      });
    });
  }

};
var _default = tasks;
exports.default = _default;

},{"./domComponents":2,"./nomadData":13,"./tasksEventListeners":15,"./tasksPopup":16}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nomadData = _interopRequireDefault(require("./nomadData"));

var _tasks = _interopRequireDefault(require("./tasks"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tasksEventListeners = {
  createNewTask() {
    let taskTitle = document.getElementById("taskTitleInput").value;
    let dueDateFieldValiue = document.getElementById("taskDateInput").value;
    let userId = Number(sessionStorage.getItem('userId'));
    let dueDateArray = dueDateFieldValiue.split("-");
    let dueDate = `${dueDateArray[1]} ${dueDateArray[2]} ${dueDateArray[0]}`;

    _nomadData.default.connectToData({
      dataSet: "tasks",
      fetchType: "POST",
      dataBaseObject: {
        userId: userId,
        task: taskTitle,
        expectedCompletionDate: dueDate,
        complete: false
      }
    }).then(response => response.json()).then(shit => {
      console.log(shit);
      $("#output").empty();

      _tasks.default.createTaskTables();
    });
  },

  markTaskComplete() {
    let taskToEditId = event.target.id.split("_")[1];

    _nomadData.default.connectToData({
      dataSet: "tasks",
      fetchType: "GET",
      embedItem: `?&id=${taskToEditId}`
    }).then(parsedTasks => {
      let taskId = parsedTasks[0].id;
      let userId = parsedTasks[0].userId;
      let task = parsedTasks[0].task;
      let expectedCompletionDate = parsedTasks[0].expectedCompletionDate;
      let complete = parsedTasks[0].complete;
      console.log(taskId, userId, task, expectedCompletionDate, complete);

      if (complete) {
        complete = false;
      } else {
        complete = true;
      }

      _nomadData.default.connectToData({
        putId: taskToEditId,
        dataSet: "tasks",
        fetchType: "PUT",
        dataBaseObject: {
          id: taskId,
          userId: userId,
          task: task,
          expectedCompletionDate: expectedCompletionDate,
          complete: complete
        }
      }).then(shit => {
        console.log(shit);
        $("#output").empty();

        _tasks.default.createTaskTables();
      });
    });
  },

  taskEditButton() {
    let number = event.currentTarget.id;
    let taskArray = number.split("_");
    let taskId = taskArray[1];
    let taskCellToEmpty = document.getElementById(`taskCell_${taskId}`);
    let taskLableToRemove = document.getElementById(`taskLabel_${taskId}`);
    let dueDateCellToEmpty = document.getElementById(`dueDateCell_${taskId}`);
    let dueDateToRemove = document.getElementById(`taskDueDate_${taskId}`);
    let taskEditCellToEmpty = document.getElementById(`taskEditCell_${taskId}`);
    let taskEditButtonToRemove = document.getElementById(`taskEditButton_${taskId}`);
    let taskToEditText = taskLableToRemove.innerText;
    console.log(taskToEditText);

    let taskToEditTitle = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "taskToEditTitle",
      attributes: {
        id: `taskToEditTitle_${taskId}`,
        value: `${taskToEditText}`
      }
    });

    let taskDueDateToEdit = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "taskDueDateToEdit",
      attributes: {
        id: `taskDueDateToEdit_${taskId}`,
        type: "date"
      }
    });

    let editedTaskSubmitButton = _domComponents.default.createDomElement({
      elementType: "button",
      cssClass: "editedTaskSubmitButton",
      content: "Submit",
      attributes: {
        id: `editedTaskSubmitButton_${number}`,
        type: "button"
      }
    });

    taskCellToEmpty.removeChild(taskLableToRemove);
    taskCellToEmpty.appendChild(taskToEditTitle);
    dueDateCellToEmpty.removeChild(dueDateToRemove);
    dueDateCellToEmpty.appendChild(taskDueDateToEdit);
    taskEditCellToEmpty.removeChild(taskEditButtonToRemove);
    taskEditCellToEmpty.appendChild(editedTaskSubmitButton);
    editedTaskSubmitButton.addEventListener("click", tasksEventListeners.saveTaskEdit);
  },

  saveTaskEdit() {
    let taskNumber = event.currentTarget.id;
    let taskArray = taskNumber.split("_");
    let taskId = taskArray[2];
    let taskEditInput = document.getElementById(`taskToEditTitle_${taskId}`).value;
    let taskEditDate = document.getElementById(`taskDueDateToEdit_${taskId}`).value;
    let dueDateArray = taskEditDate.split("-");
    let dueDate = `${dueDateArray[1]} ${dueDateArray[2]} ${dueDateArray[0]}`;

    _nomadData.default.connectToData({
      putId: taskId,
      dataSet: "tasks",
      fetchType: "PUT",
      dataBaseObject: {
        userId: Number(sessionStorage.getItem("userId")),
        task: taskEditInput,
        expectedCompletionDate: dueDate,
        complete: false
      }
    }).then(shit => {
      console.log(shit);
      $("#output").empty();

      _tasks.default.createTaskTables();
    });
  }

};
var _default = tasksEventListeners;
exports.default = _default;

},{"./domComponents":2,"./nomadData":13,"./tasks":14}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _tasksEventListeners = _interopRequireDefault(require("./tasksEventListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tasksPopup = {
  createNewTaskForm() {
    let tasksContainer = document.getElementById("tasksContainer");

    let taskPopupDiv = _domComponents.default.createDomElement({
      elementType: "div",
      cssClass: "taskPopupDiv",
      attributes: {
        id: "taskPopupDiv"
      }
    });

    let newTaskForm = _domComponents.default.createDomElement({
      elementType: "div",
      cssClass: "newTaskForm",
      attributes: {
        id: "newTaskForm"
      }
    });

    let newTaskFormTitle = _domComponents.default.createDomElement({
      elementType: "h2",
      cssClass: "newTaskFormTitle",
      content: "Create A New Task",
      attributes: {
        id: "newTaskFormTitle"
      }
    });

    let horizontalLine = _domComponents.default.createDomElement({
      elementType: "hr"
    });

    let taskTitleInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "taskTitleInput",
      attributes: {
        id: "taskTitleInput",
        placeholder: "Enter new task title",
        type: "text"
      }
    });

    let taskDateInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "taskDateInput",
      attributes: {
        id: "taskDateInput",
        type: "date"
      }
    });

    let submitNewTaskButton = _domComponents.default.createDomElement({
      elementType: "button",
      cssClass: "submitNewTaskButton",
      content: "Submit",
      attributes: {
        id: "submitNewTaskButton",
        type: "button"
      }
    });

    submitNewTaskButton.addEventListener("click", _tasksEventListeners.default.createNewTask);
    newTaskForm.appendChild(newTaskFormTitle);
    newTaskForm.appendChild(horizontalLine);
    newTaskForm.appendChild(taskTitleInput);
    newTaskForm.appendChild(taskDateInput);
    newTaskForm.appendChild(submitNewTaskButton);
    taskPopupDiv.appendChild(newTaskForm);
    tasksContainer.appendChild(taskPopupDiv);
  }

};
var _default = tasksPopup;
exports.default = _default;

},{"./domComponents":2,"./tasksEventListeners":15}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2Rhc2hib2FyZC5qcyIsIi4uL3NjcmlwdHMvZG9tQ29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZG9tUmVuZGVyZXIuanMiLCIuLi9zY3JpcHRzL2V2ZW50TGlzdGVuZXJzLmpzIiwiLi4vc2NyaXB0cy9ldmVudFBhZ2VMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy5qcyIsIi4uL3NjcmlwdHMvZnJpZW5kcy5qcyIsIi4uL3NjcmlwdHMvZnJpZW5kc0V2ZW50c0xpc3RlbmVyLmpzIiwiLi4vc2NyaXB0cy9tZXNzYWdlcy5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXNFdmVudExpc3RlbmVycy5qcyIsIi4uL3NjcmlwdHMvbmV3cy5qcyIsIi4uL3NjcmlwdHMvbmV3c0xpc3RlbmVyLmpzIiwiLi4vc2NyaXB0cy9ub21hZERhdGEuanMiLCIuLi9zY3JpcHRzL3Rhc2tzLmpzIiwiLi4vc2NyaXB0cy90YXNrc0V2ZW50TGlzdGVuZXJzLmpzIiwiLi4vc2NyaXB0cy90YXNrc1BvcHVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBQ0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxjQUFjLEdBQUU7QUFDZDtBQUNBLFFBQUksUUFBUSxHQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FBaEI7QUFxQ0UsSUFBQSxDQUFDLENBQUMsU0FBRCxDQUFELENBQWEsSUFBYixDQUFrQixRQUFsQjs7QUFDQSw0QkFBZSxxQkFBZjs7QUFDQSxJQUFBLENBQUMsQ0FBQyxRQUFELENBQUQsQ0FBWSxLQUFaLENBQWtCLHdCQUFlLFNBQWpDLEVBekNZLENBMENaOztBQUNBLElBQUEsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUIsS0FBckIsQ0FBMkIsd0JBQWUsZ0JBQTFDO0FBQ0EsSUFBQSxDQUFDLENBQUMs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QUFHO0FBQ1QsUUFBQSxFQUFFLEVBQUcscUJBREk7QUFFVCxRQUFBLElBQUksRUFBRztBQUZFO0FBSnlDLEtBQWhDLENBQTFCOztBQVVBLElBQUEsbUJBQW1CLENBQUMsZ0JBQXBCLENBQXFDLE9BQXJDLEVBQThDLDZCQUFvQixhQUFsRTtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsZ0JBQXhCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixjQUF4QjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsY0FBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLGFBQXhCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixtQkFBeEI7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLFdBQXpCO0FBQ0EsSUFBQSxjQUFjLENBQUMsV0FBZixDQUEyQixZQUEzQjtBQUNIOztBQXRFYyxDQUFuQjtlQXlFZSxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCJcclxuY29uc3QgZGFzaGJvYXJkID0ge1xyXG4gIGJ1aWxkTG9naW5Gb3JtKCl7XHJcbiAgICAvL3VzaW5nIHN0cmluZyBpbnRlcnBvbGF0aW9uIHRvIGNyZWF0ZSB0aGUgZm9ybVxyXG4gICAgbGV0IGZvcm1IVE1MID0gYFxyXG4gICAgPGgxIGNsYXNzID0gXCJ0LWJvcmRlclwiPk5vbWFkczwvaDE+XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzID0gXCJmb3JtXCI+XHJcbiAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgY2xhc3MgPSByZWdpc3RlckZvcm0+XHJcbiAgICAgICAgICA8aW5wdXQgaWQgPSBcInJlZ1VzZXJOYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlciA9IFwiVXNlcm5hbWVcIiByZXF1aXJlZD5cclxuICAgICAgICAgIDxpbnB1dCBpZCA9IFwicmVnRW1haWxcIiB0eXBlPVwiZW1haWxcIiBwbGFjZWhvbGRlciA9IFwiRW1haWxcIiByZXF1aXJlZD5cclxuICAgICAgICAgIDxpbnB1dCBpZCA9IFwicmVnUGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlciA9IFwiUGFzc3dvcmRcIiByZXF1aXJlZD5cclxuICAgICAgICAgIDxpbnB1dCBpZCA9IFwicmVnQ29uZmlybVBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXIgPSBcIkNvbmZpcm0gUGFzc3dvcmRcIiByZXF1aXJlZD5cclxuICAgICAgICAgIDxidXR0b24gaWQgPSBcInJlZ2lzdGVyQnV0dG9uXCI+Q3JlYXRlIEFjY291bnQ8L2J1dHRvbj5cclxuICAgICAgICAgIDxwIGNsYXNzID0gXCJtZXNzYWdlXCI+QWxyZWFkeSBhIFJlZ2lzdGVyZWQgTWVtYmVyPyA8YSBocmVmID0gXCIjXCI+TG9nSW48L2E+PC9wPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8Zm9ybSBjbGFzcyA9IFwibG9naW4tZm9ybVwiPlxyXG4gICAgICAgICAgPGlucHV0IGlkID0gXCJ1c2VyTmFtZVZhbFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXIgPSBcIlVzZXJuYW1lXCI+XHJcbiAgICAgICAgICA8aW5wdXQgaWQgPSBcInBhc3N3b3JkVmFsXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXIgPSBcIlBhc3N3b3JkXCI+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGUgPSBcImJ1dHRvblwiIGlkID0gXCJsb2dJblwiPkxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGlkID0gXCJtb2RhbEJ1dHRvblwiPkFib3V0PC9idXR0b24+XHJcbiAgICAgICAgICA8cCBjbGFzcyA9IFwibWVzc2FnZVwiPkRvbid0IGhhdmUgYW4gYWNjb3VudD8gPGEgaHJlZiA9IFwiI1wiPlJlZ2lzdGVyPC9hPjwvcD5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24gaWQ9XCJub21hZE1vZGFsXCIgY2xhc3M9XCJtb2RhbFwiPlxyXG4gICAgICA8IS0tIE1vZGFsIGNvbnRlbnQgLS0+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNsb3NlXCI+JnRpbWVzOzwvc3Bhbj5cclxuICAgICAgICAgICAgPGgyPkFib3V0IE5vbWFkczwvaDI+XHJcbiAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgPGgzPlRoZSBkZXZlbG9wZXJzIGJlaGluZCBOb21hZHM8L2gzPlxyXG4gICAgICAgICAgICA8aW1nIGlkID0gXCJjcmVhdG9yc0ltYWdlXCIgc3JjID0gXCJpbWFnZXMvbm9tYWRDcmVhdG9ycy5qcGdcIiBhbHQgPSBcImFwcGxpY2F0aW9uIGNyZWF0b3JzXCI+XHJcbiAgICAgICAgICAgIDxwPk5vbWFkcyBpcyBhIGZyb250LWVuZCBzb2NpYWwgbWVkaWEgYXBwIHdpdGggYSB0aGVtZSBjZW50ZXJlZCBhcm91bmQgdmFuIGxpZmUgdHJhdmVsZXJzLiBVc2VycyBjYW4gcGVydXNlIGFydGljbGVzLCBjaGVjayBvdXQgdXBjb21pbmcgZXZlbnRzLCBvcmdhbml6ZSB0aGVpciB0YXNrcywgbWVzc2FnZSBvdGhlciB1c2VycyBhbmQgYWRkIGZyaWVuZHMuIE91ciBncm91cCBidWlsdCB0aGlzIGFwcCBhcyBwYXJ0IG9mIGEgcHJhY3RpY2Ugc3ByaW50IGF0IE5hc2h2aWxsZSBTb2Z0d2FyZSBTY2hvb2wuPC9wPlxyXG4gICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgPGgzPkNyZWF0ZWQgQnk6IEpvcmRhbiBSb3NhcywgSnVzdGluIFdoZWVsZXIsIENvbGUgQnJ5YW50LCBKb3NlcGggQmF1Z2ggYW5kIFJ1c3NlbGwgUmVpdGVyPC9oMz5cclxuICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgYFxyXG4gICAgICAkKFwiI291dHB1dFwiKS5odG1sKGZvcm1IVE1MKVxyXG4gICAgICBldmVudExpc3RlbmVycy5tb2RhbERpc3BsYXlBbmltYXRpb24oKVxyXG4gICAgICAkKFwiI2xvZ0luXCIpLmNsaWNrKGV2ZW50TGlzdGVuZXJzLnVzZXJMb2dpbilcclxuICAgICAgLy8gJChcIiNsb2dJblwiKS5jbGljayhldmVudExpc3RlbmVycy50YXNrc05hdkxpbmspXHJcbiAgICAgICQoXCIjcmVnaXN0ZXJCdXR0b25cIikuY2xpY2soZXZlbnRMaXN0ZW5lcnMudXNlclJlZ2lzdHJhdGlvbilcclxuICAgICAgJChcIiNyZWdpc3RlckJ1dHRvblwiKS5jbGljayh0aGlzLmJ1aWxkTG9naW5Gb3JtKVxyXG4gICAgICAvLyAkKFwiI3JlZ2lzdGVyQnV0dG9uXCIpLmNsaWNrKGV2ZW50TGlzdGVuZXJzLnVzZXJMb2dpbilcclxuXHJcbiAgICB9LFxyXG4gIGNyZWF0ZU5hdkJhcigpe1xyXG4gICAgbGV0IG5hdkhUTUwgPSBgXHJcbiAgICAgIDxuYXY+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgPGxpIGlkID0gXCJuZXdzTGlua1wiPjxhIGNsYXNzID0gXCJhY3RpdmVcIiBocmVmID0gXCIjXCI+QXJ0aWNsZXM8L2E+PC9saT5cclxuICAgICAgICAgIDxsaSBpZCA9IFwiZXZlbnRMaW5rXCI+PGEgaHJlZiA9IFwiI1wiPkV2ZW50czwvYT48L2xpPlxyXG4gICAgICAgICAgPGxpIGlkID0gXCJ0YXNrc0xpbmtcIj48YSBocmVmID0gXCIjXCI+VGFza3M8L2E+PC9saT5cclxuICAgICAgICAgIDxsaSBpZCA9IFwiZnJpZW5kc0xpbmtcIj48YSBocmVmID0gXCIjXCI+RnJpZW5kczwvYT48L2xpPlxyXG4gICAgICAgICAgPGxpIGlkID0gXCJtZXNzYWdlc0xpbmtcIj48YSBocmVmID0gXCIjXCI+TWVzc2FnZXM8L2E+PC9saT5cclxuICAgICAgICAgIDxsaSBjbGFzcyA9IFwic2lnbk91dFwiIGlkID0gXCJsb2dvXCIgPjxhIGhyZWY9XCIjXCI+U2lnbiBPdXQ8L2E+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L25hdj5cclxuICAgIGBcclxuICAgIGxldCBuYXZCYXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tbmF2XCIpXHJcbiAgICBuYXZCYXJDb250YWluZXIuaW5uZXJIVE1MID0gbmF2SFRNTFxyXG5cclxuICAgIC8qTmF2aWdhdGlvbiBsaW5rIGV2ZW50IGxpc3RlbmVycyovXHJcbiAgICAkKFwiI21lc3NhZ2VzTGlua1wiKS5jbGljayhldmVudExpc3RlbmVycy5tZXNzYWdlc05hdkxpbmspXHJcbiAgICAkKFwiI2V2ZW50TGlua1wiKS5jbGljayhldmVudExpc3RlbmVycy5ldmVudHNOYXZMaW5rKVxyXG4gICAgJChcIiNmcmllbmRzTGlua1wiKS5jbGljayhldmVudExpc3RlbmVycy5mcmllbmRzTmF2TGluaylcclxuICAgICQoXCIjdGFza3NMaW5rXCIpLmNsaWNrKGV2ZW50TGlzdGVuZXJzLnRhc2tzTmF2TGluaylcclxuICAgICQoXCIjbmV3c0xpbmtcIikuY2xpY2soZXZlbnRMaXN0ZW5lcnMubmV3c05hdkxpbmspXHJcblxyXG4gICAgLyphZnRlciBzaWdub3V0IGlzIGNsaWNrZWQgc2Vzc2lvbiBzdG9yYWdlIGlzIGNsZWFyZWQgYW5kIHRoZSBsb2dJbi9yZWdpc3RlciBmb3JtIGlzIHByZXNlbnRlZCBmcm9tIGhlcmVcclxuICAgIGFub3RoZXIgdXNlciBjYW4gbG9nIGluIGFuZCBzZXNzaW9uIHN0b3JhZ2Ugd2lsbCBraWNrIG9mZiBmb3IgdGhlIG5ldyBsb2dnZWQgaW4gdXNlciovXHJcbiAgICAkKFwiLnNpZ25PdXRcIikuY2xpY2soZXZlbnRMaXN0ZW5lcnMubm9tYWROYXZMaW5rKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZCIsImNvbnN0IGRvbUNvbXBvbmVudHMgPSB7XHJcbiAgY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlLCBjb250ZW50ID0gbnVsbCwgY3NzQ2xhc3MsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcclxuICAgIGlmIChjc3NDbGFzcykge1xyXG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50cyIsImltcG9ydCBkYXNoQm9hcmQgZnJvbSBcIi4vZGFzaGJvYXJkXCJcclxuLy8gaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50c1wiO1xyXG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnNcIjtcclxuXHJcbi8vQlVJTERTIE5BSUdBVElPTkJBUi8vXHJcbi8vIGRvbUNvbXBvbmVudHMuY3JlYXRlTmF2QmFyKClcclxuZGFzaEJvYXJkLmJ1aWxkTG9naW5Gb3JtKClcclxuJChcIm1vZGFsQnV0dG9uXCIpLmNsaWNrKGV2ZW50TGlzdGVuZXJzLm1vZGFsRGlzcGxheUFuaW1hdGlvbilcclxuXHJcbi8vTkVXUyBTRUNUSU9OXHJcbi8vIG5ld3Muc2F2ZSgpO1xyXG4vLyBuZXdzLmFsbFNhdmVkKCk7XHJcbi8vIG5ld3MuZ2V0TmV3cygpO1xyXG5cclxuLy8gbmV3cy5uZXdzRWxlbWVudENyZWF0b3IoKTtcclxuLy8gbmV3cy5uZXdzRWxlbWVudENyZWF0b3IoKTtcclxuXHJcbiIsImltcG9ydCBkYXNoYm9hcmQgZnJvbSBcIi4vZGFzaGJvYXJkXCJcclxuaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50c1wiO1xyXG5pbXBvcnQgbm9tYWREYXRhIGZyb20gXCIuL25vbWFkRGF0YVwiO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL2V2ZW50c1wiO1xyXG5pbXBvcnQgbWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuaW1wb3J0IGZyaWVuZHMgZnJvbSBcIi4vZnJpZW5kc1wiO1xyXG5pbXBvcnQgbmV3cyBmcm9tIFwiLi9uZXdzXCI7XHJcbmltcG9ydCB0YXNrcyBmcm9tIFwiLi90YXNrc1wiO1xyXG5cclxuY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB7XHJcbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgTE9HSU4gRk9STTogdXNlciBlbnRlcnMgVXNlcm5hbWUgYW5kIFBhc3N3b3JkLiB3aGVuIFVzZXIgY2xpY2tzIGxvZ2luLCB0aGUgaW5wdXQgZmllbGQgYW5kIE5PTUFEUyBoZWFkZXIgZGlzYXBwZWFyXHJcbiAgICBhbmQgdGhlIHVzZXIgd2lsbCBiZSBkaXNwbGF5ZWQgdGhlIFwiRGFzaGJvYXJkXCIgYW5kIHRoZSBuYXZpZ2F0aW9uIGJhci4gVXBvbiBsb2dpbiwgc2Vzc2lvblN0b3JhZ2UgaXMgc3RhcnRlZC4gSW4gdGhlIENvbnNvbGVcclxuICAgIHlvdSB3aWxsIGJlIGFibGUgdG8gc2VlIFdobyBpcyBsb2dnZWQgaW4gYW5kIHdoYXQgdGhlaXIgdXNlcklkIGlzLiBpZS4gMSwyLDMsNCBldGMuXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICB1c2VyTG9naW4oKXtcclxuICAgICAgICBsZXQgbG9nSW5WYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJOYW1lVmFsXCIpLnZhbHVlXHJcbiAgICAgICAgbGV0IHBhc3N3b3JkVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFZhbFwiKS52YWx1ZVxyXG4gICAgICAgIC8vZ2V0IHRvIGNvbXBhcmVcclxuICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcblxyXG4gICAgICAgIFwiZGF0YVNldFwiIDogXCJ1c2Vyc1wiLFxyXG4gICAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICAgIFwiZW1iZWRJdGVtXCIgOiBcIj9fZW1iZWQ9dXNlcnNcIlxyXG5cclxuICAgIH0pLnRoZW4ocGFyc2VkVXNlcnMgPT4ge1xyXG5cclxuICAgICAgICBwYXJzZWRVc2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgIC8qSWYgbG9naW4gY3JlZGVudGlhbHMgbWF0Y2ggdGhvc2UgaW4gZGF0YWJhc2UuanNvbi4gV2Ugd2FudCB0aGUgdXNlciB0byBiZSBkaXNwbGF5ZWQgdGhlaXIgXCJkYXNoYm9hZFwiXHJcbiAgICAgICAgICAgICAgYW5kIG5hdmlnYXRpb24gYmFyLiBTbyB3ZSBuZWVkIHRvIHNldCBkaXNwbGF5IHRvIG5vbmUgYW5kIGludm9rZSB0aGUgZnVuY3Rpb24gLSBjcmVhdGVOYXZCYXIoKSovXHJcbiAgICAgICAgICAgIGlmKGxvZ0luVmFsID09PSB1c2VyLnVzZXJOYW1lICYmIHBhc3N3b3JkVmFsID09PSB1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9oaWRlcyBOT01BRCBoZWFkaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50LWJvcmRlclwiKS5oaWRlKClcclxuICAgICAgICAgICAgICAgICAgICAvL2hpZGVzIHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5mb3JtXCIpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGlzcGxheXMgbmF2aWdhdGluIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZC5jcmVhdGVOYXZCYXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2Vzc2lvbiBzdG9yYWdlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgdXNlci5pZClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgdmVyaWZ5aW5nIHRoYXQgY3JlZGVudGlhbHMgbWF0Y2ggYW5kIHVzZXIgaXMgbG9nZ2VkIGluXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dnZWQgaW4gYXNcIiArIFwiIFwiICsgdXNlci51c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgdXNlciBJRCBpczogXCIgKyB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJzTmFtZSA9IFwiIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFTZXRcIiA6IFwidXNlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZXRjaFR5cGVcIiA6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YUJhc2VPYmplY3RcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW1iZWRJdGVtXCIgOiBcIj9fZW1iZWQ9dXNlcnNcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4odXNlcnMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIuaWQgPT09IE51bWJlcih1c2VySWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcnNOYW1lID0gdXNlci51c2VyTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tDb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIjdGFza3NDb250YWluZXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdlbGNvbWVNZXNzYWdlID0gKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJoMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogYHdlbGNvbWUgJHt1c2Vyc05hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBcIndlbGNvbWUtdXNlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q29udGFpbmVyLmluc2VydEJlZm9yZSh3ZWxjb21lTWVzc2FnZSwgdGFza0NvbnRhaW5lcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0YXNrcy5jcmVhdGVUYXNrVGFibGVzKClcclxuXHJcbiAgICAgICAgICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhU2V0XCIgOiBcInVzZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZXRjaFR5cGVcIiA6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPXVzZXJzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbih1c2VycyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIuaWQgPT09IE51bWJlcih1c2VySWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiaDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBgd2VsY29tZSAke3VzZXIudXNlck5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzczogXCJ3ZWxjb21lLXVzZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBSRUdJU1RSQVRJT04gRk9STTogV2hlbiByZWdpc3RlcmluZyBmb3IgYW4gYWNjb3VudCB0aGUgdXNlciB3aWxsIGVudGVyIGRlc2lyZWQgdXNlcm5hbWUsIGVtYWlsLCBhbmQgcGFzc3dvcmRcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuICAgIHVzZXJSZWdpc3RyYXRpb24oKXtcclxuICAgICAgICBsZXQgcmVnVXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ1VzZXJOYW1lXCIpLnZhbHVlXHJcbiAgICAgICAgbGV0IHJlZ0VtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdFbWFpbFwiKS52YWx1ZVxyXG4gICAgICAgIGxldCByZWdQYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnUGFzc3dvcmRcIikudmFsdWVcclxuICAgICAgICAvLyBsZXQgcmVnQ29uZmlybVBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdVc2VyTmFtZVwiKS52YWx1ZVxyXG5cclxuICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcblxyXG4gICAgICAgICAgICAgICAgXCJkYXRhU2V0XCIgOiBcInVzZXJzXCIsXHJcbiAgICAgICAgICAgICAgICBcImZldGNoVHlwZVwiIDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiByZWdVc2VyTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCI6IHJlZ0VtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicGFzc3dvcmRcIjogcmVnUGFzc3dvcmRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICAgICAgICAgICAgXCJkYXRhU2V0XCIgOiBcInVzZXJzXCIsXHJcbiAgICAgICAgICAgICAgICBcImZldGNoVHlwZVwiIDogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIFwiZW1iZWRJdGVtXCIgOiBgP3VzZXJOYW1lPSR7cmVnVXNlck5hbWV9YFxyXG4gICAgICAgICAgICB9KS50aGVuKHVzZXIgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyKVxyXG4gICAgICAgICAgICAgICAgdXNlci5mb3JFYWNoKCB4ID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgeC5pZClcclxuXHJcbiAgICAgICAgICAgICAgICAvL2hpZGVzIE5PTUFEIGhlYWRpbmdcclxuICAgICAgICAgICAgICAgICQoXCIudC1ib3JkZXJcIikuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAvL2hpZGVzIHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAkKFwiLmZvcm1cIikuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYXlzIG5hdmlnYXRpbiBiYXJcclxuICAgICAgICAgICAgICAgIGRhc2hib2FyZC5jcmVhdGVOYXZCYXIoKVxyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgdmVyaWZ5aW5nIHRoYXQgY3JlZGVudGlhbHMgbWF0Y2ggYW5kIHVzZXIgaXMgbG9nZ2VkIGluXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2dlZCBpbiBhc1wiICsgXCIgXCIgKyB4LnVzZXJOYW1lKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHVzZXIgSUQgaXM6IFwiICsgdXNlcklkKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgfSxcclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBNT0RBTDogdXNlciB3aWxsIGNsaWNrIHRoZSBOT01BRCBNSVNTSU9OIGJ1dHRvbiBhbmQgYSBtb2RhbCB3aWxsIHBvcCB1cCBkZXNjcmliaW5nIHdoYXQgdGhlIGFwcGxpY2F0aW9uIGlzIGFib3V0XHJcbiAgICBhbmQgd2hvIGl0IGlzIHRhaWxvcmVkIHRvd2FyZHNcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuICAgIG1vZGFsRGlzcGxheUFuaW1hdGlvbigpe1xyXG4gICAgICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9tYWRNb2RhbFwiKTtcclxuXHJcbiAgICAgICAgLy8gdGFyZ2V0IG1vZGFsIHRvIG9wZW4gaXRcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbEJ1dHRvblwiKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSA8c3Bhbj4gZWxlbWVudCB0aGF0IGNsb3NlcyB0aGUgbW9kYWxcclxuICAgICAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZVwiKVswXTtcclxuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCBvcGVuIHRoZSBtb2RhbFxyXG4gICAgICAgIGJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXHJcbiAgICAgICAgc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcclxuICAgICAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiLm1lc3NhZ2UgYVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCJmb3JtXCIpLmFuaW1hdGUoe2hlaWdodDogXCJ0b2dnbGVcIiwgb3BhY2l0eTogXCJ0b2dnbGVcIn0sIFwic2xvd1wiKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIE5BVkJBUiBMSSBFTElTVEVORVJTOiBXaGVuIHVzZXIgY2xpY2tzIGFuIGl0ZW0gaW4gdGhlIE5BVkJBUiB0aGUgY29udGVudCBhc3NvY2lhdGVkIHdpdGggdGhhdCB0YWIgd2lsbCBwb3B1bGF0ZSB0aGUgRE9NXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICBtZXNzYWdlc05hdkxpbmsoKXtcclxuICAgICAgICBtZXNzYWdlcy5jcmVhdGVNZXNzYWdlQm9hcmQoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwid29ya2luZ1wiKVxyXG4gICAgICAgIGZyaWVuZHMuYnVpbGRGcmllbmRTZWFyY2hCYXIoKVxyXG5cclxuICAgIH0sXHJcbiAgICBldmVudHNOYXZMaW5rKCl7XHJcbiAgICAgICAgICAgIGV2ZW50cy5zaG93RXZlbnRGb3JtKClcclxuICAgICAgICAgICAgZXZlbnRzLmFwcGVuZFVzZXJBbmRGcmllbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgLy9hcHBlbmRVc2VyRXZlbnRcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJldmVudHMgY2xpY2tlZFwiKVxyXG4gICAgfSxcclxuICAgIGZyaWVuZHNOYXZMaW5rKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmcmllbmRzIG5hdiBsaW5rIGNsaWNrZWRcIilcclxuICAgICAgICBmcmllbmRzLmRlZmluZUN1cnJlbnRVc2Vyc0ZyaWVuZHMoKTtcclxuICAgICAgICBmcmllbmRzLmluaXRpYWxpemVQb3RlbnRpYWxGcmllbmRzKCk7XHJcblxyXG4gICAgfSxcclxuICAgIG5ld3NOYXZMaW5rKCl7XHJcbiAgICAgICAgLy9ORVdTIFNFQ1RJT05cclxuICAgICAgICBcclxuICAgICAgICBuZXdzLmdldEFQSU5ld3MoKTtcclxuICAgICAgICAvLyBuZXdzLnNhdmVkTmV3c0VsZW1lbnRzQ3JlYXRvcigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3cyBsaW5rIGNsaWNrZWRcIilcclxuICAgIH0sXHJcbiAgICB0YXNrc05hdkxpbmsoKXtcclxuICAgICAgICB0YXNrcy5jcmVhdGVUYXNrVGFibGVzKClcclxuICAgICAgICBmcmllbmRzLmJ1aWxkRnJpZW5kU2VhcmNoQmFyKClcclxuICAgIH0sXHJcbiAgICBub21hZE5hdkxpbmsoKXtcclxuICAgICAgICBkYXNoYm9hcmQuYnVpbGRMb2dpbkZvcm0oKVxyXG4gICAgICAgICQoXCJuYXZcIikuaGlkZSgpXHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2lnbmVkIG91dFwiKVxyXG4gICAgfSxcclxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIEVORCBPRiBOQVZJR0FUSU9OIEVWRU5UTElTVEVORVJTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuICAgIGZyaWVuZHNEZWxldGVGcmllbmQgKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRMaXN0ZW5lcnM7XHJcbiIsImltcG9ydCBub21hZERhdGEgZnJvbSBcIi4vbm9tYWREYXRhXCI7XHJcbmltcG9ydCBldmVudHMgZnJvbSBcIi4vZXZlbnRzXCI7XHJcbi8vIGltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IGV2ZW50UGFnZUxpc3RlbmVycyA9IHtcclxuICAgIGhhbmRsZVNob3dCdXR0b24oKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudHNDb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3Qgc2hvd0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hvd0Zvcm1cIik7XHJcbiAgICAgICAgZXZlbnRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKHNob3dCdXR0b24pO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50Rm9ybSA9IGV2ZW50cy5jcmVhdGVFdmVudElucHV0KCk7XHJcbiAgICAgICAgZXZlbnRzQ29udGFpbmVyLmluc2VydEJlZm9yZShldmVudEZvcm0sIGV2ZW50c0NvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVTYXZlQnV0dG9uKCkge1xyXG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dHRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnROYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGRhdGVJbnB1dHRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnREYXRlXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHRpbWVJbnB1dHRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRUaW1lXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSW5wdXR0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50TG9jYXRpb25cIikudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChuYW1lSW5wdXR0ZWQgPT09IFwiXCIgfHwgZGF0ZUlucHV0dGVkID09PSBcIlwiIHx8IHRpbWVJbnB1dHRlZCA9PT0gXCJcIiB8fCBsb2NhdGlvbklucHV0dGVkID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGlucHV0IGluZm9ybWF0aW9uIGluIGFsbCBmaWVsZHNcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2V0OiBcImV2ZW50c1wiLFxyXG4gICAgICAgICAgICAgICAgZmV0Y2hUeXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSksXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBuYW1lSW5wdXR0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRlOiBkYXRlSW5wdXR0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUaW1lOiB0aW1lSW5wdXR0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRMb2NhdGlvbjogbG9jYXRpb25JbnB1dHRlZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzLmFwcGVuZFVzZXJBbmRGcmllbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVIaWRlQnV0dG9uKCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRzQ29udGFpbmVyXCIpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV2ZW50SW5wdXRcIik7XHJcbiAgICAgICAgZXZlbnRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKGZvcm1Db250YWluZXIpO1xyXG4gICAgICAgIGV2ZW50cy5hZGRTaG93QnV0dG9uKCk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRGVsZXRlQnV0dG9uKCkge1xyXG4gICAgICAgIGNvbnN0IGlkVG9EZWxldGUgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcclxuICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgICAgICAgIGRlbGV0ZUlkOiBpZFRvRGVsZXRlLFxyXG4gICAgICAgICAgICBkYXRhU2V0OiBcImV2ZW50c1wiLFxyXG4gICAgICAgICAgICBmZXRjaFR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiB7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oICgpID0+IHtcclxuICAgICAgICAgICAgZXZlbnRzLmFwcGVuZFVzZXJBbmRGcmllbmRFdmVudHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVFZGl0QnV0dG9uKCkge1xyXG4gICAgICAgIGNvbnN0IGlkVG9FZGl0ID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICAgICAgICBkYXRhU2V0OiBcImV2ZW50c1wiLFxyXG4gICAgICAgICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogTnVtYmVyKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbWJlZEl0ZW06IGAvJHtpZFRvRWRpdH1gXHJcbi8vIEFib3ZlIGlzIGEgYml0IG9mIGEgaGFja3kgc29sdXRpb24gaW4gb3JkZXIgdG8gZ2V0IGEgc3BlY2lmaWMgZXZlbnQuIE1heWJlIG5lZWQgdG8gYWRkIHNwZWNpZmljIGdldCBmdW5jdGlvbiB0byBub21hZERhdGFcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHBhcnNlZFJlc3BvbnNlID0+IHtcclxuICAgICAgICBldmVudHMuY3JlYXRlRXZlbnRFZGl0SW5wdXQoaWRUb0VkaXQsIHBhcnNlZFJlc3BvbnNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVVcGRhdGVCdXR0b24oKSB7XHJcbiAgICAgICAgY29uc3QgZWRpdGVkSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcclxuXHJcbiAgICAgICAgY29uc3QgZWRpdGVkTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0TmFtZS0tJHtlZGl0ZWRJZH1gKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBlZGl0ZWREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXREYXRlLS0ke2VkaXRlZElkfWApLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGVkaXRlZFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFRpbWUtLSR7ZWRpdGVkSWR9YCkudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZWRpdGVkTG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdExvY2F0aW9uLS0ke2VkaXRlZElkfWApLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoZWRpdGVkTmFtZSA9PT0gXCJcIiB8fCBlZGl0ZWREYXRlID09PSBcIlwiIHx8IGVkaXRlZFRpbWUgPT09IFwiXCIgfHwgZWRpdGVkTG9jYXRpb24gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZG8gbm90IGxlYXZlIGVkaXQgZmllbGRzIGJsYW5rXCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICAgICAgICAgICAgcHV0SWQ6IGVkaXRlZElkLFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldDogXCJldmVudHNcIixcclxuICAgICAgICAgICAgICAgIGZldGNoVHlwZTogXCJQVVRcIixcclxuICAgICAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGVkaXRlZElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogTnVtYmVyKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogZWRpdGVkTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBldmVudERhdGU6IGVkaXRlZERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUaW1lOiBlZGl0ZWRUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TG9jYXRpb246IGVkaXRlZExvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudHMuYXBwZW5kVXNlckFuZEZyaWVuZEV2ZW50cygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudFBhZ2VMaXN0ZW5lcnM7IiwiLy8gQXV0aG9yOiBDb2xlIEJyeWFudCAvIFB1cnBvc2U6XHJcblxyXG5pbXBvcnQgbm9tYWREYXRhIGZyb20gXCIuL25vbWFkRGF0YVwiO1xyXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCI7XHJcbmltcG9ydCBldmVudFBhZ2VMaXN0ZW5lcnMgZnJvbSBcIi4vZXZlbnRQYWdlTGlzdGVuZXJzXCI7XHJcblxyXG5cclxuLy9jcmVhdGVFdmVudElucHV0IGFuZCBjcmVhdGVFdmVudEl0ZW0gd2lsbCBiZSBhZGRlZCB0byB0aGlzIG9iamVjdC4gc28gZG9tYnVpbGRlci5cclxuY29uc3QgZXZlbnRzID0ge1xyXG4gIHNob3dFdmVudEZvcm0gKCkge1xyXG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdXRwdXRcIik7XHJcbiAgICB3aGlsZSAob3V0cHV0LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgb3V0cHV0LnJlbW92ZUNoaWxkKG91dHB1dC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGV2ZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpO1xyXG4gICAgZXZlbnRzQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZXZlbnRzQ29udGFpbmVyXCIpO1xyXG4gICAgb3V0cHV0LmFwcGVuZENoaWxkKGV2ZW50c0NvbnRhaW5lcik7XHJcbiAgICBjb25zdCBldmVudHNGb3JtID0gdGhpcy5jcmVhdGVFdmVudElucHV0KCk7XHJcbiAgICBldmVudHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZXZlbnRzRm9ybSlcclxuICAgIGNvbnN0IGV2ZW50TG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XHJcbiAgICBldmVudExvZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImV2ZW50TG9nXCIpO1xyXG4gICAgZXZlbnRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGV2ZW50TG9nKTtcclxuICB9LFxyXG4gIGFkZFNob3dCdXR0b24oKSB7XHJcbiAgICBjb25zdCBldmVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50c0NvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHNob3dCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImJ1dHRvblwiLCBjb250ZW50OiBcIkNyZWF0ZSBhIE5ldyBFdmVudFwiLCBhdHRyaWJ1dGVzOiB7dHlwZTogXCJidXR0b25cIiwgaWQ6IFwic2hvd0Zvcm1cIn19KTtcclxuICAgIHNob3dCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50UGFnZUxpc3RlbmVycy5oYW5kbGVTaG93QnV0dG9uKTtcclxuICAgIGV2ZW50c0NvbnRhaW5lci5pbnNlcnRCZWZvcmUoc2hvd0J1dHRvbiwgZXZlbnRzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG4gIH0sXHJcbiAgYXBwZW5kVXNlckFuZEZyaWVuZEV2ZW50cygpIHtcclxuICAgIGNvbnN0IGV2ZW50TG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudExvZ1wiKTtcclxuICAgIGNvbnN0IGV2ZW50SG9sZGVyID0gW107XHJcbiAgICBjb25zdCB1c2VySG9sZGVyID0gW051bWJlcihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpKV07XHJcbiAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgIGRhdGFTZXQ6IFwiZnJpZW5kc1wiLFxyXG4gICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXHJcbiAgICAgIGRhdGFCYXNlT2JqZWN0OiBcIlwiLFxyXG4gICAgICBlbWJlZEl0ZW06IFwiP19lbWJlZD1ldmVudHNcIlxyXG4gICAgfSlcclxuICAgIC50aGVuKHBhcnNlZFJlc3BvbnNlID0+IHtcclxuICAgICAgcGFyc2VkUmVzcG9uc2UuZm9yRWFjaChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgaWYocmVzcG9uc2UudXNlcklkID09PSBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSkpIHtcclxuICAgICAgICAgIHVzZXJIb2xkZXIucHVzaChyZXNwb25zZS5vdGhlckZyaWVuZElkKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9KVxyXG4gICAgICB1c2VySG9sZGVyLmZvckVhY2godXNlcklkID0+IHtcclxuICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgICAgICBkYXRhU2V0OiBcImV2ZW50c1wiLFxyXG4gICAgICAgICAgZmV0Y2hUeXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgZGF0YUJhc2VPYmplY3Q6IFwiXCIsXHJcbiAgICAgICAgICBlbWJlZEl0ZW06IGA/X3VzZXJJZD0ke3VzZXJJZH1gXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICBwYXJzZWRSZXNwb25zZS5mb3JFYWNoKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnVzZXJJZCA9PT0gdXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgZXZlbnRIb2xkZXIucHVzaChyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IHNvcnRlZEV2ZW50cyA9IGV2ZW50SG9sZGVyLnNvcnQoIChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShhLmV2ZW50RGF0ZSkgLSBuZXcgRGF0ZShiLmV2ZW50RGF0ZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGRvY3VGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgc29ydGVkRXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB3aGlsZSAoZXZlbnRMb2cuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgIGV2ZW50TG9nLnJlbW92ZUNoaWxkKGV2ZW50TG9nLmZpcnN0Q2hpbGQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50SXRlbSA9IHRoaXMuY3JlYXRlRXZlbnRJdGVtKGV2ZW50KTtcclxuICAgICAgICAgICAgZG9jdUZyYWcuYXBwZW5kQ2hpbGQoZXZlbnRJdGVtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXZlbnRMb2cuYXBwZW5kQ2hpbGQoZG9jdUZyYWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlRXZlbnRJbnB1dCgpIHtcclxuICAgIGNvbnN0IGV2ZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRzQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIGNvbnN0IGV2ZW50Rm9ybSA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiZm9ybVwiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwiZXZlbnRJbnB1dFwifX0pO1xyXG4gICAgZXZlbnRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGV2ZW50Rm9ybSlcclxuICAgIGNvbnN0IGZvcm1IZWFkZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImgyXCIsIGNvbnRlbnQ6IFwiQWRkIGEgTmV3IEV2ZW50OlwifSk7XHJcbiAgICBldmVudEZvcm0uYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcik7XHJcblxyXG4gICAgY29uc3QgbmFtZUZpZWxkc2V0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJmaWVsZHNldFwifSk7XHJcbiAgICBjb25zdCBuYW1lTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImxhYmVsXCIsIGNvbnRlbnQ6IFwiRXZlbnQgTmFtZTpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudE5hbWVcIn19KTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaW5wdXRcIiwgYXR0cmlidXRlczoge3R5cGU6IFwidGV4dFwiLCBuYW1lOiBcImV2ZW50TmFtZVwiLCBpZDogXCJldmVudE5hbWVcIn19KTtcclxuICAgIG5hbWVGaWVsZHNldC5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xyXG4gICAgbmFtZUZpZWxkc2V0LmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XHJcblxyXG4gICAgY29uc3QgZGF0ZUZpZWxkc2V0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJmaWVsZHNldFwifSk7XHJcbiAgICBjb25zdCBkYXRlTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImxhYmVsXCIsIGNvbnRlbnQ6IFwiRXZlbnQgRGF0ZTpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudERhdGVcIn19KTtcclxuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaW5wdXRcIiwgYXR0cmlidXRlczoge3R5cGU6IFwiZGF0ZVwiLCBuYW1lOiBcImV2ZW50RGF0ZVwiLCBpZDogXCJldmVudERhdGVcIn19KTtcclxuICAgIGRhdGVGaWVsZHNldC5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xyXG4gICAgZGF0ZUZpZWxkc2V0LmFwcGVuZENoaWxkKGRhdGVJbnB1dCk7XHJcblxyXG4gICAgY29uc3QgdGltZUZpZWxkc2V0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJmaWVsZHNldFwifSk7XHJcbiAgICBjb25zdCB0aW1lTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImxhYmVsXCIsIGNvbnRlbnQ6IFwiRXZlbnQgVGltZTpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudFRpbWVcIn19KTtcclxuICAgIGNvbnN0IHRpbWVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaW5wdXRcIiwgYXR0cmlidXRlczoge3R5cGU6IFwidGltZVwiLCBuYW1lOiBcImV2ZW50VGltZVwiLCBpZDogXCJldmVudFRpbWVcIn19KTtcclxuICAgIHRpbWVGaWVsZHNldC5hcHBlbmRDaGlsZCh0aW1lTGFiZWwpO1xyXG4gICAgdGltZUZpZWxkc2V0LmFwcGVuZENoaWxkKHRpbWVJbnB1dCk7XHJcblxyXG4gICAgY29uc3QgbG9jYXRpb25GaWVsZHNldCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiZmllbGRzZXRcIn0pO1xyXG4gICAgY29uc3QgbG9jYXRpb25MYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwibGFiZWxcIiwgY29udGVudDogXCJFdmVudCBMb2NhdGlvbjpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudExvY2F0aW9uXCJ9fSk7XHJcbiAgICBjb25zdCBsb2NhdGlvbklucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJpbnB1dFwiLCBhdHRyaWJ1dGVzOiB7dHlwZTogXCJ0ZXh0XCIsIG5hbWU6IFwiZXZlbnRMb2NhdGlvblwiLCBpZDogXCJldmVudExvY2F0aW9uXCJ9fSk7XHJcbiAgICBsb2NhdGlvbkZpZWxkc2V0LmFwcGVuZENoaWxkKGxvY2F0aW9uTGFiZWwpO1xyXG4gICAgbG9jYXRpb25GaWVsZHNldC5hcHBlbmRDaGlsZChsb2NhdGlvbklucHV0KTtcclxuXHJcbiAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJidXR0b25cIiwgY29udGVudDogXCJTYXZlXCIsIGF0dHJpYnV0ZXM6IHt0eXBlOiBcImJ1dHRvblwiLCBpZDogXCJzYXZlRXZlbnRcIn19KTtcclxuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50UGFnZUxpc3RlbmVycy5oYW5kbGVTYXZlQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCBoaWRlQnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJidXR0b25cIiwgY29udGVudDogXCJIaWRlIEV2ZW50IElucHV0XCIsIGF0dHJpYnV0ZXM6IHt0eXBlOiBcImJ1dHRvblwiLCBpZDogXCJoaWRlRXZlbnRcIn19KTtcclxuICAgIGhpZGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50UGFnZUxpc3RlbmVycy5oYW5kbGVIaWRlQnV0dG9uKTtcclxuXHJcbiAgICBldmVudEZvcm0uYXBwZW5kQ2hpbGQobmFtZUZpZWxkc2V0KTtcclxuICAgIGV2ZW50Rm9ybS5hcHBlbmRDaGlsZChkYXRlRmllbGRzZXQpO1xyXG4gICAgZXZlbnRGb3JtLmFwcGVuZENoaWxkKHRpbWVGaWVsZHNldCk7XHJcbiAgICBldmVudEZvcm0uYXBwZW5kQ2hpbGQobG9jYXRpb25GaWVsZHNldCk7XHJcbiAgICBldmVudEZvcm0uYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbik7XHJcbiAgICBldmVudEZvcm0uYXBwZW5kQ2hpbGQoaGlkZUJ1dHRvbik7XHJcblxyXG4gICAgcmV0dXJuIGV2ZW50Rm9ybTtcclxuICB9LFxyXG4gIGNyZWF0ZUV2ZW50SXRlbSAoZXZlbnRPYmplY3QpIHtcclxuICAgIGNvbnN0IGV2ZW50SXRlbSA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiYXJ0aWNsZVwiLCBhdHRyaWJ1dGVzOiB7Y2xhc3M6IFwiZXZlbnRJdGVtXCIsIGlkOiBgZXZlbnRJdGVtLS0ke2V2ZW50T2JqZWN0LmlkfWB9fSk7XHJcbiAgICBjb25zdCBldmVudEhlYWRlciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaDJcIiwgY29udGVudDogZXZlbnRPYmplY3QuZXZlbnROYW1lfSk7XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGV2ZW50T2JqZWN0LmV2ZW50RGF0ZSk7XHJcbiAgICBjb25zdCBkYXRpZnkgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBbXHJcbiAgICAgICAgXCJKYW51YXJ5XCIsXHJcbiAgICAgICAgXCJGZWJydWFyeVwiLFxyXG4gICAgICAgIFwiTWFyY2hcIixcclxuICAgICAgICBcIkFwcmlsXCIsXHJcbiAgICAgICAgXCJNYXlcIixcclxuICAgICAgICBcIkp1bmVcIixcclxuICAgICAgICBcIkp1bHlcIixcclxuICAgICAgICBcIkF1Z3VzdFwiLFxyXG4gICAgICAgIFwiU2VwdGVtYmVyXCIsXHJcbiAgICAgICAgXCJPY3RvYmVyXCIsXHJcbiAgICAgICAgXCJOb3ZlbWJlclwiLFxyXG4gICAgICAgIFwiRGVjZW1iZXJcIlxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgY29uc3QgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgcmV0dXJuIGAke21vbnRoTmFtZXNbbW9udGhJbmRleF19ICR7ZGF5fSwgJHt5ZWFyfWA7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGxvbmdEYXRlID0gZGF0aWZ5KCk7XHJcblxyXG4gICAgY29uc3QgZXZlbnREYXRlVGltZSA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwicFwiLCBjb250ZW50OiBgQXQgJHtldmVudE9iamVjdC5ldmVudFRpbWV9IG9uICR7bG9uZ0RhdGV9YH0pO1xyXG4gICAgY29uc3QgZXZlbnRMb2NhdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwicFwiLCBjb250ZW50OiBgTG9jYXRpb246ICR7ZXZlbnRPYmplY3QuZXZlbnRMb2NhdGlvbn1gfSk7XHJcblxyXG4gICAgZXZlbnRJdGVtLmFwcGVuZENoaWxkKGV2ZW50SGVhZGVyKTtcclxuICAgIGV2ZW50SXRlbS5hcHBlbmRDaGlsZChldmVudERhdGVUaW1lKTtcclxuICAgIGV2ZW50SXRlbS5hcHBlbmRDaGlsZChldmVudExvY2F0aW9uKTtcclxuXHJcbiAgICBpZiAoZXZlbnRPYmplY3QudXNlcklkID09PSBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSkpIHtcclxuICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsIGNvbnRlbnQ6IFwiRWRpdFwiLCBhdHRyaWJ1dGVzOiB7dHlwZTogXCJidXR0b25cIiwgaWQ6IGBlZGl0RXZlbnQtLSR7ZXZlbnRPYmplY3QuaWR9YH19KTtcclxuICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnRQYWdlTGlzdGVuZXJzLmhhbmRsZUVkaXRCdXR0b24pO1xyXG4gICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImJ1dHRvblwiLCBjb250ZW50OiBcIkRlbGV0ZVwiLCBhdHRyaWJ1dGVzOiB7dHlwZTogXCJidXR0b25cIiwgaWQ6IGBkZWxldGVFdmVudC0tJHtldmVudE9iamVjdC5pZH1gfX0pO1xyXG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50UGFnZUxpc3RlbmVycy5oYW5kbGVEZWxldGVCdXR0b24pO1xyXG4gICAgICBldmVudEl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICAgIGV2ZW50SXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICAgIGRhdGFTZXQ6IFwidXNlcnNcIixcclxuICAgICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgZW1iZWRJdGVtOiBgLyR7ZXZlbnRPYmplY3QudXNlcklkfWBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHBhcnNlZFJlc3BvbnNlID0+IHtcclxuICAgICAgICBjb25zdCBldmVudFVzZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcInBcIiwgY29udGVudDogYEV2ZW50IENyZWF0ZWQgQnk6ICR7cGFyc2VkUmVzcG9uc2UudXNlck5hbWV9YH0pO1xyXG4gICAgICAgIGV2ZW50SXRlbS5hcHBlbmRDaGlsZChldmVudFVzZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZXZlbnRJdGVtO1xyXG4gIH0sXHJcbiAgY3JlYXRlRXZlbnRFZGl0SW5wdXQoY29udGFpbmVySWQsIGV2ZW50T2JqZWN0KSB7XHJcbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJmb3JtXCIsIGF0dHJpYnV0ZXM6IHtjbGFzczogXCJldmVudEVkaXRcIn19KTtcclxuICAgIGNvbnN0IGV2ZW50SGVhZGVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJoMlwiLCBjb250ZW50OiBldmVudE9iamVjdC5ldmVudE5hbWV9KTtcclxuICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoZXZlbnRIZWFkZXIpO1xyXG5cclxuICAgIGNvbnN0IG5hbWVGaWVsZHNldCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiZmllbGRzZXRcIn0pO1xyXG4gICAgY29uc3QgbmFtZUxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJsYWJlbFwiLCBjb250ZW50OiBcIkVkaXQgTmFtZTpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudE5hbWVcIn19KTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaW5wdXRcIiwgYXR0cmlidXRlczoge3R5cGU6IFwidGV4dFwiLCBuYW1lOiBcImV2ZW50TmFtZVwiLCBpZDogYGVkaXROYW1lLS0ke2NvbnRhaW5lcklkfWAsIHZhbHVlOiBldmVudE9iamVjdC5ldmVudE5hbWV9fSk7XHJcbiAgICBuYW1lRmllbGRzZXQuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcclxuICAgIG5hbWVGaWVsZHNldC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IGRhdGVGaWVsZHNldCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiZmllbGRzZXRcIn0pO1xyXG4gICAgY29uc3QgZGF0ZUxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJsYWJlbFwiLCBjb250ZW50OiBcIkVkaXQgRGF0ZTpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudERhdGVcIn19KTtcclxuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaW5wdXRcIiwgYXR0cmlidXRlczoge3R5cGU6IFwiZGF0ZVwiLCBuYW1lOiBcImV2ZW50RGF0ZVwiLCBpZDogYGVkaXREYXRlLS0ke2NvbnRhaW5lcklkfWAsIHZhbHVlOiBldmVudE9iamVjdC5ldmVudERhdGV9fSk7XHJcbiAgICBkYXRlRmllbGRzZXQuYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcclxuICAgIGRhdGVGaWVsZHNldC5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVGaWVsZHNldCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiZmllbGRzZXRcIn0pO1xyXG4gICAgY29uc3QgdGltZUxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJsYWJlbFwiLCBjb250ZW50OiBcIkVkaXQgVGltZTpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudFRpbWVcIn19KTtcclxuICAgIGNvbnN0IHRpbWVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaW5wdXRcIiwgYXR0cmlidXRlczoge3R5cGU6IFwidGltZVwiLCBuYW1lOiBcImV2ZW50VGltZVwiLCBpZDogYGVkaXRUaW1lLS0ke2NvbnRhaW5lcklkfWAsIHZhbHVlOiBldmVudE9iamVjdC5ldmVudFRpbWV9fSk7XHJcbiAgICB0aW1lRmllbGRzZXQuYXBwZW5kQ2hpbGQodGltZUxhYmVsKTtcclxuICAgIHRpbWVGaWVsZHNldC5hcHBlbmRDaGlsZCh0aW1lSW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IGxvY2F0aW9uRmllbGRzZXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImZpZWxkc2V0XCJ9KTtcclxuICAgIGNvbnN0IGxvY2F0aW9uTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImxhYmVsXCIsIGNvbnRlbnQ6IFwiRWRpdCBMb2NhdGlvbjpcIiwgYXR0cmlidXRlczoge2ZvcjogXCJldmVudExvY2F0aW9uXCJ9fSk7XHJcbiAgICBjb25zdCBsb2NhdGlvbklucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJpbnB1dFwiLCBhdHRyaWJ1dGVzOiB7dHlwZTogXCJ0ZXh0XCIsIG5hbWU6IFwiZXZlbnRMb2NhdGlvblwiLCBpZDogYGVkaXRMb2NhdGlvbi0tJHtjb250YWluZXJJZH1gLCB2YWx1ZTogZXZlbnRPYmplY3QuZXZlbnRMb2NhdGlvbn19KTtcclxuICAgIGxvY2F0aW9uRmllbGRzZXQuYXBwZW5kQ2hpbGQobG9jYXRpb25MYWJlbCk7XHJcbiAgICBsb2NhdGlvbkZpZWxkc2V0LmFwcGVuZENoaWxkKGxvY2F0aW9uSW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUJ1dHRvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsIGNvbnRlbnQ6IFwiVXBkYXRlXCIsIGF0dHJpYnV0ZXM6IHt0eXBlOiBcImJ1dHRvblwiLCBpZDogYHN1Ym1pdEVkaXRzLS0ke2NvbnRhaW5lcklkfWB9fSk7XHJcbiAgICB1cGRhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50UGFnZUxpc3RlbmVycy5oYW5kbGVVcGRhdGVCdXR0b24pO1xyXG5cclxuICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQobmFtZUZpZWxkc2V0KTtcclxuICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQoZGF0ZUZpZWxkc2V0KTtcclxuICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQodGltZUZpZWxkc2V0KTtcclxuICAgIGZvcm1Db250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb25GaWVsZHNldCk7XHJcbiAgICBmb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKHVwZGF0ZUJ1dHRvbik7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRJdGVtLS0ke2NvbnRhaW5lcklkfWApO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRDb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICBjdXJyZW50Q29udGFpbmVyLnJlbW92ZUNoaWxkKGN1cnJlbnRDb250YWluZXIuZmlyc3RDaGlsZCk7XHJcbiAgICB9O1xyXG4gICAgY3VycmVudENvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQ29udGFpbmVyKTtcclxuICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzOyIsImltcG9ydCBub21hZERhdGEgZnJvbSBcIi4vbm9tYWREYXRhXCJcclxuaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50c1wiO1xyXG5pbXBvcnQgZnJpZW5kc0V2ZW50c0xpc3RlbmVyIGZyb20gXCIuL2ZyaWVuZHNFdmVudHNMaXN0ZW5lclwiO1xyXG5cclxuY29uc3QgZnJpZW5kcyA9IHtcclxuXHJcblxyXG4gIGRlZmluZUN1cnJlbnRVc2Vyc0ZyaWVuZHMgKCkge1xyXG4gICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKVxyXG4gICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xyXG4gICAgbGV0IGN1cnJlbnRVc2VyID0gTnVtYmVyKHVzZXJJZCk7XHJcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50VXNlciwgdXNlcklkKVxyXG4gICAgY29uc3QgdGFyZ2V0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIilcclxuICAgIGNvbnN0IGZyaWVuZFNjcm9sbENvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgIGVsZW1lbnRUeXBlOiBcInNlY3Rpb25cIixcclxuICAgICAgY3NzQ2xhc3M6IFwiZnJpZW5kU2Nyb2xsQ29udGFpbmVyXCIsXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICBpZDogXCJmcmllbmRTY3JvbGxDb250YWluZXJcIlxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgdGFyZ2V0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZyaWVuZFNjcm9sbENvbnRhaW5lcilcclxuXHJcbiAgICBmcmllbmRTY3JvbGxDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgZWxlbWVudFR5cGU6IFwic2VjdGlvblwiLFxyXG4gICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgaWQ6IFwiYWxsRnJpZW5kQ29udGFpbmVyXCIsXHJcbiAgICAgIH1cclxuICAgIH0pKVxyXG4gICAgY29uc3QgYWxsRnJpZW5kQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGxGcmllbmRDb250YWluZXJcIik7XHJcbiAgICBhbGxGcmllbmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgZWxlbWVudFR5cGU6IFwiaDJcIixcclxuICAgICAgY29udGVudDogXCJmcmllbmRzOlwiLFxyXG4gICAgICBjc3NDbGFzczogXCJmcmllbmRUYWdcIlxyXG4gICAgfSkpXHJcblxyXG4gICAgbGV0IGZyaWVuZEhvbGRlciA9IFtdO1xyXG5cclxuLy8gUFVMTCBGUk9NIEZSSUVORFMgSlNPTi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbm5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuXCJkYXRhU2V0XCIgOiBcImZyaWVuZHNcIixcclxuXCJmZXRjaFR5cGVcIiA6IFwiR0VUXCIsXHJcblwiZGF0YUJhc2VPYmplY3RcIiA6IFwiXCIsXHJcblwiZW1iZWRJdGVtXCIgOiBcIj9fZW1iZWQ9ZXZlbnRzXCJ9KVxyXG4udGhlbihmcm9tRnJpZW5kcyA9PiB7XHJcbiAgLy8gY29uc29sZS5sb2coZnJvbUZyaWVuZHMpXHJcbiAgZnJvbUZyaWVuZHMuZm9yRWFjaChmcmllbmREYXRhID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGZyaWVuZERhdGEpXHJcbiAgICBpZiAoZnJpZW5kRGF0YS51c2VySWQgPT09IGN1cnJlbnRVc2VyKSB7XHJcbiAgICAgIGZyaWVuZEhvbGRlci5wdXNoKGZyaWVuZERhdGEub3RoZXJGcmllbmRJZClcclxuICAgIH1cclxuICB9KVxyXG4gIGZyaWVuZEhvbGRlci5mb3JFYWNoKG9mZmljaWFsRnJpZW5kID0+IHtcclxuICAgIHRoaXMubG9hZEN1cnJlbnRVc2Vyc0ZyaWVuZHMob2ZmaWNpYWxGcmllbmQpXHJcbiAgfSlcclxufSlcclxufSxcclxubG9hZEN1cnJlbnRVc2Vyc0ZyaWVuZHMgKGZyaWVuZCkge1xyXG4gIC8vIFBVTEwgRlJPTSBVU0VSUyBKU09OIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gY29uc29sZS5sb2coZnJpZW5kKVxyXG4gICAgICBjb25zdCBhbGxGcmllbmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsbEZyaWVuZENvbnRhaW5lclwiKVxyXG4gICAgICBhbGxGcmllbmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJhcnRpY2xlXCIsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgY2xhc3M6IFwiZnJpZW5kLWNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgaWQ6IGBmcmllbmQtJHtmcmllbmR9YFxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcbiAgICAgIGNvbnN0IGZyaWVuZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmcmllbmQtJHtmcmllbmR9YClcclxuICAgIC8vIEdFVCBBIEJPWCBIRVJFIFRIQVQgQ09OVEFJTlMgVklTVUFMIE9GIEZSSUVORFNcclxuXHJcbiAgICAgIGxldCBmcmllbmREb21CdWlsZGVyID0gW107XHJcbiAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgXCJkYXRhU2V0XCIgOiBcInVzZXJzXCIsXHJcbiAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiBcIlwiLFxyXG4gICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPWV2ZW50c1wifSlcclxuICAgICAgLnRoZW4oZnJvbVVzZXJEYXRhID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcm9tVXNlckRhdGEpO1xyXG4gICAgICAgIGZyb21Vc2VyRGF0YS5mb3JFYWNoKHVzZXJJbmZvID0+IHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGZyaWVuZCwgdXNlckluZm8uaWQpXHJcbiAgICAgICAgICBpZiAodXNlckluZm8uaWQgPT09IGZyaWVuZCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VySW5mby51c2VyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyaWVuZElkZW50aWZpZXIgPSB7XHJcbiAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiaDJcIixcclxuICAgICAgICAgICAgICBjb250ZW50OiB1c2VySW5mby51c2VyTmFtZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmcmllbmREb21CdWlsZGVyLnB1c2goZnJpZW5kSWRlbnRpZmllcilcclxuICAgICAgICAgICAgLy8gUFVMTCBGUk9NIEVWRU5UUyBKU09OIC0tLS0tLVxyXG4gICAgICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgICAgICAgICAgICBcImRhdGFTZXRcIiA6IFwiZXZlbnRzXCIsXHJcbiAgICAgICAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiBcIlwiLFxyXG4gICAgICAgICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPWV2ZW50c1wifSlcclxuICAgICAgICAgICAgLnRoZW4oZXZlbnRzID0+IHtcclxuICAgICAgICAgICAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudXNlcklkID09PSBmcmllbmQpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnRIb2xkZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwicFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGBFVkVOVDogJHtldmVudC5ldmVudE5hbWV9IG9uICR7ZXZlbnQuZXZlbnREYXRlfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBldmVudC0ke2V2ZW50LmlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGZyaWVuZERvbUJ1aWxkZXIucHVzaChldmVudEhvbGRlcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBQVUxMIEZST00gTkVXU0lURU1TIEpTT04gLS0tLS0tXHJcbiAgICAgICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgICAgICAgXCJkYXRhU2V0XCIgOiBcIm5ld3NpdGVtc1wiLFxyXG4gICAgICAgICAgICBcImZldGNoVHlwZVwiIDogXCJHRVRcIixcclxuICAgICAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiIDogXCJcIixcclxuICAgICAgICAgICAgXCJlbWJlZEl0ZW1cIiA6IFwiP19lbWJlZD1uZXdzaXRlbXNcIn0pXHJcbiAgICAgICAgICAgIC50aGVuKG5ld3NTaGl6ID0+IHtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdzU2hpeilcclxuICAgICAgICAgICAgICBuZXdzU2hpei5mb3JFYWNoKHVzZXJTcGVjaWZpY0FydGljbGVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyU3BlY2lmaWNBcnRpY2xlcy51c2VySWQgPT09IGZyaWVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VyU3BlY2lmaWNBcnRpY2xlcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0aWNsZUhvbGRlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYEFSVElDTEU6ICR7dXNlclNwZWNpZmljQXJ0aWNsZXMudGl0bGV9YCxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYGFydGljbGUtJHt1c2VyU3BlY2lmaWNBcnRpY2xlcy5pZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBmcmllbmREb21CdWlsZGVyLnB1c2goYXJ0aWNsZUhvbGRlcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGZyaWVuZERvbUJ1aWxkZXIpXHJcbiAgICAgICAgICAgICAgZnJpZW5kRG9tQnVpbGRlci5mb3JFYWNoKG9iamVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgZnJpZW5kQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudChvYmplY3QpKVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgY29uc3QgZGVsZXRlRnJpZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgICAgICAgICAgIGRlbGV0ZUZyaWVuZC5jbGFzc0xpc3QuYWRkKGBkZWxldGUtZnJpZW5kLSR7ZnJpZW5kfWApXHJcbiAgICAgICAgICAgICAgZGVsZXRlRnJpZW5kLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIilcclxuICAgICAgICAgICAgICBkZWxldGVGcmllbmQudGV4dENvbnRlbnQgPSBcIkRFTEVURVwiO1xyXG4gICAgICAgICAgICAgIGZyaWVuZENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVGcmllbmQpO1xyXG4gICAgICAgICAgICAgIGRlbGV0ZUZyaWVuZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZnJpZW5kc0V2ZW50c0xpc3RlbmVyLmZyaWVuZHNEZWxldGVGcmllbmQoKVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgfSxcclxuICBpbml0aWFsaXplUG90ZW50aWFsRnJpZW5kcyAoKSB7XHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKTtcclxuICAgIGxldCBjdXJyZW50VXNlciA9IE51bWJlcih1c2VySWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJmcmllbmRzIFBhZ2UgdXNlciBpZCBpcy1cIixjdXJyZW50VXNlcik7XHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsVGFyZ2V0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmllbmRTY3JvbGxDb250YWluZXJcIik7XHJcbiAgICBjb25zdCBmaW5kTmV3RnJpZW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBsZXQgZnJpZW5kc0lIYXZlID0gW107XHJcbiAgICBmaW5kTmV3RnJpZW5kQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZnV0dXJlLWZyaWVuZHNcIik7XHJcbiAgICBzY3JvbGxUYXJnZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoZmluZE5ld0ZyaWVuZENvbnRhaW5lcik7XHJcbiAgICBjb25zdCBmaW5kTmV3RnJpZW5kVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xyXG4gICAgZmluZE5ld0ZyaWVuZENvbnRhaW5lci5hcHBlbmRDaGlsZChmaW5kTmV3RnJpZW5kVGFnKTtcclxuICAgIGZpbmROZXdGcmllbmRUYWcuY2xhc3NMaXN0LmFkZChcImZyaWVuZFRvQmVcIik7XHJcbiAgICBmaW5kTmV3RnJpZW5kVGFnLnRleHRDb250ZW50ID0gXCJmcmllbmQgdG8gYmU6XCJcclxuXHJcbiAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgIFwiZGF0YVNldFwiIDogXCJmcmllbmRzXCIsXHJcbiAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiBcIlwiLFxyXG4gICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPWZyaWVuZHNcIlxyXG4gICAgfSlcclxuICAgIC50aGVuKGZyb21GcmllbmRzID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coZnJvbUZyaWVuZHMpXHJcbiAgICAgIGZyb21GcmllbmRzLmZvckVhY2goZnJpZW5kRGF0YSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZnJpZW5kRGF0YSlcclxuICAgICAgICBpZiAoZnJpZW5kRGF0YS51c2VySWQgPT09IGN1cnJlbnRVc2VyKSB7XHJcbiAgICAgICAgICBmcmllbmRzSUhhdmUucHVzaChmcmllbmREYXRhLm90aGVyRnJpZW5kSWQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRzSUhhdmUpXHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1VzZXJQb3RlbnRpYWxGcmllbmRzKGZyaWVuZHNJSGF2ZSlcclxuICAgIH0pXHJcbiAgfSxcclxuICBzaG93VXNlclBvdGVudGlhbEZyaWVuZHMgKGZyaWVuZCkge1xyXG4gICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICBsZXQgY3VycmVudFVzZXIgPSBOdW1iZXIodXNlcklkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGZyaWVuZClcclxuICAgIGxldCBhbGxUaGVVc2VycyA9IFtdXHJcbiAgICBmcmllbmQucHVzaChjdXJyZW50VXNlcilcclxuICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgXCJkYXRhU2V0XCIgOiBcInVzZXJzXCIsXHJcbiAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiBcIlwiLFxyXG4gICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPXVzZXJzXCJcclxuICAgIH0pXHJcbiAgICAudGhlbihhbGxVc2VycyA9PiB7XHJcbiAgICAgIGFsbFVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codXNlci5pZClcclxuICAgICAgICBhbGxUaGVVc2Vycy5wdXNoKHVzZXIuaWQpXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXZlcnlvbmVcIixhbGxUaGVVc2VycywgXCJ1c2VyIGFuZCBmcmllbmRzXCIsZnJpZW5kKVxyXG4gICAgICBsZXQgbm90Q3VycmVudEZyaWVuZCA9IHRoaXMuZGlmZmVyZW5jZU9mMkFycmF5cyhhbGxUaGVVc2VycywgZnJpZW5kKVxyXG4gICAgICBub3RDdXJyZW50RnJpZW5kLmZvckVhY2gobm9GcmllbmRPZk1pbmUgPT4ge1xyXG4gICAgICAgIHRoaXMucHJpbnRQb3RlbnRpYWxGcmllbmRzVG9Ccm93c2VyKG5vRnJpZW5kT2ZNaW5lKVxyXG5cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICAgZGlmZmVyZW5jZU9mMkFycmF5cyAoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIHZhciB0ZW1wID0gW107XHJcbiAgICBhcnJheTEgPSBhcnJheTEudG9TdHJpbmcoKS5zcGxpdChcIixcIikubWFwKE51bWJlcik7XHJcbiAgICBhcnJheTIgPSBhcnJheTIudG9TdHJpbmcoKS5zcGxpdChcIixcIikubWFwKE51bWJlcik7XHJcbiAgICBcclxuICAgIGZvciAodmFyIGkgaW4gYXJyYXkxKSB7XHJcbiAgICBpZihhcnJheTIuaW5kZXhPZihhcnJheTFbaV0pID09PSAtMSkgdGVtcC5wdXNoKGFycmF5MVtpXSk7XHJcbiAgICB9XHJcbiAgICBmb3IoaSBpbiBhcnJheTIpIHtcclxuICAgIGlmKGFycmF5MS5pbmRleE9mKGFycmF5MltpXSkgPT09IC0xKSB0ZW1wLnB1c2goYXJyYXkyW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW1wLnNvcnQoKGEsYikgPT4gYS1iKTtcclxuICAgIH0sXHJcbiAgICBwcmludFBvdGVudGlhbEZyaWVuZHNUb0Jyb3dzZXIgKG5vdEFGcmllbmQpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2cobm90QUZyaWVuZClcclxuICAgICAgY29uc3QgdGFyZ2V0U2VjdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnV0dXJlLWZyaWVuZHNcIik7XHJcbiAgICAgIHRhcmdldFNlY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJkaXZcIixcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICBpZDogYHBvdGVudGlhbEZyaWVuZC0ke25vdEFGcmllbmR9YFxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcblxyXG4gICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgICAgXCJkYXRhU2V0XCIgOiBcInVzZXJzXCIsXHJcbiAgICAgICAgXCJmZXRjaFR5cGVcIiA6IFwiR0VUXCIsXHJcbiAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiIDogXCJcIixcclxuICAgICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPXVzZXJzXCJcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4odXNlcnNJbmZvID0+IHtcclxuICAgICAgICB1c2Vyc0luZm8uZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgIGlmICh1c2VyLmlkID09PSBub3RBRnJpZW5kKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIuaWQsIFwiaXMgbm8gZnJpZW5kXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHBvdGVudGlhbEZyaWVuZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwb3RlbnRpYWxGcmllbmQtJHtub3RBRnJpZW5kfWApXHJcbiAgICAgICAgICAgIHBvdGVudGlhbEZyaWVuZENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImgyXCIsXHJcbiAgICAgICAgICAgICAgY29udGVudDogdXNlci51c2VyTmFtZSxcclxuICAgICAgICAgICAgICBjc3NDbGFzczogYHBvdGVudGlhbC1mcmllbmQtJHt1c2VyLmlkfWBcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIHBvdGVudGlhbEZyaWVuZENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImJ1dHRvblwiLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwiQWRkIEZyaWVuZFwiLFxyXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBgYWRkLWZyaWVuZC1idXR0b24tJHt1c2VyLmlkfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6IFwiYWRkLWZyaWVuZC1idXR0b25cIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIGNvbnN0IGZvckFkZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGQtZnJpZW5kLWJ1dHRvbi0ke3VzZXIuaWR9YCk7XHJcbiAgICAgICAgICAgIGZvckFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGZyaWVuZHNFdmVudHNMaXN0ZW5lci5mcmllbmRzQWRkRnJpZW5kKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhub3RBRnJpZW5kKVxyXG4gICAgfSxcclxuICAgIGZyaWVuZFNvcnRGcm9tTWVzc2FnZXNTZWN0aW9uIChhcnJheU9mRnJpZW5kcywgZnJpZW5kVG9BZGQsIGZyaWVuZFRvQWRkTmFtZSkge1xyXG4gICAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiAgICAgIGxldCBjdXJyZW50VXNlciA9IE51bWJlcih1c2VySWQpO1xyXG4gICAgICBhcnJheU9mRnJpZW5kcy5wdXNoKGN1cnJlbnRVc2VyKVxyXG4gICAgICBsZXQgYXJyYXlPZlVzZXJzID0gW11cclxuICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICAgIFwiZGF0YVNldFwiIDogXCJ1c2Vyc1wiLFxyXG4gICAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICAgIFwiZGF0YUJhc2VPYmplY3RcIiA6IFwiXCIsXHJcbiAgICAgICAgXCJlbWJlZEl0ZW1cIiA6IFwiP19lbWJlZD1ldmVudHNcIn0pXHJcbiAgICAgICAgLnRoZW4odXNlcnMgPT4ge1xyXG4gICAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgICAgYXJyYXlPZlVzZXJzLnB1c2godXNlci5pZClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBsZXQgbm90RnJpZW5kc0xpc3QgPSB0aGlzLmNvbXBhcmVNZXNzYWdlRnJpZW5kQXJyYXlzKGFycmF5T2ZVc2VycywgYXJyYXlPZkZyaWVuZHMpXHJcbiAgICAgICAgICB0aGlzLm1lc3NlbmdlckFkZGZyaWVuZEZpbmFsZShub3RGcmllbmRzTGlzdCwgZnJpZW5kVG9BZGQsIGZyaWVuZFRvQWRkTmFtZSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGNvbXBhcmVNZXNzYWdlRnJpZW5kQXJyYXlzIChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgICB2YXIgdGVtcCA9IFtdO1xyXG4gICAgICBhcnJheTEgPSBhcnJheTEudG9TdHJpbmcoKS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xyXG4gICAgICBhcnJheTIgPSBhcnJheTIudG9TdHJpbmcoKS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSBpbiBhcnJheTEpIHtcclxuICAgICAgaWYoYXJyYXkyLmluZGV4T2YoYXJyYXkxW2ldKSA9PT0gLTEpIHRlbXAucHVzaChhcnJheTFbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcihpIGluIGFycmF5Mikge1xyXG4gICAgICBpZihhcnJheTEuaW5kZXhPZihhcnJheTJbaV0pID09PSAtMSkgdGVtcC5wdXNoKGFycmF5MltpXSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRlbXAuc29ydCgoYSxiKSA9PiBhLWIpO1xyXG4gICAgfSxcclxuICAgIG1lc3NlbmdlckFkZGZyaWVuZEZpbmFsZSAobm90ZnJpZW5kcywgd2FudGVkRnJpZW5kLCBmcmllbmRUb0FkZE5hbWUpIHtcclxuICAgICAgY29uc29sZS5sb2cobm90ZnJpZW5kcywgTnVtYmVyKHdhbnRlZEZyaWVuZCkpXHJcbiAgICAgIGNvbnN0IGZpbmFsRnJpZW5kID0gbm90ZnJpZW5kcy5maWx0ZXIoZnJpZW5kc1RoYXRBcmVudCA9PiBmcmllbmRzVGhhdEFyZW50ID09PSBOdW1iZXIod2FudGVkRnJpZW5kKSlcclxuICAgICAgLy8gY29uc29sZS5sb2coZmluYWxGcmllbmRbMF0sIE51bWJlcih3YW50ZWRGcmllbmQpKVxyXG4gICAgICBpZiAoZmluYWxGcmllbmRbMF0gPT09IE51bWJlcih3YW50ZWRGcmllbmQpKSB7XHJcbiAgICAgICAgaWYgKGZyaWVuZFRvQWRkTmFtZSA9PT0gXCJtb2RhbFwiKSB7XHJcbiAgICAgICAgICBmcmllbmRzRXZlbnRzTGlzdGVuZXIuc2VhcmNoQmFyQWRkRnJpZW5kVG9Kc29uKGZpbmFsRnJpZW5kKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm1vZGFsUXVlc3Rpb25haXJlT2ZGcmllbmRzaGlwVmFsaWRpdHkod2FudGVkRnJpZW5kLGZyaWVuZFRvQWRkTmFtZSlcclxuICAgICAgICB9Ly8gYWxlcnQoYFlvdSd2ZSBhZGRlZCBhIGZlbGxvdyBOb21hZCAke2ZyaWVuZFRvQWRkTmFtZX0geW91ciBmcmllbmQgbGlzdGApXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCJVaC4uLi4gWW91IGNhbid0IGZyaWVuZCB0aGVyZSAoaXQncyB5b3Ugb3Igc29tZW9uZSB3aG8ncyBhbHJlYWR5IGEgZnJpZW5kKS5cIilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vZGFsUXVlc3Rpb25haXJlT2ZGcmllbmRzaGlwVmFsaWRpdHkgKHdhbnRlZEZyaWVuZCwgZnJpZW5kVG9BZGROYW1lKSB7XHJcblxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgIGVsZW1lbnRUeXBlOiBcInNlY3Rpb25cIixcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICBpZDogXCJtb2RhbC1jb250YWluZXJcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiZGl2XCIsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kc19fYmFja2Ryb3BcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSkpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgIGVsZW1lbnRUeXBlOiBcImRpdlwiLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgIGlkOiBcImZyaWVuZHNfX21vZGFsXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0pKVxyXG4gICAgICBjb25zdCBtb2RhbFBhcmVudFRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJpZW5kc19fbW9kYWxcIik7XHJcbiAgICAgIG1vZGFsUGFyZW50VGFyZ2V0LmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiaDFcIixcclxuICAgICAgICBjb250ZW50OiBgWW91IHN1cmUgeW91IHdhbnQgJHtmcmllbmRUb0FkZE5hbWV9IGFzIGEgZnJpZW5kP2AsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kc19fY29udGVudFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgbW9kYWxQYXJlbnRUYXJnZXQuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJwXCIsXHJcbiAgICAgICAgY29udGVudDogXCJJIG1lYW4gcmVhbGx5Li4uLlwiLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgIGhyZWY6IFwiI1wiLFxyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kc19fY2xvc2VcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcbiAgICAgIG1vZGFsUGFyZW50VGFyZ2V0LmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgY29udGVudDogXCJEb24ndCBGcmllbmRcIixcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICBpZDogXCJkb250RnJpZW5kXCIsXHJcbiAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgbW9kYWxQYXJlbnRUYXJnZXQuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcclxuICAgICAgICBjb250ZW50OiBgWWVzLCBtYWtlICR7ZnJpZW5kVG9BZGROYW1lfSBhIEZyaWVuZGAsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kSXRVcFwiLFxyXG4gICAgICAgICAgbmFtZTogd2FudGVkRnJpZW5kLFxyXG4gICAgICAgICAgdHlwZTogXCJidXR0b25cIlxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9udEZyaWVuZFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge2ZyaWVuZHNFdmVudHNMaXN0ZW5lci5jbG9zZU1lc3NhZ2VNb2RhbCgpXHJcbiAgICAgIH0pXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJpZW5kSXRVcFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGZyaWVuZHNFdmVudHNMaXN0ZW5lci5jbG9zZU1lc3NhZ2VNb2RhbCgpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMub3BlbkZyaWVuZE1vZGFsKClcclxuICAgIH0sXHJcbiAgICBvcGVuRnJpZW5kTW9kYWwgKCkge1xyXG4gICAgICBsZXQgYmFja2Ryb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyaWVuZHNfX2JhY2tkcm9wXCIpO1xyXG4gICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyaWVuZHNfX21vZGFsXCIpO1xyXG4gICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfSxcclxuICAgIGJ1aWxkRnJpZW5kU2VhcmNoQmFyICgpIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJkaXZcIixcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICBpZDogXCJmcmllbmQtc2VhcmNoLWJveFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmllbmQtc2VhcmNoLWJveFwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgIGVsZW1lbnRUeXBlOiBcImlucHV0XCIsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kLXNlYXJjaC1pbnB1dFwiLFxyXG4gICAgICAgICAgY2xhc3M6IFwic2VhcmNoLXR4dFwiLFxyXG4gICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIEZvciBGcmllbmRzXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0pKVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyaWVuZC1zZWFyY2gtYm94XCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiYVwiLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgIGNsYXNzOiBcImZyaWVuZC1zZWFyY2gtYnRuXCIsXHJcbiAgICAgICAgICBocmVmOiBcIiNcIixcclxuICAgICAgICAgIGlkOiBcImZyaWVuZC1pY29uLWFuY2hvclwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmllbmQtaWNvbi1hbmNob3JcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJpXCIsXHJcbiAgICAgICAgY3NzQ2xhc3M6IFwiZmFzXCJcclxuICAgICAgfSkpXHJcbiAgICAgIGxldCBzZWFyY2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXNcIik7XHJcbiAgICAgIHNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHVzZXJzU2VhcmNoRnJpZW5kSW5wdXRFbnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJpZW5kLXNlYXJjaC1pbnB1dFwiKTtcclxuICAgICAgdXNlcnNTZWFyY2hGcmllbmRJbnB1dEVudGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBrZXlQcmVzc0V2ZW50ID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC5rZXkpXHJcbiAgICAgICAgaWYgKGtleVByZXNzRXZlbnQuY2hhckNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICBsZXQgdXNlcklucHV0RW50ZXIgPSBrZXlQcmVzc0V2ZW50LnRhcmdldC52YWx1ZTtcclxuXHJcbiAgICAgICAgICBmcmllbmRzRXZlbnRzTGlzdGVuZXIuc2VhcmNoSW5wdXRNYWdpYyh1c2VySW5wdXRFbnRlcik7XHJcbiAgICAgICAgICB1c2Vyc1NlYXJjaEZyaWVuZElucHV0RW50ZXIudmFsdWUgPSBcIlwiO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG5cclxuICAgICAgY29uc3QgdXNlcnNTZWFyY2hGcmllbmRJbnB1dENsaWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmllbmQtaWNvbi1hbmNob3JcIik7XHJcbiAgICAgIHVzZXJzU2VhcmNoRnJpZW5kSW5wdXRDbGljay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGxldCB1c2VySW5wdXRDbGljayA9IHVzZXJzU2VhcmNoRnJpZW5kSW5wdXRFbnRlci52YWx1ZVxyXG4gICAgICAgIGZyaWVuZHNFdmVudHNMaXN0ZW5lci5zZWFyY2hJbnB1dE1hZ2ljKHVzZXJJbnB1dENsaWNrKTtcclxuICAgICAgICB1c2Vyc1NlYXJjaEZyaWVuZElucHV0RW50ZXIudmFsdWUgPSBcIlwiO1xyXG5cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzZWFyY2hSZXN1bHREaXNwbGF5ZWQgKGZyaWVuZFNlYXJjaFJlc3VsdERpc3BsYXllZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvXCIpXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwic2VjdGlvblwiLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgIGlkOiBcIm1vZGFsLWNvbnRhaW5lclwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1jb250YWluZXJcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJkaXZcIixcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICBpZDogXCJmcmllbmRzX19iYWNrZHJvcFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiZGl2XCIsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kc19fbW9kYWxcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcbiAgICAgIGNvbnN0IG1vZGFsUGFyZW50VGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmllbmRzX19tb2RhbFwiKTtcclxuICAgICAgbW9kYWxQYXJlbnRUYXJnZXQuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJoMVwiLFxyXG4gICAgICAgIGNvbnRlbnQ6IGBXb3VsZCB5b3UgbGlrZSB0byBiZSBmcmllbmRzIHdpdGggJHtmcmllbmRTZWFyY2hSZXN1bHREaXNwbGF5ZWQudXNlck5hbWV9P2AsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kc19fY29udGVudFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgbW9kYWxQYXJlbnRUYXJnZXQuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJwXCIsXHJcbiAgICAgICAgY29udGVudDogYEkgbWVhbiAke2ZyaWVuZFNlYXJjaFJlc3VsdERpc3BsYXllZC51c2VyTmFtZX0gaXMgcHJldHR5IGNvb2wuLi5gLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgIGhyZWY6IFwiI1wiLFxyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kc19fY2xvc2VcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcbiAgICAgIG1vZGFsUGFyZW50VGFyZ2V0LmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgY29udGVudDogXCJEb24ndCBGcmllbmRcIixcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICBpZDogXCJkb250RnJpZW5kXCIsXHJcbiAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgbW9kYWxQYXJlbnRUYXJnZXQuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcclxuICAgICAgICBjb250ZW50OiBgWWVzLCBtYWtlICR7ZnJpZW5kU2VhcmNoUmVzdWx0RGlzcGxheWVkLnVzZXJOYW1lfSBhIEZyaWVuZGAsXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgaWQ6IFwiZnJpZW5kSXRVcC1zZWFyY2hNb2RhbFwiLFxyXG4gICAgICAgICAgdHlwZTogXCJidXR0b25cIlxyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcblxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbnRGcmllbmRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtmcmllbmRzRXZlbnRzTGlzdGVuZXIuY2xvc2VNZXNzYWdlTW9kYWwoKVxyXG4gICAgICB9KVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyaWVuZEl0VXAtc2VhcmNoTW9kYWxcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBmcmllbmRzRXZlbnRzTGlzdGVuZXIuc2VhcmNoQmFyRnJpZW5kaW5nKGZyaWVuZFNlYXJjaFJlc3VsdERpc3BsYXllZC5pZClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMub3BlbkZyaWVuZE1vZGFsKClcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmcmllbmRzXHJcblxyXG4vLyBjb25zdCB0ZXN0ZXIgPSBbXHJcbi8vICAge1xyXG4vLyAgICAgZWxlbWVudFR5cGU6IFwiaDJcIixcclxuLy8gICAgIGNvbnRlbnQ6IFwiamFrZSBiYW5ub25cIlxyXG4vLyAgIH0sXHJcbi8vICAge1xyXG4vLyAgICAgZWxlbWVudFR5cGU6IFwicFwiLFxyXG4vLyAgICAgY29udGVudDogXCJQb29sIFBhcnR5IDNwbVwiXHJcbi8vICAgfSxcclxuLy8gICB7XHJcbi8vICAgICBlbGVtZW50VHlwZTogXCJwXCIsXHJcbi8vICAgICBjb250ZW50OiBcImNoZWNrIG91dCB0aGlzIG5ld3MgYXJ0aWNsZVwiXHJcbi8vICAgfVxyXG4vLyBdIiwiaW1wb3J0IGZyaWVuZHMgZnJvbSBcIi4vZnJpZW5kc1wiXHJcbmltcG9ydCBub21hZERhdGEgZnJvbSBcIi4vbm9tYWREYXRhXCI7XHJcblxyXG5jb25zdCBmcmllbmRzRXZlbnRzTGlzdGVuZXIgPSB7XHJcbiAgZnJpZW5kc0RlbGV0ZUZyaWVuZCAoKSB7XHJcbiAgICBjb25zdCBmcmllbmRUb0RlbGV0ZSA9IChldmVudC50YXJnZXQuY2xhc3NMaXN0LnZhbHVlKS5zcGxpdChcIi1cIilbMl07XHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKTtcclxuICAgIGxldCBjdXJyZW50VXNlciA9IHVzZXJJZDtcclxuICAgIGNvbnNvbGUubG9nKGZyaWVuZFRvRGVsZXRlLCBjdXJyZW50VXNlcik7XHJcbiAgICBsZXQgZmluYWxOdW1iZXJTZW5kRm9yRGVsZXRlID0gMFxyXG5cclxuICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgXCJkYXRhU2V0XCIgOiBcImZyaWVuZHNcIixcclxuICAgICAgXCJmZXRjaFR5cGVcIiA6IFwiR0VUXCIsXHJcbiAgICAgIFwiZGF0YUJhc2VPYmplY3RcIiA6IFwiXCIsXHJcbiAgICAgIFwiZW1iZWRJdGVtXCIgOiBcIj9fZW1iZWQ9ZnJpZW5kc1wiXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZGVzdHJveUZyaWVuZHNIZWFydCA9PiB7XHJcbiAgICAgIGRlc3Ryb3lGcmllbmRzSGVhcnQuZm9yRWFjaChnb29kYnllRnJpZW5kID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhnb29kYnllRnJpZW5kLnVzZXJJZCwgTnVtYmVyKGN1cnJlbnRVc2VyKSlcclxuICAgICAgICBpZiAoZ29vZGJ5ZUZyaWVuZC5vdGhlckZyaWVuZElkID09PSBOdW1iZXIoZnJpZW5kVG9EZWxldGUpICYmIGdvb2RieWVGcmllbmQudXNlcklkID09PSBOdW1iZXIoY3VycmVudFVzZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVhY2VPdXRcIixnb29kYnllRnJpZW5kLmlkKTtcclxuICAgICAgICAgICAgZmluYWxOdW1iZXJTZW5kRm9yRGVsZXRlID0gZ29vZGJ5ZUZyaWVuZC5pZDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBsZXQgZ29vZEJ5ZVNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZnJpZW5kLSR7ZnJpZW5kVG9EZWxldGV9YCk7XHJcbiAgICAgIGdvb2RCeWVTZWFyY2hSZXN1bHRzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZ29vZEJ5ZVNlYXJjaFJlc3VsdHMpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coZmluYWxOdW1iZXJTZW5kRm9yRGVsZXRlKVxyXG4gICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgICAgXCJkZWxldGVJZFwiIDogZmluYWxOdW1iZXJTZW5kRm9yRGVsZXRlLFxyXG4gICAgICAgIFwiZGF0YVNldFwiIDogXCJmcmllbmRzXCIsXHJcbiAgICAgICAgXCJmZXRjaFR5cGVcIiA6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiIDoge1xyXG4gICAgICAgICAgXCJ1c2VySWRcIjogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcclxuICAgICAgICBmcmllbmRzLmRlZmluZUN1cnJlbnRVc2Vyc0ZyaWVuZHMoKTtcclxuICAgICAgICBmcmllbmRzLmluaXRpYWxpemVQb3RlbnRpYWxGcmllbmRzKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9LFxyXG4gIGZyaWVuZHNBZGRGcmllbmQgKCkge1xyXG4gICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICBsZXQgY3VycmVudFVzZXIgPSBOdW1iZXIodXNlcklkKTtcclxuXHJcblxyXG4gICAgY29uc3QgZnJpZW5kVG9CZUFkZGVkID0gKGV2ZW50LnRhcmdldC5pZCkuc3BsaXQoXCItXCIpWzNdO1xyXG4gICAgY29uc29sZS5sb2coYHVzZXIke2N1cnJlbnRVc2VyfWAsYEFkZGluZyBGcmllbmQke2ZyaWVuZFRvQmVBZGRlZH1gKVxyXG5cclxuICAgIGxldCBnb29kQnllTm9uRnJpZW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBvdGVudGlhbEZyaWVuZC0ke2ZyaWVuZFRvQmVBZGRlZH1gKTtcclxuICAgIGdvb2RCeWVOb25GcmllbmQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChnb29kQnllTm9uRnJpZW5kKTtcclxuICAgIC8vIGFsZXJ0KGAke2V2ZW50LnRhcmdldC5wcmV2aW91c1NpYmxpbmcuaW5uZXJUZXh0fSBpcyBub3cgeW91ciBmcmllbmQhYCk7XHJcblxyXG4gICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICBcImRhdGFTZXRcIiA6IFwiZnJpZW5kc1wiLFxyXG4gICAgICBcImZldGNoVHlwZVwiIDogXCJQT1NUXCIsXHJcbiAgICAgIFwiZGF0YUJhc2VPYmplY3RcIiA6IHtcclxuICAgICAgICBcInVzZXJJZFwiOiBjdXJyZW50VXNlcixcclxuICAgICAgICBcIm90aGVyRnJpZW5kSWRcIjogTnVtYmVyKGZyaWVuZFRvQmVBZGRlZCksXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xyXG4gICAgICBmcmllbmRzLmRlZmluZUN1cnJlbnRVc2Vyc0ZyaWVuZHMoKTtcclxuICAgICAgZnJpZW5kcy5pbml0aWFsaXplUG90ZW50aWFsRnJpZW5kcygpO1xyXG4gICAgfSlcclxuICB9LFxyXG4gIHNoaXogKCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzaHppYmFsbFwiKVxyXG4gICAgfVxyXG4gICAgY29uc3QgZnJpZW5kVG9CZUFkZGVkID0gZXZlbnQudGFyZ2V0LmF0dHJpYnV0ZXMubmFtZS52YWx1ZTtcclxuICAgIGNvbnN0IGZyaWVuZFRvQmVBZGRlZEhhc0FOYW1lID0gZXZlbnQudGFyZ2V0LnRleHRDb250ZW50LnNwbGl0KFwiOlwiKVswXVxyXG4gICAgbGV0IGZyaWVuZHNJSGF2ZSA9IFtdXHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiAgICBsZXQgY3VycmVudFVzZXIgPSBOdW1iZXIodXNlcklkKTtcclxuICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgXCJkYXRhU2V0XCIgOiBcImZyaWVuZHNcIixcclxuICAgICAgXCJmZXRjaFR5cGVcIiA6IFwiR0VUXCIsXHJcbiAgICAgIFwiZGF0YUJhc2VPYmplY3RcIiA6IFwiXCIsXHJcbiAgICAgIFwiZW1iZWRJdGVtXCIgOiBcIj9fZW1iZWQ9ZnJpZW5kc1wiXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZnJvbUZyaWVuZHMgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhmcm9tRnJpZW5kcylcclxuICAgICAgZnJvbUZyaWVuZHMuZm9yRWFjaChmcmllbmREYXRhID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmREYXRhKVxyXG4gICAgICAgIGlmIChmcmllbmREYXRhLnVzZXJJZCA9PT0gY3VycmVudFVzZXIpIHtcclxuICAgICAgICAgIGZyaWVuZHNJSGF2ZS5wdXNoKGZyaWVuZERhdGEub3RoZXJGcmllbmRJZClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGZyaWVuZHNJSGF2ZSlcclxuICAgICAgZnJpZW5kcy5mcmllbmRTb3J0RnJvbU1lc3NhZ2VzU2VjdGlvbihmcmllbmRzSUhhdmUsIGZyaWVuZFRvQmVBZGRlZCwgZnJpZW5kVG9CZUFkZGVkSGFzQU5hbWUpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgY2xvc2VNZXNzYWdlTW9kYWwoKSB7XHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiAgICBsZXQgY3VycmVudFVzZXIgPSBOdW1iZXIodXNlcklkKTtcclxuXHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImRvbnRGcmllbmRcIikge1xyXG4gICAgICBsZXQgZ29vZEJ5ZVNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWNvbnRhaW5lclwiKTtcclxuICAgICAgZ29vZEJ5ZVNlYXJjaFJlc3VsdHMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChnb29kQnllU2VhcmNoUmVzdWx0cyk7XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJmcmllbmRJdFVwXCIpIHtcclxuICAgICAgbGV0IGdvb2RCeWVTZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1jb250YWluZXJcIik7XHJcbiAgICAgIGdvb2RCeWVTZWFyY2hSZXN1bHRzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZ29vZEJ5ZVNlYXJjaFJlc3VsdHMpO1xyXG4gICAgICBsZXQgZnJpZW5kVG9iZSA9IGV2ZW50LnRhcmdldC5hdHRyaWJ1dGVzLm5hbWUudmFsdWU7XHJcbiAgICAgIGNvbnNvbGUubG9nKGZyaWVuZFRvYmUpXHJcbiAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG4gICAgICAgICAgXCJkYXRhU2V0XCIgOiBcImZyaWVuZHNcIixcclxuICAgICAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIlBPU1RcIixcclxuICAgICAgICAgIFwiZGF0YUJhc2VPYmplY3RcIiA6IHtcclxuICAgICAgICAgICAgXCJ1c2VySWRcIjogY3VycmVudFVzZXIsXHJcbiAgICAgICAgICAgIFwib3RoZXJGcmllbmRJZFwiOiBOdW1iZXIoZnJpZW5kVG9iZSksXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VhcmNoSW5wdXRNYWdpYyAodXNlcklucHV0KSB7XHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiAgICBsZXQgY3VycmVudFVzZXIgPSBOdW1iZXIodXNlcklkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHVzZXJJbnB1dClcclxuICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgXCJkYXRhU2V0XCIgOiBcInVzZXJzXCIsXHJcbiAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiBcIlwiLFxyXG4gICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPXVzZXJzXCJcclxuICAgIH0pXHJcbiAgICAudGhlbih1c2VycyA9PiB7XHJcbiAgICAgIGNvbnN0IGZvdW5kVXNlcnMgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyTmFtZS5pbmNsdWRlcyh1c2VySW5wdXQpKTtcclxuICAgICAgY29uc29sZS5sb2coZm91bmRVc2Vycy5pZCwgY3VycmVudFVzZXIpXHJcbiAgICAgIGlmIChmb3VuZFVzZXJzLmlkID09PSBjdXJyZW50VXNlcikge1xyXG4gICAgICAgIGFsZXJ0KFwiQ2FuJ3QgZnJpZW5kIHlvdXJzZWxmXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZyaWVuZHMuc2VhcmNoUmVzdWx0RGlzcGxheWVkKGZvdW5kVXNlcnMpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2VhcmNoQmFyRnJpZW5kaW5nIChmcmllbmRUb0JlRnJvbVNlYXJjaElkKSB7XHJcbiAgICBjb25zdCBkZWZpbmVkQXNGcm9tU2VhcmNoTW9kYWwgPSBcIm1vZGFsXCJcclxuICAgIGxldCBmcmllbmRzSUhhdmUgPSBbXVxyXG4gICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xyXG4gICAgbGV0IGN1cnJlbnRVc2VyID0gTnVtYmVyKHVzZXJJZCk7XHJcbiAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcbiAgICAgIFwiZGF0YVNldFwiIDogXCJmcmllbmRzXCIsXHJcbiAgICAgIFwiZmV0Y2hUeXBlXCIgOiBcIkdFVFwiLFxyXG4gICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiBcIlwiLFxyXG4gICAgICBcImVtYmVkSXRlbVwiIDogXCI/X2VtYmVkPWZyaWVuZHNcIlxyXG4gICAgfSlcclxuICAgIC50aGVuKGZyb21GcmllbmRzID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coZnJvbUZyaWVuZHMpXHJcbiAgICAgIGZyb21GcmllbmRzLmZvckVhY2goZnJpZW5kRGF0YSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZnJpZW5kRGF0YSlcclxuICAgICAgICBpZiAoZnJpZW5kRGF0YS51c2VySWQgPT09IGN1cnJlbnRVc2VyKSB7XHJcbiAgICAgICAgICBmcmllbmRzSUhhdmUucHVzaChmcmllbmREYXRhLm90aGVyRnJpZW5kSWQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhmcmllbmRzSUhhdmUpXHJcbiAgICAgIGZyaWVuZHMuZnJpZW5kU29ydEZyb21NZXNzYWdlc1NlY3Rpb24oZnJpZW5kc0lIYXZlLCBmcmllbmRUb0JlRnJvbVNlYXJjaElkLCBkZWZpbmVkQXNGcm9tU2VhcmNoTW9kYWwpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2VhcmNoQmFyQWRkRnJpZW5kVG9Kc29uIChmcmllbmRUb0JlKSB7XHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiAgICBsZXQgY3VycmVudFVzZXIgPSBOdW1iZXIodXNlcklkKTtcclxuXHJcbiAgICBsZXQgZ29vZEJ5ZVNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWNvbnRhaW5lclwiKTtcclxuICAgIGdvb2RCeWVTZWFyY2hSZXN1bHRzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZ29vZEJ5ZVNlYXJjaFJlc3VsdHMpO1xyXG5cclxuICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgXCJkYXRhU2V0XCIgOiBcImZyaWVuZHNcIixcclxuICAgICAgXCJmZXRjaFR5cGVcIiA6IFwiUE9TVFwiLFxyXG4gICAgICBcImRhdGFCYXNlT2JqZWN0XCIgOiB7XHJcbiAgICAgICAgXCJ1c2VySWRcIjogY3VycmVudFVzZXIsXHJcbiAgICAgICAgXCJvdGhlckZyaWVuZElkXCI6IE51bWJlcihmcmllbmRUb0JlKSxcclxuICAgICAgfVxyXG4gIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmcmllbmRzRXZlbnRzTGlzdGVuZXIiLCJpbXBvcnQgbm9tYWREYXRhIGZyb20gXCIuL25vbWFkRGF0YVwiO1xyXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCI7XHJcbmltcG9ydCBtZXNzYWdlc0V2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21lc3NhZ2VzRXZlbnRMaXN0ZW5lcnNcIjtcclxuaW1wb3J0IGZyaWVuZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiLi9mcmllbmRzRXZlbnRzTGlzdGVuZXIuanNcIjtcclxuXHJcbmNvbnN0IG1lc3NhZ2VzID0ge1xyXG5cclxuICAgIGNyZWF0ZU1lc3NhZ2VCb2FyZCgpIHtcclxuICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpXHJcblxyXG4gICAgICAgIGxldCBvdXRwdXRBcnRpY2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIilcclxuXHJcbiAgICAgICAgLy9jcmVhdGUgZGlzcGxheSBjb250YWluZXJcclxuICAgICAgICBsZXQgbWVzc2FnZXNDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwic2VjdGlvblwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwibWVzc2FnZXNDb250YWluZXJcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJtZXNzYWdlc0NvbnRhaW5lclwiXHJcbiAgICAgICAgICAgIH19KTtcclxuXHJcbiAgICAgICAgLy9jcmVhdGUgbWVzc2FnZSBpbnB1dCBmaWVsZFxyXG4gICAgICAgIGxldCBtZXNzYWdlSW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiaW5wdXRcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcIm1lc3NhZ2VJbnB1dFwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcIm1lc3NhZ2VJbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRW50ZXIgTWVzc2FnZSBIZXJlXCJcclxuICAgICAgICAgICAgfX0pO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSBzdWJtaXQgYnV0dG9uIGZvciBpbnB1dCBmaWVsZFxyXG4gICAgICAgIGxldCBtZXNzYWdlU3VibWl0QnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImJ1dHRvblwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwibWVzc2FnZVN1Ym1pdEJ1dHRvblwiLFxyXG4gICAgICAgICAgICBjb250ZW50IDogXCJTdWJtaXRcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJtZXNzYWdlU3VibWl0QnV0dG9uXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJidXR0b25cIlxyXG4gICAgICAgICAgICB9fSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2VTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1lc3NhZ2VzRXZlbnRMaXN0ZW5lcnMucG9zdE5ld01lc3NhZ2UsIHtvbmNlOiB0cnVlfSk7XHJcbiAgICAgICAgbWVzc2FnZXNDb250YWluZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUlucHV0KTtcclxuICAgICAgICBtZXNzYWdlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlU3VibWl0QnV0dG9uKTtcclxuICAgICAgICBvdXRwdXRBcnRpY2xlLmFwcGVuZENoaWxkKG1lc3NhZ2VzQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TWVzc2FnZXMoKVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRNZXNzYWdlcygpIHtcclxuXHJcbiAgICAgICAgLy9HRVQgZmV0Y2ggJiAudGhlbiB0byBidWlsZCBvYmplY3QocykgZm9yIGNyZWF0ZURvbUVsZW1lbnQoKSB1c2luZyBfZXhwYW5kIHRvIGRpc3BsYXkgVU46IG1lc3NhZ2VcclxuICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YSh7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YVNldCA6IFwibWVzc2FnZXNcIixcclxuICAgICAgICAgICAgICAgIGZldGNoVHlwZSA6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBlbWJlZEl0ZW0gOiBcIj9fZXhwYW5kPXVzZXJcIlxyXG5cclxuICAgICAgICB9KS50aGVuKG1lc3NhZ2VzID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlc0NvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZUlucHV0XCIpO1xyXG5cclxuICAgICAgICAgICAgLy9zb3J0IG1lc3NhZ2VzIGJ5IHRpbWVTdGFtcFxyXG4gICAgICAgICAgICBtZXNzYWdlcy5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYS50aW1lU3RhbXApIC0gbmV3IERhdGUoYi50aW1lU3RhbXApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vYnVpbGQgRE9NIENvbXBvbmVudCBmb3IgZWFjaCBtZXNzYWdlIGFuZCBhcHBlbmRcclxuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVRleHQgPSBtZXNzYWdlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlck5hbWUgPSBtZXNzYWdlLnVzZXIudXNlck5hbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUlkID0gbWVzc2FnZS5pZDtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlVGltZVN0YW1wID0gbWVzc2FnZS50aW1lU3RhbXA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVVzZXIgPSBgJHttZXNzYWdlLnVzZXJJZH1gO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvZ2dlZEluVXNlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VEaXYgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJkaXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjc3NDbGFzcyA6IFwibWVzc2FnZURpdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkIDogYG1lc3NhZ2VEaXZfJHttZXNzYWdlSWR9YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VFbGVtZW50ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBREQgTElOSyBIRVJFXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImgzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3MgOiBcIm1lc3NhZ2VVc2VyTmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBgJHt1c2VyTmFtZX06YCxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYG1lc3NhZ2Uke21lc3NhZ2VJZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYXJzZUludChtZXNzYWdlVXNlcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlRWxlbWVudDIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3MgOiBcIm1lc3NhZ2VUZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IGAke21lc3NhZ2VUZXh0fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2VJZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZVVzZXIgPT09IGxvZ2dlZEluVXNlcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVkaXRCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImJ1dHRvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzcyA6IFwibWVzc2FnZUVkaXRCdXR0b25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFwiRWRpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBtZXNzYWdlRWRpdEJ1dHRvbl8ke21lc3NhZ2VJZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWVzc2FnZVRpbWVTdGFtcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtZXNzYWdlc0V2ZW50TGlzdGVuZXJzLmVkaXRNZXNzYWdlLCB7b25jZTogdHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudDIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZChtZXNzYWdlRWRpdEJ1dHRvbilcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlQ29udGFpbmVyLmluc2VydEJlZm9yZShtZXNzYWdlRGl2LCBtZXNzYWdlSW5wdXQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudDIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUNvbnRhaW5lci5pbnNlcnRCZWZvcmUobWVzc2FnZUVsZW1lbnQsIG1lc3NhZ2VJbnB1dClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmcmllbmRzRXZlbnRzTGlzdGVuZXIuc2hpeilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lc3NhZ2VzO1xyXG4iLCJpbXBvcnQgbm9tYWREYXRhIGZyb20gXCIuL25vbWFkRGF0YVwiO1xyXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCI7XHJcbmltcG9ydCBtZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiO1xyXG4vLyBpbXBvcnQgZnJpZW5kc0V2ZW50c0xpc3RlbmVyIGZyb20gXCIuL2ZyaWVuZHNFdmVudHNMaXN0ZW5lci5qc1wiO1xyXG5cclxuY29uc3QgbWVzc2FnZXNFdmVudExpc3RlbmVycyA9IHtcclxuXHJcbiAgICBwb3N0TmV3TWVzc2FnZSgpIHtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZUlucHV0XCIpLnZhbHVlO1xyXG5cclxuICAgICAgICBsZXQgdGltZVN0YW1wID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG5cclxuICAgICAgICAgICAgZGF0YVNldCA6IFwibWVzc2FnZXNcIixcclxuICAgICAgICAgICAgZmV0Y2hUeXBlIDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0IDoge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkIDogTnVtYmVyKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikpLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA6IG1lc3NhZ2VJbnB1dCxcclxuICAgICAgICAgICAgICAgIHRpbWVTdGFtcCA6IHRpbWVTdGFtcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihzaGl0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2hpdClcclxuICAgICAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcclxuICAgICAgICAgICAgbWVzc2FnZXMuY3JlYXRlTWVzc2FnZUJvYXJkKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZWRpdE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VBcnJheSA9IG51bWJlci5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VJZCA9IG1lc3NhZ2VBcnJheVsxXTtcclxuICAgICAgICBsZXQgbWVzc2FnZVRvRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke21lc3NhZ2VJZH1gKTtcclxuICAgICAgICBsZXQgbWVzc2FnZVRleHQgPSBtZXNzYWdlVG9FZGl0LmlubmVySFRNTDtcclxuICAgICAgICBsZXQgbWVzc2FnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIChgbWVzc2FnZURpdl8ke21lc3NhZ2VJZH1gKVxyXG4gICAgICAgIGxldCBtZXNzYWdlVGltZVN0YW1wID0gZXZlbnQuY3VycmVudFRhcmdldC5uYW1lO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VFZGl0Rm9ybSA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCAoe1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImZvcm1cIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcIm1lc3NhZ2VFZGl0Rm9ybVwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcIm1lc3NhZ2VFZGl0Rm9ybVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VFZGl0RmllbGRzZXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImZpZWxkc2V0XCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJtZXNzYWdlRWRpdEZpZWxkc2V0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IFwibWVzc2FnZUVkaXRGaWVsZHNldFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VFZGl0SW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImlucHV0XCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJtZXNzYWdlRWRpdElucHV0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IGBtZXNzYWdlRWRpdElucHV0XyR7bWVzc2FnZUlkfWAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA6IGAke21lc3NhZ2VUZXh0fWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZUVkaXRTdWJtaXRCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImJ1dHRvblwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwibWVzc2FnZUVkaXRTdWJtaXRCdXR0b25cIixcclxuICAgICAgICAgICAgY29udGVudCA6IFwiU3VibWl0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IGBtZXNzYWdlRWRpdFN1Ym1pdEJ1dHRvbl8ke21lc3NhZ2VJZH1gLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbWVzc2FnZVRpbWVTdGFtcCxcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcImJ1dHRvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBtZXNzYWdlRWRpdFN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWVzc2FnZXNFdmVudExpc3RlbmVycy5oYW5kbGVFZGl0U3VibWl0QnV0dG9uKVxyXG4gICAgICAgIG1lc3NhZ2VFZGl0RmllbGRzZXQuYXBwZW5kQ2hpbGQobWVzc2FnZUVkaXRJbnB1dClcclxuICAgICAgICBtZXNzYWdlRWRpdEZpZWxkc2V0LmFwcGVuZENoaWxkKG1lc3NhZ2VFZGl0U3VibWl0QnV0dG9uKVxyXG4gICAgICAgIG1lc3NhZ2VFZGl0Rm9ybS5hcHBlbmRDaGlsZChtZXNzYWdlRWRpdEZpZWxkc2V0KVxyXG4gICAgICAgIG1lc3NhZ2VEaXYuYXBwZW5kQ2hpbGQobWVzc2FnZUVkaXRGb3JtKVxyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUVkaXRTdWJtaXRCdXR0b24oKSB7XHJcbiAgICAgICAgbGV0IG51bWJlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VBcnJheSA9IG51bWJlci5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VJZCA9IG1lc3NhZ2VBcnJheVsxXTtcclxuICAgICAgICBsZXQgbWVzc2FnZVRpbWVTdGFtcCA9IGAke2V2ZW50LmN1cnJlbnRUYXJnZXQubmFtZX1gO1xyXG4gICAgICAgIGxldCBtZXNzYWdlRWRpdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lc3NhZ2VFZGl0SW5wdXRfJHttZXNzYWdlSWR9YCk7XHJcblxyXG4gICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuXHJcbiAgICAgICAgICAgIHB1dElkIDogbWVzc2FnZUlkLFxyXG4gICAgICAgICAgICBkYXRhU2V0IDogXCJtZXNzYWdlc1wiLFxyXG4gICAgICAgICAgICBmZXRjaFR5cGUgOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBkYXRhQmFzZU9iamVjdCA6IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZCA6IE51bWJlcihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpKSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke21lc3NhZ2VFZGl0SW5wdXQudmFsdWV9YCxcclxuICAgICAgICAgICAgICAgIHRpbWVTdGFtcDogYCR7bWVzc2FnZVRpbWVTdGFtcH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHNoaXQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGl0KVxyXG4gICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xyXG4gICAgICAgICAgICBtZXNzYWdlcy5jcmVhdGVNZXNzYWdlQm9hcmQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG1lc3NhZ2VzRXZlbnRMaXN0ZW5lcnM7IiwiaW1wb3J0IG5vbWFkRGF0YSBmcm9tIFwiLi9ub21hZERhdGFcIjtcclxuaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50c1wiO1xyXG5pbXBvcnQgbmV3c0xpc3RlbmVyIGZyb20gXCIuL25ld3NMaXN0ZW5lclwiO1xyXG5cclxuXHJcbmNvbnN0IG5ld3MgPSB7XHJcblxyXG4gICAgZ2V0QVBJTmV3cygpIHtcclxuICAgICAgICAvL2NsZWFyIHdoZW4gY2FsbGVkLlxyXG4gICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XHJcbiAgICAgICAgLy9nZXRBUElOZXdzIHdpbGwgcHVsbCBuZXdzIGZyb20gQVBJIHRoZW4gY2FsbCBjcmVhdGVFbGVtZW50IGFuZCBhcHBlbmQgdG8gb3V0cHV0LlxyXG4gICAgICAgIC8vQ3JlYXRlIGEgaGVhZGVyIGZvciBpbmNvbWluZyBuZXdzLlxyXG4gICAgICAgIGxldCBhcnRpY2xlQ291bnRlciA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbmV3c0NvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImRpdlwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJtYWluVmVpblwiXHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IHRhcmdldFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdXRwdXRcIik7XHJcbiAgICBcclxuICAgICAgICAvL05ldyBjb250YWluZXIgZm9yIHNjcm9sbGluZy5cclxuICAgICAgICBjb25zdCBuZXdzSGVhZGVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiaDFcIixcclxuICAgICAgICAgICAgY29udGVudDogXCJDdXJyZW50IE5ld3NcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwibmV3c0FQSUhlYWRlclwiXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5ld3NDb250YWluZXIuYXBwZW5kQ2hpbGQobmV3c0hlYWRlcik7XHJcbiAgICAgICAgdGFyZ2V0VmFsdWUuYXBwZW5kQ2hpbGQobmV3c0NvbnRhaW5lcik7XHJcbiAgICAgICAgLy9wdWxsIHRoZSBkYXRhIGZyb20gdGhlIGFwaSBhbmQgZGlzcGxheSBpdCB0byB0aGUgZG9tLlxyXG4gICAgICAgIGxldCBjdXJyZW50QXJ0aWNsZXNEaXYgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiZGl2XCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJjdXJyZW50QXJ0aWNsZXNEaXZcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJjdXJyZW50QXJ0aWNsZXNEaXZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwczovL25ld3NhcGkub3JnL3YyL2V2ZXJ5dGhpbmc/cT12YW5saWZlJmZyb209MjAxOS0wMS0wNSZzb3J0Qnk9cHVibGlzaGVkQXQmbGFuZ3VhZ2U9ZW4mYXBpS2V5PTlmNWM1MDlmZTkwMDQ0ZGM5NWE4YTY5NjM1NzMyODRmXCIpXHJcbiAgICAgICAgICAgIC50aGVuKG5ld3NJdGVtcyA9PiBuZXdzSXRlbXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkaXNwbGF5RGF0YSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEuYXJ0aWNsZXMuZm9yRWFjaChkYXRhR3JhbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFydFVSTCA9IGRhdGFHcmFuLnVybDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJ0VGl0bGUgPSBkYXRhR3Jhbi50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJ0RGVzYyA9IGRhdGFHcmFuLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnRJbWFnZSA9IGRhdGFHcmFuLnVybFRvSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb3VudGVyIHVzZWQgdG8gZ2l2ZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGFnZ2luZyBhbmQgZ3JhYmJpbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZUNvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgYXJ0aWNsZV8ke2FydGljbGVDb3VudGVyfV90aXRsZWAsIGAke2FydFRpdGxlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYGFydGljbGVfJHthcnRpY2xlQ291bnRlcn1fdXJsYCwgYCR7YXJ0VVJMfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYGFydGljbGVfJHthcnRpY2xlQ291bnRlcn1fZGVzY2AsIGAke2FydERlc2N9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgYXJ0aWNsZV8ke2FydGljbGVDb3VudGVyfV9pbWFnZWAsIGAke2FydEltYWdlfWApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWRkIHNlY3Rpb24gY29udGFpbmVyIGZvciBhbGwgYXJ0aWNsZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3c0FQSUFydENvbnRhaW4gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJhcnRpY2xlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBcIm5ld3NBUElBcnRpY2xlQ29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF0dHJpYnV0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3R5bGU6IFwiaGVpZ2h0Ojk1dmg7IG92ZXJmbG93OiBzY3JvbGw7IGNvbG9yOndoaXRlO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToyMHB4O292ZXJmbG93OmF1dG87IGJvcmRlci1yYWRpdXM6IDEycHg7XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0aWNsZUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcInNlY3Rpb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6IGBuZXdzQVBJQ29udGFpbmVyXyR7YXJ0aWNsZUNvdW50ZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhcGlTZWN0aW9uR3JhYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwiYm9yZGVyLXJhZGl1czogMTJweDtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBuZXdzQVBJQXJ0Q29udGFpbi5hcHBlbmRDaGlsZChhcnRpY2xlQ29udGFpbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBcnRpY2xlc0Rpdi5hcHBlbmRDaGlsZChuZXdzQVBJQXJ0Q29udGFpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlIGZpZWxkc2V0IGZvciBhcnRpY2xlcyB0byBiZSBhbmQgdGhlbiBhdHRhY2ggdGhlbSB0byB0aGUgc2VjdGlvbnMgYWJvdmUuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50QVBJU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhR3Jhbi50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBcImFwaURhdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYGFydGljbGVfJHthcnRpY2xlQ291bnRlcn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcImNvbG9yOndoaXRlO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToyMHB4O292ZXJmbG93OmF1dG87IGJvcmRlci1yYWRpdXM6IDEycHg7XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRBUElTZWN0aW9uLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJpbWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGFHcmFuLnVybFRvSW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzczogYGFwaUltYWdlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYGFwaUltYWdlXyR7YXJ0aWNsZUNvdW50ZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGAke2RhdGFHcmFuLnVybFRvSW1hZ2V9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlOiBcIndpZHRoOiAzMCU7IGhlaWdodDogMTUlOyBib3JkZXItcmFkaXVzOiAxMnB4O1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXJ0aWNsZXNEaXYuYXBwZW5kQ2hpbGQocGFyZW50QVBJU2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY3JlYXRpbmcgYnV0dG9uIGluIG9yZGVyIHRvIGF0dGFjaCB0byBpbmRpdmlkdWFsIGFydGljbGVzLlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVBcGlCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlbWVtYmVyIFRoaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBcImFsbEJ1dHRvbnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHthcnRpY2xlQ291bnRlcn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc3R5bGU6IFwiICBib3JkZXI6IDA7IGxpbmUtaGVpZ2h0OjI7IHdpZHRoOjklOyBiYWNrZ3JvdW5kOnJnYig4MSwgNzgsIDc4KTsgY29sb3I6cmdiKCAxOTEsIDE2MiwgNDQpO2xpbmUtaGVpZ2h0OiAyOyBib3JkZXItcmFkaXVzOiAxMnB4O1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRXZlbnRsaXN0ZW5lciB0byBzZW5kIGN1cnJlbnQgZGF0YSB0byBzYXZlZnVuY3Rpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50QVBJU2VjdGlvbi5hcHBlbmRDaGlsZChzYXZlQXBpQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBzYXZlQXBpQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuZXdzTGlzdGVuZXIuc2F2ZUJ1dHRvbkxpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIG5ld3NDb250YWluZXIuYXBwZW5kQ2hpbGQoY3VycmVudEFydGljbGVzRGl2KVxyXG4gICAgICAgICAgICAgICAgLy9jYWxscyB0aGUgY3JlYXRvciB0byBtYWtlIHRoZSBTQVZFRCBBUlRJQ0xFUyBTZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBuZXdzLnNhdmVkTmV3c0VsZW1lbnRzQ3JlYXRvcigpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4vLyBtZXRob2QgZGlzcGxheXMgZnJpZW5kcyBuZXdzLlxyXG4gICAgZ2V0VXNlckZyaWVuZHNOZXdzKCkge1xyXG4gICAgICAgIC8vY3JlYXRlIGFycmF5IGFuZCBjYWxsIHRvIGdldCB1c2VyIGRhdGEuXHJcbiAgICAgICAgY29uc3QgZnJpZW5kSG9sZGVyID0gW107XHJcbiAgICAgICAgbGV0IGZyaWVuZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFydGljbGUxXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgICAgICAgICAgIGRhdGFTZXQ6IFwidXNlcnNcIixcclxuICAgICAgICAgICAgICAgIGZldGNoVHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIGVtYmVkSXRlbTogXCI/X2VtYmVkPWZyaWVuZHNcIlxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocGFyc2VkUmVzcG9uc2UgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZm9yIGxvb3AgdG8gcnVuIHRocm91Z2ggYXJyYXkgb2YgdXNlciBpbmZvLlxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWRSZXNwb25zZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcGFyc2VkUmVzcG9uc2VbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgc3RhdGVtZW50IHRvIGNjbXBhcmUgcmVzcG9uc2UgaWQgdG8gc2Vzc2lvbiBpZCBpbm9yZGVyIHRvIHNlZSBpZiB0aGUgbmV3cyBhcnRpY2xlIGlzIHRoZSB1c2VycyBvciBmcmllbmQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlkID09PSBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbm90IHRoZSB1c2VyIHRoZW4gbG9wIHRocm91Z2ggYXJyYXkgYW5kIHB1c2ggaWQncy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXNwb25zZS5mcmllbmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmcmllbmRzID0gcmVzcG9uc2UuZnJpZW5kc1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmllbmRIb2xkZXIucHVzaChmcmllbmRzLm90aGVyRnJpZW5kSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmNlIGZyaWVuZGhvbGRlciBhcnJheSBpcyBsb2FkZWQgbG9vcCB0aHJvdWdoIGFnYWluIHRvIGNvbXBhcmUgYWdhaW5zIHB1bGxlZCBkYXRhSXRlbXMgdGhhdCBoYXZlIGJlZW4gZmV0Y2hlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJpZW5kSG9sZGVyLmZvckVhY2goZnJpZW5kSWQgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNldDogXCJuZXdzSXRlbXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWRJdGVtOiBgP3VzZXJJZD0ke2ZyaWVuZElkfWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHBhcnNlZFJlc3BvbnNlID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnJpZW5kc0NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRSZXNwb25zZS5mb3JFYWNoKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxsIHRoZSBmdW5jdGlvbiB0aGF0IGJ1aWxkcyBET00gZWxlbWVudCBmb3Igc3RvcnkgYW5kIHBvc3RzIHRvIERPTS4gIEJlIHN1cmUgdGhhdCBmdW5jdGlvbiBpbmNsdWRlcyBkaXNwbGF5aW5nIGEgdXNlck5hbWUgdG8gZGluc3Rpbmd1aXNoIHVzZXIncyBzdG9yaWVzIGZyb20gZnJpZW5kcycgc3Rvcmllcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0aWNsZVNlY3Rpb25GcmllbmQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwic2VjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6IGBuZXdzQXJ0aWNsZUNvbnRhaW5lci0tJHtyZXNwb25zZS5pZH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmcmllbmRzSGVhZGVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJoM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogYCR7cmVzcG9uc2UudGl0bGV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBcIm5ld3NUaXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdzVVJMID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlc3BvbnNlLnVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBcIm5ld3NVUkxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBgJHtyZXNwb25zZS51cmx9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiYmxhbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpY2xlU2VjdGlvbkZyaWVuZC5hcHBlbmRDaGlsZChmcmllbmRzSGVhZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZVNlY3Rpb25GcmllbmQuYXBwZW5kQ2hpbGQobmV3c1VSTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyaWVuZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYXJ0aWNsZVNlY3Rpb25GcmllbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgc2F2ZWROZXdzRWxlbWVudHNDcmVhdG9yKCkge1xyXG4gICAgICAgIC8vQ3JlYXRlcyB0aGUgaGVhZGVyIGZvciB0aGUgc2F2ZWQgbmV3cyBhcnRpY2xlcy5cclxuICAgICAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblZlaW5cIilcclxuICAgICAgICBjb25zdCBtYWluU2F2ZWRDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJhcnRpY2xlXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcImFydGljbGUxXCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZTp7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogXCJib3JkZXItd2lkdGg6IHRoaW5cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKG1haW5TYXZlZENvbnRhaW5lcik7XHJcbiAgICAgICAgY29uc3Qgc2F2ZWRIZWFkZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJoMVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlNhdmVkIE5ld3NcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwic2F2ZWRIZWFkZXJcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJzYXZlZEhlYWRlclwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBtYWluU2F2ZWRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZWRIZWFkZXIpO1xyXG4gICAgICAgIGNvbnN0IHNhdmVSZWYgPSBcIlwiO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZXMgdGhlIG9iamVjdCB0aGF0IGlzIG5lZWRlZCB0byB1c2UgdGhlIGNyZWF0ZURvbUVsZW1lbnQgRmFjdG9yeS5cclxuICAgICAgICBsZXQgbmV3c0NyZWF0b3JLZXkgPSB7XHJcbiAgICAgICAgICAgIFwiZGF0YVNldFwiOiBcIm5ld3NJdGVtc1wiLFxyXG4gICAgICAgICAgICBcImZldGNoVHlwZVwiOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBcImVtYmVkSXRlbVwiOiBgP19lbWJlZD0ke3NhdmVSZWZ9YFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vTWFrZXMgdGhlIGNhbGwgdG8gdGhlIGRhdGEgZmFjdG9yeSB0byBmZXRjaC9nZXQgZGF0YSB0byBwdXQgaW4gdGhlIG9iamVjdC5cclxuICAgICAgICBub21hZERhdGEuY29ubmVjdFRvRGF0YShuZXdzQ3JlYXRvcktleSlcclxuICAgICAgICAgICAgLnRoZW4oZGJHcmFicyA9PiB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGJHcmFicy5mb3JFYWNoKGRiR3JhYiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvblNhdmVkQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwic2VjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzczogYG5ld3NBcnRpY2xlQ29udGFpbmVyLS0ke2RiR3JhYi5pZH1gXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYXZlZEhlYWRlciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImgzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGAke2RiR3JhYi50aXRsZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzczogXCJuZXdzVGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2F2ZWROZXdzVVJMID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkYkdyYWIudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzczogXCJuZXdzVVJMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6IGAke2RiR3JhYi51cmx9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogXCJibGFua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbEJ1dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiQURJT1NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6IFwiYWxsQnV0dG9uc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYG5ld3NEZWxldGVCdXR0b24tLSR7ZGJHcmFiLmlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvL2NyZWF0aW5nIGEgYnV0dG9uIGFuZCBwb2ludGluZyBhdCB0aGUgYXJ0aWNsZSB0byBkZWxldGUuIEF0dGFjaGVkIGV2ZW50IGxpc3RuZXIuXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uU2F2ZWRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZWRIZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25TYXZlZENvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlZE5ld3NVUkwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25TYXZlZENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxCdXRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsQnV0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG5ld3NMaXN0ZW5lci5kZWxldGVCdXR0b25MaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpblNhdmVkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb25TYXZlZENvbnRhaW5lcilcclxuICAgICAgICAgICAgICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKG1haW5TYXZlZENvbnRhaW5lcilcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIG5ld3MuZ2V0VXNlckZyaWVuZHNOZXdzKCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG5ld3MiLCJpbXBvcnQgbm9tYWREYXRhIGZyb20gXCIuL25vbWFkRGF0YVwiO1xyXG5pbXBvcnQgbmV3cyBmcm9tIFwiLi9uZXdzXCI7XHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBuZXdzTGlzdGVuZXIgPSB7XHJcblxyXG4gICAgc2F2ZUJ1dHRvbkxpc3RlbmVyKCkge1xyXG4gICAgICAgIC8vVGhpcyBpcyBmdW5jdGlvbmluZyBhbmQgd3JpdGluZyB0byBKU09OLiBOZWVkIHRvIGF0dGFjaCB0aGlzIHRvIHRoZSBzYXZlIGJ1dHRvbi5cclxuICAgICAgICBjb25zdCBzYXZlSUQgPSBldmVudC50YXJnZXQubmFtZTtcclxuICAgICAgICBsZXQgYXJ0VGl0bGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBhcnRpY2xlXyR7c2F2ZUlEfV90aXRsZWApO1xyXG4gICAgICAgIGxldCBhcnREZXNjcmlwdGlvbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYGFydGljbGVfJHtzYXZlSUR9X2Rlc2NgKTtcclxuICAgICAgICBsZXQgYXJ0aWNsZVVSTCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYGFydGljbGVfJHtzYXZlSUR9X3VybGApO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgY29uc3QgbmV3c09iamVjdFBvc3QgPSB7XHJcbiAgICAgICAgICAgIFwiZGF0YVNldFwiOiBcIm5ld3NJdGVtc1wiLFxyXG4gICAgICAgICAgICBcImZldGNoVHlwZVwiOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJykpLFxyXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogYCR7YXJ0aWNsZVVSTH1gLFxyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBgJHthcnRUaXRsZX1gLFxyXG4gICAgICAgICAgICAgICAgXCJzeW5vcHNpc1wiOiBgJHthcnREZXNjcmlwdGlvbn1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvblN0b3JhZ2UpXHJcbiAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEobmV3c09iamVjdFBvc3QpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24pXHJcbiAgICAgICAgICAgIC50aGVuKHNoaXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpdClcclxuICAgICAgICAgICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICBuZXdzLmdldEFQSU5ld3MoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUJ1dHRvbkxpc3RlbmVyKCkge1xyXG4gICAgICAgIC8vVG8gZGVsZXRlIGZyb20gc2F2ZWQgbmV3cyBhcnRpY2xlcy5cclxuICAgICAgICBjb25zdCBkZWxldGVJRCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xyXG4gICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZUlkOiBkZWxldGVJRCxcclxuICAgICAgICAgICAgICAgIGRhdGFTZXQ6IFwibmV3c0l0ZW1zXCIsXHJcbiAgICAgICAgICAgICAgICBmZXRjaFR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChcIi5hcnRpY2xlMVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIG5ld3Muc2F2ZWROZXdzRWxlbWVudHNDcmVhdG9yKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXdzTGlzdGVuZXIiLCJjb25zdCBub21hZERhdGEgPSB7XHJcblxyXG4gICAgY29ubmVjdFRvRGF0YShmZXRjaE9iamVjdCkge1xyXG5cclxuICAgICAgICBsZXQgZGF0YVNldCA9IGZldGNoT2JqZWN0LmRhdGFTZXQ7XHJcbiAgICAgICAgbGV0IGVtYmVkSXRlbSA9IGZldGNoT2JqZWN0LmVtYmVkSXRlbTtcclxuICAgICAgICBsZXQgZmV0Y2hUeXBlID0gZmV0Y2hPYmplY3QuZmV0Y2hUeXBlO1xyXG4gICAgICAgIGxldCBkYXRhQmFzZU9iamVjdCA9IGZldGNoT2JqZWN0LmRhdGFCYXNlT2JqZWN0O1xyXG4gICAgICAgIGxldCBwdXRJZCA9IGZldGNoT2JqZWN0LnB1dElkO1xyXG4gICAgICAgIGxldCBkZWxldGVJZCA9IGZldGNoT2JqZWN0LmRlbGV0ZUlkO1xyXG5cclxuICAgICAgICBpZiAoZmV0Y2hUeXBlID09IFwiR0VUXCIpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fSR7ZW1iZWRJdGVtfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChmZXRjaFR5cGUgPT09IFwiUE9TVFwiKXtcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCBvcHRpb25zIGFyZSBtYXJrZWQgd2l0aCAqXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBgJHtmZXRjaFR5cGV9YCwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICAvLyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyBuby1yZWZlcnJlciwgKmNsaWVudFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhQmFzZU9iamVjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYoZmV0Y2hUeXBlID09PSBcIlBVVFwiKXtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9LyR7cHV0SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IGAke2ZldGNoVHlwZX1gLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGFCYXNlT2JqZWN0KSwgLy8gYm9keSBkYXRhIHR5cGUgbXVzdCBtYXRjaCBcIkNvbnRlbnQtVHlwZVwiIGhlYWRlclxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIGlmIChmZXRjaFR5cGUgPT09IFwiREVMRVRFXCIpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9LyR7ZGVsZXRlSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IGAke2ZldGNoVHlwZX1gLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XHJcbiAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJZT1UgU0NSRVdFRCBJVCBVUFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbm9tYWREYXRhIiwiaW1wb3J0IG5vbWFkRGF0YSBmcm9tIFwiLi9ub21hZERhdGFcIjtcclxuaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50c1wiO1xyXG5pbXBvcnQgdGFza3NFdmVudExpc3RlbmVycyBmcm9tIFwiLi90YXNrc0V2ZW50TGlzdGVuZXJzXCI7XHJcbmltcG9ydCB0YXNrc1BvcHVwIGZyb20gXCIuL3Rhc2tzUG9wdXBcIjtcclxuLy8gaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCJcclxuXHJcbmNvbnN0IHRhc2tzID0ge1xyXG5cclxuICAgIGNyZWF0ZVRhc2tUYWJsZXMoKSB7XHJcbiAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKVxyXG4gICAgICAgIC8vbmVlZCB0byBnZXQgc2Vzc2lvbiBzdG9yYWdlIGJlZm9yZSBidWlsZGluZyB0YXNrcyBmb3JtIHVwb24gbG9nSW5cclxuICAgICAgICB0aGlzLmdldFRhc2tzKCk7XHJcbiAgICAgICAgbGV0IG91dHB1dEFydGljbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKVxyXG5cclxuICAgICAgICAvL2NyZWF0ZSBkaXNwbGF5IGNvbnRhaW5lclxyXG4gICAgICAgIGxldCB0YXNrc0NvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJzZWN0aW9uXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJ0YXNrc0NvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcInRhc2tzQ29udGFpbmVyXCJcclxuICAgICAgICAgICAgfX0pO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSB0YXNrcyB0YWJsZXNcclxuICAgICAgICBsZXQgYWN0aXZlVGFza3NUYWJsZSA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJ0YWJsZVwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwiYWN0aXZlVGFza3NUYWJsZVwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcImFjdGl2ZVRhc2tzVGFibGVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhY3RpdmVUYXNrc1RhYmxlVGl0bGUgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiY2FwdGlvblwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwiYWN0aXZlVGFza3NUYWJsZVRpdGxlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQgOiBcIkFDVElWRSBUQVNLU1wiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBjb21wbGV0ZWRUYXNrc1RhYmxlID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcInRhYmxlXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJjb21wbGV0ZWRUYXNrc1RhYmxlXCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IFwiY29tcGxldGVkVGFza3NUYWJsZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBsZXRlZFRhc2tzVGFibGVUaXRsZSA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJjYXB0aW9uXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJjb21wbGV0ZWRUYXNrc1RhYmxlVGl0bGVcIixcclxuICAgICAgICAgICAgY29udGVudCA6IFwiQ09NUExFVEVEIFRBU0tTXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL2NyZWF0ZSByb3cgd2l0aCBjb2x1bW4gaGVhZGVyc1xyXG4gICAgICAgIGxldCBhY3RpdmVUYXNrc0hlYWRlclJvdyA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJ0clwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwiYWN0aXZlVGFza3NIZWFkZXJSb3dcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJhY3RpdmVUYXNrc0hlYWRlclJvd1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBsZXRlZFRhc2tzSGVhZGVyUm93ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcInRyXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJjb21wbGV0ZWRUYXNrc0hlYWRlclJvd1wiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcImNvbXBsZXRlZFRhc2tzSGVhZGVyUm93XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSBjb2x1bW4gaGVhZGVyc1xyXG4gICAgICAgIGxldCBhY3RpdmVUYXNrc0hlYWRlciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJ0aFwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwiYWN0aXZlVGFza3NIZWFkZXJcIixcclxuICAgICAgICAgICAgY29udGVudDogXCJUYXNrXCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IFwiYWN0aXZlVGFza3NIZWFkZXJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhY3RpdmVUYXNrc0R1ZURhdGVIZWFkZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwidGhcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcImFjdGl2ZVRhc2tzRHVlRGF0ZUhlYWRlclwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIkR1ZSBEYXRlXCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IFwiYWN0aXZlVGFza3NEdWVEYXRlSGVhZGVyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBhY3RpdmVUYXNrc0VkaXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwidGhcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcImFjdGl2ZVRhc2tzRWRpdFwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcImFjdGl2ZVRhc2tzRWRpdFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBsZXRlZFRhc2tzSGVhZGVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcInRoXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJjb21wbGV0ZWRUYXNrc0hlYWRlclwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlRhc2tcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJjb21wbGV0ZWRUYXNrc0hlYWRlclwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBsZXRlZFRhc2tzRHVlRGF0ZUhlYWRlciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJ0aFwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwiY29tcGxldGVkVGFza3NEdWVEYXRlSGVhZGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiRHVlIERhdGVcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJjb21wbGV0ZWRUYXNrc0R1ZURhdGVIZWFkZXJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jcmVhdGUgYnV0dG9uIHRvIG1ha2UgbmV3IHRhc2tzXHJcbiAgICAgICAgbGV0IGNyZWF0ZVRhc2tCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJjcmVhdGVUYXNrQnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQgOiBcIkNyZWF0ZSBOZXcgVGFza1wiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcImNyZWF0ZVRhc2tCdXR0b25cIixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcImJ1dHRvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgY29tcGxldGVkVGFza3NFZGl0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcInRoXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJjb21wbGV0ZWRUYXNrc0VkaXRcIixcclxuICAgICAgICAgICAgY29udGVudDogXCJcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJjb21wbGV0ZWRUYXNrc0VkaXRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vYXBwZW5kIGhlYWRlciByb3cgdG8gdGFibGUgYW5kIHRhYmxlIHRvIGNvbnRhaW5lclxyXG4gICAgICAgIGFjdGl2ZVRhc2tzVGFibGUuYXBwZW5kQ2hpbGQoYWN0aXZlVGFza3NUYWJsZVRpdGxlKTtcclxuICAgICAgICBjb21wbGV0ZWRUYXNrc1RhYmxlLmFwcGVuZENoaWxkKGNvbXBsZXRlZFRhc2tzVGFibGVUaXRsZSk7XHJcbiAgICAgICAgYWN0aXZlVGFza3NIZWFkZXJSb3cuYXBwZW5kQ2hpbGQoYWN0aXZlVGFza3NIZWFkZXIpXHJcbiAgICAgICAgYWN0aXZlVGFza3NIZWFkZXJSb3cuYXBwZW5kQ2hpbGQoYWN0aXZlVGFza3NEdWVEYXRlSGVhZGVyKTtcclxuICAgICAgICBhY3RpdmVUYXNrc0hlYWRlclJvdy5hcHBlbmRDaGlsZChhY3RpdmVUYXNrc0VkaXQpO1xyXG4gICAgICAgIGFjdGl2ZVRhc2tzVGFibGUuYXBwZW5kQ2hpbGQoYWN0aXZlVGFza3NIZWFkZXJSb3cpO1xyXG4gICAgICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFjdGl2ZVRhc2tzVGFibGUpO1xyXG4gICAgICAgIGNvbXBsZXRlZFRhc2tzSGVhZGVyUm93LmFwcGVuZENoaWxkKGNvbXBsZXRlZFRhc2tzSGVhZGVyKVxyXG4gICAgICAgIGNvbXBsZXRlZFRhc2tzSGVhZGVyUm93LmFwcGVuZENoaWxkKGNvbXBsZXRlZFRhc2tzRHVlRGF0ZUhlYWRlcik7XHJcbiAgICAgICAgY29tcGxldGVkVGFza3NIZWFkZXJSb3cuYXBwZW5kQ2hpbGQoY29tcGxldGVkVGFza3NFZGl0KTtcclxuICAgICAgICBjb21wbGV0ZWRUYXNrc1RhYmxlLmFwcGVuZENoaWxkKGNvbXBsZXRlZFRhc2tzSGVhZGVyUm93KTtcclxuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wbGV0ZWRUYXNrc1RhYmxlKTtcclxuICAgICAgICBjcmVhdGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrc1BvcHVwLmNyZWF0ZU5ld1Rhc2tGb3JtKTtcclxuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnV0dG9uKTtcclxuICAgICAgICBvdXRwdXRBcnRpY2xlLmFwcGVuZENoaWxkKHRhc2tzQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFRhc2tzKCkge1xyXG5cclxuICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSk7XHJcbiAgICAgICAgLy9wb3B1bGF0ZSB0YXNrc1xyXG4gICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuXHJcbiAgICAgICAgICAgIGRhdGFTZXQgOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIGZldGNoVHlwZSA6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGVtYmVkSXRlbSA6IFwiP19lbWJlZD11c2Vyc1wiXHJcblxyXG4gICAgICAgIH0pLnRoZW4odGFza3MgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGFza3Muc29ydChmdW5jdGlvbihhLGIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGEuZXhwZWN0ZWRDb21wbGV0aW9uRGF0ZSkgLSBuZXcgRGF0ZShiLmV4cGVjdGVkQ29tcGxldGlvbkRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sudXNlcklkID09PSBjdXJyZW50VXNlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHRhc2suY29tcGxldGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlVGFza3NUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aXZlVGFza3NUYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wbGV0ZWRUYXNrc1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wbGV0ZWRUYXNrc1RhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHRhYmxlIHJvdyBmb3IgZWFjaCB0YXNrXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFza1JvdyA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcInRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3MgOiBcInRhc2tUYWJsZVJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkIDogYHRhc2tUYWJsZVJvd18ke3Rhc2suaWR9YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgY2VsbHMgdG8gaG9sZCB0YXNrIGFuZCBkdWUgZGF0ZVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tDZWxsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwidGRcIixcclxuICAgICAgICAgICAgICAgICAgICBjc3NDbGFzcyA6IFwidGFza0NlbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA6IGB0YXNrQ2VsbF8ke3Rhc2suaWR9YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGR1ZURhdGVDZWxsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwidGRcIixcclxuICAgICAgICAgICAgICAgICAgICBjc3NDbGFzcyA6IFwiZHVlRGF0ZUNlbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA6IGBkdWVEYXRlQ2VsbF8ke3Rhc2suaWR9YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tFZGl0Q2VsbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcInRkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3MgOiBcInRhc2tFZGl0Q2VsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkIDogYHRhc2tFZGl0Q2VsbF8ke3Rhc2suaWR9YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tFZGl0QnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3MgOiBcInRhc2tFZGl0QnV0dG9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFwiRWRpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkIDogYHRhc2tFZGl0QnV0dG9uXyR7dGFzay5pZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgdGFzayBjaGVja2JveCBhbmQgdGl0bGVcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJsYWJlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzIDogXCJ0YXNrTGFiZWxcIixcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA6IGB0YXNrTGFiZWxfJHt0YXNrLmlkfWBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgdGFzayB0aXRsZVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke3Rhc2sudGFza31gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSB0YXNrIGNoZWNrYm94XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFza0NoZWNrYm94ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiaW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjc3NDbGFzcyA6IFwidGFza0NoZWNrYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgOiBgdGFza0NoZWNrYm94XyR7dGFzay5pZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJjaGVja2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IGAke3Rhc2sudGFza31gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRhc2sgZHV0ZSBkYXRlXHJcbiAgICAgICAgICAgICAgICBsZXQgZHVlRGF0ZUFycmF5ID0gbmV3IERhdGUodGFzay5leHBlY3RlZENvbXBsZXRpb25EYXRlKS50b0RhdGVTdHJpbmcoKS5zcGxpdChcIiBcIilcclxuICAgICAgICAgICAgICAgIGxldCBkdWVEYXRlID0gYCR7ZHVlRGF0ZUFycmF5WzFdfSAke2R1ZURhdGVBcnJheVsyXX0gJHtkdWVEYXRlQXJyYXlbM119YFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFza0R1ZURhdGUgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3MgOiBcInRhc2tEdWVEYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IGR1ZURhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgOiBgdGFza0R1ZURhdGVfJHt0YXNrLmlkfWBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vYXBwZW5kIC0tIG9yZGVyIGlzIGltcG9ydGFudCBmb3IgY2hlY2tib3ggYW5kIGxhYmVsIHRvIGVuc3VyZSBib3ggaW4gb24gdGhlIGxlZnRcclxuICAgICAgICAgICAgICAgIHRhc2tDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRhc2tzRXZlbnRMaXN0ZW5lcnMubWFya1Rhc2tDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIHRhc2tFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrc0V2ZW50TGlzdGVuZXJzLnRhc2tFZGl0QnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgdGFza0xhYmVsLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7XHJcbiAgICAgICAgICAgICAgICB0YXNrTGFiZWwuYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcclxuICAgICAgICAgICAgICAgIHRhc2tDZWxsLmFwcGVuZENoaWxkKHRhc2tMYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBkdWVEYXRlQ2VsbC5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0YXNrRWRpdENlbGwuYXBwZW5kQ2hpbGQodGFza0VkaXRCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgdGFza1Jvdy5hcHBlbmRDaGlsZCh0YXNrQ2VsbCk7XHJcbiAgICAgICAgICAgICAgICB0YXNrUm93LmFwcGVuZENoaWxkKGR1ZURhdGVDZWxsKTtcclxuICAgICAgICAgICAgICAgIHRhc2tSb3cuYXBwZW5kQ2hpbGQodGFza0VkaXRDZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZFRhc2tzVGFibGUuYXBwZW5kQ2hpbGQodGFza1Jvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza0NoZWNrYm94LnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJcIilcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhc2tzVGFibGUuYXBwZW5kQ2hpbGQodGFza1Jvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcclxuIiwiaW1wb3J0IG5vbWFkRGF0YSBmcm9tIFwiLi9ub21hZERhdGFcIjtcclxuaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XHJcbmltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHNcIlxyXG5cclxuY29uc3QgdGFza3NFdmVudExpc3RlbmVycyA9IHtcclxuXHJcbiAgICBjcmVhdGVOZXdUYXNrKCkge1xyXG5cclxuICAgICAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrVGl0bGVJbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICBsZXQgZHVlRGF0ZUZpZWxkVmFsaXVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrRGF0ZUlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgIGxldCB1c2VySWQgPSBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJykpO1xyXG5cclxuICAgICAgICBsZXQgZHVlRGF0ZUFycmF5ID0gZHVlRGF0ZUZpZWxkVmFsaXVlLnNwbGl0KFwiLVwiKVxyXG4gICAgICAgIGxldCBkdWVEYXRlID0gYCR7ZHVlRGF0ZUFycmF5WzFdfSAke2R1ZURhdGVBcnJheVsyXX0gJHtkdWVEYXRlQXJyYXlbMF19YDtcclxuXHJcbiAgICAgICAgbm9tYWREYXRhLmNvbm5lY3RUb0RhdGEoe1xyXG5cclxuICAgICAgICAgICAgZGF0YVNldCA6IFwidGFza3NcIixcclxuICAgICAgICAgICAgZmV0Y2hUeXBlIDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0IDoge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkIDogdXNlcklkLFxyXG4gICAgICAgICAgICAgICAgdGFzayA6IHRhc2tUaXRsZSxcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkQ29tcGxldGlvbkRhdGUgOiBkdWVEYXRlLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGUgOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oc2hpdCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXQpXHJcbiAgICAgICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KClcclxuICAgICAgICAgICAgdGFza3MuY3JlYXRlVGFza1RhYmxlcygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG1hcmtUYXNrQ29tcGxldGUoKSB7XHJcbiAgICAgICAgbGV0IHRhc2tUb0VkaXRJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuXHJcbiAgICAgICAgICAgIGRhdGFTZXQgOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIGZldGNoVHlwZSA6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGVtYmVkSXRlbSA6IGA/JmlkPSR7dGFza1RvRWRpdElkfWBcclxuICAgICAgICB9KS50aGVuKHBhcnNlZFRhc2tzID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgdGFza0lkID0gcGFyc2VkVGFza3NbMF0uaWQ7XHJcbiAgICAgICAgICAgIGxldCB1c2VySWQgPSBwYXJzZWRUYXNrc1swXS51c2VySWQ7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gcGFyc2VkVGFza3NbMF0udGFzaztcclxuICAgICAgICAgICAgbGV0IGV4cGVjdGVkQ29tcGxldGlvbkRhdGUgPSBwYXJzZWRUYXNrc1swXS5leHBlY3RlZENvbXBsZXRpb25EYXRlO1xyXG4gICAgICAgICAgICBsZXQgY29tcGxldGUgPSBwYXJzZWRUYXNrc1swXS5jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tJZCwgdXNlcklkLCB0YXNrLCBleHBlY3RlZENvbXBsZXRpb25EYXRlLCBjb21wbGV0ZSlcclxuXHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuICAgICAgICAgICAgICAgIHB1dElkIDogdGFza1RvRWRpdElkLFxyXG4gICAgICAgICAgICAgICAgZGF0YVNldCA6IFwidGFza3NcIixcclxuICAgICAgICAgICAgICAgIGZldGNoVHlwZSA6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhQmFzZU9iamVjdCA6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGFza0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCA6IHVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICB0YXNrIDogdGFzayxcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3RlZENvbXBsZXRpb25EYXRlOiBleHBlY3RlZENvbXBsZXRpb25EYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKHNoaXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpdClcclxuICAgICAgICAgICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KClcclxuICAgICAgICAgICAgICAgIHRhc2tzLmNyZWF0ZVRhc2tUYWJsZXMoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHRhc2tFZGl0QnV0dG9uKCkge1xyXG5cclxuICAgICAgICBsZXQgbnVtYmVyID0gZXZlbnQuY3VycmVudFRhcmdldC5pZDtcclxuICAgICAgICBsZXQgdGFza0FycmF5ID0gbnVtYmVyLnNwbGl0KFwiX1wiKTtcclxuICAgICAgICBsZXQgdGFza0lkID0gdGFza0FycmF5WzFdO1xyXG5cclxuICAgICAgICBsZXQgdGFza0NlbGxUb0VtcHR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhc2tDZWxsXyR7dGFza0lkfWApO1xyXG4gICAgICAgIGxldCB0YXNrTGFibGVUb1JlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YXNrTGFiZWxfJHt0YXNrSWR9YCk7XHJcbiAgICAgICAgbGV0IGR1ZURhdGVDZWxsVG9FbXB0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkdWVEYXRlQ2VsbF8ke3Rhc2tJZH1gKTtcclxuICAgICAgICBsZXQgZHVlRGF0ZVRvUmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhc2tEdWVEYXRlXyR7dGFza0lkfWApO1xyXG4gICAgICAgIGxldCB0YXNrRWRpdENlbGxUb0VtcHR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhc2tFZGl0Q2VsbF8ke3Rhc2tJZH1gKTtcclxuICAgICAgICBsZXQgdGFza0VkaXRCdXR0b25Ub1JlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YXNrRWRpdEJ1dHRvbl8ke3Rhc2tJZH1gKTtcclxuXHJcbiAgICAgICAgbGV0IHRhc2tUb0VkaXRUZXh0ID0gdGFza0xhYmxlVG9SZW1vdmUuaW5uZXJUZXh0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tUb0VkaXRUZXh0KVxyXG5cclxuICAgICAgICBsZXQgdGFza1RvRWRpdFRpdGxlID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImlucHV0XCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJ0YXNrVG9FZGl0VGl0bGVcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogYHRhc2tUb0VkaXRUaXRsZV8ke3Rhc2tJZH1gLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgOiBgJHt0YXNrVG9FZGl0VGV4dH1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgdGFza0R1ZURhdGVUb0VkaXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiaW5wdXRcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcInRhc2tEdWVEYXRlVG9FZGl0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IGB0YXNrRHVlRGF0ZVRvRWRpdF8ke3Rhc2tJZH1gLFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6IFwiZGF0ZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgZWRpdGVkVGFza1N1Ym1pdEJ1dHRvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJidXR0b25cIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcImVkaXRlZFRhc2tTdWJtaXRCdXR0b25cIixcclxuICAgICAgICAgICAgY29udGVudCA6IFwiU3VibWl0XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IGBlZGl0ZWRUYXNrU3VibWl0QnV0dG9uXyR7bnVtYmVyfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJidXR0b25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGFza0NlbGxUb0VtcHR5LnJlbW92ZUNoaWxkKHRhc2tMYWJsZVRvUmVtb3ZlKTtcclxuICAgICAgICB0YXNrQ2VsbFRvRW1wdHkuYXBwZW5kQ2hpbGQodGFza1RvRWRpdFRpdGxlKVxyXG4gICAgICAgIGR1ZURhdGVDZWxsVG9FbXB0eS5yZW1vdmVDaGlsZChkdWVEYXRlVG9SZW1vdmUpO1xyXG4gICAgICAgIGR1ZURhdGVDZWxsVG9FbXB0eS5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZVRvRWRpdCk7XHJcbiAgICAgICAgdGFza0VkaXRDZWxsVG9FbXB0eS5yZW1vdmVDaGlsZCh0YXNrRWRpdEJ1dHRvblRvUmVtb3ZlKTtcclxuICAgICAgICB0YXNrRWRpdENlbGxUb0VtcHR5LmFwcGVuZENoaWxkKGVkaXRlZFRhc2tTdWJtaXRCdXR0b24pO1xyXG4gICAgICAgIGVkaXRlZFRhc2tTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tzRXZlbnRMaXN0ZW5lcnMuc2F2ZVRhc2tFZGl0KVxyXG5cclxuICAgIH0sXHJcbiAgICBzYXZlVGFza0VkaXQoKSB7XHJcbiAgICAgICAgbGV0IHRhc2tOdW1iZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0LmlkO1xyXG4gICAgICAgIGxldCB0YXNrQXJyYXkgPSB0YXNrTnVtYmVyLnNwbGl0KFwiX1wiKTtcclxuICAgICAgICBsZXQgdGFza0lkID0gdGFza0FycmF5WzJdO1xyXG4gICAgICAgIGxldCB0YXNrRWRpdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhc2tUb0VkaXRUaXRsZV8ke3Rhc2tJZH1gKS52YWx1ZTtcclxuICAgICAgICBsZXQgdGFza0VkaXREYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhc2tEdWVEYXRlVG9FZGl0XyR7dGFza0lkfWApLnZhbHVlO1xyXG5cclxuICAgICAgICBsZXQgZHVlRGF0ZUFycmF5ID0gdGFza0VkaXREYXRlLnNwbGl0KFwiLVwiKVxyXG4gICAgICAgIGxldCBkdWVEYXRlID0gYCR7ZHVlRGF0ZUFycmF5WzFdfSAke2R1ZURhdGVBcnJheVsyXX0gJHtkdWVEYXRlQXJyYXlbMF19YDtcclxuXHJcblxyXG4gICAgICAgIG5vbWFkRGF0YS5jb25uZWN0VG9EYXRhKHtcclxuXHJcbiAgICAgICAgICAgIHB1dElkIDogdGFza0lkLFxyXG4gICAgICAgICAgICBkYXRhU2V0IDogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICBmZXRjaFR5cGUgOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBkYXRhQmFzZU9iamVjdCA6IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZCA6IE51bWJlcihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpKSxcclxuICAgICAgICAgICAgICAgIHRhc2s6IHRhc2tFZGl0SW5wdXQsXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZENvbXBsZXRpb25EYXRlOiBkdWVEYXRlLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGUgOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihzaGl0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2hpdClcclxuICAgICAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcclxuICAgICAgICAgICAgdGFza3MuY3JlYXRlVGFza1RhYmxlcygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgdGFza3NFdmVudExpc3RlbmVyczsiLCJpbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCI7XHJcbmltcG9ydCB0YXNrc0V2ZW50TGlzdGVuZXJzIGZyb20gXCIuL3Rhc2tzRXZlbnRMaXN0ZW5lcnNcIjtcclxuXHJcbmNvbnN0IHRhc2tzUG9wdXAgPSB7XHJcblxyXG4gICAgY3JlYXRlTmV3VGFza0Zvcm0oKSB7XHJcbiAgICAgICAgbGV0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrc0NvbnRhaW5lclwiKTtcclxuICAgICAgICBsZXQgdGFza1BvcHVwRGl2ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImRpdlwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwidGFza1BvcHVwRGl2XCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IFwidGFza1BvcHVwRGl2XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbmV3VGFza0Zvcm0gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiZGl2XCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJuZXdUYXNrRm9ybVwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcIm5ld1Rhc2tGb3JtXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1Rhc2tGb3JtVGl0bGUgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiaDJcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcIm5ld1Rhc2tGb3JtVGl0bGVcIixcclxuICAgICAgICAgICAgY29udGVudCA6IFwiQ3JlYXRlIEEgTmV3IFRhc2tcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJuZXdUYXNrRm9ybVRpdGxlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgaG9yaXpvbnRhbExpbmUgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQgKHtcclxuICAgICAgICAgICAgZWxlbWVudFR5cGUgOiBcImhyXCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRhc2tUaXRsZUlucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50ICh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlIDogXCJpbnB1dFwiLFxyXG4gICAgICAgICAgICBjc3NDbGFzcyA6IFwidGFza1RpdGxlSW5wdXRcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJ0YXNrVGl0bGVJbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgOiBcIkVudGVyIG5ldyB0YXNrIHRpdGxlXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJ0ZXh0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdGFza0RhdGVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCAoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiaW5wdXRcIixcclxuICAgICAgICAgICAgY3NzQ2xhc3MgOiBcInRhc2tEYXRlSW5wdXRcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgIGlkIDogXCJ0YXNrRGF0ZUlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJkYXRlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc3VibWl0TmV3VGFza0J1dHRvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCAoe1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZSA6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzIDogXCJzdWJtaXROZXdUYXNrQnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQgOiBcIlN1Ym1pdFwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBcInN1Ym1pdE5ld1Rhc2tCdXR0b25cIixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcImJ1dHRvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3VibWl0TmV3VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza3NFdmVudExpc3RlbmVycy5jcmVhdGVOZXdUYXNrKVxyXG4gICAgICAgIG5ld1Rhc2tGb3JtLmFwcGVuZENoaWxkKG5ld1Rhc2tGb3JtVGl0bGUpO1xyXG4gICAgICAgIG5ld1Rhc2tGb3JtLmFwcGVuZENoaWxkKGhvcml6b250YWxMaW5lKTtcclxuICAgICAgICBuZXdUYXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrVGl0bGVJbnB1dCk7XHJcbiAgICAgICAgbmV3VGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0RhdGVJbnB1dCk7XHJcbiAgICAgICAgbmV3VGFza0Zvcm0uYXBwZW5kQ2hpbGQoc3VibWl0TmV3VGFza0J1dHRvbik7XHJcbiAgICAgICAgdGFza1BvcHVwRGl2LmFwcGVuZENoaWxkKG5ld1Rhc2tGb3JtKTtcclxuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUG9wdXBEaXYpO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCB0YXNrc1BvcHVwOyJdfQ==
