import { MathUtils, TextureLoader } from "three"
import PropTypes from "prop-types"
import { useLoader } from "@react-three/fiber"
import { Edges, Outlines } from "@react-three/drei"
import { theme } from "../../../styles/mui/theme"
import { useState, useEffect } from "react"

const GroundTile = ({ xPos, yPos = 0, zPos }) => {
   const [isHovered, setIsHovered] = useState(false)

   return (
      <>
         <mesh
            position={[xPos, yPos, zPos]}
            rotation-x={MathUtils.degToRad(-90)}
            onClick={(event) =>
               console.log("Clicking on ground, event: ", event.point)
            }
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
         >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial toneMapped={false} transparent opacity={0} />

            <Edges
               color={
                  isHovered
                     ? theme.palette.primary.main
                     : theme.palette.text.primary
               }
               scale={0.99}
            />
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
