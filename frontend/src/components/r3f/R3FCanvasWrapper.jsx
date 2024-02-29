import { useState } from "react"

import { Canvas, useFrame } from "@react-three/fiber"

import { useAtom } from "jotai"
import { Character } from "./Character/Character"
import { selectedPartyAtom } from "../../game/state/jotai/characters"
import { ActionHelper } from "./ActionHelpers/ActionHelper"
import { selectedScenarioEnemiesAtom } from "../../game/state/jotai/enemies"

import { useIdleTimer } from "react-idle-timer"
import { CameraControls } from "./CameraControls"

import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { FullGround2 } from "./Ground/FullGround2"
import { theme } from "../../styles/mui/theme"
import { animationFocusAtom } from "../../game/state/jotai/gameState"
import { ArenaLeafDecorations } from "./Decorations/ArenaLeafDecorations"
import { ArenaShrubDecorations } from "./Decorations/ArenaShrubDecorations"
import { ArenaBorderRadiusDecorations } from "./Decorations/ArenaBorderRadiusDecorations"

const DisableRender = () => useFrame(() => null, 1000)

/**
 * Wrapper around the actual game scene.
 */
const R3FCanvasWrapper = () => {
   const [activePartyCharacters] = useAtom(selectedPartyAtom)
   const [activeEnemies] = useAtom(selectedScenarioEnemiesAtom)
   const [pauseAnimation, setPauseAnimation] = useState(false)
   const [selectedScenario] = useAtom(selectedScenarioConfigAtom)
   const [animationState] = useAtom(animationFocusAtom)

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
         frameloop={animationState.isAnimating ? "always" : "demand"}
         camera={{
            position: [0, 10, selectedScenario.arena.size.length],
            fov: [50],
         }}
         style={{ backgroundColor: theme.palette.background.paper }}
      >
         {pauseAnimation && <DisableRender />}
         <CameraControls />
         <axesHelper />
         <FullGround2 />
         <ActionHelper />
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
                     maxDimension={3}
                  />
               )
            })}

         <ArenaLeafDecorations
            amount={100}
            baseSize={0.2}
            minDistance={3}
            maxDistance={(selectedScenario.arena.size.width / 2) * 2}
            center={{
               x: selectedScenario.arena.size.width / 2,
               z: selectedScenario.arena.size.width / 2,
            }}
            sizeVariance={0.3}
         />

         <ArenaShrubDecorations
            amount={50}
            baseSize={0.5}
            minDistance={3}
            maxDistance={(selectedScenario.arena.size.width / 2) * 2}
            center={{
               x: selectedScenario.arena.size.width / 2,
               z: selectedScenario.arena.size.width / 2,
            }}
            sizeVariance={0.3}
         />

         <ArenaBorderRadiusDecorations />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
