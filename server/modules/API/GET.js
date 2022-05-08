import vdb from '../Functions/getvdbdata.js';

/*
res.send({});
req.params.entity
*/

let INIT = (app) => {
    app.get("/mediatype", (req, res) => {
        res.send(vdb.GetMediaType());
    });

    app.get("/entity", (req, res) => {
        res.send(vdb.GetEntity(req.query.entity));
    });
}

export default {
    INIT
}