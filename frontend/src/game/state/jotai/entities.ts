import { atom } from "jotai"

import { selectedPartyAtom } from "./characters"
import { selectedScenarioEnemiesAtom } from "./enemies"

/**
 * Used to hold all currently active game entities. This is used
 * during scenarios to find targets etc.
 *
 * This list includes entities that don't take turns.
 */
const allActiveGameEntitiesAtom = atom((get) => {
   const activeCharacters = get(selectedPartyAtom)
   const activeEnemies = get(selectedScenarioEnemiesAtom)
   const allEntities = [...activeCharacters, ...activeEnemies]

   return allEntities
})

export { allActiveGameEntitiesAtom }
