import React, { useState, useRef } from 'react';
import Team from './Team';
import useGameState, { HistoryState } from './hooks/useGameState';

const COMMIT_DELAY_MS = 3000;

function App() {
  const { gameState, setGameState } = useGameState();
  const { team1Name, team2Name, team1Score, team2Score, history, showUndo } = gameState;
  const { setTeam1Name, setTeam2Name, setTeam1Score, setTeam2Score, setHistory, setShowUndo } = setGameState;
  
  const [redoHistory, setRedoHistory] = useState<HistoryState[]>([]);
  const [showRedo, setShowRedo] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const getCurrentState = (): HistoryState => ({ team1Score, team2Score });

  const resetCommitTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setHasPendingChanges(false);
    }, COMMIT_DELAY_MS);
  };

  const handleScoreChange = (team: 'team1' | 'team2', newScore: number) => {
    // Clear redo state when making new changes
    if (showRedo) {
      setRedoHistory([]);
    }

    // Save current state to history if this is the first change in the group
    if (!hasPendingChanges) {
      const newHistory = [...history, getCurrentState()];
      setHistory(newHistory);
      setShowUndo(true);
      setHasPendingChanges(true);
    }

    // Update the score
    if (team === 'team1') {
      setTeam1Score(newScore);
    } else {
      setTeam2Score(newScore);
    }

    // Reset the commit timeout
    resetCommitTimeout();
  };

  const handleUndo = () => {
    if (history.length > 0) {
      // Store current state in redo history
      setRedoHistory(prev => [...prev, getCurrentState()]);
      
      // Revert to previous state
      const lastState = history[history.length - 1];
      setTeam1Score(lastState.team1Score);
      setTeam2Score(lastState.team2Score);
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setShowRedo(true);
      setHasPendingChanges(false);
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      // Store current state in undo history
      const newHistory = [...history, getCurrentState()];
      setHistory(newHistory);
      
      // Restore to redo state
      const redoState = redoHistory[redoHistory.length - 1];
      setTeam1Score(redoState.team1Score);
      setTeam2Score(redoState.team2Score);
      setRedoHistory(prev => prev.slice(0, -1));
      setShowUndo(true);
    }
  };

  const handleNewGame = () => {
    // Reset scores to 0
    setTeam1Score(0);
    setTeam2Score(0);
    
    // Clear history
    setHistory([]);
    setRedoHistory([]);
    setShowUndo(false);
    setShowRedo(false);
    
    // Clear pending changes
    setHasPendingChanges(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className="container pt-6">
      <div className="columns">
        <div className="column">
          <Team
            name={team1Name}
            onNameChange={setTeam1Name}
            score={team1Score}
            onScoreChange={(score) => handleScoreChange('team1', score)}
          />
        </div>
        <div className="column">
          <Team
            name={team2Name}
            onNameChange={setTeam2Name}
            score={team2Score}
            onScoreChange={(score) => handleScoreChange('team2', score)}
          />
        </div>
      </div>
      {showUndo && <button className="button" onClick={handleUndo} disabled={history.length === 0}>Undo</button>}
      {showRedo && <button className="button" onClick={handleRedo} disabled={redoHistory.length === 0}>Redo</button>}<br /><br />
      <button className="button" onClick={handleNewGame}>New game</button>
    </div>
  );
}

export default App; 