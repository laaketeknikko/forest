import { useState } from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { Ground } from "./Ground/Ground"

import { useAtom } from "jotai"
import { Character } from "./Character"
import { activePartyAtom } from "../../game/state/jotai/characters"
import { ActionHelper } from "./ActionHelpers/ActionHelper"
import { activeScenarioEnemiesAtom } from "../../game/state/jotai/enemies"

import { useIdleTimer } from "react-idle-timer"

const DisableRender = () => useFrame(() => null, 1000)

const R3FCanvasWrapper = () => {
   const [activePartyCharacters] = useAtom(activePartyAtom)
   const [activeEnemies] = useAtom(activeScenarioEnemiesAtom)
   const [pauseAnimation, setPauseAnimation] = useState(false)

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

   return (
      <Canvas
         camera={{ position: [1, 4, 5] }}
         style={{ backgroundColor: "rgb(31, 27, 22)" }}
      >
         {pauseAnimation && <DisableRender />}
         <axesHelper />
         <OrbitControls />
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

         <Ground />
         <ActionHelper />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
