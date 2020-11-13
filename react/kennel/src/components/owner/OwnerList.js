import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ownerIcon from "./ownericon.png"
import "./Owner.css"

export default class OwnerList extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="ownerButton">
            <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/owners/new")}
                    }>
                Add Owner
            </button>
            </div>
            <section className='owners'>
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src={ownerIcon} className="icon--owner" alt="owner icon" />
                                {owner.name}
                                <Link className="nav-Link" to={`/owners/${owner.id}`}>Details</Link>
                                <button className="card-link" onClick={() => this.props.deleteOwner(owner.id)}>Remove
                                </button>
                            </h5>
                        </div>
                    </div>
                    )
            }
            </section>
            </React.Fragment>
        );
    }
}

