import { EllipseCurve, LineCurve, MathUtils, Vector2, Vector3 } from "three"
import { ZPosition2D } from "../../../../../shared/types/types"

/**
 * Generate points for a point-to-point jump animation.
 * The points are returned in reverse order.
 *
 * @param pointMultiplier - affects the number of points to use for the animation.
 *    The number of points to use is pointMultiplier * distance.
 *    A greater number makes for a slower animation, as the points are consumed
 *    at a steady rate.
 *
 *  */
const getPointsForJumpAnimation = (
   start: ZPosition2D,
   end: ZPosition2D,
   pointMultiplier: number = 3
) => {
   /**
    * The animation arc is generated as follows.
    *
    * First take a line from start to end. This line is 2-dimensional.
    * x on the line represents global x coordinate, and y the global z coordinate.
    * This gives us the direction of the jump on the map.
    *
    * Next, generate a half circle with diameter equal to the line length.
    * Take the y coordinates from the ellipse, which represent the y coordinates
    * on the map.
    */

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
