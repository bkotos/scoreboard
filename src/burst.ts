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
    const resetBurst = () => {
        first = null
        last = null
    }

    return {
        burst,
        resetBurst,
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