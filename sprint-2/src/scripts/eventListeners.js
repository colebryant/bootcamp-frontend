const eventListeners = {
  handleButton (classname) {
    switch (classname) {
      case "concert":
        let concertsSearchInput = document.querySelector(`input[class='${classname}']`);  
        let concertSearchButtonCall = concertsSearchInput.value;
        concertsSearchInput.value = "";
        concertsFetch(concertSearchButtonCall);
        break;
      case "restaurants":
        let restaurantsSearchInput = document.querySelector(`input[class='${classname}']`);  
        let restaurantsSearchButtonCall = restaurantsSearchInput.value;
        restaurantsSearchInput.value = "";
        restarauntFetch(restaurantsSearchButtonCall);
        break;
      case "meetups":
        let meetupsSearchInput = document.querySelector(`input[class='${classname}']`);  
        let meetupsSearchButtonCall = meetupsSearchInput.value;
        meetupsSearchInput.value = "";
        meetupsObject.meetUpsFetch(meetupsSearchButtonCall);
        break;
      case "parks":
        var e = document.getElementById("park-selection");
        var text = e.options[e.selectedIndex].text;
        console.log(classname);
        
        let keyArray = ["dog_park","hiking_trails", "basketball_courts", "volleyball", "lake", "baseball_fields", "picnic_shelters"];
  
        for (let i = 0; i < parkTypes.length; i++) {
          if (text === parkTypes[i]) {
            text = keyArray[i]
            parksFetch(text);
          }
        }
        break;
      default:
        break;
    }
  },
 
  saveButton(classname) {
    let elementToRemove = document.querySelector(".search-result-box");
    let saveContentPointer = classname.target.className;
    let chosenContentForItinerary = document.querySelector(`li[class='${saveContentPointer}']`)
    let savedContent = chosenContentForItinerary.textContent;
    let contentType = saveContentPointer.split("-")[0];
    let concatString = "";
    
    switch (contentType) {
      case "restaurants":
        concatString = `Restaurant: ${savedContent} `
        break;
      case "parks":
        concatString = `Park: ${savedContent} `
        break;
      case "meetups":
        concatString = `Meetup: ${savedContent} `
        break;
      case "concerts":
        concatString = `Concert: ${savedContent}`
        
        break;
      default:
        break;
    }
    domComponents.appendIteneraryFragments(concatString);
    elementToRemove.parentNode.removeChild(elementToRemove);
  },
  clearItineraryButton(){
    let clearItineraryContainer = document.getElementById("itinerary-container");
    clearItineraryContainer.textContent = "YOUR ITINERARY SELECTIONS ARE "
    domBuilder.itineraryButtonBuilder();
  },
  storeItineraryButton(){
    let storeItinerary = document.getElementById("itinerary-container")
    let storedData = storeItinerary.textContent
    let itineraryObject = {itinerary: storedData};
    // const myJson = JSON.stringify(itineraryObject);
    data.postData(itineraryObject);
    storeItinerary.textContent = "YOUR ITINERARY SELECTIONS ARE "
    domBuilder.itineraryButtonBuilder();
  },
  clearSearchReults(){
    let goodByeSearchResults = document.querySelector(".search-result-box");
    goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);
  },

};

 // handleConcertButton(classname) {
  //   let searchInput = document.querySelector(`input[class='${classname}']`);
  //   let concertSearchButtonCall = searchInput.value;
  //   searchInput.value = "";
  //   console.log(classname);
    
  //   concertsFetch(concertSearchButtonCall);

  // },
  // handleRetaurantButton(classname) {
  //   let restaurantSearchInput = document.querySelector(`input[class='${classname}']`);
  //   let restaurantSearchButtonCall = restaurantSearchInput.value;
  //   restaurantSearchInput.value = "";
  //   console.log(classname);

  //   restarauntFetch(restaurantSearchButtonCall)
  // },
  // handleMeetupSearchButton(classname) {
  //   let searchInput = document.querySelector(`input[class='${classname}']`);
  //   let searchButtonCall = searchInput.value;
  //   searchInput.value = "";
  //   console.log(classname);

  //   meetupsObject.meetUpsFetch(searchButtonCall)
  // },

  // handleparkButton(classname) {
  //   // console.log("helloPark")
  //   var e = document.getElementById("park-selection");
  //   var text = e.options[e.selectedIndex].text;
  //   console.log(classname);
    
  //   let keyArray = ["dog_park","hiking_trails", "basketball_courts", "volleyball", "lake", "baseball_fields", "picnic_shelters"];

  //   for (let i = 0; i < parkTypes.length; i++) {
  //     if (text === parkTypes[i]) {
  //       text = keyArray[i]
  //       parksFetch(text);
  //     }
  //   }
  // },


// const eventListeners = (() => {
//   return {
//     handleSearchButton,
//   }

//   function handleSearchButton() {
//     let concertInput = document.querySelector("input[placeholder='Concerts']");
//     let concertQuery = concertInput.value;
//     console.log(concertQuery);
//   }
// })()


//  jake corn code lesson...
// const buildTicketMasterSdk = (config) => {
//   const API_URL = config.API_URL
//   return {
//     getTicketPricesForArtist,
//     findTourLocationsForArtistByYear,
//   }
  
//   function getTicketPricesForArtist(artistId) {
//     return fetch(`${API_URL}/artists/${artistId}/ticketPrices`)
//   }

//   function findTourLocationsForArtistByYear(artistId, year) {
//     return fetch(`${API_URL}/artists/${artistId}?year=${year}`)
//   }
// }

// const ticketMasterSDK = buildTicketMasterSdk({ API_URL: 'http://stuff.com' })
