const assertTeamAndScoreDisplayed = (id: string, label: string, score: number) => {
  cy.contains(label).should('have.id', id)
  cy.contains(`[aria-labelledby="${id}"]`, score)
}

describe('Scoreboard app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })
  
  describe('on first load', () => {
    it('should display team 1 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('team1', 'Team 1', 0)
    })

    it('should display team 2 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('team2', 'Team 2', 0)
    })
  })

  it('should increase the score by 1 for team 1 when click the add button', () => {
    // assert
    assertTeamAndScoreDisplayed('team1', 'Team 1', 0)

    // act
    cy.get('[aria-label="Add one point for Team 1"]').click()

    // assert
    assertTeamAndScoreDisplayed('team1', 'Team 1', 1)
  })

  it('should increase the score by 2 for team 1 when click the add button twice', () => {
    // assert
    assertTeamAndScoreDisplayed('team1', 'Team 1', 0)

    // act
    cy.get('[aria-label="Add one point for Team 1"]').click().click()

    // assert
    assertTeamAndScoreDisplayed('team1', 'Team 1', 2)
  })

  it('should display a score of one for team 1 when I click the add button twice and click the subtract button once', () => {
    // act
    cy.get('[aria-label="Add one point for Team 1"]').dblclick()
    cy.get('[aria-label="Subtract one point for Team 1"]').click()

    // assert
    assertTeamAndScoreDisplayed('team1', 'Team 1', 1)
  })

  it('should not reduce the score below 0 for team 1 when I click the subtract button once before any scores have been added', () => {
    // act
    cy.get('[aria-label="Subtract one point for Team 1"]').click()

    // assert
    assertTeamAndScoreDisplayed('team1', 'Team 1', 0)
  })
})