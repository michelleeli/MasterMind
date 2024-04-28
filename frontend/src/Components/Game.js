import {useEffect, useState} from 'react';
import GamePlay from './GamePlay';

export default function Game ({mode}) {
    const [id, setId] = useState()
    const [code, setCode] = useState()

    useEffect( () => {
        newGame()
    }, [])

    const newGame = async () => {
        console.log('creating')
        const res = await fetch('/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({remaining_attempts: 10, mode: mode})    
        })
            if (res.ok) {
                const data = await res.json();
                console.log(data)
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