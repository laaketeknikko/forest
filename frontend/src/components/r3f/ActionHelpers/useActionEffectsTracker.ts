import { useRef } from "react"
import {
   ZActionCardAction,
   ZActionEffect,
} from "../../../../../shared/types/types"

interface TrackedEffect extends ZActionEffect {
   executed: boolean
}

export interface ActionEffectsTracker {
   setAction: (action: ZActionCardAction) => void
   getNextUnexecutedEffect: () => ZActionEffect | undefined
   effectExecuted: () => void
}

/**
 * Returns a tracker with three functions:
 * - setAction: sets the action to be tracked
 * - getNextUnexecutedEffect: returns the next effect in order to be executed
 * - effectExecuted: marks the effect returned by getNextUnexecutedEffect as executed
 *
 * Uses useRef() internally, so updates are applied in the same render cycle
 *
 */
const useActionEffectsTracker = (): ActionEffectsTracker => {
   const remainingEffectsRef = useRef<TrackedEffect[]>([])

   const setAction = (action: ZActionCardAction) => {
      remainingEffectsRef.current = action.effects.map((effect) => {
         return { ...effect, executed: false }
      })
   }

   const getNextUnexecutedEffect = (): ZActionEffect | undefined => {
      return remainingEffectsRef.current.find(
         (effect) => effect.executed === false
      )
   }

   const effectExecuted = () => {
      const index = remainingEffectsRef.current.findIndex(
         (effect) => effect.executed === false
      )
      if (index !== -1) {
         remainingEffectsRef.current[index].executed = true
      }
   }

   return {
      setAction,
      getNextUnexecutedEffect,
      effectExecuted,
   }
}

export { useActionEffectsTracker }
