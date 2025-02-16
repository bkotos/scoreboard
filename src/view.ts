import { Team } from "./model"

const SELECTORS = {
    cardTitle: (team: Team) => `title-${team.id}`,
    txtEditTeamName: (team: Team) => `edit-teamName-${team.id}`,
    teamName: (team: Team) => `teamName-${team.id}`,
    score: (team: Team) => `score-${team.id}`,
    btnAdd: (team: Team) => `btn-add-${team.id}`,
    btnSubtract: (team: Team) => `btn-subtract-${team.id}`,
    btnEditTeamName: (team: Team) => `btn-edit-teamName-${team.id}`,
}

export const ELEMENTS = {
    cardTitle: (team: Team) => document.getElementById(SELECTORS.cardTitle(team)),
    txtEditTeamName: (team: Team) => document.getElementById(SELECTORS.txtEditTeamName(team)) as HTMLInputElement,
    teamName: (team: Team) => document.getElementById(SELECTORS.teamName(team)),
    score: (team: Team) => document.getElementById(SELECTORS.score(team)),
    btnAdd: (team: Team) => document.getElementById(SELECTORS.btnAdd(team)),
    btnSubtract: (team: Team) => document.getElementById(SELECTORS.btnSubtract(team)),
    btnEditTeamName: (team: Team) => document.getElementById(SELECTORS.btnEditTeamName(team)),
}

export const renderTeamCard = (team: Team) => {
    const html = `
        <div class="card" role="listitem" data-team="${team.id}">
            <div class="card-content has-text-centered">
                <p class="subtitle mb-5" id="title-${team.id}" role="heading">
                    <span id="${SELECTORS.teamName(team)}">${team.name}</span>
                    <button id="${SELECTORS.btnEditTeamName(team)}" class="button is-small" aria-label="Change name of ${team.name}">Edit</button>
                </p>
                <input id="${SELECTORS.txtEditTeamName(team)}" type="text" class="subtitle mb-5 p-0 is-hidden" value="${team.name}" aria-label="Change team name" />
                <p class="title score" role="heading" aria-labelledby="${SELECTORS.teamName(team)}" id="${SELECTORS.score(team)}">0</p>
            </div>
            <footer class="card-footer">
            <button class="card-footer-item" aria-label="Subtract one point for ${team.name}" id="${SELECTORS.btnSubtract(team)}">
                -1
            </button>
            <button class="card-footer-item" aria-label="Add one point for ${team.name}" id="${SELECTORS.btnAdd(team)}">
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
export const resetTeamName = (team: Team) => {
    ELEMENTS.txtEditTeamName(team).value = team.name
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
    ELEMENTS.btnAdd(team).ariaLabel = `Add one point for ${team.name}`
    ELEMENTS.btnEditTeamName(team).ariaLabel = `Change name of ${team.name}`
}

export const renderScore = (team: Team) => {
    ELEMENTS.score(team).innerText = `${team.score}`
}
