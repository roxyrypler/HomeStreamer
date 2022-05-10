import POST from "./modules/postreq.js";
import config from "./config.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const path = urlParams.get('entity');
let player;

let handleSaveProgress = () => {
    setInterval(() => {
        POST.PostRequest("registerprogress", {
            username: localStorage.getItem("user"),
            entity: path,
            currentTime: player.currentTime
        },
        (data) => {
            //console.log(data);
        });
        
    }, 5000);
}

let createvideoPlayer = (data) => {
    let video = `
        <video id="videoPlayer" class="videoPlayer" controls>
        <source src="${config.serverURL}${path}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    document.body.innerHTML = video;
    player = document.getElementById("videoPlayer");
    player.currentTime = data.currentTime;
    player.play();
    handleSaveProgress();
}

let GetEntityProgress = () => {
    console.log("JA?");
    POST.PostRequest("getprogress", {
        username: localStorage.getItem("user"),
        entity: path
    },
    (data) => {
        createvideoPlayer(data);
    });
}

GetEntityProgress();