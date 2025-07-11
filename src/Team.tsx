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
        if (initialName === 'Team 2') {
            return { backgroundColor: '#2772db' };
        }
        return {};
    };

    const getTextStyle = () => {
        if (initialName === 'Team 1' || initialName === 'Team 2') {
            return { color: '#fff' };
        }
        return {};
    };

    const getScoreStyle = () => {
        if (initialName === 'Team 1' || initialName === 'Team 2') {
            return { fontSize: '180px', ...getTextStyle() };
        }
        return getTextStyle();
    };

    const getEditButtonStyle = () => {
        if (initialName === 'Team 1') {
            return { 
                color: 'rgb(26, 0, 5)', 
                backgroundColor: 'rgb(255, 102, 133)' 
            };
        }
        if (initialName === 'Team 2') {
            return { 
                color: 'rgb(0, 36, 51)', 
                backgroundColor: 'rgb(102, 209, 255)' 
            };
        }
        return getTextStyle();
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
        <div className="card" role="listitem" style={getTeamStyle()}>
            <div className="card-content has-text-centered p-4">
                <p className="subtitle mb-0" id={teamNameId} role="heading" style={{ display: isEditing ? 'none' : 'block', ...getTextStyle() }}>{initialName}</p>
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
                <div className="title score" role="heading" aria-level={2} aria-labelledby={teamNameId} style={getScoreStyle()}>{initialScore}</div>
            </div>
            <footer className="card-footer">
                <button 
                    className="card-footer-item"
                    aria-label={`Add one point for ${initialName}`}
                    onClick={incrementScore}
                    style={getTextStyle()}
                >
                    Add
                </button>
                <button 
                    className="card-footer-item"
                    aria-label={`Subtract one point for ${initialName}`}
                    onClick={decrementScore}
                    style={getTextStyle()}
                >
                    Subtract
                </button>
                <button 
                    className={initialName === 'Team 1' ? 'button is-small is-danger' : 'button is-small is-info'}
                    aria-label={`Change name of ${initialName}`}
                    onClick={() => setIsEditing(true)}
                    style={getEditButtonStyle()}
                >
                    Edit
                </button>
            </footer>
        </div>
    );
};

export default Team; 