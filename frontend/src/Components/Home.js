import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Game from "./Game";

export default function Home() {
    const [mode, setMode] = useState()

    function handleClick(e) {
        setMode(e.target.value)
    }

    return (
        <>
        {!mode && 
        <div>
            <button value={1} onClick={handleClick}>Easy</button>
            <button value={2} onClick={handleClick}>Medium</button>
            <button value={3} onClick={handleClick}>Hard</button>
        </div>}
        {mode && <Game mode={mode}/>}
        </>
    )
}