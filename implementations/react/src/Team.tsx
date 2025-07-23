import React, { useState } from 'react';

interface TeamProps {
    name: string;
    onNameChange: (name: string) => void;
    score: number;
    onScoreChange: (score: number) => void;
    teamId: string;
}

const Team = ({ name: initialName, onNameChange, score: initialScore, onScoreChange, teamId }: TeamProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [originalTeamIdentity] = useState(teamId);
    const teamNameId = `${initialName.toLowerCase().replace(' ', '-')}-name`;
    
    const getTeamCardClass = () => {
        if (originalTeamIdentity === 'Team 1') return 'card team1-card';
        else return 'card team2-card';
    };

    const getEditButtonClass = () => {
        const baseClass = originalTeamIdentity === 'Team 1' ? 'button is-small is-danger' : 'button is-small is-info';
        const teamClass = originalTeamIdentity === 'Team 1' ? 'team1-edit-button' : 'team2-edit-button';
        return `${baseClass} ${teamClass}`;
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
        <div className={getTeamCardClass()} role="listitem">
            <div className="card-content has-text-centered p-4">
                <p className={`subtitle mb-0 ${isEditing ? 'editing-hidden' : 'is-inline'}`} role="heading" aria-level={1}>
                    <span id={teamNameId}>{initialName}</span>&nbsp;
                    <button 
                        className={getEditButtonClass()}
                        aria-label={`Change name of ${initialName}`}
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                </p>
                {isEditing && (
                    <input
                        className="subtitle mb-0 p-0"
                        type="text"
                        aria-label="Change team name"
                        defaultValue={initialName}
                        autoFocus
                        onKeyDown={handleKeyDown}
                        onBlur={() => setIsEditing(false)}
                    />
                )}
                <div className="title score" role="heading" aria-level={2} aria-labelledby={teamNameId}>{initialScore}</div>
            </div>
            <footer className="card-footer">
                <button 
                    className="card-footer-item"
                    aria-label={`Subtract one point for ${initialName}`}
                    onClick={decrementScore}
                >
                    -1
                </button>
                <button 
                    className="card-footer-item"
                    aria-label={`Add one point for ${initialName}`}
                    onClick={incrementScore}
                >
                    +1
                </button>
            </footer>
        </div>
    );
};

export default Team; 