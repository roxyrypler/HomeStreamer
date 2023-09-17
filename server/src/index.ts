import express from 'express';
import cors from 'cors';
import API from './API';

function Main() {
    const app = express();
    const port = 3000;

    // Middleware
    app.use(cors());

    // API
    API(app);

    // Initialize app
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}

Main();