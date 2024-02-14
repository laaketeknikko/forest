import { useState, useEffect } from "react"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { GameScene } from "./components/MainWindow/GameScene"
import { gameExecutionStateAtom } from "./game/state/jotai/gameState"

import { useAtom } from "jotai"

import { GlobalExecutionState } from "./config/types"
import { useLoadGame } from "./game/hooks/useLoadGame"

function App() {
   const [showMainMenu, setShowMainMenu] = useState(true)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   // For use with loading save from url.
   const [urlKeyString, setUrlKeyString] = useState("")

   const loader = useLoadGame()

   // Load game if keyString in URL is different than keyString in state.
   useEffect(() => {
      const keyString = window.location.pathname.substring(1).trim()
      setUrlKeyString(keyString)

      const wrapperFunc = async () => {
         const saveData = await loader.updateSaveData(keyString)
         const result = loader.loadTheGame(saveData)
         if (result) {
            setShowMainMenu(false)
            setGameExecutionState({
               ...gameExecutionState,
               global: GlobalExecutionState.running,
            })
         }
      }

      if (keyString) {
         if (urlKeyString !== loader.getSaveData().keyString) {
            wrapperFunc()
         }
      }
   }, [gameExecutionState, loader, setGameExecutionState, urlKeyString])

   useEffect(() => {
      if (gameExecutionState.global === GlobalExecutionState.running) {
         setShowMainMenu(false)
      }
   }, [gameExecutionState.global])

   return (
      <>
         {gameExecutionState.global === GlobalExecutionState.running && (
            <GameScene />
         )}
         {showMainMenu && <MainMenu />}
      </>
   )
}

export { App }
