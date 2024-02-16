import { getDefaultStore } from "jotai"
import { allEnemiesAtom } from "../state/jotai/enemies"

const getEnemyByName = (name: string) => {
   const jotaiStore = getDefaultStore()

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

export { getEnemyByName }
