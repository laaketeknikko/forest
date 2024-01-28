import { atom } from "jotai"
import type { Atom } from "jotai"

const emptyCharacterAtom = atom<Character>({
   name: "",
   spritePath: "",
   cards: [],
   selectedCardId: "",
   actionSpeed: 0,
})

const selectedCharacterAtom = atom<Atom<Character>>(emptyCharacterAtom)

export { selectedCharacterAtom, emptyCharacterAtom }
