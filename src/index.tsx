import React from 'react'
import { createRoot } from 'react-dom/client';
import Team from './Team';

const App = () => {
    return (
        <div>
            <Team name="Team 1" score={0} />
            <Team name="Team 2" score={0} />
        </div>
    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
