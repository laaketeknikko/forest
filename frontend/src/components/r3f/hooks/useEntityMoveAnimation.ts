import { useRef } from "react"
import { ZPosition2D } from "../../../../../shared/types/types"
import { LineCurve, Vector2 } from "three"

const useEntityMoveAnimation = () => {
   const startEndRef = useRef<ZPosition2D[]>([])
   const pointsRef = useRef<Vector2[]>([])

   const setPoints = (start: ZPosition2D, end: ZPosition2D) => {
      if (pointsRef.current.length > 0) return

      startEndRef.current = [start, end]

      const points = new LineCurve(
         new Vector2(start.x, start.z),
         new Vector2(end.x, end.z)
      )
         .getSpacedPoints(4)
         .reverse()
      pointsRef.current = points
   }

   const getNextPoint = () => {
      return pointsRef.current.pop()
   }

   const isAnimating = () => {
      return pointsRef.current.length > 0
   }

   return {
      setPoints,
      getNextPoint,
      isAnimating,
   }
}

export { useEntityMoveAnimation }
