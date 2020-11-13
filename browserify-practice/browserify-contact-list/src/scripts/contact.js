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

export default contact;