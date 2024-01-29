import { atom } from "jotai"

import { allPlayerCharactersAtom } from "./characters"
import { allEnemiesAtom } from "./enemies"

const allGameEntitiesAtom = atom((get) => {
   const allCharacters = get(allPlayerCharactersAtom)
   const allEnemies = get(allEnemiesAtom)
   const allEntities = [...allCharacters, ...allEnemies]

   return allEntities
})

export { allGameEntitiesAtom }
