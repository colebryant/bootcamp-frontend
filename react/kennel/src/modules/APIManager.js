const remoteURL = "http://localhost:5002"

export default {

  get(dataSet, id) {
    return fetch(`${remoteURL}/${dataSet}/${id}`).then(data => data.json())
  },

  getAll(dataSet) {
    return fetch(`${remoteURL}/${dataSet}`).then(data => data.json())
  },

  removeAndList (dataSet, id) {
    return fetch(`${remoteURL}/${dataSet}/${id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(() => fetch(`${remoteURL}/${dataSet}`))
    .then(r => r.json())
  },

  post(dataSet, objectToPost) {
    return fetch(`${remoteURL}/${dataSet}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToPost)
    })
    .then(data => data.json())
  }

}