import { disableTeamNameEditing, enableTeamNameEditing, focusOnTeamNameInput, safelyRenderTeamName, ELEMENTS, resetTeamName, renderScore } from "./view"
import { Team } from "./model"
import { add, subtract } from "./history"

const onScoreAddClick = (team: Team) => {
    add(team)
    renderScore(team)
    document.getElementById('btn-undo').classList.remove('is-hidden')
    ;(document.getElementById('btn-undo') as HTMLButtonElement).disabled = false
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

    team.name = value
    safelyRenderTeamName(team)
}

export const listenToEventsForTeam = (team: Team) => {
    ELEMENTS.btnAdd(team).onclick = onScoreAddClick.bind(null, team)
    ELEMENTS.btnSubtract(team).onclick = onScoreSubtractClick.bind(null, team)
    ELEMENTS.btnEditTeamName(team).onclick = onEditTeamNameClick.bind(null, team)
    ELEMENTS.txtEditTeamName(team).onkeydown = onTeamNameKeyDown.bind(null, team)
    ELEMENTS.txtEditTeamName(team).onblur = onTeamNameBlur.bind(null, team)
}
