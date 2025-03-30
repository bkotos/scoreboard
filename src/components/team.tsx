import React from 'react';

interface TeamProps {
    teamName: string;
    score: number;
}

const Team: React.FC<TeamProps> = ({ teamName, score }) => {
    return (
        <div role="listitem" className="column">
            <h2 id={`${teamName.toLowerCase().replace(' ', '-')}-label`}>{teamName}</h2>
            <h3 aria-labelledby={`${teamName.toLowerCase().replace(' ', '-')}-label`}>{score}</h3>
        </div>
    );
};

export default Team; 