import { getDefaultJotaiStore } from "../../../src/game/state/jotai/store"
import { activeCharacterAtomAtom } from "../../../src/game/state/jotai/characters"
import { activePartyAtom } from "../../../src/game/state/jotai/characters"

const frontendRoot = "http://localhost:5173"

describe("New game, save game, load game", function () {
   it("Can create a new game, save the game, and load the game", function () {
      cy.startScenario("proof'o'c")

      // Check that we are in the game
      cy.get(".in-game-menu-button")
      cy.get(".action-card-list")
      cy.get("canvas")
      cy.get(".turn-order-list")

      // Test saving the game. Save and then check that url
      // has an id. Non-exact test is enough for this.
      cy.get(".in-game-menu-button").click()
      cy.findByRole("button", { name: /save/i }).click()
      cy.contains(/game saved/i)
      cy.location("pathname").should("to.match", /[a-z,0-9,-]{36}/)

      // Store the url containing the save id, visit front page
      // again and confirm we're in main menu.
      cy.location("href").then((url) =>
         cy.wrap(url).as("urlWithSave", { type: "static" })
      )
      cy.visit(frontendRoot)
      cy.contains(/new game/i)

      // Load the game and confirm we're in the game.
      cy.get("@urlWithSave").then((urlWithSave) => {
         cy.visit(urlWithSave)
      })
      cy.findByRole("button", { name: /load/i }).click()
      cy.get(".in-game-menu-button")
      cy.get(".action-card-list")
      cy.get("canvas")
      cy.get(".turn-order-list")

      cy.clickOnActiveCharacter()
   })
})
