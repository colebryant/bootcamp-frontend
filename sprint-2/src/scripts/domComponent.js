
const domComponents = {
    createDomElement({ elementType, content = null, cssClass = '', attributes = {} }) {
      const element = document.createElement(elementType);
      element.textContent = content;
      
      if (cssClass) {
        element.classList.add(cssClass);
      }

      if (elementType === "button" && content === "Save") {
        element.addEventListener("click", eventListeners.saveButton)
      };

      if(elementType === "button" && content === "cancel") {
        element.addEventListener("click", eventListeners.clearSearchReults)
      }



      for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
      return element;
    },

    createResourcesDocumentFragments(resultsArray) {
      // console.log(resultsArray.length);
      const homeDiv = document.getElementById("display-container")
      let searchResultContainer = this.createDomElement({
        elementType: "div",
        content: "YOUR SEARCH RESULTS ARE: ",
        cssClass: "search-result-box",
      });
      homeDiv.appendChild(searchResultContainer);
      let domFrag = document.createDocumentFragment();
      
      domFrag.appendChild(this.createDomElement({
        elementType: 'button',
        content: "Cancel",
        attributes: {
          id: "clear-search-results"
        },
      }));
      for (let i = 0; i < resultsArray.length-1; i++) {
        let itemClass = resultsArray[0];
        domFrag.appendChild(this.createDomElement({
          elementType: "li",
          cssClass: `${itemClass}-result${i}`,
          content: resultsArray[i+1],
        }));
        domFrag.appendChild(this.createDomElement({
          elementType: "button",
          content: "Save",
          cssClass: `${itemClass}-result${i}`,
        }));
        
      };
      // console.log(domFrag);
      searchResultContainer.appendChild(domFrag);
      return domFrag;
    },

      
      appendIteneraryFragments (savedResult) {
      let itineraryFrag = document.createDocumentFragment();
      let itineraryDiv = document.getElementById("itinerary-container");
      console.log(`Result text to be saved:  ${savedResult}`)
      itineraryFrag.appendChild(this.createDomElement({
          elementType: "div",
          content: `${savedResult}`
          }));
        itineraryDiv.appendChild(itineraryFrag);
        }
};
