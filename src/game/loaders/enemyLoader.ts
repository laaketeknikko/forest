import clone from "clone"
import { enemyConfigRoot } from "../../config/paths"
import { getNextId } from "../util/idGenerator"

const enemyLoader = async (enemyConfigFolder) => {
   const enemyConfig = (
      await import(`${enemyConfigRoot}/${enemyConfigFolder}/enemyconfig`)
   ).enemyConfig

   const enemy = clone(enemyConfig)

   enemy.id = getNextId()

   console.log("in enemyLoader, enemyConfig: ", enemyConfig)
   console.log("in enemyLoader, enemy", enemy)

   return enemy
}

export { enemyLoader }
