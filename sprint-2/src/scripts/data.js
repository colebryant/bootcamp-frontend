// This module interacts with the API, meaning all fetch calls to the json-server API will be in this module. 

const data = {
  getResources() {
    return fetch("http://localhost:8088/resources")
    // .then(function(response){
    //   response.json();
    // })
    .then(response => response.json());
  },
  postData(data) {
    console.log("hello", 
    data)
    // Default options are marked with *
      return fetch("http://localhost:8088/resources", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          // referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  }
};
