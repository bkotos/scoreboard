import React from 'react'
import { createRoot } from 'react-dom/client';
import Team from './components/team'
import { useScore } from './hooks/use-score';

const root = createRoot(document.getElementById('app'));

const App = () => {
    const team1Score = useScore()
    const team2Score = useScore()

    return (
        <div className="container">
            <div className="columns">
                <Team teamName='Team 1' id="team1" score={team1Score} />
                <Team teamName='Team 2' id="team2" score={team2Score} />
            </div>
            <button className="button">Undo</button>
        </div>
    )
}

root.render(<App />);
