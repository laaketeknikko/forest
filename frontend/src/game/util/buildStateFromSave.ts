import clone from "clone"
import { getDefaultStore } from "jotai"
import { atom } from "jotai"
import type { Atom } from "jotai/vanilla"
import { atomsFromCardConfigs } from "./atomsFromCardConfigs"
import { activePartyAtom } from "../state/jotai/characters"
import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"
import {
   ICharacter,
   IEnemy,
   ISaveGameConfig,
} from "../../../../shared/types/types"

const buildStateFromSave = (saveData: ISaveGameConfig) => {
   const jotaiStore = getDefaultStore()

   // Build character state
   const characters: Array<Atom<ICharacter>> = []

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
         selectedCardId: "",
      }

      const newCharacterAtom = atom(character)

      characters.push(newCharacterAtom)
   }

   jotaiStore.set(activePartyAtom, characters)

   // Build enemy state
   const enemies: Array<Atom<IEnemy>> = []

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
         selectedCardId: "",
      }

      const newEnemyAtom = atom(enemy)

      enemies.push(newEnemyAtom)
   }

   console.log("Active scenario enemies:", enemies)

   jotaiStore.set(activeScenarioEnemiesAtom, enemies)

   // Build scenario state
   // TOOD: Fix
   jotaiStore.set(selectedScenarioConfigAtom, clonedConfig.scenario as never)

   return true
}

export { buildStateFromSave }
