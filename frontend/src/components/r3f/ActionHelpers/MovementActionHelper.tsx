import { Edges } from "@react-three/drei"
import { Atom, useAtom } from "jotai"
import { MathUtils } from "three"
import { ZActionEffect, ZCharacter } from "../../../../../shared/types/types"
import { ThreeEvent } from "@react-three/fiber"

interface MovementActionHelperProps {
   actionEffect: ZActionEffect | undefined | null
   activeCharacterAtom: Atom<ZCharacter>
   onClick?: (event: ThreeEvent<MouseEvent>) => void
}

const MovementActionHelper = ({
   actionEffect,
   activeCharacterAtom,
   onClick,
}: MovementActionHelperProps) => {
   const [activeCharacter] = useAtom(activeCharacterAtom)

   if (!actionEffect) {
      return null
   }

   return (
      <mesh
         position={[
            // TODO: Better way to do this?
            activeCharacter.position?.x || 0,
            0.1,
            activeCharacter.position?.z || 0,
         ]}
         rotation-x={MathUtils.degToRad(-90)}
         onClick={onClick}
      >
         <circleGeometry args={[actionEffect.range, 20]} />
         <meshBasicMaterial
            toneMapped={false}
            color="blue"
            transparent
            opacity={0.05}
            depthWrite={false}
         />
         <Edges />
      </mesh>
   )
}

export { MovementActionHelper }
