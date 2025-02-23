import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import Team from './components/team'
import { useScore } from './hooks/use-score';

const root = createRoot(document.getElementById('app'));

interface GameScore {
    team1?: number
    team2?: number
}

const App = () => {
    const [cursor, setCursor] = useState<number>(0)
    const moveCursorToEnd = () => setCursor(history.length)
    const moveCursorBackOne = () => {
        const newCursor = cursor - 1
        setCursor(newCursor)
        return newCursor
    }
    const moveCursorForwardOne = () => {
        const newCursor = cursor + 1
        setCursor(newCursor)
        return newCursor
    }

    const [history, setHistory] = useState<GameScore[]>([{ team1: 0, team2: 0 }])
    const pushHistory = (score: GameScore) => setHistory([...history, score])
    const [cachedHistoryItem, setCachedHistoryItem] = useState<GameScore>(null)
    const getCachedHistoryItem = () => ({
        team1: cachedHistoryItem?.team1 ?? 0,
        team2: cachedHistoryItem?.team2 ?? 0,
    })
    const hasCachedHistoryItem = () => cachedHistoryItem !== null
    const clearCache = () => setCachedHistoryItem(null)

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()

    const updateGameHistory = (team: keyof GameScore, value: number) => {
        setCachedHistoryItem({
            ...getCachedHistoryItem(),
            [team]: value
        })
        clearTimeout(timer)
        setTimer(setTimeout(() => {
            moveCursorToEnd()
            pushHistory({
                ...getCachedHistoryItem(),
                [team]: value
            })
            clearCache()
        }, 3000))
    }

    const team1Score = useScore({
        onChange: (value) => {
            updateGameHistory('team1', value)
        }
    })

    const team2Score = useScore({
        onChange: (value) => {
            updateGameHistory('team2', value)
        }
    })

    const getPreviousValues = () => {
        const newCursor = !hasCachedHistoryItem() ? moveCursorBackOne() : cursor
        return history[newCursor]
    }

    const getNextValues = () => {
        const newCursor = moveCursorForwardOne()
        return history[newCursor]
    }

    const onUndo = () => {
        const previousValues = getPreviousValues()
        team1Score.setValue(previousValues.team1)
        team2Score.setValue(previousValues.team2)

        if (hasCachedHistoryItem()) {
            pushHistory(cachedHistoryItem)
            clearCache()
        }
        setIsRedoVisible(true)
    }

    const [isRedoVisible, setIsRedoVisible] = useState<boolean>(false)

    const isAtFrontOfHistory = history.slice(0, cursor).length === 0

    const onRedo = () => {
        const nextValues = getNextValues()
        team1Score.setValue(nextValues.team1)
        // TODO make sure I set team2 here as well as team 1
    }

    const isAtEndOfHistory = cursor === (history.length -1)

    return (
        <div className="container">
            <div className="columns">
                <Team teamName='Team 1' id="team1" score={team1Score} />
                <Team teamName='Team 2' id="team2" score={team2Score} />
            </div>
            <button className="button" onClick={onUndo} disabled={isAtFrontOfHistory && !hasCachedHistoryItem()}>Undo</button>&nbsp;
            {isRedoVisible && <button className="button" id="btn-redo" onClick={onRedo} disabled={isAtEndOfHistory}>Redo</button>}
        </div>
    )
}

root.render(<App />);
