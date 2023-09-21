import "../css/TitleView.css";
import VideoBlock from "./VideoBlock";

export default function TitleView(data: any): HTMLElement {


    let HTML = `
        <div class="TitleViewWrapper" >
            <div class="TitleView" >
                <div class="titleTop" >
                    <div class="titleCover" style="background-image: url(${data.Cover});" ></div>
                    <div class="titleInfo" >
                        <div class="TitleInfoLeft" >
                            <h3>${data.Name}</h3>
                            <p>${data.Genre}</p>
                            <h4>Description:</h4>
                            <p>${data.Description}</p>
                            <h4>Length:</h4>
                            <p>${data.Length}</p>
                        </div>
                        <div class="TitleInfoRight" >
                            <p>Year: ${data.Year}</p>
                            <h4>Director:</h4>
                            <p>${data.Director}</p>
                            <h4>Cast:</h4>
                            ${
                                data.Actors.map((actor: any) => {
                                    return `<p>${actor}</p>`;
                                }).join("")
                            }
                        </div>
                    </div>
                </div>
                <div class="titleBottom" id="videoFiles" >
                </div>
            </div>
        </div>
    `;
    let element = document.createElement("div");
    element.innerHTML = HTML;

    // Add a click event listener to the TitleViewWrapper div
    const wrapperDiv = element.querySelector(".TitleViewWrapper") as HTMLDivElement;
    wrapperDiv?.addEventListener("click", handleClick);

    // Function to be called when the div is clicked
    function handleClick(event: MouseEvent) {
        if (event.target === wrapperDiv) {
            // Your code to handle the click event goes here
            console.log("TitleViewWrapper clicked!");
            const body = document.body;
            body.removeChild(element);
        }
    }

    const videoFilesDiv = element.querySelector("#videoFiles") as HTMLDivElement;
    if (data.Type === "Movie") {
        data.Files.forEach((videoFile: any) => {
            videoFilesDiv?.appendChild(VideoBlock(videoFile));
        });
    } else if (data.Type === "Series") {
        // Handle seasons
    }

    return element;
}