import { atom } from "jotai"

const guineanPigletActionCardsAtom = atom([])
const guineanPigletCharacterAtom = atom({ cards: [] })

const allPlayerCharactersAtom = atom([])

export {
   guineanPigletCharacterAtom,
   guineanPigletActionCardsAtom,
   allPlayerCharactersAtom,
}
