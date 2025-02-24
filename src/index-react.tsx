import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import Team from './components/team'
import { useGameEngine } from './hooks/use-game-engine';

const root = createRoot(document.getElementById('app'));

const App = () => {
    const gameEngine = useGameEngine()
    const [isRedoVisible, setIsRedoVisible] = useState<boolean>(false)
    const onUndo = () => {
        gameEngine.undo()
        setIsRedoVisible(true)
    }

    return (
        <div className="container">
            <div className="columns">
                <Team teamName='Team 1' id="team1" score={gameEngine.team1Score} />
                <Team teamName='Team 2' id="team2" score={gameEngine.team2Score} />
            </div>
            <button className="button" onClick={onUndo} disabled={gameEngine.isAtFrontOfHistory && !gameEngine.hasCachedHistoryItem()}>Undo</button>&nbsp;
            {isRedoVisible && <button className="button" id="btn-redo" onClick={gameEngine.redo} disabled={gameEngine.isAtEndOfHistory}>Redo</button>}
        </div>
    )
}

root.render(<App />);
