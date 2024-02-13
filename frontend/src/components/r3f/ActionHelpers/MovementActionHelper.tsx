import { Edges } from "@react-three/drei"
import { Atom, useAtom } from "jotai"
import { MathUtils } from "three"
import { ZActionCard, ZCharacter } from "../../../../../shared/types/types"

interface MovementActionHelperProps {
   selectedCardAtom: Atom<ZActionCard>
   activeCharacterAtom: Atom<ZCharacter>
   onClick?: (event: object) => void
}

const MovementActionHelper = ({
   selectedCardAtom,
   activeCharacterAtom,
   onClick,
}: MovementActionHelperProps) => {
   const [selectedCard] = useAtom(selectedCardAtom)
   const [activeCharacter] = useAtom(activeCharacterAtom)

   const action = selectedCard.actions.find(
      (action) => action._id === selectedCard.nextActionId
   )

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
         <circleGeometry args={[action?.effects[0].range, 20]} />
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
