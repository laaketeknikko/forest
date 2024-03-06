import { useRef } from "react"
import { ZPosition2D } from "../../../../../shared/types/types"
import { Vector3 } from "three"
import { getPointsForJumpAnimation } from "../util/animation"

/**
 * Used to manage the animation points through an animation.
 * 
 * Returns an object with the following functions:
 * - setMoveAnimation: sets a jump animation from start to end
 * - setMeleeAttackAnimation: sets a jump animation from start to target
   and from target to end. The latter jump is slower.
   - getNextPoint: returns the next point in the animation
   - isAnimating: returns true if there animation points remaining.

   Note: It might've been simpler to use lerping for animating.
   In future, something like https://github.com/pmndrs/maath
   might be worth considering. For this simple use case,
   this is good enough.
 */
const useEntityAnimation = () => {
   const pointsRef = useRef<Vector3[]>([])

   const setMoveAnimation = (start: ZPosition2D, end: ZPosition2D) => {
      if (pointsRef.current.length > 0) return

      pointsRef.current = getPointsForJumpAnimation(start, end, 3)
   }

   const setMeleeAttackAnimation = (
      start: ZPosition2D,
      end: ZPosition2D,
      target: ZPosition2D
   ) => {
      if (pointsRef.current.length > 0) return

      const attackPoints = getPointsForJumpAnimation(start, target, 3)
      const reboundPoints = getPointsForJumpAnimation(target, end, 9)

      pointsRef.current = [...reboundPoints, ...attackPoints]
   }

   const getNextPoint = () => {
      return pointsRef.current.pop()
   }

   const isAnimating = () => {
      return pointsRef.current.length > 0
   }

   return {
      setMoveAnimation,
      setMeleeAttackAnimation,
      getNextPoint,
      isAnimating,
   }
}

export { useEntityAnimation }
