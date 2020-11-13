// The purpose of this module is
import data from "./data";
import eventListeners from "./eventListeners";

const domBuilder = {
    createInputForm () {
        const output = $("#output");
        const formContainer = $("<form>").addClass("formContainer").appendTo(output);
        $("<section>", {id: "cardsContainer"}).appendTo(output);

        $("<h2>").text("Enter A New Point of Interest").appendTo(formContainer);

        $("<fieldset>").append($("<label>", {for: "pointName"}).text("Name:"))
        .append($("<input>", {type: "text", name: "pointName", id: "pointName"}))
        .appendTo(formContainer);

        $("<fieldset>").append($("<label>", {for: "pointDescription"}).text("Description:"))
        .append($("<textarea>", {type: "text", name: "pointDescription", wrap: "soft", id: "pointDescription"}))
        .appendTo(formContainer);

        $("<fieldset>").append($("<label>", {for: "pointCost"}).text("Cost of Visiting:"))
        .append($("<input>", {type: "text", name: "pointCost", id: "pointCost"}))
        .appendTo(formContainer);

        const dropdownContainer = $("<fieldset>").append($("<label>", {for: "pointLocation"}).text("Select Location:"))
        .appendTo(formContainer);

        const dropdownSelect = $("<select>", {name: "pointLocation", id: "pointLocation"})
        .appendTo(dropdownContainer);

        data.fetchRequest({
            dataSet: "places",
            fetchType: "GET",
        })
        .then(locations => {
            locations.forEach(location => {
                $("<option>", {value: location.name}).text(location.name)
                .appendTo(dropdownSelect);
            });
        });

        $("<button>", {id: "saveButton"}).text("Save").click(eventListeners.handleSaveButton).appendTo(formContainer);

    },
    createPointCard(pointObject) {
        const pointContainer = $("<article>", {id: `pointCard--${pointObject.id}`}).addClass("pointCard");
        $("<h3>").text(pointObject.name).appendTo(pointContainer);
        $("<p>").text(`Description: ${pointObject.description}`).appendTo(pointContainer);
        $("<p>").text(`Cost of Visiting: ${pointObject.cost}`).appendTo(pointContainer);
        $("<p>").text(`Review: ${pointObject.review}`).appendTo(pointContainer);
        $("<button>", {id: "deleteButton"}).text("Delete").click(eventListeners.handleDeleteButton).appendTo(pointContainer);
        $("<button>", {id: "editButton"}).text("Edit").click(eventListeners.handleEditButton).appendTo(pointContainer);

        return pointContainer;
    },
    createEditForm(containerId, pointObject) {
        const editContainer = $("<form>", {id: `pointEdit--${containerId}`}).addClass("pointEdit");
        $("<h3>").text(pointObject.name).appendTo(editContainer);

        $("<fieldset>").append($("<label>", {for: "pointCostEdit"}).text("Edit Cost:"))
        .append($("<input>", {type: "text", name: "pointCostEdit", id: `pointCostEdit--${containerId}`}).val(pointObject.cost))
        .appendTo(editContainer);

        $("<fieldset>").append($("<label>", {for: "pointReviewEdit"}).text("Add/Edit the Review:"))
        .append($("<textarea>", {type: "text", name: "pointReviewEdit", wrap: "soft", id: `pointReviewEdit--${containerId}`}).val(pointObject.review))
        .appendTo(editContainer);

        $("<button>", {id: "submitButton"}).text("Submit").click(eventListeners.handleSubmitButton).appendTo(editContainer);

        const currentContainer = $(`#pointCard--${containerId}`);
        currentContainer.empty();
        currentContainer.append(editContainer);
    },
    createConfirmationPopup(containerId) {
        const popupContainer = $("<section>", {id: `popupContainer--${containerId}`}).addClass("popupContainer").append($("<p>").text("Are you sure you want to delete this card?"))
        .append($("<button>", {id: "confirmButton"}).text("Yes").click(eventListeners.handleConfirmButton))
        .append($("<button>", {id: "denyButton"}).text("No").click(eventListeners.handleDenyButton));

        return popupContainer;
    },
    appendPointCards() {
        $("#cardsContainer").empty();
        data.fetchRequest({
            dataSet: "interests",
            fetchType: "GET",
        })
        .then(points => {
            points.forEach(point => {
                const pointCard = this.createPointCard(point);
                $("#cardsContainer").append(pointCard);
            });
        });
    }
};

export default domBuilder;