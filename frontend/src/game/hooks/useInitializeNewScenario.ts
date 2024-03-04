import { PrimitiveAtom, atom, getDefaultStore, useAtom } from "jotai"
import {
   selectedScenarioEnemiesAtom,
   allEnemiesAtom,
} from "../state/jotai/enemies"
import { selectedPartyAtom } from "../state/jotai/characters"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"

import { shuffle } from "lodash"
import clone from "clone"
import {
   ZCharacter,
   ZEnemy,
   ZPosition2D,
   ZScenarioConfig,
} from "../../../../shared/types/types"

/**
 * This hook is used when a new scenario is started by going through the main menu.
 *
 * It initializes the positions of enemies and characters in the scenario.
 * The characters are taken from activePartyAtom and placed randomly on defined starting positions.
 * The enemies are taken from selecteScenarioConfigAtom and found by name in allEnemiesAtom.
 *
 * Also creates new enemy atoms and adds them to activeScenarioEnemiesAtom.
 */
const useInitializeNewScenario = () => {
   const [allEnemies] = useAtom(allEnemiesAtom)
   const [selectedParty] = useAtom(selectedPartyAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const initializeScenario = () => {
      setCharacterPositions({
         scenarioConfig: selectedScenarioConfig,
         activePartyAtom: selectedParty,
      })

      setEnemyPositions({
         scenarioConfig: selectedScenarioConfig,
         activeEnemyAtoms: selectedScenarioEnemiesAtom,
         allEnemiesAtoms: allEnemies,
      })

      return true
   }

   return initializeScenario
}

const initializeEntityPosition = ({
   entityAtom,
   position,
}: {
   entityAtom: PrimitiveAtom<ZCharacter>
   position: ZPosition2D
}) => {
   const jotaiStore = getDefaultStore()
   const character = jotaiStore.get(entityAtom)

   if (!character.position) {
      character.position = { x: 0, y: 0, z: 0 }
   }

   character.position.x = position.x
   character.position.z = position.z

   jotaiStore.set(entityAtom, { ...character })
}

/**
 * Randomizes character starting positions based on scenario config.
 */
const setCharacterPositions = ({
   scenarioConfig,
   activePartyAtom,
}: {
   scenarioConfig: ZScenarioConfig
   activePartyAtom: Array<PrimitiveAtom<ZCharacter>>
}) => {
   const positions = shuffle([
      ...scenarioConfig.playerCharacterStartingPositions,
   ])
   for (const memberAtom of activePartyAtom) {
      const position = positions.pop()

      if (!position) {
         throw new Error(
            "Not enough positions in scenarioConfig.playerCharacterStartingPositions"
         )
      }

      initializeEntityPosition({
         entityAtom: memberAtom,
         position: position,
      })
   }
}

/**
 * Randomizes enemy starting positions based on scenario config.
 * Also creates enemy atoms from enemy configs in scenarioConfig
 * and adds atoms to activeEnemyAtosm.
 */
const setEnemyPositions = ({
   scenarioConfig,
   activeEnemyAtoms,
   allEnemiesAtoms,
}: {
   scenarioConfig: ZScenarioConfig
   activeEnemyAtoms: PrimitiveAtom<Array<PrimitiveAtom<ZEnemy>>>
   allEnemiesAtoms: Array<PrimitiveAtom<ZEnemy>>
}) => {
   const jotaiStore = getDefaultStore()

   const scenarioEnemies = scenarioConfig.enemies
   const activeEnemies: Array<PrimitiveAtom<ZEnemy>> = []

   for (const enemy of scenarioEnemies) {
      const enemyAtom = allEnemiesAtoms.find((atom) => {
         const enemyData = jotaiStore.get(atom)
         return enemyData.name.toLowerCase() === enemy.enemyName.toLowerCase()
      })

      if (!enemyAtom) {
         throw new Error(`Enemy not found in allEnemies: ${enemy.enemyName}`)
      }

      // Create new enemy
      const enemyData = clone(jotaiStore.get(enemyAtom), false)

      if (!enemyData.position) {
         enemyData.position = { x: 0, y: 0, z: 0 }
      }

      enemyData.position.x = enemy.startingPosition.x
      enemyData.position.z = enemy.startingPosition.z

      const newEnemyAtom = atom(enemyData)

      jotaiStore.set(newEnemyAtom, { ...enemyData })

      activeEnemies.push(newEnemyAtom)
   }

   jotaiStore.set(activeEnemyAtoms, activeEnemies)
}

export { useInitializeNewScenario }
