import { renderScore } from "./view";
import { Team } from "./model";
import { getBurstByTeam, HistoryItem, team1Burst, team2Burst } from "./burst";

export const teams: Team[] = []
const findTeam = (historyItem: HistoryItem) => teams.find((t) => t.id === historyItem.teamId)!

interface HistoryWrapper {
    team1?: HistoryItem
    team2?: HistoryItem
}


const history: HistoryWrapper[] = []
let cursor = null
const getLastHistoryItem = () => {
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
    const team1HistoryItem: HistoryItem = team1Burst.first ? {
        teamId: team1Burst.first!.teamId,
        oldScore: team1Burst.first!.oldScore,
        newScore: team1Burst.last.newScore,
    } : undefined
    const team2HistoryItem: HistoryItem = team2Burst.first ? {
        teamId: team2Burst.first!.teamId,
        oldScore: team2Burst.first!.oldScore,
        newScore: team2Burst.last.newScore,
    } : undefined
    history.push({
        team1: team1HistoryItem,
        team2: team2HistoryItem,
    })
    resetCursor()
    team1Burst.resetBurst()
    team2Burst.resetBurst()
}
let timeout: ReturnType<typeof setTimeout>
const recordBurstAfterThreeSecondsOfNoActivity = () => {
    clearTimeout(timeout)
    timeout = setTimeout(recordBurst, 3000)
}
const recordBurstPrematurely = () => {
    if (!team1Burst.first && !team2Burst.first) return

    clearTimeout(timeout)
    recordBurst()
}

export const add = (team: Team) => {
    const oldScore = team.score
    const newScore = oldScore + 1
    team.score = newScore
    getBurstByTeam(team).burst(team.id, oldScore, newScore)
    recordBurstAfterThreeSecondsOfNoActivity()
}

export const subtract = (team: Team) => {
    const oldScore = team.score
    const newScore = oldScore - 1
    team.score = newScore
    getBurstByTeam(team).burst(team.id, oldScore, newScore)
    recordBurstAfterThreeSecondsOfNoActivity()
}

export const undo = () => {
    recordBurstPrematurely()

    const lastHistoryItem = getLastHistoryItem()!
    if (lastHistoryItem.team1) {
        const team = findTeam(lastHistoryItem.team1)
        team.score = lastHistoryItem.team1.oldScore
        renderScore(team)
    }

    if (lastHistoryItem.team2) {
        const team = findTeam(lastHistoryItem.team2)
        team.score = lastHistoryItem.team2.oldScore
        renderScore(team)
    }
}

export const redo = () => {
    const nextHistoryItem = getNextHistoryItem()
    if (nextHistoryItem.team1) {
        const team = findTeam(nextHistoryItem.team1)
        team.score = nextHistoryItem.team1.newScore
        renderScore(team)
    }

    if (nextHistoryItem.team2) {
        const team = findTeam(nextHistoryItem.team2)
        team.score = nextHistoryItem.team2.newScore
        renderScore(team)
    }
}
