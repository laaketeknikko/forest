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
   ZSaveConfigScenarioConfig,
   ZScenarioConfig,
} from "../../../../../shared/types/types"

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
   /**
    * This is mainly used to determine whether to show menu or game scene.
    * */
   global: GlobalExecutionState.stopped,
   actions: {
      /**
       * Set to true when user executes an effect from a card and the card has unexecuted effects remaining.
       * Set to false after performing the last effect on the active card.
       */
      isPerfomingAction: false,
   },
   /**
    * Used for main menu navigation.
    */
   mainMenu: {
      gameConfigLoaded: false,
      scenarioSelected: false,
      charactersSelected: false,
      scenarioStarted: false,
   },
   /**
    * Used locally during character selection.
    */
   characterSelection: [],
})

/**
 * This is updated by useSaveGame and useLoadGame to hold the current save state.
 */
const activeSaveGameConfigAtom = atom<ZSaveConfig>({
   characters: [],
   enemies: [],
   scenario: {} as ZSaveConfigScenarioConfig,
   keyString: "",
   scenarioStatistics: [],
})

/**
 * The info displayed on character hover.
 */
const popupInfoAtom = atom<ZCharacter | null>(null)

/**
 * The effect user is currently executing.
 */
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
