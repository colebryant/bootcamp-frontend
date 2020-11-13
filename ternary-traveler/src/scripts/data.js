// The purpose of this module is to provide a template for fetch requests to database.json

const data = {
    fetchRequest (fetchObject) {
        let dataSet = fetchObject.dataSet;
        let fetchType = fetchObject.fetchType;
        let specificId = fetchObject.specificId;
        let databaseObject = fetchObject.databaseObject;

        if (fetchType === "GET" && specificId) {
            return fetch(`http://localhost:8088/${dataSet}/${specificId}`)
            .then(response => response.json());
        } else if (fetchType === "GET") {
            return fetch(`http://localhost:8088/${dataSet}`)
            .then(response => response.json());
        } else if (fetchType === "POST") {
            return fetch (`http://localhost:8088/${dataSet}`, {
                method: fetchType,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(databaseObject)
            })
        } else if (fetchType === "DELETE") {
            return fetch(`http://localhost:8088/${dataSet}/${specificId}`, {
                method: fetchType,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
        } else if (fetchType === "PUT") {
            return fetch(`http://localhost:8088/${dataSet}/${specificId}`, {
                method: fetchType,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(databaseObject)
            })
        } else {
            console.log("fetch didn't work");
        }
    }
};

export default data;