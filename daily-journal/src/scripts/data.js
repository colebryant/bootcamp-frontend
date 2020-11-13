// This module is responsible for all data fetches to the json database

const data = {
    getJournalEntries () {
        return fetch("http://localhost:8088/journalEntries", {
            headers: {
                "Cache-Control": "private"
            }
        })
            .then(response => response.json());
    },
    postJournalEntry (entryToPost) {
        return fetch("http://localhost:8088/journalEntries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryToPost)
        })
    }
};

export default data;