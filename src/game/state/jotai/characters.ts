import { atom } from "jotai"
import type { Atom } from "jotai"

const emptyCharacterAtom = atom<Character>({
   name: "",
   spritePath: "",
   cards: [],
   selectedCardId: "",
   baseActionDelay: 0,
   currentActionDelay: 0,
})

const selectedCharacterAtom = atom<Atom<Character>>(emptyCharacterAtom)

const allPlayerCharactersAtom = atom([])

export { selectedCharacterAtom, emptyCharacterAtom, allPlayerCharactersAtom }
