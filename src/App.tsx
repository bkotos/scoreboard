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
  const [team1Score, setTeam1Score] = useState(() => {
    const saved = localStorage.getItem('team1Score');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [team2Score, setTeam2Score] = useState(() => {
    const saved = localStorage.getItem('team2Score');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [history, setHistory] = useState<HistoryState[]>(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });
  const [redoHistory, setRedoHistory] = useState<HistoryState[]>([]);
  const [showUndo, setShowUndo] = useState(() => {
    const saved = localStorage.getItem('showUndo');
    return saved ? JSON.parse(saved) : false;
  });
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
      localStorage.setItem('history', JSON.stringify(newHistory));
      setShowUndo(true);
      localStorage.setItem('showUndo', JSON.stringify(true));
      setHasPendingChanges(true);
    }

    // Update the score
    if (team === 'team1') {
      setTeam1Score(newScore);
      localStorage.setItem('team1Score', newScore.toString());
    } else {
      setTeam2Score(newScore);
      localStorage.setItem('team2Score', newScore.toString());
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
      localStorage.setItem('team1Score', lastState.team1Score.toString());
      localStorage.setItem('team2Score', lastState.team2Score.toString());
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      localStorage.setItem('history', JSON.stringify(newHistory));
      setShowRedo(true);
      setHasPendingChanges(false);
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      // Store current state in undo history
      const newHistory = [...history, getCurrentState()];
      setHistory(newHistory);
      localStorage.setItem('history', JSON.stringify(newHistory));
      
      // Restore to redo state
      const redoState = redoHistory[redoHistory.length - 1];
      setTeam1Score(redoState.team1Score);
      setTeam2Score(redoState.team2Score);
      localStorage.setItem('team1Score', redoState.team1Score.toString());
      localStorage.setItem('team2Score', redoState.team2Score.toString());
      setRedoHistory(prev => prev.slice(0, -1));
      setShowUndo(true);
      localStorage.setItem('showUndo', JSON.stringify(true));
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