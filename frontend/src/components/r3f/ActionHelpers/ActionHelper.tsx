import { useAtom } from "jotai"
import {
   currentlySelectedActionCardAtom,
   gameExecutionStateAtom,
} from "../../../game/state/jotai/gameState"
import { activeCharacterAtom } from "../../../game/state/jotai/characters"
import { useEffect, useMemo, useRef, useState } from "react"

import { MovementActionHelper } from "./MovementActionHelper"

import { actionTypes } from "../../../config/actions/actionTypes"

import { SupportActionHelper } from "./SupportActionHelper"
import {
   performAction,
   performEffect,
} from "../../../game/actions/performAction"
import {
   ActionEffectsTracker,
   useActionEffectsTracker,
} from "./useActionEffectsTracker"
import { ZActionEffect } from "../../../../../shared/types/types"

// TODO: Unify action helpers and refactor

// TODO: When user deselects a card, the action is undefined
// but it's still possible to execute the effects. Fix.

const ActionHelper = () => {
   const [selectedCard] = useAtom(currentlySelectedActionCardAtom)
   const [selectedCardData] = useAtom(selectedCard)
   const [activeCharacter] = useAtom(activeCharacterAtom)
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

   const onPerformEffect = (event) => {
      event.stopPropagation()

      performEffect({
         // TODO: Fix nevers
         selectedCharacterAtom: activeCharacter,
         activeEffect: activeEffect!,
         targetPoint: event.point,
      })

      setGameExecutionState({
         ...gameExecutionState,
         actions: { ...gameExecutionState.actions, isPerfomingAction: true },
      })
      actionTrackerRef.current?.effectExecuted()

      if (!actionTrackerRef.current?.getNextUnexecutedEffect()) {
         console.log("selected action", action)
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
         // TODO: Perform whole action updates
      } else {
         setActiveEffect(actionTrackerRef.current?.getNextUnexecutedEffect())
      }
   }

   return (
      <group>
         {activeEffect && (
            <>
               {activeEffect.type === actionTypes.movement && (
                  <MovementActionHelper
                     // NOTE: Fix assertion if check before is removed
                     actionEffect={activeEffect}
                     activeCharacterAtom={activeCharacter}
                     onClick={onPerformEffect}
                  />
               )}
               {activeEffect.type === actionTypes.offensive && (
                  <MovementActionHelper
                     // NOTE: Fix assertion if check before is removed
                     actionEffect={activeEffect}
                     activeCharacterAtom={activeCharacter}
                     onClick={onPerformEffect}
                  />
               )}
               {action?.effects[0].type === actionTypes.support && (
                  <SupportActionHelper
                     selectedCardAtom={selectedCard}
                     activeCharacterAtom={activeCharacter}
                  />
               )}
            </>
         )}
      </group>
   )
}

export { ActionHelper }
