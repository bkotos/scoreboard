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

const getHistory = (): HistoryWrapper[] => {
    const raw = localStorage.getItem('scoreboard-history')
    if (!raw) {
        return [
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
    }

    return JSON.parse(raw)
}
const setHistory = (history: HistoryWrapper[]) => {
    const raw = JSON.stringify(history)
    localStorage.setItem('scoreboard-history', raw)
}
const spliceHistory = (start: number) => {
    const history = getHistory()
    history.splice(start)
    setHistory(history)
}
const pushHistory = (historyItem: HistoryWrapper) => {
    const history = getHistory()
    history.push(historyItem)
    setHistory(history)
}

const getCursor = (): number => {
    const raw = localStorage.getItem('scoreboard-cursor')
    if (!raw) return 0

    return Number(raw)
}
const setCursor = (cursor: number) => {
    const raw = `${cursor}`
    localStorage.setItem('scoreboard-cursor', raw)
}
const incrementCursor = () => {
    let cursor = getCursor()
    cursor++
    setCursor(cursor)
    return cursor
}
const decrementCursor = () => {
    let cursor = getCursor()
    cursor--
    setCursor(cursor)
    return cursor
}

const moveCursorToEnd = () => {
    const cursor = getHistory().length - 1
    setCursor(cursor)
}

export const canUndo = () => getCursor() > 0
export const canRedo = () => getCursor() < getHistory().length - 1

const deleteFuture = () => {
    spliceHistory(getCursor() + 1)
}
const recordBurst = () => {
    deleteFuture()
    pushHistory({
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

    const lastHistoryItem = getHistory()[decrementCursor()]
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
    const nextHistoryItem = getHistory()[incrementCursor()]
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
