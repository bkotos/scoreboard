import { assertTeamAndScoreDisplayed } from '../support/scoreboard-helpers'

describe('Scoreboard app - Initial State', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should display team 1 with a starting score of 0', () => {
    // assert
    assertTeamAndScoreDisplayed('Team 1', 0)
  })

  it('should display team 2 with a starting score of 0', () => {
    // assert
    assertTeamAndScoreDisplayed('Team 2', 0)
  })
}) 