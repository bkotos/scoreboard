import React, { useState, useRef } from 'react';
import Team from './Team';

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
  const [showUndo, setShowUndo] = useState(false);
  const [showRedo, setShowRedo] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const handleScoreChange = (team: 'team1' | 'team2', newScore: number) => {
    // Save current state to history if this is the first change in the group
    if (!hasPendingChanges) {
      const currentState = { team1Score, team2Score };
      setHistory(prev => [...prev, currentState]);
      setShowUndo(true);
      setHasPendingChanges(true);
    }

    // Update the score
    if (team === 'team1') {
      setTeam1Score(newScore);
    } else {
      setTeam2Score(newScore);
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to commit the current group of changes
    timeoutRef.current = setTimeout(() => {
      setHasPendingChanges(false);
    }, 3000);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setTeam1Score(lastState.team1Score);
      setTeam2Score(lastState.team2Score);
      setHistory(prev => prev.slice(0, -1));
      setShowRedo(true);
      
      if (history.length === 1) {
        setShowUndo(false);
      }
    }
  };

  const handleRedo = () => {
    // Empty for now
  };

  return (
    <div className="App">
      {showUndo && <button id="undo" onClick={handleUndo}>Undo</button>}
      {showRedo && <button id="redo" onClick={handleRedo}>Redo</button>}
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