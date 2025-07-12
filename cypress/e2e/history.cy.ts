import { assertTeamAndScoreDisplayed, clickAddButton, clickSubtractButton } from '../support/scoreboard-helpers'

describe('Scoreboard app - History', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should display an "undo" button when I click add', () => {
    // act
    clickAddButton('Team 1')

    // assert
    cy.contains('button', 'Undo')
  })

  it('should revert team 1 back to 0 if I press their add button 3 times, wait 3 seconds, and then press "undo"', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    cy.contains('button', 'Undo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 0)
  })

  it('should revert team 1 back to 2 if I press their add button 2 times, wait 3 seconds, press their add button 2 more times, and then press "undo"', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    cy.contains('button', 'Undo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 2)
  })

  it('should revert back two history items if I do 3 score changes, separated by 3 seconds each, and then press undo twice', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    cy.contains('button', 'Undo').click()
    cy.contains('button', 'Undo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 3)
  })

  it('should revert my changes if I press the undo button immediately without waiting 3 seconds', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 0)
  })

  it('should show a redo button when I press undo', () => {
    // arrange
    clickAddButton('Team 1')

    // act
    cy.contains('button', 'Undo').click()

    // assert
    cy.contains('button', 'Redo')
  })

  it('should disable the undo button if i have one history item and I click undo once', () => {
    // arrange
    clickAddButton('Team 1')

    // act
    cy.contains('button', 'Undo').click()

    // assert
    cy.contains('button', 'Undo').should('be.disabled')
  })

  it('should enable the undo button if I click add, click undo, and then click add again', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    clickAddButton('Team 1')

    // assert
    cy.contains('button', 'Undo').should('not.be.disabled')
  })

  describe('if I click add, click undo, and then repeat one more time', () => {
    beforeEach(() => {
      // act
      clickAddButton('Team 1')
      cy.contains('button', 'Undo').click()
      clickAddButton('Team 1')
      cy.contains('button', 'Undo').click()
    })

    it('should allow me to undo a second time', () => {
      // assert
      assertTeamAndScoreDisplayed('Team 1', 0)
    })

    it('should disable the undo button', () => {
      // assert
      cy.contains('button', 'Undo').should('be.disabled')
    })
  })

  it('should disable the undo button', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    cy.contains('button', 'Redo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 1)
  })

  it('should disable the redo button click redo and get to the front of the history', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    cy.contains('button', 'Redo').click()

    // assert
    cy.contains('button', 'Redo').should('be.disabled')
  })

  it('should enable the undo button if I click add, click undo, and click redo', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    cy.contains('button', 'Redo').click()

    // assert
    cy.contains('button', 'Undo').should('not.be.disabled')
  })

  it('should enable the redo button if I click add, click undo, click redo, and click undo', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    cy.contains('button', 'Redo').click()
    cy.contains('button', 'Undo').click()

    // assert
    cy.contains('button', 'Redo').should('not.be.disabled')
  })

  it('should set the score to 2 if I click add twice, wait 3 seconds, click subtract, and click undo', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    cy.tick(3000)
    clickSubtractButton('Team 1')
    cy.contains('button', 'Undo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 2)
  })

  it('should set the score to 2-4 if I click add 2 times for team 1, click add 4 times for team 2, wait 3 seconds, click add 2 times for both teams, and click undo', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    clickAddButton('Team 2')
    clickAddButton('Team 2')
    clickAddButton('Team 2')
    clickAddButton('Team 2')
    cy.tick(3000)
    clickAddButton('Team 1')
    clickAddButton('Team 1')
    clickAddButton('Team 2')
    clickAddButton('Team 2')
    cy.contains('button', 'Undo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 1', 2)
    assertTeamAndScoreDisplayed('Team 2', 4)
  })

  it('should disable the redo button if I click add, click undo, and then click add', () => {
    // act
    clickAddButton('Team 1')
    cy.contains('button', 'Undo').click()
    clickAddButton('Team 1')

    // assert
    cy.contains('button', 'Redo').should('be.disabled')
  })

  it('should set the team 2 score to 3 if I click add three times, click undo, and click redo', () => {
    // arrange
    cy.clock()

    // act
    clickAddButton('Team 2')
    clickAddButton('Team 2')
    clickAddButton('Team 2')
    cy.contains('button', 'Undo').click()
    cy.contains('button', 'Redo').click()

    // assert
    assertTeamAndScoreDisplayed('Team 2', 3)
  })
}) 