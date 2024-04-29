import {useState } from "react";
import Game from "./Game";

export default function Home() {
    const [mode, setMode] = useState()

    function handleClick(e) {
        setMode(e.target.value)
    }

    return (
        <>
        <img src={require("../../src/logo.png")}></img>
        {!mode && 
        <div className="modes">
            <button value={1} onClick={handleClick}>
                <div>EASY</div>
                <br/>
                <i class="fa-solid fa-star"></i>
            </button>
            <button value={2} onClick={handleClick}>
                <div>MEDIUM</div>
                <br/>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </button>
            <button value={3} onClick={handleClick}>
                <div>HARD</div>
                <br/>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>    
                <i class="fa-solid fa-star"></i>    
            </button>
        </div>}
        {mode && <Game mode={mode}/>}
        </>
    )
}