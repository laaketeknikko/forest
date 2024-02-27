import { useTexture } from "@react-three/drei"
import { ZPosition2D } from "../../../../../shared/types/types"
import { useSmallArenaDecorations } from "../hooks/useSmallArenaDecorations"

export interface ArenaShrubDecorationsProps {
   minDistance: number
   maxDistance: number
   amount: number
   center: ZPosition2D
   sizeVariance: number
   baseSize: number
}

const ArenaShrubDecorations = ({
   minDistance,
   maxDistance,
   amount,
   center,
   baseSize = 0.2,
   sizeVariance = 0.5,
}: ArenaShrubDecorationsProps) => {
   const textures = useTexture([
      "sprites/foliage/ruoho1_small.png",
      "sprites/foliage/ruoho2_small.png",
      "sprites/foliage/ruoho3_small.png",
      "sprites/foliage/ruoho4_small.png",
   ])

   const texturesInstances = useSmallArenaDecorations({
      textures,
      minDistance,
      maxDistance,
      amount,
      sizeVariance,
      baseSize,
      facing: "horizontal",
   })

   return (
      <group position={[center.x, 0.02, center.z]}>
         {texturesInstances.map((mesh) => mesh)}
      </group>
   )
}

export { ArenaShrubDecorations }
