import { useAtom, useSetAtom } from "jotai"
import {
   currentlySelectedActionCardAtom,
   gameExecutionStateAtom,
   popupInfoAtom,
} from "../../../game/state/jotai/gameState"
import { activeCharacterAtomAtom } from "../../../game/state/jotai/characters"
import { useEffect, useMemo, useRef, useState } from "react"

import { actionTypes } from "../../../config/actions/actionTypes"

import {
   performAction,
   performEffect,
} from "../../../game/actions/performAction"
import {
   ActionEffectsTracker,
   useActionEffectsTracker,
} from "./useActionEffectsTracker"
import { ZActionEffect, ZCharacter } from "../../../../../shared/types/types"
import { ThreeEvent } from "@react-three/fiber"
import { MathUtils, Plane, Vector3 } from "three"

import { customTheme } from "../../../styles/mui/theme"
import { emptyActionCardAtom } from "../../../game/state/initialStates"

import {
   getEntitiesForPosition,
   isInsideArena,
} from "../../../game/util/mapUtils"
import { AffectedPopupInfo } from "../../GameScene/PopupInfo.tsx/AffectedPopupInfo"
import { PrimitiveAtom } from "jotai/vanilla"

import { throttle } from "lodash"
import { useGetEntitiesForPosition } from "../../../game/hooks/useGetEntitiesForPosition"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { getDefaultJotaiStore } from "../../../game/state/jotai/store"

/**
 * Provides visual and game logic helpers when performing actions and action effects.
 * - Displays a circle for effect ranges
 * - Takes care of executing actions in order
 * - Displays a popup with the affected entities
 *
 */
const ActionHelper = () => {
   const [selectedCard, setSelectedCard] = useAtom(
      currentlySelectedActionCardAtom
   )
   const [selectedCardData] = useAtom(selectedCard)
   const [activeCharacter] = useAtom(activeCharacterAtomAtom)
   const [activeCharacterData] = useAtom(activeCharacter)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const setPopupInfo = useSetAtom(popupInfoAtom)
   const [activeEffect, setActiveEffect] = useState<ZActionEffect | undefined>(
      undefined
   )
   const [scenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const action = useMemo(
      () =>
         selectedCardData.actions.find(
            (action) => action._id === selectedCardData.nextActionId
         ),
      [selectedCardData.actions, selectedCardData.nextActionId]
   )

   /** Used to show a popup of entities on targeted tile. */
   const tileEntities = useGetEntitiesForPosition()
   const entitiesOnTileRef = useRef<ReturnType<
      typeof getEntitiesForPosition
   > | null>(null)

   /** Used to keep track of when all effects of an action have been executed */
   const actionTrackerRef = useRef<ActionEffectsTracker>()
   actionTrackerRef.current = useActionEffectsTracker()

   /** Set effect to be used by the helper. */
   useEffect(() => {
      if (action && actionTrackerRef.current) {
         actionTrackerRef.current.setAction(action)
         setActiveEffect(actionTrackerRef.current.getNextUnexecutedEffect())
      } else {
         setActiveEffect(undefined)
      }
   }, [action])

   /** Called when user executes an effect.
    *
    * Handles the logic of a single effect. After final effect,
    * handles the whole-action updates.
    */
   const handlePerformEffect = (event: ThreeEvent<MouseEvent>) => {
      console.log("clicking", event.point)
      const jotaiStore = getDefaultJotaiStore()
      console.log("jotai store in app", jotaiStore)

      if (!actionTrackerRef.current) return
      if (!isInsideArena({ x: event.point.x, z: event.point.z })) return

      event.stopPropagation()

      performEffect({
         selectedCharacterAtom: activeCharacter,
         activeEffect: activeEffect!,
         targetPoint: event.point,
      })

      if (!gameExecutionState.actions.isPerfomingAction) {
         setGameExecutionState({
            ...gameExecutionState,
            actions: { ...gameExecutionState.actions, isPerfomingAction: true },
         })
      }

      actionTrackerRef.current.effectExecuted()

      setPopupInfo(null)

      /**
       * If there are no more effects to execute, perform whole-action updates.
       * Otherwise update effect to be executed.
       */
      if (!actionTrackerRef.current.getNextUnexecutedEffect()) {
         performAction({
            activeCardAtom: selectedCard,
            /**
             * It's not possible to get here without an action.
             */
            selectedAction: action!,
            selectedCharacterAtom: activeCharacter,
         })

         setGameExecutionState({
            ...gameExecutionState,
            actions: {
               ...gameExecutionState.actions,
               isPerfomingAction: false,
            },
         })

         setSelectedCard(emptyActionCardAtom)
      } else {
         setActiveEffect(actionTrackerRef.current?.getNextUnexecutedEffect())
      }
   }

   /** Used to show a popup of entities on targeted tile.
    * Triggered when hovering over the circular helper.
    */
   const handleHelperHover = (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation()

      entitiesOnTileRef.current = tileEntities.getEntities({
         x: event.point.x,
         z: event.point.z,
      })

      if (!entitiesOnTileRef.current || entitiesOnTileRef.current.length === 0)
         return

      setPopupInfo(
         <AffectedPopupInfo
            entityAtoms={entitiesOnTileRef.current.map(
               (e) => e.entity as unknown as PrimitiveAtom<ZCharacter>
            )}
         />
      )
   }

   /** These are used to clip the helper circle inside
    * the arena borders.
    *
    * This is only a visual effect.
    */
   const clippingPlanes = useMemo(() => {
      const plane1 = new Plane(new Vector3(1, 0, 0), 0)

      const plane2 = new Plane(new Vector3(0, 0, 1), 0)

      const plane3 = new Plane(
         new Vector3(-1, 0, 0),
         scenarioConfig.arena.size.width
      )

      const plane4 = new Plane(
         new Vector3(0, 0, -1),
         scenarioConfig.arena.size.length
      )

      return [plane1, plane2, plane3, plane4]
   }, [scenarioConfig.arena.size.length, scenarioConfig.arena.size.width])

   return (
      <group
         position={[
            activeCharacterData.position?.x || 0,
            0.05,
            activeCharacterData.position?.z || 0,
         ]}
      >
         {activeEffect && (
            <>
               <mesh
                  renderOrder={1}
                  rotation-x={MathUtils.degToRad(-90)}
                  onClick={handlePerformEffect}
                  onPointerMove={throttle(handleHelperHover, 200)}
                  onPointerLeave={() => setPopupInfo(null)}
               >
                  <circleGeometry
                     args={[activeEffect.range ? activeEffect.range : 0.5, 30]}
                  />
                  <meshBasicMaterial
                     toneMapped={false}
                     color={
                        activeEffect.type === actionTypes.movement
                           ? customTheme.custom.colors.actionTypes.movement
                           : customTheme.custom.colors.actionTypes.offensive
                     }
                     transparent
                     opacity={0.2}
                     alphaTest={0.1}
                     depthTest={false}
                     clippingPlanes={clippingPlanes}
                  />
               </mesh>
            </>
         )}
      </group>
   )
}

export { ActionHelper }
