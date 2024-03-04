import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"

import { MathUtils, TextureLoader } from "three"

import { useLoader } from "@react-three/fiber"
import { inGameOptionsAtom } from "../../../game/state/jotai/gameState"

/**
 * Renders a single ground mesh and texture.
 */
export interface FullGroundTileProps {
   sizeX?: number
   sizeZ?: number
}

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

   //const solidColor = "rgb(69, 43, 0)"

   if (!inGameOptions.graphics.showArenaImage) return null

   return (
      <group
         position={[arenaSize.length / 2, -0.05, arenaSize.width / 2]}
         rotation-x={MathUtils.degToRad(-90)}
      >
         <mesh>
            {/**We multiply size by 1.4 so that the arena square is fully inside the round arena texture.
             * This is a hardcoded value based on the texture used.
             */}
            <planeGeometry
               args={[arenaSize.length * 1.4, arenaSize.width * 1.4, 100, 100]}
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

         <mesh>
            <planeGeometry args={[arenaSize.length, arenaSize.width, 1, 1]} />
            <meshBasicMaterial transparent opacity={0} />
         </mesh>
      </group>
   )
}

export { FullGround2 }
