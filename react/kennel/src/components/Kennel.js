import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
// import SearchManager from "./search/SearchManager"
import "./Kennel.css"
import "bootstrap/dist/css/bootstrap.min.css"


export default class Kennel extends Component {
    state = {
        animals: [],
        employees: [],
        locations: []
    }

    // searchAllData = (searchQuery) => {
    //     const newSearchResults = {};
    //     return SearchManager.searchAnimlas(searchQuery)
    //     .then(response => newSearchResults.animals = response)
    //     .then(() => SearchManager.searchEmployees(searchQuery)
    //     .then(response => )

    //     }
    // }

    render() {
        return (
            <React.Fragment>
                <NavBar searchAllData={this.searchAllData} />
                <ApplicationViews results={this.state.searchResults} />
            </React.Fragment>
        )
    }
}