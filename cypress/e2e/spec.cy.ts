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
    const clickToChangeTeam1Name = () => cy.get('[aria-label="Change name of Team 1"]').click()
    const expectTeamNameTextBoxToBeHidden = () => cy.get('input[aria-label="Change team name"]').should('not.be.visible')
    const expectTeamNameTextBoxToBeVisible = () => cy.get('input[aria-label="Change team name"]').should('be.visible')
    const expectTeamNameTextBoxToHaveDefaultValue = () => cy.focused().should('have.value', 'Team 1')

    it('should change the team name to a text field when I click edit', () => {
      // act
      clickToChangeTeam1Name()

      // assert
      cy.contains('Team 1').should('not.be.visible')
      expectTeamNameTextBoxToBeVisible()
      expectTeamNameTextBoxToHaveDefaultValue()
    })

    it('should be focused on the team name text field when I click edit', () => {
      // act
      clickToChangeTeam1Name()

      // assert
      cy.focused().should('have.attr', 'aria-label', 'Change team name')
    })

    it('should hide the team name text box when I type *ENTER*', () => {
      // arrange
      clickToChangeTeam1Name()

      // act
      cy.focused().type('{enter}')

      // assert
      expectTeamNameTextBoxToBeHidden
    })

    it('should hide the team name text box I click outside of the text box', () => {
      // arrange
      clickToChangeTeam1Name()

      // act
      clickSubtractButton('Team 1')

      // assert
      expectTeamNameTextBoxToBeHidden
    })

    it('should hide the team name text box when I type *ESC*', () => {
      // arrange
      clickToChangeTeam1Name()

      // act
      cy.focused().type('{esc}')

      // assert
      expectTeamNameTextBoxToBeHidden
    })

    it('should re-set the value of the team name text box when I type in a new name and type *ESC*', () => {
      // act
      clickToChangeTeam1Name()
      cy.focused().type('{selectall}')
      cy.focused().type('New name')
      cy.focused().type('{esc}')

      // assert
      cy.contains(/^Team 1$/)
    })

    it('should change the team name when I type a new name and then type *ENTER*', () => {
      // arrange
      clickToChangeTeam1Name()

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
      clickToChangeTeam1Name()

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
        clickToChangeTeam1Name()

        // act
        cy.focused().type('{selectAll}{backspace}{enter}')
      })

      it('should reset the name', () => {
        // assert
        cy.contains(/^Team 1$/)
      })

      it('should then re-set the name in the text box if you try to edit it again', () => {
        // act
        clickToChangeTeam1Name()

        // assert
        expectTeamNameTextBoxToHaveDefaultValue()
      })
    })
  })
})