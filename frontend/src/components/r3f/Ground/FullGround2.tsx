import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"

import { MathUtils, TextureLoader } from "three"

import { useLoader } from "@react-three/fiber"
import { inGameOptionsAtom } from "../../../game/state/jotai/gameState"
import { memo } from "react"

/**
 * Renders a single ground mesh and texture.
 */
export interface FullGroundTileProps {
   sizeX?: number
   sizeZ?: number
}

/**
 * Displays the arena ground texture.
 */
const FullGround2 = ({ sizeX = 10, sizeZ = 10 }: FullGroundTileProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [inGameOptions] = useAtom(inGameOptionsAtom)

   const groundTexture = useLoader(TextureLoader, "sprites/terrain/areena.png")
   const displacementMap = useLoader(
      TextureLoader,
      "sprites/terrain/areena_heightmap.png"
   )

   const arenaSize = selectedScenarioConfig.arena?.size || {
      length: sizeX,
      width: sizeZ,
   }

   if (!inGameOptions.graphics.showArenaImage) return null

   return (
      <group
         position={[arenaSize.length / 2, -0.01, arenaSize.width / 2]}
         rotation-x={MathUtils.degToRad(-90)}
      >
         <mesh>
            {/**We multiply size so that the arena square is fully inside the round arena texture.
             * This is a hardcoded value based on the texture used.
             *
             * We use 100 segments because we have a displacement map.
             * If displacement map is removed, 1 segment is enough.
             */}
            <planeGeometry
               args={[
                  arenaSize.length * 1.45,
                  arenaSize.width * 1.45,
                  100,
                  100,
               ]}
            />

            <meshStandardMaterial
               map={groundTexture}
               displacementMap={displacementMap}
               displacementScale={1}
               transparent
               opacity={1}
               color="white"
               alphaTest={0.5}
            />
         </mesh>
      </group>
   )
}

const FullGround2Memo = memo(FullGround2)

export { FullGround2Memo as FullGround2 }
