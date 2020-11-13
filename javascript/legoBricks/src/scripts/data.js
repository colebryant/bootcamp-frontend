const data = {
    postLego (legoToSave) {
        fetch("http://localhost:8088/legos", { // Replace "url" with your API's URL
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(legoToSave)
        })
    }
    // Example of how to delete a lego:
    // deleteLego (legoID) {
    //     fetch(`http://localhost:8088/legos/${legoID}`, { // Replace "url" with your API's URL
    //     method: "DELETE",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     })
    // }
}

// data.deleteLego(1);