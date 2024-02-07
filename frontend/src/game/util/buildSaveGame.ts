import { getDefaultStore } from "jotai"

import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"

const buildSaveGame = () => {
   const jotaiStore = getDefaultStore()

   const characterAtoms = jotaiStore.get(allPlayerCharactersAtom)
   const enemyAtoms = jotaiStore.get(activeScenarioEnemiesAtom)
   const scenarioConfig = jotaiStore.get(selectedScenarioConfigAtom)

   const saveGameData = {
      characters: [] as Array<Character>,
      enemies: [] as Array<Enemy>,
      scenario: {} as ScenarioConfig,
   }

   // Process characters and cards
   for (const characterAtom of characterAtoms) {
      const character = jotaiStore.get(characterAtom)
      const characterSaveData = {
         id: character.id,
         name: character.name,
         position: character.position,
         cards: [] as Array<ActionCard>,
         health: character.health,
         baseActionDelay: character.baseActionDelay,
         currentActionDelay: character.currentActionDelay,
         selectedCardId: character.selectedCardId,
         spritePath: character.spritePath,
      }

      // Process cards and actions
      for (const cardAtom of character.cards) {
         const card: ActionCard = jotaiStore.get(cardAtom)
         const cardData = {
            id: card.id,
            name: card.name,
            description: card.description,
            actions: [] as Array<ActionCardAction>,
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
      const enemySaveData = {
         id: enemy.id,
         name: enemy.name,
         position: enemy.position,
         cards: [] as Array<ActionCard>,
         health: enemy.health,
         baseActionDelay: enemy.baseActionDelay,
         currentActionDelay: enemy.currentActionDelay,
         selectedCardId: enemy.selectedCardId,
         spritePath: enemy.spritePath,
      }

      for (const cardAtom of enemy.cards) {
         const card: ActionCard = jotaiStore.get(cardAtom)
         const cardData = {
            id: card.id,
            name: card.name,
            description: card.description,
            actions: [] as Array<ActionCardAction>,
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
   saveGameData.scenario = { ...scenarioConfig }

   return saveGameData
}

export { buildSaveGame }
