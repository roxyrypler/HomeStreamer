import axios from "axios";

export default function Nav() {

    async function IndexServer() {
        console.log("Indexing Server");
        axios.get("http://localhost:3050/index").then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <>
        <nav>
            <button onClick={IndexServer} >Index</button>
        </nav>
        </>
    )
}