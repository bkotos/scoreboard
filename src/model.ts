export interface Team {
    id: string
    name: string
    score: number
}

export const getTeam1Name = (): string => {
    const raw = localStorage.getItem('scoreboard-team1-name')
    if (!raw) return 'Team 1'
    
    return raw
}

const setTeam1Name = (name: string) => {
    localStorage.setItem('scoreboard-team1-name', name)
}

export const getTeam2Name = (): string => {
    const raw = localStorage.getItem('scoreboard-team2-name')
    if (!raw) return 'Team 2'
    
    return raw
}

const setTeam2Name = (name: string) => {
    localStorage.setItem('scoreboard-team2-name', name)
}

export const setTeamName = (team: Team, name: string) => {
    team.name = name

    if (team.id === 'team1') setTeam1Name(name)
    else setTeam2Name(name)
}
