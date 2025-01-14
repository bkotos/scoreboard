import { ELEMENTS, renderTeamCard } from "./view"
import { listenToEventsForTeam } from "./events"
import { Team } from "./model"
import { teams, undo } from "./history"

let teamCount = 0
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
    undo()
    document.getElementById('btn-redo').classList.remove('is-hidden')
}
