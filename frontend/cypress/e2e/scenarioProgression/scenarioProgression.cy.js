describe("Winning scenarios", function () {
   beforeEach(function () {
      cy.startNewGame()
   })

   it("Can start a new game and win a scenario", function () {
      cy.startScenario("Testing-1")

      // Check that we are in the game
      cy.get(".in-game-menu-button")
      cy.get(".action-card-list")
      cy.get("canvas")

      /**
       * In scenario Testing-1, the enemy is Test-Miinii, which
       * has an action delay of 1. Because of this, Test-Miinii will
       * go first and we can win by simply attacking itself.
       */
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/results/i)
      cy.contains(/Testing-1/i)
   })
})

describe("Scenario unlock conditions", function () {
   beforeEach(function () {
      cy.startNewGame()
   })

   it("Can start a new game and unlock initially locked scenarios in chain of 3", function () {
      cy.startScenario("Testing-1")

      // Check that we are in the game
      cy.get(".in-game-menu-button")
      cy.get("canvas")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      // Back to main menu
      cy.contains(/results/i)
      cy.findByRole("button", { name: /accept/i }).click()

      // Get next scenario in progression
      cy.startScenario("Testing-2")

      // Check that we are in the game
      cy.get(".in-game-menu-button")
      cy.get("canvas")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      // Back to main menu
      cy.contains(/results/i)
      cy.findByRole("button", { name: /accept/i }).click()

      // Get next scenario in progression
      cy.startScenario("Testing-3")

      // Check that we are in the game
      cy.get(".in-game-menu-button")
      cy.get("canvas")
   })
})
