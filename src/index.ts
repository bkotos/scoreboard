import { ELEMENTS, renderTeamCard } from "./view"
import { listenToEventsForTeam } from "./events"
import { Team } from "./model"

let teamCount = 0
let teams: Team[] = []
const setUpTeam = (teamName: string) => {
    const teamId = `team${++teamCount}`
    const team: Team = {
        id: teamId,
        name: teamName,
        score: 0,
    }
    teams.push(team)
    renderTeamCard(team)
    listenToEventsForTeam(team)
}

setUpTeam('Team 1')
setUpTeam('Team 2')
document.getElementById('btn-undo').onclick = () => {
    ELEMENTS.score(teams[0]).innerText = `0`
}
