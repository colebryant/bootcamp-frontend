import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import "./Search.css"

export default class SearchInput extends Component {
    // Set initial state
    state = {
        searchQuery: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSearch = evt => {
        evt.preventDefault()
        this.props.searchAllData(this.state.searchQuery)
        .then(() => this.props.history.push("/search"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="searchForm">
                    <div className="form-group">
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="searchQuery" />
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

// export default withRouter(SearchInput)