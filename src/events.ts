import { disableTeamNameEditing, enableTeamNameEditing, focusOnTeamNameInput, safelyRenderTeamName, ELEMENTS, resetTeamName, renderScore } from "./view"
import { setTeamName, Team } from "./model"
import { add, canRedo, subtract } from "./history"
import { disableRedoButton, enableRedoButton, enableUndoButton, showUndoButton } from "./history-view"

const onScoreAddClick = (team: Team) => {
    add(team)
    renderScore(team)
    showUndoButton()
    enableUndoButton()
    if (canRedo()) enableRedoButton()
    else disableRedoButton()
}
const onScoreSubtractClick = (team: Team) => {
    if (team.score > 0) {
        subtract(team)
        renderScore(team)
    }
}
const onEditTeamNameClick = (team: Team) => {
    enableTeamNameEditing(team)
    focusOnTeamNameInput(team)
}
const onTeamNameKeyDown = (team: Team, e: KeyboardEvent) => {
    if (e.code === 'Enter') {
        disableTeamNameEditing(team)
    }

    if (e.code === 'Escape') {
        resetTeamName(team)
        disableTeamNameEditing(team)
    }
}
const onTeamNameBlur = (team: Team) => {
    disableTeamNameEditing(team)
    const value = ELEMENTS.txtEditTeamName(team).value
    if (value.trim().length === 0) return

    setTeamName(team, value)
    safelyRenderTeamName(team)
}

export const listenToEventsForTeam = (team: Team) => {
    ELEMENTS.btnAdd(team).onclick = onScoreAddClick.bind(null, team)
    ELEMENTS.btnSubtract(team).onclick = onScoreSubtractClick.bind(null, team)
    ELEMENTS.btnEditTeamName(team).onclick = onEditTeamNameClick.bind(null, team)
    ELEMENTS.txtEditTeamName(team).onkeydown = onTeamNameKeyDown.bind(null, team)
    ELEMENTS.txtEditTeamName(team).onblur = onTeamNameBlur.bind(null, team)
}
