import "../css/VideoBlock.css";

export default function VideoBlock(data: any): HTMLElement {

    function handleClick() {
        console.log("VideoBlock clicked!");
        localStorage.setItem("videoFile", JSON.stringify(data));
        window.open("/Player.html");
    }

    let HTML = `
        <div class="VideoBlockWrapper" >
            <button id="PlayButton" >Play</button>
            <p>${data.Name}</p>
        </div>
    `;
    let element = document.createElement("div");
    element.innerHTML = HTML;

    let playButton = element.querySelector("#PlayButton") as HTMLButtonElement;
    playButton?.addEventListener("click", handleClick);


    return element;
}