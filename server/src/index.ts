import express from 'express';

function Main() {
    const app = express();
    const port = 3050;

    app.get('/index', (req, res) => {
        console.log('GET /index');
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}

Main();