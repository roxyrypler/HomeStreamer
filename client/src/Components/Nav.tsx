import axios from "axios";

export default function Nav() {

    async function IndexServer() {
        console.log("Indexing Server");
        axios.post("http://localhost:3000/indexing")
            .then((response) => {
                // Handle the successful response here
                console.log(response.data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
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