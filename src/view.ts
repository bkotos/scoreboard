import { Team } from "./model"

const SELECTORS = {
    cardTitle: (team: Team) => `title-${team.id}`,
    txtEditTeamName: (team: Team) => `edit-teamName-${team.id}`,
    teamName: (team: Team) => `teamName-${team.id}`,
}

export const ELEMENTS = {
    cardTitle: (team: Team) => document.getElementById(SELECTORS.cardTitle(team)),
    txtEditTeamName: (team: Team) => document.getElementById(SELECTORS.txtEditTeamName(team)) as HTMLInputElement,
    teamName: (team: Team) => document.getElementById(SELECTORS.teamName(team)),
}

export const renderTeamCard = (team: Team) => {
    const html = `
        <div class="card">
            <div class="card-content has-text-centered">
                <p class="subtitle mb-5" id="title-${team.id}">
                    <span id="${SELECTORS.teamName(team)}">${team.name}</span>
                    <button id="btn-edit-teamName-${team.id}" class="button is-small" aria-label="Change name of ${team.name}">Edit</button>
                </p>
                <input id="${SELECTORS.txtEditTeamName(team)}" type="text" class="subtitle mb-5 p-0 is-hidden" value="${team.name}" aria-label="Change team name" />
                <p class="title" aria-labelledby="${SELECTORS.teamName(team)}" id="score-${team.id}">0</p>
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
    ELEMENTS.cardTitle(team).classList.add('is-hidden')
    ELEMENTS.txtEditTeamName(team).value = team.name
    ELEMENTS.txtEditTeamName(team).classList.remove('is-hidden')
}
export const disableTeamNameEditing = (team: Team) => {
    ELEMENTS.cardTitle(team).classList.remove('is-hidden')
    ELEMENTS.txtEditTeamName(team).classList.add('is-hidden')
}
export const focusOnTeamNameInput = (team: Team) => {
    ELEMENTS.txtEditTeamName(team).focus()
}
export const safelyRenderTeamName = (team: Team) => {
    ELEMENTS.teamName(team).innerText = team.name
}
