import "../css/main.css";
import VideoElement from "../Components/VideoElement";

function Main() {
    let app = document.getElementById('player');

    let data = localStorage.getItem("videoFile");
    if (data) {
        data = JSON.parse(data);
        console.log(data);
        if (app) app.appendChild(VideoElement(data));
    };
}

Main();