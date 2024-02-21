import { getDefaultStore } from "jotai"

import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"
import { activePartyAtom } from "../state/jotai/characters"
import {
   // TODO: Create saveconfig types
   ZActionCard,
   ZActionCardAction,
   ZSaveConfigCharacter,
   ZSaveConfigEnemy,
   ZSaveConfigScenarioConfig,
} from "../../../../shared/types/types"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"

/**
 * Builds a save config from the current state.
 * Notably, turns arrays of atoms to arrays of objects.
 *
 * Uses the following atoms to get the state:
 * - activePartyAtom
 * - activeScenarioEnemiesAtom
 * - selectedScenarioConfigAtom
 *
 *
 */
const buildSaveFromState = () => {
   const jotaiStore = getDefaultStore()

   const characterAtoms = jotaiStore.get(activePartyAtom)
   const enemyAtoms = jotaiStore.get(activeScenarioEnemiesAtom)
   const scenarioConfig = jotaiStore.get(selectedScenarioConfigAtom)
   const oldSave = jotaiStore.get(activeSaveGameConfigAtom)

   const saveGameData = {
      characters: [] as Array<ZSaveConfigCharacter>,
      enemies: [] as Array<ZSaveConfigEnemy>,
      scenario: {} as ZSaveConfigScenarioConfig,
   }

   // Process characters and cards
   for (const characterAtom of characterAtoms) {
      const character = jotaiStore.get(characterAtom)
      const characterSaveData: ZSaveConfigCharacter = {
         _id: character._id,
         name: character.name,
         position: character.position,
         cards: [] as Array<ZActionCard>,
         health: character.health,
         baseActionDelay: character.baseActionDelay,
         currentActionDelay: character.currentActionDelay,
         selectedCardId: character.selectedCardId,
         spritePath: character.spritePath,
         strength: character.strength,
      }

      // Process cards and actions
      for (const cardAtom of character.cards) {
         const card: ZActionCard = jotaiStore.get(cardAtom)
         const cardData = {
            _id: card._id,
            name: card.name,
            description: card.description,
            actions: [] as Array<ZActionCardAction>,
            nextActionId: card.nextActionId,
         }

         for (const action of card.actions) {
            const actionData = { ...action }
            cardData.actions.push(actionData)
         }

         characterSaveData.cards.push(cardData)
      }

      saveGameData.characters.push(characterSaveData)
   }

   // Process enemies
   for (const enemyAtom of enemyAtoms) {
      const enemy = jotaiStore.get(enemyAtom)
      const enemySaveData: ZSaveConfigEnemy = {
         _id: enemy._id,
         name: enemy.name,
         position: enemy.position,
         cards: [] as Array<ZActionCard>,
         health: enemy.health,
         baseActionDelay: enemy.baseActionDelay,
         currentActionDelay: enemy.currentActionDelay,
         selectedCardId: enemy.selectedCardId,
         spritePath: enemy.spritePath,
         strength: enemy.strength,
      }

      for (const cardAtom of enemy.cards) {
         const card: ZActionCard = jotaiStore.get(cardAtom)
         const cardData = {
            _id: card._id,
            name: card.name,
            description: card.description,
            actions: [] as Array<ZActionCardAction>,
            nextActionId: card.nextActionId,
         }

         for (const action of card.actions) {
            const actionData = { ...action }
            cardData.actions.push(actionData)
         }

         enemySaveData.cards.push(cardData)
      }

      saveGameData.enemies.push(enemySaveData)
   }

   // Process scenario
   saveGameData.scenario = {
      ...scenarioConfig,
      scenarioVictoryCondition: oldSave.scenario.scenarioVictoryCondition,
   }

   return saveGameData
}

export { buildSaveFromState }
