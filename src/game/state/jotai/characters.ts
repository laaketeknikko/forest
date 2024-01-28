import { atom } from "jotai"
import type { Atom } from "jotai"
import { turnOrderAtom } from "./gameState"

const emptyCharacterAtom = atom<Character>({
   name: "",
   spritePath: "",
   cards: [],
   selectedCardId: "",
   baseActionDelay: 0,
   currentActionDelay: 0,
})

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
