import { characterConfigFolders, enemyConfigFolders } from "../../config/paths"

const getCharacterConfigFolders = () => {
   return characterConfigFolders
}

const getEnemyConfigFolders = () => {
   console.log("getEnemyConfigFolders, ", enemyConfigFolders)
   return enemyConfigFolders
}

export { getCharacterConfigFolders, getEnemyConfigFolders }
