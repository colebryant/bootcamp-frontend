import React, { Component } from "react"
import "./Owner.css"
import ownerIcon from "./ownericon.png"

export default class OwnerDetail extends Component {
    render() {

        const owner = this.props.owners.find(a => a.id === parseInt(this.props.match.params.ownerId)) || {}

        return (
            <section className="owner">
                <div key={owner.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={ownerIcon} className="icon--dog" alt="owner icon" />
                            {owner.name}
                        </h4>
                        <h6 className="card-title">{owner.breed}</h6>
                        <button
                            onClick={() => this.props.deleteOwner(owner.id)
                                            .then(() => this.props.history.push("/owners"))}
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}