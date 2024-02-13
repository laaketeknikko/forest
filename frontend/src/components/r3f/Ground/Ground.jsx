import { GroundTile } from "./GroundTile"
import PropTypes from "prop-types"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { useAtom } from "jotai"
import { useMemo, memo } from "react"

const Ground = ({ lengthX = 15, lengthZ = 15 }) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const arenaSize = selectedScenarioConfig.arena?.size || {
      length: lengthX,
      width: lengthZ,
   }

   const tiles = useMemo(() => {
      const tiles = []
      for (let x = 0; x < arenaSize.width; x++) {
         tiles.push([])
         for (let z = 0; z < arenaSize.length; z++) {
            const xPos = x + 0.5
            const zPos = z + 0.5
            tiles[x].push(
               <GroundTile key={`x${xPos}z${zPos}`} xPos={xPos} zPos={zPos} />
            )
         }
      }
      return tiles
   }, [arenaSize.length, arenaSize.width])

   return (
      <>
         {tiles.map((xRow) => {
            return xRow.map((zItem) => zItem)
         })}
      </>
   )
}

Ground.displayName = "Ground"

const MemoedGround = memo(Ground)

Ground.propTypes = {
   lengthX: PropTypes.number,
   lengthZ: PropTypes.number,
}

export { MemoedGround as Ground }
