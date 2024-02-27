import { useTexture } from "@react-three/drei"
import { ZPosition2D } from "../../../../../shared/types/types"
import { useSmallArenaDecorations } from "../hooks/useSmallArenaDecorations"

export interface ArenaLeafDecorationsProps {
   minDistance: number
   maxDistance: number
   amount: number
   center: ZPosition2D
   sizeVariance: number
   baseSize: number
}

const ArenaLeafDecorations = ({
   minDistance,
   maxDistance,
   amount,
   center,
   baseSize = 0.2,
   sizeVariance = 0.5,
}: ArenaLeafDecorationsProps) => {
   const textures = useTexture([
      "sprites/foliage/lehti1_small.png",
      "sprites/foliage/lehti2_small.png",
      "sprites/foliage/lehti3_small.png",
      "sprites/foliage/lehti4_small.png",
      "sprites/foliage/lehti5_small.png",
      "sprites/foliage/pikkulehdet_small.png",
   ])

   const texturesInstances = useSmallArenaDecorations({
      textures,
      minDistance,
      maxDistance,
      amount,
      sizeVariance,
      baseSize,
      facing: "vertical",
   })

   return (
      <group position={[center.x, 0.02, center.z]}>
         {texturesInstances.map((mesh) => mesh)}
      </group>
   )
}

export { ArenaLeafDecorations }
