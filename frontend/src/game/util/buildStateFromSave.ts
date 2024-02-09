import clone from "clone"
import { getDefaultStore } from "jotai"
import { atom } from "jotai"
import type { Atom } from "jotai/vanilla"
import { atomsFromCardConfigs } from "./atomsFromCardConfigs"
import { activePartyAtom } from "../state/jotai/characters"
import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"

const buildStateFromSave = (saveData: SaveGameConfig) => {
   const jotaiStore = getDefaultStore()

   // Build character state
   const characters: Array<Atom<Character>> = []

   // Clone the config simply to avoid possible reference issues.
   const clonedConfig = clone(saveData)

   for (const characterConfig of clonedConfig.characters) {
      const character = {
         _id: characterConfig._id,
         name: characterConfig.name,
         position: characterConfig.position,
         cards: atomsFromCardConfigs(characterConfig.cards),
         health: characterConfig.health,
         baseActionDelay: characterConfig.baseActionDelay,
         currentActionDelay: characterConfig.currentActionDelay,
         spritePath: characterConfig.spritePath,
         selectedCardId: characterConfig.cards[0]._id,
      }

      const newCharacterAtom = atom(character)

      characters.push(newCharacterAtom)
   }

   jotaiStore.set(activePartyAtom, characters)

   // Build enemy state
   const enemies: Array<Atom<Enemy>> = []

   for (const enemyConfig of clonedConfig.enemies) {
      const enemy = {
         _id: enemyConfig._id,
         name: enemyConfig.name,
         position: enemyConfig.position,
         cards: atomsFromCardConfigs(enemyConfig.cards),
         health: enemyConfig.health,
         baseActionDelay: enemyConfig.baseActionDelay,
         currentActionDelay: enemyConfig.currentActionDelay,
         spritePath: enemyConfig.spritePath,
         selectedCardId: enemyConfig.cards[0]._id,
      }

      const newEnemyAtom = atom(enemy)

      enemies.push(newEnemyAtom)
   }

   jotaiStore.set(activeScenarioEnemiesAtom, enemies)

   // Build scenario state
   jotaiStore.set(selectedScenarioConfigAtom, clonedConfig.scenario)

   return true
}

export { buildStateFromSave }
