function concertsFetch (concertsSearchParam) {
        
        let today = new Date();
        let searchDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        let parsedConcerts = ["concerts"];


        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?dmaId=343&classificationName=${concertsSearchParam}&localStartDateTime=${searchDate}T00:00:01,${searchDate}T23:59:59&apikey=gOoLh8VX4xnv0GAbvCblAvu8bCKOVE95`)
        .then (response => response.json())
        .then (concertInfo => {
                parsedConcerts = ["concerts"];
                if (concertInfo._embedded != null) {
                        concertInfo._embedded.events.forEach(concert => {
                                let event = `${concert.name}, at ${concert._embedded.venues[0].name}, Genre: ${concert.classifications[0].genre.name}`;
                                parsedConcerts.push(event)
                                });
                } else {
                     parsedConcerts.push("Sorry, there are no concerts available in that genre today.")  
                }
                
                domBuilder.appendAllResources(domComponents.createResourcesDocumentFragments(parsedConcerts));
        });
}