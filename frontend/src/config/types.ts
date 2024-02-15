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

interface GameExecutionState {
   global: GlobalExecutionState
   actions: {
      isPerfomingAction: boolean
   }
}

export { DamageTypes, ActionTypes, GlobalExecutionState }
export type { GameExecutionState }
