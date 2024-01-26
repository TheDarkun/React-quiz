import Header from "./Header";
import Main from "./Main";
import {useEffect} from "react";

export default function App() {
    
    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(result => result.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }, [])
    return (
        <div className="app">
            <Header/>
            <Main>
                <p>1/15</p>
                <p>Question?</p>
            </Main>
        </div>
    );
}


