import { Team } from "./model"

export interface HistoryItem {
    teamId: string
    oldScore: number
    newScore: number
}

const initialize = () => {
    let first: HistoryItem = null
    let last: HistoryItem = null
    const burst = (teamId: string, oldScore: number, newScore: number) => {
        last = { teamId, oldScore, newScore }
        if (!first) first = last
    }
    const reset = () => {
        first = null
        last = null
    }
    const getHistoryItemToRecord = (): HistoryItem => {
        // const team1HistoryItem: HistoryItem = team1Burst.first ? {
        //     teamId: team1Burst.first!.teamId,
        //     oldScore: team1Burst.first!.oldScore,
        //     newScore: team1Burst.last.newScore,
        // } : undefined

        if (!first) return

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
            return first
        },
        get last() {
            return last
        }
    }
}

export const team1Burst = initialize()
export const team2Burst = initialize()

export const getBurstByTeam = (team: Team) => {
    if (team.id === 'team1') return team1Burst
    else return team2Burst
}