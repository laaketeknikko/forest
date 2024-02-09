import { useState, useEffect } from "react"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { GameScene } from "./components/MainWindow/GameScene"
import { gameExecutionStateAtom } from "./game/state/jotai/gameState"

import { useAtom } from "jotai"

import { GameExecutionState } from "./config/types"
import { useLoadGame } from "./game/hooks/useLoadGame"

function App() {
   const [showMainMenu, setShowMainMenu] = useState(true)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   // For use with loading save from url.
   const [urlKeyString] = useState(window.location.pathname)

   const loader = useLoadGame()

   // Load game if keyString in URL is different than keyString in state.
   // Should always be the case, of course.
   useEffect(() => {
      const wrapperFunc = async () => {
         const saveData = await loader.updateSaveData(
            urlKeyString.trim().substring(1)
         )
         const result = loader.loadTheGame(saveData)
         if (result) {
            setShowMainMenu(false)
            setGameExecutionState(GameExecutionState.running)
         }
      }

      if (urlKeyString) {
         const keyString = urlKeyString.trim().substring(1)
         if (keyString !== loader.getSaveData().keyString) {
            wrapperFunc()
         }
      }
   }, [loader, setGameExecutionState, urlKeyString])

   useEffect(() => {
      if (gameExecutionState === GameExecutionState.running) {
         setShowMainMenu(false)
      }
   }, [gameExecutionState])

   return (
      <>
         {gameExecutionState === GameExecutionState.running && <GameScene />}
         {showMainMenu && <MainMenu />}
      </>
   )
}

export { App }
