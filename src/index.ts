import { ELEMENTS, renderTeamCard } from "./view"
import { listenToEventsForTeam } from "./events"
import { Team } from "./model"
import { canRedo, canUndo, redo, teams, undo } from "./history"
import { disableRedoButton, disableUndoButton, enableUndoButton, redoButton, showRedoButton, undoButton } from "history-view"

let teamCount = 0
const setUpTeam = (teamName: string) => {
    const teamId = `team${++teamCount}`
    const team: Team = {
        id: teamId,
        name: teamName,
        score: 0,
    }
    teams.push(team)
    renderTeamCard(team)
    listenToEventsForTeam(team)
}

setUpTeam('Team 1')
setUpTeam('Team 2')
undoButton().onclick = () => {
    undo()
    showRedoButton()

    if (!canUndo()) disableUndoButton()
}
redoButton().onclick = () => {
    redo()
    enableUndoButton()

    if (!canRedo()) disableRedoButton()
}
