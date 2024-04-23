/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

import "@testing-library/cypress/add-commands"

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Cypress {
      interface Chainable {
         startScenario(
            scenarioName: string,
            options?: { [characters: string]: Array<string> }
         ): Chainable<void>
         clickOnActiveCharacter(): Chainable<void>
         clickOnFirstActionCard(): Chainable<void>
         startNewGame(): Chainable<void>
      }
   }
}

Cypress.Commands.add("startNewGame", () => {
   const frontendRoot = "http://localhost:5173"
   cy.visit(frontendRoot)
   cy.get("button")
      .contains(/New game/i)
      .click()
})

/**
 * Start a new game with the given scenario.
 *
 * The command goes through the main menu, starting from
 * "new game" and ending with clicking on "start scenario".
 *
 * Characters are selected from top to bottom.
 */
Cypress.Commands.add("startScenario", (scenarioName, options) => {
   cy.log(
      `Start scenario ${scenarioName} with characters ${options?.characters}`
   )
   cy.get("button")
      .contains(/select scenario/i)
      .click()

   // Select scenario
   cy.contains(new RegExp(scenarioName, "i")).click()
   cy.get("button")
      .contains(/Select characters/i)
      .click()

   // If no charcters specified, select from top of list
   if (!options?.characters) {
      // Click twice on each character to select characters.
      cy.get(".character-selection-img").each(($img) => {
         cy.wrap($img).click()
         cy.wrap($img).click()
      })
   }
   // Otherwise select given characters
   else {
      for (const character of options.characters) {
         cy.get("img[title=" + character + "]").click()
         cy.get("img[title=" + character + "]").click()
      }
   }

   // Confirm start.
   cy.contains(/confirm/i).click()
   cy.get("button")
      .contains(/start scenario/i)
      .click()
})

/**
 * Clicks on the first action card on the action card list.
 *
 * Simply gets .action-card-list and clicks on first "button".
 */
Cypress.Commands.add("clickOnFirstActionCard", () => {
   cy.log("Clicking on first action card")
   cy.get(".action-card-list").find("button").first().click()
})

/**
 * Click on the active character.
 *
 * Gets the active character from game state.
 *
 * Includes a wait of 3 seconds before clicking, to allow the
 * camera to move to position.
 *
 * NOTE: This doesn't work on Firefox, resulting in
 * "Element.releasePointerCapture: Invalid pointer id" error.
 *
 */
Cypress.Commands.add("clickOnActiveCharacter", () => {
   cy.log("Clicking on active character")
   cy.contains(/camera-moving/i).contains(/false/i)
   cy.contains(/screen-x/i)
      .invoke("text")
      .then((text) => {
         const startX = text.indexOf(":") + 1
         const x = Number(text.substring(startX))

         cy.contains(/screen-y/i)
            .invoke("text")
            .then((text) => {
               const startY = text.indexOf(":") + 1
               const y = Number(text.substring(startY))

               // eslint-disable-next-line cypress/no-unnecessary-waiting
               cy.wait(500)
               cy.get("canvas").click(x, y)
            })
      })
})
