import './Table.css'

export default function GuessItem ({guess}) {
    return (
        <>
        <h2> {guess.attempt}</h2>
        <div className="feedback">
            <div>Correct Location: {guess.correct_location} </div>
            <div>Correct Numbers: {guess.correct_numbers}</div>
        </div>
        </>
    )
}