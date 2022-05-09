import vdb from '../Functions/getvdbdata.js';
import Scraper from "./imagescraper.js";


let INIT = (app) => {
    app.get("/mediatype", (req, res) => {
        res.send(vdb.GetMediaType());
    });

    app.get("/entity", (req, res) => {
        res.send(vdb.GetEntity(req.query.entity, req.query.username));
    });

    app.get("/getentityimage", (req, res) => {
        Scraper.GetImage(req.query.query, (data) => {
            res.send(data);
        });
    });
    
}

export default {
    INIT
}