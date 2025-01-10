const assertTeamAndScoreDisplayed = (id: string, label: string, score: number) => {
  cy.contains(label).should('have.id', id)
  cy.contains(`[aria-labelledby="${id}"]`, score)
}
const clickAddButtonForTeam1 = () => cy.get('[aria-label="Add one point for Team 1"]').click()
const clickSubtractButtonForTeam1 = () => cy.get('[aria-label="Subtract one point for Team 1"]').click()

describe('Scoreboard app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })
  
  describe('on first load', () => {
    it('should display team 1 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('team1', 'Team 1', 0)
    })

    it('should display team 2 with a starting score of 0', () => {
      // assert
      assertTeamAndScoreDisplayed('team2', 'Team 2', 0)
    })
  })

  // TODO refactor id and label into one
  const itShouldDoScoreChangesForTeam = (id: string, label: string) => {
    describe(`scores changes for ${label}`, () => {
      it('should increase the score by 1 for when click the add button', () => {
        // assert
        assertTeamAndScoreDisplayed(id, label, 0)
    
        // act
        clickAddButtonForTeam1()
    
        // assert
        assertTeamAndScoreDisplayed(id, label, 1)
      })
    
      it('should increase the score by 2 for when click the add button twice', () => {
        // assert
        assertTeamAndScoreDisplayed(id, label, 0)
    
        // act
        clickAddButtonForTeam1()
        clickAddButtonForTeam1()
    
        // assert
        assertTeamAndScoreDisplayed(id, label, 2)
      })
    
      it('should display a score of one for when I click the add button twice and click the subtract button once', () => {
        // act
        clickAddButtonForTeam1()
        clickAddButtonForTeam1()
        clickSubtractButtonForTeam1()
    
        // assert
        assertTeamAndScoreDisplayed(id, label, 1)
      })
    
      it('should not reduce the score below 0 for when I click the subtract button once before any scores have been added', () => {
        // act
        clickSubtractButtonForTeam1()
    
        // assert
        assertTeamAndScoreDisplayed(id, label, 0)
      })
    })
  }

  itShouldDoScoreChangesForTeam('team1', 'Team 1')
})