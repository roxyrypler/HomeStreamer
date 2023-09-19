
import "../css/Home.css";
import Button from "../Components.ts/Button";
import TitleCard from "../Components.ts/TitleCard";
import axios from "axios";

export default async function Home(): Promise<string> {
    let call = await axios.get('http://localhost:3000/api/index');
    console.log(call.data);
    let allTitles: any = [];
    for (let genre in call.data.Genres) {
        call.data.Genres[genre].forEach((title: any) => {
            allTitles.push(title);
        });
    }
    console.log(allTitles);

    return `
    <div class="HomeWrapper" >
        <div class="nav" ></div>
        <div class="titlesWrapper" >
            <h2>All</h2>
            <div class="titles" >
                ${
                    allTitles.map((data: any) => {
                        return TitleCard(data);
                    }).join('')
                }
            </div>
        </div>
    </div>  
    `;
}