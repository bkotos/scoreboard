import { renderScore } from "./view";
import { Team } from "./model";
import { HistoryItem, team1Burst } from "./burst";

export const teams: Team[] = []
const findTeam = (historyItem: HistoryItem) => teams.find((t) => t.id === historyItem.teamId)!



const history: HistoryItem[] = []
let cursor = null
const getLastHistoryItem = (): HistoryItem => {
    if (cursor === null) cursor = history.length - 1
    else cursor--

    return history[cursor]
}
export const canUndo = () => cursor > 0
export const canRedo = () => cursor < history.length

const getNextHistoryItem = () => {
    return history[cursor++]
}

const resetCursor = () => cursor = null
const deleteFuture = () => {
    if (cursor !== null) history.splice(cursor)
}
const recordBurst = () => {
    deleteFuture()
    const historyItem: HistoryItem = {
        teamId: team1Burst.first!.teamId,
        oldScore: team1Burst.first!.oldScore,
        newScore: team1Burst.last.newScore,
    }
    history.push(historyItem)
    resetCursor()
    team1Burst.resetBurst()
}
let timeout: ReturnType<typeof setTimeout>
const recordBurstAfterThreeSecondsOfNoActivity = () => {
    clearTimeout(timeout)
    timeout = setTimeout(recordBurst, 3000)
}
const recordBurstPrematurely = () => {
    if (!team1Burst.first) return

    clearTimeout(timeout)
    recordBurst()
}

export const add = (team: Team) => {
    const oldScore = team.score
    const newScore = oldScore + 1
    team.score = newScore
    team1Burst.burst(team.id, oldScore, newScore)
    recordBurstAfterThreeSecondsOfNoActivity()
}

export const subtract = (team: Team) => {
    const oldScore = team.score
    const newScore = oldScore - 1
    team.score = newScore
    team1Burst.burst(team.id, oldScore, newScore)
    recordBurstAfterThreeSecondsOfNoActivity()
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
