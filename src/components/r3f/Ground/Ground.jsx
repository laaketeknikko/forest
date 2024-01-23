import { GroundTile } from "./GroundTile"
import PropTypes from "prop-types"

const Ground = ({ lengthX = 10, lengthZ = 10 }) => {
   const tiles = []
   for (let x = 0; x < lengthX; x++) {
      tiles.push([])
      for (let z = 0; z < lengthZ; z++) {
         const xPos = x + 0.5
         const zPos = z + 0.5
         tiles[x].push(
            <GroundTile key={`x${xPos}z${zPos}`} xPos={xPos} zPos={zPos} />
         )
      }
   }

   return (
      <>
         {tiles.map((xRow) => {
            return xRow.map((zItem) => zItem)
         })}
      </>
   )
}

Ground.propTypes = {
   lengthX: PropTypes.number,
   lengthZ: PropTypes.number,
}

export { Ground }
