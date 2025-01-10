const renderTeamCard = (teamId: string, teamName: string) => {
    const html = `
        <div class="card">
            <div class="card-content">
                <p class="title" id="teamName-${teamId}">
                    ${teamName}
                    <button id="btn-edit-teamName-${teamId}" class="button is-small" aria-label="Change name of ${teamName}">Edit</button>
                </p>
                <input id="edit-teamName-${teamId}" type="text" class="title is-hidden" value="${teamName}" aria-label="Change team name" />
                <p class="subtitle" aria-labelledby="teamName-${teamId}" id="score-${teamId}">0</p>
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

const enableTeamNameEditing = (teamId: string) => {
    document.getElementById(`teamName-${teamId}`).classList.add('is-hidden')
    document.getElementById(`edit-teamName-${teamId}`).classList.remove('is-hidden')
}
const disableTeamNameEditing = (teamId: string) => {
    document.getElementById(`teamName-${teamId}`).classList.remove('is-hidden')
    document.getElementById(`edit-teamName-${teamId}`).classList.add('is-hidden')
}
const focusOnTeamNameInput = (teamId: string) => {
    document.getElementById(`edit-teamName-${teamId}`).focus()
}

const listenToEventsForTeam = (teamId: string, team: string) => {
    let score = 0
    document.getElementById(`btn-add-${teamId}`).onclick = () => {
        document.getElementById(`score-${teamId}`).innerText = `${++score}`
    }
    document.getElementById(`btn-subtract-${teamId}`).onclick = () => {
        if (score > 0) document.getElementById(`score-${teamId}`).innerText = `${--score}`
    }
    document.getElementById(`btn-edit-teamName-${teamId}`).onclick = () => {
        enableTeamNameEditing(teamId)
        focusOnTeamNameInput(teamId)
    }
    document.getElementById(`edit-teamName-${teamId}`).onkeydown = (e) => {
        if (e.code === 'Enter') {
            disableTeamNameEditing(teamId)
        }
    }
    document.getElementById(`edit-teamName-${teamId}`).onblur = () => {
        disableTeamNameEditing(teamId)
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
