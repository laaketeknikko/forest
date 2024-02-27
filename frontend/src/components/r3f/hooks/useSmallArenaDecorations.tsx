import { DoubleSide, FrontSide, MathUtils, Texture } from "three"
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
   sizeVariance: number
   baseSize: number
   facing: "horizontal" | "vertical"
}

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
      const facingAngle = MathUtils.degToRad(facing === "horizontal" ? 0 : -90)

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
                  alphaTest={0.5}
                  side={facing === "horizontal" ? DoubleSide : FrontSide}
               />
               <group>
                  {Array(amounts[index])
                     .fill(0)
                     .map((_, amountIndex) => {
                        const distance =
                           Math.random() * (maxDistance - minDistance) +
                           minDistance
                        const angle = Math.random() * Math.PI * 2

                        return (
                           <Instance
                              key={amountIndex}
                              scale={1}
                              position={[
                                 distance * Math.cos(angle),
                                 facing === "vertical"
                                    ? 0.01
                                    : getTextureYCenter(size.height),
                                 distance * Math.sin(angle),
                              ]}
                              rotation-x={facingAngle}
                              rotation-z={facing === "vertical" ? angle : 0}
                              rotation-y={facing === "horizontal" ? angle : 0}
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
