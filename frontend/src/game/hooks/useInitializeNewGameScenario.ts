import { Atom, atom, getDefaultStore, useAtom } from "jotai"
import {
   activeScenarioEnemiesAtom,
   allEnemiesAtom,
} from "../state/jotai/enemies"
import { activePartyAtom } from "../state/jotai/characters"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"

import { shuffle } from "lodash"
import clone from "clone"
import {
   ICharacter,
   IEnemy,
   IPosition2D,
   IScenarioConfig,
} from "../../../../shared/types/types"

const initializeEntityPosition = ({
   entityAtom,
   position,
}: {
   entityAtom: Atom<ICharacter>
   position: IPosition2D
}) => {
   const jotaiStore = getDefaultStore()
   const character = jotaiStore.get(entityAtom)

   if (!character.position) {
      character.position = { x: 0, y: 0, z: 0 }
   }

   character.position.x = position.x
   character.position.z = position.z

   // TODO: fix
   jotaiStore.set(entityAtom as never, { ...character })
}

const initializeCharacterPositions = ({
   scenarioConfig,
   activeParty,
}: {
   scenarioConfig: IScenarioConfig
   activeParty: Array<Atom<ICharacter>>
}) => {
   const positions = shuffle([
      ...scenarioConfig.playerCharacterStartingPositions,
   ])
   for (const memberAtom of activeParty) {
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

const initializeEnemyPosition = ({
   scenarioConfig,
   activeEnemyAtoms,
   allEnemiesAtoms,
}: {
   scenarioConfig: IScenarioConfig
   activeEnemyAtoms: Atom<Array<Atom<IEnemy>>>
   allEnemiesAtoms: Array<Atom<IEnemy>>
}) => {
   const jotaiStore = getDefaultStore()

   const scenarioEnemies = scenarioConfig.enemies
   const activeEnemies: Array<Atom<IEnemy>> = []

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

   // TODO: fix
   jotaiStore.set(activeEnemyAtoms as never, activeEnemies)
}

const useInitializeScenario = () => {
   const [allEnemies] = useAtom(allEnemiesAtom)
   const [activeParty] = useAtom(activePartyAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const initializeScenario = () => {
      initializeCharacterPositions({
         scenarioConfig: selectedScenarioConfig,
         activeParty: activeParty,
      })

      initializeEnemyPosition({
         scenarioConfig: selectedScenarioConfig,
         activeEnemyAtoms: activeScenarioEnemiesAtom,
         allEnemiesAtoms: allEnemies,
      })

      return true
   }

   return initializeScenario
}

export { useInitializeScenario }
