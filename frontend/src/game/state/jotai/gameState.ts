import { Atom, atom } from "jotai"
import { activePartyAtom } from "./characters"
import { emptyActionCard } from "../initialStates"
import { activeScenarioEnemiesAtom } from "./enemies"
import { GameExecutionState } from "../../../config/types"

const turnOrderAtom = atom<Array<Atom<Character>>>((get) => {
   const characters = [
      ...get(activePartyAtom),
      ...get(activeScenarioEnemiesAtom),
   ]
   characters.sort((aAtom, bAtom) => {
      const a: Character = get(aAtom)
      const b: Character = get(bAtom)
      if (a.currentActionDelay < b.currentActionDelay) return -1
      else if (a === b) return 0
      else return 1
   })
   return characters
})

const currentlySelectedActionCardAtom = atom<Atom<ActionCard>>(
   atom<ActionCard>({ ...emptyActionCard })
)

const defaultConfigsAtom = atom<{
   characters: Array<Character>
   enemies: Array<Enemy>
   scenarios: Array<ScenarioConfig>
}>({ characters: [], enemies: [], scenarios: [] })

const gameExecutionStateAtom = atom<GameExecutionState>(
   GameExecutionState.stopped
)

const activeSaveGameConfigAtom = atom<SaveGameConfig>({
   characters: [],
   enemies: [],
   scenario: {} as ScenarioConfig,
   keyString: "",
})

export {
   turnOrderAtom,
   currentlySelectedActionCardAtom,
   defaultConfigsAtom,
   gameExecutionStateAtom,
   activeSaveGameConfigAtom,
}
