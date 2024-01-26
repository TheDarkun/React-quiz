export default function StartScreen({numQuestion}) {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numQuestion} questions to test your React mastery</h3>
            <button className="btn btn-ui">Let's begin!</button>
        </div>
    )
}