import React from 'react'
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app'));

const App = () => {
    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
}

root.render(<App />);
