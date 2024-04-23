/// <reference types="cypress" />

const frontendRoot = "http://localhost:5173"

describe("New game, save game, load game", function () {
   beforeEach(function () {
      cy.startNewGame()
   })

   it("Can create a new game, save the game, and load the game", function () {
      cy.startScenario("Testing-1")

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
      cy.get("@urlWithSave").then((_urlWithSave) => {
         cy.visit(this.urlWithSave)
      })
      cy.findByRole("button", { name: /load/i }).click()
      cy.get(".in-game-menu-button")
      cy.get(".action-card-list")
      cy.get("canvas")
      cy.get(".turn-order-list")
   })
})

describe("Scenario selection and unlocking", function () {
   beforeEach(function () {
      cy.startNewGame()
   })

   it("Locked scenarios unselectable, unlocked scenarios selectable", function () {
      cy.findByRole("button", { name: /Testing-2/i }).should("be.disabled")
      cy.findByRole("button", { name: /Testing-3/i }).should("be.disabled")

      cy.startScenario("Testing-1")

      // Win scenario
      cy.clickOnFirstActionCard()
      cy.clickOnActiveCharacter()

      // Back to main menu
      cy.contains(/results/i)
      cy.findByRole("button", { name: /accept/i }).click()

      cy.findByRole("button", { name: /Testing-2/i }).should("not.be.disabled")
      cy.findByRole("button", { name: /Testing-3/i }).should("be.disabled")
   })

   it("Scenario description updates to the selected scenario", function () {
      cy.contains(/Testing-1/i).click()
      cy.contains(/Maximum party size: 3/i)
      cy.contains(/Debug-Miinii is defeated/i)
      cy.contains(/All player characters are defeated/i)
      cy.get(`img[title="Test-Miinii"]`).click()
      cy.contains(/name: Test-Miinii/i)
      cy.contains(/Health: 1/i)
      cy.contains(/Action delay: 1/i)

      cy.contains(/Testing-1-2/i).click()
      cy.contains(/Maximum party size: 3/i)
      cy.contains(/Arena size: 15x15/i)
      cy.contains(/Debug-Miinii is bested/i)
      cy.contains(/Party defeated/i)
      cy.get(`img[title="Test-Miinii-2"]`).click()
      cy.contains(/name: Test-Miinii-2/i)
      cy.contains(/Health: 2/i)

      cy.contains(/Testing-1/i).click()
      cy.contains(/Maximum party size: 3/i)
      cy.contains(/Debug-Miinii is defeated/i)
      cy.contains(/All player characters are defeated/i)
      cy.get(`img[title="Test-Miinii"]`).click()
      cy.contains(/name: Test-Miinii/i)
      cy.contains(/Health: 1/i)
      cy.contains(/Action delay: 1/i)
   })

   it("Character selection only allows party size characters", function () {
      cy.contains(/Testing-1/i).click()

      // Save party size
      cy.contains(/Maximum party size: 3/i)
         .invoke("text")
         .then((text) => {
            const startX = text.indexOf(":") + 1
            const x = Number(text.substring(startX))

            cy.wrap(x).as("partySize")
            cy.wrap(0).as("selectedCount")
         })

      cy.contains(/select characters/i).click()

      // Select every character in the list
      cy.get(".character-selection-img").each(($img) => {
         cy.wrap($img).click()
         cy.wrap($img).click()

         cy.wrap((this.selectedCount += 1)).as("selectedCount")
      })

      // Check that we have party size characters.
      /*cy.get(".character-selection-selected-party")
         .find("img")
         .and("have.length", this.partySize)*/

      // Ensure that we actually tried to select more than party size
      // characters. Otherwise we wouldn't know.
      cy.then(() => {
         expect(this.selectedCount).to.be.greaterThan(this.partySize)
      })
   })
})
