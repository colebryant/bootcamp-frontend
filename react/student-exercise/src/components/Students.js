import React, { Component } from "react";

export default class Students extends Component {
    render() {
        return (
            <React.Fragment>
            <h1>These are the students:</h1>
                {
                    this.props.students.map(student =>
                        <p key={student.id}>{student.firstName} {student.lastName}</p>
                    )
                }
            </React.Fragment>
        )
    }
}

