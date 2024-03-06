import {
   DoubleSide,
   Euler,
   FrontSide,
   MathUtils,
   Texture,
   Vector3,
} from "three"
import { useMemo } from "react"
import {
   getTextureNormalizedWidthAndHeight,
   getTextureYCenter,
} from "../../util/textureUtilities"
import { Instance, Instances } from "@react-three/drei"

export interface UseSmallArenaDecorationsProps {
   textures: Array<Texture>
   minDistance: number
   maxDistance: number
   amount: number

   /**
    * a random number between 0 and sizeVariance is added to baseSize.
    */
   sizeVariance: number
   baseSize: number

   /**center facing is special case and meant for large decorations.
    * It renders decorations in half circle.
    */
   facing: "horizontal" | "vertical" | "center"
}

/**
 * Takes an array of textures and returns an array of drei/<Instances>
 * containing <Instance>s.
 *
 * Instances are placed at [minDistance, maxDistance] from the center
 *  at a random angle in 360 degrees.
 *
 *
 */
const useSmallArenaDecorations = ({
   textures,
   minDistance,
   maxDistance,
   amount,
   sizeVariance,
   baseSize,
   facing,
}: UseSmallArenaDecorationsProps) => {
   const texturesInstances = useMemo(() => {
      const mainFacing = MathUtils.degToRad(
         facing === "horizontal" || facing === "center" ? 0 : -90
      )

      /**
       * Randomize the amount of each texture, then get percentage of total
       * amount of decorations.
       */
      const amounts: Array<number> = []
      let total = 0
      for (let i = 0; i < textures.length; i++) {
         const count = Math.random() * amount
         amounts.push(count)
         total += count
      }
      for (let i = 0; i < amounts.length; i++) {
         amounts[i] = Math.floor((amounts[i] / total) * amount)
      }

      /**Create the instances for each texture */
      return textures.map((texture, index) => {
         const size = getTextureNormalizedWidthAndHeight(
            texture,
            baseSize + Math.random() * sizeVariance
         )

         return (
            <Instances key={texture.uuid} limit={amounts[index]}>
               <planeGeometry args={[size.width, size.height]} />
               <meshBasicMaterial
                  map={texture}
                  transparent
                  color="white"
                  opacity={1}
                  toneMapped={false}
                  alphaTest={0.2}
                  /**Only need doublesided if looking sideways. */
                  side={
                     facing === "horizontal" || facing === "center"
                        ? DoubleSide
                        : FrontSide
                  }
               />

               {/**
                * Create instances for one texture.
                */}
               <group>
                  {Array(amounts[index])
                     .fill(0)
                     .map((_, amountIndex) => {
                        /**Randomize distance */
                        const distance =
                           Math.random() * (maxDistance - minDistance) +
                           minDistance

                        /**Positioning angle on the circle.
                         * If facing "center", position in half-circle from
                         * corner to corner.
                         */
                        const positionAngle =
                           facing === "center"
                              ? MathUtils.degToRad(225) +
                                Math.random() * Math.PI
                              : Math.random() * Math.PI * 2

                        const position = new Vector3(
                           distance * Math.cos(positionAngle),

                           facing === "vertical"
                              ? 0.01
                              : /**Position to ground level if facing horisontal */
                                getTextureYCenter(size.height),

                           distance * Math.sin(positionAngle)
                        )

                        /**Face to random rotation. */
                        const rotation = [
                           mainFacing,
                           facing === "horizontal" || facing === "center"
                              ? Math.random() * Math.PI * 2
                              : 0,
                           facing === "vertical"
                              ? Math.random() * Math.PI * 2
                              : 0,
                        ]

                        return (
                           <Instance
                              key={amountIndex}
                              scale={1}
                              position={position}
                              rotation={
                                 new Euler(
                                    rotation[0],
                                    rotation[1],
                                    rotation[2],
                                    "XYZ"
                                 )
                              }
                           />
                        )
                     })}
               </group>
            </Instances>
         )
      })
   }, [
      amount,
      baseSize,
      facing,
      maxDistance,
      minDistance,
      sizeVariance,
      textures,
   ])

   return texturesInstances
}

export { useSmallArenaDecorations }
