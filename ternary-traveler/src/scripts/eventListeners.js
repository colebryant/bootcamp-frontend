import data from "./data";
import domBuilder from "./domBuilder";

// The purpose of this module is to create all the event listeners functions to be used in the app

const eventListeners = {
    handleSaveButton() {
        const nameInputted = $("#pointName").val();
        const descriptionInputted = $("#pointDescription").val();
        const costInputted = $("#pointCost").val();
        const locationSelected = $("#pointLocation").val();

        data.fetchRequest({
            dataSet: "places",
            fetchType: "GET",
        })
        .then(locations => {
            locations.forEach(location => {
                if (location.name === locationSelected) {
                    data.fetchRequest({
                        dataSet: "interests",
                        fetchType: "POST",
                        databaseObject: {
                            placeId: location.id,
                            name: nameInputted,
                            description: descriptionInputted,
                            cost: costInputted,
                            review: "",
                        }
                    })
                    .then( () => {
                        domBuilder.appendPointCards();
                    });
                };
            });
        });
    },
    handleDeleteButton() {
        const currentContainerId = event.target.parentNode.id.split("--")[1];
        const confirmationModal = domBuilder.createConfirmationPopup(currentContainerId);
        $("#output").append(confirmationModal);
    },
    handleConfirmButton() {
        const idToDelete = event.target.parentNode.id.split("--")[1];
        const currentContainerId = event.target.parentNode.id;
        data.fetchRequest({
            dataSet: "interests",
            fetchType: "DELETE",
            specificId: idToDelete
        })
        .then( () => {
            domBuilder.appendPointCards();
            $(`#${currentContainerId}`).remove();
        });
    },
    handleDenyButton() {
        const currentContainerId = event.target.parentNode.id;
        $(`#${currentContainerId}`).remove();
    },
    handleEditButton() {
        const idToEdit = event.target.parentNode.id.split("--")[1];
        data.fetchRequest({
            dataSet: "interests",
            fetchType: "GET",
            specificId: idToEdit
        })
        .then(interest => {
            domBuilder.createEditForm(idToEdit, interest);
        });
    },
    handleSubmitButton() {
        const currentEditId = event.target.parentNode.id.split("--")[1];
        data.fetchRequest({
            dataSet: "interests",
            fetchType: "GET",
            specificId: currentEditId
        })
        .then(interest => {
            data.fetchRequest({
                dataSet: "interests",
                fetchType: "PUT",
                specificId: currentEditId,
                databaseObject: {
                    id: interest.id,
                    placeid: interest.placeId,
                    name: interest.name,
                    description: interest.description,
                    cost: $(`#pointCostEdit--${currentEditId}`).val(),
                    review: $(`#pointReviewEdit--${currentEditId}`).val()
                }
            })
            .then( () => {
                domBuilder.appendPointCards();
            });
        });
    }
};

export default eventListeners;