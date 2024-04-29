import {useState } from "react";
import Game from "./Game";

export default function Home() {
    const [mode, setMode] = useState()
    const [instructions, setIntructions] = useState(false)

    function handleClick(e) {
        setMode(e.target.value)
    }

    return (
        <>
        <img onClick={()=> window.location.reload()} src={require("../../src/logo.png")}></img>
        <i id="rules" onMouseEnter={()=>setIntructions(true)} onMouseLeave={()=>setIntructions(false)} class="fa-solid fa-circle-info"></i>
        <span> HOW TO PLAY</span>
        {instructions && <div className="instructions">
            <h2>GUESS THE SECRET CODE</h2>
            <div>
                <div>★ Choose a mode ★</div>
                <div>★ Submit your guess ★</div>
                <div>★ Feedback will provide you with how many numbers are correct and how many numbers are in the correct location ★</div>
                <div>★ You have 10 tries ★</div>
                <div>★ Press hint for a hint ★</div>
            </div>
        </div>}
        {!mode && 
        <div className="modes">
            <button value={1} onClick={handleClick}>
                EASY
                <div className="description">(4 DIGIT CODE)</div>                
                ★
            </button>
            <button value={2} onClick={handleClick}>
                MEDIUM
                <div className="description">(5 DIGIT CODE)</div>                
                ★★
            </button>
            <button value={3} onClick={handleClick}>
                HARD
                <div className="description">(6 DIGIT CODE)</div>                
                ★★★
            </button>
        </div>}
        {mode && <Game mode={mode}/>}
        </>
    )
}