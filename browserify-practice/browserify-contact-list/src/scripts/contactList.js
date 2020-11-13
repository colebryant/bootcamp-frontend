// Component that displays all contacts. It should import the Contact component and the ContactCollection component.

import contactCollection from "./contactCollection";
import contact from "./contact";

const contactList = {
    contactify() {
        contactCollection.getAllContacts()
        .then(parsedResponse => {
            let contactFragment = document.createDocumentFragment();
            parsedResponse.forEach(contactItem => {
                let contactToAppend = contact.contactBuilder(contactItem);
                contactFragment.appendChild(contactToAppend);
            });
        const outputArticle = document.querySelector(".output");
        outputArticle.appendChild(contactFragment);
        });
    }
};

export default contactList;