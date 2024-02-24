import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { Edges, useTexture } from "@react-three/drei"
import { MathUtils } from "three"
import { theme } from "../../../styles/mui/theme"

export interface FullGroundTileProps {
   sizeX?: number
   sizeZ?: number
}

const FullGroundTile = ({ sizeX = 10, sizeZ = 10 }: FullGroundTileProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const groundTexture = useTexture(
      "sprites/terrain/Architextures_Green_Tenement_Tile.jpg"
   )
   const displacementMap = useTexture("sprites/terrain/arena_displacement.jpg")

   const arenaSize = selectedScenarioConfig.arena?.size || {
      length: sizeX,
      width: sizeZ,
   }

   return (
      <mesh
         position={[arenaSize.length / 2, 0, arenaSize.width / 2]}
         rotation-x={MathUtils.degToRad(-90)}
      >
         <mesh position={[0, 0, 0.135]}>
            <planeGeometry args={[arenaSize.length, arenaSize.width]} />
            <meshStandardMaterial transparent opacity={0.7} color="blue" />
         </mesh>
         <Edges color={theme.palette.primary.main} scale={1} />
         <planeGeometry args={[arenaSize.length, arenaSize.width, 100, 100]} />
         <meshStandardMaterial
            map={groundTexture}
            displacementMap={displacementMap}
            displacementScale={0.15}
            displacementBias={0}
         />
      </mesh>
   )
}

export { FullGroundTile }
