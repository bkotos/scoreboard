import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react'

interface TeamProps {
    id: string
    teamName: string
}

export default ({ id, teamName }: TeamProps) => {
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
        if (e.code === 'Enter') {
            setIsEditing(false)
        }
    }

    const onBlur = () => setIsEditing(false)

    return (
        <div className="column">
            <div className="card" role="listitem" data-team={id}>
                <div className="card-content has-text-centered p-4">
                    <p className={`subtitle mb-0 ${isEditing && 'is-hidden'}`} id={`title-${id}`} role="heading" aria-level="1">
                        <span id={`teamName-${id}`}>{teamName}</span>
                        <button id={`btn-edit-teamName-${id}`} className="button is-small is-danger" aria-label={`Change name of ${teamName}`} onClick={() => setIsEditing(true)}>Edit</button>
                    </p>
                    {isEditing && (
                        <input
                            ref={inputRef}
                            id={`edit-teamName-${id}`}
                            type="text"
                            className={`subtitle mb-5 p-0`}
                            value={teamName}
                            aria-label="Change team name"
                            onKeyDown={onKeyDown}
                            onBlur={onBlur}
                        />
                    )}
                    <p className="title score" role="heading" aria-labelledby={`teamName-${id}`} id={`score-${id}`} aria-level="2">{score}</p>
                </div>
                <footer className="card-footer">
                <button className="card-footer-item" aria-label={`Subtract one point for ${teamName}`} onClick={subtractOne}>
                    -1
                </button>
                <button className="card-footer-item" aria-label={`Add one point for ${teamName}`} onClick={addOne}>
                    +1
                </button>
                </footer>
            </div>
        </div>
    )
}
