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
    document.getElementById('teams').appendChild(card)
}

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

const listenToEventsForTeam = (team: Team) => {
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

interface Team {
    id: string
    name: string
}

let teamCount = 0
const setUpTeam = (teamName: string) => {
    const teamId = `team${++teamCount}`
    const team: Team = {
        id: teamId,
        name: teamName
    }
    renderTeamCard(team)
    listenToEventsForTeam(team)
}

setUpTeam('Team 1')
setUpTeam('Team 2')
