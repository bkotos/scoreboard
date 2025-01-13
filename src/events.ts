import { disableTeamNameEditing, enableTeamNameEditing, focusOnTeamNameInput, safelyRenderTeamName, ELEMENTS } from "./view"
import { Team } from "./model"

const onScoreAddClick = (team: Team) => {
    ELEMENTS.score(team).innerText = `${++team.score}`
}
const onScoreSubtractClick = (team: Team) => {
    if (team.score > 0) ELEMENTS.score(team).innerText = `${--team.score}`
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
        ELEMENTS.txtEditTeamName(team).value = team.name
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
