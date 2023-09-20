import '../css/main.css';

import Home from '../Views/Home';

async function Main() {
    let app = document.getElementById('app');
    if (app) app.appendChild(await Home());
}

Main();


