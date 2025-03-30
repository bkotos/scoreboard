import React, { useState } from 'react';

interface TeamProps {
    name: string;
    score: number;
}

const Team = ({ name, score: initialScore }: TeamProps) => {
    const [score, setScore] = useState(initialScore);
    const teamNameId = `${name.toLowerCase().replace(' ', '-')}-name`;
    
    const incrementScore = () => setScore(score + 1);
    const decrementScore = () => setScore(Math.max(0, score - 1));
    
    return (
        <div role="listitem">
            <h2 id={teamNameId}>{name}</h2>
            <div aria-labelledby={teamNameId}>{score}</div>
            <button 
                aria-label={`Add one point for ${name}`}
                onClick={incrementScore}
            >
                Add
            </button>
            <button 
                aria-label={`Subtract one point for ${name}`}
                onClick={decrementScore}
            >
                Subtract
            </button>
        </div>
    );
};

export default Team; 