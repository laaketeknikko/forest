import { Atom, atom } from "jotai"
import { allPlayerCharactersAtom } from "./characters"
import { emptyActionCard } from "../initialStates"

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

const currentlySelectedActionCardAtom = atom<Atom<ActionCard>>(
   atom<ActionCard>({ ...emptyActionCard })
)

export { turnOrderAtom, currentlySelectedActionCardAtom }
