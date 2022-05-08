import Ref from "./modules/refs.js";
import GET from "./modules/getreq.js";

let currentPath = "";

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
                currentPath = outer.dataset.name;
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
                    currentPath = outer.dataset.path;
                    Ref.cards.innerHTML = "";
                    data.forEach((i) => {
                        CreateCards(i);
                    });
                }
            });
        }else {
            // Create playable window
            window.open(`player.html?entity=${outer.dataset.path}`);
        }
    });

    outer.appendChild(title);
    Ref.cards.appendChild(outer);
}

Ref.backButton.addEventListener("click", () => {
    let s = currentPath;
    s = s.substring(0, s.lastIndexOf("/"));
    if (s === "") {
        GET.GetRequest("mediatype", (data) => {
            console.log(data);
            Ref.cards.innerHTML = "";
            data.forEach((i) => {
                CreateIntroCards(i);
            });
        });
    }else {
        GET.GetRequest(`entity?entity=${s}`, (data) => {
            if (data.length == 0 || data == null) {
                console.error("Data is not valid, is the folder empty?", data);
            }else {
                currentPath = s;
                Ref.cards.innerHTML = "";
                data.forEach((i) => {
                    CreateCards(i);
                });
            }
        });
    }


});

let main = () => {
    GET.GetRequest("mediatype", (data) => {
        console.log(data);
        data.forEach((i) => {
            CreateIntroCards(i);
        });
    });
}

main();