import { listenToEventsForTeam } from "./events"
import { Team } from "./model"

const renderTeamCard = (team: Team) => {
    const html = `
            <div class="card">
                <div class="card-content">
                    <p class="title" id="title-${team.id}">
                        <span id="teamName-${team.id}">${team.name}</span>
                        <button id="btn-edit-teamName-${team.id}" class="button is-small" aria-label="Change name of ${team.name}">Edit</button>
                    </p>
                    <input id="edit-teamName-${team.id}" type="text" class="title is-hidden" value="${team.name}" aria-label="Change team name" />
                    <p class="subtitle" aria-labelledby="teamName-${team.id}" id="score-${team.id}">0</p>
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

let teamCount = 0
const setUpTeam = (teamName: string) => {
    const teamId = `team${++teamCount}`
    const team: Team = {
        id: teamId,
        name: teamName,
        score: 0,
    }
    renderTeamCard(team)
    listenToEventsForTeam(team)
}

setUpTeam('Team 1')
setUpTeam('Team 2')
