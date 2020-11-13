import React, { Component } from "react"
import { Link } from "react-router-dom"
import dog from "./DogIcon.png"
import "./Animal.css"

export default class AnimalCard extends Component {
    render() {
        // let validIntersections = this.props.intersections.filter(intersection => {
        //     return intersection.animalId === this.props.animal.id;
        // })
        // let validOwners = [];
        // this.props.owners.filter(owner => {
        //     validIntersections.forEach(

        //     });
        // })
        return (
            <div key={this.props.animal.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={dog} className="icon--dog" alt="dog icon" />
                        {this.props.animal.name}
                        {

                        }
                        <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link>
                        <button
                            onClick={() => this.props.deleteAnimal(this.props.animal.id)}
                            className="card-link">Discharge
                        </button>
                    </h5>
                </div>
            </div>
        )
    }
}