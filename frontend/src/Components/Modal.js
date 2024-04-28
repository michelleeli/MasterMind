import { useEffect, useState } from "react"

export default function Modal({message, code}) {
    const [text, setText] = useState()

    useEffect(()=> {
        setMessage()
    })

    function setMessage(){
        if (message == "win") {
            setText("CONGRATULATIONS! YOU'VE CRACKED THE CODE")
        } else if (message == "lose") {
            setText(`YOU LOSE! THE CODE WAS ${code}`)
        }
    }

    return (
        <div id="modal">{text}</div>
    )
}


