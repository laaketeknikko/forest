import { atom, PrimitiveAtom } from "jotai"
import { ZEnemy } from "../../../../../shared/types/types"

/**
 * Used to hold all enemy configs. These are references during scenario initialization.
 */
const allEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>([])

/**
 * List of active enemies. Used when inside a scenario.
 */
const selectedScenarioEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>([])

/**
 * List of enemies not defeated yet. Derived from selectedScenarioEnemiesAtom.
 */
const activeScenarioEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>((get) => {
   const enemies = get(selectedScenarioEnemiesAtom)

   const activeEnemies = enemies.filter(
      (enemyAtom) => get(enemyAtom).health > 0
   )

   console.log("active enemies in activeenemiesatom", activeEnemies)

   return activeEnemies
})

/**
 * List of defeated enemies. Derived from selectedScenarioEnemiesAtom.
 */
const defeatedScenarioEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>(
   (get) => {
      const enemies = get(selectedScenarioEnemiesAtom)
      const defeatedEnemies = enemies.filter(
         (enemyAtom) => get(enemyAtom).health <= 0
      )

      console.log("defeated enemies in defeatedeneiesatom", defeatedEnemies)

      return defeatedEnemies
   }
)

export {
   allEnemiesAtom,
   selectedScenarioEnemiesAtom,
   activeScenarioEnemiesAtom,
   defeatedScenarioEnemiesAtom,
}
