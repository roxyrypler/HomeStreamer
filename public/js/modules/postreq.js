
let BASEURL = "http://localhost:3000/";

let PostRequest = (url, payload, callback) => {
    fetch(`${BASEURL}${url}`,
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