import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { useAtom } from "jotai"

import { useTexture } from "@react-three/drei"
import {
   getTextureNormalizedWidthAndHeight,
   getTextureYCenter,
} from "../util/textureUtilities"
import { MathUtils } from "three"
import { useMemo, memo } from "react"

const ArenaBorderDecorations = () => {
   const [scenario] = useAtom(selectedScenarioConfigAtom)

   const arenaWidth = scenario.arena?.size?.width || 0
   const arenaLength = scenario.arena?.size?.length || 0

   const bushTexture = useTexture("sprites/characters/kukkapensas.png")
   const treeTexture = useTexture("sprites/characters/puu.png")

   const decorationOptions = useMemo(
      () => [bushTexture, treeTexture],
      [bushTexture, treeTexture]
   )

   const widthDecorations = useMemo(
      () =>
         randomizeDecorations({
            decorationOptions,
            numberOfDecorations: Math.floor(
               (Math.random() * arenaWidth) / 2 + 4
            ),
            maxPos: arenaWidth,
            maxDepth: 12,
         }),
      [arenaWidth, decorationOptions]
   )
   const lengthDecorations = useMemo(
      () =>
         randomizeDecorations({
            decorationOptions,
            numberOfDecorations: Math.floor(
               (Math.random() * arenaLength) / 2 + 4
            ),
            maxPos: arenaLength,
            maxDepth: 12,
         }),
      [arenaLength, decorationOptions]
   )

   console.log("widthDecorations:", widthDecorations)

   return (
      <group>
         {widthDecorations.map((decorationOptions, index) => {
            return (
               <mesh
                  key={index}
                  position={[
                     decorationOptions.mainDimension,
                     decorationOptions.yPos,
                     decorationOptions.depthDimension,
                  ]}
               >
                  <planeGeometry
                     args={[decorationOptions.width, decorationOptions.height]}
                  />
                  <meshBasicMaterial
                     map={decorationOptions.decoration}
                     color="white"
                     transparent
                     opacity={1}
                     toneMapped={false}
                     alphaTest={0.5}
                  />
               </mesh>
            )
         })}

         {lengthDecorations.map((decorationOptions, index) => {
            return (
               <mesh
                  key={index}
                  position={[
                     Math.abs(decorationOptions.depthDimension) + arenaWidth,
                     decorationOptions.yPos,
                     decorationOptions.mainDimension,
                  ]}
                  rotation-y={MathUtils.degToRad(-90)}
               >
                  <planeGeometry
                     args={[decorationOptions.width, decorationOptions.height]}
                  />
                  <meshBasicMaterial
                     map={decorationOptions.decoration}
                     transparent
                     color="white"
                     opacity={1}
                     toneMapped={false}
                     alphaTest={0.5}
                  />
               </mesh>
            )
         })}
      </group>
   )
}

ArenaBorderDecorations.displayName = "arenaBorderDecorations"

const memoedDecorations = memo(ArenaBorderDecorations)

interface randomizeDecorationsProps {
   decorationOptions: Array<THREE.Texture>
   numberOfDecorations: number
   maxPos: number
   maxDepth: number
}

const randomizeDecorations = ({
   decorationOptions,
   numberOfDecorations,
   maxPos,
   maxDepth = 3,
}: randomizeDecorationsProps) => {
   const maxHeight = 10
   const minHeight = 2

   const results: Array<{
      mainDimension: number
      depthDimension: number
      yPos: number
      decoration: THREE.Texture
      height: number
      width: number
   }> = []

   for (let i = 0; i < numberOfDecorations; i++) {
      const decoration =
         decorationOptions[Math.floor(Math.random() * decorationOptions.length)]

      const dimensions = getTextureNormalizedWidthAndHeight(
         decoration,
         Math.random() * (maxHeight - minHeight + 1) + minHeight
      )
      const yPos = getTextureYCenter(dimensions.height)

      results.push({
         mainDimension: Math.random() * maxPos * 2 - maxPos / 2,
         depthDimension: Math.random() * -maxDepth,
         decoration: decoration,
         yPos: yPos,
         height: dimensions.height,
         width: dimensions.width,
      })
   }

   return results
}

export { memoedDecorations as ArenaBorderDecorations }
