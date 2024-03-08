import { useAtom } from "jotai"

import { Character } from "./Character"
import { activeScenarioEnemiesAtom } from "../../../game/state/jotai/enemies"
import { memo } from "react"

/**
 * Renders a Character component for each enemy in
 * activeScenarioEnemiesAtom.
 *
 * Used during the scenarios.
 */
const ActiveEnemies = () => {
   const [activeEnemies] = useAtom(activeScenarioEnemiesAtom)

   return (
      <>
         {activeEnemies.length > 0 &&
            activeEnemies.map((enemy) => {
               return (
                  <Character
                     key={enemy.toString()}
                     characterAtom={enemy}
                     maxDimension={3}
                  />
               )
            })}
      </>
   )
}

const MemoedEnemies = memo(ActiveEnemies)

export { MemoedEnemies as ActiveEnemies }
