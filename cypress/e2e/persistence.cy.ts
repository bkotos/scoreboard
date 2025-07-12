import chaiColors from 'chai-colors'
import { assertTeamAndScoreDisplayed, clickAddButton, clickToChangeTeamName, getCardForTeam } from '../support/scoreboard-helpers'

chai.use(chaiColors)

describe('Scoreboard app - Persistence', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should keep my score if I click add for team 1 and then reload the page', () => {
    // act
    clickAddButton('Team 1')
    cy.reload()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 1)
  })

  it('should keep my history and display a score of 1 if I click add, wait 3 seconds, click add, reload the page, and click undo', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    cy.tick(3000)
    clickAddButton('Team 1')
    cy.reload()
    cy.contains('button', 'Undo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 1)
  })

  it('should keep my history and display a score of 1 if I click add, wait 3 seconds, and reload the page', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    cy.tick(3000)
    cy.reload()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 1)
  })

  it('should keep my team name when I reload the page', () => {
    // act
    clickToChangeTeamName('Team 1')
    cy.focused().type('{selectall}')
    cy.focused().type('Moonshot')
    cy.focused().type('{enter}')
    cy.reload()

    // assert
    assertTeamAndScoreDisplayed('Moonshot', 0)
  })

  it('should reset the score if I click "New game"', () => {
    // arrange
    cy.clock()

    // act
    clickToChangeTeamName('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    cy.contains('button', 'New game').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 0)
  })

  const itShouldNotResetTheTeamNameWhenIClickNewGameFor = (team: string) => {
    it(`should not reset the team name when I click "New game" for ${team}`, () => {
      // act
      clickToChangeTeamName(team)
      cy.focused().type('{selectall}')
      cy.focused().type('Moonshot')
      cy.focused().type('{enter}')
      cy.contains('button', 'New game').click()

      // assert
      assertTeamAndScoreDisplayed('Moonshot', 0)
    })
  }
  itShouldNotResetTheTeamNameWhenIClickNewGameFor('Team 1')
  itShouldNotResetTheTeamNameWhenIClickNewGameFor('Team 2')

  it('should keep team 1 red background color after renaming and reloading the page', () => {
    // arrange
    clickToChangeTeamName('Team 1')
    cy.focused().type('{selectall}')
    cy.focused().type('Red Team')
    cy.focused().type('{enter}')
    
    // act
    cy.reload()
    
    // assert
    getCardForTeam('Red Team').should('have.css', 'background-color').and('be.colored', '#bc2525')
  })

  it('should show redo button after add, undo, and page refresh', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    cy.reload()

    // assert
    cy.contains('button', 'Redo').should('be.visible')
  })

  it('should restore score to 1 after add, undo, page refresh, and redo', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    cy.reload()
    cy.contains('button', 'Redo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 1)
  })

  it('should allow me to click redo twice after page refresh if I add, pause for 3 seconds, add, undo twice, then refresh', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    cy.tick(3000)
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    cy.contains('button', 'Undo').click()
    cy.reload()
    cy.contains('button', 'Redo').click()
    cy.contains('button', 'Redo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 2)
  })

  it.skip('should show Team 1 score as 3 after I add 3 times, undo back to 0, refresh page, then click redo', () => {
    // TODO: implement test
  })

  it.skip('should still work if I refresh the page multiple times after clicking undo', () => {
    // TODO: implement test
  })

  it.skip('should not show the redo button after I add points, undo, refresh, then click \'New game\'', () => {
    // TODO: implement test
  })

  it.skip('should restore Team 2\'s score correctly after I add points to Team 2, undo, refresh, then redo', () => {
    // TODO: implement test
  })
}) 