const assertTeamAndScoreDisplayed = (id: string, label: string) => {
  cy.contains(label).should('have.id', id)
  cy.contains(`[aria-labelledby="${id}"]`, '0')
}

describe('Scoreboard app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })
  
  describe('on first load', () => {
    it('should display team 1 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('team1', 'Team 1')
    })

    it('should display team 2 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('team2', 'Team 2')
    })
  })
})