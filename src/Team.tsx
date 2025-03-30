import React from 'react';

interface TeamProps {
    name: string;
    score: number;
}

const Team = ({ name, score }: TeamProps) => {
    const teamNameId = `${name.toLowerCase().replace(' ', '-')}-name`;
    
    return (
        <div role="listitem">
            <h2 id={teamNameId}>{name}</h2>
            <div aria-labelledby={teamNameId}>{score}</div>
        </div>
    );
};

export default Team; 