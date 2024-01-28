import { Atom, atom } from "jotai"
import { allPlayerCharactersAtom } from "./characters"
import { emptyActionCard, emptyActionCardAtom } from "../initialStates"

const turnOrderAtom = atom<Array<Atom<Character>>>((get) => {
   const characters = [...get(allPlayerCharactersAtom)]
   characters.sort((aAtom, bAtom) => {
      const a: Character = get(aAtom)
      const b: Character = get(bAtom)
      if (a.currentActionDelay < b.currentActionDelay) return -1
      else if (a === b) return 0
      else return 1
   })
   return characters
})

const currentlySelectedActionCardAtom = atom(atom({}))

export { turnOrderAtom, currentlySelectedActionCardAtom }
