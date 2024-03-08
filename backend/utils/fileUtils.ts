import * as dree from "dree"

import {
   characterConfigRoot,
   enemyConfigRoot,
   scenarioConfigRoot,
} from "../config/paths"

const cwd = process.cwd()

const getSubFolders = (root: string) => {
   const dir = dree.scan(`${cwd}/${root}`)
   return dir.children?.map((folder) => {
      return folder.name
   })
}

const getCharacterConfigFolders = () => {
   return getSubFolders(characterConfigRoot)
}

const getEnemyConfigFolders = () => {
   return getSubFolders(enemyConfigRoot)
}

const getScenarioConfigFolders = () => {
   return getSubFolders(scenarioConfigRoot)
}

export {
   getCharacterConfigFolders,
   getEnemyConfigFolders,
   getScenarioConfigFolders,
}
