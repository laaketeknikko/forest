import { MathUtils } from "three"
import PropTypes from "prop-types"

const GroundTile = ({ xPos, yPos = 0, zPos }) => {
   return (
      <mesh position={[xPos, yPos, zPos]} rotation-x={MathUtils.degToRad(-90)}>
         <planeGeometry args={[1, 1]} />
         <meshBasicMaterial color="darkgreen" toneMapped={false} />
      </mesh>
   )
}

GroundTile.propTypes = {
   xPos: PropTypes.number.isRequired,
   yPos: PropTypes.number,
   zPos: PropTypes.number.isRequired,
}

export { GroundTile }
