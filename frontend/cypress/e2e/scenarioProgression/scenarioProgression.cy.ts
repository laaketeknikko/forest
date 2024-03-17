/// <reference types="cypress" />

describe("Winning and losing scenarios", function () {
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

   it("Can lose a scenario when party defeated", function () {
      cy.startScenario("Testing-lose-1", {
         characters: ["Weak-Test-Bushi"],
      })

      // Lose the scenario by attacking self.
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/results/i)
      cy.contains(/Testing-lose-1/i)
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

describe("Scenario results screen", function () {
   beforeEach(function () {
      cy.startNewGame()
   })

   it("Scenario statistics are properly recorded across multiple scenarios", function () {
      /**
       *  Scenario Testing-1
       */
      cy.startScenario("Testing-1")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/Times attempted: 1/i)
      cy.contains(/Wins: 1/i)
      cy.contains(/Losses: 0/i)

      cy.contains(/accept/i).click()

      cy.startScenario("Testing-1")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/Times attempted: 2/i)
      cy.contains(/Wins: 2/i)
      cy.contains(/Losses: 0/i)

      // Back to main menu
      cy.contains(/accept/i).click()

      /**
       * Testing-2
       */

      cy.startScenario("Testing-2")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/Times attempted: 1/i)
      cy.contains(/Wins: 1/i)
      cy.contains(/Losses: 0/i)

      cy.contains(/accept/i).click()

      cy.startScenario("Testing-2")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/Times attempted: 2/i)
      cy.contains(/Wins: 2/i)
      cy.contains(/Losses: 0/i)

      // Back to main menu
      cy.contains(/accept/i).click()

      /**
       * Testing-Lose-1
       */

      cy.startScenario("Testing-Lose-1", { characters: ["Weak-Test-Bushi"] })

      // Lose scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/Times attempted: 1/i)
      cy.contains(/Wins: 0/i)
      cy.contains(/Losses: 1/i)

      cy.contains(/accept/i).click()

      cy.startScenario("Testing-Lose-1", { characters: ["Weak-Test-Bushi"] })

      // Lose scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/Times attempted: 2/i)
      cy.contains(/Wins: 0/i)
      cy.contains(/Losses: 2/i)

      // Back to main menu
      cy.contains(/accept/i).click()

      /**
       * Back to Testing-1
       */
      cy.startScenario("Testing-1")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      cy.contains(/Times attempted: 3/i)
      cy.contains(/Wins: 3/i)
      cy.contains(/Losses: 0/i)
   })
})
