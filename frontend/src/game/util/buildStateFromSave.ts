import clone from "clone"
import { getDefaultStore } from "jotai"
import { atom } from "jotai"
import type { PrimitiveAtom } from "jotai/vanilla"
import { atomsFromCardConfigs } from "./atomsFromCardConfigs"
import { selectedPartyAtom } from "../state/jotai/characters"
import { selectedScenarioEnemiesAtom } from "../state/jotai/enemies"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"
import { ZCharacter, ZEnemy, ZSaveConfig } from "../../../../shared/types/types"

/**
 * Builds up a game state from a save config.
 * Creates atoms from the config and sets the following atoms:
 * - activePartyAtom
 * - activeScenarioEnemiesAtom
 * - selectedScenarioConfigAtom
 */
const buildStateFromSave = (saveData: ZSaveConfig) => {
   const jotaiStore = getDefaultStore()

   const characters: Array<PrimitiveAtom<ZCharacter>> = []

   /**
    * Clone the config to avoid possible reference issues.
    */
   const clonedConfig = clone(saveData)

   for (const characterConfig of clonedConfig.characters) {
      const character: ZCharacter = {
         _id: characterConfig._id,
         name: characterConfig.name,
         position: characterConfig.position,
         cards: atomsFromCardConfigs(characterConfig.cards),
         health: characterConfig.health,
         maxHealth: characterConfig.maxHealth,
         baseActionDelay: characterConfig.baseActionDelay,
         currentActionDelay: characterConfig.currentActionDelay,
         spritePath: characterConfig.spritePath,
         selectedCardId: "",
         strength: characterConfig.strength,
      }

      const newCharacterAtom = atom(character)

      characters.push(newCharacterAtom)
   }

   jotaiStore.set(selectedPartyAtom, characters)

   // Build enemy state
   const enemies: Array<PrimitiveAtom<ZEnemy>> = []

   for (const enemyConfig of clonedConfig.enemies) {
      const enemy: ZEnemy = {
         _id: enemyConfig._id,
         name: enemyConfig.name,
         position: enemyConfig.position,
         cards: atomsFromCardConfigs(enemyConfig.cards),
         health: enemyConfig.health,
         maxHealth: enemyConfig.maxHealth,
         baseActionDelay: enemyConfig.baseActionDelay,
         currentActionDelay: enemyConfig.currentActionDelay,
         spritePath: enemyConfig.spritePath,
         selectedCardId: "",
         strength: enemyConfig.strength,
      }

      const newEnemyAtom = atom(enemy)

      enemies.push(newEnemyAtom)
   }

   jotaiStore.set(selectedScenarioEnemiesAtom, enemies)

   // Build scenario state
   // TOOD: Fix after loading refactor is done.
   jotaiStore.set(selectedScenarioConfigAtom, clonedConfig.scenario as never)

   return true
}

export { buildStateFromSave }
