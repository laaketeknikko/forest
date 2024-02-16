import { Atom } from "jotai"
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
   gameConfigLoaded: boolean
   scenarioSelected: boolean
   charactersSelected: boolean
   scenarioStarted: boolean
}

interface GameExecutionState {
   global: GlobalExecutionState
   actions: {
      isPerfomingAction: boolean
   }
   mainMenu: MainMenuNavigationState
   characterSelection: Array<CharacterSelectionItem>
}

interface CharacterSelectionItem {
   name: string
   spritePath: string
   characterAtom: Atom<ZCharacter>
}

export { DamageTypes, ActionTypes, GlobalExecutionState }
export type { GameExecutionState, CharacterSelectionItem }
