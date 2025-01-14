import { renderScore } from "./view";
import { Team } from "./model";

export const teams: Team[] = []
const findTeam = (historyItem: HistoryItem) => teams.find((t) => t.id === historyItem.teamId)!

interface HistoryItem {
    teamId: string
    oldScore: number
    newScore: number
}

const history: HistoryItem[] = []
let cursor = null
const getLastHistoryItem = (): HistoryItem => {
    if (cursor === null) cursor = history.length - 1
    else cursor--

    return history[cursor]
}
export const canUndo = () => cursor > 0

const getNextHistoryItem = () => {
    return history[cursor++]
}

let first: HistoryItem = null
let last: HistoryItem = null
const burst = (teamId: string, oldScore: number, newScore: number) => {
    last = { teamId, oldScore, newScore }
    if (!first) first = last
}
const resetCursor = () => cursor = null
const resetBurst = () => {
    first = null
    last = null
}
const deleteFuture = () => {
    if (cursor !== null) history.splice(cursor)
}
const recordBurst = () => {
    deleteFuture()
    const historyItem: HistoryItem = {
        teamId: first!.teamId,
        oldScore: first!.oldScore,
        newScore: last.newScore,
    }
    history.push(historyItem)
    resetCursor()
    resetBurst()
}
let timeout: ReturnType<typeof setTimeout>
const recordBurstAfterThreeSecondsOfNoActivity = () => {
    clearTimeout(timeout)
    timeout = setTimeout(recordBurst, 3000)
}
const recordBurstPrematurely = () => {
    if (!first) return

    clearTimeout(timeout)
    recordBurst()
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
    recordBurstPrematurely()

    const lastHistoryItem = getLastHistoryItem()!
    const team = findTeam(lastHistoryItem)
    team.score = lastHistoryItem.oldScore
    renderScore(team)
}

export const redo = () => {
    const nextHistoryItem = getNextHistoryItem()
    const team = findTeam(nextHistoryItem)
    team.score = nextHistoryItem.newScore
    renderScore(team)
}
