import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { Edges } from "@react-three/drei"
import { MathUtils, TextureLoader } from "three"
import { theme } from "../../../styles/mui/theme"
import { useLoader } from "@react-three/fiber"

/**
 * Renders a single ground mesh and texture.
 */
export interface FullGroundTileProps {
   sizeX?: number
   sizeZ?: number
}

const FullGround2 = ({ sizeX = 10, sizeZ = 10 }: FullGroundTileProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

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

   return (
      <group
         position={[arenaSize.length / 2, -0.05, arenaSize.width / 2]}
         rotation-x={MathUtils.degToRad(-90)}
      >
         <mesh>
            {/**We multiply size by 1.4 so that the arena square is fully inside the round arena texture. */}
            <planeGeometry
               args={[arenaSize.length * 1.4, arenaSize.width * 1.4, 100, 100]}
            />

            <meshStandardMaterial
               map={groundTexture}
               displacementMap={displacementMap}
               displacementScale={1}
               transparent
               opacity={0.5}
               color="white"
               alphaTest={0.5}
            />
         </mesh>

         <mesh>
            <planeGeometry args={[arenaSize.length, arenaSize.width, 1, 1]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={theme.palette.primary.main} scale={1} />
         </mesh>
      </group>
   )

   /*
   return (
      <mesh position={[arenaSize.length / 2, -0.5, arenaSize.width / 2]}>
         <Edges color={theme.palette.primary.main} scale={1} />

         <boxGeometry
            args={[arenaSize.length, 1, arenaSize.width, 20, 20, 20]}
         />

         <meshBasicMaterial attach="material-0" color={solidColor} />
         <meshBasicMaterial attach="material-1" color={solidColor} />
         <meshBasicMaterial attach="material-2" map={groundTexture} />
         <meshBasicMaterial attach="material-3" color={solidColor} />
         <meshBasicMaterial attach="material-4" color={solidColor} />
         <meshBasicMaterial attach="material-5" color={solidColor} />
      </mesh>
   )
   */
}

export { FullGround2 }
