import React, { useState } from 'react';

interface TeamProps {
    name: string;
    score: number;
}

const Team = ({ name, score: initialScore }: TeamProps) => {
    const [score, setScore] = useState(initialScore);
    const teamNameId = `${name.toLowerCase().replace(' ', '-')}-name`;
    
    return (
        <div role="listitem">
            <h2 id={teamNameId}>{name}</h2>
            <div aria-labelledby={teamNameId}>{score}</div>
            <button 
                aria-label={`Add one point for ${name}`}
                onClick={() => setScore(score + 1)}
            >
                Add
            </button>
        </div>
    );
};

export default Team; 