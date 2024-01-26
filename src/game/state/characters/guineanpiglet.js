import { atom } from "jotai"

const guineanPigletActionCardsAtom = atom([])
const guineanPigletCharacterAtom = atom({ cards: [] })

const selectedCharacterAtom = atom({})
const allPlayerCharactersAtom = atom([])

export {
   guineanPigletCharacterAtom,
   guineanPigletActionCardsAtom,
   selectedCharacterAtom,
   allPlayerCharactersAtom,
}
