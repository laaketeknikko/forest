const frontendRoot = "http://localhost:5173"

describe("New game, save game, load game", function () {
   it("Can create a new game, save the game, and load the game", function () {
      // Start a new scenario
      cy.visit(frontendRoot)
      cy.get("button").contains("New game").click()
      cy.contains("Choose a scenario")
      cy.contains("First encounter").click()
      cy.get("button").contains("Select characters").click()
      cy.get(".character-selection-img").each(($img) => {
         cy.wrap($img).click()
      })
      cy.contains(/confirmation/i).click()
      cy.get("button")
         .contains(/start scenario/i)
         .click()

      // Check that we are in the game
      cy.get(".in-game-menu-button")
      cy.get(".action-card-list")
      cy.get("canvas")
      cy.get(".turn-order-list")

      // Test saving the game. Save and then check that url
      // has an id. Non-exact test is enough for this.
      cy.get(".in-game-menu-button").click()
      cy.findByRole("button", { name: /save/i }).click()
      cy.location("pathname").should("to.match", /[a-z,0-9,-]{36}/)

      // Store the url containing the save id, visit front page
      // again and confirm we're in main menu.
      cy.location("href").then((url) =>
         cy.wrap(url).as("urlWithSave", { type: "static" })
      )
      cy.visit(frontendRoot)
      cy.contains(/new game/i)
      cy.contains(/select scenario/i)
      cy.contains(/main menu/i)

      // Load the game and confirm we're in the game.
      cy.get("@urlWithSave").then((urlWithSave) => {
         // Seems to work even with this TypeScript error.
         cy.visit(urlWithSave)
      })
      cy.get(".in-game-menu-button")
      cy.get(".action-card-list")
      cy.get("canvas")
      cy.get(".turn-order-list")
   })
})
