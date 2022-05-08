
let Ref = (id) => {
    return document.getElementById(id);
}

export default {
    cards: Ref("cards"),
    backButton: Ref("backButton")
}