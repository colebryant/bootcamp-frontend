import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EmployeeCard from "../employee/EmployeeCard"
import "./Location.css"

export default class LocationList extends Component {
    render() {
        return (
            <React.Fragment>
            <section className='locations'>
                {
                    this.props.locations.map(location =>
                            <div key={location.id} className="card">
                                <div className="card-title">
                                    {location.name} at {location.address}
                                    <Link className="nav-Link" to={`/locations/${location.id}`}>Details</Link>
                                </div>
                                <div className="employees--location">
                                {
                                    this.props.employees
                                        .filter(empl => empl.locationId === location.id)
                                        .map(empl => <EmployeeCard {...this.props} key={empl.id} employee={empl}/>)
                                }
                                </div>
                            </div>
                        )
                }
            </section>
            </React.Fragment>
        );
    }
}