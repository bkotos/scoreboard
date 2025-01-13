import { ELEMENTS } from "./view";
import { Team } from "./model";

export const teams: Team[] = []

interface HistoryItem {
    teamId: string
    oldScore: number
    newScore: number
}

const history: HistoryItem[] = []
const burst: HistoryItem[] = []

let timeout: ReturnType<typeof setTimeout>
export const add = (team: Team) => {
    const oldScore = team.score
    const newScore = oldScore + 1
    team.score = newScore
    const currentHistoryItem = {
        teamId: team.id,
        oldScore,
        newScore,
    }
    burst.push({
        ...currentHistoryItem
    })
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        console.log('timeout reached', {oldScore, newScore})
        const first = burst[0]!
        const last = burst[burst.length - 1]!
        const consolidated: HistoryItem = {
            teamId: first.teamId,
            oldScore: first.oldScore,
            newScore: last.newScore,
        }
        history.push({
            ...consolidated,
        })
        burst.length = 0
    }, 3000)
}

export const undo = () => {
    const lastHistoryItem = history[history.length - 1]!
    const team = teams.find((t) => t.id === lastHistoryItem.teamId)!
    team.score = lastHistoryItem.oldScore
    ELEMENTS.score(team).innerText = `${team.score}`
}
