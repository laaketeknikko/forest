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

TODO: Making a save game needs to be rethought.
At the moment the character, enemy and scenario data in the save game
is simply overwritten. This won't do if there ever are characters
that are not in the scenario but are in the selection.
Saving scenario goals in the save also doesn't work with this model.

TODO: Update save data when scenario is started.

TODO: implement a victory screen on scenario over.

TODO: Look into using jotai selectAtom.

TODO: Debug scenario progression.

TODO: Implement some frontend tests.

TODO: Have characters face the active character.
