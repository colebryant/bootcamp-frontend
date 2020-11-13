// This module is responsible for creating the DOM components
import journal from "./journal";

const domComponent = {
    makeFormComponent () {
        const output = $("#output");

        $("<h1>").text("Daily Journal").appendTo(output);
        const formContainer = $("<form>").appendTo(output);

        $("<fieldset>").append($("<label>", {for: "journalDate"}).text("Date of Entry"))
        .append($("<input>", {type: "date", name: "journalDate", id: "journalDate"}))
        .appendTo(formContainer);

        $("<fieldset>").append($("<label>", {for: "conceptsCovered"}).text("Concepts Covered"))
        .append($("<input>", {type: "text", name: "conceptsCovered", id: "conceptsCovered"}))
        .appendTo(formContainer);

        $("<fieldset>").append($("<label>", {for: "journalEntry"}).text("Journal Entry"))
        .append($("<textarea>", {type: "text", name: "journalEntry", wrap: "soft", id: "journalEntry"}))
        .appendTo(formContainer);

        $("<fieldset>").append($("<label>", {for: "moodForDay"}).text("Mood for the Day"))
        .append($("<select>", {name: "moodForDay", id: "moodForDay"})
            .append($("<option>", {value: "Happy"}).text("Happy"))
            .append($("<option>", {value: "Sad"}).text("Sad"))
            .append($("<option>", {value: "Ecstatic"}).text("Ecstatic"))
            .append($("<option>", {value: "Miserable"}).text("Miserable"))
        )
        .appendTo(formContainer);

        $("<button>", {type: "button", id: "saveButton"}).text("Record Journal Entry").click( () => journal.handleSaveButton)
        .appendTo(formContainer);

        $("<fieldset>").append($("<legend>").text("Filter Journal Entries by Mood"))
        .append($("<div>", {id: "radio"})
            .append($("<div>")
                .append($("<input>", {type: "radio", name: "filter", value: "Happy"}))
                .append($("<label>").text("Happy"))
            )
            .append($("<div>")
                .append($("<input>", {type: "radio", name: "filter", value: "Sad"}))
                .append($("<label>").text("Sad"))
            )
            .append($("<div>")
                .append($("<input>", {type: "radio", name: "filter", value: "Ecstatic"}))
                .append($("<label>").text("Ecstatic"))
            )
            .append($("<div>")
                .append($("<input>", {type: "radio", name: "filter", value: "Miserable"}))
                .append($("<label>").text("Miserable"))
            )
        )
        .appendTo(formContainer);
    },
    makeJournalEntryComponent (entry) {
        const div = $("<div>").append($("<h2>").text(entry.concept))
        .append($("<p>").text(entry.entry))
        .append($("<p>").text(`Date of Entry: ${entry.date}`))
        .append($("<p>").text(`Mood for the Day: ${entry.mood}`));

        return div;
    }
};

export default domComponent;
