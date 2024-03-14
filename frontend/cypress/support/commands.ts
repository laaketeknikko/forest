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
declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Cypress {
      interface Chainable {
         startScenario(scenarioName: string): Chainable<void>
         clickOnActiveCharacter(): Chainable<void>
      }
   }
}

import "@testing-library/cypress/add-commands"
import { getDefaultStore } from "jotai"
import { activeCharacterAtomAtom } from "../../src/game/state/jotai/characters"
import { getEntityScreenCoordinates } from "../../src/game/util/mapUtils"
import { getPixelCoordinatesFromNormalizedCoordinates } from "../../src/game/util/mapUtils"
import { turnOrderAtom } from "../../src/game/state/jotai/gameState"

/**
 * Start a new game with the given scenario.
 *
 * The command goes through the main menu, starting from
 * "new game" and ending with clicking on "start scenario".
 *
 * Characters are selected from top to bottom.
 */
Cypress.Commands.add("startScenario", (scenarioName) => {
   const frontendRoot = "http://localhost:5173"

   // Start a new game
   cy.visit(frontendRoot)
   cy.get("button")
      .contains(/New game/i)
      .click()

   // Select scenario
   cy.contains(new RegExp(scenarioName, "i")).click()
   cy.get("button")
      .contains(/Select characters/i)
      .click()

   // Click twice on each character to select characters.
   cy.get(".character-selection-img").each(($img) => {
      cy.wrap($img).click()
      cy.wrap($img).click()
   })

   // Confirm start.
   cy.contains(/confirm/i).click()
   cy.get("button")
      .contains(/start scenario/i)
      .click()
})

/**
 * Click on the active character.
 *
 * Gets the active character from game state.
 *
 * Includes a wait of 3 seconds before clicking, to allow the
 * camera to move to position.
 */
Cypress.Commands.add("clickOnActiveCharacter", () => {
   // eslint-disable-next-line cypress/no-unnecessary-waiting
   cy.wait(3000)

   const getPixelCoords = () => {
      const jotaiStore = getDefaultStore()

      console.log("jotaiStore", jotaiStore)
      const activeCharacter = jotaiStore.get(activeCharacterAtomAtom)
      const activeCharacterData = jotaiStore.get(activeCharacter)

      const turnOrder = jotaiStore.get(turnOrderAtom)
      console.log("turn order", turnOrder)

      console.log("active character data", activeCharacterData)
      const coordinates = getEntityScreenCoordinates(activeCharacterData)

      console.log("Coordinates: ", coordinates)
      let pixelCoordinates
      if (coordinates) {
         pixelCoordinates =
            getPixelCoordinatesFromNormalizedCoordinates(coordinates)
      }
      console.log("pixel coordinates: ", pixelCoordinates)
      return pixelCoordinates
   }

   cy.wrap({ getPixelCoords: getPixelCoords })
      .invoke("getPixelCoords")
      .then((pixelCoordinates) => {
         if (pixelCoordinates) {
            cy.log("clicking at", pixelCoordinates)
            cy.get("canvas").click(pixelCoordinates.x, pixelCoordinates.y)
         } else {
            cy.log("no active character coordinates")
         }
      })
})
