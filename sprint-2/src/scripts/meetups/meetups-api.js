
let eventsArray = ["meetups"];

// This object contains the method which fetches the queried meetups data from the Eventbrite API. It then parses this information in order to
// append it to the DOM.

const meetupsObject = {
    meetUpsFetch(meetUpsSearchParam) {
    return fetch(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=36.174465&location.longitude=-86.767960&start_date.keyword=today&q=${meetUpsSearchParam}`, {
        headers: {"Authorization": "Bearer Z7Y4SSESJQECHYEKDADA"}})
        .then(response => response.json())
        .then(response => {
            // Clears the events array each time the object method is called so there are no overlapping searches
            eventsArray = ["meetups"];
            // If statement which runs the normal code if there events associated with the query. If not, it adds a message to the array instead.
            if (response.events != null) {
                response.events.forEach(event => {
                    let eventName = event.name.text
                    // The below was another fetch which tried to parse the appropriate event venue name based on the venue ID.
                    // This was necessary since the original event search object did not contain the venue name, just its ID.
                    // However, because it was a nested fetch in a for Each loop it would populate the DOM without including the location, so I've left out for now.

                    // let venueName = "";
                    // fetch(`https://www.eventbriteapi.com/v3/venues/${event.venue_id}/`, {
                    //         headers: {"Authorization": "Bearer Z7Y4SSESJQECHYEKDADA"}})
                    //         .then(venueResponse => venueResponse.json())
                    //         .then(venueResponse => {
                    //         venueName = venueResponse.name;
                    //         return venueName;
                    //         }); 

                    eventsArray.push(eventName);
                });
            } else {
                    eventsArray.push("Sorry, there are no meetups available in that search today.")  
            }
           
            // The below code creates a document fragment based on the populated event array and then appends it to the DOM
            let domFragReturn = domComponents.createResourcesDocumentFragments(eventsArray);

            domBuilder.appendAllResources(domFragReturn);
            console.log(eventsArray);
        });
}};


