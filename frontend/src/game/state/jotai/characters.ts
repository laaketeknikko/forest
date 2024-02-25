import { PrimitiveAtom, atom } from "jotai"
import { turnOrderAtom } from "./gameState"
import { emptyCharacterAtom } from "../initialStates"
import { ZCharacter } from "../../../../../shared/types/types"

/**
 * This atom is used to determine the current character to act in turn order.
 */
const activeCharacterAtomAtom = atom((get) => {
   const turnorder = get(turnOrderAtom)
   if (turnorder.length === 0) return emptyCharacterAtom

   return turnorder[0]
})

/**
 * This atom contains the state of all the characters available to the player.
 * This is used when for example when selecting characters for a scenario.
 */
const allPlayerCharactersAtom = atom<Array<PrimitiveAtom<ZCharacter>>>([])

/**
 * This atom contains the states of the currently active party,
 * usually when inside a scenario.
 */
const activePartyAtom = atom<Array<PrimitiveAtom<ZCharacter>>>([])

export {
   emptyCharacterAtom,
   allPlayerCharactersAtom,
   activeCharacterAtomAtom,
   activePartyAtom,
}
