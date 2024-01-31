export default function ProgressBar({i, numQuestion, points, maxPossiblePoints, answer}) {
    return (
        <header className="progress">
            <progress max={numQuestion} value={i + Number(answer !== null)}/>
            <p>Question <b>{i+1}</b> / {numQuestion}</p>
            <p><b>{points}</b> / {maxPossiblePoints}</p>
        </header>
    )
}