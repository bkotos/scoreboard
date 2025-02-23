import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import Team from './components/team'
import { useScore } from './hooks/use-score';

const root = createRoot(document.getElementById('app'));

const App = () => {
    const [cursor, setCursor] = useState<number>(0)
    const [history, setHistory] = useState<number[]>([0])

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()

    const team1Score = useScore({
        onChange: (score) => {
            clearTimeout(timer)
            setTimer(setTimeout(() => {
                setCursor(history.length)
                setHistory([...history, score])
            }, 3000))
        }
    })

    const team2Score = useScore({
        onChange: () => {}
    })

    return (
        <div className="container">
            <div className="columns">
                <Team teamName='Team 1' id="team1" score={team1Score} />
                <Team teamName='Team 2' id="team2" score={team2Score} />
            </div>
            <button className="button" onClick={() => {
                const newCursor = cursor - 1
                setCursor(newCursor)
                const value = history[newCursor]
                team1Score.setValue(value)
            }}>Undo</button>
        </div>
    )
}

root.render(<App />);
