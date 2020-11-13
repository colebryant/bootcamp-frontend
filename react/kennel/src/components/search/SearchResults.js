import React, { Component } from 'react'

export default class SearchResults extends Component {
    render () {
        return (
            <React.Fragment>
            <section className="search--results">
            {
                this.props.results.map(result =>
                    result.map(re => (
                        <p key={this.id}>{re.name}</p>
                    ))
                )
            }
            </section>
            </React.Fragment>
        )
    }
}