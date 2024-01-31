import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0
}

const reducer = (state, {type, payload}) => {
    switch (type) {
        case "dataReceived":
            return {
                ...state,
                questions: payload,
                status: "ready"
            }
        case "dataFailed":
            return {
                ...state,
                status: "error"
            }
        case "start":
            return {
                ...state,
                status: "active"
            }
        case "newAnswer":
            const question = state["questions"].at(state["index"]);

            return {
                ...state,
                answer: payload,
                points: payload === question["correctOption"] 
                    ? state["points"] + question["points"] 
                    : state["points"]
            }
        default:
            throw new Error("Action unknown");
    }
}


export default function App() {

    const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch("http://localhost:7979/questions")
            .then(result => result.json())
            .then(data => dispatch({type: "dataReceived", payload: data}))
            .catch(error => dispatch({type: "dataFailed"}))
    }, [])
    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <StartScreen numQuestion={questions.length} dispatch={dispatch}/>}
                {status === "active" && <Question question={questions[index]} dispatch={dispatch} answer={answer}/>}
            </Main>
        </div>
    );
}