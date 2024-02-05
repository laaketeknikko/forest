import { useState, useEffect } from "react"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { GameScene } from "./components/MainWindow/GameScene"
import { gameExecutionStateAtom } from "./game/state/jotai/gameState"

import { useAtom } from "jotai"

import { GameExecutionState } from "./config/types"

function App() {
   const [showMainMenu, setShowMainMenu] = useState(true)
   const [gameExecutionState] = useAtom(gameExecutionStateAtom)

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
