import { renderScore } from "./view";
import { Team } from "./model";
import { getBurstByTeam, HistoryItem, team1Burst, team2Burst } from "./burst";

export const teams: Team[] = []
const findTeam = (historyItem: HistoryItem) => teams.find((t) => t.id === historyItem.teamId)!

export interface HistoryWrapper {
    team1?: HistoryItem
    team2?: HistoryItem
}

const history: HistoryWrapper[] = [
    {
        team1: {
            teamId: 'team1',
            oldScore: 0,
            newScore: 0,
        },
        team2: {
            teamId: 'team2',
            oldScore: 0,
            newScore: 0,
        },
    }
]

let cursor = 0
const moveCursorToEnd = () => cursor = history.length - 1

export const canUndo = () => cursor > 0
export const canRedo = () => cursor < history.length - 1

const deleteFuture = () => {
    history.splice(cursor + 1)
}
const recordBurst = () => {
    deleteFuture()
    history.push({
        team1: team1Burst.getHistoryItemToRecord(),
        team2: team2Burst.getHistoryItemToRecord(),
    })
    moveCursorToEnd()
    team1Burst.reset()
    team2Burst.reset()
}
let timeout: ReturnType<typeof setTimeout>
const recordBurstAfterThreeSecondsOfNoActivity = () => {
    clearTimeout(timeout)
    timeout = setTimeout(recordBurst, 3000)
}
export const recordBurstPrematurely = () => {
    if (!team1Burst.first && !team2Burst.first) return

    clearTimeout(timeout)
    recordBurst()
}

export const add = (team: Team) => {
    deleteFuture()
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

    const lastHistoryItem = history[--cursor]
    if (lastHistoryItem.team1) {
        const team = findTeam(lastHistoryItem.team1)
        team.score = lastHistoryItem.team1.newScore
        renderScore(team)
    }

    if (lastHistoryItem.team2) {
        const team = findTeam(lastHistoryItem.team2)
        team.score = lastHistoryItem.team2.newScore
        renderScore(team)
    }
}

export const redo = () => {
    const nextHistoryItem = history[++cursor]
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
