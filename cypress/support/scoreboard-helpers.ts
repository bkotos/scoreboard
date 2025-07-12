export const assertTeamAndScoreDisplayed = (teamName: string, score: number) => {
  cy.contains(teamName).invoke('attr', 'id').as('teamNameLabelId')
  cy.get('@teamNameLabelId').then(teamNameLabelId => {
    cy.contains(`[aria-labelledby="${teamNameLabelId}"]`, score)
  })
}

export const clickAddButton = (teamName: string) => cy.get(`[aria-label="Add one point for ${teamName}"]`).click()

export const clickSubtractButton = (teamName: string) => cy.get(`[aria-label="Subtract one point for ${teamName}"]`).click()

export const clickToChangeTeamName = (existingTeamName: string) => cy.get(`[aria-label="Change name of ${existingTeamName}"]`).click()

export const getCardForTeam = (team: string) => cy.contains(team).closest('[role="listitem"]') 