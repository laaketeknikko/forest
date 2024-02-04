import { useState } from "react"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { GameScene } from "./components/MainWindow/GameScene"

function App() {
   const [showMainMenu, setShowMainMenu] = useState(true)

   return (
      <>
         {!showMainMenu && <GameScene />}
         {showMainMenu && <MainMenu />}
      </>
   )
}

export { App }
