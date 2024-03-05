import { PrimitiveAtom, atom } from "jotai"
import { activePartyAtom } from "./characters"
import { emptyActionCard, emptyScenarioSaveConfig } from "../initialStates"
import { activeScenarioEnemiesAtom } from "./enemies"
import {
   GameExecutionState,
   GlobalExecutionState,
   InGameOptions,
   MainWindowDisplayStatus,
} from "../../../config/types"
import {
   ZActionCard,
   ZActionEffect,
   ZDynamicGameEntity,
   ZSaveConfig,
   ZSaveConfigCharacter,
   ZSaveConfigEnemy,
   ZScenarioConfig,
} from "../../../../../shared/types/types"
import { ReactNode } from "react"
import { focusAtom } from "jotai-optics"

/**
 * Calculates the turn order from all active game entities.
 *
 * This list only includes entities that take turns.
 */
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

/**
 * The action card currently selected by the player.
 */
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

   animations: {
      isAnimating: false,
   },

   mainMenu: {
      showMainmenu: true,
      gameConfigLoaded: false,
      scenarioSelected: false,
      charactersSelected: false,
      scenarioStarted: false,
   },

   scenario: {
      won: false,
      lost: false,
      resultRecorded: false,
   },
   debriefing: {
      showDebriefing: false,
   },
   mainDisplay: MainWindowDisplayStatus.showMainMenu,
})

const animationFocusAtom = focusAtom(gameExecutionStateAtom, (optic) =>
   optic.prop("animations")
)

/**
 * This is updated by useSaveGame and useLoadGame to hold the current save state.
 */
const activeSaveGameConfigAtom = atom<ZSaveConfig>({
   characters: [],
   enemies: [],
   scenario: emptyScenarioSaveConfig,
   keyString: "empty",
   isScenarioInProgress: false,
   scenarioStatistics: [],
})

/**
 * The info displayed on character hover.
 */
const popupInfoAtom = atom<ReactNode | null>(null)

/**
 * The effect user is currently executing.
 */
const activeEffectAtom = atom<ZActionEffect | null>(null)

const inGameOptionsAtom = atom<InGameOptions>({
   graphics: {
      showBorderDecorations: true,
      showBrushes: true,
      showFoliage: true,
      showArenaImage: true,
   },
})

export {
   turnOrderAtom,
   currentlySelectedActionCardAtom,
   defaultConfigsAtom,
   gameExecutionStateAtom,
   activeSaveGameConfigAtom,
   popupInfoAtom,
   activeEffectAtom,
   animationFocusAtom,
   inGameOptionsAtom,
}
