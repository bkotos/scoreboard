describe('Game Controls Layout', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should have game controls left-aligned with Undo/Redo together and New game on separate line', () => {
    // arrange
    cy.get('[aria-label*="Add one point for"]').first().click()
    cy.get('button').contains('Undo').click()

    // assert
    cy.get('[aria-label="Game controls"]').should('have.class', 'has-text-left')
    cy.get('[aria-label="Game controls"]').within(() => {
      cy.get('button').contains('Redo').next().should('match', 'br')
      cy.get('button').contains('Redo').nextAll('br').should('have.length.at.least', 2)
      cy.get('button').contains('New game').prev().should('match', 'br')
    })
  })
}) 