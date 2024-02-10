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
            setGameExecutionState(GameExecutionState.running)
         }
      }

      if (keyString) {
         console.log("keystring exists in useeffect:", keyString)
         if (urlKeyString !== loader.getSaveData().keyString) {
            console.log(
               "keystring does not match in useeffect, savedata:",
               loader.getSaveData()
            )
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
