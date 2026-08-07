export default class FetchWrapper {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(endpoint) {
        return fetch(this.baseUrl + endpoint, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    post(endpoint, body) {
        return this.#send("post", endpoint, body);
    }

    put(endpoint, body) {
        return this.#send("put", endpoint, body);
    }

    delete(endpoint, body) {
        return this.#send("delete", endpoint, body);
    }
    
    #send(method, endpoint, body) {
        return fetch(this.baseUrl + endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}