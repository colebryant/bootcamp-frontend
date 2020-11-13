domBuilder.appendInputForm();
domBuilder.appendDropDown();
let legoBtn = document.querySelector(".lego__save");
// console.log(legoBtn);
legoBtn.addEventListener("click", eventListeners.handleFormSubmission);