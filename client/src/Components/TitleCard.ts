import "../css/TitleCard.css"
import TitleView from "./TitleView";

export default function TitleCard(data: any): HTMLElement {

    function clickTitle() {
        document.body.appendChild(TitleView(data));
    }

    const titleCardHTML = `
    <div class="TitleCardWrapper" data-genre="${data.Genre}" >
        <div class="TitleCard">
            <div class="TitleCardImage" style="background-image: url(${data.Cover});"></div>
        </div>
    </div>`;

    const titleCardElement = document.createElement("div");
    titleCardElement.innerHTML = titleCardHTML;

    const imageElement = titleCardElement.querySelector(".TitleCardImage");
    imageElement?.addEventListener("click", clickTitle);

    return titleCardElement;
}