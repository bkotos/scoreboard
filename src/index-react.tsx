import React from 'react'
import { createRoot } from 'react-dom/client';
import Team from './components/team'

const root = createRoot(document.getElementById('app'));

const App = () => {
    return (
        <div className="container">
            <div className="columns">
                <Team teamName='Team 1' id="team1" />
                <Team teamName='Team 2' id="team2" />
            </div>
            <button className="button">Undo</button>
        </div>
    )
}

root.render(<App />);
