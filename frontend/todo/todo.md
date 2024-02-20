TODO: Implement a global notification / log display.

TODO: Add some sort of a progression or requirements for scenarios.

TODO: Make a way to win a scenario?
You would need victory conditions, checking conditions, like when enemy dies.
Something like:

-  make a hook, useScenarioWinCondition
-  in hook, useEffects reacts to changes in conditions
-  if condition is true, set flag to global game state
-  On scenario configs, define victory conditions, like:
   -  type: "enemy"
   -  name: "Miinii"
   -  state: "dead"
