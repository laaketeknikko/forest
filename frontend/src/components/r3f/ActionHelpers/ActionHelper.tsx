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
import { MathUtils } from "three"

import { customTheme } from "../../../styles/mui/theme"
import { emptyActionCardAtom } from "../../../game/state/initialStates"

import { getEntitiesForPosition } from "../../../game/util/mapUtils"
import { AffectedPopupInfo } from "../../GameScene/PopupInfo.tsx/AffectedPopupInfo"
import { PrimitiveAtom } from "jotai/vanilla"

import { throttle } from "lodash"

// TODO: When user deselects a card, the action is undefined
// but it's still possible to execute the effects. Fix.

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

   const action = useMemo(
      () =>
         selectedCardData.actions.find(
            (action) => action._id === selectedCardData.nextActionId
         ),
      [selectedCardData.actions, selectedCardData.nextActionId]
   )

   const entitiesOnTileRef = useRef<ReturnType<
      typeof getEntitiesForPosition
   > | null>(null)

   const actionTrackerRef = useRef<ActionEffectsTracker>()
   actionTrackerRef.current = useActionEffectsTracker()

   useEffect(() => {
      if (action && actionTrackerRef.current) {
         actionTrackerRef.current.setAction(action)
         setActiveEffect(actionTrackerRef.current.getNextUnexecutedEffect())
      } else {
         setActiveEffect(undefined)
      }
   }, [action])

   const handlePerformEffect = (event: ThreeEvent<MouseEvent>) => {
      if (!actionTrackerRef.current) return

      event.stopPropagation()

      performEffect({
         selectedCharacterAtom: activeCharacter,
         activeEffect: activeEffect!,
         targetPoint: event.point,
      })

      setGameExecutionState({
         ...gameExecutionState,
         actions: { ...gameExecutionState.actions, isPerfomingAction: true },
      })
      actionTrackerRef.current.effectExecuted()

      /**
       * If there are no more effects to execute, perform whole-action updates.
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

   const handleHelperHover = (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation()

      entitiesOnTileRef.current = getEntitiesForPosition({
         x: event.point.x,
         z: event.point.z,
      })

      setPopupInfo(
         <AffectedPopupInfo
            entityAtoms={entitiesOnTileRef.current.map(
               (e) => e.entity as unknown as PrimitiveAtom<ZCharacter>
            )}
         />
      )
   }

   let helperColor

   if (activeEffect?.type === actionTypes.movement) {
      helperColor = customTheme.custom.colors.actionTypes.movement
   } else if (activeEffect?.type === actionTypes.support) {
      helperColor = customTheme.custom.colors.actionTypes.support
   } else if (activeEffect?.type === actionTypes.offensive) {
      helperColor = customTheme.custom.colors.actionTypes.offensive
   } else if (activeEffect?.type === actionTypes.defensive) {
      helperColor = customTheme.custom.colors.actionTypes.defensive
   }

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
                     color={helperColor}
                     transparent
                     opacity={0.2}
                     alphaTest={0.1}
                     depthTest={false}
                  />
               </mesh>
            </>
         )}
      </group>
   )
}

export { ActionHelper }
