
let BASEURL = "http://localhost:3000/";

let GetRequest = (url, callback) => {
    fetch(`${BASEURL}${url}`)
    .catch(err => callback(err))
    .then(response => response.json())
    .then(data => callback(data));
}

export default {
    GetRequest
}