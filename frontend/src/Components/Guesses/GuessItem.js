import './Table.css'

export default function GuessItem ({guess, feedback}) {
    const correct_location = feedback.correct_location
    const correct_numbers = feedback.correct_numbers
    return (
        <>
        <div className="table" id="items">
            <div> {guess.attempt}</div>
            <div className="feedback">
                <div>Correct Location: {correct_location} </div>
                <div>Correct Numbers: {correct_numbers}</div>
            </div>
        </div>
        <br/>
        </>
    )
}