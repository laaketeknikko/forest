import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { useEffect, useRef } from "react"
import { InstancedMesh, MathUtils, Object3D } from "three"

const tempObject = new Object3D()

interface InstancedGroundProps {
   lengthX?: number
   lengthZ?: number
}

// TODO: Implement grid on instanced ground.
const InstancedGround = ({
   lengthX = 15,
   lengthZ = 15,
}: InstancedGroundProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const arenaSize = selectedScenarioConfig.arena?.size || {
      length: lengthX,
      width: lengthZ,
   }

   const instanceMeshRef = useRef<InstancedMesh>()

   useEffect(() => {
      tempObject.rotateX(MathUtils.degToRad(-90))

      for (let x = 0; x < arenaSize.width; x++) {
         for (let z = 0; z < arenaSize.length; z++) {
            tempObject.position.set(x, 0, z)
            tempObject.updateMatrix()
            instanceMeshRef.current!.setMatrixAt(
               x * arenaSize.width + z,
               tempObject.matrix
            )
         }
      }

      instanceMeshRef.current!.instanceMatrix.needsUpdate = true
   }, [arenaSize.length, arenaSize.width])

   return (
      <instancedMesh
         ref={instanceMeshRef as never}
         args={[undefined, undefined, arenaSize.width * arenaSize.length]}
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
