describe('Scoreboard app', () => {
  describe('on first load', () => {
    it('should display team 1 with a starting score of 0', () => {
      // act
      cy.visit('http://127.0.0.1:8080/')

      // assert
      cy.contains('Team 1').should('have.id', 'team1')
      cy.contains('0').should('have.attr', 'aria-labelledby', 'team1')
    })
  })
})