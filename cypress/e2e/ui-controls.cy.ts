import { getCardForTeam } from '../support/scoreboard-helpers'

describe('Scoreboard app - UI Controls', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should display +1 text on add buttons while maintaining accessibility', () => {
    // Check that add buttons display "+1" as text content
    cy.get('[aria-label="Add one point for Team 1"]').should('contain.text', '+1')
    cy.get('[aria-label="Add one point for Team 2"]').should('contain.text', '+1')
    
    // Verify aria-labels are still accessible (should contain "Add")
    cy.get('[aria-label="Add one point for Team 1"]').should('have.attr', 'aria-label').and('contain', 'Add')
    cy.get('[aria-label="Add one point for Team 2"]').should('have.attr', 'aria-label').and('contain', 'Add')
  })

  it('should display -1 text on subtract buttons while maintaining accessibility', () => {
    // Check that subtract buttons display "-1" as text content
    cy.get('[aria-label="Subtract one point for Team 1"]').should('contain.text', '-1')
    cy.get('[aria-label="Subtract one point for Team 2"]').should('contain.text', '-1')
    
    // Verify aria-labels are still accessible (should contain "Subtract")
    cy.get('[aria-label="Subtract one point for Team 1"]').should('have.attr', 'aria-label').and('contain', 'Subtract')
    cy.get('[aria-label="Subtract one point for Team 2"]').should('have.attr', 'aria-label').and('contain', 'Subtract')
  })

  it('should position Team 1 subtract button to the left of add button', () => {
    // Test for Team 1 - subtract button should come before add button in DOM order
    getCardForTeam('Team 1').find('.card-footer').within(() => {
      cy.get('[aria-label="Subtract one point for Team 1"]').then($subtractBtn => {
        cy.get('[aria-label="Add one point for Team 1"]').then($addBtn => {
          const subtractIndex = $subtractBtn.index()
          const addIndex = $addBtn.index()
          
          // Subtract button should come before add button in DOM order
          expect(subtractIndex).to.be.lessThan(addIndex)
        })
      })
    })
  })

  it('should position Team 2 subtract button to the left of add button', () => {
    // Test for Team 2 - subtract button should come before add button in DOM order
    getCardForTeam('Team 2').find('.card-footer').within(() => {
      cy.get('[aria-label="Subtract one point for Team 2"]').then($subtractBtn => {
        cy.get('[aria-label="Add one point for Team 2"]').then($addBtn => {
          const subtractIndex = $subtractBtn.index()
          const addIndex = $addBtn.index()
          
          // Subtract button should come before add button in DOM order
          expect(subtractIndex).to.be.lessThan(addIndex)
        })
      })
    })
  })
}) 