import { ELEMENTS, renderScore, renderTeamCard } from "./view"
import { listenToEventsForTeam } from "./events"
import { getTeam1Name, getTeam2Name, Team } from "./model"
import { canRedo, canUndo, getCurentScoreForTeam1, getCurentScoreForTeam2, hasHistory, hasHistoryForTeam1, hasHistoryForTeam2, recordBurstPrematurely, redo, teams, undo } from "./history"
import { disableRedoButton, disableUndoButton, enableRedoButton, enableUndoButton, redoButton, showRedoButton, showUndoButton, undoButton, updateRedoButton } from "history-view"
import { hasUnprocessedBursts, team1Burst, team2Burst } from "burst"

let teamCount = 0
const setUpTeam = (teamName: string, score: number) => {
    const teamId = `team${++teamCount}`
    const team: Team = {
        id: teamId,
        name: teamName,
        score,
    }
    teams.push(team)
    renderTeamCard(team)
    listenToEventsForTeam(team)
}

setUpTeam(getTeam1Name(), getCurentScoreForTeam1().score)
setUpTeam(getTeam2Name(), getCurentScoreForTeam2().score)

if (hasHistoryForTeam1()) {
    console.log('yo', getCurentScoreForTeam1())
    renderScore(getCurentScoreForTeam1())
    showUndoButton()
    enableUndoButton()
    if (canRedo()) enableRedoButton()
    else disableRedoButton()
}

if (hasHistoryForTeam2()) {
    renderScore(getCurentScoreForTeam2())
    showUndoButton()
    enableUndoButton()
    if (canRedo()) enableRedoButton()
    else disableRedoButton()
}

if (hasUnprocessedBursts()) {
    if (localStorage.getItem(`scoreboard-burst-first-${1}`)) {
        const team1: Team = {
            id: 'team1',
            name: 'Team 1',
            score: team1Burst.getHistoryItemToRecord().newScore
        }
        renderScore(team1)
    }

    if (localStorage.getItem(`scoreboard-burst-first-${2}`)) {
        const team2: Team = {
            id: 'team2',
            name: 'Team 2',
            score: team2Burst.getHistoryItemToRecord().newScore
        }
        renderScore(team2)
    }

    recordBurstPrematurely()

    showUndoButton()
    enableUndoButton()
    if (canRedo()) enableRedoButton()
    else disableRedoButton()
}

undoButton().onclick = () => {
    undo()
    showRedoButton()

    if (!canUndo()) disableUndoButton()

    updateRedoButton()
}
redoButton().onclick = () => {
    redo()
    enableUndoButton()

    if (!canRedo()) disableRedoButton()
}

document.getElementById('btn-newgame').onclick = () => {
    localStorage.removeItem(`scoreboard-burst-last-${1}`)
    localStorage.removeItem(`scoreboard-burst-last-${2}`)
    localStorage.removeItem(`scoreboard-burst-first-${1}`)
    localStorage.removeItem(`scoreboard-burst-first-${2}`)
    localStorage.removeItem('scoreboard-history')
    localStorage.removeItem('scoreboard-cursor')
    location.reload()
}

// TODO colors
// card has-background-danger-30 has-text-danger-60
// https://bulma.io/documentation/helpers/palette-helpers/
