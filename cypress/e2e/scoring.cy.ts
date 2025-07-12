import { assertTeamAndScoreDisplayed, clickAddButton, clickSubtractButton } from '../support/scoreboard-helpers'

describe('Scoreboard app - Scoring', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  const itShouldDoScoreChangesForTeam = (teamName: string) => {
    describe(`scores changes for ${teamName}`, () => {
      it('should increase the score by 1 for when click the add button', () => {
        // assert
        assertTeamAndScoreDisplayed(teamName, 0)
    
        // act
        clickAddButton(teamName)
    
        // assert
        assertTeamAndScoreDisplayed(teamName, 1)
      })
    
      it('should increase the score by 2 for when click the add button twice', () => {
        // assert
        assertTeamAndScoreDisplayed(teamName, 0)
    
        // act
        clickAddButton(teamName)
        clickAddButton(teamName)
    
        // assert
        assertTeamAndScoreDisplayed(teamName, 2)
      })
    
      it('should display a score of one for when I click the add button twice and click the subtract button once', () => {
        // act
        clickAddButton(teamName)
        clickAddButton(teamName)
        clickSubtractButton(teamName)
    
        // assert
        assertTeamAndScoreDisplayed(teamName, 1)
      })
    
      it('should not reduce the score below 0 for when I click the subtract button once before any scores have been added', () => {
        // act
        clickSubtractButton(teamName)
    
        // assert
        assertTeamAndScoreDisplayed(teamName, 0)
      })
    })
  }

  itShouldDoScoreChangesForTeam('Team 1')
  itShouldDoScoreChangesForTeam('Team 2')
}) 