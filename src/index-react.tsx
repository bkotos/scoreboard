import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import Team from './components/team'
import { useScore } from './hooks/use-score';

const root = createRoot(document.getElementById('app'));

const App = () => {
    const [cursor, setCursor] = useState<number>(0)
    const moveCursorToEnd = () => setCursor(history.length)
    const moveCursorBackOne = () => {
        const newCursor = cursor - 1
        setCursor(newCursor)
        return newCursor
    }

    const [history, setHistory] = useState<number[]>([0])
    const pushHistory = (value: number) => setHistory([...history, value])
    const [cachedHistoryItem, setCachedHistoryItem] = useState<number>(null)
    const hasCachedHistoryItem = () => cachedHistoryItem !== null
    const clearCache = () => setCachedHistoryItem(null)

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()

    const team1Score = useScore({
        onChange: (score) => {
            setCachedHistoryItem(score)
            clearTimeout(timer)
            setTimer(setTimeout(() => {
                moveCursorToEnd()
                pushHistory(score)
                clearCache()
            }, 3000))
        }
    })

    const team2Score = useScore({
        onChange: () => {}
    })

    const getPreviousValue = () => {
        const newCursor = !hasCachedHistoryItem() ? moveCursorBackOne() : cursor
        return history[newCursor]
    }

    const onUndo = () => {
        const previousValue = getPreviousValue()
        team1Score.setValue(previousValue)

        if (hasCachedHistoryItem()) {
            pushHistory(cachedHistoryItem)
            clearCache()
        }
        setIsRedoVisible(true)
    }

    const [isRedoVisible, setIsRedoVisible] = useState<boolean>(false)

    const isAtFrontOfHistory = history.slice(0, cursor).length === 0

    return (
        <div className="container">
            <div className="columns">
                <Team teamName='Team 1' id="team1" score={team1Score} />
                <Team teamName='Team 2' id="team2" score={team2Score} />
            </div>
            <button className="button" onClick={onUndo} disabled={isAtFrontOfHistory && !hasCachedHistoryItem()}>Undo</button>&nbsp;
            {isRedoVisible && <button className="button" id="btn-redo" onClick={() => {
                const newCursor = cursor + 1
                setCursor(newCursor)
                const historyItem = history[newCursor]
                team1Score.setValue(historyItem)
            }}>Redo</button>}
        </div>
    )
}

root.render(<App />);
