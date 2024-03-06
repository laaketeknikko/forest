import { useTexture } from "@react-three/drei"
import { ZPosition2D } from "../../../../../shared/types/types"
import { useSmallArenaDecorations } from "../hooks/useSmallArenaDecorations"
import { inGameOptionsAtom } from "../../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { memo } from "react"

export interface ArenaShrubDecorationsProps {
   minDistance: number
   maxDistance: number
   amount: number

   /** Where to center the decorations */
   center: ZPosition2D
   sizeVariance: number
   baseSize: number
}

/**
 * Generates random shrub decorations on the arena.
 * Shrubs are y-up, and generated at a circle radius
 * of minDistance to maxDistance centered on center.
 */
const ArenaShrubDecorations = ({
   minDistance,
   maxDistance,
   amount,
   center,
   baseSize = 0.2,
   sizeVariance = 0.5,
}: ArenaShrubDecorationsProps) => {
   const [inGameOptions] = useAtom(inGameOptionsAtom)

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

   if (!inGameOptions.graphics.showBrushes) return null

   return (
      <group position={[center.x, 0.0, center.z]}>
         {texturesInstances.map((mesh) => mesh)}
      </group>
   )
}

const MemoedShrubDecorations = memo(ArenaShrubDecorations)

export { MemoedShrubDecorations as ArenaShrubDecorations }
