import { useEffect, useState } from "react"
import GuessIndex from "./Guesses/GuessIndex"
import Modal from "./Modal"

export default function GamePlay({id, code}) {
    const [attemptsRemaining, setAttemptsRemaining] = useState()
    const [gameOver, setGameOver] = useState()
    const [winGame, setWinGame] = useState()
    const [hint, setHint] = useState()
    const [help, setHelp] = useState()

    useEffect(()=> {
        fetchGame()
    }, [])

    const fetchGame = async () => {
        const res = await fetch(`/games/${id}`)
        if (res.ok) {
            const data = await res.json()
            setAttemptsRemaining(data.remaining_attempts)
            setGameOver(data.game_over)
            setWinGame(data.win_game)
            setHint(data.hint)
        } else {
            console.log('error')
        }
    }

    return (
        <>
        {winGame && <Modal message="win"/>}
        {gameOver && <Modal message="lose" code={code}/>}
        <div className="nav">
            <div id="header">{attemptsRemaining} Remaining Attempts</div>
            <button id="hint" onClick={()=> setHelp(true)}>
                <i class="fa-solid fa-lightbulb" style={{color: "#FFD43B",}}></i>
                 Hint
            </button>
        </div>
        {help && <div>{hint}</div>}
        <GuessIndex gameId={id} fetchGame={fetchGame} winGame={winGame} code={code}/>
        </>
    )
}