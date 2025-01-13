import { Team } from "./model"

export const renderTeamCard = (team: Team) => {
    const html = `
        <div class="card">
            <div class="card-content has-text-centered">
                <p class="subtitle mb-5" id="title-${team.id}">
                    <span id="teamName-${team.id}">${team.name}</span>
                    <button id="btn-edit-teamName-${team.id}" class="button is-small" aria-label="Change name of ${team.name}">Edit</button>
                </p>
                <input id="edit-teamName-${team.id}" type="text" class="subtitle mb-5 p-0 is-hidden" value="${team.name}" aria-label="Change team name" />
                <p class="title" aria-labelledby="teamName-${team.id}" id="score-${team.id}">0</p>
            </div>
            <footer class="card-footer">
            <button class="card-footer-item" aria-label="Subtract one point for ${team.name}" id="btn-subtract-${team.id}">
                -1
            </button>
            <button class="card-footer-item" aria-label="Add one point for ${team.name}" id="btn-add-${team.id}">
                +1
            </button>
            </footer>
        </div>
    `
    const card = document.createElement('div')
    card.innerHTML = html
    card.classList.add('column')
    document.getElementById('teams').appendChild(card)
}

export const enableTeamNameEditing = (team: Team) => {
    document.getElementById(`title-${team.id}`).classList.add('is-hidden')
    ;(document.getElementById(`edit-teamName-${team.id}`) as HTMLInputElement).value = team.name
    document.getElementById(`edit-teamName-${team.id}`).classList.remove('is-hidden')
}
export const disableTeamNameEditing = (teamId: string) => {
    document.getElementById(`title-${teamId}`).classList.remove('is-hidden')
    document.getElementById(`edit-teamName-${teamId}`).classList.add('is-hidden')
}
export const focusOnTeamNameInput = (teamId: string) => {
    document.getElementById(`edit-teamName-${teamId}`).focus()
}
export const safelyRenderTeamName = (team: Team) => {
    document.getElementById(`teamName-${team.id}`).innerText = team.name
}
