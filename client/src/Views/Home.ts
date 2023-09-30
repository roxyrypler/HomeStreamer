
import "../css/Home.css";
import { BaseServerURL } from "../ts/config";
import TitleCard from "../Components/TitleCard";
import axios from "axios";

export default async function Home(): Promise<HTMLElement> {
    let allTitles: any = [];
    let genres: any = [];

    async function GetTitleIndex() {
        let call = await axios.get(`${BaseServerURL}/api/index`);
        console.log(call.data);
        // Add a all titles  to AllTitles
        call.data.forEach((title: any) => {
            title.Cover = `${BaseServerURL}/static/${title.Cover}`;
            title.Files.forEach((file: any) => {
                file.File = `${BaseServerURL}/static/${file.File}`;
            });
            allTitles.push(title);
            // push all genres to genres and make sure there are no duplicates
            title.Genres.forEach((genre: any) => {
                if (!genres.includes(genre)) {
                    genres.push(genre);
                }
            });
        });
        console.log(allTitles);
    }

    let HTML = `
    <div class="HomeWrapper" >
        <div class="nav" ></div>
        <div class="titlesWrapper" >
            <div class="genres" id="genresGrid" ></div>
            <div class="titles" id="titlesGrid" ></div>
        </div>
    </div>  
    `;

    let element = document.createElement("div");
    element.innerHTML = HTML;
    let titlesGrid = element.querySelector("#titlesGrid");
    let genresGrid = element.querySelector("#genresGrid");
    
    await GetTitleIndex();

    let allH2 = document.createElement("h2");
    allH2.addEventListener("click", () => {
        // remove all titles
        while (titlesGrid?.firstChild) {
            titlesGrid.removeChild(titlesGrid.firstChild);
        }

        allTitles.forEach((title: any) => {
            titlesGrid?.appendChild(TitleCard(title));
        });
    });
    allH2.appendChild(document.createTextNode("All"));
    genresGrid?.appendChild(allH2);
    genres.forEach((genre: any) => {
        let h2 = document.createElement("h2");
        h2.addEventListener("click", () => {
            while (titlesGrid?.firstChild) {
                titlesGrid.removeChild(titlesGrid.firstChild);
            }
            
            allTitles.forEach((title: any) => {
                if (title.Genres.includes(genre)) {
                    titlesGrid?.appendChild(TitleCard(title));
                }
            });
        });
        h2.appendChild(document.createTextNode(genre));
        genresGrid?.appendChild(h2);
    });

    allTitles.forEach((title: any) => {
        titlesGrid?.appendChild(TitleCard(title));
    });

    return element;
}