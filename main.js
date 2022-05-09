import express from 'express';
import bodyParser from "body-parser";
import GET from './server/modules/API/GET.js';
import POST from './server/modules/API/POST.js';
import Scraper from "./server/modules/API/imagescraper.js";

const PORT = 3000;
const app = express();

app.use("/", express.static("public"));
app.use(express.static("server/vdb"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

let main = () => {
    GET.INIT(app);
    POST.INIT(app);
}

main();