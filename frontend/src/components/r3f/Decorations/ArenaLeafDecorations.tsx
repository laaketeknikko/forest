import { useTexture } from "@react-three/drei"
import { ZPosition2D } from "../../../../../shared/types/types"
import { useSmallArenaDecorations } from "../hooks/useSmallArenaDecorations"
import { inGameOptionsAtom } from "../../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { memo } from "react"

export interface ArenaLeafDecorationsProps {
   minDistance: number
   maxDistance: number
   amount: number
   center: ZPosition2D
   sizeVariance: number
   baseSize: number
}

/**
 * Generated small leaf foliage decorations on the arena.
 * Decorations are placed in a circle, at radius minDistance to maxDistance.
 * Uses drei/Instances.
 */
const ArenaLeafDecorations = ({
   minDistance,
   maxDistance,
   amount,
   center,
   baseSize = 0.2,
   sizeVariance = 0.5,
}: ArenaLeafDecorationsProps) => {
   const [inGameOptions] = useAtom(inGameOptionsAtom)

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

   if (!inGameOptions.graphics.showFoliage) return null

   return (
      <group position={[center.x, 0.01, center.z]}>
         {texturesInstances.map((instance) => instance)}
      </group>
   )
}

const MemoedLeafDecorations = memo(ArenaLeafDecorations)

export { MemoedLeafDecorations as ArenaLeafDecorations }
