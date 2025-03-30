import React from 'react'
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app'));

const App = () => {
    return (
        <div>
            <div role="listitem">
                <h2 id="team1-name">Team 1</h2>
                <div aria-labelledby="team1-name">0</div>
            </div>
        </div>
    )
}

root.render(<App />);
