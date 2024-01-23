import { MathUtils } from "three"

const GroundTile = ({ xPos, yPos = 0, zPos }) => {
   return (
      <mesh position={[xPos, yPos, zPos]} rotation-x={MathUtils.degToRad(-90)}>
         <planeGeometry args={[1, 1]} />
         <meshBasicMaterial color="green" toneMapped={false} />
      </mesh>
   )
}

export { GroundTile }
