import { useRef } from "react"
import { ZPosition2D } from "../../../../../shared/types/types"
import { Vector3 } from "three"
import { getPointsForJumpAnimation } from "../util/animation"

const useEntityAnimation = () => {
   const startEndRef = useRef<ZPosition2D[]>([])
   const pointsRef = useRef<Vector3[]>([])

   const setMoveAnimation = (start: ZPosition2D, end: ZPosition2D) => {
      if (pointsRef.current.length > 0) return

      startEndRef.current = [start, end]
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
