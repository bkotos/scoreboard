import React from 'react'
import { createRoot } from 'react-dom/client';
import Team from './components/team'

const root = createRoot(document.getElementById('app'));

const App = () => {
    return (
        <div className="container">
            <div className="columns">
                <Team teamName="Team 1" score={0} />
                <Team teamName="Team 2" score={0} />
            </div>
        </div>
    )
}

root.render(<App />);
