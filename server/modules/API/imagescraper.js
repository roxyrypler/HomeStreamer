
import axios from "axios";
import cheerio from "cheerio";


let GetImage = (query, callback) => {
    axios.get(`https://www.themoviedb.org/search?query=${query}`)
        .then((response) => {
            const html = response.data;
            let $ = cheerio.load(html);
            let responseArr = [];
            let items = $(".poster");
            
            items.each((i, el) => {
                let src = $(el).children("a").children("img").attr("src");
                if (src) {
                    responseArr.push({
                        img: `https://www.themoviedb.org${src}`
                    });
                }
            });
            if (responseArr.length == 0) {
                callback({
                    response: "No image found"
                });
            }
            callback({
                response: responseArr[0]
            });
        }).catch((error) => {
            console.log(error);
            callback({
                response: "No image found"
            });
        })
}

export default {
    GetImage
}