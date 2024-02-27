import { useTexture } from "@react-three/drei"
import { useMemo } from "react"
import { MathUtils } from "three"
import { getTextureNormalizedWidthAndHeight } from "../../util/textureUtilities"
import { ZPosition2D } from "../../../../../shared/types/types"

export interface ArenaBorderDecorationsProps {
   minDistance: number
   maxDistance: number
   amount: number
   center: ZPosition2D
   sizeVariance: number
   baseSize: number
}

const ArenaBorderSmallDecorations = ({
   minDistance,
   maxDistance,
   amount,
   center,
   baseSize = 0.2,
   sizeVariance = 0.5,
}: ArenaBorderDecorationsProps) => {
   const textures = useTexture([
      "sprites/foliage/lehti1_small.png",
      "sprites/foliage/lehti2_small.png",
      "sprites/foliage/lehti3_small.png",
      "sprites/foliage/lehti4_small.png",
      "sprites/foliage/lehti5_small.png",
      "sprites/foliage/pikkulehdet_small.png",
   ])

   const meshes = useMemo(() => {
      return Array(amount)
         .fill(0)
         .map(() => {
            const texture =
               textures[Math.floor(Math.random() * textures.length)]
            const distance =
               Math.random() * (maxDistance - minDistance) + minDistance
            const angle = Math.random() * Math.PI * 2
            const size = getTextureNormalizedWidthAndHeight(
               texture,
               baseSize + Math.random() * sizeVariance
            )

            return (
               <mesh
                  key={Math.random()}
                  position={[
                     distance * Math.cos(angle),
                     0,
                     distance * Math.sin(angle),
                  ]}
                  rotation-x={MathUtils.degToRad(-90)}
                  rotation-z={Math.random() * Math.PI * 2}
               >
                  <planeGeometry args={[size.width, size.height]} />
                  <meshBasicMaterial
                     map={texture}
                     transparent
                     color="white"
                     opacity={1}
                     toneMapped={false}
                     alphaTest={0.5}
                  />
               </mesh>
            )
         })
   }, [amount, baseSize, maxDistance, minDistance, sizeVariance, textures])

   return (
      <group position={[center.x, 0.01, center.z]}>
         {meshes.map((mesh) => mesh)}
      </group>
   )
}

export { ArenaBorderSmallDecorations }
