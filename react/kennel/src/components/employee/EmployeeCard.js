import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import employeeIcon from "./employeeicon.png"
import "./Employee.css"

export default class EmployeeCard extends Component {
    render() {
        return (
            <div key={this.props.employee.id} className="card">
                <div className="card-body">
                    <h5 className ="card-title">
                        <img src={employeeIcon} className="icon--employee" alt="employee icon" />
                        {this.props.employee.name}
                        <Link className="nav-link" to={`/employees/${this.props.employee.id}`}>Details</Link>
                        <button className="card-link" onClick={() => this.props.deleteEmployee(this.props.employee.id)}>Fire
                        </button>
                    </h5>
                </div>
            </div>

        );
    }
}

