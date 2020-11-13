import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import EmployeeList from './employee/EmployeeList'
import LocationList from './location/LocationList'
import OwnerList from './owner/OwnerList'
import AnimalDetail from './animal/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import LocationDetail from './location/LocationDetail'
import OwnerDetail from './owner/OwnerDetail'
import AnimalForm from './animal/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owner/OwnerForm'
import Login from './authentication/Login'
import SearchResults from './search/SearchResults'
import APIManager from '../modules/APIManager'

export default class ApplicationViews extends Component {

    state = {
        animals: [],
        employees: [],
        locations: [],
        owners: [],
        intersections: []
    }

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    deleteAnimal = id => {
        APIManager.removeAndList("animals", id)
        .then(animals => this.setState({
            animals: animals
        }))
    }

    addAnimal = (animal) => {
        APIManager.post("animals", animal)
        .then(() => APIManager.getAll("animals"))
        .then(animals => this.setState({
            animals: animals
        }))
    }

    deleteEmployee = id => {
        APIManager.removeAndList("employees", id)
        .then(employees => this.setState({
            employees: employees
        }))
    }

    addEmployee = (employee) => {
        APIManager.post("employees", employee)
        .then(() => APIManager.getAll("employees"))
        .then(employees => this.setState({
            employees: employees
        }))
    }

    deleteOwner = id => {
        APIManager.removeAndList("owners", id)
        .then(owners => this.setState({
            owners: owners
        }))
    }

    addOwner = (owner) => {
        APIManager.post("owners", owner)
        .then(() => APIManager.getAll("owners"))
        .then(owners => this.setState({
            owners: owners
        }))
    }

    componentDidMount() {
        // This method will load the data into the page once the components are mounted
        // Building empty object for this.setState() so the dom doesn't rerender every time
        const newState = {}

        APIManager.getAll("animals")
        .then(animals => newState.animals = animals)
        .then(() => APIManager.getAll("employees")
        .then(employees => newState.employees = employees))
        .then(() => APIManager.getAll("locations")
        .then(locations => newState.locations = locations))
        .then(() => APIManager.getAll("owners")
        .then(owners => newState.owners = owners))
        .then(() => APIManager.getAll("intersections")
        .then(intersections => newState.intersections = intersections))
        .then(() => this.setState(newState))
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
                <Route exact path="/" render={() => {
                    if (this.isAuthenticated()) {
                        return <LocationList locations={this.state.locations}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/:locationId(\d+)" render={(props) => {
                    return <LocationDetail {...props}
                        locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalList {...props}
                            animals={this.state.animals}
                            deleteAnimal={this.deleteAnimal}
                            owners={this.state.owners}
                            intersections={this.state.intersections} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props}
                        animals={this.state.animals}
                        deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props}
                            deleteEmployee={this.deleteEmployee}
                            employees={this.state.employees}
                            deleteAnimal={this.deleteAnimal}
                            animals={this.state.animals} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props}
                        employees={this.state.employees}
                        deleteEmployee={this.deleteEmployee} />
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                        employees={this.state.employees} />
                }} />
                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerList {...props}
                            owners={this.state.owners}
                            deleteOwner={this.deleteOwner} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail {...props}
                        owners={this.state.owners}
                        deleteOwner={this.deleteOwner} />
                }} />
                <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                        addOwner={this.addOwner}
                        owners={this.state.owners} />
                }} />
                <Route path="/search" render={(props) => {
                    return <SearchResults {...this.props} />
                }} />
            </React.Fragment>
        )
    }
}