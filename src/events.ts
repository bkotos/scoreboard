import { Team } from "./model"

const enableTeamNameEditing = (teamId: string) => {
    document.getElementById(`title-${teamId}`).classList.add('is-hidden')
    document.getElementById(`edit-teamName-${teamId}`).classList.remove('is-hidden')
}
const disableTeamNameEditing = (teamId: string) => {
    document.getElementById(`title-${teamId}`).classList.remove('is-hidden')
    document.getElementById(`edit-teamName-${teamId}`).classList.add('is-hidden')
}
const focusOnTeamNameInput = (teamId: string) => {
    document.getElementById(`edit-teamName-${teamId}`).focus()
}
const safelyRenderTeamName = (team: Team) => {
    document.getElementById(`teamName-${team.id}`).innerText = team.name
}

const onScoreAddClick = (team: Team) => {
    document.getElementById(`score-${team.id}`).innerText = `${++team.score}`
}
const onScoreSubtractClick = (team: Team) => {
    if (team.score > 0) document.getElementById(`score-${team.id}`).innerText = `${--team.score}`
}
const onEditTeamNameClick = (team: Team) => {
    enableTeamNameEditing(team.id)
    focusOnTeamNameInput(team.id)
}
const onTeamNameKeyDown = (team: Team, e: KeyboardEvent) => {
    if (e.code === 'Enter') {
        disableTeamNameEditing(team.id)
    }
}
const onTeamNameBlur = (team: Team) => {
    disableTeamNameEditing(team.id)
    const value = (document.getElementById(`edit-teamName-${team.id}`) as HTMLInputElement).value
    team.name = value
    safelyRenderTeamName(team)
}

export const listenToEventsForTeam = (team: Team) => {
    document.getElementById(`btn-add-${team.id}`).onclick = onScoreAddClick.bind(null, team)
    document.getElementById(`btn-subtract-${team.id}`).onclick = onScoreSubtractClick.bind(null, team)
    document.getElementById(`btn-edit-teamName-${team.id}`).onclick = onEditTeamNameClick.bind(null, team)
    document.getElementById(`edit-teamName-${team.id}`).onkeydown = onTeamNameKeyDown.bind(null, team)
    document.getElementById(`edit-teamName-${team.id}`).onblur = onTeamNameBlur.bind(null, team)
}
