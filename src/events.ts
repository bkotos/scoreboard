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

export const listenToEventsForTeam = (team: Team) => {
    let score = 0
    document.getElementById(`btn-add-${team.id}`).onclick = () => {
        document.getElementById(`score-${team.id}`).innerText = `${++score}`
    }
    document.getElementById(`btn-subtract-${team.id}`).onclick = () => {
        if (score > 0) document.getElementById(`score-${team.id}`).innerText = `${--score}`
    }
    document.getElementById(`btn-edit-teamName-${team.id}`).onclick = () => {
        enableTeamNameEditing(team.id)
        focusOnTeamNameInput(team.id)
    }
    document.getElementById(`edit-teamName-${team.id}`).onkeydown = (e) => {
        if (e.code === 'Enter') {
            disableTeamNameEditing(team.id)
        }
    }

    document.getElementById(`edit-teamName-${team.id}`).onblur = () => {
        disableTeamNameEditing(team.id)
        const value = (document.getElementById(`edit-teamName-${team.id}`) as HTMLInputElement).value
        team.name = value
        safelyRenderTeamName(team)
    }
}
