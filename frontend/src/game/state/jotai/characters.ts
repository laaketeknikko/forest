import { atom } from "jotai"
import type { Atom } from "jotai"
import { turnOrderAtom } from "./gameState"
import { emptyCharacterAtom } from "../initialStates"
import { ICharacter } from "../../../../../shared/types/types"

const selectedCharacterAtom = /*<Atom<Character>>*/ atom(emptyCharacterAtom)

const activeCharacterAtom = atom<Atom<ICharacter>>((get) => {
   const turnorder = get(turnOrderAtom)
   if (turnorder.length === 0) return emptyCharacterAtom

   return turnorder[0]
})

const allPlayerCharactersAtom = atom<Array<Atom<ICharacter>>>([])

const activePartyAtom = atom<Array<Atom<ICharacter>>>([])

export {
   selectedCharacterAtom,
   emptyCharacterAtom,
   allPlayerCharactersAtom,
   activeCharacterAtom,
   activePartyAtom,
}
