import { Atom, atom } from "jotai"
import { activePartyAtom } from "./characters"
import { emptyActionCard } from "../initialStates"
import { activeScenarioEnemiesAtom } from "./enemies"
import { GameExecutionState } from "../../../config/types"
import {
   ZActionCard,
   ZCharacter,
   ZEnemy,
   ZSaveConfig,
   ZScenarioConfig,
} from "../../../../../shared/types/types"

const turnOrderAtom = atom<Array<Atom<ZCharacter>>>((get) => {
   const characters = [
      ...get(activePartyAtom),
      ...get(activeScenarioEnemiesAtom),
   ]
   characters.sort((aAtom, bAtom) => {
      const a: ZCharacter = get(aAtom)
      const b: ZCharacter = get(bAtom)
      if (a.currentActionDelay < b.currentActionDelay) return -1
      else if (a === b) return 0
      else return 1
   })
   return characters
})

const currentlySelectedActionCardAtom = atom<Atom<ZActionCard>>(
   atom<ZActionCard>({ ...emptyActionCard })
)

const defaultConfigsAtom = atom<{
   characters: Array<ZCharacter>
   enemies: Array<ZEnemy>
   scenarios: Array<ZScenarioConfig>
}>({ characters: [], enemies: [], scenarios: [] })

const gameExecutionStateAtom = atom<GameExecutionState>(
   GameExecutionState.stopped
)

const activeSaveGameConfigAtom = atom<ZSaveConfig>({
   characters: [],
   enemies: [],
   scenario: {} as ZScenarioConfig,
   keyString: "",
})

const popupInfoAtom = atom<ZCharacter | null>(null)

export {
   turnOrderAtom,
   currentlySelectedActionCardAtom,
   defaultConfigsAtom,
   gameExecutionStateAtom,
   activeSaveGameConfigAtom,
   popupInfoAtom,
}
