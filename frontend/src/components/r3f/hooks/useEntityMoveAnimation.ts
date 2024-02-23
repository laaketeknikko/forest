import { useRef } from "react"
import { ZPosition2D } from "../../../../../shared/types/types"
import { EllipseCurve, LineCurve, MathUtils, Vector2, Vector3 } from "three"

const useEntityMoveAnimation = () => {
   const startEndRef = useRef<ZPosition2D[]>([])
   const pointsRef = useRef<Vector3[]>([])

   const setPoints = (start: ZPosition2D, end: ZPosition2D) => {
      if (pointsRef.current.length > 0) return

      startEndRef.current = [start, end]

      const line = new LineCurve(
         new Vector2(start.x, start.z),
         new Vector2(end.x, end.z)
      )
      const lineLength = line.getLength()
      const numberOfPoints = lineLength * 3
      const linePoints = line.getSpacedPoints(numberOfPoints).reverse()

      const ellipsePoints = new EllipseCurve(
         0,
         0,
         line.getLength() / 2,
         line.getLength() / 2,
         MathUtils.degToRad(180),
         MathUtils.degToRad(0),
         true
      )
         .getSpacedPoints(numberOfPoints)
         .reverse()

      pointsRef.current = linePoints.map((point, index) => {
         return new Vector3(point.x, ellipsePoints[index].y, point.y)
      })

      console.log("pointsRef.current:", pointsRef.current)
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
