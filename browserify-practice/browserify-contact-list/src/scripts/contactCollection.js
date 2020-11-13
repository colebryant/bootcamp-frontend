// Component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.

const contactCollection = {
    getAllContacts() {
        return fetch("http://localhost:8088/contacts")
            .then(response => response.json());
    },
    saveAContact(contactInfo) {
        return fetch("http://localhost:8088/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactInfo)
        })
        .then(response => response.json());
    }
};

export default contactCollection;