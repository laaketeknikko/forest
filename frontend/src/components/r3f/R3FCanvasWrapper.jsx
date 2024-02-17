import { useState } from "react"

import { Canvas, useFrame } from "@react-three/fiber"

import { useAtom } from "jotai"
import { Character } from "./Character/Character"
import { activePartyAtom } from "../../game/state/jotai/characters"
import { ActionHelper } from "./ActionHelpers/ActionHelper"
import { activeScenarioEnemiesAtom } from "../../game/state/jotai/enemies"

import { useIdleTimer } from "react-idle-timer"
import { CameraControls } from "./CameraControls"
import { ArenaBorderDecorations } from "./ArenaBorderDecorations"
import { InstancedGround } from "./Ground/InstancedGround"
import { currentlySelectedActionCardAtom } from "../../game/state/jotai/gameState"

const DisableRender = () => useFrame(() => null, 1000)

const R3FCanvasWrapper = () => {
   const [activePartyCharacters] = useAtom(activePartyAtom)
   const [activeEnemies] = useAtom(activeScenarioEnemiesAtom)
   const [pauseAnimation, setPauseAnimation] = useState(false)
   const [selectedCard] = useAtom(currentlySelectedActionCardAtom)
   const [selectedCardData] = useAtom(selectedCard)

   const onIdle = () => {
      setPauseAnimation(true)
   }

   const onAction = () => {
      setPauseAnimation(false)
   }

   useIdleTimer({
      onIdle: onIdle,
      onAction: onAction,
      timeout: 1000,
      event: [
         "keydown",
         //'wheel',
         //'DOMMouseScroll',
         //'mousewheel',
         "mousedown",
         "touchstart",
         "touchmove",
         "MSPointerDown",
         "MSPointerMove",
         "visibilitychange",
      ],
   })

   // TODO: Position camera based on arena size
   return (
      <Canvas
         camera={{ position: [1, 4, 5], fov: [50] }}
         style={{ backgroundColor: "rgb(31, 27, 22)" }}
         frameloop="demand"
      >
         {pauseAnimation && <DisableRender />}
         <CameraControls />

         <ambientLight args={["white", 1]} />
         {activePartyCharacters.length > 0 &&
            activePartyCharacters.map((character) => {
               return (
                  <Character
                     key={character.toString()}
                     characterAtom={character}
                  />
               )
            })}
         {activeEnemies.length > 0 &&
            activeEnemies.map((enemy) => {
               return (
                  <Character
                     key={enemy.toString()}
                     characterAtom={enemy}
                     maxDimension={2}
                  />
               )
            })}

         <InstancedGround />
         {selectedCardData.actions.length > 0 && <ActionHelper />}
         <ArenaBorderDecorations />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
