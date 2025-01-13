import { ELEMENTS, renderScore } from "./view";
import { Team } from "./model";

export const teams: Team[] = []

interface HistoryItem {
    teamId: string
    oldScore: number
    newScore: number
}

const history: HistoryItem[] = []
let cursor = null
const getLastHistoryItem = () => {
    if (cursor === null) cursor = history.length - 1
    else cursor--

    return history[cursor]
}

let first: HistoryItem = null
let last: HistoryItem = null
const burst = (teamId: string, oldScore: number, newScore: number) => {
    last = { teamId, oldScore, newScore }
    if (!first) first = last
}
const recordBurst = () => {
    const historyItem: HistoryItem = {
        teamId: first!.teamId,
        oldScore: first!.oldScore,
        newScore: last.oldScore,
    }
    history.push(historyItem)
    first = null
    last = null
}
let timeout: ReturnType<typeof setTimeout>
const recordBurstAfterThreeSecondsOfNoActivity = () => {
    clearTimeout(timeout)
    timeout = setTimeout(recordBurst, 3000)
}

export const add = (team: Team) => {
    const oldScore = team.score
    const newScore = oldScore + 1
    team.score = newScore
    burst(team.id, oldScore, newScore)
    recordBurstAfterThreeSecondsOfNoActivity()
}

export const subtract = (team: Team) => {
    team.score--
}

export const undo = () => {
    const lastHistoryItem = getLastHistoryItem()
    if (!lastHistoryItem) return

    const team = teams.find((t) => t.id === lastHistoryItem.teamId)!
    team.score = lastHistoryItem.oldScore
    renderScore(team)
}
