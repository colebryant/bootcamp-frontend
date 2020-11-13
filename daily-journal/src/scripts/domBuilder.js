// This module, when called, is responsible for appending the form in addition to rendering the journal entries and attaching them to the entry log section of the DOM

import domComponent from "./domComponent";

const domBuilder = {
    renderForm () {
        domComponent.makeFormComponent();
    },
    renderJournalEntries (entries) {
        entries.forEach(entry => {
            const sectionComponent = domComponent.makeJournalEntryComponent(entry);
            $("#entryLog").append(sectionComponent);
        });
    }
};

export default domBuilder;