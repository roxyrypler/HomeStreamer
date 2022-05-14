import Ref from "./modules/refs.js";
import GET from "./modules/getreq.js";
import POST from "./modules/postreq.js";
import Maths from "./modules/math.js";

let currentPath = "";

let CreateIntroCards = (data) => {
    let outer = document.createElement("div");
    outer.className = "card folder";
    outer.setAttribute("data-name", data.name);
    outer.setAttribute("data-isplayable", "false");
    let title = document.createElement("p");
    title.innerHTML = data.name;

    outer.addEventListener("click", () => {
        GET.GetRequest(`entity?entity=${outer.dataset.name}`, (data) => {
            if (data.length == 0 || data == null) {
                console.error("Data is not valid, is the folder empty?", data);
            } else {
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
    outer.className = data.isPlayable ? "card playable" : "card folder";
    outer.setAttribute("data-path", data.path);
    outer.setAttribute("data-isplayable", data.isPlayable);
    let title = document.createElement("p");
    title.innerHTML = data.name;

    let progressbarDiv = null;
    if (data.progress.haveStarted) {
        progressbarDiv = document.createElement("p");
        //progressbarDiv.className = "progresbar";
        //progressbarDiv.id = "progresbar";
        progressbarDiv.innerHTML = `Started ${Maths.Percentage(data.progress.currentTime, data.progress.entityDuration)} %`;
        /*
        setTimeout(() => {
            var bar = new ProgressBar.Line('#progresbar', {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: { width: '100%', height: '100%' }
            });
            bar.animate(Maths.Percentage(data.progress.currentTime, data.progress.entityDuration) / 100);  // Value from 0.0 to 1.0
        }, 1000);
        */
    }
    /* experimental, trying to scrape img db fro cover photos
        if (!data.isPlayable) {
            let st = data.path;
            st = st.substring(st.lastIndexOf("/"), st.length);
            st = st.replace("/", "");
            GET.GetRequest(`getentityimage?query=${st}`, (data) => {
                console.log(data);
                outer.style.backgroundImage = `url('${data.response.img}')`;
            });
        }
    */
    outer.addEventListener("click", () => {
        if (outer.dataset.isplayable === "false") {
            GET.GetRequest(`entity?entity=${outer.dataset.path}&username=${localStorage.getItem("user")}`, (data) => {
                if (data.length == 0 || data == null) {
                    console.error("Data is not valid, is the folder empty?", data);
                } else {
                    currentPath = outer.dataset.path;
                    Ref.cards.innerHTML = "";
                    data.forEach((i) => {
                        CreateCards(i);
                    });
                }
            });
        } else {
            // Create playable window
            window.open(`player.html?entity=${outer.dataset.path}`);
        }
    });

    outer.appendChild(title);
    if (progressbarDiv != null) {
        outer.appendChild(progressbarDiv);
    }
    Ref.cards.appendChild(outer);
}

Ref.backButton.addEventListener("click", () => {
    let s = currentPath;
    s = s.substring(0, s.lastIndexOf("/"));
    if (s === "") {
        GET.GetRequest("mediatype", (data) => {
            Ref.cards.innerHTML = "";
            data.forEach((i) => {
                CreateIntroCards(i);
            });
        });
    } else {
        GET.GetRequest(`entity?entity=${s}&username=${localStorage.getItem("user")}`, (data) => {
            if (data.length == 0 || data == null) {
                console.error("Data is not valid, is the folder empty?", data);
            } else {
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
        data.forEach((i) => {
            CreateIntroCards(i);
        });
    });

    /*
        POST.PostRequest("register", {
            username: "patrick",
            password: "1234"
        },
        (data) => {
            console.log(data);
        });
    
        */
    POST.PostRequest("login", {
        username: "patrick",
        password: "1234"
    },
        (data) => {
            console.log(data);
            localStorage.setItem("user", data.username);
        });
}

main();