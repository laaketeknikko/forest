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

   const groundTexture = useLoader(TextureLoader, "sprites/terrain/areena2.jpg")
   const displacementMap = useLoader(
      TextureLoader,
      "sprites/terrain/areena_heightmap.png"
   )

   const arenaSize = selectedScenarioConfig.arena?.size || {
      length: sizeX,
      width: sizeZ,
   }

   const solidColor = "rgb(69, 43, 0)"

   return (
      <mesh position={[arenaSize.length / 2, -0.5, arenaSize.width / 2]}>
         <Edges color={theme.palette.primary.main} scale={1} />

         <boxGeometry
            args={[arenaSize.length, 1, arenaSize.width, 20, 20, 20]}
         />

         <meshBasicMaterial attach="material-0" color={solidColor} />
         <meshBasicMaterial attach="material-1" color={solidColor} />
         <meshStandardMaterial
            attach="material-2"
            map={groundTexture}
            displacementMap={displacementMap}
            displacementScale={1}
         />
         <meshBasicMaterial attach="material-3" color={solidColor} />
         <meshBasicMaterial attach="material-4" color={solidColor} />
         <meshBasicMaterial attach="material-5" color={solidColor} />
      </mesh>
   )
}

export { FullGround2 }
