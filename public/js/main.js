import Ref from "./modules/refs.js";
import GET from "./modules/getreq.js";

let CreateIntroCards = (data) => {
    let outer = document.createElement("div");
    outer.className = "card";
    outer.setAttribute("data-name", data.name);
    outer.setAttribute("data-isplayable", "false");
    let title = document.createElement("p");
    title.innerHTML = data.name;

    outer.addEventListener("click", () => {
        GET.GetRequest(`entity?entity=${outer.dataset.name}`, (data) => {
            if (data.length == 0 || data == null) {
                console.error("Data is not valid, is the folder empty?", data);
            }else {
                Ref.cards.innerHTML = "";
                data.forEach((i) => {
                    CreateCards(i);
                });
            }
        });
    });

    outer.appendChild(title);
    Ref.cards.appendChild(outer);
}

let CreateCards = (data) => {
    let outer = document.createElement("div");
    outer.className = "card";
    outer.setAttribute("data-path", data.path);
    outer.setAttribute("data-isplayable", data.isPlayable);
    let title = document.createElement("p");
    title.innerHTML = data.name;

    outer.addEventListener("click", () => {
        if (outer.dataset.isplayable === "false") {
            GET.GetRequest(`entity?entity=${outer.dataset.path}`, (data) => {
                if (data.length == 0 || data == null) {
                    console.error("Data is not valid, is the folder empty?", data);
                }else {
                    Ref.cards.innerHTML = "";
                    data.forEach((i) => {
                        CreateCards(i);
                    });
                }
            });
        }else {
            // Create playable window
            window.open(outer.dataset.path);
        }
    });

    outer.appendChild(title);
    Ref.cards.appendChild(outer);
}

let main = () => {
    GET.GetRequest("mediatype", (data) => {
        console.log(data);
        data.forEach((i) => {
            CreateIntroCards(i);
        });
    });
/*
    GET.GetRequest("entity", (data) => {
        console.log(data);
        data.forEach((i) => {
            CreateCards(i);
        });
    });
*/
}

main();