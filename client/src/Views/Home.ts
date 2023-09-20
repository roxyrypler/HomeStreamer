
import "../css/Home.css";
import Button from "../Components.ts/Button";
import TitleCard from "../Components.ts/TitleCard";
import axios from "axios";

export default async function Home(): Promise<HTMLElement> {
    let call = await axios.get('http://localhost:3000/api/index');
    console.log(call.data);
    let allTitles: any = [];
    for (let genre in call.data.Genres) {
        call.data.Genres[genre].forEach((title: any) => {
            title.Genre = genre;
            allTitles.push(title);
        });
    }
    console.log(allTitles);

    let HTML = `
    <div class="HomeWrapper" >
        <div class="nav" ></div>
        <div class="titlesWrapper" >
            <h2>All</h2>
            <div class="titles" id="titlesGrid" ></div>
        </div>
    </div>  
    `;

    let element = document.createElement("div");
    element.innerHTML = HTML;

    let titlesGrid = element.querySelector("#titlesGrid");
    allTitles.forEach((title: any) => {
        titlesGrid?.appendChild(TitleCard(title));
    });

    return element;
}