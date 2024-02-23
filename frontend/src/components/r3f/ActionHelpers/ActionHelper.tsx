import { useAtom } from "jotai"
import {
   currentlySelectedActionCardAtom,
   gameExecutionStateAtom,
} from "../../../game/state/jotai/gameState"
import { activeCharacterAtom } from "../../../game/state/jotai/characters"
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
import { ZActionEffect } from "../../../../../shared/types/types"
import { ThreeEvent } from "@react-three/fiber"
import { MathUtils } from "three"

import { customTheme } from "../../../styles/mui/theme"
import { emptyActionCardAtom } from "../../../game/state/initialStates"
import { useScenarioVictoryConditions } from "../../../game/hooks/useScenarioVictoryConditions"

// TODO: When user deselects a card, the action is undefined
// but it's still possible to execute the effects. Fix.

/**
 * Provides visual and game logic helpers when performing actions and action effects.
 * - Displays a circle for effect ranges
 * - Takes care of executing actions in order
 *
 */
const ActionHelper = () => {
   const [selectedCard, setSelectedCard] = useAtom(
      currentlySelectedActionCardAtom
   )
   const [selectedCardData] = useAtom(selectedCard)
   const [activeCharacter] = useAtom(activeCharacterAtom)
   const [activeCharacterData] = useAtom(activeCharacter)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
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

   const actionTrackerRef = useRef<ActionEffectsTracker>()
   actionTrackerRef.current = useActionEffectsTracker()

   useEffect(() => {
      if (action && actionTrackerRef.current) {
         actionTrackerRef.current.setAction(action)
         setActiveEffect(actionTrackerRef.current.getNextUnexecutedEffect())
      }
   }, [action])

   const victoryConditions = useScenarioVictoryConditions()

   const onPerformEffect = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation()

      performEffect({
         selectedCharacterAtom: activeCharacter,
         activeEffect: activeEffect!,
         targetPoint: event.point,
      })

      victoryConditions.updateConditionStatuses()

      setGameExecutionState({
         ...gameExecutionState,
         actions: { ...gameExecutionState.actions, isPerfomingAction: true },
      })
      actionTrackerRef.current?.effectExecuted()

      if (!actionTrackerRef.current?.getNextUnexecutedEffect()) {
         performAction({
            activeCardAtom: selectedCard,
            // TODO: fix
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
      <group>
         {activeEffect && (
            <>
               <mesh
                  position={[
                     activeCharacterData.position?.x || 0,
                     0.1,
                     activeCharacterData.position?.z || 0,
                  ]}
                  rotation-x={MathUtils.degToRad(-90)}
                  onClick={onPerformEffect}
               >
                  <circleGeometry args={[activeEffect.range, 20]} />
                  <meshBasicMaterial
                     toneMapped={false}
                     color={helperColor}
                     transparent
                     opacity={0.5}
                     depthWrite={false}
                  />
               </mesh>
            </>
         )}
      </group>
   )
}

export { ActionHelper }
