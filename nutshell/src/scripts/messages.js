import nomadData from "./nomadData";
import domComponents from "./domComponents";
import messagesEventListeners from "./messagesEventListeners";
import friendsEventsListener from "./friendsEventsListener.js";

const messages = {

    createMessageBoard() {
        $("#output").empty()

        let outputArticle = document.getElementById("output")

        //create display container
        let messagesContainer = domComponents.createDomElement({
            elementType : "section",
            cssClass : "messagesContainer",
            attributes : {
                id : "messagesContainer"
            }});

        //create message input field
        let messageInput = domComponents.createDomElement({
            elementType : "input",
            cssClass : "messageInput",
            attributes : {
                id : "messageInput",
                placeholder: "Enter Message Here"
            }});

        //create submit button for input field
        let messageSubmitButton = domComponents.createDomElement({
            elementType : "button",
            cssClass : "messageSubmitButton",
            content : "Submit",
            attributes : {
                id : "messageSubmitButton",
                type : "button"
            }});

        messageSubmitButton.addEventListener("click", messagesEventListeners.postNewMessage, {once: true});
        messagesContainer.appendChild(messageInput);
        messagesContainer.appendChild(messageSubmitButton);
        outputArticle.appendChild(messagesContainer);

            this.getMessages()
    },

    getMessages() {

        //GET fetch & .then to build object(s) for createDomElement() using _expand to display UN: message
        nomadData.connectToData({

                dataSet : "messages",
                fetchType : "GET",
                embedItem : "?_expand=user"

        }).then(messages => {

            let messageContainer = document.getElementById("messagesContainer");
            let messageInput = document.getElementById("messageInput");

            //sort messages by timeStamp
            messages.sort(function(a,b){
                return new Date(a.timeStamp) - new Date(b.timeStamp);
            });

            //build DOM Component for each message and append
            messages.forEach(message => {
                console.log(message)
                let messageText = message.message;
                let userName = message.user.userName;
                let messageId = message.id;
                let messageTimeStamp = message.timeStamp;
                let messageUser = `${message.userId}`;
                let loggedInUser = sessionStorage.getItem("userId");

                let messageDiv = domComponents.createDomElement({
                    elementType : "div",
                    cssClass : "messageDiv",
                    attributes : {
                        id : `messageDiv_${messageId}`
                    }
                })

                let messageElement = domComponents.createDomElement({
                    // ADD LINK HERE
                    elementType : "h3",
                    cssClass : "messageUserName",
                    content : `${userName}:`,
                    attributes : {
                        id: `message${messageId}`,
                        name: parseInt(messageUser)
                    }
                })

                let messageElement2 = domComponents.createDomElement({
                    elementType : "p",
                    cssClass : "messageText",
                    content : `${messageText}`,
                    attributes : {
                        id: messageId
                    }
                })
                if (messageUser === loggedInUser) {

                    let messageEditButton = domComponents.createDomElement({

                        elementType : "button",
                        cssClass : "messageEditButton",
                        content : "Edit",
                        attributes : {
                            id: `messageEditButton_${messageId}`,
                            name: messageTimeStamp,
                            type : "button"
                        }
                    })
                    messageEditButton.addEventListener("click", messagesEventListeners.editMessage, {once: true})
                    messageDiv.appendChild(messageElement)
                    messageElement.appendChild(messageElement2)
                    messageDiv.appendChild(messageEditButton)
                    messageContainer.insertBefore(messageDiv, messageInput)
                } else {

                    messageElement.appendChild(messageElement2)
                    messageContainer.insertBefore(messageElement, messageInput)
                }
                messageElement.addEventListener("click", friendsEventsListener.shiz)
            });
        })
    },
}

export default messages;
