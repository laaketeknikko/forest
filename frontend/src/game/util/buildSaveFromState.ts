import { getDefaultStore } from "jotai"

import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { activePartyAtom } from "../state/jotai/characters"
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
   saveGameData.scenario = buildScenarioSave()

   return saveGameData
}

const buildScenarioSave = () => {
   const jotaiStore = getDefaultStore()
   const oldSave = jotaiStore.get(activeSaveGameConfigAtom)

   if (oldSave.scenario._id && oldSave.scenario._id === "empty") {
      const scenario = { ...jotaiStore.get(selectedScenarioConfigAtom) }
      const victoryConditions = scenario.scenarioVictoryCondition.map(
         (condition) => {
            return {
               ...condition,
               fulfilled: false,
            }
         }
      )

      return {
         ...scenario,
         scenarioVictoryCondition: victoryConditions,
      }
   } else {
      return oldSave.scenario
   }
}

const saveConfigFromCharacterAtom = (
   characterAtom: PrimitiveAtom<ZCharacter>
) => {
   const jotaiStore = getDefaultStore()

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

const saveConfigFromEnemyAtom = (enemyAtom: PrimitiveAtom<ZEnemy>) => {
   const jotaiStore = getDefaultStore()
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
