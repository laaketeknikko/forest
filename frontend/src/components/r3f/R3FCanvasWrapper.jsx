import { useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useAtom } from "jotai"
import { ActionHelper } from "./ActionHelpers/ActionHelper"
import { useIdleTimer } from "react-idle-timer"
import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { FullGround2 } from "./Ground/FullGround2"
import { theme } from "../../styles/mui/theme"
import {
   animationFocusAtom,
   isCameraMovingAtom,
} from "../../game/state/jotai/gameState"
import { ArenaLeafDecorations } from "./Decorations/ArenaLeafDecorations"
import { ArenaShrubDecorations } from "./Decorations/ArenaShrubDecorations"
import { ArenaBorderRadiusDecorations } from "./Decorations/ArenaBorderRadiusDecorations"
import { InstancedGround } from "./Ground/DreiInstancedGround"
import { GroundGrid } from "./Ground/GroundGrid"
import { CustomMapController } from "./util/CustomMapController"
import { ActiveCharacters } from "./Character/ActiveCharacters"
import { ActiveEnemies } from "./Character/ActiveEnemies"
import { InitializeGlobaThreeState } from "./util/InitializeGlobalThreeState"

const DisableRender = () => useFrame(() => null, 1000)

/**
 * Wrapper around the actual game scene.
 *
 * Renders react three Canvas and all the major content
 * of the game scene:
 * - Ground
 * - Characters
 * - Decorations
 * - Helpers
 * - Map controls
 */
const R3FCanvasWrapper = () => {
   const [pauseAnimation, setPauseAnimation] = useState(false)
   const [selectedScenario] = useAtom(selectedScenarioConfigAtom)
   const [animationState] = useAtom(animationFocusAtom)
   const [isCameraMoving] = useAtom(isCameraMovingAtom)

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
      timeout: 1000,
      events: [
         "mousemove",
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
         frameloop={
            animationState.isAnimating || !pauseAnimation || isCameraMoving
               ? "always"
               : "demand"
         }
         camera={{
            position: [0, 10, selectedScenario.arena.size.length],
            fov: [50],
         }}
         style={{ backgroundColor: theme.palette.background.paper }}
         gl={{ localClippingEnabled: true } /**required for clippingPlanes */}
      >
         {pauseAnimation && !animationState.isAnimating && !isCameraMoving && (
            <DisableRender />
         )}

         <InitializeGlobaThreeState />

         <ActiveCharacters />
         <ActiveEnemies />

         <CustomMapController />

         <FullGround2 />
         <InstancedGround />
         <GroundGrid />

         <ArenaLeafDecorations
            amount={
               (selectedScenario.arena.size.width *
                  selectedScenario.arena.size.length) /
               3
            }
            baseSize={0.15}
            sizeVariance={0.4}
            minDistance={3}
            maxDistance={selectedScenario.arena.size.width * 2}
            center={{
               x: selectedScenario.arena.size.width / 2,
               z: selectedScenario.arena.size.width / 2,
            }}
         />

         <ArenaShrubDecorations
            amount={
               (selectedScenario.arena.size.width *
                  selectedScenario.arena.size.length) /
               4
            }
            baseSize={0.3}
            minDistance={3}
            maxDistance={selectedScenario.arena.size.width * 2}
            center={{
               x: selectedScenario.arena.size.width / 2,
               z: selectedScenario.arena.size.width / 2,
            }}
            sizeVariance={0.4}
         />

         <ArenaBorderRadiusDecorations />

         <ActionHelper />
         <ambientLight args={["white", 0.8]} />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
