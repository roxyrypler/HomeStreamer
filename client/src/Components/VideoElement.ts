import "../css/VideoElement.css";

export default function VideoElement(data: any): HTMLElement {

    
    let HTML = `
        <video 
            controls 
            autoplay
            class="VideoElement" 
            x-webkit-airplay="allow"
        >
            <source src="${data.File}" type="video/mp4">
        </video>
    `;
    let element = document.createElement("div");
    element.innerHTML = HTML;

    //let videoElement = element.querySelector(".VideoElement") as HTMLVideoElement;

    return element;
}