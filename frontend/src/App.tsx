import { MainMenu } from "./components/MainMenu/MainMenu"

import { GameScene } from "./components/GameScene/GameScene"
import { gameExecutionStateAtom } from "./game/state/jotai/gameState"

import { useAtom } from "jotai"

import { MainWindowDisplayStatus } from "./config/types"

import { Debriefing } from "./components/Debriefing/Debriefing"

function App() {
   const [gameExecutionState] = useAtom(gameExecutionStateAtom)

   return (
      <>
         {gameExecutionState.mainDisplay ===
            MainWindowDisplayStatus.showGameScene && <GameScene />}
         {gameExecutionState.mainDisplay ===
            MainWindowDisplayStatus.showMainMenu && <MainMenu />}
         {gameExecutionState.mainDisplay ===
            MainWindowDisplayStatus.showDebriefing && <Debriefing />}
      </>
   )
}

export { App }
