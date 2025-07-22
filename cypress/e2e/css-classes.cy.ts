import { clickToChangeTeamName, getCardForTeam } from '../support/scoreboard-helpers'

describe('Scoreboard app - CSS Classes', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should have all the correct Bulma CSS classes', () => {
    // Container and layout
    cy.get('.container.pt-6').should('exist')
    cy.get('.columns').should('exist')
    cy.get('.column').should('have.length', 2)
    
    // Card structure
    cy.get('.card').should('have.length', 2)
    cy.get('.card-content.has-text-centered.p-4').should('have.length', 2)
    cy.get('.card-footer').should('have.length', 2)
    
    // Content classes
    cy.get('.subtitle.mb-0').should('have.length', 2)
    cy.get('.title.score').should('have.length', 2)
    cy.get('.card-footer-item').should('have.length', 4)
    cy.get('button.button').should('have.length.at.least', 3)
    
    // Themed buttons
    getCardForTeam('Team 1').find('.button.is-small.is-danger').should('exist')
    getCardForTeam('Team 2').find('.button.is-small.is-info').should('exist')
    
    // Input field classes when editing
    clickToChangeTeamName('Team 1')
    cy.get('.subtitle.mb-0.p-0').should('exist')
  })

  it('should have edit buttons positioned next to team names, not in the footer', () => {
    // Edit buttons should be in the card-content section, not card-footer
    cy.get('.card-content .button.is-small.is-danger').should('exist')
    cy.get('.card-content .button.is-small.is-info').should('exist')
    
    // Edit buttons should NOT be in the card-footer
    cy.get('.card-footer .button.is-small.is-danger').should('not.exist')
    cy.get('.card-footer .button.is-small.is-info').should('not.exist')
  })

  it('should have add and subtract buttons with only the "card-footer-item" class', () => {
    // Add and subtract buttons should only have the card-footer-item class
    cy.get('[aria-label*="Add one point for"]').should('have.attr', 'class', 'card-footer-item')
    cy.get('[aria-label*="Subtract one point for"]').should('have.attr', 'class', 'card-footer-item')
  })
}) 