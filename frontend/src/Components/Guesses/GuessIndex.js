import { useEffect, useState } from "react";
import GuessItem from "./GuessItem";

export default function GuessIndex ({gameId, fetchGame}) {
    const [guesses, setGuesses] = useState([])
    const [attempt, setAttempt] = useState()
    const [feedback, setFeedback] = useState()
    const [winGame, setWinGame] = useState()
    const [invalidAttempt, setInvalidAttempt] = useState()

    useEffect(()=> {
        fetchGuesses()
    }, [])

    const fetchGuesses = async() => {
        const res = await fetch('/guesses')
        if (res.ok) {
            const data = await res.json()
            setGuesses(data.filter(guess => guess.game_id == gameId))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (/^\d+$/.test(attempt) && attempt.length == 4) {
            setInvalidAttempt(false)
            submitAttempt()
        } else {
            setInvalidAttempt(true)
        }

    }

    const submitAttempt = async() => {
        const res = await fetch('/guesses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ attempt: attempt, game_id: gameId })
        })
        if (res.ok) {
            const data = await res.json()
            setFeedback(data)
            setWinGame(data.win_game)
        } else {
          console.log('error')
        }
        fetchGuesses()
        fetchGame()
        setAttempt('')
      }

    return (
        <>
        {(guesses?.length < 10 && !winGame) &&
        <form onSubmit={handleSubmit}>
            <input onChange= {(e) => setAttempt(e.target.value)} type="text" maxLength="4" value={attempt}/>
            <input type="submit"/>
        </form>}
        {invalidAttempt && <div>Invalid Attempt</div>}
        <div className="table">
            <div>Guesses</div>
            <div>Feedback</div>
        </div>
        {guesses?.map((guess) => <GuessItem guess={guess} feedback={feedback}/>)}
        </>
    )
}