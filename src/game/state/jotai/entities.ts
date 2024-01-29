import { atom } from "jotai"

import { allPlayerCharactersAtom } from "./characters"

const allGameEntitiesAtom = atom((get) => {
   const allEntities = get(allPlayerCharactersAtom)

   return allEntities
})

export { allGameEntitiesAtom }
