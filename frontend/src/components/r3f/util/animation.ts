import { EllipseCurve, LineCurve, MathUtils, Vector2, Vector3 } from "three"
import { ZPosition2D } from "../../../../../shared/types/types"

const getPointsForJumpAnimation = (
   start: ZPosition2D,
   end: ZPosition2D,
   pointMultiplier: number = 3
) => {
   const line = new LineCurve(
      new Vector2(start.x, start.z),
      new Vector2(end.x, end.z)
   )
   const lineLength = line.getLength()
   const numberOfPoints = lineLength * pointMultiplier
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

   const points = linePoints.map((point, index) => {
      return new Vector3(point.x, ellipsePoints[index].y, point.y)
   })

   return points
}

export { getPointsForJumpAnimation }
