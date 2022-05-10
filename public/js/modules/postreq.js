import config from "../config.js";

let PostRequest = (url, payload, callback) => {
    fetch(`${config.serverURL}${url}`,
    {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(payload),
        method: "POST"
    })
    .then((res) =>{
        return res.json(); 
    })
    .then((data) => { 
        callback( data ); 
    })
}

export default {
    PostRequest
}