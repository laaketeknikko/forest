import { useState } from "react"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { useInitializeGameState } from "./game/hooks/useInitializeGameState"
import { GameScene } from "./components/MainWindow/GameScene"

function App() {
   const [showMainMenu, setShowMainMenu] = useState(false)

   useInitializeGameState()

   return (
      <>
         {!showMainMenu && <GameScene />}
         {showMainMenu && <MainMenu />}
      </>
   )
}

export { App }
