import React, { useState } from 'react';

interface TeamProps {
    name: string;
    score: number;
}

const Team = ({ name: initialName, score: initialScore }: TeamProps) => {
    const [score, setScore] = useState(initialScore);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);
    const teamNameId = `${name.toLowerCase().replace(' ', '-')}-name`;
    
    const incrementScore = () => setScore(score + 1);
    const decrementScore = () => {
        if (score === 0) return;
        setScore(score - 1);
    };
    
    const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value.trim();
        const wasNameCleared = name === '';
        setName(wasNameCleared ? initialName : name);
        setIsEditing(false);
    };

    const handleEscapeKey = () => {
        setIsEditing(false);
    };
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleEnterKey(event);
        } else if (event.key === 'Escape') {
            handleEscapeKey();
        }
    };
    
    return (
        <div role="listitem">
            <h2 id={teamNameId} style={{ display: isEditing ? 'none' : 'block' }}>{name}</h2>
            {isEditing && (
                <input
                    type="text"
                    aria-label="Change team name"
                    defaultValue={name}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onBlur={() => setIsEditing(false)}
                />
            )}
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
            <button 
                aria-label={`Change name of ${name}`}
                onClick={() => setIsEditing(true)}
            >
                Edit
            </button>
        </div>
    );
};

export default Team; 