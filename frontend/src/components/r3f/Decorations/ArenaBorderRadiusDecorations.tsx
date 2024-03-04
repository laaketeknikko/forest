import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { useTexture } from "@react-three/drei"
import { useMemo } from "react"
import { useSmallArenaDecorations } from "../hooks/useSmallArenaDecorations"
import { inGameOptionsAtom } from "../../../game/state/jotai/gameState"

const ArenaBorderRadiusDecorations = () => {
   const [scenario] = useAtom(selectedScenarioConfigAtom)
   const [inGameOptions] = useAtom(inGameOptionsAtom)

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
      maxDistance: distance * 1.5,
      amount: distance,
      sizeVariance: 5,
      baseSize: 5,
      facing: "center",
   })

   if (!inGameOptions.graphics.showBorderDecorations) return null

   return (
      <group position={[arenaWidth / 2, 0, arenaLength / 2]}>
         {decorations.map((decoration) => decoration)}
      </group>
   )
}

export { ArenaBorderRadiusDecorations }
