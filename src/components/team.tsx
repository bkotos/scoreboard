import React, { useState } from 'react'

interface TeamProps {
    teamName: string
}

export default ({ teamName }: TeamProps) => {
    const [score, setScore] = useState<number>(0)

    return (
        <div className="column">
            <div className="card" role="listitem" data-team="team1">
                <div className="card-content has-text-centered p-4">
                    <p className="subtitle mb-0" id="title-team1" role="heading" aria-level="1">
                        <span id="teamName-team1">{teamName}</span>
                        <button id="btn-edit-teamName-team1" className="button is-small is-danger" aria-label="Change name of hello world">Edit</button>
                    </p>
                    <input id="edit-teamName-team1" type="text" className="subtitle mb-5 p-0 is-hidden" value="hello world" aria-label="Change team name" />
                    <p className="title score" role="heading" aria-labelledby="teamName-team1" id="score-team1" aria-level="2">{score}</p>
                </div>
                <footer className="card-footer">
                <button className="card-footer-item" aria-label="Subtract one point for hello world" id="btn-subtract-team1">
                    -1
                </button>
                <button className="card-footer-item" aria-label={`Add one point for ${teamName}`} id="btn-add-team1" onClick={() => setScore(score + 1)}>
                    +1
                </button>
                </footer>
            </div>
        </div>
    )
}
