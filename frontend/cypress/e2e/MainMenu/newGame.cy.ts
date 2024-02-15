//const serverRoot = "http://localhost:5432"
const frontendRoot = "http://localhost:5173"

describe("Start new game", function () {
   it("Can start a new game", function () {
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

      cy.get(".in-game-menu-button")
      cy.get(".action-card-list")
      cy.get("canvas")
      cy.get(".turn-order-list")
   })
})
