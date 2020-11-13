import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import APIManager from './modules/APIManager';
import Students from './components/Students';
import './App.css';

export default class App extends Component {
  state = {
    students: []
  }

  componentDidMount() {
    APIManager.getAll()
    .then(students => this.setState({
      students: students
    }))
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/students" render={() => {
          return <Students students={this.state.students} />
        }} />
      </React.Fragment>
    );
  }
}
