import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react'

interface TeamProps {
    id: string
    teamName: string
}

export default (props: TeamProps) => {
    const [score, setScore] = useState<number>(0)
    const addOne = () => {
        setScore(score + 1)
    }
    const subtractOne = () => {
        if (score > 0) setScore(score - 1)
    }

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (isEditing) inputRef.current.focus()
    }, [isEditing])

    const onKeyDown: KeyboardEventHandler = (e) => {
        switch (e.code) {
            case 'Enter':
                onEnter()
                break;
            case 'Escape':
                onEscape()
                break;
        }
    }
    
    const onEnter = () => {
        setIsEditing(false)
        if (!teamName) setTeamName(props.teamName)
    }

    const onEscape = () => {
        setTeamName(props.teamName)
        setIsEditing(false)
    }

    const onBlur = () => setIsEditing(false)

    const [teamName, setTeamName] = useState<string>(props.teamName)

    return (
        <div className="column">
            <div className="card" role="listitem" data-team={props.id}>
                <div className="card-content has-text-centered p-4">
                    <p className={`subtitle mb-0 ${isEditing && 'is-hidden'}`} id={`title-${props.id}`} role="heading" aria-level={1}>
                        <span id={`teamName-${props.id}`}>{teamName}</span>
                        <button id={`btn-edit-teamName-${props.id}`} className="button is-small is-danger" aria-label={`Change name of ${props.teamName}`} onClick={() => setIsEditing(true)}>Edit</button>
                    </p>
                    {isEditing && (
                        <input
                            ref={inputRef}
                            id={`edit-teamName-${props.id}`}
                            type="text"
                            className={`subtitle mb-5 p-0`}
                            value={teamName}
                            aria-label="Change team name"
                            onKeyDown={onKeyDown}
                            onBlur={onBlur}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                    )}
                    <p className="title score" role="heading" aria-labelledby={`teamName-${props.id}`} id={`score-${props.id}`} aria-level={2}>{score}</p>
                </div>
                <footer className="card-footer">
                <button className="card-footer-item" aria-label={`Subtract one point for ${props.teamName}`} onClick={subtractOne}>
                    -1
                </button>
                <button className="card-footer-item" aria-label={`Add one point for ${props.teamName}`} onClick={addOne}>
                    +1
                </button>
                </footer>
            </div>
        </div>
    )
}
