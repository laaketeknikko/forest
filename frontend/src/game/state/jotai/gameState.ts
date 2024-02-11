import { Atom, atom } from "jotai"
import { activePartyAtom } from "./characters"
import { emptyActionCard } from "../initialStates"
import { activeScenarioEnemiesAtom } from "./enemies"
import { GameExecutionState } from "../../../config/types"
import {
   IActionCard,
   ICharacter,
   IEnemy,
   ISaveGameConfig,
   IScenarioConfig,
} from "../../../../../shared/types/types"

const turnOrderAtom = atom<Array<Atom<ICharacter>>>((get) => {
   const characters = [
      ...get(activePartyAtom),
      ...get(activeScenarioEnemiesAtom),
   ]
   characters.sort((aAtom, bAtom) => {
      const a: ICharacter = get(aAtom)
      const b: ICharacter = get(bAtom)
      if (a.currentActionDelay < b.currentActionDelay) return -1
      else if (a === b) return 0
      else return 1
   })
   return characters
})

const currentlySelectedActionCardAtom = atom<Atom<IActionCard>>(
   atom<IActionCard>({ ...emptyActionCard })
)

const defaultConfigsAtom = atom<{
   characters: Array<ICharacter>
   enemies: Array<IEnemy>
   scenarios: Array<IScenarioConfig>
}>({ characters: [], enemies: [], scenarios: [] })

const gameExecutionStateAtom = atom<GameExecutionState>(
   GameExecutionState.stopped
)

const activeSaveGameConfigAtom = atom<ISaveGameConfig>({
   characters: [],
   enemies: [],
   scenario: {} as IScenarioConfig,
   keyString: "",
})

export {
   turnOrderAtom,
   currentlySelectedActionCardAtom,
   defaultConfigsAtom,
   gameExecutionStateAtom,
   activeSaveGameConfigAtom,
}
