import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { useTexture } from "@react-three/drei"
import { useMemo } from "react"
import { useSmallArenaDecorations } from "../hooks/useSmallArenaDecorations"

const ArenaBorderRadiusDecorations = () => {
   const [scenario] = useAtom(selectedScenarioConfigAtom)

   const arenaWidth = scenario.arena?.size?.width || 0
   const arenaLength = scenario.arena?.size?.length || 0
   const distance = Math.max(arenaLength, arenaWidth)

   const bushTexture = useTexture("sprites/characters/kukkapensas.png")
   const treeTexture = useTexture("sprites/characters/puu.png")

   const decorationOptions = useMemo(
      () => [bushTexture, treeTexture],
      [bushTexture, treeTexture]
   )

   const decorations = useSmallArenaDecorations({
      textures: decorationOptions,
      minDistance: (distance / 2) * 1.5,
      maxDistance: arenaWidth * 1.5,
      amount: 30,
      sizeVariance: 5,
      baseSize: 5,
      facing: "center",
   })

   return (
      <group position={[arenaWidth / 2, 0, arenaLength / 2]}>
         {decorations.map((decoration) => decoration)}
      </group>
   )
}

export { ArenaBorderRadiusDecorations }
