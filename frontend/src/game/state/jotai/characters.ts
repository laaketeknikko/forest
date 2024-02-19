import { PrimitiveAtom, atom } from "jotai"
import { turnOrderAtom } from "./gameState"
import { emptyCharacterAtom } from "../initialStates"
import { ZCharacter } from "../../../../../shared/types/types"

const selectedCharacterAtom = atom(emptyCharacterAtom)

const activeCharacterAtom = atom((get) => {
   const turnorder = get(turnOrderAtom)
   if (turnorder.length === 0) return emptyCharacterAtom

   return turnorder[0]
})

const allPlayerCharactersAtom = atom<Array<PrimitiveAtom<ZCharacter>>>([])

const activePartyAtom = atom<Array<PrimitiveAtom<ZCharacter>>>([])

export {
   selectedCharacterAtom,
   emptyCharacterAtom,
   allPlayerCharactersAtom,
   activeCharacterAtom,
   activePartyAtom,
}
