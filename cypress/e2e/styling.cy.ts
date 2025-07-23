import chaiColors from 'chai-colors'
import { clickToChangeTeamName, getCardForTeam } from '../support/scoreboard-helpers'

chai.use(chaiColors)

describe('Scoreboard app - Styling', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should display team 1 with a red background', () => {
    // assert
    getCardForTeam('Team 1').should('have.css', 'background-color').and('be.colored', '#bc2525')
  })

  it('should display team 1 with white text', () => {
    // assert
    getCardForTeam('Team 1').find('[role="heading"]').should('have.css', 'color').and('be.colored', '#fff')
    getCardForTeam('Team 1').find('footer button').should('have.css', 'color').and('be.colored', '#fff')
  })

  it('should display team 2 with a blue background', () => {
    getCardForTeam('Team 2').should('have.css', 'background-color').and('be.colored', '#2772db')
  })

  it('should display team 2 with white text', () => {
    // assert
    getCardForTeam('Team 2').find('[role="heading"]').should('have.css', 'color').and('be.colored', '#fff')
    getCardForTeam('Team 2').find('footer button').should('have.css', 'color').and('be.colored', '#fff')
  })

  it('should display the score for team 1 as size 180px font', () => {
    getCardForTeam('Team 1').find('[role="heading"][aria-level="2"]').should('have.css', 'font-size', '180px')
  })

  it('should display the score for team 2 as size 180px font', () => {
    getCardForTeam('Team 2').find('[role="heading"][aria-level="2"]').should('have.css', 'font-size', '180px')
  })

  it('should have a dark page background', () => {
    cy.get('html').should('have.css', 'background-color', 'rgb(20, 22, 26)')
  })

  it('should have the edit button for team 1 be danger-themed', () => {
    getCardForTeam('Team 1').contains('button', 'Edit').should('have.css', 'color').and('be.colored', 'rgb(26, 0, 5)')
    getCardForTeam('Team 1').contains('button', 'Edit').should('have.css', 'background-color').and('be.colored', 'rgb(255, 102, 133)')
  })

  it('should have the edit button for team 2 be info-themed', () => {
    getCardForTeam('Team 2').contains('button', 'Edit').should('have.css', 'color').and('be.colored', 'rgb(0, 36, 51)')
    getCardForTeam('Team 2').contains('button', 'Edit').should('have.css', 'background-color').and('be.colored', 'rgb(102, 209, 255)')
  })

  it('should keep team 1 red background color after renaming', () => {
    // Rename Team 1 to something else
    clickToChangeTeamName('Team 1')
    cy.focused().type('{selectall}')
    cy.focused().type('Red Team')
    cy.focused().type('{enter}')
    
    // Team should still have red background color
    getCardForTeam('Red Team').should('have.css', 'background-color').and('be.colored', '#bc2525')
  })

  it('should have aria-level="1" for team names and aria-level="2" for scores', () => {
    // assert - team names should be aria-level="1" and scores should be aria-level="2"
    getCardForTeam('Team 1').find('[role="heading"][aria-level="1"]').should('contain', 'Team 1')
    getCardForTeam('Team 1').find('[role="heading"][aria-level="2"]').should('contain', '0')
    getCardForTeam('Team 2').find('[role="heading"][aria-level="1"]').should('contain', 'Team 2')
    getCardForTeam('Team 2').find('[role="heading"][aria-level="2"]').should('contain', '0')
  })
}) 