import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { useEffect, useRef, useState } from "react"
import { Color, InstancedMesh, MathUtils, Object3D } from "three"
import { ThreeEvent } from "@react-three/fiber"

const tempObject = new Object3D()

interface InstancedGroundProps {
   lengthX?: number
   lengthZ?: number
}

/**
 * Uses three.js instancing to display ground tiles
 *
 */
const InstancedGround = ({
   lengthX = 15,
   lengthZ = 15,
}: InstancedGroundProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [, setGroundReady] = useState(false)

   const arenaSize = selectedScenarioConfig.arena.size || {
      length: lengthX,
      width: lengthZ,
   }

   /**
    * instanceMeshRef is passed to <instancedMesh> and then updated in useEffect
    * after rendering.
    */
   const instanceMeshRef = useRef<InstancedMesh | null>(null)

   useEffect(() => {
      if (instanceMeshRef.current) {
         tempObject.rotateX(MathUtils.degToRad(-90))

         for (let x = 0; x < arenaSize.width; x++) {
            for (let z = 0; z < arenaSize.length; z++) {
               tempObject.position.set(x + 0.5, 0, z + 0.5)
               tempObject.updateMatrix()
               instanceMeshRef.current.setMatrixAt(
                  x * arenaSize.width + z,
                  tempObject.matrix
               )
               instanceMeshRef.current.setColorAt(
                  x * arenaSize.width + z,
                  new Color("rgb(255, 80, 0)")
               )
            }
         }

         instanceMeshRef.current!.instanceMatrix.needsUpdate = true
         setGroundReady(true)
      }
   }, [arenaSize.length, arenaSize.width])

   const handleTileClicked = (event: ThreeEvent<MouseEvent>) => {
      console.log("clicking on ground")
      if (instanceMeshRef.current && instanceMeshRef.current.instanceColor) {
         console.log("we're here!")
         const xPos = Math.floor(event.point.x)
         const zPos = Math.floor(event.point.z)
         instanceMeshRef.current.setColorAt(
            xPos * arenaSize.width + zPos,
            new Color("yellow")
         )
         instanceMeshRef.current.instanceColor.needsUpdate = true
      }
   }

   return (
      <instancedMesh
         ref={instanceMeshRef}
         args={[undefined, undefined, arenaSize.width * arenaSize.length]}
         onClick={handleTileClicked}
      >
         <planeGeometry args={[1, 1]} />
         <meshBasicMaterial
            toneMapped={false}
            transparent
            opacity={1}
            depthWrite={false}
            color="rgb(40, 80, 0)"
         />
      </instancedMesh>
   )
}

export { InstancedGround }
