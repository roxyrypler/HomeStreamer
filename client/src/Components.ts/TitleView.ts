import "../css/TitleView.css";

export default function TitleView(data: any): HTMLElement {


    let HTML = `
        <div class="TitleViewWrapper" >
            <div class="TitleView" >
                <div class="titleTop" >
                    <div class="titleCover" style="background-image: url(${data.Cover});" ></div>
                    <div class="titleInfo" >
                        <h1>${data.Name}</h1>
                        <p>Year: ${data.Year}</p>
                        <h4>Description:</h4>
                        <p>${data.Description}</p>
                        <p>${data.Genre}</p>
                        <h4>Director:</h4>
                        <p>${data.Director}</p>
                        <h4>Cast:</h4>
                        ${data.Actors.map((actor: any) => {
        return `<p>${actor}</p>`;
    }).join("")
        }
                        <h4>Length:</h4>
                        <p>${data.Length}</p>
                    </div>
                </div>
                <div class="titleBottom" >
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

    return element;
}