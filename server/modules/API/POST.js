import Localdb from '../Functions/dbcontroller.js';

let INIT = (app) => {
    app.post("/register", (req, res) => {
        Localdb.CreateUser(req.body, (data) => {
            res.send(data);
        });
    });
    
    app.post("/login", (req, res) => {
        Localdb.Login(req.body, (data) => {
            res.send(data);
        });
    });

    app.post("/registerprogress", (req, res) => {
        Localdb.SaveProgress(req.body);
        res.sendStatus(200);
    });

    app.post("/getprogress", (req, res) => {
        Localdb.GetProgress(req.body, (data) => {
            res.send(data);
        });
    });
}

export default {
    INIT
}