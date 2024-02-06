import { Edges } from "@react-three/drei"
import { Atom, useAtom } from "jotai"
import { MathUtils } from "three"

interface MovementActionHelperProps {
   selectedCardAtom: Atom<ActionCard>
   activeCharacterAtom: Atom<Character>
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
      (action) => action.id === selectedCard.nextActionId
   )

   return (
      <mesh
         position={[
            activeCharacter.position.x,
            activeCharacter.position.y,
            activeCharacter.position.z,
         ]}
         rotation-x={MathUtils.degToRad(-90)}
         onClick={onClick}
      >
         <circleGeometry args={[action?.range, 20]} />
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
