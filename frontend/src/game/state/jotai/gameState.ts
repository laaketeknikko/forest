import { PrimitiveAtom, atom } from "jotai"
import { activePartyAtom } from "./characters"
import { emptyActionCard } from "../initialStates"
import { activeScenarioEnemiesAtom } from "./enemies"
import { GameExecutionState, GlobalExecutionState } from "../../../config/types"
import {
   ZActionCard,
   ZActionEffect,
   ZCharacter,
   ZDynamicGameEntity,
   ZSaveConfig,
   ZSaveConfigCharacter,
   ZSaveConfigEnemy,
   ZScenarioConfig,
} from "../../../../../shared/types/types"

const turnOrderAtom = atom<Array<PrimitiveAtom<ZDynamicGameEntity>>>((get) => {
   const dynamicEntities = [
      ...get(activePartyAtom),
      ...get(activeScenarioEnemiesAtom),
   ]
   dynamicEntities.sort((aAtom, bAtom) => {
      const a: ZDynamicGameEntity = get(aAtom)
      const b: ZDynamicGameEntity = get(bAtom)
      if (a.currentActionDelay < b.currentActionDelay) return -1
      else if (a.currentActionDelay === b.currentActionDelay) return 0
      else return 1
   })
   return dynamicEntities
})

const currentlySelectedActionCardAtom = atom<PrimitiveAtom<ZActionCard>>(
   atom<ZActionCard>({ ...emptyActionCard })
)

const defaultConfigsAtom = atom<{
   characters: Array<ZSaveConfigCharacter>
   enemies: Array<ZSaveConfigEnemy>
   scenarios: Array<ZScenarioConfig>
}>({ characters: [], enemies: [], scenarios: [] })

const gameExecutionStateAtom = atom<GameExecutionState>({
   global: GlobalExecutionState.stopped,
   actions: {
      isPerfomingAction: false,
   },
   mainMenu: {
      gameConfigLoaded: false,
      scenarioSelected: false,
      charactersSelected: false,
      scenarioStarted: false,
   },
   characterSelection: [],
})

const activeSaveGameConfigAtom = atom<ZSaveConfig>({
   characters: [],
   enemies: [],
   scenario: {} as ZScenarioConfig,
   keyString: "",
})

const popupInfoAtom = atom<ZCharacter | null>(null)

const activeEffectAtom = atom<ZActionEffect | null>(null)

export {
   turnOrderAtom,
   currentlySelectedActionCardAtom,
   defaultConfigsAtom,
   gameExecutionStateAtom,
   activeSaveGameConfigAtom,
   popupInfoAtom,
   activeEffectAtom,
}
