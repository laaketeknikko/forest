import { atom } from "jotai"
import type { Atom } from "jotai"
import { turnOrderAtom } from "./gameState"
import { emptyCharacterAtom } from "../initialStates"
import { ZCharacter } from "../../../../../shared/types/types"

const selectedCharacterAtom = /*<Atom<Character>>*/ atom(emptyCharacterAtom)

const activeCharacterAtom = atom<Atom<ZCharacter>>((get) => {
   const turnorder = get(turnOrderAtom)
   if (turnorder.length === 0) return emptyCharacterAtom

   return turnorder[0]
})

const allPlayerCharactersAtom = atom<Array<Atom<ZCharacter>>>([])

const activePartyAtom = atom<Array<Atom<ZCharacter>>>([])

export {
   selectedCharacterAtom,
   emptyCharacterAtom,
   allPlayerCharactersAtom,
   activeCharacterAtom,
   activePartyAtom,
}
