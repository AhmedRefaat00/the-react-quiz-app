import { useEffect } from "react"

function Timer({ dispatch, tick }) {
    const mins = Math.floor(tick / 60)
    const secs = tick % 60;
    useEffect(() => {
        const tempInterval = setInterval(() => {
            dispatch({ type: 'decTimer' })
        }, 1000)

        return () => clearInterval(tempInterval)
    }, [dispatch])

    return (
        <div className="timer">
            <p>{mins < 10 && '0'}{mins}:{secs < 10 && '0'}{secs}</p>

        </div>
    )
}

export default Timer
