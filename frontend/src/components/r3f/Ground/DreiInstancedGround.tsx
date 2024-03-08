import { Instance, Instances } from "@react-three/drei"
import { useAtom } from "jotai"
import { memo, useLayoutEffect, useRef, useState } from "react"
import { MathUtils } from "three"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"

interface InstancedGroundProps {
   lengthX?: number
   lengthZ?: number
}

/**
 * Tiled ground using drei/Instances.
 *
 * drei/Instances are a bit easier to use than native three.js InstancedMesh.
 * Also, mouse events seem more reliable/easier to accomplish with drei/Instances.
 */
const InstancedGround = ({
   lengthX = 15,
   lengthZ = 15,
}: InstancedGroundProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [groundReady, setGroundReady] = useState(false)

   const arenaSize = selectedScenarioConfig.arena.size || {
      length: lengthX,
      width: lengthZ,
   }

   const instancesRef = useRef(
      Array(arenaSize.width * arenaSize.length).fill(null)
   )

   /**
    * Example of how to update instance on event.
    * Because instances are in a ref, use mock state
    * setGroundUpdate to rerender.
    */
   /*const [, setGroundUpdate] = useState(0)*/
   /*
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
   */

   /**
    * Generate tiles.
    *
    * Tiles are size 1. They are placed 0.5 so that arena border
    * would be at 0.
    */
   useLayoutEffect(() => {
      if (!groundReady) {
         for (let x = 0; x < arenaSize.width; x++) {
            for (let z = 0; z < arenaSize.length; z++) {
               const xPos = x + 0.5
               const zPos = z + 0.5
               const yPos = 0.01

               instancesRef.current[x * arenaSize.width + z] = (
                  <Instance
                     key={`x${xPos}z${zPos}`}
                     position={[xPos, yPos, zPos]}
                     rotation={[MathUtils.degToRad(-90), 0, 0]}
                  />
               )
            }
         }
         setGroundReady(true)
      }
   }, [arenaSize.length, arenaSize.width, groundReady])

   return (
      <group position={[0, 0.01, 0]}>
         <Instances limit={arenaSize.length * arenaSize.width}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
               toneMapped={false}
               transparent
               opacity={0}
               depthWrite={false}
               alphaTest={1}
            />
            {groundReady && instancesRef.current.map((instance) => instance)}
         </Instances>
      </group>
   )
}

const InstancedGroundMemo = memo(InstancedGround)

export { InstancedGroundMemo as InstancedGround }
