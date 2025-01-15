import { Team } from "./model"

export interface HistoryItem {
    teamId: string
    oldScore: number
    newScore: number
}

export const hasUnprocessedBursts = () => {
    return !!localStorage.getItem(`scoreboard-burst-first-${1}`) || !!localStorage.getItem(`scoreboard-burst-first-${2}`)
}

const initialize = (storageId: number) => {
    const burst = (teamId: string, oldScore: number, newScore: number) => {
        const last: HistoryItem = { teamId, oldScore, newScore }
        localStorage.setItem(`scoreboard-burst-last-${storageId}`, JSON.stringify(last))
        if (!localStorage.getItem(`scoreboard-burst-first-${storageId}`))
            localStorage.setItem(`scoreboard-burst-first-${storageId}`, JSON.stringify(last))
    }
    const reset = () => {
        localStorage.removeItem(`scoreboard-burst-first-${storageId}`)
        localStorage.removeItem(`scoreboard-burst-last-${storageId}`)
    }
    const getHistoryItemToRecord = (): HistoryItem => {
        if (!localStorage.getItem(`scoreboard-burst-first-${storageId}`)) return
        const first = JSON.parse(localStorage.getItem(`scoreboard-burst-first-${storageId}`)) as HistoryItem
        const last = JSON.parse(localStorage.getItem(`scoreboard-burst-last-${storageId}`)) as HistoryItem

        return {
            teamId: first.teamId,
            oldScore: first.oldScore,
            newScore: last.newScore,
        }
    }

    return {
        burst,
        reset,
        getHistoryItemToRecord,
        get first() {
            return JSON.parse(localStorage.getItem(`scoreboard-burst-first-${storageId}`)) as HistoryItem
        },
        get last() {
            return JSON.parse(localStorage.getItem(`scoreboard-burst-last-${storageId}`)) as HistoryItem
        }
    }
}

let storageId = 0
export const team1Burst = initialize(++storageId)
export const team2Burst = initialize(++storageId)

export const getBurstByTeam = (team: Team) => {
    if (team.id === 'team1') return team1Burst
    else return team2Burst
}