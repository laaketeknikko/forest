import { PrimitiveAtom } from "jotai"
import { ZCharacter } from "../../../shared/types/types"

enum DamageTypes {
   physical = "physical",
}

enum ActionTypes {
   offensive = "offensive",
   support = "support",
   defensive = "defensive",
   movement = "movement",
}

enum GlobalExecutionState {
   running = "running",
   paused = "paused",
   stopped = "stopped",
}

interface MainMenuNavigationState {
   showMainmenu: boolean
   gameConfigLoaded: boolean
   scenarioSelected: boolean
   charactersSelected: boolean
   scenarioStarted: boolean
}

interface GlobalScenarioStatus {
   won: boolean
   lost: boolean
}

interface GlobalDebriefingStatus {
   showDebriefing: boolean
}

export enum MainWindowDisplayStatus {
   showMainMenu = "showMainMenu",
   showGameScene = "showGameScene",
   showDebriefing = "showDebriefing",
}

interface GameExecutionState {
   /**
    * This is mainly used to determine whether to show menu or game scene.
    * */
   global: GlobalExecutionState

   actions: {
      /**
       * Set to true when user executes an effect from a card and the card has unexecuted effects remaining.
       * Set to false after performing the last effect on the active card.
       */
      isPerfomingAction: boolean
   }

   /**
    * Can be used to check whether an animation is ongoing.
    * This is used by R3FCanvasWrapper to pause the frame loop
    * when no animation is ongoing.
    */
   animations: {
      isAnimating: boolean
   }

   /**
    * Used for main menu navigation.
    */
   mainMenu: MainMenuNavigationState

   /**
    * Used locally during character selection.
    */
   characterSelection: Array<CharacterSelectionItem>

   /**
    * Used to check whether should move from scenario scene to after scenario scene.
    */
   scenario: GlobalScenarioStatus

   debriefing: GlobalDebriefingStatus

   mainDisplay: MainWindowDisplayStatus
}

interface CharacterSelectionItem {
   name: string
   spritePath: string
   characterAtom: PrimitiveAtom<ZCharacter>
}

export { DamageTypes, ActionTypes, GlobalExecutionState }
export type { GameExecutionState, CharacterSelectionItem }
