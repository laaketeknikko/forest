import { atom } from "jotai"
import type { Atom } from "jotai"
import { turnOrderAtom } from "./gameState"
import { emptyCharacterAtom } from "../initialStates"

const selectedCharacterAtom = atom<Atom<Character>>(emptyCharacterAtom)

const activeCharacterAtom = atom<Atom<Character>>((get) => {
   const turnorder = get(turnOrderAtom)
   if (turnorder.length === 0) return emptyCharacterAtom

   return turnorder[0]
})

const allPlayerCharactersAtom = atom([])

export {
   selectedCharacterAtom,
   emptyCharacterAtom,
   allPlayerCharactersAtom,
   activeCharacterAtom,
}