import {useEffect, useState} from 'react';
import GamePlay from './GamePlay';
import Modal from './Modal';

export default function Game () {
    const [id, setId] = useState()
    const [code, setCode] = useState()

    useEffect( () => {
        newGame()
    }, [])

    const newGame = async () => {
        const res = await fetch('/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({remaining_attempts: 10})    
        })
            if (res.ok) {
                const data = await res.json();
                setId(data.id)
                setCode(data.code)
            }
    }

    return (
        <>
        {code && <div>{code}</div>}
        {id && <GamePlay id={id} code={code}/>}
        </>
    )
}