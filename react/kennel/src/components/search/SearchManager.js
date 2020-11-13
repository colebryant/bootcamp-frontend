const remoteURL = "http://localhost:5002"

export default {
    searchAnimals(query) {
        return fetch(`${remoteURL}/animals?q=${query}`)
        .then(e => e.json())
    },
    searchEmployees(query) {
        return fetch(`${remoteURL}/employees?q=${query}`)
        .then(e => e.json())
    },
    searchOwners(query) {
        return fetch(`${remoteURL}/owners?q=${query}`)
        .then(e => e.json())
    },
    searchAll(query) {
        return Promise.all([this.searchAnimals(query), this.searchEmployees(query), this.searchOwners(query)])
    }
}