import React, { Component } from "react"
import "./Employee.css"
import employeeIcon from "./employeeicon.png"

export default class EmployeeDetail extends Component {
    render() {

        const employee = this.props.employees.find(a => a.id === parseInt(this.props.match.params.employeeId)) || {}

        return (
            <section className="employee">
                <div key={employee.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={employeeIcon} className="icon--dog" alt="employee icon" />
                            {employee.name}
                        </h4>
                        <button
                            onClick={() => this.props.deleteEmployee(employee.id)
                                            .then(() => this.props.history.push("/employees"))}
                            className="card-link">Fire</button>
                    </div>
                </div>
            </section>
        )
    }
}