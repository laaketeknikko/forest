import { Instance, Instances } from "@react-three/drei"
import { useAtom } from "jotai"
import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { MathUtils } from "three"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { ThreeEvent } from "@react-three/fiber"

interface InstancedGroundProps {
   lengthX?: number
   lengthZ?: number
}

const InstancedGround = ({
   lengthX = 15,
   lengthZ = 15,
}: InstancedGroundProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [groundReady, setGroundReady] = useState(false)
   const [, setGroundUpdate] = useState(0)

   const arenaSize = selectedScenarioConfig.arena.size || {
      length: lengthX,
      width: lengthZ,
   }

   const instancesRef = useRef(
      Array(arenaSize.width * arenaSize.length).fill(null)
   )

   const onTileClicked = useCallback(
      (event: ThreeEvent<MouseEvent>) => {
         const x = Math.floor(event.point.x)
         const z = Math.floor(event.point.z)
         const index = x * arenaSize.width + z

         instancesRef.current[index] = (
            <Instance
               key={`x${x}z${z}`}
               position={[x + 0.5, 0, z + 0.5]}
               rotation={[MathUtils.degToRad(-90), 0, 0]}
               color="yellow"
               onClick={onTileClicked}
            />
         )

         setGroundUpdate((prev) => prev + 1)
      },
      [arenaSize.width]
   )

   useLayoutEffect(() => {
      if (!groundReady) {
         for (let x = 0; x < arenaSize.width; x++) {
            for (let z = 0; z < arenaSize.length; z++) {
               const xPos = x + 0.5
               const zPos = z + 0.5
               const yPos = 0

               instancesRef.current[x * arenaSize.width + z] = (
                  <Instance
                     key={`x${xPos}z${zPos}`}
                     position={[xPos, yPos, zPos]}
                     rotation={[MathUtils.degToRad(-90), 0, 0]}
                     color="red"
                     onClick={onTileClicked}
                  />
               )
            }
         }
         setGroundReady(true)
      }
   }, [arenaSize.length, arenaSize.width, groundReady, onTileClicked])

   return (
      <Instances limit={arenaSize.length * arenaSize.width}>
         <planeGeometry args={[1, 1]} />
         <meshBasicMaterial
            toneMapped={false}
            transparent
            opacity={1}
            depthWrite={false}
         />
         {groundReady && instancesRef.current.map((instance) => instance)}
      </Instances>
   )
}

export { InstancedGround }
