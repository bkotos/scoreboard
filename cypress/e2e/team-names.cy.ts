import { clickToChangeTeamName, clickSubtractButton } from '../support/scoreboard-helpers'

describe('Scoreboard app - Team Names', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  const expectTeamNameTextBoxToBeHidden = () => cy.get('input[aria-label="Change team name"]').should('not.exist')
  const expectTeamNameTextBoxToBeVisible = () => cy.get('input[aria-label="Change team name"]').should('be.visible')
  const expectTeamNameTextBoxToHaveDefaultValue = () => cy.focused().should('have.value', 'Team 1')
  const expectTeamNameToBeResetToDefault = () => cy.contains(/^Team 1$/)

  it('should change the team name to a text field when I click edit', () => {
    // act
    clickToChangeTeamName('Team 1')

    // assert
    cy.contains('Team 1').should('not.be.visible')
    expectTeamNameTextBoxToBeVisible()
    expectTeamNameTextBoxToHaveDefaultValue()
  })

  it('should be focused on the team name text field when I click edit', () => {
    // act
    clickToChangeTeamName('Team 1')

    // assert
    cy.focused().should('have.attr', 'aria-label', 'Change team name')
  })

  it('should have the subtitle class on the name text box when you click edit', () => {
    // act
    clickToChangeTeamName('Team 1')

    // assert
    cy.get('input[aria-label="Change team name"]').should('have.attr', 'class', 'subtitle mb-0 p-0')
  })

  it('should hide the team name text box when I type *ENTER*', () => {
    // arrange
    clickToChangeTeamName('Team 1')

    // act
    cy.focused().type('{enter}')

    // assert
    expectTeamNameTextBoxToBeHidden()
  })

  it('should hide the team name text box I click outside of the text box', () => {
    // arrange
    clickToChangeTeamName('Team 1')

    // act
    clickSubtractButton('Team 1')

    // assert
    expectTeamNameTextBoxToBeHidden()
  })

  it('should hide the team name text box when I type *ESC*', () => {
    // arrange
    clickToChangeTeamName('Team 1')

    // act
    cy.focused().type('{esc}')

    // assert
    expectTeamNameTextBoxToBeHidden()
  })

  it('should reset the team name when I type in a new name and type *ESC*', () => {
    // act
    clickToChangeTeamName('Team 1')
    cy.focused().type('{selectall}')
    cy.focused().type('New name')
    cy.focused().type('{esc}')

    // assert
    expectTeamNameToBeResetToDefault()
  })

  it('should reset the team name text box when I type in a new name, type *ESC*, and click to change the team name again', () => {
    // act
    clickToChangeTeamName('Team 1')
    cy.focused().type('{selectall}')
    cy.focused().type('New name')
    cy.focused().type('{esc}')
    clickToChangeTeamName('Team 1')

    // assert
    expectTeamNameTextBoxToHaveDefaultValue()
  })

  it('should change the team name when I type a new name and then type *ENTER*', () => {
    // arrange
    clickToChangeTeamName('Team 1')

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
    clickToChangeTeamName('Team 1')

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
      clickToChangeTeamName('Team 1')

      // act
      cy.focused().type('{selectAll}{backspace}{enter}')
    })

    it('should reset the name', () => {
      // assert
      expectTeamNameToBeResetToDefault()
    })

    it('should then re-set the name in the text box if you try to edit it again', () => {
      // act
      clickToChangeTeamName('Team 1')

      // assert
      expectTeamNameTextBoxToHaveDefaultValue()
    })
  })
}) 