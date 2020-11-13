import React, { Component } from "react"
import "./Owner.css"

export default class EmployeeForm extends Component {
    // Set initial state
    state = {
        name: "",
        phoneNumber: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewOwner = evt => {
        evt.preventDefault()
        const owner = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber
        }
        this.props.addOwner(owner).then(() => this.props.history.push("/owners"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="ownerForm">
                    <div className="form-group">
                        <label htmlFor="name">Owner name</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="name"
                               placeholder="Owner name" />
                        <label htmlFor="phoneNumber">Owner phone number</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="phoneNumber"
                               placeholder="Owner phone number" />
                    </div>
                    <button type="submit" onClick={this.constructNewOwner} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}