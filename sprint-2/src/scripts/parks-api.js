// // This module interacts with the API, meaning all fetch calls to the json-server API will be in this module.
  let parksArray = ["parks"];
  function parksFetch (parksSearchParam) {
      fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=mGIe1HeHEMg9aF55Guy8rdqhN&${parksSearchParam}=Yes`)
      .then(response => response.json())
      .then(response => {
        parksArray = ["parks"];
              response.forEach(parksObject => {
                  let parkName = parksObject.park_name;
                  let parkAddress = parksObject.mapped_location_address;
                  parksArray.push(parkName + " " + parkAddress);
                });
                console.table(parksArray)

                let domFragReturn = domComponents.createResourcesDocumentFragments(parksArray);
                console.log(domFragReturn);
                domBuilder.appendAllResources(domFragReturn);
          })
  };
//   parksFetch("dog_park");
