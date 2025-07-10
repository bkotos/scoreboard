import React, { useState } from 'react';

interface TeamProps {
    name: string;
    onNameChange: (name: string) => void;
    score: number;
    onScoreChange: (score: number) => void;
}

const Team = ({ name: initialName, onNameChange, score: initialScore, onScoreChange }: TeamProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const teamNameId = `${initialName.toLowerCase().replace(' ', '-')}-name`;
    
    // Determine styling based on team name
    const getTeamStyle = () => {
        if (initialName === 'Team 1') {
            return { backgroundColor: '#bc2525' };
        }
        return {};
    };
    
    const incrementScore = () => onScoreChange(initialScore + 1);
    const decrementScore = () => {
        if (initialScore === 0) return;
        onScoreChange(initialScore - 1);
    };

    const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const newName = event.currentTarget.value.trim();
        onNameChange(newName === '' ? initialName : newName);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleEnterKey(event);
        } else if (event.key === 'Escape') {
            setIsEditing(false);
        }
    };
    
    return (
        <div role="listitem" style={getTeamStyle()}>
            <h2 id={teamNameId} style={{ display: isEditing ? 'none' : 'block' }}>{initialName}</h2>
            {isEditing && (
                <input
                    type="text"
                    aria-label="Change team name"
                    defaultValue={initialName}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onBlur={() => setIsEditing(false)}
                />
            )}
            <div aria-labelledby={teamNameId}>{initialScore}</div>
            <button 
                aria-label={`Add one point for ${initialName}`}
                onClick={incrementScore}
            >
                Add
            </button>
            <button 
                aria-label={`Subtract one point for ${initialName}`}
                onClick={decrementScore}
            >
                Subtract
            </button>
            <button 
                aria-label={`Change name of ${initialName}`}
                onClick={() => setIsEditing(true)}
            >
                Edit
            </button>
        </div>
    );
};

export default Team; 