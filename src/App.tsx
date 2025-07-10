import React, { useState, useRef } from 'react';
import Team from './Team';

const COMMIT_DELAY_MS = 3000;

interface HistoryState {
  team1Score: number;
  team2Score: number;
}

function App() {
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [redoHistory, setRedoHistory] = useState<HistoryState[]>([]);
  const [showUndo, setShowUndo] = useState(false);
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
      setShowRedo(false);
      setRedoHistory([]);
    }

    // Save current state to history if this is the first change in the group
    if (!hasPendingChanges) {
      setHistory(prev => [...prev, getCurrentState()]);
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
      setHistory(prev => prev.slice(0, -1));
      setShowRedo(true);
      setHasPendingChanges(false);
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      // Store current state in undo history
      setHistory(prev => [...prev, getCurrentState()]);
      
      // Restore to redo state
      const redoState = redoHistory[redoHistory.length - 1];
      setTeam1Score(redoState.team1Score);
      setTeam2Score(redoState.team2Score);
      setRedoHistory(prev => prev.slice(0, -1));
      setShowUndo(true);
    }
  };

  return (
    <div className="App">
      {showUndo && <button id="undo" onClick={handleUndo} disabled={history.length === 0}>Undo</button>}
      {showRedo && <button id="redo" onClick={handleRedo} disabled={redoHistory.length === 0}>Redo</button>}
      <ul className="teams">
        <Team
          name={team1Name}
          onNameChange={setTeam1Name}
          score={team1Score}
          onScoreChange={(score) => handleScoreChange('team1', score)}
        />
        <Team
          name={team2Name}
          onNameChange={setTeam2Name}
          score={team2Score}
          onScoreChange={(score) => handleScoreChange('team2', score)}
        />
      </ul>
    </div>
  );
}

export default App; 