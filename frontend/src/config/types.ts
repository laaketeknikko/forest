enum DamageTypes {
   physical = "physical",
}

enum ActionTypes {
   offensive = "offensive",
   support = "support",
   defensive = "defensive",
   movement = "movement",
}

enum GameExecutionState {
   running = "running",
   paused = "paused",
   stopped = "stopped",
}

export { DamageTypes, ActionTypes, GameExecutionState }
