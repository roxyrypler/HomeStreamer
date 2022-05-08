import express from 'express';
import GET from './server/modules/API/GET.js';

// user DB
// https://openbase.com/js/lowdb

const app = express()
const PORT = 3000

let main = () => {
    GET.INIT(app);

    app.use("/", express.static("public"));
    app.use(express.static("server/vdb"));

    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    });

}

main();