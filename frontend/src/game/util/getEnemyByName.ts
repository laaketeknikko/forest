import { allEnemiesAtom } from "../state/jotai/enemies"
import { getDefaultJotaiStore } from "../state/jotai/store"

/**
 * Returns the default config of an enemy with the given name.
 */
const getEnemyConfigByEnemyName = (name: string) => {
   const jotaiStore = getDefaultJotaiStore()

   const allEnemies = jotaiStore.get(allEnemiesAtom)

   const enemyAtom = allEnemies.find((enemyAtom) => {
      const enemyData = jotaiStore.get(enemyAtom)
      return enemyData.name.toLowerCase() === name.toLowerCase()
   })

   if (!enemyAtom) {
      return null
   } else {
      return {
         enemyAtom: enemyAtom,
         enemyData: jotaiStore.get(enemyAtom),
      }
   }
}

export { getEnemyConfigByEnemyName }
