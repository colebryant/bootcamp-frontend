const domBuilder = {
    appendInputForm () {
        let inputForm = `<article>
        <fieldset>
        <label for="lego__creator">Creator:</label>
        <input id="lego__creator" name="lego__creator" type="text" autofocus />
        </fieldset>
        <fieldset>
        <label for="lego__name">Name:</label>
        <input id="lego__name" name="lego__name" type="text" autofocus />
        </fieldset>
        <fieldset>
        <label for="lego__shape">Shape:</label>
        <input id="lego__shape" name="lego__shape" type="text" autofocus />
        </fieldset>
        <button class="btn lego__save">Save Lego Creation</button>
        </article>`;

        let displayContainer = document.querySelector("#display-container");
        displayContainer.innerHTML = inputForm;

        // let newButton = document.createElement("button");
        // newButton.addEventListener("click", eventListeners.handleFormSubmission);
        // console.log(newButton);
        // displayContainer.appendChild(newButton);
    },
    appendDropDown () {
        let selectElement = document.createElement("label");
        selectElement.textContent = "Color:";

        let select = document.createElement("select");
        select.setAttribute("id", "lego__color");
        for (let i = 1; i < 7; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", `${i}`);
            if (i === 1) {
                option.textContent = "Red";
            } else if (i === 2) {
                option.textContent = "Green";
            } else if (i === 3) {
                option.textContent = "Yellow";
            } else if (i === 4) {
                option.textContent = "Blue";
            } else if (i === 5) {
                option.textContent = "Orange";
            } else {
                option.textContent = "Black";
            }
        select.appendChild(option);
        };
        selectElement.appendChild(select);


        let article = document.querySelector("article");
        let fieldsetToAppend = document.querySelectorAll("fieldset")[2];
        article.insertBefore(selectElement, fieldsetToAppend.nextSibling);
    }
};