import { atom } from "jotai"

import { activePartyAtom } from "./characters"
import { activeScenarioEnemiesAtom } from "./enemies"

/**
 * Used to hold all currently active game entities. This is used
 * during scenarios to find targets etc.
 *
 * This list includes entities that don't take turns.
 */
const allActiveGameEntitiesAtom = atom((get) => {
   const activeCharacters = get(activePartyAtom)
   const activeEnemies = get(activeScenarioEnemiesAtom)
   const allEntities = [...activeCharacters, ...activeEnemies]

   return allEntities
})

export { allActiveGameEntitiesAtom }
