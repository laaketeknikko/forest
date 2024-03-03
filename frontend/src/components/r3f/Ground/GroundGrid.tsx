import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { Line } from "@react-three/drei"
import { MathUtils, Vector2 } from "three"
import { useMemo } from "react"

export interface GroundGridProps {
   lenghtX: number
   lengthZ: number
}

const GroundGrid = ({ lenghtX, lengthZ }: GroundGridProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const arenaSize = selectedScenarioConfig.arena?.size || {
      length: lenghtX,
      width: lengthZ,
   }

   const linePoints = useMemo(() => {
      const points: Array<Vector2> = []

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
         <Line points={linePoints} color="red" lineWidth={2} segments={true} />
      </group>
   )
}

export { GroundGrid }
