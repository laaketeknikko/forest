import { Atom, atom } from "jotai"

import { activePartyAtom } from "./characters"
import { activeScenarioEnemiesAtom } from "./enemies"
import { ZGameEntity } from "../../../../../shared/types/types"

const allActiveGameEntitiesAtom = atom<Array<Atom<ZGameEntity>>>((get) => {
   const activeCharacters = get(activePartyAtom)
   const activeEnemies = get(activeScenarioEnemiesAtom)
   const allEntities = [...activeCharacters, ...activeEnemies]

   return allEntities
})

export { allActiveGameEntitiesAtom }
