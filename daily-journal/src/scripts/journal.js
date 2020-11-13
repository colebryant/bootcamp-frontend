// This module provides functionality to the journal: calling the functions which render the DOM, handle the save button, filter the entries

import data from "./data";
import domBuilder from "./domBuilder";

const journal = {
    journalify() {
        domBuilder.renderForm();
        data.getJournalEntries()
        .then(entries => {
            const entryLog = $(".entryLog");

            while (entryLog.firstChild) {
                entryLog.removeChild(entryLog.firstChild);
            };
            domBuilder.renderJournalEntries(entries);
        });
    },
    handleSaveButton() {
        const journalDate = $("#journalDate").val();
        const conceptsCovered = $("#conceptsCovered").val();
        const journalEntry = $("#journalEntry").val();
        const moodChoice = $("#moodForDay").val();

        let journalObject = {
            date: journalDate,
            concept: conceptsCovered,
            entry: journalEntry,
            mood: moodChoice
        };

        data.postJournalEntry(journalObject)
        .then( () => {
            this.journalify();
        });
    },
    handleRadioFilter() {
        const radioButtons = $("[name='filter']");
        radioButtons.each(button => {
            button.click( () => {
                let moodChoice = event.target.value;
                data.getJournalEntries()
                .then(entries => {
                    const filteredEntries = entries.filter(entry => {
                        const choice = (entry.mood === moodChoice);
                        return choice;
                    });
                    const section = $(".entryLog");
                    section.innerHTML = "";
                    domBuilder.renderJournalEntries(filteredEntries);
        });
            });
        });
    }
};


export default journal;
