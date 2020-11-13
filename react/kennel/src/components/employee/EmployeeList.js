import React, { Component } from 'react'
import { Link } from "react-router-dom"
import employeeIcon from "./employeeicon.png"
import AnimalCard from "../animal/AnimalCard"
import "./Employee.css"

export default class EmployeeList extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="employeeButton">
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/employees/new")}
                    }>
                Hire Employee
                </button>
            </div>
            <section className="employees">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        <div className="card-body">
                            <h5 className ="card-title">
                                <img src={employeeIcon} className="icon--employee" alt="employee icon" />
                                {employee.name}
                                <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                                <button className="card-link" onClick={() => this.props.deleteEmployee(employee.id)}>Fire
                                </button>
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">Caretaker For</h6>

                            <div className="animals--caretaker">
                            {
                                this.props.animals
                                    .filter(anml => anml.employeeId === employee.id)
                                    .map(anml => <AnimalCard key={anml.id} animal={anml} {...this.props} />)
                            }
                            </div>
                        </div>
                    </div>
                    )
            }
            </section>
            </React.Fragment>
        );
    }
}

