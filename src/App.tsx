import React, { useState } from 'react';
import Team from './Team';

function App() {
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  return (
    <div className="App">
      <button id="undo">Undo</button>
      <ul className="teams">
        <Team
          name={team1Name}
          onNameChange={setTeam1Name}
          score={team1Score}
          onScoreChange={setTeam1Score}
        />
        <Team
          name={team2Name}
          onNameChange={setTeam2Name}
          score={team2Score}
          onScoreChange={setTeam2Score}
        />
      </ul>
    </div>
  );
}

export default App; 