import { useState, useEffect } from "react"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { GameScene } from "./components/GameScene/GameScene"
import { gameExecutionStateAtom } from "./game/state/jotai/gameState"

import { useAtom } from "jotai"

import { GlobalExecutionState, MainWindowDisplayStatus } from "./config/types"
import { useLoadGame } from "./game/hooks/useLoadGame"
import { Debriefing } from "./components/Debriefing/Debriefing"

function App() {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   /**
    * For use with loading save from url.
    */
   const [urlKeyString, setUrlKeyString] = useState("")

   const loader = useLoadGame()

   /**
    * Load game if keyString in URL is different than keyString in save state.
    *  */
   useEffect(() => {
      const keyString = window.location.pathname.substring(1).trim()
      setUrlKeyString(keyString)

      const wrapperFunc = async () => {
         const saveData = await loader.updateSaveData(keyString)
         const result = loader.loadTheGame(saveData)
         if (result) {
            setGameExecutionState({
               ...gameExecutionState,
               global: GlobalExecutionState.running,
               mainDisplay: MainWindowDisplayStatus.showGameScene,
            })
         }
      }

      if (keyString) {
         if (urlKeyString !== loader.getSaveData().keyString) {
            wrapperFunc()
         }
      }
   }, [gameExecutionState, loader, setGameExecutionState, urlKeyString])

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
