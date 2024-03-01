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
 * This atom contains the states of the currently selected party,
 * usually when inside a scenario.
 * This should not be modified until a scenario is complete.
 */
const selectedPartyAtom = atom<Array<PrimitiveAtom<ZCharacter>>>([])

/**
 * A derived atom holding characters from the selectedPartAtom
 * with health > 0.
 */
const activePartyAtom = atom<Array<PrimitiveAtom<ZCharacter>>>((get) => {
   const party = get(selectedPartyAtom)
   return party.filter((characterAtom) => get(characterAtom).health > 0)
})

/**
 * Derived from selectedPartyAtom. This atom contains the characters that have been defeated.
 */
const defeatedCharactersAtom = atom<Array<PrimitiveAtom<ZCharacter>>>((get) => {
   const party = get(selectedPartyAtom)
   return party.filter((characterAtom) => get(characterAtom).health <= 0)
})

export {
   emptyCharacterAtom,
   allPlayerCharactersAtom,
   activeCharacterAtomAtom,
   selectedPartyAtom,
   activePartyAtom,
   defeatedCharactersAtom,
}
