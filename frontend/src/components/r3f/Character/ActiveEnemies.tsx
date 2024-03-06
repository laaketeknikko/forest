import { useAtom } from "jotai"

import { Character } from "./Character"
import { activeScenarioEnemiesAtom } from "../../../game/state/jotai/enemies"
import { memo } from "react"

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
