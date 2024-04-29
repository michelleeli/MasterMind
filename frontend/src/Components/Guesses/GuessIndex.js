import { useEffect, useState } from "react";
import GuessItem from "./GuessItem";

export default function GuessIndex ({gameId, fetchGame, code}) {
    const [guesses, setGuesses] = useState([])
    const [attempt, setAttempt] = useState()
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
        if (/^\d+$/.test(attempt) && attempt.length == code.length) {
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
            <input id="form" placeholder={`Guess ${code.length} digit code`} onChange= {(e) => setAttempt(e.target.value)} type="text" maxLength={code.length} value={attempt}/>
            <input id="submit" type="submit"/>
        </form>}        
        {invalidAttempt && <div id="invalid">Invalid Attempt</div>}
        <div className="table">
            {guesses.length > 0 && <>
                <h2>Guesses</h2>
                <h2>Feedback</h2>
            </>}
            {guesses?.map((guess) => <GuessItem guess={guess}/>)}
        </div>
        </>
    )
}