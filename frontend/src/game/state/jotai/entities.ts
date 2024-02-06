import { atom } from "jotai"

import { activePartyAtom } from "./characters"
import { activeScenarioEnemiesAtom } from "./enemies"

const allActiveGameEntitiesAtom = atom((get) => {
   const activeCharacters = get(activePartyAtom)
   const activeEnemies = get(activeScenarioEnemiesAtom)
   const allEntities = [...activeCharacters, ...activeEnemies]

   return allEntities
})

export { allActiveGameEntitiesAtom }
