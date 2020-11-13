// Component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.

import contactCollection from "./contactCollection";

const contactForm = {
    createDomElement({elementType, content = null, attributes = {} }) {
        const element = document.createElement(elementType);
        element.textContent = content;
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        };
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
        contactCollection.saveAContact(newContact);
    }
};

export default contactForm;