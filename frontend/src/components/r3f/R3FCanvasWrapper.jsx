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

import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { FullGroundTile } from "./Ground/FullGroundTile"

const DisableRender = () => useFrame(() => null, 1000)

/**
 * Wrapper around the actual game scene.
 */
const R3FCanvasWrapper = () => {
   const [activePartyCharacters] = useAtom(activePartyAtom)
   const [activeEnemies] = useAtom(activeScenarioEnemiesAtom)
   const [pauseAnimation, setPauseAnimation] = useState(false)

   const [selectedScenario] = useAtom(selectedScenarioConfigAtom)

   /**
    * Because the game scene is static, we don't want the three.js render loop
    * running constantly. So we stop the animation after 1 second of inactivity.
    */
   const onIdle = () => {
      setPauseAnimation(true)
   }
   const onAction = () => {
      setPauseAnimation(false)
   }
   useIdleTimer({
      onIdle: onIdle,
      onAction: onAction,
      timeout: 3000,
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

   return (
      <Canvas
         camera={{
            position: [0, 10, selectedScenario.arena.size.length],
            fov: [50],
         }}
         style={{ backgroundColor: "rgb(31, 27, 22)" }}
      >
         {pauseAnimation && <DisableRender />}
         <CameraControls />

         <FullGroundTile />

         <ambientLight args={["white", 0.1]} />

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
                     maxDimension={3}
                  />
               )
            })}

         <ActionHelper />
         <ArenaBorderDecorations />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
