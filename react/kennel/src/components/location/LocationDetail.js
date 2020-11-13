import React, { Component } from "react"
import "./LocationList"

export default class LocationDetail extends Component {
    render() {

        const location = this.props.location.find(a => a.id === parseInt(this.props.match.params.locationId)) || {}

        return (
            <section className="location">
                <div key={location.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                        </h4>
                    </div>
                </div>
            </section>
        )
    }
}