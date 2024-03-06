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

/**
 * These states are used when navigating the main menu
 * to control access to the next screen.
 */
interface MainMenuNavigationState {
   /** Whether main menu should be shown. */
   showMainmenu: boolean

   /** Set to true when configs for scenarios and characters has been loaded. */
   gameConfigLoaded: boolean

   /** Set to true when scenario has been selected. */
   scenarioSelected: boolean

   /** Set to true when user has a valid party selection. */
   charactersSelected: boolean

   /** Set to true when user confirms scenario start. */
   scenarioStarted: boolean
}

/**
 * Used to determine when to end the game scene
 * and record the scenario result.
 */
interface GlobalScenarioStatus {
   won: boolean
   lost: boolean
   resultRecorded: boolean
}

interface GlobalDebriefingStatus {
   showDebriefing: boolean
}

/**
 * Used in MainWindow to determine which of the three major
 * components to show.
 */
export enum MainWindowDisplayStatus {
   showMainMenu = "showMainMenu",
   showGameScene = "showGameScene",
   showDebriefing = "showDebriefing",
}

/**
 * Holds various states related to the game execution.
 */
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

export interface InGameOptions {
   graphics: {
      showBorderDecorations: boolean
      showBrushes: boolean
      showFoliage: boolean
      showArenaImage: boolean
   }
}

export { DamageTypes, ActionTypes, GlobalExecutionState }
export type { GameExecutionState, CharacterSelectionItem }
