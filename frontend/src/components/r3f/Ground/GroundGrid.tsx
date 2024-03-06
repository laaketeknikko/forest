import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { Line } from "@react-three/drei"
import { MathUtils, Vector2 } from "three"
import { memo, useMemo } from "react"
import { theme } from "../../../styles/mui/theme"

export interface GroundGridProps {
   lenghtX: number
   lengthZ: number
}

/**
 * Displays the helper grid on the arena.
 */
const GroundGrid = ({ lenghtX, lengthZ }: GroundGridProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const arenaSize = selectedScenarioConfig.arena?.size || {
      length: lenghtX,
      width: lengthZ,
   }

   /**
    * Grid is drawn point-to-point from one end of the arena to the other.
    */
   const linePoints = useMemo(() => {
      const points: Array<Vector2> = []

      /** Leave the edges open by starting from 1.
       *
       */
      for (let x = 1; x < arenaSize.length; x++) {
         points.push(new Vector2(x, 0))
         points.push(new Vector2(x, arenaSize.width))
      }
      for (let z = 1; z < arenaSize.width; z++) {
         points.push(new Vector2(0, z))
         points.push(new Vector2(arenaSize.length, z))
      }

      return points
   }, [arenaSize.length, arenaSize.width])

   return (
      <group rotation-x={MathUtils.degToRad(90)}>
         <Line
            points={linePoints}
            color={theme.palette.text.primary}
            lineWidth={1}
            segments={true}
         />
      </group>
   )
}

const MemoedGroundGrid = memo(GroundGrid)

export { MemoedGroundGrid as GroundGrid }
