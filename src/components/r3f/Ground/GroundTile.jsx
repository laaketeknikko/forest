import { MathUtils, TextureLoader } from "three"
import PropTypes from "prop-types"
import { useLoader } from "@react-three/fiber"
import { Edges } from "@react-three/drei"

const GroundTile = ({ xPos, yPos = 0, zPos }) => {
   return (
      <>
         <mesh
            position={[xPos, yPos, zPos]}
            rotation-x={MathUtils.degToRad(-90)}
            onClick={(event) =>
               console.log("Clicking on ground, event: ", event.point)
            }
         >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial transparent toneMapped={false} />
            <Edges />
         </mesh>
      </>
   )
}

GroundTile.propTypes = {
   xPos: PropTypes.number.isRequired,
   yPos: PropTypes.number,
   zPos: PropTypes.number.isRequired,
}

export { GroundTile }
