import "../css/TitleCard.css"


export default function TitleCard(data: any): string {
    return `
    <div class="TitleCardWrapper" >
        <div class="TitleCard" >
            <div class="TitleCardImage" style="background-image: url(${data.Cover});" ></div>
        </div>
    </div>  
    `;
}