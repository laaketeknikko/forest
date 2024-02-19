import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { useEffect, useRef } from "react"
import { Color, InstancedMesh, MathUtils, Object3D } from "three"
import { ThreeEvent } from "@react-three/fiber"

const tempObject = new Object3D()

interface InstancedGroundProps {
   lengthX?: number
   lengthZ?: number
}

// TODO: Implement grid on instanced ground.

/**
 * Uses three.js instancing to display ground tiles
 *
 */
const InstancedGround = ({
   lengthX = 15,
   lengthZ = 15,
}: InstancedGroundProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

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
            }
         }

         instanceMeshRef.current!.instanceMatrix.needsUpdate = true
      }
   }, [arenaSize.length, arenaSize.width])

   // TODO: Fix clicking on instancedMesh event.
   const handleTileClicked = (event: ThreeEvent<MouseEvent>) => {
      console.log("clicking on ground")
      if (instanceMeshRef.current && instanceMeshRef.current.instanceColor) {
         const xPos = Math.floor(event.point.x)
         const zPos = Math.floor(event.point.z)
         instanceMeshRef.current.setColorAt(
            xPos * arenaSize.width + zPos,
            new Color("red")
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
            opacity={0.2}
            depthWrite={false}
            color="rgb(40, 80, 0)"
         />
      </instancedMesh>
   )
}

export { InstancedGround }
