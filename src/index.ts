const renderTeamCard = (teamId: string, teamName: string) => {
    const html = `
        <div class="card">
            <div class="card-content">
            <p class="title" id="${teamId}">${teamName}</p>
            <p class="subtitle" aria-labelledby="${teamId}" id="score-${teamId}">0</p>
            </div>
            <footer class="card-footer">
            <button class="card-footer-item" aria-label="Subtract one point for ${teamName}" id="btn-subtract-${teamId}">
                -1
            </button>
            <button class="card-footer-item" aria-label="Add one point for ${teamName}" id="btn-add-${teamId}">
                +1
            </button>
            </footer>
        </div>
    `
    const card = document.createElement('div')
    card.innerHTML = html
    document.getElementById('teams').appendChild(card)
}

const listenToEventsForTeam = (teamId: string, team: string) => {
    let score = 0
    document.getElementById(`btn-add-${teamId}`).onclick = () => {
        document.getElementById(`score-${teamId}`).innerText = `${++score}`
    }
    document.getElementById(`btn-subtract-${teamId}`).onclick = () => {
        if (score > 0) document.getElementById(`score-${teamId}`).innerText = `${--score}`
    }
}

let teamCount = 0
const setUpTeam = (team: string) => {
    const teamId = `team${++teamCount}`
    renderTeamCard(teamId, team)
    listenToEventsForTeam(teamId, team)
}

setUpTeam('Team 1')
setUpTeam('Team 2')
