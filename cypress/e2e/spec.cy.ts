const assertTeamAndScoreDisplayed = (teamName: string, score: number) => {
  cy.contains(teamName)
  cy.contains(teamName).invoke('attr', 'id').as('teamNameLabelId')
  cy.get('@teamNameLabelId').then(teamNameLabelId => {
    cy.contains(`[aria-labelledby="${teamNameLabelId}"]`, score)
  })
}
const clickAddButton = (teamName: string) => cy.get(`[aria-label="Add one point for ${teamName}"]`).click()
const clickSubtractButton = (teamName: string) => cy.get(`[aria-label="Subtract one point for ${teamName}"]`).click()

describe('Scoreboard app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })
  
  describe('on first load', () => {
    it('should display team 1 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('Team 1', 0)
    })

    it('should display team 2 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('Team 2', 0)
    })
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

  describe('changing team name', () => {
    const clickToChangeTeamName = () => cy.get('[aria-label="Change name of Team 1"]').click()
    const expectTeamNameTextBoxToBeHidden = () => cy.get('input[aria-label="Change team name"]').should('not.be.visible')
    const expectTeamNameTextBoxToBeVisible = () => cy.get('input[aria-label="Change team name"]').should('be.visible')
    const expectTeamNameTextBoxToHaveDefaultValue = () => cy.focused().should('have.value', 'Team 1')
    const expectTeamNameToBeResetToDefault = () => cy.contains(/^Team 1$/)

    it('should change the team name to a text field when I click edit', () => {
      // act
      clickToChangeTeamName()

      // assert
      cy.contains('Team 1').should('not.be.visible')
      expectTeamNameTextBoxToBeVisible()
      expectTeamNameTextBoxToHaveDefaultValue()
    })

    it('should be focused on the team name text field when I click edit', () => {
      // act
      clickToChangeTeamName()

      // assert
      cy.focused().should('have.attr', 'aria-label', 'Change team name')
    })

    it('should hide the team name text box when I type *ENTER*', () => {
      // arrange
      clickToChangeTeamName()

      // act
      cy.focused().type('{enter}')

      // assert
      expectTeamNameTextBoxToBeHidden
    })

    it('should hide the team name text box I click outside of the text box', () => {
      // arrange
      clickToChangeTeamName()

      // act
      clickSubtractButton('Team 1')

      // assert
      expectTeamNameTextBoxToBeHidden
    })

    it('should hide the team name text box when I type *ESC*', () => {
      // arrange
      clickToChangeTeamName()

      // act
      cy.focused().type('{esc}')

      // assert
      expectTeamNameTextBoxToBeHidden
    })

    it('should reset the team name when I type in a new name and type *ESC*', () => {
      // act
      clickToChangeTeamName()
      cy.focused().type('{selectall}')
      cy.focused().type('New name')
      cy.focused().type('{esc}')

      // assert
      expectTeamNameToBeResetToDefault()
    })

    it('should reset the team name text box when I type in a new name, type *ESC*, and click to change the team name again', () => {
      // act
      clickToChangeTeamName()
      cy.focused().type('{selectall}')
      cy.focused().type('New name')
      cy.focused().type('{esc}')
      clickToChangeTeamName()

      // assert
      expectTeamNameTextBoxToHaveDefaultValue()
    })

    it('should change the team name when I type a new name and then type *ENTER*', () => {
      // arrange
      clickToChangeTeamName()

      // act
      cy.focused().type('{selectall}')
      cy.focused().type('New name')
      cy.focused().type('{enter}')

      // assert
      cy.contains(/^New name$/)
    })

    it('should not allow XSS attacks in the name text box', () => {
      // arrange
      const stub = cy.stub()
      cy.on('window:alert', stub)
      clickToChangeTeamName()

      // act
      cy.focused().type('<img src=1 onerror=alert(1)>')

      // assert
      cy.focused().type('{enter}').then(() => {
        expect(stub.getCalls().length).to.equal(0)
      })
    })

    describe('when you delete the content and type *ENTER*', () => {
      beforeEach(() => {
        // arrange
        clickToChangeTeamName()

        // act
        cy.focused().type('{selectAll}{backspace}{enter}')
      })

      it('should reset the name', () => {
        // assert
        expectTeamNameToBeResetToDefault()
      })

      it('should then re-set the name in the text box if you try to edit it again', () => {
        // act
        clickToChangeTeamName()

        // assert
        expectTeamNameTextBoxToHaveDefaultValue()
      })
    })
  })

  describe('history', () => {
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

    it('should set the score to 1 if I click add, click undo, and click redo', () => {
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
  })

  describe('persistence', () => {
    it('should keep my score if I click add for team 1 and then reload the page', () => {
      // act
      clickAddButton('Team 1')
      cy.reload()

      // assert
      assertTeamAndScoreDisplayed('Team 1', 1)
    })
  })
})