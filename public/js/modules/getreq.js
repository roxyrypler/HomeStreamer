import config from "../config.js";

let GetRequest = (url, callback) => {
    console.log(config);
    fetch(`${config.serverURL}${url}`)
    .catch(err => callback(err))
    .then(response => response.json())
    .then(data => callback(data));
}

export default {
    GetRequest
}