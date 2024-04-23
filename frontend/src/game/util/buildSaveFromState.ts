import { selectedScenarioEnemiesAtom } from "../state/jotai/enemies"
import { selectedPartyAtom } from "../state/jotai/characters"
import {
   ZActionCard,
   ZCharacter,
   ZEnemy,
   ZSaveConfigCharacter,
   ZSaveConfigEnemy,
   ZSaveConfigScenarioConfig,
} from "../../../../shared/types/types"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { PrimitiveAtom } from "jotai/vanilla"
import clone from "clone"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"
import { getDefaultJotaiStore } from "../state/jotai/store"

/**
 * Builds a save config from the current state.
 *
 * Uses the following atoms:
 * - activePartyAtom
 * - activeScenarioEnemiesAtom
 * - selectedScenarioConfigAtom
 *
 * Note that a save config contains other data that is
 * not updated by this function.
 */
const buildSaveFromState = () => {
   const jotaiStore = getDefaultJotaiStore()
   const characterAtoms = jotaiStore.get(selectedPartyAtom)
   const enemyAtoms = jotaiStore.get(selectedScenarioEnemiesAtom)

   const saveGameData = {
      characters: [] as Array<ZSaveConfigCharacter>,
      enemies: [] as Array<ZSaveConfigEnemy>,
      scenario: {} as ZSaveConfigScenarioConfig,
   }

   // Process characters and cards
   for (const characterAtom of characterAtoms) {
      const characterSaveData = saveConfigFromCharacterAtom(characterAtom)
      saveGameData.characters.push(characterSaveData)
   }

   // Process enemies
   for (const enemyAtom of enemyAtoms) {
      const enemySaveData = saveConfigFromEnemyAtom(enemyAtom)
      saveGameData.enemies.push(enemySaveData)
   }

   // Process scenario
   saveGameData.scenario = InitializeScenarioSave()

   return saveGameData
}

/**
 * If the save contains the initial config, creates a new
 * config. Otherwise, returns the old config.
 */
const InitializeScenarioSave = () => {
   const jotaiStore = getDefaultJotaiStore()
   const oldSave = jotaiStore.get(activeSaveGameConfigAtom)

   if (oldSave.scenario._id && oldSave.scenario._id === "empty") {
      const scenario = { ...jotaiStore.get(selectedScenarioConfigAtom) }
      const victoryConditions = scenario.scenarioVictoryConditions.map(
         (condition) => {
            return {
               ...condition,
               fulfilled: false,
            }
         }
      )

      return {
         ...scenario,
         scenarioVictoryConditions: victoryConditions,
      }
   } else {
      return oldSave.scenario
   }
}

/**
 * Clones the data of a character and returns it.
 */
const saveConfigFromCharacterAtom = (
   characterAtom: PrimitiveAtom<ZCharacter>
) => {
   const jotaiStore = getDefaultJotaiStore()

   const character = jotaiStore.get(characterAtom)
   const characterSaveData: ZSaveConfigCharacter = {
      ...clone(character),
      cards: [] as Array<ZActionCard>,
   }

   // Process cards and actions
   for (const cardAtom of character.cards) {
      const card: ZActionCard = jotaiStore.get(cardAtom)
      const cardData = clone(card)
      characterSaveData.cards.push(cardData)
   }

   return characterSaveData
}

/**
 * Clones the data of an enemy and returns it.
 */
const saveConfigFromEnemyAtom = (enemyAtom: PrimitiveAtom<ZEnemy>) => {
   const jotaiStore = getDefaultJotaiStore()
   const enemy = jotaiStore.get(enemyAtom)

   const enemySaveData: ZSaveConfigCharacter = {
      ...clone(enemy),
      cards: [] as Array<ZActionCard>,
   }

   // Process cards and actions
   for (const cardAtom of enemy.cards) {
      const card: ZActionCard = jotaiStore.get(cardAtom)
      const cardData = clone(card)
      enemySaveData.cards.push(cardData)
   }

   return enemySaveData
}

export { buildSaveFromState }
